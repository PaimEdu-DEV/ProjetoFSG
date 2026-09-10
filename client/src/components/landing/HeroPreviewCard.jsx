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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="editor-chrome relative w-full rounded-xl border border-[var(--ed-border)] bg-[var(--ed-bg)] overflow-hidden"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--ed-border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f0475a]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#f5a623]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--ed-accent-2)]/70" />
        <span className="ml-3 text-xs text-[var(--ed-muted)] font-mono">exercicio_01.py</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed">
        {LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.25 }}
            className="whitespace-pre min-h-[1.4em]"
          >
            {line.t.map((tok, j) => (
              <span
                key={j}
                className={
                  tok.c === "kw"
                    ? "text-[var(--ed-accent)]"
                    : tok.c === "fn"
                      ? "text-[var(--ed-accent-2)]"
                      : tok.c === "num"
                        ? "text-[#f5a623]"
                        : tok.c === "cm"
                          ? "text-[var(--ed-muted)]"
                          : "text-[var(--ed-text)]"
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
          transition={{ delay: 1.4, duration: 0.35 }}
          className="mt-4 flex items-center gap-2 text-xs text-[var(--ed-accent-2)] font-sans font-medium"
        >
          <Check size={14} />
          3 de 3 testes passaram
        </motion.div>
      </div>
    </motion.div>
  );
}
