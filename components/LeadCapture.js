'use client';

import { useState } from 'react';
import { Mail, Building2, UserCircle, Lock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LeadCapture({ auditData, onSuccess }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/save-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          role,
          auditData,
          shareableLink: typeof window !== 'undefined' ? window.location.href : null
        })
      });
      if (response.ok) {
        toast.success('Report saved! Check your email.');
        onSuccess && onSuccess();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/5 p-8 md:p-10 max-w-md mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Get Your Full Report</h3>
      <p className="text-gray-600 mb-8 leading-relaxed">Enter your email to receive a detailed breakdown and personalized recommendations.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
            <Mail size={15} className="text-gray-400" /> Email Address *
          </label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm"
            placeholder="you@example.com" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
            <Building2 size={15} className="text-gray-400" /> Company Name
          </label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm"
            placeholder="Your startup" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
            <UserCircle size={15} className="text-gray-400" /> Role
          </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm">
            <option value="">Select role</option>
            <option value="founder">Founder/CEO</option>
            <option value="cto">CTO/Engineering Lead</option>
            <option value="finance">Finance</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3.5 mt-2 rounded-xl font-semibold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:bg-gray-400 disabled:scale-100 shadow-md shadow-blue-600/20 flex items-center justify-center gap-2">
          <Send size={16} />
          {isSubmitting ? 'Saving...' : 'Get Report →'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <div className="text-xs text-gray-500 flex items-center justify-center gap-3 font-medium">
          <span className="flex items-center gap-1"><Lock size={12} className="text-gray-400" /> No spam</span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1"><Mail size={12} className="text-gray-400" /> Instant delivery</span>
        </div>
      </div>
    </div>
  );
}