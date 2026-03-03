import { motion } from 'motion/react';
import { easing, staggerChildren } from '../utils/motion';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { useState } from 'react';
import { ContactFormModal } from './ContactFormModal';

const socials = [
  { icon: Mail, label: 'Email', href: 'mailto:hello@designer.com', username: 'hello@designer.com' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', username: '/designer' },
  { icon: Twitter, label: 'Twitter', href: '#', username: '@designer' },
  { icon: Github, label: 'GitHub', href: '#', username: '/designer' },
];

export function PortfolioContact() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24" style={{ position: 'relative' }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 backdrop-blur-[2px]" />
      
      <div className="max-w-5xl mx-auto relative text-center space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easing }}
          className="space-y-8"
        >
          <p className="text-purple-400/70 tracking-[0.2em] uppercase text-xs md:text-sm">
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95]">
            Let's create
            <br />
            something
            <br />
            <span className="text-purple-400">extraordinary</span>
          </h2>
          
          {/* Paragraph with improved spacing and styling */}
          <div className="flex justify-center mt-8">
            <p className="text-xl md:text-2xl text-gray-400/90 font-light leading-[1.6] max-w-[700px]">
              I'm currently available for select projects. Let's discuss how we can work together.
            </p>
          </div>
        </motion.div>

        {/* CTA - Increased spacing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: easing }}
          className="pt-4"
        >
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-black hover:bg-purple-400 hover:text-white rounded-full transition-all duration-500 text-xl font-normal cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a Conversation
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: easing }}
          className="pt-16"
        >
          <p className="text-gray-500 text-sm tracking-wider uppercase mb-10">
            Connect with me
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: staggerChildren(index, 0.08),
                    ease: easing 
                  }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{social.label}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8, ease: easing }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6"
      >
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 UI/UX Designer. Crafted with intention.
          </p>
        </div>
      </motion.div>

      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}