import { Terminal, Zap, TrendingUp } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

const POINTS = [
  {
    icon: Terminal,
    title: "Prática, não slide",
    text: "Sem vídeo-aula passiva: você escreve código real desde o primeiro minuto.",
  },
  {
    icon: Zap,
    title: "Feedback instantâneo",
    text: "Seu código roda de verdade contra os testes do exercício — sem enrolação.",
  },
  {
    icon: TrendingUp,
    title: "Progresso visível",
    text: "XP, níveis e dificuldade crescente em Python, JavaScript e C#.",
  },
];

export default function WhatIsSection() {
  return (
    <section id="o-que-e" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest">
              O que é
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mt-3">
              Uma plataforma pra quem quer aprender programando.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[var(--muted)] text-lg">
              DevCore troca a teoria arrastada por exercícios curtos e diretos, com
              execução real de código no navegador. Você erra, ajusta, roda de novo —
              é assim que se aprende a programar.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-3 gap-6 mt-16">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <RevealItem
              key={title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold mt-4">{title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1.5 leading-relaxed">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
