import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Clock, 
  DollarSign, 
  User, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Circle,
  X,
  MessageSquare
} from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface ContactInquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  budget: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  submittedAt: string;
  updatedAt?: string;
  notes?: string;
}

export function ContactInquiriesPanel() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-098d0831/contacts`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load inquiries');
      }

      setInquiries(data.contacts || []);
    } catch (error) {
      console.error('Error loading inquiries:', error);
      alert('Failed to load contact inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'unread' | 'read' | 'replied') => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-098d0831/contact/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      // Update local state
      setInquiries(prev => prev.map(inq => 
        inq.id === id ? { ...inq, status } : inq
      ));

      if (selectedInquiry?.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Энэ хүсэлтийг устгах уу?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-098d0831/contact/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete inquiry');
      }

      // Remove from local state
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  const viewInquiry = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    // Mark as read if it was unread
    if (inquiry.status === 'unread') {
      updateStatus(inquiry.id, 'read');
    }
  };

  const getBudgetLabel = (budget: string) => {
    const labels: Record<string, string> = {
      'under-5k': 'Under $5,000',
      '5k-10k': '$5,000 - $10,000',
      '10k-25k': '$10,000 - $25,000',
      '25k-50k': '$25,000 - $50,000',
      '50k-plus': '$50,000+',
    };
    return labels[budget] || budget;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'all') return true;
    return inq.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <Circle className="w-4 h-4 text-blue-400 fill-blue-400" />;
      case 'read':
        return <Eye className="w-4 h-4 text-yellow-400" />;
      case 'replied':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'read':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'replied':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">Loading inquiries...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total</p>
              <p className="text-2xl font-bold text-white">{inquiries.length}</p>
            </div>
            <Mail className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-300">Unread</p>
              <p className="text-2xl font-bold text-blue-400">
                {inquiries.filter(i => i.status === 'unread').length}
              </p>
            </div>
            <Circle className="w-8 h-8 text-blue-400 fill-blue-400" />
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-300">Read</p>
              <p className="text-2xl font-bold text-yellow-400">
                {inquiries.filter(i => i.status === 'read').length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Replied</p>
              <p className="text-2xl font-bold text-green-400">
                {inquiries.filter(i => i.status === 'replied').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {(['all', 'unread', 'read', 'replied'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 border-b-2 transition-colors capitalize ${
              filter === status
                ? 'border-purple-400 text-purple-400'
                : 'border-transparent text-white/60 hover:text-white/80'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="space-y-3">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No inquiries found</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white/5 border rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                inquiry.status === 'unread' ? 'border-blue-500/30' : 'border-white/10'
              }`}
              onClick={() => viewInquiry(inquiry)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(inquiry.status)}
                    <h3 className="text-white font-medium">
                      {inquiry.firstName} {inquiry.lastName}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Mail className="w-4 h-4" />
                      {inquiry.email}
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <DollarSign className="w-4 h-4" />
                      {getBudgetLabel(inquiry.budget)}
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4" />
                      {formatDate(inquiry.submittedAt)}
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mt-2 line-clamp-2">
                    {inquiry.message}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      viewInquiry(inquiry);
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteInquiry(inquiry.id);
                    }}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-white/60 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedInquiry(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-[#1a1a1a] border border-white/10 rounded-2xl z-50 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h2 className="text-2xl text-white font-bold">
                      {selectedInquiry.firstName} {selectedInquiry.lastName}
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      {formatDate(selectedInquiry.submittedAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="max-w-3xl space-y-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Mail className="w-5 h-5 text-purple-400" />
                          <p className="text-sm text-white/60">Email</p>
                        </div>
                        <a 
                          href={`mailto:${selectedInquiry.email}`}
                          className="text-white hover:text-purple-400 transition-colors"
                        >
                          {selectedInquiry.email}
                        </a>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="w-5 h-5 text-purple-400" />
                          <p className="text-sm text-white/60">Budget</p>
                        </div>
                        <p className="text-white">{getBudgetLabel(selectedInquiry.budget)}</p>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-white font-medium mb-3">Message</h3>
                      <p className="text-white/80 whitespace-pre-wrap">{selectedInquiry.message}</p>
                    </div>

                    {/* Status Actions */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-white font-medium mb-4">Status</h3>
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateStatus(selectedInquiry.id, 'unread')}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedInquiry.status === 'unread'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <Circle className="w-4 h-4 inline mr-2" />
                          Unread
                        </button>
                        <button
                          onClick={() => updateStatus(selectedInquiry.id, 'read')}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedInquiry.status === 'read'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <Eye className="w-4 h-4 inline mr-2" />
                          Read
                        </button>
                        <button
                          onClick={() => updateStatus(selectedInquiry.id, 'replied')}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedInquiry.status === 'replied'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                          Replied
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={`mailto:${selectedInquiry.email}?subject=Re: Your Portfolio Inquiry`}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        Reply via Email
                      </a>
                      <button
                        onClick={() => deleteInquiry(selectedInquiry.id)}
                        className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
