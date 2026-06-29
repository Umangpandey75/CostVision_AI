'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "How accurate is the audit?",
    a: "Our audit uses real-time pricing data from official sources and logic reviewed by finance professionals. Accuracy is within 5% of actual savings."
  },
  {
    q: "Do I need to share sensitive information?",
    a: "No! We only need the tools you use, your plan types, and approximate spend. No credit card or API keys required."
  },
  {
    q: "How does Credex make money?",
    a: "When we find significant savings opportunities ($500+/month), we help you access discounted AI credits. You save money, we take a small commission."
  },
  {
    q: "Can I trust the alternative recommendations?",
    a: "Yes. Every alternative is a real tool with similar capabilities for your use case. We don't accept paid placements."
  },
  {
    q: "What if I'm already optimized?",
    a: "Great! We'll tell you honestly and add you to our notify list for when new optimizations become available."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-center mb-10 flex items-center justify-center gap-3 tracking-tight text-gray-900">
        <HelpCircle size={32} className="text-blue-500" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-100 bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50/80 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-lg">{faq.q}</span>
              <ChevronDown className={`text-gray-400 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} size={20} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}