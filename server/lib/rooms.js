const { customAlphabet } = require("nanoid");
const { exercises, DIFFICULTIES } = require("../data/exercises");

// Sem caracteres ambíguos (0/O, 1/I)
const genCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 5);

const WAITING_TTL_MS = 10 * 60 * 1000; // 10 min para alguém entrar
const FINISHED_TTL_MS = 60 * 60 * 1000; // limpa salas finalizadas após 1h

/** @type {Map<string, Room>} */
const rooms = new Map();

function exercisesFor(language, difficulty) {
  return exercises
    .filter((e) => e.language === language && e.difficulty === difficulty)
    .sort((a, b) => a.order - b.order);
}

function createRoom({ nickname, language, difficulty, socketId }) {
  let code;
  do {
    code = genCode();
  } while (rooms.has(code));

  const challenge = exercisesFor(language, difficulty);
  if (challenge.length === 0) {
    throw new Error("Nenhum desafio encontrado para essa combinação");
  }

  const room = {
    code,
    language,
    difficulty,
    difficultyLabel: DIFFICULTIES[difficulty]?.label || difficulty,
    exerciseIds: challenge.map((e) => e.id),
    exerciseTitles: challenge.map((e) => e.title),
    status: "waiting", // waiting -> active -> finished
    createdAt: Date.now(),
    startedAt: null,
    players: {
      [socketId]: {
        socketId,
        nickname,
        isHost: true,
        joinedAt: Date.now(),
        completed: [],
        finishedAt: null,
      },
    },
  };
  rooms.set(code, room);
  return room;
}

function joinRoom({ code, nickname, socketId }) {
  const room = rooms.get(code);
  if (!room) throw new Error("Código não encontrado ou expirado");
  if (room.status !== "waiting") throw new Error("Essa sala já iniciou ou foi encerrada");
  if (Object.keys(room.players).length >= 2) throw new Error("Sala já está cheia");

  room.players[socketId] = {
    socketId,
    nickname,
    isHost: false,
    joinedAt: Date.now(),
    completed: [],
    finishedAt: null,
  };
  room.status = "active";
  room.startedAt = Date.now();
  return room;
}

function getRoom(code) {
  return rooms.get(code);
}

function markCompleted(code, socketId, exerciseId) {
  const room = rooms.get(code);
  if (!room) throw new Error("Sala não encontrada");
  const player = room.players[socketId];
  if (!player) throw new Error("Jogador não encontrado nessa sala");
  if (!room.exerciseIds.includes(exerciseId)) throw new Error("Desafio não pertence a essa sala");
  if (!player.completed.includes(exerciseId)) {
    player.completed.push(exerciseId);
  }
  const allDone = player.completed.length >= room.exerciseIds.length;
  if (allDone && !player.finishedAt) {
    player.finishedAt = Date.now();
  }
  return { room, player, allDone };
}

function removePlayer(socketId) {
  for (const room of rooms.values()) {
    if (room.players[socketId]) {
      delete room.players[socketId];
      if (Object.keys(room.players).length === 0) {
        rooms.delete(room.code);
      }
      return room;
    }
  }
  return null;
}

function publicRoomState(room) {
  return {
    code: room.code,
    language: room.language,
    difficulty: room.difficulty,
    difficultyLabel: room.difficultyLabel,
    exerciseIds: room.exerciseIds,
    exerciseTitles: room.exerciseTitles,
    status: room.status,
    startedAt: room.startedAt,
    players: Object.values(room.players).map((p) => ({
      nickname: p.nickname,
      isHost: p.isHost,
      completedCount: p.completed.length,
      finishedAt: p.finishedAt,
    })),
  };
}

function cleanup() {
  const now = Date.now();
  for (const room of rooms.values()) {
    if (room.status === "waiting" && now - room.createdAt > WAITING_TTL_MS) {
      rooms.delete(room.code);
    } else if (room.status === "active" && now - room.startedAt > WAITING_TTL_MS * 6) {
      rooms.delete(room.code);
    } else if (
      room.status === "finished" ||
      (room.status === "active" &&
        Object.values(room.players).every((p) => p.finishedAt))
    ) {
      room.status = "finished";
      if (!room.finishedAt) room.finishedAt = now;
      if (now - room.finishedAt > FINISHED_TTL_MS) {
        rooms.delete(room.code);
      }
    }
  }
}

setInterval(cleanup, 30 * 1000).unref();

module.exports = {
  createRoom,
  joinRoom,
  getRoom,
  markCompleted,
  removePlayer,
  publicRoomState,
};
