import { MotionConfig } from "framer-motion";
import LandingNav from "../components/landing/LandingNav";
import Hero from "../components/landing/Hero";
import WhatIsSection from "../components/landing/WhatIsSection";
import ExercisesSection from "../components/landing/ExercisesSection";
import OneVOneSection from "../components/landing/OneVOneSection";
import FinalCta from "../components/landing/FinalCta";
import LandingFooter from "../components/landing/LandingFooter";

export default function Landing() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-full bg-[var(--bg)] text-[var(--text)]">
        <LandingNav />
        <main>
          <Hero />
          <WhatIsSection />
          <ExercisesSection />
          <OneVOneSection />
          <FinalCta />
        </main>
        <LandingFooter />
      </div>
    </MotionConfig>
  );
}
