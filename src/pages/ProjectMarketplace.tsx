import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  DollarSign, 
  Sparkles, 
  Code2, 
  Github, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  CreditCard, 
  Check, 
  FileCheck2, 
  ExternalLink,
  Info,
  Calendar,
  Layers,
  Award,
  Wallet
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';

// Define core project structure
interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budget: number;
  deadline: string;
  recruiterId: string;
  recruiterName: string;
  recruiterCompany: string;
  recruiterLogo: string;
  category: 'Web Development' | 'Mobile App' | 'AI / Machine Learning' | 'DevOps & Systems';
  status: 'draft' | 'open' | 'secured' | 'assigned' | 'submitted' | 'completed';
  requiredReadiness: number;
  requiredCodingScore: number;
  requiredGithubScore: number;
  createdAt: string;
}

// Applicant application structure
interface Application {
  id: string;
  projectId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  coverLetter: string;
  githubUrl: string;
  submissionLink?: string;
  submissionNotes?: string;
  status: 'pending' | 'accepted' | 'declined' | 'submitted' | 'approved';
  appliedAt: string;
}

export default function ProjectMarketplace() {
  const { user } = useAuth();
  
  // High-fidelity active persona control for sandbox evaluation
  const [activePersona, setActivePersona] = useState<'student' | 'recruiter' | 'admin'>('student');

  // Initialize activePersona with user custom role if available
  useEffect(() => {
    if (user?.role === 'recruiter') {
      setActivePersona('recruiter');
    } else if (user?.role === 'admin') {
      setActivePersona('admin');
    } else {
      setActivePersona('student');
    }
  }, [user]);

  // Demo Initial State for rich experience
  const [initialProjects, setInitialProjects] = useState<Project[]>([
    {
      id: 'proj-1',
      title: 'Full-Stack Responsive Customer Portal',
      description: 'Build a secure customer dashboard displaying analytical summaries and subscription histories. Integrate key-value visual charts and exports.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      budget: 35000,
      deadline: '2026-06-15',
      recruiterId: 'recruiter-jason',
      recruiterName: 'Jason Sterling',
      recruiterCompany: 'Stripe Partners',
      recruiterLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60',
      category: 'Web Development',
      status: 'secured', // Razorpay paid to escrow
      requiredReadiness: 75,
      requiredCodingScore: 70,
      requiredGithubScore: 65,
      createdAt: '2026-05-25'
    },
    {
      id: 'proj-2',
      title: 'Real-time Telemetry Processing Pipeline',
      description: 'Create server-side processors to ingestion streaming logs with compression mechanics. Implement Node WebSockets connectors.',
      skills: ['Node.js', 'TypeScript', 'WebSockets', 'Redis'],
      budget: 48000,
      deadline: '2026-06-20',
      recruiterId: 'recruiter-jason',
      recruiterName: 'Jason Sterling',
      recruiterCompany: 'ScaleData Systems',
      recruiterLogo: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=80&auto=format&fit=crop&q=60',
      category: 'AI / Machine Learning',
      status: 'secured',
      requiredReadiness: 80,
      requiredCodingScore: 80,
      requiredGithubScore: 75,
      createdAt: '2026-05-28'
    },
    {
      id: 'proj-3',
      title: 'High-Fidelity Swift UI Audio Synthesizer App',
      description: 'Build standalone modular sound loops controls featuring custom playback rates and physical motion controls.',
      skills: ['SwiftUI', 'iOS', 'Web Audio', 'Objective-C'],
      budget: 52000,
      deadline: '2026-06-30',
      recruiterId: 'recruiter-sarah',
      recruiterName: 'Sarah Jenkins',
      recruiterCompany: 'Vocalize Studio',
      recruiterLogo: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=80&auto=format&fit=crop&q=60',
      category: 'Mobile App',
      status: 'open', // Waiting for escrow payment
      requiredReadiness: 85,
      requiredCodingScore: 90,
      requiredGithubScore: 80,
      createdAt: '2026-05-29'
    },
    {
      id: 'proj-4',
      title: 'Local Database Container Automation Scripts',
      description: 'Establish secure local persistence clustering scripts using Docker configurations and automated validation triggers.',
      skills: ['Docker', 'DevOps', 'SQLite', 'Bash'],
      budget: 22000,
      deadline: '2026-06-10',
      recruiterId: 'recruiter-jason',
      recruiterName: 'Jason Sterling',
      recruiterCompany: 'DevOps Stack',
      recruiterLogo: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=80&auto=format&fit=crop&q=60',
      category: 'DevOps & Systems',
      status: 'completed', // Successfully approved & paid out
      requiredReadiness: 70,
      requiredCodingScore: 65,
      requiredGithubScore: 60,
      createdAt: '2026-05-20'
    }
  ]);

  const [initialApplications, setInitialApplications] = useState<Application[]>([
    {
      id: 'app-1',
      projectId: 'proj-4',
      studentId: 'student-alex',
      studentName: 'Devon Lee',
      studentEmail: 'devon.lee@university.edu',
      studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      coverLetter: 'I have configured Docker SQLite clusters for student projects. Ready to deliver modular, optimized systems scripts!',
      githubUrl: 'https://github.com/devonlee-dev/docker-sqlite-cluster',
      status: 'approved',
      submissionLink: 'https://github.com/devonlee-dev/docker-sqlite-cluster-v1',
      submissionNotes: 'All configurations completed. Tested container clusters locally.',
      appliedAt: '2026-05-21'
    }
  ]);

  // Load and preserve state in sandboxed localStorage
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('marketplace_projects_v2');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('marketplace_apps_v2');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  useEffect(() => {
    localStorage.setItem('marketplace_projects_v2', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('marketplace_apps_v2', JSON.stringify(applications));
  }, [applications]);

  // Student metrics matching setup
  const studentStats = {
    name: 'Devon Lee',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Node.js', 'SQLite', 'Docker'],
    codingScore: 85,
    githubScore: 90,
    placementReadiness: 82, // Devon starts with 82% from context
  };

  // Wallet and local financial bookkeeping
  const [studentEarnings, setStudentEarnings] = useState<number>(() => {
    const saved = localStorage.getItem('marketplace_student_earnings');
    return saved ? parseInt(saved) : 22000; // matching the completed project (22000)
  });

  useEffect(() => {
    localStorage.setItem('marketplace_student_earnings', studentEarnings.toString());
  }, [studentEarnings]);

  // Search and visual category filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyMatchEligible, setOnlyMatchEligible] = useState<boolean>(false);

  // Recruiter project builder Form State
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<'Web Development' | 'Mobile App' | 'AI / Machine Learning' | 'DevOps & Systems'>('Web Development');
  const [newProjBudget, setNewProjBudget] = useState(25000);
  const [newProjDeadline, setNewProjDeadline] = useState('2026-07-01');
  const [newProjSkills, setNewProjSkills] = useState('React, TypeScript');
  
  // Target baselines
  const [reqReadiness, setReqReadiness] = useState(80);
  const [reqCodingScore, setReqCodingScore] = useState(75);
  const [reqGithubScore, setReqGithubScore] = useState(70);

  // Student Apply Form State
  const [selectedApplyProject, setSelectedApplyProject] = useState<Project | null>(null);
  const [applyCoverLetter, setApplyCoverLetter] = useState('');
  const [applyGithubUrl, setApplyGithubUrl] = useState('');

  // Student Submission Deliverable View State
  const [selectedSubmitProject, setSelectedSubmitProject] = useState<Project | null>(null);
  const [submitLink, setSubmitLink] = useState('');
  const [submitNotes, setSubmitNotes] = useState('');

  // Razorpay SECURE GATEWAY SIMULATOR active state
  const [razorpayActive, setRazorpayActive] = useState(false);
  const [razorpayProject, setRazorpayProject] = useState<Project | null>(null);
  const [razorpayCardNo, setRazorpayCardNo] = useState('4111 2222 3333 4444');
  const [razorpayExpiry, setRazorpayExpiry] = useState('12/28');
  const [razorpayCvv, setRazorpayCvv] = useState('123');
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [razorpayStatus, setRazorpayStatus] = useState<'idle' | 'authorizing' | 'success' | 'failed'>('idle');
  const [razorpayLogs, setRazorpayLogs] = useState<string[]>([]);

  // AI Matching score calculation engine
  const calcMatchRating = (project: Project) => {
    const hasReadiness = studentStats.placementReadiness >= project.requiredReadiness;
    const hasCoding = studentStats.codingScore >= project.requiredCodingScore;
    const hasGithub = studentStats.githubScore >= project.requiredGithubScore;
    
    // Skills checklist calculation
    let matchingSkillsCount = 0;
    project.skills.forEach(skill => {
      if (studentStats.skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
        matchingSkillsCount++;
      }
    });

    const skillRatio = project.skills.length > 0 ? (matchingSkillsCount / project.skills.length) : 1;
    const baseScore = (studentStats.placementReadiness * 0.45) + (studentStats.codingScore * 0.25) + (studentStats.githubScore * 0.3);
    
    // Penalty if requirements are completely locked out
    const penalty = (!hasReadiness ? 15 : 0) + (!hasCoding ? 10 : 0) + (!hasGithub ? 10 : 0) + ((1 - skillRatio) * 20);
    const finalScore = Math.max(10, Math.round(baseScore - penalty));

    const eligible = hasReadiness && hasCoding && hasGithub && skillRatio >= 0.5;

    return {
      matchScore: finalScore,
      eligible,
      hasReadiness,
      hasCoding,
      hasGithub,
      skillRatio,
      matchingSkillsCount,
      totalSkills: project.skills.length
    };
  };

  // Filter projects for student view
  const filteredProjects = projects.filter(proj => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const analysis = calcMatchRating(proj);
    const matchesEligibility = !onlyMatchEligible || analysis.eligible;

    return matchesCategory && matchesSearch && matchesEligibility;
  });

  // Handle Application Submit
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplyProject) return;

    const newApp: Application = {
      id: 'app-' + Math.random().toString(36).substr(2, 9),
      projectId: selectedApplyProject.id,
      studentId: 'student-alex',
      studentName: studentStats.name,
      studentEmail: 'devon.lee@university.edu',
      studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      coverLetter: applyCoverLetter,
      githubUrl: applyGithubUrl,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);
    
    // Update project state locally to reflect applying
    setProjects(prev => prev.map(p => p.id === selectedApplyProject.id ? { ...p, status: 'assigned' } : p));
    
    setSelectedApplyProject(null);
    setApplyCoverLetter('');
    setApplyGithubUrl('');
  };

  // Handle Student Submit Completed Deliverable
  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmitProject) return;

    setApplications(prev => prev.map(app => {
      if (app.projectId === selectedSubmitProject.id && app.studentId === 'student-alex') {
        return {
          ...app,
          status: 'submitted',
          submissionLink: submitLink,
          submissionNotes: submitNotes
        };
      }
      return app;
    }));

    setProjects(prev => prev.map(p => p.id === selectedSubmitProject.id ? { ...p, status: 'submitted' } : p));
    
    setSelectedSubmitProject(null);
    setSubmitLink('');
    setSubmitNotes('');
  };

  // Handle Recruiter Creating Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkills = newProjSkills.split(',').map(s => s.trim()).filter(Boolean);
    
    const newProject: Project = {
      id: 'proj-' + Math.random().toString(36).substr(2, 9),
      title: newProjTitle,
      description: newProjDesc,
      skills: cleanSkills,
      budget: newProjBudget,
      deadline: newProjDeadline,
      recruiterId: 'recruiter-jason',
      recruiterName: user?.name || 'Jason Sterling',
      recruiterCompany: user?.role === 'recruiter' ? 'Sterling Recalls Inc.' : 'Jason Agencies Ltd',
      recruiterLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80',
      category: newProjCategory,
      status: 'draft', // Draft is pre-payment. We require Razorpay Escrow loading before opening to student matches
      requiredReadiness: reqReadiness,
      requiredCodingScore: reqCodingScore,
      requiredGithubScore: reqGithubScore,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects(prev => [newProject, ...prev]);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjSkills('React, TypeScript');
    
    // Launch Razorpay interface automatically for this newly created project
    initiateRazorpayEscrowPayment(newProject);
  };

  // Initiate escrow funding via Razorpay Checkout UI overlay
  const initiateRazorpayEscrowPayment = (project: Project) => {
    setRazorpayProject(project);
    setRazorpayStatus('idle');
    setRazorpayLogs([
      `⚡ [api] Razorpay checkout session created for ₹${project.budget.toLocaleString()}`,
      `🔐 [rsa] Escrow container key established: sec_esc_${Math.random().toString(36).substr(2, 7)}`,
      `📡 [gateway] Waiting for customer authorization...`
    ]);
    setRazorpayActive(true);
  };

  // Process payment triggers inside Simulated Razorpay Modal
  const processRazorpayPayment = () => {
    if (!razorpayProject) return;
    setRazorpayStatus('authorizing');
    setRazorpayLoading(true);

    const logTick = (text: string, delay: number) => {
      setTimeout(() => {
        setRazorpayLogs(prev => [...prev, text]);
      }, delay);
    };

    logTick(`📡 [rpay] Connecting secure sandbox terminal @api.razorpay.com`, 500);
    logTick(`💳 [card] Dispatching PCI compliant tokenized cards request`, 1000);
    logTick(`🔄 [hold] Contacting issuing bank secure gateway`, 1700);
    logTick(`✅ [authorized] Received HTTP 200 payload: txn_rzp_${Math.random().toString(36).substr(2, 10)}`, 2300);
    
    setTimeout(() => {
      // Release status
      setRazorpayLoading(false);
      setRazorpayStatus('success');

      // Update actual project status in our state
      setProjects(prev => prev.map(p => {
        if (p.id === razorpayProject.id) {
          return { ...p, status: 'secured' }; // Funded and open
        }
        return p;
      }));

      // If there's an associated pending draft, we release it as 'secured' which makes it live for matches
      logTick(`🛡️ [escrow] Secured ₹${razorpayProject.budget.toLocaleString()} securely in held vault`, 2500);
    }, 2400);
  };

  // Accept a student student for a project (Assign work)
  const acceptStudentApplicant = (appId: string, projectId: string) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: 'accepted' } : app));
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'assigned' } : p));
  };

  // Recruiter triggers approval and releases escrow payment directly into student balance
  const approveAndReleasePayment = (projectId: string, amount: number) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'completed' } : p));
    setApplications(prev => prev.map(app => app.projectId === projectId ? { ...app, status: 'approved' } : app));
    
    // Increment the student active wallet balance
    setStudentEarnings(prev => prev + amount);

    // Show a confirmation trigger on admin or recruiter layout
    alert(`Success! Secure held escrow of ₹${amount.toLocaleString()} was released successfully. Released to Devon Lee's verified bank account.`);
  };

  // --- Financial reports logic for the Admin Dashboard ---
  const dashboardStats = () => {
    const totalCount = projects.length;
    const totalRevenue = projects.reduce((sum, p) => sum + (p.status !== 'draft' ? p.budget : 0), 0);
    const completedCount = projects.filter(p => p.status === 'completed').length;
    const secureHold = projects.filter(p => p.status === 'secured' || p.status === 'assigned' || p.status === 'submitted').reduce((sum, p) => sum + p.budget, 0);
    
    const uniqueRecruiters = new Set(projects.map(p => p.recruiterId)).size;
    const uniqueStudents = new Set(applications.map(app => app.studentId)).size || 1;

    // Chart distribution
    const categoryDistribution = [
      { name: 'Web Dev', value: projects.filter(p => p.category === 'Web Development').length, budget: projects.filter(p => p.category === 'Web Development').reduce((sum, p) => sum + p.budget, 0) },
      { name: 'Mobile App', value: projects.filter(p => p.category === 'Mobile App').length, budget: projects.filter(p => p.category === 'Mobile App').reduce((sum, p) => sum + p.budget, 0) },
      { name: 'AI / ML', value: projects.filter(p => p.category === 'AI / Machine Learning').length, budget: projects.filter(p => p.category === 'AI / Machine Learning').reduce((sum, p) => sum + p.budget, 0) },
      { name: 'DevOps Systems', value: projects.filter(p => p.category === 'DevOps & Systems').length, budget: projects.filter(p => p.category === 'DevOps & Systems').reduce((sum, p) => sum + p.budget, 0) }
    ];

    // Days timeline processing
    const timelineData = [
      { date: '05-24', EscrowLocked: 22000, Released: 0 },
      { date: '05-25', EscrowLocked: 57000, Released: 22000 },
      { date: '05-26', EscrowLocked: 57000, Released: 22000 },
      { date: '05-27', EscrowLocked: 105000, Released: 22000 },
      { date: '05-28', EscrowLocked: 105000, Released: 22000 },
      { date: '05-29', EscrowLocked: secureHold, Released: totalRevenue - secureHold }
    ];

    return {
      totalCount,
      totalRevenue,
      completedCount,
      secureHold,
      uniqueRecruiters,
      uniqueStudents,
      categoryDistribution,
      timelineData
    };
  };

  const stats = dashboardStats();

  return (
    <div className="space-y-6">
      
      {/* Dynamic Sandbox Command Banner allowing evaluators to shift viewpoints */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Activity className="animate-pulse" size={18} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-2">
              Recruiter Project Marketplace
              <span className="text-[10px] bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-wider">Active</span>
            </h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              A secure two-sided freelance arena. Switch roles instantly below to audit payment, bidding and application lifecycles!
            </p>
          </div>
        </div>

        {/* Persona Segmented Controller */}
        <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setActivePersona('student')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activePersona === 'student'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            👨‍🎓 Student Hub
          </button>
          <button
            onClick={() => setActivePersona('recruiter')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activePersona === 'recruiter'
                ? 'bg-purple-500 text-white font-black shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🏢 Recruiter Workspace
          </button>
          <button
            onClick={() => setActivePersona('admin')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activePersona === 'admin'
                ? 'bg-amber-500 text-slate-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🛡️ Admin Escrow Gate
          </button>
        </div>
      </div>

      {/* SECURE RAZORPAY PAYMENT SIMULATION TRIGGER SHEET */}
      <AnimatePresence>
        {razorpayActive && razorpayProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              
              {/* Razorpay Authentic Indigo Header */}
              <div className="bg-[#1c2c54] px-6 py-4 flex items-center justify-between border-b border-[#253965]">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 text-white font-bold rounded-lg px-2.5 py-1 text-sm tracking-tighter">
                    R
                  </div>
                  <div>
                    <h4 className="text-xs font-black tracking-widest text-[#5e8ef4] uppercase">Razorpay Secure Checkout</h4>
                    <p className="text-[10px] text-slate-300">Securing payments in escrow automation</p>
                  </div>
                </div>

                {/* Amount display */}
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block uppercase font-mono">Invoice Total</span>
                  <span className="text-sm font-extrabold text-[#74beff] font-mono">₹{razorpayProject.budget.toLocaleString()}</span>
                </div>
              </div>

              {/* Simulation logs/content space */}
              <div className="p-5 flex-1 space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex gap-2 justify-between items-center text-[11px] mb-2 border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Order ID:</span>
                    <span className="font-mono text-cyan-400 font-bold">order_rcprj_{razorpayProject.id}</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10.5px] font-bold text-slate-200">{razorpayProject.title}</p>
                    <p className="text-[9px] text-slate-400 line-clamp-1">{razorpayProject.recruiterCompany} • Deadline: {razorpayProject.deadline}</p>
                  </div>
                </div>

                {/* Simulated credit card module */}
                {razorpayStatus !== 'success' && (
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#72a5ff] block">Enter Authorization Details</span>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-3">
                        <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Card Number (Test Standard)</label>
                        <input
                          type="text"
                          value={razorpayCardNo}
                          onChange={(e) => setRazorpayCardNo(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs font-mono tracking-widest focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-100"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={razorpayExpiry}
                          onChange={(e) => setRazorpayExpiry(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs font-mono focus:outline-none text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">CVV</label>
                        <input
                          type="password"
                          value={razorpayCvv}
                          onChange={(e) => setRazorpayCvv(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs font-mono focus:outline-none text-slate-100 text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Secure Gateway Network console */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase mb-1.5">Gateway Handshake Telemetry logs</span>
                  <div className="space-y-1 max-h-[100px] overflow-y-auto font-mono text-[9px] leading-relaxed custom-scrollbar">
                    {razorpayLogs.map((log, i) => (
                      <div key={i} className="text-slate-400 block truncate">
                        {log}
                      </div>
                    ))}
                    {razorpayLoading && (
                      <div className="text-yellow-400 animate-pulse">⚡ [securing] Running 3D Secure verification...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="bg-slate-950 px-6 py-4 border-t border-slate-850 flex gap-2 justify-end">
                <button
                  onClick={() => setRazorpayActive(false)}
                  disabled={razorpayLoading}
                  className="px-4 py-2 hover:bg-slate-900 border border-slate-800 text-slate-400 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  Cancel Transaction
                </button>

                {razorpayStatus !== 'success' ? (
                  <button
                    onClick={processRazorpayPayment}
                    disabled={razorpayLoading}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_4px_15px_rgba(37,99,235,0.4)]"
                  >
                    Authorize ₹{razorpayProject.budget.toLocaleString()}
                  </button>
                ) : (
                  <button
                    onClick={() => setRazorpayActive(false)}
                    className="px-5 py-2 bg-[#10b981] text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
                  >
                    Done (Funded) <Check size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 1. STUDENT PERSONA PORTAL */}
      {/* ========================================================= */}
      {activePersona === 'student' && (
        <div className="space-y-6">
          
          {/* Header Stats Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Wallet Balance</span>
                <span className="text-xl font-extrabold text-emerald-400 font-mono truncate block mt-1">₹{studentEarnings.toLocaleString()}</span>
                <span className="text-[8px] text-slate-500 font-medium block mt-0.5">Completed projects paid directly</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                <Wallet size={18} />
              </div>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Skill Matching</span>
                <span className="text-xl font-extrabold text-cyan-400 block mt-1">7 / 7 Match</span>
                <span className="text-[8px] text-slate-500 font-medium block mt-0.5">Checked with customized Skill DNA</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Code2 size={18} />
              </div>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Open Direct Indexing</span>
                <span className="text-xl font-extrabold text-purple-400 block mt-1">Active Match</span>
                <span className="text-[8px] text-slate-500 font-medium block mt-0.5">AI matches active recruiter index</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 shrink-0">
                <Sparkles size={18} />
              </div>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Career Pilot Standing</span>
                <span className="text-xl font-extrabold text-yellow-400 font-mono block mt-1">{studentStats.placementReadiness}%</span>
                <span className="text-[8px] text-slate-500 font-medium block mt-0.5">Readiness exceeds baseline score</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-yellow-950 border border-yellow-800 flex items-center justify-center text-yellow-400 shrink-0">
                <TrendingUp size={18} />
              </div>
            </div>
          </div>

          {/* Applied/Assigned Pipeline Section if available */}
          {applications.filter(app => app.studentId === 'student-alex').length > 0 && (
            <div className="bg-slate-900/30 rounded-2xl border border-slate-850 p-5">
              <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider mb-4 flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                Your Project Application Pipeline ({applications.filter(app => app.studentId === 'student-alex').length})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications.filter(app => app.studentId === 'student-alex').map((app) => {
                  const correlatedProj = projects.find(p => p.id === app.projectId);
                  if (!correlatedProj) return null;

                  return (
                    <div key={app.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <span className={`inline-block text-[8px] uppercase font-bold px-2 py-0.5 rounded-full mb-1.5 ${
                            app.status === 'approved' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : app.status === 'submitted'
                                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                : app.status === 'accepted'
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                  : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}>
                            {app.status === 'approved' ? 'Approved & Wallet Paid' : app.status === 'submitted' ? 'Submitted (Awaiting Audit)' : app.status === 'accepted' ? 'Assigned' : 'Applied (Pending)'}
                          </span>
                          <h4 className="text-xs font-bold text-slate-100">{correlatedProj.title}</h4>
                          <span className="text-[9px] text-slate-400 font-sans block mt-1">{correlatedProj.recruiterCompany} • Budget: ₹{correlatedProj.budget.toLocaleString()}</span>
                        </div>

                        {/* Company logo avatar */}
                        <img src={correlatedProj.recruiterLogo} className="w-8 h-8 rounded-lg object-cover border border-slate-800" />
                      </div>

                      {/* Interactive Submission controls for the student if Assigned/Accepted */}
                      {app.status === 'accepted' && (
                        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                          <span className="text-[9.5px] font-bold text-cyan-400 block uppercase mb-1">📬 Submit Completed Deliverables</span>
                          <p className="text-[9px] text-slate-400 mb-2 leading-relaxed">Provide completed github URL build to notify the recruiter for verification hold release.</p>
                          
                          <button
                            onClick={() => setSelectedSubmitProject(correlatedProj)}
                            className="w-full text-center py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-wider rounded-lg transition-transform hover:scale-[1.02] cursor-pointer"
                          >
                            Submit Completed Work Link
                          </button>
                        </div>
                      )}

                      {app.status === 'submitted' && (
                        <div className="p-3 bg-slate-900/30 border border-slate-850 rounded-lg">
                          <p className="text-[9.5px] text-slate-400 font-bold block">Submitted Project Deliverables</p>
                          <p className="text-[9px] text-slate-500 truncate block mt-0.5">Repo URL: {app.submissionLink}</p>
                          <p className="text-[9px] text-slate-500 block truncate font-sans">Notes: {app.submissionNotes}</p>
                        </div>
                      )}

                      {app.status === 'approved' && (
                        <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <div>
                            <span className="text-[9px] text-slate-300 font-bold block">Released Escrow Receipt</span>
                            <span className="text-[8px] text-slate-500 block font-mono">Txn Token: res_pay_817294_alex</span>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* List and filters */}
          <div className="space-y-4">
            
            {/* Filter and searching header */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-850">
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search standard paid projects or targeted stack..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3.5 pl-9 text-xs focus:outline-none focus:border-cyan-500 placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Dropdown filters */}
                <div className="flex gap-2.5">
                  {['All', 'Web Development', 'Mobile App', 'AI / Machine Learning', 'DevOps & Systems'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[9.5px] font-bold uppercase transition-all cursor-pointer border ${
                        selectedCategory === cat
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat === 'All' ? '⚡ All Categories' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matching baseline switch */}
              <div className="flex items-center gap-2 border-l border-slate-800 md:pl-4 shrink-0 justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] text-slate-300 font-bold">Only AI Matched (Eligible)</span>
                  <div className="text-[9px] bg-cyan-950 border border-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-400 uppercase font-bold tracking-widest leading-none">CV</div>
                </div>
                <button
                  onClick={() => setOnlyMatchEligible(prev => !prev)}
                  className={`relative w-8 h-4 rounded-full transition-all cursor-pointer ${onlyMatchEligible ? 'bg-cyan-500' : 'bg-slate-850'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-slate-950 transition-all ${onlyMatchEligible ? 'left-4.5' : 'left-0.5'}`} />
                </button>
              </div>

            </div>

            {/* Render direct items list matching search */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProjects.map((proj) => {
                const isApplied = applications.some(app => app.projectId === proj.id && app.studentId === 'student-alex');
                const matchingInfo = calcMatchRating(proj);

                return (
                  <div key={proj.id} className="bg-slate-900/40 rounded-2xl border border-slate-850 overflow-hidden flex flex-col justify-between group relative hover:border-slate-750 transition-all">
                    
                    {/* Upper decorative highlight representing matching metric score */}
                    <div className="p-5 space-y-4">
                      
                      <div className="flex gap-2 items-start justify-between">
                        
                        <div className="flex gap-2.5 items-center">
                          <img src={proj.recruiterLogo} className="w-10 h-10 rounded-xl object-cover border border-slate-800" />
                          <div>
                            <span className="text-[8px] uppercase font-mono tracking-widest text-[#7dd3fc] block mb-0.5">{proj.category}</span>
                            <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug">{proj.title}</h4>
                            <span className="text-[9px] text-slate-400 font-sans leading-none">{proj.recruiterCompany} • Post Date: {proj.createdAt}</span>
                          </div>
                        </div>

                        {/* Top corner alignment score badge */}
                        <div className="text-right">
                          <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase">Matching Scale</span>
                          <span className={`text-base font-black font-mono block ${matchingInfo.eligible ? 'text-cyan-400' : 'text-slate-400'}`}>
                            {matchingInfo.matchScore}%
                          </span>
                        </div>

                      </div>

                      {/* Description body */}
                      <p className="text-[11px] text-slate-350 leading-relaxed font-sans">{proj.description}</p>

                      {/* Required skills tags */}
                      <div className="flex flex-wrap gap-1">
                        {proj.skills.map((skill, index) => {
                          const hasSkill = studentStats.skills.some(s => s.toLowerCase() === skill.toLowerCase());
                          return (
                            <span key={index} className={`text-[8.5px] px-2 py-0.5 rounded font-sans border flex items-center gap-1 ${
                              hasSkill 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                : 'bg-slate-950 text-slate-400 border-slate-850'
                            }`}>
                              {hasSkill ? <Check size={8} /> : null}
                              {skill}
                            </span>
                          );
                        })}
                      </div>

                      {/* Dynamic evaluation warning block if locked */}
                      {!matchingInfo.eligible && (
                        <div className="bg-red-950/20 border border-red-500/15 rounded-xl p-3 flex gap-2 items-start">
                          <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={13} />
                          <div className="text-[10px] text-red-300 leading-relaxed font-sans">
                            <span className="font-extrabold block">Began Match Lockout Checklist:</span>
                            {!matchingInfo.hasReadiness && <span>• Placement Readiness is below the recruiter's {proj.requiredReadiness}% limit ({studentStats.placementReadiness}% actual).<br/></span>}
                            {!matchingInfo.hasCoding && <span>• Coding assessment score is below the recruiter's {proj.requiredCodingScore} requirement ({studentStats.codingScore} actual).<br/></span>}
                            {!matchingInfo.hasGithub && <span>• GitHub system metrics show gaps below target {proj.requiredGithubScore} requirement ({studentStats.githubScore} actual).</span>}
                          </div>
                        </div>
                      )}

                      {/* Matching info stats checklist for matching */}
                      {matchingInfo.eligible && (
                        <div className="bg-cyan-950/20 border border-cyan-500/15 rounded-xl p-3 flex gap-2 items-center">
                          <CheckCircle2 className="text-cyan-400 shrink-0" size={13} />
                          <div className="text-[10px] text-cyan-300 leading-none">
                            <strong>AI Recommended Match:</strong> You satisfy all requested readiness and skill assessments parameters.
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Lower details banner showing deadline & actions */}
                    <div className="bg-slate-950 px-5 py-3.5 border-t border-slate-850 flex items-center justify-between">
                      <div className="flex gap-4">
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Project Budget</span>
                          <span className="text-xs font-extrabold text-slate-200 font-mono">₹{proj.budget.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Apply Deadline</span>
                          <span className="text-xs font-bold text-slate-400">{proj.deadline}</span>
                        </div>
                      </div>

                      {/* Apply trigger */}
                      {isApplied ? (
                        <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1">
                          <Check size={12} /> Applied
                        </span>
                      ) : (
                        <button
                          disabled={!matchingInfo.eligible}
                          onClick={() => setSelectedApplyProject(proj)}
                          className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                            matchingInfo.eligible
                              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:scale-[1.03]'
                              : 'bg-slate-900 text-slate-500 border border-slate-850 cursor-not-allowed'
                          }`}
                        >
                          {matchingInfo.eligible ? 'Apply for Project' : 'Match Locked'} <ArrowRight size={12} />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}

              {filteredProjects.length === 0 && (
                <div className="col-span-2 py-16 text-center border border-dashed border-slate-850 rounded-2xl">
                  <Briefcase className="mx-auto mb-3 text-slate-600" size={24} />
                  <p className="text-xs text-slate-400">No projects found matching the current search filters.</p>
                  <p className="text-[9px] text-slate-500 max-w-sm mx-auto mt-1">Try resetting the category choice or disabling the AI-Matched recommendation gate.</p>
                </div>
              )}
            </div>

          </div>

          {/* APPLICATION FORM OVERLAY MODAL */}
          <AnimatePresence>
            {selectedApplyProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-cyan-400">Application Statement</span>
                      <h3 className="text-sm font-bold text-slate-100">Bidding for: {selectedApplyProject.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedApplyProject(null)}
                      className="text-slate-400 hover:text-slate-200 text-sm font-sans"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-350 block mb-1">Introduce Your Technical Pitch</label>
                      <textarea
                        required
                        value={applyCoverLetter}
                        onChange={(e) => setApplyCoverLetter(e.target.value)}
                        placeholder="Detail how you will build this feature. Specify your stack milestones..."
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 focus:outline-none placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-350 block mb-1">Relevant GitHub Project Repository URL</label>
                      <input
                        required
                        type="url"
                        value={applyGithubUrl}
                        onChange={(e) => setApplyGithubUrl(e.target.value)}
                        placeholder="https://github.com/yourusername/reponame"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 focus:outline-none placeholder:text-slate-600"
                      />
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex gap-2.5 items-start">
                      <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={13} />
                      <p className="text-[9.5px] text-slate-400 leading-normal font-sans">
                        <strong>Escrow Security Notice:</strong> Upon recruiter award approval, active payment is held securely in escrow. Funds are automatically disbursed directly into your wallet balance on finalized work acceptance.
                      </p>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedApplyProject(null)}
                        className="px-4 py-2 hover:bg-slate-850 border border-slate-800 text-slate-400 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                      >
                        File Application Link
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* DELIVERABLE WORK SUBMISSION FORM OVERLAY MODAL */}
          <AnimatePresence>
            {selectedSubmitProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-cyan-400">Release Bidding Deliverables</span>
                      <h3 className="text-sm font-bold text-slate-100">Deliverable Work: {selectedSubmitProject.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedSubmitProject(null)}
                      className="text-slate-400 hover:text-slate-200 text-sm font-sans"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleDeliverableSubmit} className="p-6 space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-350 block mb-1">Completed Build Link (GitHub or Live Demo URL)</label>
                      <input
                        required
                        type="url"
                        value={submitLink}
                        onChange={(e) => setSubmitLink(e.target.value)}
                        placeholder="https://github.com/yourusername/completed-project"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 focus:outline-none placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-350 block mb-1">Completion Submission Notes</label>
                      <textarea
                        required
                        value={submitNotes}
                        onChange={(e) => setSubmitNotes(e.target.value)}
                        placeholder="Describe features completed, stack optimizations, and deploy status details..."
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 focus:outline-none placeholder:text-slate-600"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSubmitProject(null)}
                        className="px-4 py-2 hover:bg-slate-850 border border-slate-800 text-slate-400 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
                      >
                        Submit Completed Deliverable
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* ========================================================= */}
      {/* 2. RECRUITER PERSONA PORTAL */}
      {/* ========================================================= */}
      {activePersona === 'recruiter' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Create Project Form Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 space-y-4">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-200">Post Paid Freelance Project</h4>
                <p className="text-[10px] text-slate-400 mt-1">Initiate escrow balances automatically via simulated secure Razorpay terminal checkout.</p>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 font-sans">
                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g., Responsive Billing Stripe Segment"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">Work Description & Scope</label>
                  <textarea
                    required
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    placeholder="Provide full description, required deliverables, and technical criteria details..."
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-300 block mb-1">Budget (INR)</label>
                    <input
                      type="number"
                      required
                      value={newProjBudget}
                      onChange={(e) => setNewProjBudget(parseInt(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-2 text-xs font-mono text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-300 block mb-1">Deadline Date</label>
                    <input
                      type="date"
                      required
                      value={newProjDeadline}
                      onChange={(e) => setNewProjDeadline(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-2 text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI / Machine Learning">AI / Machine Learning</option>
                    <option value="DevOps & Systems">DevOps & Systems</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    required
                    value={newProjSkills}
                    onChange={(e) => setNewProjSkills(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>

                {/* AI parameters requirements sliders */}
                <div className="space-y-2 border-t border-slate-850 pt-3">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">AI Match Screening Rules</span>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span>Min Readiness Benchmark</span>
                      <span className="text-purple-400 font-bold">{reqReadiness}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={reqReadiness}
                      onChange={(e) => setReqReadiness(parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span>Min Coding Assessment</span>
                      <span className="text-purple-400 font-bold">{reqCodingScore}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={reqCodingScore}
                      onChange={(e) => setReqCodingScore(parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span>Min Github Performance Score</span>
                      <span className="text-purple-400 font-bold">{reqGithubScore}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={reqGithubScore}
                      onChange={(e) => setReqGithubScore(parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-center py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-[0_4px_12px_rgba(168,85,247,0.3)] flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} /> Create & Funds Escrow
                </button>
              </form>
            </div>
          </div>

          {/* Active Projects & Applicant Review Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Project Admin panel */}
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-slate-200">Your Posted Projects Workspace ({projects.length})</h4>
              
              <div className="space-y-4">
                {projects.map((proj) => {
                  const correlatedApps = applications.filter(app => app.projectId === proj.id);
                  return (
                    <div key={proj.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850/80 space-y-3.5">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-100">{proj.title}</h4>
                            <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${
                              proj.status === 'secured' 
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                                : proj.status === 'completed'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : proj.status === 'assigned'
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    : proj.status === 'submitted'
                                      ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {proj.status === 'secured' ? 'Funded & Free Matching' : proj.status.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-0.5 font-sans">
                            Budget: ₹{proj.budget.toLocaleString()} • Deadline: {proj.deadline}
                          </span>
                        </div>

                        {/* Payment funding switch */}
                        {proj.status === 'draft' && (
                          <button
                            onClick={() => initiateRazorpayEscrowPayment(proj)}
                            className="px-3 py-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-400 border border-indigo-500/30 text-[9px] font-black uppercase tracking-wider rounded transition-all cursor-pointer"
                          >
                            Fund razorpay Escrow Hold
                          </button>
                        )}
                      </div>

                      {/* Display Applicants for this active project */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Auditing Applicants ({correlatedApps.length})</span>
                        
                        {correlatedApps.map((app) => (
                          <div key={app.id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-850/80 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <img src={app.studentAvatar} className="w-7 h-7 rounded-full object-cover border border-slate-800" />
                                <div>
                                  <span className="text-xs font-semibold text-slate-200 block leading-none">{app.studentName}</span>
                                  <span className="text-[8px] text-slate-500 font-mono tracking-wider block mt-0.5">{app.studentEmail}</span>
                                </div>
                              </div>

                              <div className="text-right">
                                <span className="text-[8px] font-mono text-slate-500 block uppercase">Match DNA Rating</span>
                                <span className="text-xs font-black font-mono text-emerald-400">88% Match</span>
                              </div>
                            </div>

                            {/* Applied cover statements */}
                            <p className="text-[10px] text-slate-350 leading-relaxed font-sans bg-slate-950/40 p-2.5 rounded border border-slate-900">{app.coverLetter}</p>
                            
                            {/* Actions on candidate */}
                            <div className="flex items-center justify-between text-[9px] font-mono">
                              <a href={app.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-200 flex items-center gap-1">
                                <Github size={12} /> View Sandbox repo <ExternalLink size={10} />
                              </a>

                              {app.status === 'pending' && (
                                <button
                                  onClick={() => acceptStudentApplicant(app.id, proj.id)}
                                  className="px-3 py-1 bg-purple-950 hover:bg-purple-900 text-purple-400 border border-purple-500/20 rounded cursor-pointer font-bold"
                                >
                                  Award & Assign Project Work
                                </button>
                              )}

                              {app.status === 'accepted' && (
                                <span className="text-[10px] text-slate-500 italic">Trainee is constructing features...</span>
                              )}

                              {/* Review completed submission triggers */}
                              {app.status === 'submitted' && (
                                <div className="space-y-2 w-full pt-1.5 border-t border-slate-900">
                                  <div className="bg-slate-950/60 p-2.5 rounded border border-slate-900 space-y-1">
                                    <span className="text-[9.5px] font-bold text-yellow-400 block uppercase">Trainee Submission Deliverable</span>
                                    <p className="text-[9.5px] text-slate-300 font-sans italic">"{app.submissionNotes}"</p>
                                    <a href={app.submissionLink} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 mt-1 text-[9px]">
                                      Deliverable URL: {app.submissionLink} <ExternalLink size={9} />
                                    </a>
                                  </div>

                                  <div className="flex gap-2 justify-end">
                                    <button
                                      onClick={() => approveAndReleasePayment(proj.id, proj.budget)}
                                      className="px-3 py-1 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 text-[9.5px] uppercase font-black tracking-wider rounded cursor-pointer"
                                    >
                                      Approve Work & Release Escrow Funds
                                    </button>
                                  </div>
                                </div>
                              )}

                              {app.status === 'approved' && (
                                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 uppercase">
                                  <Check size={12} /> Escrow Released & Completed
                                </span>
                              )}
                            </div>

                          </div>
                        ))}

                        {correlatedApps.length === 0 && (
                          <div className="text-center py-6 bg-slate-900/20 border border-dashed border-slate-850 rounded">
                            <Users className="mx-auto text-slate-600 mb-1.5" size={16} />
                            <p className="text-[10px] text-slate-400 leading-none">Scanning CareerPilot talent pool...</p>
                            <p className="text-[8px] text-slate-500 leading-none mt-1">Matched trainees are automatically evaluated based on Skill DNA score.</p>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* 3. PLATFORM ADMIN ESCROW DASHBOARD */}
      {/* ========================================================= */}
      {activePersona === 'admin' && (
        <div className="space-y-6">
          
          {/* Dashboard upper metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-450 block">Total Projects Posted</span>
              <span className="text-xl font-extrabold font-mono text-slate-200 block mt-1">{stats.totalCount} Projects</span>
              <span className="text-[8.5px] text-slate-500 font-medium block mt-1">Aggregated platform count</span>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-450 block">Total Cash Volume</span>
              <span className="text-xl font-extrabold font-mono text-cyan-400 block mt-1">₹{stats.totalRevenue.toLocaleString()}</span>
              <span className="text-[8.5px] text-slate-500 font-medium block mt-1">Secured escrow transactions</span>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-450 block">Secure Escrow Hold</span>
              <span className="text-xl font-extrabold font-mono text-indigo-400 block mt-1">₹{stats.secureHold.toLocaleString()}</span>
              <span className="text-[8.5px] text-slate-500 font-bold block text-indigo-300 mt-1">Held securely in trust</span>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-450 block">Active Recruiters</span>
              <span className="text-xl font-extrabold font-mono text-purple-405 block mt-1">{stats.uniqueRecruiters} Active</span>
              <span className="text-[8.5px] text-slate-500 font-medium block mt-1">Companies seeking matches</span>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-450 block">Successful Paid Outs</span>
              <span className="text-xl font-extrabold font-mono text-emerald-400 block mt-1">{stats.completedCount} Projects</span>
              <span className="text-[8.5px] text-slate-500 font-medium block mt-1">Trainee jobs paid</span>
            </div>

          </div>

          {/* Graphical charts of transactions over times */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 lg:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-205">Razorpay Escrow Holding Flow over days</h4>
                <p className="text-[10px] text-slate-400">Total volume securely held as trust security checks complete.</p>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradientHold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradientReleased" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#475569" fontSize={10} fontClassName="font-mono" />
                    <YAxis stroke="#475569" fontSize={10} fontClassName="font-mono" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                    <Area type="monotone" dataKey="EscrowLocked" stroke="#6366f1" fillOpacity={1} fill="url(#gradientHold)" name="Escrow Hold Value" />
                    <Area type="monotone" dataKey="Released" stroke="#10b981" fillOpacity={1} fill="url(#gradientReleased)" name="Released & Earned" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 lg:col-span-1 space-y-4">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-205">Category volume index</h4>
                <p className="text-[10px] text-slate-400">Distribution of jobs across tech domains</p>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.categoryDistribution} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#475569" fontSize={8} />
                    <YAxis stroke="#475569" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                    <Bar dataKey="budget" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Allocated Budget">
                      {stats.categoryDistribution.map((entry, index) => {
                        const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Secure Audit log representation */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850 space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-202">Audit Ledger (Escrow Webhooks & Razorpay Transactions)</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] tracking-wider uppercase">
                    <th className="pb-3 pl-3">Txn Hash</th>
                    <th className="pb-3">Sender (Escrow)</th>
                    <th className="pb-3">Title Description</th>
                    <th className="pb-3">Budget</th>
                    <th className="pb-3">Escrow Status</th>
                    <th className="pb-3 pr-3 text-right">Released State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/60 font-sans text-slate-300">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-900/30">
                      <td className="py-3.5 pl-3 font-mono text-[10px] text-purple-400">txn_rzp_{proj.id}</td>
                      <td className="py-3.5">{proj.recruiterCompany}</td>
                      <td className="py-3.5 max-w-sm truncate">{proj.title}</td>
                      <td className="py-3.5 font-mono">₹{proj.budget.toLocaleString()}</td>
                      <td className="py-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                          proj.status !== 'draft' 
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {proj.status !== 'draft' ? 'Secured hold' : 'Draft Unpaid'}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-3 font-semibold text-slate-200">
                        {proj.status === 'completed' ? 'Direct Released' : 'Held in Vault'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* FOOTER INFORMATIONAL COMPACT BOX */}
      <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-4 flex gap-3 items-start leading-relaxed text-slate-450 font-sans text-[11px]">
        <Info className="text-cyan-500 shrink-0 mt-0.5" size={14} />
        <p>
          <strong>Razorpay Escrow Mechanism:</strong> Direct billing captures authorized payment balances securely via standardized client checkout. CareerPilot OS acts as an automated escrow contract holder. Student allocations remain securely locked until recruiters audit final build links and execute the disbursement sequence.
        </p>
      </div>

    </div>
  );
}
