import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExercise, getExercises, executeCode } from "../api";
import { useProgress } from "../context/ProgressContext";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";

function draftKey(id) {
  return `pd_draft_${id}`;
}

export default function LearnExercise() {
  const { language, difficulty, exerciseId } = useParams();
  const navigate = useNavigate();
  const { isCompleted, completeExercise } = useProgress();

  const [exercise, setExercise] = useState(null);
  const [siblings, setSiblings] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setExercise(null);
    setResult(null);
    setShowHints(false);
    setJustCompleted(false);
    setError(null);

    getExercise(exerciseId)
      .then((ex) => {
        setExercise(ex);
        const saved = localStorage.getItem(draftKey(exerciseId));
        setCode(saved ?? ex.starterCode);
      })
      .catch((e) => setError(e.message));

    getExercises(language, difficulty).then(setSiblings).catch(() => {});
  }, [exerciseId, language, difficulty]);

  useEffect(() => {
    if (!exercise || exercise.id !== exerciseId) return;
    localStorage.setItem(draftKey(exerciseId), code);
  }, [code, exercise, exerciseId]);

  const nextExercise = useMemo(() => {
    if (!siblings) return null;
    const idx = siblings.findIndex((e) => e.id === exerciseId);
    return idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  }, [siblings, exerciseId]);

  async function handleRun() {
    setRunning(true);
    setResult(null);
    try {
      const r = await executeCode(exerciseId, code);
      setResult(r);
      if (r.success) {
        const wasNew = completeExercise(exerciseId, exercise.xp);
        setJustCompleted(wasNew);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setRunning(false);
    }
  }

  function handleReset() {
    if (!exercise) return;
    setCode(exercise.starterCode);
    setResult(null);
  }

  if (error) {
    return <div className="text-center text-[var(--danger)]">{error}</div>;
  }

  if (!exercise) {
    return <div className="h-96 rounded-2xl shimmer border border-[var(--border)]" />;
  }

  const alreadyDone = isCompleted(exerciseId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
            {language} · {difficulty}
          </p>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            {exercise.title}
            {alreadyDone && <span className="text-[var(--success)] text-lg">✓</span>}
          </h1>
        </div>
        <span className="text-sm font-semibold text-[var(--accent-2)] bg-[var(--surface-2)] border border-[var(--border)] px-3 py-1.5 rounded-full">
          +{exercise.xp} XP
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="font-bold mb-3 text-[var(--accent)]">📖 Teoria</h2>
            <div className="text-sm leading-relaxed text-[var(--text)] whitespace-pre-wrap font-mono-code">
              {exercise.theory}
            </div>
          </div>

          {exercise.sampleArgs && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="font-bold mb-2 text-sm text-[var(--muted)]">
                Exemplos de chamada
              </h2>
              <ul className="font-mono-code text-sm space-y-1">
                {exercise.sampleArgs.map((args, i) => (
                  <li key={i} className="text-[var(--accent-2)]">
                    {exercise.functionName || "f"}({args.map((a) => JSON.stringify(a)).join(", ")})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {exercise.hints?.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <button
                onClick={() => setShowHints((s) => !s)}
                className="font-bold text-sm text-[var(--warning)] flex items-center gap-2"
              >
                💡 {showHints ? "Esconder dicas" : "Mostrar dicas"}
              </button>
              {showHints && (
                <ul className="mt-3 space-y-2 text-sm text-[var(--muted)] list-disc list-inside">
                  {exercise.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <CodeEditor language={exercise.language} value={code} onChange={setCode} />

          <div className="flex items-center gap-3">
            <button
              onClick={handleRun}
              disabled={running}
              className="flex-1 bg-[var(--accent)] hover:brightness-110 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition-all"
            >
              {running ? "Executando…" : "▶ Executar e testar"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-2)] text-sm text-[var(--muted)] transition-colors"
            >
              Reiniciar
            </button>
          </div>

          <OutputPanel result={result} running={running} />

          {result?.success && (
            <div className="animate-pop rounded-2xl border border-[var(--success)]/50 bg-[var(--success)]/10 p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-bold text-[var(--success)]">
                  {justCompleted ? `+${exercise.xp} XP conquistados! 🎉` : "Exercício já concluído antes."}
                </p>
                <p className="text-sm text-[var(--muted)]">Mandou bem!</p>
              </div>
              {nextExercise ? (
                <Link
                  to={`/aprender/${language}/${difficulty}/${nextExercise.id}`}
                  className="bg-[var(--success)] text-white font-semibold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all"
                >
                  Próximo exercício →
                </Link>
              ) : (
                <button
                  onClick={() => navigate(`/aprender/${language}/${difficulty}`)}
                  className="bg-[var(--success)] text-white font-semibold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all"
                >
                  Concluir nível 🏁
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
