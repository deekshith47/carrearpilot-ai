import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Navigation,
  Compass,
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
  Briefcase,
  Upload,
  Sparkles,
  GitBranch,
  Shield,
  Search,
  BookOpen,
  Check,
  Award,
  Plus,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Code2,
  ChevronRight,
  User,
  ExternalLink,
  Info,
  Terminal,
  Volume2,
  ListRestart
} from 'lucide-react';

interface StudentData {
  resumeName: string;
  githubUsername: string;
  skills: string[];
  certifications: string[];
  projects: string[];
  hasInterviewPractice: boolean;
  hasCodingAssessment: boolean;
}

const TARGET_COMPANIES = [
  { id: 'Google', name: 'Google', minRequirement: 85, color: 'text-blue-400', logoColor: 'bg-blue-500/10' },
  { id: 'Amazon', name: 'Amazon', minRequirement: 80, color: 'text-orange-400', logoColor: 'bg-orange-500/10' },
  { id: 'Microsoft', name: 'Microsoft', minRequirement: 82, color: 'text-cyan-400', logoColor: 'bg-cyan-500/10' },
  { id: 'Infosys', name: 'Infosys', minRequirement: 65, color: 'text-indigo-400', logoColor: 'bg-indigo-500/10' },
  { id: 'TCS', name: 'TCS', minRequirement: 60, color: 'text-emerald-400', logoColor: 'bg-emerald-500/10' },
  { id: 'Wipro', name: 'Wipro', minRequirement: 62, color: 'text-violet-400', logoColor: 'bg-violet-500/10' },
];

const TARGET_ROLES = [
  { 
    id: 'Software Engineer', 
    name: 'Software Engineer', 
    coreSkills: ['React', 'Java', 'SQL', 'System Design', 'Advanced DSA'], 
    placeholderCert: 'AWS Certified Developer',
    codingChallenge: {
      title: 'Valid Anagram Checker',
      desc: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
      starterCode: `function isAnagram(s: string, t: string): boolean {\n  // Implement logic here\n  \n}`,
      testCases: [
        { input: 's = "anagram", t = "nagaram"', expected: 'true' },
        { input: 's = "rat", t = "car"', expected: 'false' }
      ]
    },
    interviewQuestion: 'An engineering team wants to handle spontaneous waves of 150k read events/sec. Explain your architecture strategy to prevent DB bottlenecks.'
  },
  { 
    id: 'AI Engineer', 
    name: 'AI Engineer', 
    coreSkills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'Prompt Engineering'], 
    placeholderCert: 'TensorFlow Developer Certificate',
    codingChallenge: {
      title: 'Softmax Classifier Function',
      desc: 'Given a list of numeric logits, calculate the array of standard softmax probabilities.',
      starterCode: `function softmax(logits: number[]): number[] {\n  // Implement probabilities computation\n  \n}`,
      testCases: [
        { input: 'logits = [1, 2, 3]', expected: '[0.0900, 0.2447, 0.6652]' },
        { input: 'logits = [0, 0]', expected: '[0.5000, 0.5000]' }
      ]
    },
    interviewQuestion: 'How would you mitigate catastrophic forgetting while fine-tuning a 7B parameter LLM on a highly specialized corporate legal dataset?'
  },
  { 
    id: 'Data Scientist', 
    name: 'Data Scientist', 
    coreSkills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'Data Visualization'], 
    placeholderCert: 'Google Advanced Data Analytics',
    codingChallenge: {
      title: 'Calculate Class Precision Metric',
      desc: 'Determine output precision ratio based on counts of True Positives (TP) and False Positives (FP).',
      starterCode: `function getPrecision(tp: number, fp: number): number {\n  // Implement precision computation\n  \n}`,
      testCases: [
        { input: 'tp = 80, fp = 20', expected: '0.8' },
        { input: 'tp = 0, fp = 10', expected: '0.0' }
      ]
    },
    interviewQuestion: 'Describe how you handle highly skewed transactional dataset partitions containing only 0.05% positive labels to avoid model bias.'
  },
  { 
    id: 'Frontend Developer', 
    name: 'Frontend Developer', 
    coreSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Web Performance'], 
    placeholderCert: 'Meta Front-End Developer',
    codingChallenge: {
      title: 'Class Merger Utility',
      desc: 'Write a utility that joins strings, filtering out boolean evaluation values dynamically.',
      starterCode: `function cn(...classes: any[]): string {\n  // Implement Tailwind join logic\n  \n}`,
      testCases: [
        { input: 'classes = ["p-4", false, "bg-red"]', expected: '"p-4 bg-red"' },
        { input: 'classes = ["flex", true && "hidden"]', expected: '"flex hidden"' }
      ]
    },
    interviewQuestion: 'Explain how you would measure, report, and systematically optimize a media-heavy portal dashboard to achieve >90 Lighthouse Core Web Vitals.'
  },
  { 
    id: 'Backend Developer', 
    name: 'Backend Developer', 
    coreSkills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'RESTful APIs'], 
    placeholderCert: 'AWS Cloud Solutions Architect',
    codingChallenge: {
      title: 'Simple Token Rate Limiter',
      desc: 'Determine whether a client IP containing custom request timestamps is allowed under a threshold of 3 requests.',
      starterCode: `function isThrottled(timestamps: number[], threshold: number): boolean {\n  // Implement throttling indicator\n  \n}`,
      testCases: [
        { input: 'timestamps = [1000, 1005, 1010], threshold = 3', expected: 'true' },
        { input: 'timestamps = [1000], threshold = 3', expected: 'false' }
      ]
    },
    interviewQuestion: 'How do you guarantee strict message ordering and ensure zero-duplicates delivery across distributed microservice queues during surges?'
  },
];

export default function CareerGPS() {
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [selectedRole, setSelectedRole] = useState('Software Engineer');

  // Input states
  const [resumeText, setResumeText] = useState('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [githubInput, setGithubInput] = useState('');
  const [githubProfile, setGithubProfile] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [certInput, setCertInput] = useState('');

  // Interactive popup modals
  const [activeDrillModal, setActiveDrillModal] = useState(false);
  const [activeInterviewModal, setActiveInterviewModal] = useState(false);

  // Drill workspace states
  const [userCode, setUserCode] = useState('');
  const [isRunningDrillTests, setIsRunningDrillTests] = useState(false);
  const [drillOutput, setDrillOutput] = useState<string[]>([]);
  const [drillSuccess, setDrillSuccess] = useState(false);

  // Interview simulator states
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluatingInterview, setIsEvaluatingInterview] = useState(false);
  const [interviewResult, setInterviewResult] = useState<{
    clarityScore: number;
    fillerWords: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    feedback: string;
  } | null>(null);
  const [isRecordingSim, setIsRecordingSim] = useState(false);

  // Student metrics state
  const [student, setStudent] = useState<StudentData>({
    resumeName: '',
    githubUsername: '',
    skills: ['React', 'Java', 'SQL'],
    certifications: ['Oracle Java Certified'],
    projects: ['Basic Portfolio Website'],
    hasInterviewPractice: false,
    hasCodingAssessment: false,
  });

  const [logs, setLogs] = useState<string[]>([
    'GPS guidance engine initialized.',
    'Ready for calibration inputs and ATS checkins.'
  ]);

  const [toast, setToast] = useState<string | null>(null);

  const triggerNotification = (text: string) => {
    setToast(text);
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${text}`, ...prev.slice(0, 15)]);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const activeRoleConfig = TARGET_ROLES.find(r => r.id === selectedRole) || TARGET_ROLES[0];

  // Set initial starter code when role changes
  useEffect(() => {
    setUserCode(activeRoleConfig.codingChallenge.starterCode);
    setDrillSuccess(false);
    setDrillOutput([]);
    setInterviewResult(null);
    setUserAnswer('');
  }, [selectedRole]);

  // Comprehensive calculation formula
  const calculateMetrics = () => {
    let resumeStrength = 40;
    if (student.resumeName) resumeStrength += 25;
    resumeStrength += Math.min(15, student.certifications.length * 5);
    resumeStrength += Math.min(20, student.projects.length * 5);

    let codingAbility = 40;
    const pathMatchSkillsCount = student.skills.filter(s => activeRoleConfig.coreSkills.includes(s)).length;
    codingAbility += pathMatchSkillsCount * 6;
    if (student.hasCodingAssessment) codingAbility += 30;

    let githubScore = 40;
    if (student.githubUsername) githubScore += 30;
    githubScore += Math.min(30, student.projects.length * 10);

    let interviewReadiness = 40;
    if (student.hasInterviewPractice) interviewReadiness += 45;
    if (student.skills.includes('System Design') || student.skills.includes('LLMs') || student.skills.includes('SQL')) {
      interviewReadiness += 15;
    }

    // Cap boundaries
    resumeStrength = Math.min(100, resumeStrength);
    codingAbility = Math.min(100, codingAbility);
    githubScore = Math.min(100, githubScore);
    interviewReadiness = Math.min(100, interviewReadiness);

    const overallReadiness = Math.round((resumeStrength + codingAbility + githubScore + interviewReadiness) / 4);
    const distanceToGoal = Math.max(0, 100 - overallReadiness);

    let baseMonths = 6.0;
    if (overallReadiness > 50) {
      baseMonths = Math.max(0.5, 6.0 - ((overallReadiness - 50) * 0.11));
    } else {
      baseMonths = 6.0 + ((50 - overallReadiness) * 0.12);
    }

    const companyRequirements = TARGET_COMPANIES.find(c => c.id === selectedCompany)?.minRequirement || 75;
    const difficultyMultiplier = companyRequirements / 75;
    const finalEta = Math.round(baseMonths * difficultyMultiplier * 10) / 10;

    return {
      resumeStrength,
      codingAbility,
      githubScore,
      interviewReadiness,
      overallReadiness,
      distanceToGoal,
      finalEta,
      companyRequirements
    };
  };

  const {
    resumeStrength,
    codingAbility,
    githubScore,
    interviewReadiness,
    overallReadiness,
    distanceToGoal,
    finalEta,
    companyRequirements
  } = calculateMetrics();

  // Simulated live parser of text/skills
  const handleScanResumeText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setIsUploadingResume(true);
    setTimeout(() => {
      // Find what technical skills are mentioned in user's typed summary
      const lower = resumeText.toLowerCase();
      const detected: string[] = [];
      
      activeRoleConfig.coreSkills.forEach(skill => {
        if (lower.includes(skill.toLowerCase())) {
          detected.push(skill);
        }
      });

      const uniqueSkills = Array.from(new Set([...student.skills, ...detected]));
      setStudent(prev => ({
        ...prev,
        resumeName: `Custom_ATS_Profile_${Date.now().toString().slice(-4)}.pdf`,
        skills: uniqueSkills
      }));

      setIsUploadingResume(false);
      triggerNotification(`ATS Engine finished scanning. Found matching skills: ${detected.join(', ') || 'No core path keywords parsed'}. Matching levels matched!`);
    }, 1200);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    setStudent(prev => ({
      ...prev,
      projects: [...prev.projects, newProjectName.trim()]
    }));
    triggerNotification(`New project registered: "${newProjectName.trim()}". Recalculated index!`);
    setNewProjectName('');
  };

  const handleConnectGitHub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubInput.trim()) return;
    setStudent(prev => ({
      ...prev,
      githubUsername: githubInput.trim(),
    }));
    setGithubProfile(githubInput.trim());
    triggerNotification(`Linked GitHub handle: @${githubInput.trim()}. Analyzed latest repositories.`);
  };

  const handleAddSkill = (skill: string) => {
    if (!skill.trim() || student.skills.includes(skill.trim())) return;
    setStudent(prev => ({
      ...prev,
      skills: [...prev.skills, skill.trim()]
    }));
    triggerNotification(`Injected professional skill tag: "${skill.trim()}"`);
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    setStudent(prev => ({
      ...prev,
      certifications: [...prev.certifications, certInput.trim()]
    }));
    triggerNotification(`Secure certification added: "${certInput.trim()}"`);
    setCertInput('');
  };

  const resetGPS = () => {
    setStudent({
      resumeName: '',
      githubUsername: '',
      skills: ['React', 'Java', 'SQL'],
      certifications: ['Oracle Java Certified'],
      projects: ['Basic Portfolio Website'],
      hasInterviewPractice: false,
      hasCodingAssessment: false,
    });
    setGithubProfile(null);
    setGithubInput('');
    setResumeText('');
    setDrillSuccess(false);
    setInterviewResult(null);
    triggerNotification('GPS System coordinates recalibrated back to standard initial parameters.');
  };

  // Run mock coding drill tests live
  const executeCodeDrillTests = () => {
    setIsRunningDrillTests(true);
    setDrillOutput([`[${new Date().toLocaleTimeString()}] Running build pipeline...`]);

    setTimeout(() => {
      setDrillOutput(prev => [...prev, '[INFO] Compiling TypeScript definitions... Ready.']);
    }, 400);

    setTimeout(() => {
      setDrillOutput(prev => [
        ...prev,
        '[INFO] Executing Test Case #1...',
        `[SUCCESS] Test Case #1 Passed: input matching "${activeRoleConfig.codingChallenge.testCases[0].input}" properly outputted "${activeRoleConfig.codingChallenge.testCases[0].expected}"`
      ]);
    }, 1000);

    setTimeout(() => {
      setDrillOutput(prev => [
        ...prev,
        '[INFO] Executing Test Case #2 (Invariants and Boundaries Check)...',
        `[SUCCESS] Test Case #2 Passed: input matching "${activeRoleConfig.codingChallenge.testCases[1].input}" properly outputted "${activeRoleConfig.codingChallenge.testCases[1].expected}"`
      ]);
    }, 1600);

    setTimeout(() => {
      setDrillOutput(prev => [
        ...prev,
        ' ',
        '✅ COMPILE SUCCESS: All test metrics passed successfully!',
        'Time: 0.04s | Memory Allocated: 14.8MB',
        'Capability matched: Dynamic evaluation accuracy exceeds 95%!'
      ]);
      setIsRunningDrillTests(false);
      setDrillSuccess(true);
      setStudent(prev => ({ ...prev, hasCodingAssessment: true }));
      triggerNotification(`Completed algorithmic drill successfully! Skill indices updated (+8% overall readiness).`);
    }, 2200);
  };

  // Run mock speech evaluation live
  const submitSpeechDrillText = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluatingInterview(true);

    setTimeout(() => {
      const lower = userAnswer.toLowerCase();
      const matchCriteria = ['tier', 'cache', 'redis', 'buffer', 'scale', 'microservice', 'partition', 'index', 'queue', 'kafka', 'limit', 'cluster', 'database', 'load balancing'];
      const matched = matchCriteria.filter(term => lower.includes(term));
      const missing = matchCriteria.filter(term => !lower.includes(term)).slice(0, 3);
      
      const parsedFillerWords = (userAnswer.split('like').length - 1) + (userAnswer.split('so').length - 1) + (userAnswer.split('uh').length - 1);
      const randomScore = Math.min(100, Math.max(70, 75 + matched.length * 5 - parsedFillerWords * 2));

      setInterviewResult({
        clarityScore: randomScore,
        fillerWords: parsedFillerWords,
        matchedKeywords: matched.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
        missingKeywords: missing.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
        feedback: matched.length > 2 
          ? `Outstanding architectural response! You correctly addressed infrastructure issues by referencing key backend strategies like ${matched.slice(0, 3).join(', ')}. Keep up this rigorous depth.`
          : 'A reasonable beginning outline, but you need to detail specific high-capacity infrastructure. Consider adding caching layers, persistent queues, or horizontal replication frameworks into your architecture description.'
      });

      setIsEvaluatingInterview(false);
      setStudent(prev => ({ ...prev, hasInterviewPractice: true }));
      triggerNotification('Voice Interview Drill analyzed! Behavior scores calculated (+12% overall readiness).');
    }, 2000);
  };

  // Simulated Voice capture pulse
  const simulateVoiceRecordingInput = () => {
    setIsRecordingSim(true);
    triggerNotification('Live vocal capture initialized. Please dictate your response into your microphone...');
    
    setTimeout(() => {
      setUserAnswer(prev => prev + (prev.trim() ? ' ' : '') + 'I would address sudden heavy write spike metrics by employing a distributed message broker queue like Amazon SQS or Kafka to throttle transaction rates, coupled with an active high-performance caching layer like Redis keyspaces, before doing write operations into the clustered DB backend...');
      setIsRecordingSim(false);
      triggerNotification('Vocal speech capture completed. Transcript synched to terminal panel.');
    }, 3800);
  };

  // Determine Missing and Recommended Skills
  const currentSkills = student.skills;
  const missingSkills = activeRoleConfig.coreSkills.filter(sk => !currentSkills.some(cs => cs.toLowerCase() === sk.toLowerCase()));

  // Dynamic Checkpoint definitions
  const checkpoints = [
    { id: 1, title: 'Calibrate target and pathway', targetText: 'Role trajectory set', currentVal: selectedRole === 'Software Engineer' ? 100 : 100, completed: true },
    { id: 2, title: 'ATS Resume Parsing', targetText: 'Resume verified & parsed', currentVal: student.resumeName ? 100 : 0, completed: !!student.resumeName },
    { id: 3, title: 'GitHub Stream Synchronized', targetText: 'GitHub handle connected', currentVal: student.githubUsername ? 100 : 0, completed: !!student.githubUsername },
    { id: 4, title: 'Live Coding Algorithm drills', targetText: `Score >= 95% on path challenges`, currentVal: student.hasCodingAssessment ? 100 : 0, completed: student.hasCodingAssessment },
    { id: 5, title: 'AI Vocal Mock Interview prep', targetText: `Clarity assessment completed`, currentVal: student.hasInterviewPractice ? 100 : 0, completed: student.hasInterviewPractice },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 text-slate-100 px-4 md:px-0">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-slate-950/98 border border-cyan-500/40 text-slate-100 p-4.5 rounded-2xl shadow-[0_4px_30px_rgba(6,182,212,0.3)] max-w-sm flex items-start gap-3.5 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0 border border-cyan-400/20">
              <Compass size={15} className="animate-spin" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Recalculating Career Route</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">{toast}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-500 hover:text-slate-300 text-[10px] uppercase font-bold pl-2 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header Screen */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <Navigation className="text-cyan-400 animate-pulse rotate-45" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold px-2 py-0.5 rounded-md">
                  CareerPilot OS Core
                </span>
                <span className="text-xs text-emerald-400 font-bold animate-pulse flex items-center gap-1">
                  ● Navigation Active
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-100 tracking-tight">
                Career GPS <span className="text-cyan-400 font-medium font-sans">Live Navigation Engine</span>
              </h2>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 md:max-w-2xl leading-relaxed">
            Continuously guide students from their current skill coordinates to their target dream company. Recalculates in real-time as you upgrade credentials, polish code, or submit projects.
          </p>
        </div>

        {/* Global Reset Switch */}
        <button 
          onClick={resetGPS}
          className="px-3.5 py-1.5 border border-slate-800 text-slate-400 bg-slate-900/60 rounded-xl text-xs flex items-center gap-2 hover:border-slate-600 hover:text-white transition-all cursor-pointer shadow-sm font-medium"
        >
          <RotateCcw size={13} /> Clear Coordinates
        </button>
      </div>

      {/* -------------------- MAIN APP GRID -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Controls Panel */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-6">
          <div className="space-y-1 block border-b border-slate-800/85 pb-4">
            <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
              <Compass size={14} className="text-cyan-400 animate-pulse" />
              1. Calibration Hub
            </h3>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Define your final target career coordinates to align algorithms.
            </p>
          </div>

          {/* Standard Calibration form */}
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2 font-mono">
                Target Company Destination
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {TARGET_COMPANIES.map(comp => {
                  const isSel = selectedCompany === comp.id;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => {
                        setSelectedCompany(comp.id);
                        triggerNotification(`Rerouting coordinates to ${comp.name}. Standard benchmark score set to ${comp.minRequirement}% readiness.`);
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSel 
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 font-bold shadow-sm' 
                          : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="text-[11px] font-semibold truncate">{comp.name}</div>
                      <div className="text-[8px] font-mono text-slate-500">Req: {comp.minRequirement}%</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2 font-mono">
                Target Role Pathway
              </label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  triggerNotification(`Target role updated to ${e.target.value}. Required skill alignments updated!`);
                }}
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
              >
                {TARGET_ROLES.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800/85">
            <div className="space-y-0.5">
              <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                2. Live Credentials Hub
              </h3>
              <p className="text-[10px] text-slate-500">
                Incorporate achievements or assets to progress your coordinates.
              </p>
            </div>

            {/* Resume Upload Panel containing Text paste tool for live analysis */}
            <div className="space-y-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-850/80">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">ATS Resume Paste Parser</span>
                {student.resumeName ? (
                  <span className="text-[8px] uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                    Scanned
                  </span>
                ) : (
                  <span className="text-[8px] uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded font-bold">
                    Unlinked
                  </span>
                )}
              </div>

              {student.resumeName ? (
                <div className="text-[11px] text-slate-300 font-semibold bg-slate-900 p-2.5 rounded border border-slate-800/80 truncate flex items-center justify-between">
                  <span className="truncate flex items-center gap-1.5 text-slate-300 font-mono">
                    <CheckCircle2 size={13} className="text-cyan-400" />
                    {student.resumeName}
                  </span>
                  <button 
                    onClick={() => {
                      setStudent(prev => ({ ...prev, resumeName: '' }));
                      setResumeText('');
                      triggerNotification('Unlinked custom ATS profile representation.');
                    }}
                    className="text-[9px] hover:text-red-400 text-slate-500 cursor-pointer pl-1 font-mono uppercase font-black"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleScanResumeText} className="space-y-2">
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste technical resume text, summary description, or work experience bullet points to parse skills..."
                    className="w-full h-16 bg-slate-900 border border-slate-800 p-2 rounded-lg text-[10px] placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 text-slate-200 resize-none font-sans"
                  />
                  <button
                    type="submit"
                    disabled={isUploadingResume || !resumeText.trim()}
                    className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Upload size={12} />
                    {isUploadingResume ? 'Analyzing ATS Alignment...' : 'Parse ATS Resume text'}
                  </button>
                </form>
              )}
            </div>

            {/* GitHub Profiles Connection module */}
            <div className="space-y-2 p-3 rounded-xl bg-slate-950/70 border border-slate-850/80">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">GitHub Analytics Link</span>
                {student.githubUsername ? (
                  <span className="text-[8px] uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                    Connected
                  </span>
                ) : (
                  <span className="text-[8px] uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded font-bold">
                    Waiting
                  </span>
                )}
              </div>

              {student.githubUsername ? (
                <div className="text-[11px] text-slate-300 bg-slate-900 p-2 rounded border border-slate-800/80 truncate flex items-center justify-between font-mono">
                  <span className="text-cyan-400 font-bold">@{student.githubUsername}</span>
                  <button 
                    onClick={() => {
                      setStudent(prev => ({ ...prev, githubUsername: '' }));
                      setGithubProfile(null);
                      triggerNotification('GitHub analytics stream unlinked.');
                    }}
                    className="text-[9px] hover:text-red-400 text-slate-500 cursor-pointer uppercase font-black"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConnectGitHub} className="flex gap-2">
                  <input
                    type="text"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    placeholder="Your GitHub handle"
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 text-slate-200 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-lg text-[10px] uppercase font-mono tracking-wider cursor-pointer"
                  >
                    Sync
                  </button>
                </form>
              )}

              {student.githubUsername && (
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-850/60 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                  <div>Commits last year: <span className="text-cyan-400">432</span></div>
                  <div>Primary tag: <span className="text-orange-400">{activeRoleConfig.coreSkills[0]}</span></div>
                </div>
              )}
            </div>

            {/* Custom Project Registrar */}
            <div className="space-y-2 p-3 rounded-xl bg-slate-950/70 border border-slate-850/80">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Submit Project Milestones</span>
              <form onSubmit={handleAddProject} className="flex gap-2">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Distributed Database Engine"
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 text-slate-200"
                />
                <button
                  type="submit"
                  className="px-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold rounded-lg text-xs cursor-pointer"
                >
                  Add
                </button>
              </form>
              <div className="space-y-1.5 max-h-[110px] overflow-y-auto custom-scrollbar pt-1">
                {student.projects.map((proj, i) => (
                  <div key={i} className="text-[10px] text-slate-400 bg-slate-900/40 p-2 rounded border border-slate-800/40 flex items-center justify-between">
                    <span className="truncate flex items-center gap-1.5"><Briefcase size={11} className="text-cyan-400" /> {proj}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setStudent(prev => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }));
                        triggerNotification(`Removed project "${proj}" from coordinates index.`);
                      }}
                      className="text-slate-500 hover:text-red-400 font-black text-[9px] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Manual Certifications Linker */}
            <div className="space-y-2 p-3 rounded-xl bg-slate-950/70 border border-slate-850/80">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Secure Professional Credentials</span>
              <form onSubmit={handleAddCert} className="flex gap-2">
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g. Oracle Database Certified Associate"
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 text-slate-200"
                />
                <button
                  type="submit"
                  className="px-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold rounded-lg text-xs cursor-pointer"
                >
                  Log
                </button>
              </form>
              <div className="space-y-1.5 max-h-[80px] overflow-y-auto custom-scrollbar pt-1">
                {student.certifications.map((cert, i) => (
                  <div key={i} className="text-[10px] text-slate-400 bg-slate-900/40 p-1.5 rounded border border-slate-800/40 flex items-center justify-between">
                    <span className="truncate flex items-center gap-1"><Award size={11} className="text-yellow-400" /> {cert}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setStudent(prev => ({ ...prev, certifications: prev.certifications.filter((_, idx) => idx !== i) }));
                        triggerNotification(`Removed certification "${cert}" from checklist index.`);
                      }}
                      className="text-slate-500 hover:text-red-400 font-black text-[9px] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Hand: Main Visual Navigation stream */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Real-time Telemetry Stats Dashboard bar */}
          <div className="glass bg-gradient-to-r from-slate-900/60 to-cyan-950/10 border border-slate-800 rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl relative">
              <div className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                🎯 GPS Coordinate
              </div>
              <div className="text-xl font-black text-cyan-400 flex items-baseline gap-1">
                <span>{overallReadiness}%</span>
                <span className="text-[10px] text-slate-400 font-normal">Match</span>
              </div>
              <div className="text-[8px] text-slate-500 uppercase mt-1 font-mono">Overall Readiness</div>
            </div>

            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
              <div className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                🚦 Target Standard
              </div>
              <div className="text-xl font-black text-rose-450 flex items-baseline gap-1">
                <span>{companyRequirements}%</span>
                <span className="text-[10px] text-slate-400 font-normal">Bench</span>
              </div>
              <div className="text-[8px] text-slate-500 uppercase mt-1 font-mono">for {selectedCompany}</div>
            </div>

            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
              <div className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                ⚙️ Distance
              </div>
              <div className="text-xl font-black text-orange-400 flex items-baseline gap-1">
                <span>{distanceToGoal}%</span>
                <span className="text-[10px] text-slate-400 font-normal font-sans">to Go</span>
              </div>
              <div className="text-[8px] text-slate-500 uppercase mt-1 font-mono">Recalculating...</div>
            </div>

            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
              <div className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                ⏱️ Estimated ETA
              </div>
              <div className="text-xl font-black text-emerald-400">
                {finalEta} <span className="text-xs font-normal text-slate-400 font-sans">Months</span>
              </div>
              <div className="text-[8px] text-slate-500 uppercase mt-1 font-mono">At current rate</div>
            </div>

          </div>

          {/* -------------------- HIGH FIDELITY LEFT-ALIGNED TIMELINE -------------------- */}
          <div className="glass border border-slate-800 rounded-3xl p-5 md:p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Navigation timeline header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono flex items-center gap-2">
                  🛰️ REAL-TIME ROUTE GUIDELINE CHART
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Interactive checkpoints mapping your live pipeline from background coordinates to matching placement.
                </p>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                Destination: {selectedCompany} {selectedRole} Team
              </span>
            </div>

            {/* Modern, 100% Solid & Robust Vertical Timeline Layout */}
            <div className="space-y-0 relative">
              
              {/* Node 1: Target Calibration Coordinate (Always Completed) */}
              <div className="flex gap-4 md:gap-6 relative">
                {/* Vertical Connector Line Column */}
                <div className="flex flex-col items-center shrink-0 w-8 md:w-10">
                  <div className="w-7 h-7 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-xs font-mono font-black shadow-[0_0_8px_rgba(6,182,212,0.4)] z-10 select-none">
                    1
                  </div>
                  <div className="w-[3px] flex-grow bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-full my-1 z-0 shadow-[0_0_6px_rgba(6,182,212,0.2)]" />
                </div>
                {/* Card Content Column */}
                <div className="flex-1 pb-6 space-y-2">
                  <div className="bg-slate-950/40 hover:bg-slate-950/70 border border-slate-850 hover:border-slate-800 p-4 rounded-xl transition-all space-y-2">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <h5 className="text-xs font-bold text-cyan-400">Calibration Setpoint</h5>
                        <span className="text-[8px] uppercase tracking-wider bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded-md font-bold font-mono border border-cyan-500/20">Active</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Benchmark: {companyRequirements}% Match Target</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Aligned algorithms toward matching standard parameters for <span className="text-slate-200 font-semibold">{selectedRole}</span> at <span className="text-slate-200 font-semibold">{selectedCompany}</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Node 2: ATS Resume Checkpoint */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className="flex flex-col items-center shrink-0 w-8 md:w-10">
                  <div className={`w-7 h-7 rounded-full bg-slate-900 border-2 transition-all duration-500 flex items-center justify-center text-xs font-mono font-black z-10 select-none ${
                    student.resumeName 
                      ? 'border-emerald-400 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' 
                      : 'border-slate-700 text-slate-500'
                  }`}>
                    2
                  </div>
                  <div className={`w-[3px] flex-grow rounded-full my-1 z-0 ${
                    student.resumeName
                      ? 'bg-gradient-to-b from-cyan-500 to-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.2)]'
                      : 'bg-slate-800'
                  }`} />
                </div>
                <div className="flex-1 pb-6 space-y-2">
                  <div className={`border p-4 rounded-xl transition-all space-y-2 ${
                    student.resumeName 
                      ? 'bg-slate-950/40 border-emerald-500/15' 
                      : 'bg-slate-950/20 border-slate-850/80 hover:border-slate-800'
                  }`}>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <h5 className={`text-xs font-bold ${student.resumeName ? 'text-emerald-400' : 'text-slate-400'}`}>Assemble & Parse Core Coordinates</h5>
                        {student.resumeName ? (
                          <span className="text-[8px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md font-black font-mono">Parsed ✓</span>
                        ) : (
                          <span className="text-[8px] uppercase tracking-wider bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded-md font-mono border border-slate-800">Pending Input</span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Provide a parsed text profile overview. Injects missing credential indicators into matching telemetry.
                    </p>
                    
                    {!student.resumeName && (
                      <div className="pt-1.5">
                        <span className="text-[9px] text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 px-2 py-1 rounded block w-fit font-mono">
                          💡 Tip: Paste/scan resume text on the Left Dashboard panel to satisfy this node.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Node 3: GitHub Portfolio Stream */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className="flex flex-col items-center shrink-0 w-8 md:w-10">
                  <div className={`w-7 h-7 rounded-full bg-slate-900 border-2 transition-all duration-500 flex items-center justify-center text-xs font-mono font-black z-10 select-none ${
                    student.githubUsername 
                      ? 'border-emerald-400 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' 
                      : 'border-slate-700 text-slate-500'
                  }`}>
                    3
                  </div>
                  <div className={`w-[3px] flex-grow rounded-full my-1 z-0 ${
                    student.githubUsername
                      ? 'bg-gradient-to-b from-cyan-500 to-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.2)]'
                      : 'bg-slate-800'
                  }`} />
                </div>
                <div className="flex-1 pb-6 space-y-2">
                  <div className={`border p-4 rounded-xl transition-all space-y-2 ${
                    student.githubUsername 
                      ? 'bg-slate-950/40 border-emerald-500/15' 
                      : 'bg-slate-950/20 border-slate-850/80 hover:border-slate-800'
                  }`}>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <h5 className={`text-xs font-bold ${student.githubUsername ? 'text-emerald-400' : 'text-slate-400'}`}>Synchronize Active Portfolio Stream</h5>
                        {student.githubUsername ? (
                          <span className="text-[8px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md font-black font-mono">Connected ✓</span>
                        ) : (
                          <span className="text-[8px] uppercase tracking-wider bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded-md font-mono border border-slate-800">Requires Link</span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Sync active public profiles. Logs repository footprints, project counts, and active daily compile commits.
                    </p>
                    
                    {!student.githubUsername && (
                      <div className="pt-1.5">
                        <span className="text-[9px] text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 px-2 py-1 rounded block w-fit font-mono font-bold">
                          💡 Tip: Input a GitHub handle on the left to activate portfolio stream telemetry.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Node 4: Live Code drills (Coding Workspace simulator link) */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className="flex flex-col items-center shrink-0 w-8 md:w-10">
                  <div className={`w-7 h-7 rounded-full bg-slate-900 border-2 transition-all duration-500 flex items-center justify-center text-xs font-mono font-black z-10 select-none ${
                    student.hasCodingAssessment 
                      ? 'border-emerald-400 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' 
                      : 'border-slate-700 text-slate-500 animate-pulse'
                  }`}>
                    4
                  </div>
                  <div className={`w-[3px] flex-grow rounded-full my-1 z-0 ${
                    student.hasCodingAssessment
                      ? 'bg-gradient-to-b from-cyan-500 to-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.2)]'
                      : 'bg-slate-800'
                  }`} />
                </div>
                <div className="flex-1 pb-6 space-y-2">
                  <div className={`border p-4 rounded-xl transition-all space-y-2.5 ${
                    student.hasCodingAssessment 
                      ? 'bg-slate-950/40 border-emerald-500/15' 
                      : 'bg-slate-950/20 border-slate-850/80 hover:border-slate-800 shadow-[0_4px_24px_rgba(6,182,212,0.05)]'
                  }`}>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <h5 className={`text-xs font-bold ${student.hasCodingAssessment ? 'text-emerald-400' : 'text-slate-400'}`}>Live Coding Workspace Drill</h5>
                        {student.hasCodingAssessment ? (
                          <span className="text-[8px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md font-black font-mono">Passed 100% ✓</span>
                        ) : (
                          <span className="text-[8px] uppercase tracking-wider bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded-md font-bold font-mono border border-cyan-500/20 animate-pulse">Standard Challenge Active</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold">+8% Overall Match score</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Verify core problem-solving fluency under simulated stress. Solves algorithms of targeted stack framework.
                    </p>

                    <div className="pt-2 flex flex-col md:flex-row gap-3 items-start md:items-center">
                      <button
                        type="button"
                        onClick={() => setActiveDrillModal(true)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono font-black border transition-all cursor-pointer flex items-center gap-1.5 ${
                          student.hasCodingAssessment
                            ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-500/30 font-bold shadow-md shadow-cyan-500/10'
                        }`}
                      >
                        <Code2 size={12} />
                        {student.hasCodingAssessment ? 'Re-open workspace' : 'Launch Coding Workspace'}
                      </button>
                      <span className="text-[10px] text-slate-500 italic">
                        {student.hasCodingAssessment ? 'Verified: Valid Anagram Test-matrix cleared' : `Pending challenge: "${activeRoleConfig.codingChallenge.title}"`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node 5: AI Verbal interview drills (Mock Simulator link) */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className="flex flex-col items-center shrink-0 w-8 md:w-10">
                  <div className={`w-7 h-7 rounded-full bg-slate-900 border-2 transition-all duration-500 flex items-center justify-center text-xs font-mono font-black z-10 select-none ${
                    student.hasInterviewPractice 
                      ? 'border-emerald-400 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' 
                      : 'border-slate-700 text-slate-500 animate-pulse'
                  }`}>
                    5
                  </div>
                  <div className={`w-[3px] flex-grow rounded-full my-1 z-0 ${
                    student.hasInterviewPractice
                      ? 'bg-gradient-to-b from-cyan-500 to-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.2)]'
                      : 'bg-slate-800'
                  }`} />
                </div>
                <div className="flex-1 pb-6 space-y-2">
                  <div className={`border p-4 rounded-xl transition-all space-y-2.5 ${
                    student.hasInterviewPractice 
                      ? 'bg-slate-950/40 border-emerald-500/15' 
                      : 'bg-slate-950/20 border-slate-850/80 hover:border-slate-800 shadow-[0_4px_24px_rgba(235,146,60,0.05)]'
                  }`}>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <h5 className={`text-xs font-bold ${student.hasInterviewPractice ? 'text-emerald-400' : 'text-slate-400'}`}>Interactive Verbal Architecture Interview</h5>
                        {student.hasInterviewPractice ? (
                          <span className="text-[8px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md font-black font-mono">Completed ✓</span>
                        ) : (
                          <span className="text-[8px] uppercase tracking-wider bg-orange-500/10 text-orange-450 px-1.5 py-0.5 rounded-md font-bold font-mono border border-orange-500/20 animate-pulse">Required checkin</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-orange-400 font-semibold">+12% Overall Match score</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Demonstrate semantic eloquence, technical keyword structure, and system topology knowledge visually.
                    </p>

                    <div className="pt-2 flex flex-col md:flex-row gap-3 items-start md:items-center">
                      <button
                        type="button"
                        onClick={() => setActiveInterviewModal(true)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono font-black border transition-all cursor-pointer flex items-center gap-1.5 ${
                          student.hasInterviewPractice
                            ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                            : 'bg-orange-500 hover:bg-orange-450 text-slate-950 border-orange-500/30 font-bold shadow-md shadow-orange-500/10'
                        }`}
                      >
                        <Volume2 size={12} />
                        {student.hasInterviewPractice ? 'practice again' : 'Practice Verbal Architecture'}
                      </button>
                      {interviewResult ? (
                        <span className="text-[10px] text-emerald-400 font-semibold font-mono">
                          Evaluated Score: {interviewResult.clarityScore}% Clarity
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">
                          Evaluate transcript response metrics live.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Node: Placement Release */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className="flex flex-col items-center shrink-0 w-8 md:w-10">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all duration-1000 z-10 ${
                    overallReadiness >= companyRequirements
                      ? 'bg-slate-900 border-orange-400 text-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.5)] animate-pulse'
                      : 'bg-slate-950 border-slate-800 text-slate-650'
                  }`}>
                    <Building2 size={13} />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className={`border p-4 rounded-xl transition-all space-y-2.5 ${
                    overallReadiness >= companyRequirements
                      ? 'bg-gradient-to-br from-slate-950/60 to-orange-950/10 border-orange-500/25 p-5'
                      : 'bg-slate-950/10 border-slate-850/80'
                  }`}>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <h5 className={`text-xs font-black ${overallReadiness >= companyRequirements ? 'text-orange-400 text-sm' : 'text-slate-500'}`}>
                        🎯 Onboard Placement Releases Gate
                      </h5>
                      {overallReadiness >= companyRequirements && (
                        <span className="text-[8px] uppercase tracking-wider bg-orange-500/15 text-orange-450 border border-orange-500/20 px-2 py-0.5 rounded font-black font-mono animate-bounce">
                          Release Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Reach required standard parameters to unlock direct referral generation, profile routing, and corporate onboarding logs.
                    </p>

                    {overallReadiness >= companyRequirements ? (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => triggerNotification('Referral request successfully generated & logged in global ledger!')}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black rounded-lg text-xs uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md hover:brightness-110 flex items-center gap-2"
                        >
                          <Sparkles size={13} /> Create Live Placement Referral
                        </button>
                      </div>
                    ) : (
                      <div className="text-[9.5px] text-slate-500 font-mono flex items-center gap-2">
                        <Info size={12} className="shrink-0 text-slate-650" />
                        Locked. Acquired readiness ({overallReadiness}%) must exceed company requirements ({companyRequirements}%).
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* CHECKPOINT TRACKER & SKILL GAP ANALYSIS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Checkpoint Tracker */}
            <div className="glass bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-4">
              <div className="space-y-0.5">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  🎯 ADMISSION MILESTONES
                </h4>
                <p className="text-[10px] text-slate-500">
                  Detailed progress trackers to achieve {selectedCompany} standard specifications.
                </p>
              </div>

              <div className="space-y-3.5">
                {checkpoints.map(cp => {
                  return (
                    <div 
                      key={cp.id} 
                      className={`p-3 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 ${
                        cp.completed 
                          ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-350' 
                          : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${cp.completed ? 'text-emerald-400' : 'text-slate-600'}`}>
                          {cp.completed ? (
                            <CheckCircle2 size={13} className="animate-pulse" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-700 flex items-center justify-center text-[8px] font-mono">
                              {cp.id}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className={`text-xs font-bold leading-tight ${cp.completed ? 'text-emerald-250 font-semibold' : 'text-slate-500'}`}>
                            {cp.title}
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 block leading-relaxed">{cp.targetText}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-mono font-bold block ${cp.completed ? 'text-emerald-400' : 'text-slate-600'}`}>
                          {cp.completed ? '100%' : '0%'}
                        </span>
                        <span className="text-[8px] font-mono text-slate-600 uppercase block">Ready</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live interactive Skill Gap Analysis */}
            <div className="glass bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-5">
              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    ⚡ SEGMENTED SKILL GAP CODES
                  </h4>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">
                    aligned to pathway
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Inspect matching alignments and tap missing nodes to study.
                </p>
              </div>

              {/* Skills columns */}
              <div className="space-y-3.5 text-xs">
                
                {/* Active skills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Synced Skills ({student.skills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {student.skills.map((sk, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-[9px] flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing skills */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Identified Gaps to Close ({missingSkills.length})
                  </span>
                  
                  {missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {missingSkills.map((sk, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddSkill(sk)}
                          className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/25 text-orange-400 font-mono text-[9px] flex items-center gap-1.5 hover:border-orange-400 hover:text-white transition-all cursor-pointer group"
                          title="Acquire standard stack credential"
                        >
                          <Plus size={10} className="text-orange-400 group-hover:scale-125 transition-all" />
                          {sk}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-mono italic block py-0.5">
                      ✓ Zero gaps. Skill aligns 100% with standard target pathway requirements!
                    </span>
                  )}
                </div>

                {/* Automation Recommendations card */}
                <div className="pt-2 border-t border-slate-800/60 space-y-2.5">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block flex items-center gap-1">
                    <Sparkles size={11} className="text-cyan-400 animate-bounce" />
                    Interactive Auto Suggestions
                  </span>
                  
                  <div className="space-y-2 text-[10px] text-slate-400">
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-850 space-y-1.5">
                      <div className="text-slate-300 font-bold uppercase tracking-wider text-[8.5px] text-cyan-400">Target Certification Suggestion</div>
                      <div className="flex justify-between items-center gap-2">
                        <span>{activeRoleConfig.placeholderCert}</span>
                        {!student.certifications.includes(activeRoleConfig.placeholderCert) ? (
                          <button
                            onClick={() => {
                              setStudent(prev => ({ ...prev, certifications: [...prev.certifications, activeRoleConfig.placeholderCert] }));
                              triggerNotification(`Acquired: ${activeRoleConfig.placeholderCert}. Checklist synched.`);
                            }}
                            className="px-2 py-0.5 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 rounded text-[9px] font-mono uppercase bg-cyan-950/20"
                          >
                            Claim cert
                          </button>
                        ) : (
                          <span className="text-[9px] text-emerald-400 font-mono">Claimed ✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* TELEMETRY ENGINE LOG RUNS */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-850 text-xs font-mono max-h-[140px] overflow-auto custom-scrollbar">
            <span className="text-[9.5px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping shrink-0" />
              🛰️ System GPS Log Streams
            </span>
            <div className="space-y-1 text-slate-500 leading-normal">
              {logs.map((log, i) => (
                <div key={i} className="line-clamp-1 truncate text-[9.5px]">{log}</div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* -------------------- INTERACTIVE MODALS -------------------- */}
      
      {/* 1. Algorithmic Coding Drill simulator Modal */}
      <AnimatePresence>
        {activeDrillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-cyan-400 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-black text-slate-100 uppercase tracking-wide">
                      Interactive Code Drill Workspace
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Solve the pathway challenge for {selectedRole} trajectory
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDrillModal(false)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer font-bold select-none p-1.5"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Workspace Body */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1 custom-scrollbar text-xs">
                
                {/* Problem Statement */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5">
                  <h4 className="text-cyan-400 font-bold font-mono text-[11px]">
                    Problem: {activeRoleConfig.codingChallenge.title}
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {activeRoleConfig.codingChallenge.desc}
                  </p>
                  <div className="pt-1.5 space-y-1 font-mono text-[10px] text-slate-450 border-t border-slate-900">
                    <div className="font-bold text-slate-400">Sample Test Cases:</div>
                    {activeRoleConfig.codingChallenge.testCases.map((tc, index) => (
                      <div key={index} className="flex gap-2.5">
                        <span className="text-cyan-500">Case #{index + 1}:</span>
                        <span>{tc.input} ⇒ <b className="text-slate-200">{tc.expected}</b></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code window panel */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase px-1">
                    <span>TypeScript Language sandbox</span>
                    <span className="text-cyan-400">ready</span>
                  </div>
                  <div className="relative font-mono rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-3">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-44 bg-transparent text-slate-200 text-[11px] font-mono focus:outline-none focus:ring-0 leading-normal resize-none"
                      style={{ tabSize: 2 }}
                    />
                  </div>
                </div>

                {/* Console Outputs */}
                {drillOutput.length > 0 && (
                  <div className="bg-slate-950 p-4.5 rounded-xl border border-slate-850 font-mono text-[10px] space-y-1 max-h-[150px] overflow-y-auto custom-scrollbar">
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex justify-between">
                      <span>Standard Output Console</span>
                      <span className="text-cyan-400">Logs active</span>
                    </div>
                    {drillOutput.map((l, idx) => (
                      <div key={idx} className={l.startsWith('[SUCCESS]') || l.startsWith('✅') ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                        {l}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Action Foots */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setUserCode(activeRoleConfig.codingChallenge.starterCode)}
                  className="px-3 py-1.5 border border-slate-850 hover:border-slate-700 rounded-lg text-slate-400 text-[10px] uppercase font-mono cursor-pointer flex items-center gap-1"
                >
                  <ListRestart size={12} /> Reset Template
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDrillModal(false)}
                    className="px-4 py-1.5 hover:bg-slate-850 text-slate-400 text-[10px] uppercase font-mono rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={executeCodeDrillTests}
                    disabled={isRunningDrillTests || drillSuccess}
                    className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 disabled:brightness-75 text-slate-950 font-black rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    {isRunningDrillTests ? 'Evaluating compilation...' : drillSuccess ? 'Tests Passed ✓' : 'Run Test Suites'}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. AI Verbal Mock Interview Simulator Modal */}
      <AnimatePresence>
        {activeInterviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center font-mono">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-orange-400 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-black text-slate-100 uppercase tracking-wide font-mono">
                      AI Verbal Architecture Interviewer
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Standard audio & semantic feedback loop for target companies
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveInterviewModal(false)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer select-none font-bold"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Body */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1 custom-scrollbar text-xs">
                
                {/* AI Prompter */}
                <div className="p-4 rounded-xl bg-orange-950/10 border border-orange-500/15 space-y-2 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 shrink-0">
                    <Compass size={14} className="animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] uppercase tracking-wider font-mono text-orange-400 font-bold">Interviewer Agent Query</div>
                    <p className="text-slate-200 text-[11px] leading-relaxed font-semibold">
                      "{activeRoleConfig.interviewQuestion}"
                    </p>
                  </div>
                </div>

                {/* Verbal Input transcript */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase px-1">
                    <span>Draft Verbal Transcription Panel</span>
                    {isRecordingSim ? (
                      <span className="text-red-400 animate-pulse flex items-center gap-1">● Recording Audio</span>
                    ) : (
                      <span>Synthesizer Ready</span>
                    )}
                  </div>

                  <div className="relative font-sans rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-3.5 space-y-3">
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your strategic infrastructure answer here, or tap the vocal simulation button to dictate answers cleanly..."
                      className="w-full h-24 bg-transparent text-slate-200 text-xs focus:outline-none focus:ring-0 leading-relaxed resize-none font-sans"
                    />

                    {/* Microphone Dictator toggle */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                      <button
                        type="button"
                        onClick={simulateVoiceRecordingInput}
                        disabled={isRecordingSim}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase font-mono tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                          isRecordingSim
                            ? 'bg-rose-500/10 border-rose-400 text-rose-400 animate-pulse'
                            : 'bg-slate-900 border-slate-850 hover:border-slate-750 text-slate-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isRecordingSim ? 'bg-red-400' : 'bg-slate-500'}`} />
                        {isRecordingSim ? 'Listening to voice stream...' : 'Simulate Voice Capture Dictation'}
                      </button>
                      <span className="text-[9px] text-slate-500 font-mono">Speech-to-Text translation engine</span>
                    </div>
                  </div>
                </div>

                {/* Score evaluation */}
                {interviewResult && (
                  <div className="bg-slate-950 p-4.5 rounded-xl border border-slate-850 space-y-3.5">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-mono">Linguistic Feedback Metrics</span>
                      <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded">
                        Evaluated Score: {interviewResult.clarityScore}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                      <div className="p-2 bg-slate-900/40 rounded border border-slate-850/60">
                        <div className="text-slate-500 font-bold uppercase tracking-wider text-[8px] mb-1">Filler Words Detected</div>
                        <div className="text-slate-300">{interviewResult.fillerWords} ('like' / 'so' count)</div>
                      </div>
                      <div className="p-2 bg-slate-900/40 rounded border border-slate-850/60 font-mono">
                        <div className="text-slate-500 font-bold uppercase tracking-wider text-[8px] mb-1">Linguistic Precision</div>
                        <div className="text-emerald-400">Excellent clarity analyzed</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[9.5px] font-mono text-slate-500 font-bold uppercase">Technological Keywords parsed</div>
                      <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                        {interviewResult.matchedKeywords.length > 0 ? (
                          interviewResult.matchedKeywords.map((tag, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/15">
                              ✓ {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500 italic">None matched</span>
                        )}
                      </div>
                    </div>

                    {interviewResult.missingKeywords.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[9.5px] font-mono text-slate-500 font-bold uppercase">Recommended engineering terms to enrich rating</div>
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                          {interviewResult.missingKeywords.map((tag, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-orange-500/5 text-orange-400 border border-orange-500/10">
                              + {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-[10.5px] text-slate-300 leading-relaxed font-sans p-2.5 rounded bg-slate-900/30 border border-slate-850/50">
                      "{interviewResult.feedback}"
                    </div>
                  </div>
                )}

              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setUserAnswer('');
                    setInterviewResult(null);
                  }}
                  className="px-3 py-1.5 border border-slate-850 text-slate-400 text-[10px] uppercase font-mono rounded-lg cursor-pointer"
                >
                  Clear answers
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInterviewModal(false)}
                  className="px-4 py-1.5 hover:bg-slate-850 text-slate-400 text-[10px] uppercase font-mono rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={submitSpeechDrillText}
                  disabled={isEvaluatingInterview || !userAnswer.trim()}
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 disabled:brightness-75 text-slate-950 font-black rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md"
                >
                  {isEvaluatingInterview ? 'Evaluating Transcript...' : 'Submit Verbal Answer'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
