import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Code, 
  Wifi, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus, 
  Trash, 
  ChevronRight, 
  Activity, 
  Sparkles, 
  Trophy, 
  Briefcase, 
  FileText, 
  Bot, 
  Clock, 
  CheckCircle,
  FolderOpen,
  Mail,
  UserCheck,
  UserX,
  X
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell, PieChart as RechartsPieChart, Pie } from 'recharts';

interface Student {
  id: string;
  name: string;
  email: string;
  dept: string;
  readinessScore: number;
  atsScore: number;
  attendance: number;
  leaderboardRank: number;
  mockInterviewScore: number;
  status: 'Placed' | 'In Process' | 'Not Placed';
  codingScore: number;         // Out of 600 points max on Coding Platform
  recruiterScore: number;      // Out of 100 max matching recruiter suitability
}

interface CodingQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  solvedCount: number;
  points: number;
}

interface MalpracticeLog {
  id: string;
  studentName: string;
  type: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  screenshot?: string;
  riskScore?: number;
}

interface NfcRecord {
  id: string;
  studentName: string;
  timestamp: string;
  cardId: string;
}

export default function AdminDashboard() {
  // Mock Data States
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alex Rivers', email: 'alex.rivers@university.edu', dept: 'Computer Science', readinessScore: 82, atsScore: 88, attendance: 94, leaderboardRank: 4, mockInterviewScore: 8.5, status: 'In Process', codingScore: 420, recruiterScore: 88 },
    { id: '2', name: 'Priya Nair', email: 'priya.nair@university.edu', dept: 'Electronics', readinessScore: 95, atsScore: 92, attendance: 98, leaderboardRank: 1, mockInterviewScore: 9.2, status: 'Placed', codingScore: 590, recruiterScore: 96 },
    { id: '3', name: 'Rohan Sharma', email: 'rohan.s@university.edu', dept: 'Computer Science', readinessScore: 74, atsScore: 81, attendance: 87, leaderboardRank: 12, mockInterviewScore: 7.0, status: 'In Process', codingScore: 240, recruiterScore: 78 },
    { id: '4', name: 'Jessica Taylor', email: 'jess.taylor@university.edu', dept: 'Information Science', readinessScore: 89, atsScore: 85, attendance: 91, leaderboardRank: 7, mockInterviewScore: 8.0, status: 'Placed', codingScore: 380, recruiterScore: 89 },
    { id: '5', name: 'Marcus Vance', email: 'marcus.v@university.edu', dept: 'Mechanical', readinessScore: 42, atsScore: 56, attendance: 68, leaderboardRank: 35, mockInterviewScore: 5.2, status: 'Not Placed', codingScore: 110, recruiterScore: 45 }
  ]);

  const [codingQuestions, setCodingQuestions] = useState<CodingQuestion[]>([
    { id: 'q1', title: 'Two Sum Variant', difficulty: 'Easy', category: 'Arrays', solvedCount: 142, points: 50 },
    { id: 'q2', title: 'Binary Search Tree Balancing', difficulty: 'Medium', category: 'Trees', solvedCount: 78, points: 100 },
    { id: 'q3', title: 'Dynamic Programming Edit Distance', difficulty: 'Hard', category: 'Dynamic Programming', solvedCount: 22, points: 200 },
    { id: 'q4', title: 'Least Recently Used Cache Matrix', difficulty: 'Medium', category: 'System Design', solvedCount: 61, points: 120 }
  ]);

  const [malpracticeLogs, setMalpracticeLogs] = useState<MalpracticeLog[]>([
    { id: 'm1', studentName: 'Rohan Sharma', type: 'Full Screen Window Toggle Bypass', timestamp: '14:42:15', severity: 'high' },
    { id: 'm2', studentName: 'Marcus Vance', type: 'Dual Monitor Extension Detected', timestamp: '11:15:30', severity: 'medium' }
  ]);

  const [nfcRecords, setNfcRecords] = useState<NfcRecord[]>([
    { id: 'n1', studentName: 'Priya Nair', timestamp: '08:55:12', cardId: 'NFC_STU_B8A49C' },
    { id: 'n2', studentName: 'Jessica Taylor', timestamp: '08:58:34', cardId: 'NFC_STU_FF9240' },
    { id: 'n3', studentName: 'Alex Rivers', timestamp: '09:02:11', cardId: 'NFC_STU_72A1EE' }
  ]);

  // UI Interactive States
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'students' | 'coding' | 'logs'>('analytics');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<'dossier' | 'add'>('dossier');
  const [selectedScreenshotModal, setSelectedScreenshotModal] = useState<string | null>(null);

  // Load real-time integrity monitor logs from localStorage
  useEffect(() => {
    const loadRealLogs = () => {
      const saved = localStorage.getItem('integrity_violations');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            // Map parsed logs to MalpracticeLog interface
            const formatted: MalpracticeLog[] = parsed.map((item: any) => ({
              id: item.id || `v_real_${Date.now()}_${Math.random()}`,
              studentName: item.studentName || 'Alex Rivers',
              type: item.type,
              timestamp: item.timestamp,
              severity: item.severity || 'high',
              screenshot: item.screenshot,
              riskScore: item.riskScore
            }));
            
            // Merge formatting
            setMalpracticeLogs(prev => {
              const existingStatic = prev.filter(p => !p.id.startsWith('v_'));
              return [...formatted, ...existingStatic];
            });
          }
        } catch (e) {
          console.warn("Could not read integrity logs", e);
        }
      } else {
        // Fallback to static static default logs if no custom violations exist yet
        setMalpracticeLogs([
          { id: 'm1', studentName: 'Rohan Sharma', type: 'Full Screen Window Toggle Bypass', timestamp: '14:42:15', severity: 'high' },
          { id: 'm2', studentName: 'Marcus Vance', type: 'Dual Monitor Extension Detected', timestamp: '11:15:30', severity: 'medium' }
        ]);
      }
    };

    loadRealLogs();
    
    // Wire custom event so dashboard stays live-updated
    window.addEventListener('metrics_updated', loadRealLogs);
    return () => window.removeEventListener('metrics_updated', loadRealLogs);
  }, []);

  // Auto-select first student as active candidate
  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0]);
    }
  }, [students, selectedStudent]);
  
  // Student Form State
  const [newStudent, setNewStudent] = useState({ name: '', email: '', dept: 'Computer Science', status: 'In Process' as const });
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'Placed' | 'In Process' | 'Not Placed'>('all');

  // Question Form State
  const [newQuestion, setNewQuestion] = useState({ title: '', difficulty: 'Medium' as const, category: 'Arrays', points: 100 });

  // Live simulator logs feeder on interval
  useEffect(() => {
    const timer = setInterval(() => {
      // Periodic NFC tap simulation
      const randomNames = ['Rohan Sharma', 'Priya Nair', 'Jessica Taylor', 'Alex Rivers', 'Marcus Vance'];
      const chosenName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const randomTime = new Date().toLocaleTimeString();
      const randomCard = `NFC_STU_${Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase()}`;

      setNfcRecords(prev => [
        { id: Date.now().toString(), studentName: chosenName, timestamp: randomTime, cardId: randomCard },
        ...prev.slice(0, 4) // keep last 5
      ]);

      // Occasional mini malpractice flag alert simulation
      if (Math.random() > 0.7) {
        const warningTypes = ['Speech Amplitude Decibel Peak Warning', 'Camera Frame Blur Lock Trigger', 'Browser Active Tab Relocation Alert'];
        const chosenWarning = warningTypes[Math.floor(Math.random() * warningTypes.length)];
        const severities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
        const chosenSeverity = severities[Math.floor(Math.random() * severities.length)];

        setMalpracticeLogs(prev => [
          { id: Date.now().toString(), studentName: chosenName, type: chosenWarning, timestamp: randomTime, severity: chosenSeverity },
          ...prev.slice(0, 4) // keep last 5
        ]);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Form Handlers
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;

    const added: Student = {
      id: Date.now().toString(),
      name: newStudent.name,
      email: newStudent.email,
      dept: newStudent.dept,
      readinessScore: Math.floor(60 + Math.random() * 35),
      atsScore: Math.floor(65 + Math.random() * 30),
      attendance: Math.floor(75 + Math.random() * 23),
      leaderboardRank: students.length + 1,
      mockInterviewScore: parseFloat((6.0 + Math.random() * 3.8).toFixed(1)),
      status: newStudent.status,
      codingScore: Math.floor(150 + Math.random() * 410),
      recruiterScore: Math.floor(55 + Math.random() * 40)
    };

    setStudents(prev => [...prev, added]);
    setNewStudent({ name: '', email: '', dept: 'Computer Science', status: 'In Process' });
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.title) return;

    const added: CodingQuestion = {
      id: Date.now().toString(),
      title: newQuestion.title,
      difficulty: newQuestion.difficulty,
      category: newQuestion.category,
      solvedCount: 0,
      points: Number(newQuestion.points)
    };

    setCodingQuestions(prev => [...prev, added]);
    setNewQuestion({ title: '', difficulty: 'Medium', category: 'Arrays', points: 100 });
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const deleteQuestion = (id: string) => {
    setCodingQuestions(prev => prev.filter(q => q.id !== id));
  };

  // Calculations for charts & stats metrics
  const totalStudents = students.length;
  const avgAttendance = (students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents).toFixed(1);
  const avgAts = (students.reduce((sum, s) => sum + s.atsScore, 0) / totalStudents).toFixed(1);
  const avgReadiness = (students.reduce((sum, s) => sum + s.readinessScore, 0) / totalStudents).toFixed(1);
  
  const placedCount = students.filter(s => s.status === 'Placed').length;
  const placementRate = ((placedCount / totalStudents) * 100).toFixed(0);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          s.email.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesFilter = studentFilter === 'all' || s.status === studentFilter;
    return matchesSearch && matchesFilter;
  });

  // Recharts analytic payloads
  const attendanceDistData = students.map(s => ({ name: s.name.split(' ')[0], attendance: s.attendance }));
  const readinessAtsComparisonData = students.map(s => ({ 
    name: s.name.split(' ')[0], 
    Readiness: s.readinessScore, 
    ATS: s.atsScore 
  }));

  const placementSectorData = [
    { name: 'Placed', value: placedCount },
    { name: 'In Process', value: students.filter(s => s.status === 'In Process').length },
    { name: 'Not Placed', value: students.filter(s => s.status === 'Not Placed').length }
  ];

  const PIE_COLORS = ['#10b981', '#3b82f6', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Dynamic Master Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-transparent"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-0 right-0 p-8 opacity-25 hidden md:block z-0">
          <Bot size={110} className="text-purple-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-slate-100 flex items-center gap-2">
              {user?.role === 'recruiter' ? 'Recruiter Talent & Placements Portal' : 'Faculty Intelligence Hub'}
            </h2>
            <p className="text-slate-400 max-w-xl text-xs">
              {user?.role === 'recruiter' 
                ? 'Review deep placement readiness, coding performance metrics, automated AI assessment card dockets, and recruitment-ready portfolios.'
                : 'Monitor attendance telemetry, student recruitment readiness metrics, code sandbox leaderboards, and AI classroom compliance logs concurrently.'}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-full text-[10px] text-green-400 font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              NFC RECEIVER: ACTIVE
            </span>
            <span className="px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-full text-[10px] text-cyan-400 font-mono font-bold">
              PORT 3000 CONSOLE
            </span>
          </div>
        </div>
      </motion.div>

      {/* Admin Tab Controller */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-2">
        {[
          { id: 'analytics', label: user?.role === 'recruiter' ? 'Talent Overview & Analytics' : 'Overview & Metrics', icon: TrendingUp },
          { id: 'students', label: user?.role === 'recruiter' ? 'Talent Directory & Dossiers' : 'Student Management', icon: Users },
          { id: 'coding', label: 'Leaderboard & Challenges', icon: Code },
          { id: 'logs', label: 'Compliance & Audits', icon: Wifi }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Rapid Stats Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Avg Platform Readiness', value: `${avgReadiness}/100`, desc: 'Composite technical score', color: 'text-cyan-400', icon: Trophy, bg: 'bg-cyan-500/10' },
                { label: 'Avg Resume Score', value: `${avgAts}%`, desc: 'ATS compliance rating', color: 'text-purple-400', icon: FileText, bg: 'bg-purple-500/10' },
                { label: 'Classroom Attendance', value: `${avgAttendance}%`, desc: 'Target requirement: 85%', color: 'text-green-400', icon: Clock, bg: 'bg-green-500/10' },
                { label: 'Employment Ratio', value: `${placementRate}%`, desc: 'Current placement index', color: 'text-amber-400', icon: Briefcase, bg: 'bg-amber-500/10' }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl glass border border-slate-800/60">
                  <div className="flex items-center justify-between pointer-events-none mb-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                    <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                      <stat.icon size={15} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 font-mono mb-0.5">{stat.value}</h3>
                  <p className="text-[10px] text-slate-500">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Placement Funnel Pie Chart */}
              <div className="p-5 rounded-2xl glass border border-slate-800 bg-slate-900/20 flex flex-col">
                <div className="mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Cohort Placement Breakdown</h4>
                  <p className="text-[10px] text-slate-500">Recruitment stages ratio</p>
                </div>
                <div className="flex-1 min-h-[200px] flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={placementSectorData} layout="vertical" margin={{ left: -10, right: 10 }}>
                      <XAxis type="number" stroke="#334155" hide />
                      <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 10 }} />
                      <Bar dataKey="value" fill="#9333ea" radius={6} barSize={16}>
                        {placementSectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-4 text-center border-t border-slate-900 font-mono text-[10px]">
                  <div>
                    <span className="block text-emerald-400 font-bold">{placedCount} Placed</span>
                  </div>
                  <div>
                    <span className="block text-blue-400 font-bold">{students.filter(s => s.status === 'In Process').length} En Route</span>
                  </div>
                  <div>
                    <span className="block text-red-400 font-bold">{students.filter(s => s.status === 'Not Placed').length} Open</span>
                  </div>
                </div>
              </div>

              {/* Attendance Tracker Area Chart */}
              <div className="p-5 rounded-2xl glass border border-slate-800 bg-slate-900/20 flex flex-col lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Cohort Attendance Telemetry</h4>
                    <p className="text-[10px] text-slate-500">Regular physical/virtual presence metric analysis</p>
                  </div>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] rounded font-bold uppercase">
                    Median: 91%
                  </span>
                </div>
                <div className="flex-1 min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceDistData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#334155" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis stroke="#334155" domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                      <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAttend)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Performance Correlation Comparison */}
            <div className="p-5 rounded-2xl glass border border-slate-800 bg-slate-900/10">
              <div className="mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Technical Readiness vs Resume Index Spectrum</h4>
                <p className="text-[10px] text-slate-500">Verifying alignment between theoretical profile index and code capability index</p>
              </div>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={readinessAtsComparisonData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#334155" tick={{ fill: '#64748b', fontSize: 9 }} />
                    <YAxis stroke="#334155" domain={[40, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                    <Area type="monotone" dataKey="Readiness" stroke="#06b6d4" strokeWidth={2} fillOpacity={0.1} fill="#06b6d4" />
                    <Area type="monotone" dataKey="ATS" stroke="#a855f7" strokeWidth={2} fillOpacity={0.1} fill="#a855f7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Performers Grid panel */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5 pt-2">
                <Award size={15} className="text-amber-400" />
                Featured Top Academic Performers (Honor Roll)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {students.slice(0, 3).map((student, i) => (
                  <div key={student.id} className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                        <Trophy size={11} /> COHORT #{student.leaderboardRank} DEV
                      </div>
                      <h4 className="text-sm font-bold text-slate-200 mt-1">{student.name}</h4>
                      <p className="text-[11px] text-slate-500">{student.dept}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-mono font-bold text-cyan-400">PRS {student.readinessScore}%</span>
                      <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded font-bold uppercase inline-block mt-1">
                        Placed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: STUDENT MANAGEMENT DIRECTORY */}
        {activeTab === 'students' && (
          <motion.div
            key="students"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Controls Strip */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:flex-initial">
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search candidate directory..."
                    className="pl-8 pr-4 py-1.5 w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-lg text-xs outline-none focus:border-purple-500 text-slate-200 placeholder-slate-500"
                  />
                  <Search size={14} className="text-slate-500 absolute left-2.5 top-2" />
                </div>
                {/* Filter */}
                <div className="relative w-36 sm:w-auto">
                  <select
                    value={studentFilter}
                    onChange={(e) => setStudentFilter(e.target.value as any)}
                    className="pl-3 pr-8 py-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-bold text-slate-400 outline-none focus:border-purple-500"
                  >
                    <option value="all">ALL STUDENTS</option>
                    <option value="Placed">PLACED ONLY</option>
                    <option value="In Process">ACTIVE TRIALS</option>
                    <option value="Not Placed">OVERSIGHT / OPEN</option>
                  </select>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                Registry list: {filteredStudents.length} entries shown
              </span>
            </div>

            {/* Layout Grid: List + Add Form */}
            <div className="grid grid-cols-1 xl:grid-cols-[3fr_1.5fr] gap-6 items-start">
              {/* Directory Database */}
              <div className="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden glass shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-850 bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <th className="p-4">Student Name</th>
                      <th className="p-4 hidden md:table-cell">Dept</th>
                      <th className="p-4 text-center">Ready</th>
                      <th className="p-4 text-center">ATS Match</th>
                      <th className="p-4 text-center hidden sm:table-cell font-mono">Attend%</th>
                      <th className="p-4 text-center font-mono">Rank</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-10 text-center text-slate-500 text-xs">
                          <FolderOpen size={30} className="mx-auto mb-2 opacity-30" />
                          No matching student credentials captured.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map(student => (
                        <tr 
                          key={student.id} 
                          onClick={() => {
                            setSelectedStudent(student);
                            setRightPanelTab('dossier');
                          }}
                          className={`border-b border-slate-900 hover:bg-slate-950/70 text-xs cursor-pointer transition-all ${
                            selectedStudent?.id === student.id 
                              ? 'bg-slate-950/80 border-l-2 border-l-purple-500 font-semibold' 
                              : ''
                          }`}
                        >
                          <td className="p-4">
                            <span className={student.id === selectedStudent?.id ? "font-black text-purple-300 block" : "font-bold text-slate-200 block"}>
                              {student.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">{student.email}</span>
                          </td>
                          <td className="p-4 hidden md:table-cell text-slate-400 font-medium">{student.dept}</td>
                          <td className="p-4 text-center">
                            <span className={`font-mono font-bold ${student.readinessScore >= 80 ? 'text-green-400' : student.readinessScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                              {student.readinessScore}%
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-cyan-300 font-bold font-mono">{student.atsScore}%</span>
                          </td>
                          <td className="p-4 text-center hidden sm:table-cell font-mono text-slate-400">{student.attendance}%</td>
                          <td className="p-4 text-center font-mono text-slate-400 font-bold">#{student.leaderboardRank}</td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                              student.status === 'Placed'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/15'
                                : student.status === 'In Process'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15'
                                : 'bg-red-500/10 text-red-400 border border-red-500/15'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => deleteStudent(student.id)}
                              className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Student"
                            >
                              <Trash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Dual Tab Action Panel */}
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl glass space-y-4 shadow-xl select-none">
                <div className="flex border-b border-slate-850 pb-1 gap-1">
                  <button
                    onClick={() => setRightPanelTab('dossier')}
                    className={`flex-1 py-1.5 rounded-lg text-center text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                      rightPanelTab === 'dossier'
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    🔍 Candidate Dossier
                  </button>
                  <button
                    onClick={() => setRightPanelTab('add')}
                    className={`flex-1 py-1.5 rounded-lg text-center text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                      rightPanelTab === 'add'
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    ➕ Add Student
                  </button>
                </div>

                {rightPanelTab === 'dossier' ? (
                  <div className="space-y-4">
                    {selectedStudent ? (
                      <div className="space-y-4">
                        <div className="border-b border-slate-850 pb-3">
                          <span className="text-[9px] uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/15 px-2 py-0.5 rounded font-black font-mono">
                            Talent Acquisition File
                          </span>
                          <h4 className="text-sm font-black text-slate-100 mt-2 font-mono flex items-center gap-2">
                            <Bot size={15} className="text-purple-400" />
                            {selectedStudent.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono block">{selectedStudent.email}</span>
                          <span className="text-[10px] text-slate-400 mt-1 block">Dept: <strong className="text-slate-300">{selectedStudent.dept}</strong></span>
                        </div>

                        {/* Four Required Recruiter Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          
                          {/* 1. Readiness Score */}
                          <div className="bg-slate-950/60 border border-slate-900/55 p-3 rounded-xl flex flex-col justify-between hover:border-slate-850 transition-colors">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Readiness</span>
                              <TrendingUp size={11} className="text-cyan-400" />
                            </div>
                            <div className="mt-2.5">
                              <div className="text-base font-black font-mono text-cyan-300 leading-none">
                                {selectedStudent.readinessScore}%
                              </div>
                              <p className="text-[8.5px] text-slate-500 mt-1 font-sans leading-tight">
                                Overall readiness index score.
                              </p>
                            </div>
                          </div>

                          {/* 2. Coding Score */}
                          <div className="bg-slate-950/60 border border-slate-900/55 p-3 rounded-xl flex flex-col justify-between hover:border-slate-850 transition-colors">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Coding Platform</span>
                              <Code size={11} className="text-emerald-400" />
                            </div>
                            <div className="mt-2.5">
                              <div className="text-base font-black font-mono text-emerald-300 leading-none">
                                {selectedStudent.codingScore} pts
                              </div>
                              <p className="text-[8.5px] text-slate-500 mt-1 leading-tight">
                                Verified sandbox algorithmic score.
                              </p>
                            </div>
                          </div>

                          {/* 3. Market Interview Score */}
                          <div className="bg-slate-950/60 border border-slate-900/55 p-3 rounded-xl flex flex-col justify-between hover:border-slate-850 transition-colors">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Mock Interview</span>
                              <Award size={11} className="text-purple-400" />
                            </div>
                            <div className="mt-2.5">
                              <div className="text-base font-black font-mono text-purple-300 leading-none">
                                {selectedStudent.mockInterviewScore}/10
                              </div>
                              <p className="text-[8.5px] text-slate-500 mt-1 leading-tight">
                                Verbal articulation & system design.
                              </p>
                            </div>
                          </div>

                          {/* 4. Recruiter Match Score */}
                          <div className="bg-slate-950/60 border border-slate-900/55 p-3 rounded-xl flex flex-col justify-between hover:border-slate-850 transition-colors">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Recruiter Score</span>
                              <Trophy size={11} className="text-amber-400" />
                            </div>
                            <div className="mt-2.5">
                              <div className="text-base font-black font-mono text-amber-300 leading-none">
                                {selectedStudent.recruiterScore}/100
                              </div>
                              <p className="text-[8.5px] text-slate-500 mt-1 leading-tight">
                                Tailored talent screening coefficient.
                              </p>
                            </div>
                          </div>

                        </div>

                        {/* Status Descriptor Card */}
                        <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-900 flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 font-sans">Verification Status:</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            selectedStudent.status === 'Placed'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/15'
                              : selectedStudent.status === 'In Process'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15'
                              : 'bg-red-500/10 text-red-400 border border-red-500/15'
                          }`}>
                            {selectedStudent.status}
                          </span>
                        </div>

                        {/* Recruitment Actions */}
                        <div className="p-3.5 bg-purple-500/5 rounded-xl border border-purple-500/10 space-y-2">
                          <h5 className="text-[10px] font-mono font-black uppercase text-purple-400 flex items-center gap-1">
                            <Sparkles size={11} className="animate-spin" /> Recruitment Profile Notes
                          </h5>
                          <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                            Candidate exhibits outstanding logic performance. Highly recommended to schedule primary briefings. Solved benchmarks exceed median expectations.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-10 text-center text-slate-500 font-sans text-xs">
                        Select a student from the directory to review their detailed dossier.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-b border-slate-850 pb-3">
                      <h4 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider flex items-center gap-1.5 font-mono">
                        <UserCheck size={15} className="text-purple-400" />
                        Student Admission Form
                      </h4>
                      <span className="text-[10px] text-slate-500">Inject raw candidate metrics for evaluation</span>
                    </div>

                    <form onSubmit={handleAddStudent} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-slate-500">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newStudent.name}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Katherine Pierce"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none focus:border-purple-500 text-slate-200"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-slate-500">Email Address</label>
                        <input
                          type="email"
                          required
                          value={newStudent.email}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="katherine@university.edu"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none focus:border-purple-500 text-slate-200"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-slate-500">Department</label>
                        <select
                          value={newStudent.dept}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, dept: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none text-slate-300"
                        >
                          <option value="Computer Science">Computer Science & Eng</option>
                          <option value="Electronics">Electronics & Comm</option>
                          <option value="Information Science">Information Science</option>
                          <option value="Mechanical">Mechanical Engineering</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-slate-500">Employment Status</label>
                        <select
                          value={newStudent.status}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, status: e.target.value as any }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none text-slate-300"
                        >
                          <option value="In Process">Active Interviewing Process</option>
                          <option value="Placed">Placed (Alumni Stack)</option>
                          <option value="Not Placed">Oversight Pipeline</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] mt-2 cursor-pointer"
                      >
                        Register Student ID
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: CODING LEADERBOARD & QUESTION MGMT */}
        {activeTab === 'coding' && (
          <motion.div
            key="coding"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Top Stat Bar */}
            <div className="bg-slate-900/40 p-4 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 flex items-center justify-center rounded-lg border border-cyan-500/20">
                  <Code size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-300">Class Arena Dashboard</h4>
                  <p className="text-[10px] text-slate-500">Control active questions and view platform leaderboard standings</p>
                </div>
              </div>
              <div className="text-right text-xs font-mono font-bold text-cyan-400">
                TOTAL QUESTIONS SOLVED: 303
              </div>
            </div>

            {/* Layout Grid: Leaderboard + Question Pool */}
            <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_2.2fr] gap-6 items-start">
              {/* CODING LEADERBOARD */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <h4 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider flex items-center gap-1.5 matches">
                    <Trophy size={14} className="text-amber-400" />
                    High-Octane Coding Leaderboard
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">CSE / ISE COHORTS</span>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900 space-y-2 max-h-[440px] overflow-y-auto">
                  {students
                    .sort((a,b) => a.leaderboardRank - b.leaderboardRank)
                    .map((s, idx) => (
                      <div 
                        key={s.id} 
                        className={`p-3 rounded-xl flex items-center justify-between border transition-all ${
                          idx === 0 
                            ? 'bg-amber-500/5 border-amber-500/35 h-auto'
                            : idx === 1 
                            ? 'bg-slate-300/5 border-slate-300/20'
                            : 'bg-slate-900/20 border-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-slate-500 w-4">
                            #{idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-slate-200 text-xs block">{s.name}</span>
                            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">{s.dept}</span>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Interview index</span>
                            <span className="text-xs font-mono font-bold text-cyan-400">{s.mockInterviewScore}/10</span>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 font-mono text-cyan-300 font-bold block">
                            {100 - idx * 8}p
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* CODING QUESTIONS & MANAGEMENT */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <h4 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider flex items-center gap-1.5">
                    <Code size={15} className="text-cyan-400" />
                    Syllabus Question Management Pool
                  </h4>
                  <span className="text-[10px] text-slate-500">Inject verified programming tracks</span>
                </div>

                {/* Question List container */}
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
                  {codingQuestions.map(q => (
                    <div key={q.id} className="p-3 bg-slate-900/40 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider uppercase ${
                            q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
                            q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {q.difficulty}
                          </span>
                          <span className="text-slate-500 text-[10px]">{q.category}</span>
                        </div>
                        <h4 className="font-bold text-slate-200 mt-1 block">{q.title}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[11px] font-mono font-bold text-cyan-400">{q.points}pts</span>
                          <span className="block text-[9px] text-slate-500">{q.solvedCount} completions</span>
                        </div>
                        <button
                          onClick={() => deleteQuestion(q.id)}
                          className="p-1 hover:text-red-400 transition-colors text-slate-600 focus:outline-none cursor-pointer"
                        >
                          <Trash size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Question Sub form */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 mt-4">
                  <h4 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-3">Add Challenges to Classroom</h4>
                  <form onSubmit={handleAddQuestion} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold uppercase text-slate-500">Title representation</label>
                      <input
                        type="text"
                        required
                        value={newQuestion.title}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Reverse Linked list inplace"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-cyan-500 text-slate-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-slate-500">Difficulty Setting</label>
                      <select
                        value={newQuestion.difficulty}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, difficulty: e.target.value as any }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none text-slate-300"
                      >
                        <option value="Easy">Easy difficulty</option>
                        <option value="Medium">Medium scale</option>
                        <option value="Hard">Advanced level</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-slate-500">Category Tag</label>
                      <input
                        type="text"
                        required
                        value={newQuestion.category}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g. Graphs"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-cyan-500 text-slate-200"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[9px] font-bold uppercase text-slate-500">Bespoke Points award</label>
                      <input
                        type="number"
                        required
                        value={newQuestion.points}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, points: Number(e.target.value) }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-cyan-500 text-slate-200"
                      />
                    </div>
                    <button
                      type="submit"
                      className="md:col-span-2 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase rounded-xl transition-all shadow-[0_0_10px_rgba(34,211,238,0.2)] mt-1 cursor-pointer"
                    >
                      Deploy Challenge Code Link
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: MALPRACTICE LOGS & NFC RECORDS */}
        {activeTab === 'logs' && (
          <motion.div
            key="logs"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Split Logs View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* MALPRACTICE AI SHIELD LOGS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <h4 className="text-xs uppercase font-extrabold text-slate-200 tracking-wider flex items-center gap-1.5">
                    <AlertTriangle size={15} className="text-red-400" />
                    AI Proctor Compliance Malpractice Shield
                  </h4>
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                </div>

                <div className="space-y-3 max-h-[420px] overflow-y-auto">
                  {malpracticeLogs.map(log => (
                    <div 
                      key={log.id} 
                      className={`p-4 rounded-xl border flex flex-col justify-between gap-3 bg-slate-900/40 ${
                        log.severity === 'high' 
                          ? 'border-red-500/20 bg-red-500/5' 
                          : 'border-yellow-500/20 bg-yellow-500/5'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-200 text-xs block">{log.studentName}</span>
                          <span className="text-[10px] text-slate-400 mt-1 block font-mono font-bold text-cyan-400">{log.type}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                            log.severity === 'high' 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {log.severity} RISK
                          </span>
                          {log.riskScore && (
                            <span className="text-[9px] font-mono font-black text-rose-450 bg-rose-500/10 px-1.5 rounded-md border border-rose-500/15">
                              +{log.riskScore} PENALTY
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Render proctor snapshot context */}
                      {log.screenshot && (
                        <div className="mt-1">
                          <span className="text-[8px] uppercase font-black tracking-widest text-slate-500 font-mono block mb-1">Fingerprinted Webcam Frame</span>
                          <div 
                            onClick={() => setSelectedScreenshotModal(log.screenshot || null)}
                            className="relative max-w-[180px] aspect-video bg-black rounded-lg overflow-hidden border border-slate-800 cursor-zoom-in group hover:border-cyan-500/40 transition-colors select-none"
                          >
                            <img 
                              src={log.screenshot} 
                              alt="Forensic capture preview" 
                              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" 
                            />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[8.5px] text-cyan-400 font-mono font-bold uppercase bg-slate-950/80 px-2 py-1 rounded border border-cyan-400/30">View Frame</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono border-t border-slate-950/60 pt-2 font-bold uppercase">
                        <span>EST. COMPLIANCE SCAN</span>
                        <span>Captured at {log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NFC ATTENDANCE RECORDS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <h4 className="text-xs uppercase font-extrabold text-slate-200 tracking-wider flex items-center gap-1.5">
                    <Wifi size={15} className="text-green-400" />
                    Physical Hardware NFC Attendance Registry
                  </h4>
                  <span className="text-[9px] font-mono text-green-400 bg-green-500/10 px-2 rounded">
                    13.56 MHz BEACON
                  </span>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900 space-y-2 max-h-[420px] overflow-y-auto">
                  {nfcRecords.map(rec => (
                    <div key={rec.id} className="p-3 bg-slate-900/30 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                          <Wifi size={14} />
                        </div>
                        <div>
                          <span className="font-bold text-slate-200 block">{rec.studentName}</span>
                          <span className="text-[9px] text-slate-500 font-mono uppercase">Decrypted Payload ID: {rec.cardId}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {rec.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screenshot Biometric Viewer modal inside Admin Portal */}
      <AnimatePresence>
        {selectedScreenshotModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScreenshotModal(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-sm select-none"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 overflow-hidden shadow-2xl relative space-y-4"
            >
              <button 
                onClick={() => setSelectedScreenshotModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-950 border border-slate-800"
              >
                <X size={16} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-rose-450 font-mono">Biometrics Forensic Snapshot</span>
                <p className="text-xs text-slate-450">Captured at the exact timestamp of infraction telemetry trigger.</p>
              </div>

              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800">
                <img src={selectedScreenshotModal} alt="Forensic snapshot zoom" className="w-full h-full object-contain" />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-[10px] font-mono text-slate-400 text-left">
                👤 ENROLLED CANDIDATE: ALEX RIVERS | STATUS: TRIAL DISPUTE REVIEWABLE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
