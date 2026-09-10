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
    <section id="exercicios" className="py-20 sm:py-28 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
              Exercícios que treinam lógica de verdade.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-[var(--muted)] text-lg">
              Escolha uma linguagem, escolha um nível, e resolva. Cada desafio roda
              seu código contra casos de teste reais — sem gabarito escondido.
            </p>
          </Reveal>

          <ul className="mt-8 flex flex-col">
            {BULLETS.map((text, i) => (
              <Reveal
                key={text}
                delay={0.1 + i * 0.05}
                as="li"
                className={`py-3.5 text-[15px] ${i !== 0 ? "border-t border-[var(--border)]" : ""}`}
              >
                {text}
              </Reveal>
            ))}
          </ul>
        </div>

        <Parallax range={20}>
          <Reveal delay={0.1} y={24}>
            <ExercisePreviewMock />
          </Reveal>
        </Parallax>
      </div>
    </section>
  );
}
