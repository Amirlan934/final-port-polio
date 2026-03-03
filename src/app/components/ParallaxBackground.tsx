import { useState, useEffect } from 'react';

interface ParallaxBackgroundProps {
  imageUrl: string;
}

export function ParallaxBackground({ imageUrl }: ParallaxBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // Parallax calculation: 30% of scroll speed (increased for more noticeable effect)
  // Scale calculation: 1 → 1.05 based on scroll (increased for better depth)
  const parallaxSpeed = 0.3;
  const translateY = prefersReducedMotion ? 0 : scrollY * parallaxSpeed;
  const scale = prefersReducedMotion ? 1 : 1 + Math.min(scrollY / 8000, 0.05);

  return (
    <>
      {/* Fixed Background Container */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-black">
        {/* Background Image with Parallax - Extended height for parallax room */}
        <div
          className="absolute w-full"
          style={{
            top: '-20%',
            height: '140%',
            transform: `translateY(${translateY}px) scale(${scale})`,
            willChange: prefersReducedMotion ? 'auto' : 'transform',
            transition: 'none', // Remove any transitions that might cause auto-movement
            transformOrigin: 'center center',
          }}
        >
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            onError={(e) => console.error('Background image failed to load:', e)}
            onLoad={() => console.log('Background image loaded successfully:', imageUrl)}
          />
        </div>

        {/* Lighter Dark Gradient Overlay - to see parallax better */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

        {/* Lighter Vignette Effect */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 100%)'
          }}
        />

        {/* Additional subtle color overlay for cohesion */}
        <div className="absolute inset-0 bg-purple-950/10 mix-blend-overlay" />
      </div>
    </>
  );
}