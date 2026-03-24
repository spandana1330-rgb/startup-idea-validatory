import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Target, 
  Briefcase, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Brain,
  ArrowRight,
  RefreshCw,
  BarChart3,
  ShieldAlert,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { validateIdea, ValidationResult } from './services/geminiService';
import { cn } from './lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce", 
  "SaaS", "AI/ML", "Sustainability", "Entertainment", "Other"
];

export default function App() {
  const [step, setStep] = useState<'home' | 'loading' | 'result'>('home');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audience: '',
    industry: INDUSTRIES[0]
  });
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setError(null);
    
    try {
      const data = await validateIdea(
        formData.title,
        formData.description,
        formData.audience,
        formData.industry
      );
      setResult(data);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError("Failed to analyze idea. Please try again.");
      setStep('home');
    }
  };

  const reset = () => {
    setStep('home');
    setResult(null);
    setFormData({
      title: '',
      description: '',
      audience: '',
      industry: INDUSTRIES[0]
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-purple-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <Rocket className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold font-display tracking-tight">IdeaValidator<span className="text-purple-500">Pro</span></span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {step === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="mb-8">
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl sm:text-7xl font-bold font-display tracking-tight mb-6"
                >
                  Validate Your Startup <br />
                  <span className="gradient-text">Idea with AI 🚀</span>
                </motion.h1>
                <p className="text-xl text-slate-400 mb-10">
                  Get instant insights, market risks, and a comprehensive success score powered by advanced AI analysis.
                </p>
              </div>

              <div className="glass-card p-8 text-left">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Idea Title
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. EcoTrack AI"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> Industry
                      </label>
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                        value={formData.industry}
                        onChange={e => setFormData({...formData, industry: e.target.value})}
                      >
                        {INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#030712]">{i}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Target Audience
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Small business owners in Europe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      value={formData.audience}
                      onChange={e => setFormData({...formData, audience: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your idea in detail..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {error}
                    </div>
                  )}

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 group">
                    Analyze Idea <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-t-purple-500 rounded-full"
                />
                <Rocket className="absolute inset-0 m-auto w-10 h-10 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Analyzing your idea using AI...</h2>
              <p className="text-slate-400">Evaluating market demand, competition, and scalability.</p>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold font-display mb-2">{formData.title}</h2>
                  <p className="text-slate-400 max-w-2xl">{formData.description}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-white/5"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={364.4}
                        initial={{ strokeDashoffset: 364.4 }}
                        animate={{ strokeDashoffset: 364.4 - (364.4 * result.score) / 10 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-purple-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{result.score}</span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500">Score</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Success Probability</div>
                    <div className="text-2xl font-bold text-purple-400">{(result.score * 10).toFixed(0)}%</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" /> Market Metrics
                  </h3>
                  <div className="h-[300px]">
                    <Bar 
                      data={{
                        labels: ['Market Demand', 'Competition', 'Risk Level', 'Profit Potential'],
                        datasets: [{
                          label: 'Score (1-10)',
                          data: [result.market_demand, result.competition, result.risk, result.profit_potential],
                          backgroundColor: [
                            'rgba(168, 85, 247, 0.6)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(239, 68, 68, 0.6)',
                            'rgba(34, 197, 94, 0.6)',
                          ],
                          borderRadius: 8,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                          y: { beginAtZero: true, max: 10, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                          x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" /> Strategic Analysis
                  </h3>
                  <div className="h-[300px]">
                    <Radar 
                      data={{
                        labels: ['Innovation', 'Scalability', 'Feasibility', 'Profitability', 'Uniqueness'],
                        datasets: [{
                          label: 'Analysis',
                          data: [result.innovation, result.scalability, result.feasibility, result.profitability, result.uniqueness],
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          borderColor: 'rgba(59, 130, 246, 0.8)',
                          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                          borderWidth: 2,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          r: {
                            angleLines: { color: 'rgba(255,255,255,0.1)' },
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            pointLabels: { color: '#94a3b8', font: { size: 12 } },
                            ticks: { display: false },
                            suggestedMin: 0,
                            suggestedMax: 10
                          }
                        },
                        plugins: { legend: { display: false } }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InsightCard 
                  icon={<CheckCircle2 className="text-green-500" />}
                  title="Strengths"
                  content={result.strengths}
                />
                <InsightCard 
                  icon={<ShieldAlert className="text-red-500" />}
                  title="Weaknesses"
                  content={result.weaknesses}
                />
                <InsightCard 
                  icon={<DollarSign className="text-yellow-500" />}
                  title="Revenue Model"
                  content={result.revenue_model}
                />
                <InsightCard 
                  icon={<Users className="text-blue-500" />}
                  title="Competitor Analysis"
                  content={result.competitors}
                />
                <InsightCard 
                  icon={<TrendingUp className="text-purple-500" />}
                  title="Final Verdict"
                  content={result.final_verdict}
                  className="md:col-span-2"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button onClick={reset} className="btn-primary flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" /> Analyze Another Idea
                </button>
                <button className="px-6 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-semibold transition-all">
                  Download Detailed Report (PDF)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-12 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 IdeaValidator Pro. Powered by Google Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
}

function InsightCard({ icon, title, content, className }: { icon: React.ReactNode, title: string, content: string, className?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn("glass-card p-6 space-y-4", className)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        <h4 className="font-bold text-lg">{title}</h4>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
}
