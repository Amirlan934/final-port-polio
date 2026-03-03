import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.budget || !formData.message) {
      alert('Please fill out all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-098d0831/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      console.log('✅ Contact form submitted successfully:', data);
      alert('Thank you! Your message has been submitted successfully. I\'ll get back to you as soon as possible.');
      
      // Reset form and close modal
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        budget: '',
        message: '',
      });
      onClose();
      
    } catch (error) {
      console.error('❌ Contact form submission error:', error);
      alert('Sorry, there was an error submitting your message. Please try again or contact directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="contact-form-modal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-[#2a2a2a] rounded-2xl z-[101] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            >
              <span className="text-sm font-light tracking-wider">CLOSE</span>
            </button>

            <div className="h-full flex flex-col lg:flex-row">
              {/* Left Side - Image */}
              <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1765366417030-16d9765d920a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNpZ24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxMDMzMjcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Professional Workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2a2a2a]/50" />
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-xl">
                  {/* Header */}
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    GET IN TOUCH
                  </h2>
                  <p className="text-white/60 text-sm mb-12">
                    Please fill out all fields, and I'll get back to you as soon as possible.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Message */}
                    <div>
                      <label className="block text-white text-sm mb-3">
                        Tell us more about your project*
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message*"
                        required
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Contact Details */}
                    <div>
                      <label className="block text-white text-sm mb-3">
                        Enter your contact details*
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name*"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 transition-colors"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name*"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email address*"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 transition-colors"
                        />
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400/50 transition-colors appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white [&>option]:py-2 [&>option]:px-3"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.3)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem',
                          }}
                        >
                          <option value="" disabled className="text-white/50">Choose your budget*</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-plus">$50,000+</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium py-4 rounded-lg transition-colors duration-300"
                    >
                      {isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}