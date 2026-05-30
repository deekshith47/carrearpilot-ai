import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Target, Briefcase } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 md:px-16 py-6 border-b border-slate-800/50 glass">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            C
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-cyan-400">CareerPilot<span className="text-slate-100">OS</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
          <Link to="/dashboard" className="px-5 py-2.5 rounded-full glass hover:bg-cyan-500/20 hover:text-cyan-400 text-sm font-bold transition-all text-slate-100 border border-slate-800 hover:border-cyan-400/50">
            Enter App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Meet Your Personalized AI Career Intelligence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-8 text-slate-100"
        >
          An AI-powered <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Career Operating System
          </span>
          <br className="hidden md:block" /> for Students.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-light"
        >
          Not just another job board. Generate your digital Career Twin, analyze your skill DNA, and follow AI-generated learning roadmaps dynamically adjusted to market demand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/dashboard"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 text-slate-950 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.3)] neon-glow cursor-pointer"
          >
            <span className="relative z-10">Launch Dashboard</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link 
            to="/login"
            className="px-8 py-4 rounded-full glass border border-slate-700 font-bold text-slate-100 text-lg hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all text-center flex items-center justify-center cursor-pointer"
          >
            View Live Demo
          </Link>
        </motion.div>

        {/* Feature Cards Preview */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4 text-left">
          {[
            { icon: BrainCircuit, title: 'AI Career Twin', desc: 'Predicts your future career path, expected salary, and models your growth probability using holographic AI insights.' },
            { icon: Target, title: 'Smart ATS Engine', desc: 'Analyzes keyword formatting, recruiter compatibility, and rewrites your resume summaries automatically.' },
            { icon: Briefcase, title: 'Placement Readiness', desc: 'Calculates a universal readiness score based on GitHub, resume, and mock interview performance metrics.' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl glass hover:border-cyan-400/50 hover:bg-slate-900/80 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
                <feature.icon className="text-cyan-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
