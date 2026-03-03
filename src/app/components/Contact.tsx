import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress using window scroll
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // Create smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect for background
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const backgroundScale = useTransform(smoothProgress, [0, 0.5, 1], [1.05, 1, 1.02]);

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="scroll-container min-h-screen py-32 px-6"
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{
          y: backgroundY as MotionValue<string>,
          scale: backgroundScale,
        }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] parallax-container"
      >
        <div className="w-full h-full bg-gradient-to-t from-purple-900/30 via-zinc-950 to-black" />
        {/* Additional dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white/60 mb-4 tracking-widest text-sm"
          >
            GET IN TOUCH
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.08 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-7xl mb-8"
          >
            Let's Work Together
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.12 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl text-white/70 mb-16 max-w-2xl mx-auto"
          >
            I'm always open to new opportunities and interesting projects. 
            Feel free to reach out if you'd like to collaborate.
          </motion.p>

          <motion.a
            href="mailto:hello@example.com"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02, color: '#c084fc' }}
            className="inline-block text-3xl md:text-5xl transition-colors duration-300 mb-16"
          >
            hello@example.com
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.28 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center gap-6 mb-16"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  opacity: { duration: 0.4, ease: easing, delay: 0.32 + index * 0.05 },
                  y: { duration: 0.4, ease: easing, delay: 0.32 + index * 0.05 },
                  scale: { duration: 0.2, ease: easing },
                }}
                viewport={{ once: true }}
                className="group p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                aria-label={social.label}
              >
                <social.icon size={24} className="group-hover:text-purple-400 transition-colors duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Footer with completion animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-white/40 text-sm"
          >
            <p>© 2024 Your Name. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const socialLinks = [
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];