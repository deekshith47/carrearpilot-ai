import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Github, 
  Terminal, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Brain, 
  User, 
  FolderGit2, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Layers, 
  FileCode2, 
  ExternalLink,
  ChevronRight,
  Shield,
  ThumbsUp,
  TrendingUp,
  XCircle,
  Activity
} from 'lucide-react';

interface FeatureDetected {
  name: string;
  detected: boolean;
}

interface VerificationReport {
  githubAnalysis: {
    commits: number;
    durationDays: number;
    firstCommit: string;
    lastCommit: string;
    contributors: number;
    activityScore: number;
  };
  projectScanner: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
    apiUsage: string;
    deployment: string;
    features: FeatureDetected[];
  };
  qualityAnalysis: {
    folderStructure: number;
    codeOrganization: number;
    documentation: number;
    readability: number;
    scalability: number;
    qualityScore: number;
  };
  vivaQuestions: string[];
  hiringRecommendation: {
    strengths: string[];
    weaknesses: string[];
    recommendedRole: string;
  };
}

// Interactive Pre-loaded Sample Candidates for Recruiter Dashboard auditing
const PRELOADED_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Devon Lee',
    email: 'devon.lee@university.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    projectTitle: 'Distributed Telematics Broker',
    githubUrl: 'https://github.com/devon-lee/real-time-broker',
    liveDemoUrl: 'https://broker-demo.telematics.io',
    description: 'A low-latency message broker pulling live telemetry streams, storing state, and firing immediate diagnostic alerts.',
    technologies: 'React, Node.js, Express, Redis, PostgreSQL, WebSockets',
    report: {
      githubAnalysis: {
        commits: 114,
        durationDays: 28,
        firstCommit: '2026-03-10',
        lastCommit: '2026-04-07',
        contributors: 2,
        activityScore: 92
      },
      projectScanner: {
        frontend: 'React',
        backend: 'Node.js (Express)',
        database: 'PostgreSQL & Redis',
        auth: 'JWT Cookies',
        apiUsage: 'REST & WebSockets',
        deployment: 'Cloud Run',
        features: [
          { name: 'Login & Session auth', detected: true },
          { name: 'Metrics Dashboard', detected: true },
          { name: 'REST Endpoint Handlers', detected: true },
          { name: 'Stripe Escrow Gateway', detected: false }
        ]
      },
      qualityAnalysis: {
        folderStructure: 90,
        codeOrganization: 88,
        documentation: 82,
        readability: 91,
        scalability: 85,
        qualityScore: 87
      },
      vivaQuestions: [
        'How does state sync represent database transactions under concurrent WebSocket loads?',
        'Why did you structure PostgreSQL schemas with Redis session tokens?',
        'Detail how pipeline errors bubble up securely to React user cards.'
      ],
      hiringRecommendation: {
        strengths: ['Expert thread-safe WebSocket connection pools', 'Pristine decoupled service folders'],
        weaknesses: ['Unit testing coverage below standard 80%', 'Verbose console logging middleware'],
        recommendedRole: 'Full Stack Engineer'
      }
    },
    vivaCompleted: true,
    vivaResponsesCount: 3,
    vivaScore: 89,
    authenticityScore: 89
  },
  {
    id: 'cand-2',
    name: 'Sophia Chen',
    email: 'sophia.c@university.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    projectTitle: 'AI-Powered Resume ATS Parser',
    githubUrl: 'https://github.com/s-chen/resume-ats-analyzer',
    liveDemoUrl: 'https://ats-analyzer-preview.net',
    description: 'An evaluation engine matching resume phrases against key skill vectors using cosine similarities and text normalization.',
    technologies: 'Next.js, Tailwind, Python, FastAPI, Cosine Similarity',
    report: {
      githubAnalysis: {
        commits: 49,
        durationDays: 12,
        firstCommit: '2026-04-18',
        lastCommit: '2026-04-30',
        contributors: 1,
        activityScore: 78
      },
      projectScanner: {
        frontend: 'Next.js (React)',
        backend: 'FastAPI (Python)',
        database: 'Local Vector Store',
        auth: 'Google OAuth',
        apiUsage: 'REST APIs',
        deployment: 'Vercel',
        features: [
          { name: 'Login & Session auth', detected: true },
          { name: 'Metrics Dashboard', detected: true },
          { name: 'REST Endpoint Handlers', detected: true },
          { name: 'Stripe Escrow Gateway', detected: false }
        ]
      },
      qualityAnalysis: {
        folderStructure: 80,
        codeOrganization: 82,
        documentation: 90,
        readability: 85,
        scalability: 74,
        qualityScore: 82
      },
      vivaQuestions: [
        'How is vocabulary normalization managed before feeding the similarity matrix?',
        'Why did you select FastAPI over monolithic Django frameworks?',
        'Describe performance profiles when parsing 100+ documents concurrently.'
      ],
      hiringRecommendation: {
        strengths: ['Clear mathematical vector parsing steps', 'Excellent python typing wrappers'],
        weaknesses: ['Lack of database storage cache layers', 'Synchronous heavy processing paths'],
        recommendedRole: 'Machine Learning / Web Developer'
      }
    },
    vivaCompleted: true,
    vivaResponsesCount: 3,
    vivaScore: 86,
    authenticityScore: 83
  },
  {
    id: 'cand-3',
    name: 'Alex Rivera',
    email: 'arivera@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    projectTitle: 'Secure Crypto Escrow Hub',
    githubUrl: 'https://github.com/alex-riv/crypto-escrow-v1',
    liveDemoUrl: '',
    description: 'A temporary storage lock that releases funds only when multi-signature audits clear during freelance developer milestones.',
    technologies: 'HTML, Bootstrap, No Backend',
    report: {
      githubAnalysis: {
        commits: 8,
        durationDays: 3,
        firstCommit: '2026-05-15',
        lastCommit: '2026-05-18',
        contributors: 1,
        activityScore: 40
      },
      projectScanner: {
        frontend: 'HTML/Bootstrap',
        backend: 'None',
        database: 'Local Storage / None',
        auth: 'None',
        apiUsage: 'Static Fetch',
        deployment: 'GitHub Pages',
        features: [
          { name: 'Login & Session auth', detected: false },
          { name: 'Metrics Dashboard', detected: false },
          { name: 'REST Endpoint Handlers', detected: false },
          { name: 'Stripe Escrow Gateway', detected: false }
        ]
      },
      qualityAnalysis: {
        folderStructure: 45,
        codeOrganization: 50,
        documentation: 35,
        readability: 60,
        scalability: 30,
        qualityScore: 44
      },
      vivaQuestions: [
        'What strategy ensures tokens are not stolen if local state is wiped?',
        'How are multi-signature wallets authenticated without backend routing security checks?',
        'Describe the code layout architecture of your inline script handlers.'
      ],
      hiringRecommendation: {
        strengths: ['Basic visual interface wireframe setup'],
        weaknesses: ['Heavy static hardcoding in main controller files', 'Zero backend api validation parameters'],
        recommendedRole: 'Junior Interface Support'
      }
    },
    vivaCompleted: true,
    vivaResponsesCount: 3,
    vivaScore: 50,
    authenticityScore: 46
  }
];

export default function ProjectVerification() {
  const [activeTab, setActiveTab] = useState<'student' | 'recruiter'>('student');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');

  // Submission / Scan States
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // AI Viva Interactive Chat states
  const [selectedVivaQuestionIndex, setSelectedVivaQuestionIndex] = useState<number | null>(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluatingViva, setIsEvaluatingViva] = useState(false);
  const [vivaAnswers, setVivaAnswers] = useState<{ [key: number]: { answer: string; score: number; accuracy: number; confidence: number; understanding: number; feedback: string } }>({});
  
  // Custom candidate list (Preloaded + Student Submitted)
  const [candidates, setCandidates] = useState(PRELOADED_CANDIDATES);
  const [selectedCandidateId, setSelectedCandidateId] = useState('cand-1');

  const scanStepsText = [
    'Establishing secure Git handshake with repository...',
    'Analyzing commit telemetry, frequency cycles, and author metadata...',
    'Performing static repository scan to discover framework layout...',
    'Scanning configurations for Databases, Authentication, and Route structures...',
    'Evaluating code folder architecture, readability tags, and modularity...',
    'Generating targeted, AI-customized project defense Viva questions...'
  ];

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl || !description) return;

    setIsScanning(true);
    setScanStep(0);
    setErrorMessage('');
    setReport(null);
    setVivaAnswers({});
    setSelectedVivaQuestionIndex(null);

    // Dynamic timer sequence simulates high-fidelity multi-stage project scanning progress logs
    const interval = setInterval(() => {
      setScanStep(prev => {
        if (prev < scanStepsText.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1100);

    try {
      const response = await fetch('/api/verify-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUrl,
          liveDemoUrl,
          description,
          technologies
        })
      });

      if (!response.ok) {
        throw new Error('Project parsing failed. Ensure valid URL and descriptions.');
      }

      const parsedReport = await response.json();
      
      // Delay final state slightly to showcase the immersive logging dashboard
      setTimeout(() => {
        clearInterval(interval);
        setReport(parsedReport);
        setIsScanning(false);
        setScanStep(0);

        // Add this student project directly as an active recruiter audit candidate!
        const newCandidate = {
          id: 'student-submitted',
          name: 'Your Submission (Guest Student)',
          email: 'guest.student@university.edu',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          projectTitle: parsedReport.projectScanner.frontend + ' Core Application',
          githubUrl: githubUrl,
          liveDemoUrl: liveDemoUrl,
          description: description,
          technologies: technologies || 'Not specified',
          report: parsedReport,
          vivaCompleted: false,
          vivaResponsesCount: 0,
          vivaScore: 0,
          authenticityScore: 0 // Will auto calculate when student answers viva
        };

        setCandidates(prev => {
          // Remove old student submission if re-submitted, keep sorted list
          const cleaned = prev.filter(c => c.id !== 'student-submitted');
          return [newCandidate, ...cleaned];
        });
      }, 6500);

    } catch (err: any) {
      clearInterval(interval);
      setErrorMessage(err.message || 'Network evaluation timeout.');
      setIsScanning(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (selectedVivaQuestionIndex === null || !studentAnswer.trim() || !report) return;

    setIsEvaluatingViva(true);
    const question = report.vivaQuestions[selectedVivaQuestionIndex];

    try {
      const res = await fetch('/api/evaluate-viva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          answer: studentAnswer,
          projectDescription: description
        })
      });

      if (!res.ok) {
        throw new Error('Unable to evaluate live response.');
      }

      const evalData = await res.json();

      setVivaAnswers(prev => ({
        ...prev,
        [selectedVivaQuestionIndex]: {
          answer: studentAnswer,
          score: evalData.vivaScore,
          accuracy: evalData.accuracy,
          confidence: evalData.confidence,
          understanding: evalData.understanding,
          feedback: evalData.evalFeedback
        }
      }));

      setStudentAnswer('');
      setSelectedVivaQuestionIndex(null);

    } catch (err: any) {
      alert(err.message || 'Failed evaluating answers.');
    } finally {
      setIsEvaluatingViva(false);
    }
  };

  // Compute stats on current submission
  const completedVivaCount = Object.keys(vivaAnswers).length;
  const isAllVivaDone = report && completedVivaCount === report.vivaQuestions.length;

  let computedVivaScore = 0;
  let finalAuthenticityScore = 0;
  let verificationStatus = 'Needs Review';

  if (report) {
    if (completedVivaCount > 0) {
      const sum = Object.values(vivaAnswers).reduce((acc, current) => acc + current.score, 0);
      computedVivaScore = Math.round(sum / completedVivaCount);
    }

    // Weight allocations: Activity (25%), Quality (35%), Active Viva Code Defence (40%)
    const actPart = report.githubAnalysis.activityScore * 0.25;
    const qualPart = report.qualityAnalysis.qualityScore * 0.35;
    const vivaPart = (completedVivaCount > 0 ? computedVivaScore : 50) * 0.40; // temporary fallback mid-anchor

    finalAuthenticityScore = Math.round(actPart + qualPart + vivaPart);

    // Require high standard
    verificationStatus = finalAuthenticityScore >= 75 && completedVivaCount === report.vivaQuestions.length 
      ? 'Verified Project' 
      : 'Needs Review';
  }

  // Handle updating lists
  const handleUpdateCandidatesList = () => {
    if (!report) return;
    setCandidates(prev => prev.map(c => {
      if (c.id === 'student-submitted') {
        return {
          ...c,
          vivaCompleted: isAllVivaDone ? true : false,
          vivaResponsesCount: completedVivaCount,
          vivaScore: computedVivaScore,
          authenticityScore: finalAuthenticityScore
        };
      }
      return c;
    }));
  };

  // Watch answer completions to keep candidates sync
  if (report && (completedVivaCount > 0 || isAllVivaDone)) {
    const updatedCandidate = candidates.find(c => c.id === 'student-submitted');
    if (updatedCandidate && updatedCandidate.vivaResponsesCount !== completedVivaCount) {
      handleUpdateCandidatesList();
    }
  }

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8" id="integrity-project-app">
      {/* Dynamic Module Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black font-sans tracking-tight text-slate-100">AI Project Verification Engine</h1>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl font-mono">
            Reduces fake submissions by evaluating repository commit logs, static file hierarchy scanner metrics, and real-time AI code defense.
          </p>
        </div>

        {/* Unified Persona Switcher */}
        <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-xl w-full md:w-auto">
          <button
            id="tab-student"
            onClick={() => setActiveTab('student')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
              activeTab === 'student'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            Student Gate
          </button>
          <button
            id="tab-recruiter"
            onClick={() => setActiveTab('recruiter')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
              activeTab === 'recruiter'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            Recruiter Audit
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'student' ? (
          <motion.div
            key="student-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Submit Project Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-400">
                  <Github className="h-36 w-36" />
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <FolderGit2 className="h-5 w-5 text-emerald-400" />
                    Project Workspace
                  </h2>
                  <p className="text-slate-400 text-xs font-mono mt-1">Submit repository details for telemetry audits.</p>
                </div>

                <form onSubmit={handleProjectSubmit} className="space-y-4 font-mono relative z-10">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">GitHub Repository URL</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Github className="h-4 w-4" />
                      </div>
                      <input
                        type="url"
                        disabled={isScanning}
                        required
                        placeholder="https://github.com/username/project"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Live Demo URL (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                      <input
                        type="url"
                        disabled={isScanning}
                        placeholder="https://my-live-demo.vercel.app"
                        value={liveDemoUrl}
                        onChange={(e) => setLiveDemoUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Project Description</label>
                    <textarea
                      disabled={isScanning}
                      required
                      rows={4}
                      placeholder="Explain features, backend endpoints, relational DB design patterns..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 resize-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Technologies Used</label>
                    <input
                      type="text"
                      disabled={isScanning}
                      placeholder="e.g. React, Express, MongoDB, Tailwind, JWT"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <button
                    id="submit-project-btn"
                    type="submit"
                    disabled={isScanning || !githubUrl || !description}
                    className="w-full py-3.5 px-4 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold font-mono tracking-wider hover:bg-emerald-400 disabled:bg-slate-900 disabled:text-slate-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        Triggering AI Scanners...
                      </>
                    ) : (
                      <>
                        <Cpu className="h-4 w-4 animate-pulse" />
                        Run Integrity Verification
                      </>
                    )}
                  </button>
                </form>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-[11px] font-mono flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Integrity Warning Info */}
              <div className="bg-slate-900/20 border border-slate-800/60 p-5 rounded-2xl space-y-3 font-mono text-slate-400">
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
                  <AlertTriangle className="h-4 w-4" />
                  No File Upload Rule
                </div>
                <p className="text-[11px] leading-relaxed">
                  To assure strict recruiter accountability, we index commit timelines, repository histories, and active branching directly from GitHub. Static zip files are not verified.
                </p>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-8 space-y-8">
              {isScanning && (
                <div className="bg-slate-900/40 border border-emerald-500/20 rounded-2xl p-8 backdrop-blur-md flex flex-col items-center justify-center min-h-[450px] space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>

                  <div className="text-center space-y-3 max-w-md">
                    <h3 className="text-emerald-400 font-mono text-sm font-semibold tracking-widest animate-pulse">
                      PARSING REPO TELEMETRY
                    </h3>
                    <p className="text-slate-200 text-xs font-sans min-h-[40px]">
                      {scanStepsText[scanStep]}
                    </p>
                  </div>

                  {/* Programmatic simulated status logs */}
                  <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-left space-y-1.5 overflow-hidden text-[10px]">
                    <div className="text-emerald-500/80">🚀 [CORE ENGINE INITIALIZED]</div>
                    {scanStep >= 1 && <div className="text-cyan-400/80">✔ [GITHUB ANALYZER] Handshake verified. Parsing commits...</div>}
                    {scanStep >= 2 && <div className="text-cyan-400/80">✔ [GITHUB ANALYZER] Committed: 38 times. 1 Active contributor discovered.</div>}
                    {scanStep >= 3 && <div className="text-purple-400/80">✔ [STATIC SCANNER] Folder discovery: /components, /src, package.json exists.</div>}
                    {scanStep >= 4 && <div className="text-purple-400/80">✔ [ARCHITECTURE DETECTED] SPA configuration mapped to React runtime.</div>}
                    {scanStep >= 5 && <div className="text-amber-400/80">✔ [QUALITY PROFILE] Cosine similarity scanner scoring code modularity at 84%...</div>}
                    <div className="text-slate-600 animate-pulse">▒ Reading stream data...</div>
                  </div>
                </div>
              )}

              {!isScanning && !report && (
                <div className="bg-slate-900/10 border border-slate-800/40 rounded-2xl p-12 text-center min-h-[450px] flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 bg-slate-900/60 rounded-full text-slate-600">
                    <Terminal className="h-12 w-12" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h3 className="text-slate-300 font-bold text-sm">Awaiting Submission Stream</h3>
                    <p className="text-slate-400 text-xs">
                      Submit your GitHub repository in the left panel to trigger static scans, quality checking, and generate your customized viva defense setup.
                    </p>
                  </div>
                </div>
              )}

              {/* Main Report Dashboard */}
              {report && !isScanning && (
                <div className="space-y-8">
                  {/* Step 5: Authenticity & Status Card */}
                  <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2">
                        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-black">
                          Step 5: Mapped Authenticity Status
                        </div>
                        <h3 className="text-xl font-bold font-sans text-slate-100">{githubUrl.split('/').pop()} Verification Report</h3>
                        <div className="flex items-center gap-4 pt-1 font-mono text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            Viva Defense: {completedVivaCount} of 3 answered
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-slate-950 p-4 border border-slate-800 rounded-xl w-full md:w-auto">
                        <div className="space-y-1 text-center md:text-right">
                          <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Authenticity</div>
                          <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{finalAuthenticityScore}%</div>
                        </div>

                        <div className="h-8 w-px bg-slate-800"></div>

                        <div className="space-y-1">
                          <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Defense Status</div>
                          {verificationStatus === 'Verified Project' ? (
                            <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                              <CheckCircle2 className="h-4 w-4 shrink-0" />
                              VERIFIED
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                              <AlertTriangle className="h-4 w-4 shrink-0" />
                              PENDING VIVA
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress slider visually mapping combined weights */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2 font-mono text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span>Combined Security Breakdown</span>
                        <span>Weight Allocation Matrix</span>
                      </div>
                      <div className="h-2 bg-slate-950 rounded-full overflow-hidden flex">
                        <div className="bg-cyan-400" style={{ width: '25%' }}></div>
                        <div className="bg-purple-500" style={{ width: '35%' }}></div>
                        <div className="bg-emerald-400" style={{ width: `${(completedVivaCount / 3) * 40}%` }}></div>
                      </div>
                      <div className="flex gap-4 text-[10px]">
                        <span className="flex items-center gap-1 text-cyan-400">■ Commit History (25%)</span>
                        <span className="flex items-center gap-1 text-purple-400">■ Static Quality (35%)</span>
                        <span className="flex items-center gap-1 text-emerald-400">■ Viva Defense (40%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Metrics Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Step 1: GitHub Commits Analysis */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
                      <div className="flex justify-between items-center text-slate-100">
                        <h4 className="text-sm font-bold font-sans flex items-center gap-2">
                          <Activity className="h-4 w-4 text-cyan-400" />
                          Step 1: Commit Analysis
                        </h4>
                        <span className="text-[10px] font-mono bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-md">
                          Activity: {report.githubAnalysis.activityScore}%
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                        <div className="bg-slate-950 p-3 border border-slate-800/60 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">Commits</span>
                          <p className="text-base font-black text-slate-100">{report.githubAnalysis.commits}</p>
                        </div>
                        <div className="bg-slate-950 p-3 border border-slate-800/60 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">Lifespan</span>
                          <p className="text-base font-black text-slate-100">{report.githubAnalysis.durationDays} Days</p>
                        </div>
                        <div className="bg-slate-950 p-3 border border-slate-800/60 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">First Commit</span>
                          <p className="text-[10px] text-slate-200">{report.githubAnalysis.firstCommit}</p>
                        </div>
                        <div className="bg-slate-950 p-3 border border-slate-800/60 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">Last Commit</span>
                          <p className="text-[10px] text-slate-200">{report.githubAnalysis.lastCommit}</p>
                        </div>
                      </div>

                      <div className="bg-slate-950/40 p-3 border border-slate-800/40 rounded-xl text-[11px] font-mono text-slate-400">
                        Total Contributors Analyzed: <span className="text-slate-100 font-bold">{report.githubAnalysis.contributors}</span>
                      </div>
                    </div>

                    {/* Step 2: Project Web Scanner */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
                      <div className="flex justify-between items-center text-slate-100">
                        <h4 className="text-sm font-bold font-sans flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-purple-400" />
                          Step 2: Architecture Scanner
                        </h4>
                        <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-md">
                          Config Mapped
                        </span>
                      </div>

                      <div className="space-y-2.5 font-mono text-xs">
                        <div className="flex justify-between items-center bg-slate-950/60 py-2 px-3 border border-slate-800/40 rounded-lg">
                          <span className="text-slate-400">Frontend</span>
                          <span className="text-slate-200 font-bold">{report.projectScanner.frontend}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950/60 py-2 px-3 border border-slate-800/40 rounded-lg">
                          <span className="text-slate-400">Backend</span>
                          <span className="text-slate-200 font-bold">{report.projectScanner.backend}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950/60 py-2 px-3 border border-slate-800/40 rounded-lg">
                          <span className="text-slate-400">Database Layer</span>
                          <span className="text-slate-200 font-bold">{report.projectScanner.database}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950/60 py-2 px-3 border border-slate-800/40 rounded-lg">
                          <span className="text-slate-400">Security / Auth</span>
                          <span className="text-slate-200 font-bold">{report.projectScanner.auth}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features & Quality scores bento blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Features checklist */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
                      <h4 className="text-sm font-bold font-sans flex items-center gap-2 text-slate-100">
                        <Layers className="h-4 w-4 text-indigo-400" />
                        Scanned Core Architectures
                      </h4>

                      <div className="space-y-2 font-mono text-xs">
                        {report.projectScanner.features.map((feat, i) => (
                          <div key={i} className="flex justify-between items-center py-2 px-3 border border-slate-800/50 rounded-xl">
                            <span className="text-slate-400">{feat.name}</span>
                            <div className="flex items-center gap-1">
                              {feat.detected ? (
                                <span className="flex items-center gap-1.5 font-bold text-emerald-400 text-[10px]">
                                  <Check className="h-3.5 w-3.5" />
                                  DETECTED
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 font-semibold text-slate-500 text-[10px]">
                                  <XCircle className="h-3.5 w-3.5" />
                                  ABSENT
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Project Quality score parsing metrics */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
                      <div className="flex justify-between items-center text-slate-100">
                        <h4 className="text-sm font-bold font-sans flex items-center gap-2">
                          <FileCode2 className="h-4 w-4 text-purple-400" />
                          Step 3: Quality Matrix
                        </h4>
                        <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-md">
                          Quality Score: {report.qualityAnalysis.qualityScore}%
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs text-slate-400">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>Folder Taxonomy Structure</span>
                            <span className="text-slate-200">{report.qualityAnalysis.folderStructure}%</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${report.qualityAnalysis.folderStructure}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>Code Decoupling Organization</span>
                            <span className="text-slate-200">{report.qualityAnalysis.codeOrganization}%</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${report.qualityAnalysis.codeOrganization}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>Documentation Quality (README)</span>
                            <span className="text-slate-200">{report.qualityAnalysis.documentation}%</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${report.qualityAnalysis.documentation}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>Readability & Naming Conventions</span>
                            <span className="text-slate-200">{report.qualityAnalysis.readability}%</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${report.qualityAnalysis.readability}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: AI Viva Defense Setup */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold font-sans flex items-center gap-2 text-slate-100">
                        <Brain className="h-4 w-4 text-emerald-400 animate-pulse" />
                        Step 4: AI Project Defense Viva
                      </h4>
                      <p className="text-slate-400 text-xs font-mono">
                        recruitment protection module generates questions based on your submitted architecture to block copy-paste submission fraud.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {report.vivaQuestions.map((q, i) => {
                        const isDone = !!vivaAnswers[i];
                        const resData = vivaAnswers[i];

                        return (
                          <div
                            key={i}
                            className={`border rounded-xl p-4 transition-all ${
                              isDone 
                                ? 'bg-slate-950/50 border-emerald-500/20' 
                                : selectedVivaQuestionIndex === i 
                                  ? 'bg-slate-950 border-emerald-500' 
                                  : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700/80'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="font-mono text-xs text-slate-300">
                                <span className="text-emerald-400 font-bold">VIVA QUESTION #{i + 1}: </span>
                                {q}
                              </div>

                              {!isDone && selectedVivaQuestionIndex !== i && (
                                <button
                                  onClick={() => {
                                    setSelectedVivaQuestionIndex(i);
                                    setStudentAnswer('');
                                  }}
                                  className="px-3 py-1.5 bg-emerald-500 border-none text-slate-950 hover:bg-emerald-400 text-[10px] font-mono font-bold rounded-lg cursor-pointer transition-colors"
                                >
                                  Answer
                                </button>
                              )}

                              {isDone && (
                                <span className="shrink-0 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold uppercase rounded-md tracking-wider flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  SCORE: {resData.score}%
                                </span>
                              )}
                            </div>

                            {/* Live Answer Box */}
                            {selectedVivaQuestionIndex === i && (
                              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 font-mono">
                                <textarea
                                  rows={3}
                                  placeholder="Type your design answers details here..."
                                  value={studentAnswer}
                                  onChange={(e) => setStudentAnswer(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 resize-none"
                                />

                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-slate-600">
                                    Min word count: {studentAnswer.trim().split(/\s+/).filter(Boolean).length}/15 recommended.
                                  </span>

                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => setSelectedVivaQuestionIndex(null)}
                                      className="px-3.5 py-1.5 bg-slate-900 text-slate-300 ring-1 ring-slate-800 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      id="btn-submit-viva-answer"
                                      onClick={handleAnswerSubmit}
                                      disabled={isEvaluatingViva || studentAnswer.trim().length === 0}
                                      className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 rounded-lg text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                      {isEvaluatingViva ? (
                                        <>
                                          <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                                          Verifying...
                                        </>
                                      ) : (
                                        <>
                                          <Send className="h-3 w-3" />
                                          Submit Defence
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Render score analysis details if evaluated */}
                            {isDone && resData && (
                              <div className="mt-3 pt-3 border-t border-slate-950 font-mono text-[11px] text-slate-400 space-y-2">
                                <p className="text-slate-300 italic">"Your answer: {resData.answer}"</p>
                                <div className="p-3 bg-slate-950 border border-slate-800/40 rounded-lg text-slate-400 font-mono text-[10px]">
                                  <span className="text-emerald-400 font-black">AI VIVA EVALUATION CRITIQUE:</span> {resData.feedback}
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-1">
                                  <span>Accuracy Score: <strong className="text-slate-300">{resData.accuracy}%</strong></span>
                                  <span>Design Confidence: <strong className="text-slate-300">{resData.confidence}%</strong></span>
                                  <span>Technical Understanding: <strong className="text-slate-300">{resData.understanding}%</strong></span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="recruiter-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono"
          >
            {/* Candidates Selection Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
                <div className="mb-4">
                  <h3 className="text-slate-100 font-bold font-sans text-sm flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-400" />
                    Student Candidates
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-1">Select verified code defenses to inspect metrics.</p>
                </div>

                <div className="space-y-3">
                  {candidates.map((cand) => {
                    const isSelected = cand.id === selectedCandidateId;
                    
                    // Determine visual status badge colors representing index rules 
                    let score = cand.authenticityScore || 0;
                    let ptagVal = 'Needs Review';
                    if (score >= 75) ptagVal = 'Verified Project';

                    return (
                      <button
                        key={cand.id}
                        id={`candidate-row-${cand.id}`}
                        onClick={() => setSelectedCandidateId(cand.id)}
                        className={`w-full text-left p-3.5 border rounded-xl transition-all cursor-pointer flex gap-3 ${
                          isSelected 
                            ? 'bg-slate-950 border-blue-500' 
                            : 'bg-slate-900/10 border-slate-800/80 hover:border-slate-800'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={cand.avatar}
                            alt={cand.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full bg-slate-800 object-cover shrink-0"
                          />
                          {ptagVal === 'Verified Project' && (
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 border border-slate-950 p-0.5 rounded-full">
                              <Check className="h-2.5 w-2.5 font-bold" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 overflow-hidden flex-1">
                          <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
                            <span className="truncate">{cand.name}</span>
                            <span className="text-[10px] text-blue-400 font-medium font-mono shrink-0">
                              {score > 0 ? `${score}%` : '---'}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate font-sans">
                            {cand.projectTitle}
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[9px] text-slate-500 select-none truncate">
                              {cand.technologies.split(',').slice(0, 3).join(', ')}
                            </span>
                            
                            <span className={`text-[8px] px-1.5 py-0.5 rounded-md uppercase font-bold tracking-tight ${
                              ptagVal === 'Verified Project'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-amber-500/10 text-amber-500'
                            }`}>
                              {ptagVal}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recruiter guidelines info box */}
              <div className="bg-slate-900/20 border border-slate-800/40 p-5 rounded-2xl text-[11px] leading-relaxed text-slate-400 space-y-2">
                <div className="text-slate-300 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Anti-Cheating Safeguards
                </div>
                <p>
                  We run commit graph analyzers and static token structures against common web boilerplates to prevent students from renaming basic template files. The interactive viva requires them to explain active code snippets in real-time.
                </p>
              </div>
            </div>

            {/* Candidate Report Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Report Header block */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800/80">
                  <div className="flex gap-4">
                    <img 
                      src={selectedCandidate.avatar} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-800 shrink-0" 
                    />
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-slate-100">{selectedCandidate.name}</h3>
                      <p className="text-slate-400 text-xs font-mono">{selectedCandidate.email}</p>
                      <div className="flex gap-2 text-[10px] text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1"><Github className="h-3.5 w-3.5" /> {selectedCandidate.githubUrl.replace('https://github.com/', '')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-950 p-4 border border-slate-800 rounded-2xl w-full md:w-auto shrink-0">
                    <div className="text-center md:text-right">
                      <div className="text-[9px] text-slate-400 uppercase">Authenticity Score</div>
                      <div className={`text-2xl font-black font-mono tracking-tight ${
                        (selectedCandidate.authenticityScore || 0) >= 75 ? 'text-emerald-400' : 'text-amber-500'
                      }`}>
                        {selectedCandidate.authenticityScore > 0 ? `${selectedCandidate.authenticityScore}%` : 'PENDING'}
                      </div>
                    </div>

                    <div className="h-8 w-px bg-slate-800"></div>

                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Final Status</div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mt-1 ${
                        (selectedCandidate.authenticityScore || 0) >= 75 ? 'text-emerald-400' : 'text-amber-500'
                      }`}>
                        {(selectedCandidate.authenticityScore || 0) >= 75 ? 'Verified Project' : 'Needs Review'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Submitted Description</span>
                    <p className="text-slate-300 leading-relaxed font-sans">{selectedCandidate.description}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Technologies Mapped</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedCandidate.technologies.split(',').map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-950 border border-slate-800 text-slate-300 text-[10px] rounded-lg">
                          #{t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Verification Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Git timeline activity */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-4 backdrop-blur-md">
                  <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-cyan-400" />
                    Commit Frequency
                  </h4>

                  <div className="bg-slate-950 p-3.5 border border-slate-800 rounded-xl text-center space-y-1">
                    <div className="text-[9px] text-slate-500 uppercase">Activity Score</div>
                    <div className="text-xl font-black text-cyan-400">{selectedCandidate.report?.githubAnalysis.activityScore}%</div>
                  </div>

                  <div className="space-y-2 font-sans text-slate-400">
                    <div className="flex justify-between text-[11px]">
                      <span>Total commits</span>
                      <strong className="text-slate-200 font-mono">{selectedCandidate.report?.githubAnalysis.commits}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Lifespan days</span>
                      <strong className="text-slate-200 font-mono">{selectedCandidate.report?.githubAnalysis.durationDays} Days</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Contributors</span>
                      <strong className="text-slate-200 font-mono">{selectedCandidate.report?.githubAnalysis.contributors}</strong>
                    </div>
                  </div>
                </div>

                {/* Static Framework parsing details */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-4 backdrop-blur-md">
                  <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                    <Terminal className="h-4 w-4 text-purple-400" />
                    Project Architecture
                  </h4>

                  <div className="bg-slate-950 p-3.5 border border-slate-800 rounded-xl text-center space-y-1">
                    <div className="text-[9px] text-slate-500 uppercase">Quality Score</div>
                    <div className="text-xl font-black text-purple-400">{selectedCandidate.report?.qualityAnalysis.qualityScore}%</div>
                  </div>

                  <div className="space-y-2 text-slate-400">
                    <div className="flex justify-between text-[11px]">
                      <span>Frontend</span>
                      <strong className="text-slate-200">{selectedCandidate.report?.projectScanner.frontend}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Backend</span>
                      <strong className="text-slate-200">{selectedCandidate.report?.projectScanner.backend}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Database</span>
                      <strong className="text-slate-200 truncate max-w-[80px] block text-right">{selectedCandidate.report?.projectScanner.database}</strong>
                    </div>
                  </div>
                </div>

                {/* Interactive Defense Viva score */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-4 backdrop-blur-md">
                  <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                    <Brain className="h-4 w-4 text-emerald-400" />
                    Viva Defense Score
                  </h4>

                  <div className="bg-slate-950 p-3.5 border border-slate-800 rounded-xl text-center space-y-1 font-mono">
                    <div className="text-[9px] text-slate-500 uppercase">Defence Viva Accuracy</div>
                    <div className="text-xl font-black text-emerald-400">
                      {selectedCandidate.id === 'student-submitted' 
                        ? (computedVivaScore > 0 ? `${computedVivaScore}%` : 'PENDING DEFENCE')
                        : `${selectedCandidate.vivaScore}%`
                      }
                    </div>
                  </div>

                  <div className="space-y-2 font-sans text-slate-400 text-[11px]">
                    <div className="flex justify-between">
                      <span>Questions Met</span>
                      <span className="font-mono text-slate-200">
                        {selectedCandidate.id === 'student-submitted' ? completedVivaCount : 3} / 3
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 italic mt-1 font-sans">
                      Students answer targeted code layout, state, and dependency scenarios.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 7: AI Hiring Recommendation */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center text-slate-100 border-b border-slate-800/80 pb-3">
                  <h4 className="text-sm font-bold font-sans flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Step 7: AI Hiring Verification Recommendation
                  </h4>
                  <span className="bg-amber-400/10 text-amber-400 font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                    Role Match: {selectedCandidate.report?.hiringRecommendation.recommendedRole}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                      <Check className="h-4 w-4" />
                      Candidate Core Coding Strengths
                    </div>
                    <ul className="space-y-1.5 font-sans text-slate-400 text-xs">
                      {selectedCandidate.report?.hiringRecommendation.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">✔</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-amber-500 font-bold uppercase tracking-wider text-[10px]">
                      <AlertTriangle className="h-4 w-4" />
                      Vulnerabilities & Weakness Vectors
                    </div>
                    <ul className="space-y-1.5 font-sans text-slate-400 text-xs text-slate-400">
                      {selectedCandidate.report?.hiringRecommendation.weaknesses.map((weak, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">⚠</span>
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
