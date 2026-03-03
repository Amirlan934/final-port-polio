import { motion } from 'motion/react';
import { easing, staggerChildren } from '../utils/motion';
import { usePortfolio } from '../contexts/PortfolioContext';

export function PortfolioServices() {
  const { services } = usePortfolio();

  // Don't render if no services
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center px-6 py-24">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/20 backdrop-blur-[1px]" />
      
      <div className="max-w-7xl mx-auto relative w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easing }}
          className="text-center mb-24 md:mb-32"
        >
          <p className="text-purple-400/70 tracking-[0.15em] uppercase text-xs md:text-sm mb-8">
            Services
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight max-w-4xl mx-auto">
            What I offer
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: staggerChildren(index, 0.15),
                ease: easing,
              }}
              className="group"
            >
              <div className="space-y-6 p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl hover:border-purple-400/30 hover:bg-white/10 transition-all duration-500">
                {/* Number */}
                <div className="text-purple-400/50 text-sm tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-light text-white group-hover:text-purple-400 transition-colors duration-500">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-lg text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Image - if provided */}
                {service.image && (
                  <div className="mt-6 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}