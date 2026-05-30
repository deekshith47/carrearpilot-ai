import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import { getLatestMetrics, saveAtsScore } from '../lib/readiness';
import { 
  Target, 
  Trophy, 
  TrendingUp, 
  Briefcase, 
  Activity,
  LayoutDashboard,
  FileText,
  UserCircle,
  BrainCircuit,
  Github,
  Map,
  Mic,
  Users,
  PieChart,
  MapPin,
  Globe,
  FolderGit2,
  Sparkles,
  ArrowRight,
  Upload,
  Clock,
  BookOpen,
  Award,
  AlertCircle,
  Compass
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const readinessData = [
  { subject: 'Coding', A: 85, fullMark: 100 },
  { subject: 'System Design', A: 65, fullMark: 100 },
  { subject: 'Communication', A: 90, fullMark: 100 },
  { subject: 'Projects', A: 75, fullMark: 100 },
  { subject: 'Resume', A: 88, fullMark: 100 },
  { subject: 'GitHub', A: 70, fullMark: 100 },
];

const growthData = [
  { name: 'Jan', score: 45 },
  { name: 'Feb', score: 52 },
  { name: 'Mar', score: 58 },
  { name: 'Apr', score: 68 },
  { name: 'May', score: 74 },
  { name: 'Jun', score: 82 },
];

const ALL_OS_APPS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25', desc: 'Realtime career performance telemetry', category: 'Analytics' },
  { name: 'Career GPS', path: '/dashboard/gps', icon: Compass, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25', desc: 'Live career navigation route engine', category: 'Navigation' },
  { name: 'Resume Analyzer', path: '/dashboard/resume', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/25', desc: 'Algorithmic ATS scanner & optimizer', category: 'Documents' },
  { name: 'Skill DNA', path: '/dashboard/skill-dna', icon: BrainCircuit, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', desc: 'Skill footprint mapping', category: 'Skills' },
  { name: 'GitHub Analyzer', path: '/dashboard/github', icon: Github, color: 'text-slate-300', bg: 'bg-slate-300/10', border: 'border-slate-300/25', desc: 'Commit history & quality audit', category: 'Productivity' },
  { name: 'Concept Recovery', path: '/dashboard/concept-recovery', icon: BrainCircuit, color: 'text-rose-400', bg: 'bg-red-500/10', border: 'border-red-500/25', desc: 'Algorithmically fix weak concept gaps', category: 'Skills' },
  { name: 'Mock Interview', path: '/dashboard/interview', icon: Mic, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/25', desc: 'Camera-enabled audio mock tests', category: 'Simulation' },
  { name: 'Recruiter Hub', path: '/dashboard/recruiter', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25', desc: 'Candidate recruitment pipelines', category: 'Placement' },
  { name: 'Heatmap', path: '/dashboard/heatmap', icon: MapPin, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25', desc: 'Dense geolocated openings mapping', category: 'Intelligence' }
];

export default function Dashboard() {
  const { user } = useAuth();
  
  // Dynamic Live Metrics State
  const [metrics, setMetrics] = useState(() => getLatestMetrics());

  useEffect(() => {
    const handleUpdate = () => {
      setMetrics(getLatestMetrics());
    };
    window.addEventListener('metrics_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('metrics_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Interactive Upload Simulator State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isFileScanned, setIsFileScanned] = useState(false);
  const [scannedFileName, setScannedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If user is Admin or Recruiter, render the directory context immediately!
  if (user?.role === 'admin' || user?.role === 'recruiter') {
    return <AdminDashboard />;;
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const simulateScanning = (fileName: string) => {
    setScannedFileName(fileName);
    setUploadProgress(0);
    setIsFileScanned(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadProgress(null);
          setIsFileScanned(true);
          saveAtsScore(93); // Improved ATS rating after matching parsing vectors! Updates dynamically!
        }, 600);
      }
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      simulateScanning(files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateScanning(files[0].name);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-transparent border border-slate-800"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block z-0">
          <Activity size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 text-slate-100">Welcome back, {user?.name || "Alex"}.</h2>
          <p className="text-slate-400 max-w-2xl mb-6 text-sm">
            Your Placement Readiness Score is looking strong at <span className="text-cyan-400 font-bold">{metrics.placementReadiness}%</span>. The AI analyzer recommends completing the recommended Docker micro-credentials this week to align with immediate regional recruiter pipelines.
          </p>
          <div className="flex gap-3">
            <Link to="/dashboard/gps">
              <button className="px-5 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer">
                Deploy Career Plan
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Readiness Index', value: `${metrics.placementReadiness}/100`, trend: `Level ${Math.min(5, Math.max(1, Math.floor(metrics.placementReadiness / 20)))} Mastery`, icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
          { label: 'ATS Resume Score', value: `${metrics.atsScore}%`, trend: isFileScanned ? '✨ Optimized score' : '+12% after rewrite', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          { label: 'Class Attendance', value: `${metrics.attendance}%`, trend: metrics.attendance >= 85 ? 'Requirement Met (85%)' : 'Caution: Below 85% requirement!', icon: Clock, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Coding Leaderboard', value: `#${metrics.leaderboardRank}`, trend: `Rank derived from ${metrics.codingSolvedCount} solved problems`, icon: Award, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'Mock Interview', value: `${metrics.mockInterviewScore.toFixed(1)}/10`, trend: metrics.mockInterviewScore >= 8 ? 'Strong Comms Index' : 'Needs mock practice', icon: Briefcase, color: 'text-pink-400', bg: 'bg-pink-400/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl glass border border-slate-800"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-xl font-extrabold text-slate-100 mb-2 font-mono">{stat.value}</h3>
            <p className="text-[10px] font-medium text-slate-500">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Interactive Resume Scan Drawer & Core Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Resume Upload Section */}
        <div className="p-6 rounded-2xl glass border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-2 flex items-center gap-2">
              <Upload size={16} className="text-cyan-400" />
              Interactive Resume Uplink
            </h3>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              Upload your resume in PDF/DOCX format to immediately run parsing models, evaluate keywords against regional ATS specifications, and recalculate your profile score.
            </p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
              isDragging 
                ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            {uploadProgress === null ? (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-slate-500 mx-auto animate-bounce" />
                <div className="text-xs font-bold text-slate-300">Drag & Drop Resume</div>
                <div className="text-[10px] text-slate-500">or click to browse local files</div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-cyan-400">ANALYZING FORMATTING MATCHES...</div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-cyan-400 h-full transition-all duration-150" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{uploadProgress}% scanned</div>
              </div>
            )}
          </div>

          {/* Feedback from scan */}
          <AnimatePresence>
            {isFileScanned && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 bg-cyan-500/5 border border-cyan-500/25 p-3 rounded-xl flex items-start gap-2 text-[11px] text-cyan-300"
              >
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-cyan-400" />
                <div>
                  <span className="font-bold block text-white">Parsed File: {scannedFileName}</span>
                  Resume parsed successfully. Index updated to <span className="font-bold text-green-400">93% Match Rate</span>. Overloaded sections (e.g. Skills Summary) corrected.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Skill DNA Radar Chart */}
        <div className="p-6 rounded-2xl glass border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-2 flex items-center gap-2">
              <BrainCircuit size={16} className="text-indigo-400" />
              Dynamic Skill DNA Profile
            </h3>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              Verifying real-time computer science mastery levels mapped concurrently against national average expectations.
            </p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="70%" 
                data={[
                  { subject: 'Coding', A: Math.min(100, 50 + (metrics.codingSolvedCount * 12.5)), fullMark: 100 },
                  { subject: 'System Design', A: 65, fullMark: 100 },
                  { subject: 'Communication', A: Math.round(metrics.mockInterviewScore * 10), fullMark: 100 },
                  { subject: 'Projects', A: 75, fullMark: 100 },
                  { subject: 'Resume', A: metrics.atsScore, fullMark: 100 },
                  { subject: 'GitHub', A: metrics.codingSolvedCount > 0 ? 80 : 70, fullMark: 100 },
                ]}
              >
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9, textTransform: 'uppercase' }} />
                <Radar name="Alex" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trajectory Area Chart */}
        <div className="p-6 rounded-2xl glass border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-2 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-400" />
              Growth Trajectory
            </h3>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              Historical performance timeline evaluating cumulative preparation score improvements monthly.
            </p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#334155" tick={{fill: '#64748b', fontSize: 10, textTransform: 'uppercase'}} />
                <YAxis stroke="#334155" tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Course & Recruiter Core recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Curated Course Recommendations Section */}
        <div className="p-6 rounded-2xl glass border border-slate-800 space-y-4">
          <div className="border-b border-slate-850 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan-400" />
              AI Recommended Educational Tracks
            </h3>
            <p className="text-[11px] text-slate-500">Bespoke lessons curated dynamically to address detected Skill Gaps</p>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Advanced Containerization with Docker', provider: 'Technical Academy Deep Dive', duration: '6 hours', complexity: 'Intermediate', match: '98% Priority match' },
              { title: 'Serverless Application Architecture (AWS)', provider: 'Cloud Builders Guild', duration: '12 hours', complexity: 'Advanced', match: '94% Priority match' },
              { title: 'TypeScript In-depth Code Patterns', provider: 'Syllabus Core', duration: '4 hours', complexity: 'Intermediate', match: '89% Skill filler' }
            ].map((course, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900/35 border border-slate-850 rounded-xl flex items-center justify-between hover:border-slate-850 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{course.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                    <span>{course.provider}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/15 px-2 py-0.5 rounded-full block">
                    {course.match}
                  </span>
                  <span className="text-[9px] text-slate-500 block mt-1">{course.complexity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Recruiter Recommendations Section */}
        <div className="p-6 rounded-2xl glass border border-slate-800 space-y-4">
          <div className="border-b border-slate-850 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Users size={16} className="text-purple-400" />
              Urgent Recruiter Sync Pipelines
            </h3>
            <p className="text-[11px] text-slate-500">Live active recruiting matches looking for your specific footprint</p>
          </div>

          <div className="space-y-3">
            {[
              { firm: 'Atlas Cloud Systems', role: 'Junior Backend Developer', loc: 'Remote / Bangalore', matchIndex: '95%', tag: 'Direct Hire' },
              { firm: 'ByteNexus Technologies', role: 'Developer Relations Intern', loc: 'Mumbai Office', matchIndex: '91%', tag: 'Intern Pipeline' },
              { firm: 'Synthetix AI Research', role: 'Full Stack Integrations Modeler', loc: 'San Francisco Base', matchIndex: '87%', tag: 'Contract-To-Hire' }
            ].map((rec, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900/35 border border-slate-850 rounded-xl flex items-center justify-between hover:border-slate-800 transition-all">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-300">{rec.firm}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-purple-500/10 text-purple-400 rounded-full font-bold uppercase">{rec.tag}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                    <span>{rec.role}</span>
                    <span>•</span>
                    <span>{rec.loc}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-emerald-400 block">{rec.matchIndex} compatibility</span>
                  <span className="text-[9px] text-slate-500 block mt-1">Hiring Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beautiful 16 Core Applications Directory (Highly visible on all layout widths!) */}
      <div className="pt-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 uppercase tracking-wide">
            <Sparkles className="text-cyan-400 animate-pulse" size={16} />
            CareerPilot OS System Directory (All 14 Modules)
          </h3>
          <p className="text-xs text-slate-500">Access every advanced, AI-guided application inside your Career Operating System.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_OS_APPS.map((app, idx) => {
            const Icon = app.icon;
            return (
              <Link 
                key={idx} 
                to={app.path}
                className="group p-5 rounded-2xl glass hover:bg-slate-900/60 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between border border-transparent"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-9 h-9 rounded-xl ${app.bg} ${app.color} flex items-center justify-center border ${app.border}`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                      {app.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-1.5 flex items-center gap-1.5">
                    {app.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mb-4 line-clamp-2">{app.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-cyan-400 transition-colors self-start mt-auto">
                  <span>Open System</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
