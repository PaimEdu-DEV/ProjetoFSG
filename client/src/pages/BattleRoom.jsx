import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExercise, executeCode } from "../api";
import { getSocket } from "../socket";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";

function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function BattleRoom() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = getSocket();

  const stored = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("pd_x1");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed.code === code ? parsed : null;
    } catch {
      return null;
    }
  }, [code]);

  const [room, setRoom] = useState(stored?.room || null);
  const [matchOver, setMatchOver] = useState(null);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const [exercisesDetail, setExercisesDetail] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [codeByExercise, setCodeByExercise] = useState({});
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [now, setNow] = useState(Date.now());
  const copyTimeout = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!stored) {
      navigate("/competitivo");
    }
  }, [stored, navigate]);

  useEffect(() => {
    function onMatchStart({ room }) {
      setRoom(room);
    }
    function onUpdate({ room }) {
      setRoom(room);
    }
    function onMatchOver({ winner, elapsedMs, room }) {
      setRoom(room);
      setMatchOver({ winner, elapsedMs });
    }
    function onOpponentLeft({ room }) {
      setRoom(room);
      setOpponentLeft(true);
    }

    socket.on("x1:matchStart", onMatchStart);
    socket.on("x1:update", onUpdate);
    socket.on("x1:matchOver", onMatchOver);
    socket.on("x1:opponentLeft", onOpponentLeft);

    return () => {
      socket.off("x1:matchStart", onMatchStart);
      socket.off("x1:update", onUpdate);
      socket.off("x1:matchOver", onMatchOver);
      socket.off("x1:opponentLeft", onOpponentLeft);
    };
  }, [socket]);

  useEffect(() => {
    if (room?.status === "active" && !exercisesDetail) {
      Promise.all(room.exerciseIds.map((id) => getExercise(id))).then(setExercisesDetail);
    }
  }, [room, exercisesDetail]);

  useEffect(() => {
    if (room?.status !== "active" || matchOver) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [room?.status, matchOver]);

  if (!stored || !room) return null;

  const me = room.players.find((p) => p.nickname === stored.nickname) || room.players[0];
  const opponent = room.players.find((p) => p.nickname !== stored.nickname);

  function copyCode() {
    navigator.clipboard?.writeText(room.code).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 1500);
  }

  function leaveRoom() {
    socket.emit("x1:leave");
    sessionStorage.removeItem("pd_x1");
    navigate("/competitivo");
  }

  // -------- Tela de espera (apenas o host, antes do oponente entrar) --------
  if (room.status === "waiting") {
    return (
      <div className="max-w-md mx-auto flex flex-col items-center gap-6 text-center py-10">
        <h1 className="font-display font-semibold text-2xl tracking-tight">Aguardando oponente…</h1>
        <p className="text-[var(--muted)]">Envie este código para o seu amigo:</p>
        <button
          onClick={copyCode}
          className="font-mono-code text-4xl font-bold tracking-[0.3em] bg-[var(--surface)] border border-[var(--accent)] rounded-2xl px-8 py-6 hover:bg-[var(--surface-2)] transition-colors animate-pulse-glow"
        >
          {room.code}
        </button>
        <p className="text-xs text-[var(--muted)]">
          {copied ? "Copiado! ✓" : "Clique para copiar"}
        </p>
        <div className="flex items-center gap-2 text-[var(--muted)] text-sm mt-4">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          Esperando alguém entrar com o código…
        </div>
        <button
          onClick={leaveRoom}
          className="mt-6 text-sm text-[var(--danger)] hover:underline"
        >
          Cancelar sala
        </button>
      </div>
    );
  }

  // -------- Tela de fim de partida --------
  if (matchOver) {
    const won = matchOver.winner === stored.nickname;
    return (
      <div className="max-w-md mx-auto flex flex-col items-center gap-6 text-center py-10 animate-pop">
        <div className="text-7xl">{won ? "🏆" : "💀"}</div>
        <h1 className="font-display font-semibold text-3xl tracking-tight">
          {won ? "Você venceu!" : `${matchOver.winner} venceu!`}
        </h1>
        <p className="text-[var(--muted)]">
          Tempo: <span className="font-mono-code text-[var(--text)]">{formatElapsed(matchOver.elapsedMs)}</span>
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate("/competitivo/criar")}
            className="bg-[var(--accent)] text-white font-semibold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all"
          >
            Novo X1
          </button>
          <button
            onClick={leaveRoom}
            className="border border-[var(--border)] px-5 py-2.5 rounded-xl hover:bg-[var(--surface-2)] transition-colors"
          >
            Voltar ao menu
          </button>
        </div>
      </div>
    );
  }

  // -------- Sala ativa: desafios --------
  if (!exercisesDetail) {
    return <div className="h-96 rounded-2xl shimmer border border-[var(--border)]" />;
  }

  const currentEx = exercisesDetail[currentIndex];
  const currentCode = codeByExercise[currentEx.id] ?? currentEx.starterCode;
  const elapsed = room.startedAt ? now - room.startedAt : 0;

  async function handleRun() {
    setRunning(true);
    setResult(null);
    try {
      const r = await executeCode(currentEx.id, currentCode);
      setResult(r);
    } finally {
      setRunning(false);
    }
  }

  function handleAdvance() {
    socket.emit("x1:complete", { code: room.code, exerciseId: currentEx.id }, () => {});
    if (currentIndex < exercisesDetail.length - 1) {
      setCurrentIndex((i) => i + 1);
      setResult(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {opponentLeft && (
        <div className="rounded-xl border border-[var(--warning)]/50 bg-[var(--warning)]/10 text-[var(--warning)] text-sm px-4 py-2 text-center">
          Seu oponente saiu da sala.
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono-code text-sm bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-1.5">
            {room.code}
          </span>
          <span className="text-sm text-[var(--muted)]">
            {room.difficultyLabel} · Desafio {currentIndex + 1}/{exercisesDetail.length}
          </span>
        </div>
        <div className="font-mono-code text-2xl font-bold text-[var(--accent-2)]">
          {formatElapsed(elapsed)}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <PlayerProgress label={`Você (${stored.nickname})`} count={me?.completedCount ?? 0} total={exercisesDetail.length} highlight />
        <PlayerProgress label={opponent ? opponent.nickname : "Oponente"} count={opponent?.completedCount ?? 0} total={exercisesDetail.length} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-bold text-lg mb-2">{currentEx.title}</h2>
          <div className="text-sm leading-relaxed text-[var(--text)] whitespace-pre-wrap font-mono-code">
            {currentEx.theory}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <CodeEditor
            language={currentEx.language}
            value={currentCode}
            onChange={(v) => setCodeByExercise((prev) => ({ ...prev, [currentEx.id]: v }))}
            height="300px"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={handleRun}
              disabled={running}
              className="flex-1 bg-[var(--accent)] hover:brightness-110 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition-all"
            >
              {running ? "Executando…" : "▶ Executar e testar"}
            </button>
            <button
              onClick={handleAdvance}
              disabled={!result?.success}
              className="flex-1 bg-[var(--success)] hover:brightness-110 disabled:opacity-40 disabled:grayscale text-white font-semibold rounded-xl py-3 transition-all"
            >
              {currentIndex < exercisesDetail.length - 1 ? "Concluir e avançar →" : "Concluir desafio 🏁"}
            </button>
          </div>
          <OutputPanel result={result} running={running} />
        </div>
      </div>
    </div>
  );
}

function PlayerProgress({ label, count, total, highlight }) {
  const pct = total ? (count / total) * 100 : 0;
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-[var(--accent)]/50" : "border-[var(--border)]"} bg-[var(--surface)]`}>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold">{label}</span>
        <span className="text-[var(--muted)]">
          {count}/{total}
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${highlight ? "bg-[var(--accent)]" : "bg-[var(--accent-2)]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
