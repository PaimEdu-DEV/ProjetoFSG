import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2 } from "lucide-react";

const LANGS = [
  { key: "python", label: "Python", color: "var(--py)", snippet: 'def eh_par(n):\n    return n % 2 == 0' },
  { key: "javascript", label: "JavaScript", color: "var(--js)", snippet: "function ehPar(n) {\n  return n % 2 === 0;\n}" },
  { key: "csharp", label: "C#", color: "var(--cs)", snippet: "bool EhPar(int n) {\n    return n % 2 == 0;\n}" },
];

export default function ExercisePreviewMock() {
  const [active, setActive] = useState("python");
  const current = LANGS.find((l) => l.key === active);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-[0_30px_80px_-24px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-1 border-b border-[var(--border)] px-2 pt-2">
        {LANGS.map((lang) => (
          <button
            key={lang.key}
            onClick={() => setActive(lang.key)}
            className="relative px-3.5 py-2.5 text-sm font-medium transition-colors"
            style={{ color: active === lang.key ? "var(--text)" : "var(--muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: lang.color }}
              />
              {lang.label}
            </span>
            {active === lang.key && (
              <motion.div
                layoutId="lang-underline"
                className="absolute left-2 right-2 -bottom-px h-0.5 rounded-full"
                style={{ background: lang.color }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-wide text-[var(--muted)] font-mono mb-3">
          desafio · iniciante
        </p>
        <h4 className="font-semibold mb-3">Verifique se um número é par</h4>

        <AnimatePresence mode="wait">
          <motion.pre
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[13px] leading-relaxed bg-[var(--surface-2)] rounded-xl p-4 overflow-x-auto whitespace-pre"
          >
            <code className="text-[var(--text)]">{current.snippet}</code>
          </motion.pre>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between">
          <button className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-lg bg-[var(--accent)] text-white">
            <Play size={13} fill="currentColor" />
            Rodar testes
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-2)] font-medium">
            <CheckCircle2 size={14} />
            2 / 2 testes ok
          </span>
        </div>
      </div>
    </div>
  );
}
