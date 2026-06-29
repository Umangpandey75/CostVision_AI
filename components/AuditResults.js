'use client';

import { useState } from 'react';
import { TrendingDown, Share2, CheckCircle2, AlertTriangle, Download, DollarSign, Calendar, ArrowRight, Users, Briefcase, Wrench, ScanLine, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuditResults({ audit, onSave, auditId }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { totalCurrentSpend, monthlySavings, annualSavings, recommendations, isOptimal, summary } = audit;

  const handleDownloadPDF = async () => {
    const loadingToast = toast.loading('Generating PDF...');
    setIsGeneratingPDF(true);
    
    // Wait for the DOM to update with the PDF-specific layout
    await new Promise(resolve => setTimeout(resolve, 150));
    
    try {
      const { toPng } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');
      
      const element = document.getElementById('pdf-content');
      
      // html-to-image supports modern CSS by using the browser's native rendering
      const dataUrl = await toPng(element, { quality: 1, pixelRatio: 2 });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('AI_Spend_Audit_Report.pdf');
      
      toast.success('PDF downloaded successfully!', { id: loadingToast });
    } catch (error) {
      console.error('PDF generation failed', error);
      toast.error('Failed to generate PDF', { id: loadingToast });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      <div id="pdf-content" className={`space-y-6 bg-white ${isGeneratingPDF ? 'p-10 min-w-[800px]' : 'p-2'}`}>
        {/* PDF Document Header */}
        {isGeneratingPDF && (
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <ScanLine size={32} className="text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight">CostVision AI</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-2">AI Spend Audit Report</h1>
            <p className="text-blue-100 font-medium text-lg">Prepared on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        )}
        {/* Input Summary Section */}
        {audit.userInput && (
          <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Your Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Users size={16} className="text-blue-500" />
                <span className="font-medium">Team Size:</span> {audit.userInput.teamSize}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase size={16} className="text-blue-500" />
                <span className="font-medium">Primary Use Case:</span> <span className="capitalize">{audit.userInput.primaryUseCase}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Wrench size={14} className="text-blue-500" /> Current AI Tools
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {audit.userInput.tools.map((t, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 text-sm flex justify-between items-center shadow-sm">
                    <div>
                      <span className="font-semibold text-gray-900">{t.name}</span>
                      <span className="text-gray-500 ml-2">({t.plan})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-700 font-medium">${t.monthlySpend}/mo</span>
                      <span className="text-gray-400 text-xs block">{t.seats} seats</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50/50 rounded-2xl p-6 text-center border border-gray-100 h-full flex flex-col justify-center transition-all duration-300 hover:shadow-md hover:border-gray-200 hover:bg-white">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Spend</p>
          <p className="text-4xl font-extrabold text-gray-900 tracking-tight">${Math.round(totalCurrentSpend)}</p>
          <p className="text-xs font-medium text-gray-400 mt-1.5">per month</p>
        </div>
        <div className={`rounded-2xl p-6 text-center border h-full flex flex-col justify-center transition-all duration-300 hover:shadow-md ${
          isOptimal ? 'bg-green-50/30 border-green-100 hover:border-green-200 hover:bg-green-50/50' : 'bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100'
        }`}>
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Monthly Savings</p>
          <p className="text-4xl font-extrabold text-green-600 tracking-tight">${Math.round(monthlySavings)}</p>
          <p className="text-xs font-medium text-green-500 mt-1.5">potential savings</p>
        </div>
        <div className="bg-blue-50/30 rounded-2xl p-6 text-center border border-blue-100 h-full flex flex-col justify-center transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/50">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Annual Savings</p>
          <p className="text-4xl font-extrabold text-blue-600 tracking-tight">${Math.round(annualSavings)}</p>
          <p className="text-xs font-medium text-blue-500 mt-1.5">per year</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`rounded-2xl p-5 flex items-center gap-3 transition-all duration-300 hover:shadow-sm ${
        isOptimal ? 'bg-green-50/50 border border-green-200' : 'bg-amber-50/50 border border-amber-200'
      }`}>
        {isOptimal
          ? <CheckCircle2 size={24} className="text-green-600 shrink-0" />
          : <AlertTriangle size={24} className="text-amber-500 shrink-0" />}
        <p className={`text-sm font-medium ${
          isOptimal ? 'text-green-800' : 'text-amber-800'
        }`}>{summary}</p>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 group">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-gray-900 text-base">{rec.tool}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">{rec.currentPlan}</span>
                    </div>
                    <p className="text-sm text-gray-700 flex items-center gap-2 font-medium">
                      <ArrowRight size={14} className="text-green-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                      {rec.recommendedAction}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{rec.reason}</p>
                  </div>
                  <div className="shrink-0 text-right bg-green-50/50 px-3 py-2 rounded-xl border border-green-100/50">
                    <p className="text-xl font-bold text-green-600 tracking-tight">${Math.round(rec.savings)}</p>
                    <p className="text-xs font-medium text-green-600/70 uppercase tracking-wider mt-0.5">saved/mo</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      
      {/* PDF Footer */}
      {isGeneratingPDF && (
        <div className="pt-8 mt-8 border-t border-gray-100 text-center">
          <p className="text-sm font-medium text-gray-400">This report was automatically generated by CostVision AI.</p>
          <p className="text-xs text-gray-400 mt-1">Visit costvision.ai to run another audit or book a consultation.</p>
        </div>
      )}
      </div>

      {/* Share + CTA Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" data-html2canvas-ignore="true">
        <button
          onClick={() => window.location.href = '/'}
          className="group flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Go Back to Main Page
        </button>
        <button
          onClick={handleDownloadPDF}
          className={`group flex items-center justify-center gap-2 px-4 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-green-600 hover:shadow-lg hover:shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}
        >
          <Download size={16} className="group-hover:scale-110 transition-transform duration-300" />
          Download PDF Report
        </button>
      </div>
    </div>
  );
}