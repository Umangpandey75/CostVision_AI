'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Users, Briefcase, Wrench } from 'lucide-react';
import { pricingData } from '../data/pricingData';

const availableTools = [
  { id: 'cursor', name: 'Cursor' },
  { id: 'githubCopilot', name: 'GitHub Copilot' },
  { id: 'claude', name: 'Claude' },
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'windsurf', name: 'Windsurf' }
];

export default function SpendForm({ onSubmit, initialData }) {
  const [tools, setTools] = useState(initialData?.tools || []);
  const [teamSize, setTeamSize] = useState(initialData?.teamSize || '');
  const [primaryUseCase, setPrimaryUseCase] = useState(initialData?.primaryUseCase || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem('spendAuditForm', JSON.stringify({ tools, teamSize, primaryUseCase }));
    }, 500);
    return () => clearTimeout(t);
  }, [tools, teamSize, primaryUseCase]);

  useEffect(() => {
    const saved = localStorage.getItem('spendAuditForm');
    if (saved && !initialData) {
      const parsed = JSON.parse(saved);
      setTools(parsed.tools || []);
      setTeamSize(parsed.teamSize || '');
      setPrimaryUseCase(parsed.primaryUseCase || '');
    }
  }, [initialData]);

  const addTool = () => setTools([...tools, { id: Date.now(), name: '', plan: '', monthlySpend: '', seats: 1 }]);
  const removeTool = (id) => setTools(tools.filter(t => t.id !== id));
  const updateTool = (id, field, value) => setTools(tools.map(t => t.id === id ? { ...t, [field]: value } : t));

  const getPlansForTool = (toolName) => {
    const key = toolName.toLowerCase().replace(/\s/g, '');
    const mapped = { githubcopilot: 'githubCopilot' };
    return pricingData[mapped[key] || key] ? Object.keys(pricingData[mapped[key] || key]) : [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tools.length === 0) { alert('Please add at least one AI tool'); return; }
    setIsSubmitting(true);
    try {
      await onSubmit({
        tools: tools.map(t => ({ name: t.name, plan: t.plan, monthlySpend: t.monthlySpend, seats: parseInt(t.seats) })),
        teamSize: parseInt(teamSize),
        primaryUseCase
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
          <Users size={15} /> Team Size
        </label>
        <input
          type="number" required min="1" value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm"
          placeholder="Number of team members"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
          <Briefcase size={15} /> Primary Use Case
        </label>
        <select
          required value={primaryUseCase}
          onChange={(e) => setPrimaryUseCase(e.target.value)}
          className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm"
        >
          <option value="">Select primary use case</option>
          <option value="coding">Coding / Development</option>
          <option value="writing">Writing / Content</option>
          <option value="data">Data Analysis</option>
          <option value="research">Research</option>
          <option value="mixed">Mixed / General</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Wrench size={15} /> AI Tools
          </label>
          <button type="button" onClick={addTool} className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
            <Plus size={16} /> Add Tool
          </button>
        </div>

        <div className="space-y-4">
          {tools.map((tool) => (
            <div key={tool.id} className="border border-gray-100 bg-gray-50/50 rounded-xl p-4 transition-all duration-300 hover:border-blue-100 hover:bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select required value={tool.name} onChange={(e) => updateTool(tool.id, 'name', e.target.value)} className="px-3 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm">
                  <option value="">Select tool</option>
                  {availableTools.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                <select required value={tool.plan} onChange={(e) => updateTool(tool.id, 'plan', e.target.value)} className="px-3 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm disabled:bg-gray-50 disabled:text-gray-400" disabled={!tool.name}>
                  <option value="">Select plan</option>
                  {tool.name && getPlansForTool(tool.name).map(plan => <option key={plan} value={plan}>{plan}</option>)}
                </select>
                <input type="number" required placeholder="Monthly spend ($)" value={tool.monthlySpend} onChange={(e) => updateTool(tool.id, 'monthlySpend', e.target.value)} className="px-3 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm" />
                <input type="number" required min="1" placeholder="Seats" value={tool.seats} onChange={(e) => updateTool(tool.id, 'seats', e.target.value)} className="px-3 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm" />
              </div>
              <button type="button" onClick={() => removeTool(tool.id)} className="mt-2 text-red-500 hover:text-red-600 text-sm flex items-center gap-1">
                <Trash2 size={14} /> Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:bg-gray-400 disabled:scale-100 shadow-md shadow-blue-600/20 flex items-center justify-center gap-2">
        {isSubmitting ? 'Analyzing...' : 'Run Audit →'}
      </button>
    </form>
  );
}