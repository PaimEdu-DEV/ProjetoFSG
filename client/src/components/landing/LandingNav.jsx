import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoMark from "../../assets/devcore-logo.png";

const LINKS = [
  { href: "#o-que-e", label: "O que é" },
  { href: "#exercicios", label: "Exercícios" },
  { href: "#1x1", label: "Modo 1x1" },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <img src={logoMark} alt="DevCore" className="h-6 w-auto object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/aprender"
            className="text-sm font-medium px-4 py-2 rounded-md bg-[var(--text)] text-[var(--bg)] hover:opacity-80 transition-opacity"
          >
            Começar agora
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--text)]"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--bg)] border-b border-[var(--border)]"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/aprender"
                className="text-sm font-medium text-center px-4 py-2.5 rounded-md bg-[var(--text)] text-[var(--bg)]"
              >
                Começar agora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
