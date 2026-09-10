import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section className="py-24 sm:py-32 border-t border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight">
            Pronto pra programar de verdade?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 text-[var(--muted)] text-lg">
            Gratuito pra começar. Sem enrolação, sem vídeo-aula de 40 minutos.
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-9 flex justify-center">
          <Link
            to="/aprender"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-white font-medium px-7 py-4 text-lg hover:brightness-110 transition-all hover:-translate-y-0.5 shadow-[0_12px_30px_-8px_rgba(79,91,255,0.6)]"
          >
            Começar agora
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
