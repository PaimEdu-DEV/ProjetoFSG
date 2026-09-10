import { motion } from "framer-motion";
import { Check } from "lucide-react";

const LINES = [
  { t: [{ c: "kw", v: "def " }, { c: "fn", v: "media" }, { v: "(notas):" }] },
  { t: [{ v: "    " }, { c: "kw", v: "return " }, { v: "sum(notas) / " }, { c: "fn", v: "len" }, { v: "(notas)" }] },
  { t: [] },
  { t: [{ c: "cm", v: "# teste rápido" }] },
  { t: [{ v: "media([" }, { c: "num", v: "8, 9, 10" }, { v: "])" }] },
];

export default function HeroPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, y: -4 }}
      className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_80px_-20px_rgba(79,91,255,0.35)] overflow-hidden"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f0475a]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#f5a623]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2fe6a6]/70" />
        <span className="ml-3 text-xs text-[var(--muted)] font-mono">exercicio_01.py</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed">
        {LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.18, duration: 0.3 }}
            className="whitespace-pre min-h-[1.4em]"
          >
            {line.t.map((tok, j) => (
              <span
                key={j}
                className={
                  tok.c === "kw"
                    ? "text-[var(--accent)]"
                    : tok.c === "fn"
                      ? "text-[var(--accent-2)]"
                      : tok.c === "num"
                        ? "text-[#f5a623]"
                        : tok.c === "cm"
                          ? "text-[var(--muted)]"
                          : "text-[var(--text)]"
                }
              >
                {tok.v}
              </span>
            ))}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.4 }}
          className="mt-4 flex items-center gap-2 text-xs text-[var(--accent-2)] font-sans font-medium"
        >
          <Check size={14} />
          3 de 3 testes passaram
        </motion.div>
      </div>
    </motion.div>
  );
}
