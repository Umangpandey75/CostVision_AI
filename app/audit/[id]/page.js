'use client';

import { useState, useEffect } from 'react';
import { ScanLine, Loader2, FileX, ArrowLeft } from 'lucide-react';
import AuditResults from '../../../components/AuditResults';

export default function SharedAuditPage({ params }) {
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auditId, setAuditId] = useState(null);

  useEffect(() => {
    const load = async () => {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      setAuditId(id);

      // 1. Try URL hash (works for shared links — no server needed)
      const hash = window.location.hash.slice(1);
      if (hash) {
        try {
          const decoded = JSON.parse(decodeURIComponent(atob(hash)));
          setAudit(decoded);
          setLoading(false);
          return;
        } catch {}
      }

      // 2. Try sessionStorage (same browser)
      const cached = sessionStorage.getItem(`audit_${id}`);
      if (cached) {
        try {
          setAudit(JSON.parse(cached));
          setLoading(false);
          return;
        } catch {}
      }

      // 3. Try reconstructing from stored encoded
      const encoded = sessionStorage.getItem(`audit_encoded_${id}`);
      if (encoded) {
        try {
          const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
          setAudit(decoded);
          setLoading(false);
          return;
        } catch {}
      }

      setLoading(false);
    };

    load();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileX size={48} className="text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Audit Not Found</h1>
          <p className="text-gray-600">This link may be incomplete. Try sharing the full URL including the # part.</p>
          <a href="/" className="inline-flex items-center gap-1.5 mt-4 text-blue-600 hover:text-blue-700">
            <ArrowLeft size={16} /> Start a new audit
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanLine size={20} className="text-blue-600" />
            <span className="font-bold text-gray-900">CostVision AI</span>
          </div>
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">Shared Report</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Spend Audit Results</h1>
          <p className="text-gray-500 text-sm mt-1">Here are the savings opportunities found for this stack</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <AuditResults audit={audit} onSave={() => {}} auditId={auditId} />
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Want to audit your own stack?{' '}
          <a href="/" className="text-blue-600 hover:underline">Run a free audit →</a>
        </p>
      </div>
    </div>
  );
}