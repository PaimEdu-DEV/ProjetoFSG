import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { getExercises } from "../api";
import { useMeta } from "../hooks/useMeta";
import { useProgress } from "../context/ProgressContext";
import { RevealGroup, RevealItem } from "../components/Reveal";

export default function LearnExerciseList() {
  const { language, difficulty } = useParams();
  const meta = useMeta();
  const { isCompleted } = useProgress();
  const [exercises, setExercises] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setExercises(null);
    setError(null);
    getExercises(language, difficulty)
      .then(setExercises)
      .catch((e) => setError(e.message));
  }, [language, difficulty]);

  const lang = meta?.languages?.[language];
  const diff = meta?.difficulties?.[difficulty];
  const doneCount = exercises ? exercises.filter((e) => isCompleted(e.id)).length : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <div className="text-3xl mb-2">{lang?.icon}</div>
        <h1 className="font-display font-semibold text-3xl tracking-tight">
          {lang?.label} · {diff?.label}
        </h1>
        {exercises && (
          <p className="text-[var(--muted)] mt-2">
            {doneCount}/{exercises.length} exercícios concluídos
          </p>
        )}
      </div>

      {error && <div className="text-center text-[var(--danger)]">{error}</div>}

      {!exercises && !error && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl shimmer border border-[var(--border)]" />
          ))}
        </div>
      )}

      {exercises && (
        <RevealGroup className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
          {exercises.map((ex, i) => {
            const done = isCompleted(ex.id);
            return (
              <RevealItem key={ex.id}>
                <Link
                  to={`/aprender/${language}/${difficulty}/${ex.id}`}
                  className={`flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${
                    done
                      ? "border-[var(--success)]/40 bg-[var(--success-soft)]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold ${
                      done
                        ? "bg-[var(--success)] text-white"
                        : "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--border)]"
                    }`}
                  >
                    {done ? <Check size={16} /> : i + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">{ex.title}</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {ex.mode === "stdout" ? "Saída no console" : "Implementação de função"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[var(--accent-2)]">+{ex.xp} XP</span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      )}
    </div>
  );
}
