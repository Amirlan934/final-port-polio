import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  baseY: number; // Base Y position for parallax calculation
  size: number;
  speedY: number;
  parallaxFactor: number; // How much this particle responds to scroll
  opacity: number;
  opacityDirection: number;
  opacitySpeed: number;
  color: string;
  blur: number;
  brightness: number;
}

const COLORS = [
  'rgba(167, 139, 250, ', // violet
  'rgba(196, 181, 253, ', // lighter purple
  'rgba(221, 214, 254, ', // very light purple
  'rgba(255, 255, 255, ', // white
];

export function SparkleParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  // Track scroll position for parallax
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Density based on screen size
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas.width, canvas.height));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // CONTINUOUS ambient movement - very subtle vertical drift
        particle.baseY += particle.speedY;

        // Apply parallax based on scroll ON TOP of ambient movement
        const parallaxOffset = scrollY * particle.parallaxFactor;
        particle.y = particle.baseY + parallaxOffset;

        // Reset particle when it goes off screen (for continuous flow)
        if (particle.speedY > 0 && particle.baseY > canvas.height + 50) {
          particle.baseY = -50;
          particle.x = Math.random() * canvas.width;
        } else if (particle.speedY < 0 && particle.baseY < -50) {
          particle.baseY = canvas.height + 50;
          particle.x = Math.random() * canvas.width;
        }

        // CONTINUOUS twinkling - gentle opacity fade in/out
        particle.opacity += particle.opacityDirection * particle.opacitySpeed;
        if (particle.opacity >= particle.brightness || particle.opacity <= 0.1) {
          particle.opacityDirection *= -1;
          particle.opacity = Math.max(0.1, Math.min(particle.brightness, particle.opacity));
        }

        // Only draw if particle is visible on screen
        if (particle.y > -50 && particle.y < canvas.height + 50) {
          // Draw particle with glow
          ctx.save();
          
          // Outer glow
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 3
          );
          gradient.addColorStop(0, particle.color + particle.opacity + ')');
          gradient.addColorStop(0.5, particle.color + (particle.opacity * 0.3) + ')');
          gradient.addColorStop(1, particle.color + '0)');
          
          ctx.fillStyle = gradient;
          ctx.filter = `blur(${particle.blur}px)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();

          // Core particle (brighter)
          ctx.filter = 'blur(0px)';
          ctx.fillStyle = particle.color + particle.opacity + ')';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, scrollY]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

function createParticle(width: number, height: number): Particle {
  const size = Math.random() * 2 + 0.5; // 0.5 to 2.5px
  const speedY = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1); // -0.7 to 0.7 (vertical flow)
  const brightness = Math.random() * 0.6 + 0.3; // 0.3 to 0.9
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const blur = Math.random() * 1.5 + 0.5; // 0.5 to 2px blur
  const parallaxFactor = Math.random() * 0.15 + 0.05; // 0.05 to 0.2 (particles at different depths)
  const baseY = Math.random() * height;

  return {
    x: Math.random() * width,
    y: baseY,
    baseY,
    size,
    speedY,
    parallaxFactor,
    opacity: Math.random() * brightness,
    opacityDirection: Math.random() > 0.5 ? 1 : -1,
    opacitySpeed: Math.random() * 0.005 + 0.002, // Very slow twinkling
    color,
    blur,
    brightness,
  };
}