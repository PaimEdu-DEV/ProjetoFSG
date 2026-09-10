import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import CodeRacePreview from "./CodeRacePreview";

const STEPS = [
  { n: "01", title: "Crie uma sala", text: "Escolha linguagem e dificuldade, e convide alguém com um código." },
  { n: "02", title: "Mesmo desafio, ao vivo", text: "Os dois recebem exatamente o mesmo exercício, ao mesmo tempo." },
  { n: "03", title: "Quem resolve primeiro vence", text: "Precisa passar nos testes — velocidade sem acerto não conta." },
];

export default function OneVOneSection() {
  return (
    <section id="1x1" className="py-20 sm:py-28 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
              Modo 1x1: duelo de código em tempo real.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-[var(--muted)] text-lg">
              Crie uma sala, chame um amigo, e resolvam o mesmo problema ao mesmo
              tempo. Quem entrega uma solução correta primeiro, vence.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={28} className="mt-14">
          <CodeRacePreview />
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-3 mt-16 border-t border-[var(--border)]">
          {STEPS.map(({ n, title, text }, i) => (
            <RevealItem
              key={n}
              className={`py-7 sm:pr-8 ${i !== 0 ? "sm:border-l border-[var(--border)] sm:pl-8" : ""}`}
            >
              <span className="font-display text-sm text-[var(--muted)]">{n}</span>
              <h3 className="font-semibold mt-2">{title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1.5 leading-relaxed">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-4">
          <Link
            to="/competitivo"
            className="group inline-flex items-center gap-2 rounded-md bg-[var(--text)] text-[var(--bg)] font-medium px-5 py-3 hover:opacity-80 transition-opacity"
          >
            Entrar na arena
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
