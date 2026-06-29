'use client';

import { useState } from 'react';
import { ScanLine, CheckCircle2, CreditCard, Zap, Globe } from 'lucide-react';
import SpendForm from '../components/SpendForm';
import AuditResults from '../components/AuditResults';
import LeadCapture from '../components/LeadCapture';
import FAQ from '../components/FAQ';
import { auditSpend } from '../data/auditEngine';
import toast from 'react-hot-toast';

export default function Home() {
  const [step, setStep] = useState('form');
  const [auditResult, setAuditResult] = useState(null);
  const [auditId, setAuditId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAudit = async (formData) => {
    const loadingToast = toast.loading('Analyzing your AI spend...');
    try {
      const result = auditSpend(formData);
      setAuditResult(result);

      // Short random ID for URL, full data only in hash
      const id = Math.random().toString(36).slice(2, 10);
      const encoded = btoa(encodeURIComponent(JSON.stringify(result)));
      setAuditId(id);

      sessionStorage.setItem(`audit_${id}`, JSON.stringify(result));
      sessionStorage.setItem(`audit_encoded_${id}`, encoded);

      window.history.pushState({}, '', `/audit/${id}#${encoded}`);
      toast.success('Audit complete! Share your results!', { id: loadingToast });
      setStep('results');
    } catch (error) {
      console.error('Audit failed:', error);
      toast.error('Failed to analyze. Please try again.', { id: loadingToast });
    }
  };

  const handleSave = () => setStep('capture');

  const handleCaptureComplete = () => {
    toast.success('Thanks! Check your email for the full report.');
    setStep('results');
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-50/30 via-white to-gray-50 overflow-hidden z-0">
      {/* Soft radial glow behind hero */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <ScanLine size={24} className="text-blue-600" />
          <span className="font-bold text-gray-900 tracking-tight">CostVision AI</span>
        </div>
      </header>

      {/* Hero */}
      <div className="text-center py-20 px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-8 shadow-sm border border-blue-100/50">
          <Zap size={14} className="text-blue-500" />
          Free AI Spend Audit
        </div>
        <h1 className="animate-fade-in-up [animation-delay:100ms] text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Audit Your AI Spend
        </h1>
        <p className="animate-fade-in-up [animation-delay:200ms] text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover hidden savings across Cursor, GitHub Copilot, Claude, ChatGPT, and more.
        </p>
        <div className="animate-fade-in-up [animation-delay:300ms] mt-10 flex justify-center gap-6 flex-wrap text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Used by 500+ startups</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Free audit</span>
          <span className="flex items-center gap-1.5"><CreditCard size={16} className="text-green-500" /> No credit card</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 animate-fade-in-up [animation-delay:400ms]">
        {step === 'form' && (
          <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-6 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
            <SpendForm onSubmit={handleAudit} />
          </div>
        )}
        {step === 'results' && auditResult && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Your Audit Results</h2>
              <p className="text-gray-500 mt-1">Based on your current AI tool stack</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-6 md:p-8">
              <AuditResults audit={auditResult} onSave={handleSave} auditId={auditId} />
            </div>
          </div>
        )}
        {step === 'capture' && (
          <div className="animate-fade-in-up">
            <LeadCapture
              auditData={{ auditResult, auditId }}
              onSuccess={handleCaptureComplete}
            />
          </div>
        )}
      </div>

      <div className="bg-white/50 border-t border-gray-100 py-16">
        <FAQ />
        <div className="max-w-4xl mx-auto px-4 pt-16 mt-8 border-t border-gray-100/50">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Trusted by founders from</p>
            <div className="flex justify-center gap-10 mt-6 opacity-60 flex-wrap items-center">
              <span className="text-xl font-bold text-gray-700">Y Combinator</span>
              <span className="text-xl font-bold text-gray-700">Techstars</span>
              <span className="text-xl font-bold text-gray-700">500 Startups</span>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 font-medium">
          <span>Created by Umang Pandey</span>
          <span className="text-gray-300">|</span>
          <a href="https://umangpandey.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 transition-colors">
            <Globe size={14} /> Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}