import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroPreviewCard from "./HeroPreviewCard";

export default function Hero() {
  return (
    <section id="top" className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-end">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold tracking-tight text-[2.75rem] leading-[1.05] sm:text-[4.2rem]"
          >
            Aprenda a programar
            <br />
            escrevendo código.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-lg text-[var(--muted)] max-w-md"
          >
            Exercícios práticos em Python, JavaScript e C# direto no navegador
            — e duelos de código ao vivo pra provar quem programa melhor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/aprender"
              className="group inline-flex items-center gap-2 rounded-md bg-[var(--text)] text-[var(--bg)] font-medium px-5 py-3 hover:opacity-80 transition-opacity"
            >
              Começar a aprender
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#1x1"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-5 py-3 font-medium hover:border-[var(--text)] transition-colors"
            >
              Ver o Modo 1x1
            </a>
          </motion.div>
        </div>

        <HeroPreviewCard />
      </div>
    </section>
  );
}
