import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Crown } from "lucide-react";

const CHALLENGE = [
  [{ c: "cm", v: "// desafio: soma dos pares" }],
  [{ c: "kw", v: "function " }, { c: "fn", v: "somaPares" }, { v: "(lista) {" }],
  [{ v: "  return lista" }],
  [{ v: "    .filter(n => n % 2 === 0)" }],
  [{ v: "    .reduce((a, b) => a + b, 0);" }],
  [{ v: "}" }],
];

const TOTAL_LINES = CHALLENGE.length;

function Panel({ name, linesShown, done, isWinner, accent }) {
  const pct = Math.round((linesShown / TOTAL_LINES) * 100);
  return (
    <div
      className="editor-chrome relative flex-1 min-w-0 rounded-xl border bg-[var(--ed-bg)] overflow-hidden transition-colors duration-500"
      style={{ borderColor: isWinner ? accent : "var(--ed-border)" }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--ed-border)]">
        <span className="text-sm font-medium text-[var(--ed-text)]">{name}</span>
        {isWinner && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md"
            style={{ background: `${accent}26`, color: accent }}
          >
            <Crown size={12} />
            venceu
          </motion.span>
        )}
      </div>

      <pre className="font-mono text-[12.5px] sm:text-sm leading-relaxed p-4 h-[210px] overflow-hidden whitespace-pre-wrap">
        {CHALLENGE.slice(0, linesShown).map((line, i) => (
          <div key={i}>
            {line.map((tok, j) => (
              <span
                key={j}
                className={
                  tok.c === "cm"
                    ? "text-[var(--ed-muted)]"
                    : tok.c === "kw"
                      ? "text-[var(--ed-accent)]"
                      : tok.c === "fn"
                        ? "text-[var(--ed-accent-2)]"
                        : "text-[var(--ed-text)]"
                }
              >
                {tok.v}
              </span>
            ))}
          </div>
        ))}
        {!done && <span className="inline-block w-1.5 h-4 bg-[var(--ed-text)] animate-pulse align-middle" />}
      </pre>

      <div className="h-1 bg-[var(--ed-surface-2)]">
        <motion.div
          className="h-full"
          style={{ background: accent }}
          animate={{ width: `${pct}%` }}
          transition={{ ease: "linear", duration: 0.3 }}
        />
      </div>
    </div>
  );
}

export default function CodeRacePreview() {
  const prefersReduced = useReducedMotion();
  const [linesA, setLinesA] = useState(prefersReduced ? TOTAL_LINES : 0);
  const [linesB, setLinesB] = useState(prefersReduced ? TOTAL_LINES : 0);
  const [winner, setWinner] = useState(prefersReduced ? "a" : null);
  const [round, setRound] = useState(0);
  const timeouts = useRef([]);

  useEffect(() => {
    if (prefersReduced) return undefined;

    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setLinesA(0);
    setLinesB(0);
    setWinner(null);

    const speedA = 420;
    const speedB = 560;

    for (let i = 1; i <= TOTAL_LINES; i++) {
      timeouts.current.push(setTimeout(() => setLinesA(i), i * speedA));
      timeouts.current.push(setTimeout(() => setLinesB(i), i * speedB));
    }
    timeouts.current.push(setTimeout(() => setWinner("a"), TOTAL_LINES * speedA));

    const restartAt = TOTAL_LINES * speedB + 3200;
    timeouts.current.push(setTimeout(() => setRound((r) => r + 1), restartAt));

    return () => timeouts.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, prefersReduced]);

  const doneA = linesA >= TOTAL_LINES;
  const doneB = linesB >= TOTAL_LINES;

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
        <Panel name="Jogador 1" linesShown={linesA} done={doneA} isWinner={winner === "a"} accent="#4f5bff" />

        <div className="hidden sm:flex items-center justify-center w-14 shrink-0 relative z-10">
          <div className="w-9 h-9 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[11px] font-mono text-[var(--muted)] font-semibold">
            vs
          </div>
        </div>

        <Panel name="Jogador 2" linesShown={linesB} done={doneB} isWinner={winner === "b"} accent="#2fe6a6" />
      </div>
    </div>
  );
}
