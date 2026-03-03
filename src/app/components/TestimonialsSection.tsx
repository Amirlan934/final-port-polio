import { motion } from 'motion/react';
import { easing } from '../utils/motion';
import { Quote } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export function TestimonialsSection() {
  const { testimonials } = usePortfolio();

  // Don't render if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24" style={{ position: 'relative' }}>
      {/* Soft gradient */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easing }}
          className="text-center mb-32"
        >
          <p className="text-purple-400/70 tracking-[0.15em] uppercase text-xs md:text-sm mb-8">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight max-w-4xl mx-auto">
            Client feedback
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: easing,
              }}
              className="space-y-8"
            >
              {/* Quote */}
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-white text-lg mb-1">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role} @ {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}