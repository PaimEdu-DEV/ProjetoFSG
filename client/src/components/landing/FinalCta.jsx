import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";

export default function FinalCta() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight">
            Pronto pra programar de verdade?
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-5 text-[var(--muted)] text-lg">
            Gratuito pra começar. Sem enrolação, sem vídeo-aula de 40 minutos.
          </p>
        </Reveal>
        <Reveal delay={0.12} className="mt-9 flex justify-center">
          <Link
            to="/aprender"
            className="group inline-flex items-center gap-2 rounded-md bg-[var(--text)] text-[var(--bg)] font-medium px-6 py-3.5 text-lg hover:opacity-80 transition-opacity"
          >
            Começar agora
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
