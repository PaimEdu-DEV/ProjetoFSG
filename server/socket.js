const {
  createRoom,
  joinRoom,
  getRoom,
  markCompleted,
  removePlayer,
  publicRoomState,
} = require("./lib/rooms");

function attachSocketHandlers(io) {
  io.on("connection", (socket) => {
    socket.on("x1:create", (payload, ack) => {
      try {
        const { nickname, language, difficulty } = payload || {};
        if (!nickname || !language || !difficulty) {
          throw new Error("Preencha apelido, linguagem e dificuldade");
        }
        const room = createRoom({
          nickname: String(nickname).slice(0, 20),
          language,
          difficulty,
          socketId: socket.id,
        });
        socket.join(room.code);
        socket.data.roomCode = room.code;
        ack && ack({ ok: true, room: publicRoomState(room) });
      } catch (err) {
        ack && ack({ ok: false, error: err.message });
      }
    });

    socket.on("x1:join", (payload, ack) => {
      try {
        const { nickname, code } = payload || {};
        if (!nickname || !code) throw new Error("Preencha apelido e código");
        const room = joinRoom({
          code: String(code).toUpperCase().trim(),
          nickname: String(nickname).slice(0, 20),
          socketId: socket.id,
        });
        socket.join(room.code);
        socket.data.roomCode = room.code;
        const state = publicRoomState(room);
        ack && ack({ ok: true, room: state });
        io.to(room.code).emit("x1:matchStart", { room: state });
      } catch (err) {
        ack && ack({ ok: false, error: err.message });
      }
    });

    socket.on("x1:complete", (payload, ack) => {
      try {
        const { code, exerciseId } = payload || {};
        const { room, player, allDone } = markCompleted(code, socket.id, exerciseId);
        const state = publicRoomState(room);

        if (allDone && room.status !== "finished") {
          room.status = "finished";
          room.finishedAt = Date.now();
          const elapsedMs = player.finishedAt - room.startedAt;
          io.to(code).emit("x1:matchOver", {
            winner: player.nickname,
            elapsedMs,
            room: publicRoomState(room),
          });
        } else {
          io.to(code).emit("x1:update", { room: state });
        }
        ack && ack({ ok: true });
      } catch (err) {
        ack && ack({ ok: false, error: err.message });
      }
    });

    socket.on("x1:leave", () => {
      handleDisconnect(socket, io);
    });

    socket.on("disconnect", () => {
      handleDisconnect(socket, io);
    });
  });
}

function handleDisconnect(socket, io) {
  const room = removePlayer(socket.id);
  if (room) {
    io.to(room.code).emit("x1:opponentLeft", { room: publicRoomState(room) });
  }
}

module.exports = { attachSocketHandlers };
