import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Swords } from "lucide-react";
import HeroPreviewCard from "./HeroPreviewCard";

export default function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-mono text-[var(--muted)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)]" />
            código de verdade, no navegador
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold tracking-tight text-[2.6rem] leading-[1.05] sm:text-6xl mt-6"
          >
            Aprenda a programar
            <br />
            <span className="text-[var(--accent)]">de verdade.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-[var(--muted)] max-w-lg"
          >
            Exercícios práticos em Python, JavaScript e C# direto no navegador —
            e duelos de código ao vivo pra provar quem programa melhor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/aprender"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-white font-medium px-6 py-3.5 hover:brightness-110 transition-all hover:-translate-y-0.5 shadow-[0_12px_30px_-8px_rgba(79,91,255,0.6)]"
            >
              Começar a aprender
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#1x1"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3.5 font-medium text-[var(--text)] hover:border-[var(--accent-2)] hover:text-[var(--accent-2)] transition-colors"
            >
              <Swords size={16} />
              Ver o Modo 1x1
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroPreviewCard />
        </div>
      </div>
    </section>
  );
}
