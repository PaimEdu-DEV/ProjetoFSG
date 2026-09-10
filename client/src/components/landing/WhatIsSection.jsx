import Reveal, { RevealGroup, RevealItem } from "./Reveal";

const POINTS = [
  {
    n: "01",
    title: "Prática, não slide",
    text: "Sem vídeo-aula passiva: você escreve código real desde o primeiro minuto.",
  },
  {
    n: "02",
    title: "Feedback instantâneo",
    text: "Seu código roda de verdade contra os testes do exercício — sem enrolação.",
  },
  {
    n: "03",
    title: "Progresso visível",
    text: "XP, níveis e dificuldade crescente em Python, JavaScript e C#.",
  },
];

export default function WhatIsSection() {
  return (
    <section id="o-que-e" className="py-20 sm:py-28 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
        <div>
          <Reveal>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight leading-tight">
              Uma plataforma pra quem quer aprender programando.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[var(--muted)] text-lg">
              DevCore troca a teoria arrastada por exercícios curtos e diretos,
              com execução real de código no navegador.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="flex flex-col">
          {POINTS.map(({ n, title, text }, i) => (
            <RevealItem
              key={n}
              className={`flex items-baseline gap-6 py-6 ${i !== 0 ? "border-t border-[var(--border)]" : ""}`}
            >
              <span className="font-display text-sm text-[var(--muted)] shrink-0">{n}</span>
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-[var(--muted)] mt-1.5 leading-relaxed">{text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
