import { motion } from 'motion/react';
import { easing } from '../utils/motion';
import { Settings } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useState } from 'react';
import { ContactFormModal } from './ContactFormModal';
import { useNavigate, useLocation } from 'react-router';

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export function PortfolioNav() {
  const { cvData } = usePortfolio();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    
    console.log('CV Download clicked');
    console.log('CV Data:', cvData);
    
    if (!cvData) {
      alert('CV таныг хараахан оруулаагүй байна. Админ dashboard дээр CV оруулна уу.');
      return;
    }

    try {
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = cvData.fileData;
      link.download = cvData.fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Clean up after a short delay to ensure download starts
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
      console.log('CV download triggered successfully');
    } catch (error) {
      console.error('CV download error:', error);
      alert('CV татахад алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're on the home page, scroll to top
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      navigate('/');
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: easing }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          onClick={handleLogoClick}
          className="text-xl md:text-2xl font-light text-white tracking-tight cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          Designer
        </motion.a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.1,
                ease: easing,
              }}
              className="relative text-sm text-white/70 hover:text-white transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          
          {/* CV Download Link */}
          <motion.a
            href="#"
            onClick={handleDownloadCV}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6 + navLinks.length * 0.1,
              ease: easing,
            }}
            className="relative text-sm text-white/70 hover:text-white transition-colors duration-300 group cursor-pointer"
          >
            CV
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-400 group-hover:w-full transition-all duration-300" />
          </motion.a>
        </div>

        {/* CTA & Admin */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1, ease: easing }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex px-6 py-3 bg-white/10 hover:bg-white hover:text-black text-white backdrop-blur-sm rounded-full text-sm transition-all duration-300 border border-white/20 cursor-pointer"
          >
            Let's Talk
          </motion.button>

          <motion.a
            href="/admin"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: easing }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center w-10 h-10 bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 backdrop-blur-sm rounded-full transition-all duration-300 border border-purple-400/30"
            title="Admin"
          >
            <Settings className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Backdrop blur bar */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md" />
      
      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </motion.nav>
  );
}