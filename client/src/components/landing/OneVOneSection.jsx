import { Link } from "react-router-dom";
import { Users, Timer, Trophy, ArrowRight } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import CodeRacePreview from "./CodeRacePreview";

const STEPS = [
  { icon: Users, title: "Crie uma sala", text: "Escolha linguagem e dificuldade, e convide alguém com um código." },
  { icon: Timer, title: "Mesmo desafio, ao vivo", text: "Os dois recebem exatamente o mesmo exercício, ao mesmo tempo." },
  { icon: Trophy, title: "Quem resolve primeiro vence", text: "Precisa passar nos testes — velocidade sem acerto não conta." },
];

export default function OneVOneSection() {
  return (
    <section
      id="1x1"
      className="relative py-24 sm:py-32 border-t border-[var(--border)] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(700px 400px at 50% 0%, var(--accent-2-soft), transparent)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <span className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest">
              O diferencial
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mt-3">
              Modo 1x1: duelo de código em tempo real.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[var(--muted)] text-lg">
              Crie uma sala, chame um amigo, e resolvam o mesmo problema ao mesmo
              tempo. Quem entrega uma solução correta primeiro, vence.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={40} className="mt-16">
          <CodeRacePreview />
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-3 gap-6 mt-16">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-2-soft)] flex items-center justify-center text-[var(--accent-2)] mx-auto sm:mx-0">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold mt-4">{title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1.5 leading-relaxed">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="flex justify-center mt-14">
          <Link
            to="/competitivo"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent-2)] text-[#04140f] font-semibold px-6 py-3.5 hover:brightness-110 transition-all hover:-translate-y-0.5 shadow-[0_12px_30px_-8px_rgba(47,230,166,0.5)]"
          >
            Entrar na arena
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
