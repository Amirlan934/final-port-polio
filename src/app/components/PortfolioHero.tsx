import { motion } from "motion/react";
import { easing } from "../utils/motion";
import { ChevronDown } from "lucide-react";
import { FlipCard } from "./FlipCard";
import { usePortfolio } from "../contexts/PortfolioContext";

export function PortfolioHero() {
  const { heroContent, aboutSection } = usePortfolio();

  // Fallback content if admin data is empty
  const greeting = heroContent.greeting || "HELLO, I'M";
  const title = heroContent.title || "Jane Anderson";
  const subtitle = heroContent.subtitle || "DESIGNER";
  const description =
    heroContent.description ||
    "Creating beautiful digital experiences that blend creativity with functionality. Specializing in UI/UX design for modern web and mobile applications.";
  const primaryCTA = heroContent.primaryCTA || "View My Work";
  const portraitImage = heroContent.portraitImage || "";

  const role = aboutSection.role || "Senior UI/UX Designer";
  const focus = aboutSection.focus || "Mobile & Web Applications";
  const experience = aboutSection.experience || "8+ Years Experience";

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 overflow-hidden" style={{ position: "relative" }}>
      {/* Dark gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* OVERSIZED BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: easing }}
          className="text-[15vw] md:text-[18vw] lg:text-[20vw] font-black text-white/[0.08] tracking-tighter leading-none whitespace-nowrap select-none uppercase">
          {subtitle}
        </motion.h1>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: easing }}>
              <p className="text-purple-400 tracking-[0.3em] uppercase text-xs font-medium">{greeting}</p>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: easing }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mt-6">
              {title}
              <br />
              <span className="text-purple-400">{subtitle}</span>
            </motion.h2>

            {/* Subheading - Improved spacing and readability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: easing }}
              className="flex justify-center lg:justify-start mt-6">
              <p className="text-base md:text-lg text-gray-400 max-w-[550px] leading-[1.6]">{description}</p>
            </motion.div>

            {/* CTA Button with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: easing }}
              className="mt-8">
              <motion.a
                href="#work"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-purple-500 text-white rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative z-10 font-medium">{primaryCTA}</span>

                {/* Arrow icon */}
                <svg
                  className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* CENTER/RIGHT: Portrait Image with Flip Card - Added top margin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: easing }}
            className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 mt-20 lg:mt-20">
            <FlipCard
              frontImage={portraitImage}
              backContent={{
                role: role,
                focus: focus,
                experience: experience
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6, ease: easing }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: easing }}>
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
