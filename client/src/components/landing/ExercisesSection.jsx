import { CircleCheck } from "lucide-react";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import ExercisePreviewMock from "./ExercisePreviewMock";

const BULLETS = [
  "Teoria curta antes de cada desafio — só o necessário pra começar.",
  "3 níveis de dificuldade por linguagem: iniciante, intermediário, avançado.",
  "Ganhe XP e suba de nível a cada exercício resolvido.",
];

export default function ExercisesSection() {
  return (
    <section id="exercicios" className="py-24 sm:py-32 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <span className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest">
              Modo Aprendizado
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mt-3">
              Exercícios que treinam lógica de verdade.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[var(--muted)] text-lg">
              Escolha uma linguagem, escolha um nível, e resolva. Cada desafio roda
              seu código contra casos de teste reais — sem gabarito escondido.
            </p>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-3.5">
            {BULLETS.map((text, i) => (
              <Reveal key={text} delay={0.15 + i * 0.05} as="li" className="flex items-start gap-3 text-sm">
                <CircleCheck size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">{text}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Parallax range={24}>
          <Reveal delay={0.1} y={32}>
            <ExercisePreviewMock />
          </Reveal>
        </Parallax>
      </div>
    </section>
  );
}
