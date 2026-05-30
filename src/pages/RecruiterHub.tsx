import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Search, 
  Mail, 
  Building, 
  Check, 
  Flame, 
  Cpu, 
  Layers, 
  Briefcase, 
  Sparkles, 
  Plus, 
  History, 
  Filter, 
  Compass, 
  Send,
  MapPin,
  Clock,
  ThumbsUp,
  X,
  RefreshCw,
  AlertCircle,
  Award,
  Trophy,
  TrendingUp,
  Sliders,
  LayoutDashboard,
  CheckCircle,
  GraduationCap,
  Star,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  FileText,
  Lock,
  Unlock,
  ShieldAlert,
  Zap,
  CheckCircle2,
  DollarSign,
  LineChart
} from 'lucide-react';

// =========================================================
// INTERFACES & MOCK DATA Definitions
// =========================================================

interface JobRequirement {
  id: string;
  title: string;
  companyName: string;
  requiredSkills: string[];
  minAts: number;
  minCoding: number;
  minInterview: number;
  experienceLevel: string;
  location: string;
  salaryRange: string;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  dept: string;
  skills: string[]; // verified skills
  skillVerification: Record<string, { source: 'Assessment' | 'Interview' | 'GitHub' | 'Project', date: string }>;
  atsScore: number;
  codingScore: number;
  githubScore: number;
  mockInterviewScore: number;
  readinessScore: number; // Placement readiness
  roadmap: { step: string; status: 'completed' | 'in-progress' | 'upcoming'; desc: string }[];
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
  placementStatus: 'Available' | 'Interviewing' | 'Placed';
}

interface ConnectionRequest {
  id: string;
  studentId: string;
  recruiterId: string;
  recruiterName: string;
  companyName: string;
  type: 'connection' | 'interview' | 'request';
  status: 'pending' | 'accepted' | 'declined';
  role?: string;
  date: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

// 1. Initial Mock Student Pool
const INITIAL_STUDENT_POOL: Student[] = [
  {
    id: 'student-1',
    name: 'Devon Lee',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    dept: 'Computer Science & Engineering',
    skills: ['React', 'TypeScript', 'SQL', 'Node.js', 'Git'],
    skillVerification: {
      'React': { source: 'Assessment', date: 'May 12, 2026' },
      'TypeScript': { source: 'GitHub', date: 'May 15, 2026' },
      'SQL': { source: 'Project', date: 'May 02, 2026' },
      'Node.js': { source: 'Interview', date: 'May 18, 2026' },
      'Git': { source: 'GitHub', date: 'May 14, 2026' }
    },
    atsScore: 88,
    codingScore: 78,
    githubScore: 85,
    mockInterviewScore: 82,
    readinessScore: 84,
    roadmap: [
      { step: 'Core Data Structures Mastery', status: 'completed', desc: 'Cover HashMaps, dynamic programming arrays, and recursive traversals.' },
      { step: 'Full-Stack Performance Calibration', status: 'completed', desc: 'Implement low-latency React query caching & backend batching workflows.' },
      { step: 'Recruiter Outreach Protocol Launch', status: 'in-progress', desc: 'Attain >80% Placement readiness to automatically publish verified CV and receive direct invites.' },
      { step: 'System Design Scaling Benchmark', status: 'upcoming', desc: 'Architect distributed caching schemas and global system redundancy structures.' }
    ],
    strengths: ['✔ React', '✔ Git', '✔ TypeScript'],
    weaknesses: ['✖ Cloud Computing', '✖ Java'],
    recommendation: 'Highly recommended for Frontend React or Full Stack Developer roles.',
    placementStatus: 'Available'
  },
  {
    id: 'student-2',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    dept: 'Electronics & Communication',
    skills: ['C++', 'React', 'TypeScript', 'SQL', 'RTOS', 'Rust'],
    skillVerification: {
      'C++': { source: 'Assessment', date: 'May 10, 2026' },
      'React': { source: 'Project', date: 'May 14, 2026' },
      'TypeScript': { source: 'Project', date: 'May 14, 2026' },
      'RTOS': { source: 'Assessment', date: 'April 28, 2026' },
      'Rust': { source: 'GitHub', date: 'May 20, 2026' }
    },
    atsScore: 92,
    codingScore: 94,
    githubScore: 89,
    mockInterviewScore: 91,
    readinessScore: 93,
    roadmap: [
      { step: 'Systems Programming Refinement', status: 'completed', desc: 'Secure asynchronous file locks & garbage collection routines in Rust.' },
      { step: 'RTOS Verification Challenge', status: 'completed', desc: 'Pass sub-millisecond priority thread preemption simulations.' },
      { step: 'Recruiter Match Engagements', status: 'in-progress', desc: 'Directly schedule face-to-face screenings with Stripe & Google.' }
    ],
    strengths: ['✔ DSA', '✔ React', '✔ Communication'],
    weaknesses: ['✖ Cloud Computing'],
    recommendation: 'Ideal fit for high-performance distributed engines or low-level Systems Engineer.',
    placementStatus: 'Interviewing'
  },
  {
    id: 'student-3',
    name: 'Nisha Gupta',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    dept: 'Computer Science',
    skills: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'Docker', 'SQL'],
    skillVerification: {
      'Go': { source: 'Assessment', date: 'May 08, 2026' },
      'gRPC': { source: 'Project', date: 'May 11, 2026' },
      'PostgreSQL': { source: 'Assessment', date: 'May 04, 2026' },
      'Redis': { source: 'Interview', date: 'May 19, 2026' },
      'Docker': { source: 'GitHub', date: 'May 15, 2026' }
    },
    atsScore: 85,
    codingScore: 88,
    githubScore: 82,
    mockInterviewScore: 85,
    readinessScore: 86,
    roadmap: [
      { step: 'Distributed Ledger & gRPC Tuning', status: 'completed', desc: 'Streamline multiplex TCP data flow over TLS interfaces.' },
      { step: 'Placement readiness Threshold', status: 'completed', desc: 'Bypassed 80% to unlocked premium direct headhunting.' },
      { step: 'Live Recruiter Chats', status: 'in-progress', desc: 'Active communication with Supabase and AWS AWS recruiters.' }
    ],
    strengths: ['✔ Go backend', '✔ Concurrency', '✔ PostgreSQL'],
    weaknesses: ['✖ CSS Layouts', '✖ Flutter'],
    recommendation: 'Strong candidate for scalable Back-End Services and Datastores Infrastructure.',
    placementStatus: 'Available'
  },
  {
    id: 'student-4',
    name: 'Rohan Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    dept: 'Information Technology',
    skills: ['Java', 'Spring Boot', 'SQL', 'Kafka', 'Kubernetes'],
    skillVerification: {
      'Java': { source: 'Assessment', date: 'May 01, 2026' },
      'Spring Boot': { source: 'Project', date: 'May 09, 2026' },
      'SQL': { source: 'Assessment', date: 'April 20, 2026' }
    },
    atsScore: 78,
    codingScore: 72,
    githubScore: 68,
    mockInterviewScore: 70,
    readinessScore: 74, // LOCKED (<= 80%)
    roadmap: [
      { step: 'OOP Architecture Foundations', status: 'completed', desc: 'Deep dive into abstract factories, microservices templates, and RESTful guidelines.' },
      { step: 'Kafka Distributed Event Streaming', status: 'in-progress', desc: 'Implement consumer-group parallel delivery & cluster setup.' },
      { step: 'Reach >80% Placement readiness to Unlock Recruiter Visibility', status: 'upcoming', desc: 'Incorporate GitHub score with more commits to unlock recruiter discovery.' }
    ],
    strengths: ['✔ Spring Boot', '✔ Java OO Design'],
    weaknesses: ['✖ React Animations', '✖ UI Polish'],
    recommendation: 'Targeting Enterprise Software Engineer roles, needs slightly higher algorithmic efficiency.',
    placementStatus: 'Available'
  },
  {
    id: 'student-5',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    dept: 'Mechanical Engineering',
    skills: ['Python', 'MATLAB', 'SolidWorks', 'Docker'],
    skillVerification: {
      'Python': { source: 'Assessment', date: 'May 04, 2026' },
      'MATLAB': { source: 'Project', date: 'May 01, 2026' }
    },
    atsScore: 54,
    codingScore: 45,
    githubScore: 48,
    mockInterviewScore: 58,
    readinessScore: 51, // LOCKED (<= 80%)
    roadmap: [
      { step: 'Software Engineering Transition Basics', status: 'in-progress', desc: 'Achieve stable Python automation scripts & general command line familiarity.' },
      { step: 'Data Structures and Algorithms 101', status: 'upcoming', desc: 'Master primitive arrays, linked lists, and basic search heuristics.' }
    ],
    strengths: ['✔ Mechanical Automation', '✔ Python scripts'],
    weaknesses: ['✖ Large Web Projects', '✖ TypeScript Component Design'],
    recommendation: 'Suited for industrial production controls or automated testing roles, visibility restricted.',
    placementStatus: 'Available'
  }
];

// Initial Job Requirements posted in Recruiter Database
const INITIAL_JOB_POSTINGS: JobRequirement[] = [
  {
    id: 'job-1',
    title: 'Software Engineer (Microservices)',
    companyName: 'Figma',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'SQL'],
    minAts: 80,
    minCoding: 75,
    minInterview: 75,
    experienceLevel: 'Entry-Level / Graduate',
    location: 'San Francisco, CA (Hybrid)',
    salaryRange: '$110,000 - $135,000'
  },
  {
    id: 'job-2',
    title: 'Senior React Framework Architect',
    companyName: 'Stripe',
    requiredSkills: ['React', 'TypeScript', 'Git'],
    minAts: 85,
    minCoding: 80,
    minInterview: 80,
    experienceLevel: 'Mid to Senior',
    location: 'Seattle, WA (Remote)',
    salaryRange: '$140,000 - $170,000'
  },
  {
    id: 'job-3',
    title: 'Backend Scalability Engineer',
    companyName: 'Supabase',
    requiredSkills: ['Go', 'PostgreSQL', 'Redis', 'SQL'],
    minAts: 80,
    minCoding: 85,
    minInterview: 80,
    experienceLevel: 'Junior-Mid',
    location: 'Singapore (Fully Remote)',
    salaryRange: '$90,000 - $120,000'
  }
];

// Initial Connection, Request & Interview Inbound/Outbound logs
const INITIAL_CONNECTION_REQUESTS: ConnectionRequest[] = [
  {
    id: 'req-1',
    studentId: 'student-1',
    recruiterId: 'recruiter-google',
    recruiterName: 'Sarah Jenkins',
    companyName: 'Google',
    type: 'connection',
    status: 'pending',
    date: 'May 28, 2026'
  },
  {
    id: 'req-2',
    studentId: 'student-1',
    recruiterId: 'recruiter-stripe',
    recruiterName: 'Devon Carter',
    companyName: 'Stripe',
    type: 'interview',
    status: 'pending',
    role: 'Senior React Architect Interview',
    date: 'May 29, 2026'
  },
  {
    id: 'req-3',
    studentId: 'student-3',
    recruiterId: 'recruiter-supabase',
    recruiterName: 'Tanya Peterson',
    companyName: 'Supabase',
    type: 'request',
    status: 'accepted',
    date: 'May 25, 2026'
  }
];

export default function RecruiterHub() {
  const { user } = useAuth();

  // Active Role switcher: Student / Recruiter / Admin
  const [activeRole, setActiveRole] = useState<'student' | 'recruiter' | 'admin'>(() => {
    if (user?.role === 'recruiter') return 'recruiter';
    if (user?.role === 'admin') return 'admin';
    return 'student';
  });

  // Keep responsive role switching synced
  useEffect(() => {
    if (user?.role) {
      setActiveRole(user.role);
    }
  }, [user]);

  // Premium Status Toggles (Required by Revenue Model)
  const [premiumRecruiter, setPremiumRecruiter] = useState<boolean>(() => {
    return localStorage.getItem('premium_recruiter') === 'true';
  });
  const [premiumStudent, setPremiumStudent] = useState<boolean>(() => {
    return localStorage.getItem('premium_student') === 'true';
  });

  const togglePremiumRecruiter = () => {
    const updated = !premiumRecruiter;
    setPremiumRecruiter(updated);
    localStorage.setItem('premium_recruiter', String(updated));
    showToast(`Premium Recruiter Plan ${updated ? 'Enabled' : 'Disabled'}!`);
  };

  const togglePremiumStudent = () => {
    const updated = !premiumStudent;
    setPremiumStudent(updated);
    localStorage.setItem('premium_student', String(updated));
    showToast(`Premium Student Plan ${updated ? 'Enabled' : 'Disabled'}!`);
  };

  // State persistent storage structures
  const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem('bridge_students');
    return stored ? JSON.parse(stored) : INITIAL_STUDENT_POOL;
  });

  const [jobs, setJobs] = useState<JobRequirement[]>(() => {
    const stored = localStorage.getItem('bridge_jobs');
    return stored ? JSON.parse(stored) : INITIAL_JOB_POSTINGS;
  });

  const [connections, setConnections] = useState<ConnectionRequest[]>(() => {
    const stored = localStorage.getItem('bridge_connections');
    return stored ? JSON.parse(stored) : INITIAL_CONNECTION_REQUESTS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('bridge_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('bridge_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('bridge_connections', JSON.stringify(connections));
  }, [connections]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // =========================================================
  // 1. RECRUITER PORTAL STATES
  // =========================================================
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newSkillsInput, setNewSkillsInput] = useState('');
  const [newMinAts, setNewMinAts] = useState<number>(80);
  const [newMinCoding, setNewMinCoding] = useState<number>(75);
  const [newMinInterview, setNewMinInterview] = useState<number>(75);
  const [newExp, setNewExp] = useState('Entry-Level / Graduate');
  const [newLoc, setNewLoc] = useState('San Francisco, CA (Hybrid)');
  const [newSalary, setNewSalary] = useState('$100,000 - $130,000');

  // Scanning animation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusLogs, setScanStatusLogs] = useState<string[]>([]);
  const [selectedJobIdForMatch, setSelectedJobIdForMatch] = useState<string>('job-1');
  const [selectedRecruiterCandidate, setSelectedRecruiterCandidate] = useState<string>('student-1');
  const [skillsSearchQuery, setSkillsSearchQuery] = useState('');

  // AI Talent Matcher Score Calculator
  const computeMatchScore = (student: Student, job: JobRequirement): number => {
    if (!job) return 0;
    
    // Calculate matched skills percentage
    const lowercaseRequired = job.requiredSkills.map(s => s.toLowerCase());
    const lowercaseStudentSkills = student.skills.map(s => s.toLowerCase());
    const matchedCount = lowercaseRequired.filter(s => lowercaseStudentSkills.includes(s)).length;
    const skillRatio = lowercaseRequired.length > 0 ? (matchedCount / lowercaseRequired.length) : 1;
    
    // Performance comparison scores
    const atsOffset = Math.max(0, student.atsScore - job.minAts + 10); // buffer of 10 points
    const codingOffset = Math.max(0, student.codingScore - job.minCoding + 10);
    const mockOffset = Math.max(0, student.mockInterviewScore - job.minInterview + 10);
    
    const performanceRatio = (
      Math.min(100, (student.atsScore / job.minAts) * 100) +
      Math.min(100, (student.codingScore / job.minCoding) * 100) +
      Math.min(100, (student.mockInterviewScore / job.minInterview) * 100)
    ) / 300;

    let baseMatch = Math.round((skillRatio * 0.55 + performanceRatio * 0.45) * 100);
    
    // Premium Student visibility boost (Priority Visibility)
    // Devon Lee gets a 5% boost if Premium is active
    if (student.id === 'student-1' && premiumStudent) {
      baseMatch = Math.min(100, baseMatch + 5);
    }

    return Math.max(10, Math.min(100, baseMatch));
  };

  // Get active job requirement
  const activeJobRequirement = useMemo(() => {
    return jobs.find(j => j.id === selectedJobIdForMatch) || jobs[0];
  }, [jobs, selectedJobIdForMatch]);

  // Handle posting new requirements
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle || !newCompanyName || !newSkillsInput) {
      showToast('Please provide all mandatory fields to post.');
      return;
    }

    const parsedSkills = newSkillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const newJob: JobRequirement = {
      id: `job-${Date.now()}`,
      title: newJobTitle,
      companyName: newCompanyName,
      requiredSkills: parsedSkills,
      minAts: Number(newMinAts) || 80,
      minCoding: Number(newMinCoding) || 75,
      minInterview: Number(newMinInterview) || 75,
      experienceLevel: newExp,
      location: newLoc,
      salaryRange: newSalary
    };

    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    setSelectedJobIdForMatch(newJob.id);

    // Initialise Match Engine Scan
    setScanStatusLogs([]);
    setIsScanning(true);
    setScanProgress(0);

    // Form resets
    setNewJobTitle('');
    setNewCompanyName('');
    setNewSkillsInput('');

    showToast(`Successfully published ${newJobTitle} job mandate.`);
  };

  // Increment scanner progress
  useEffect(() => {
    if (isScanning) {
      const logs = [
        "Initalizing AI Cosine Semantic Match Engine...",
        "Scanning CareerPilot verification node database...",
        "Comparing verified skills, ATS, and Coding benchmarks...",
        "Normalizing Mock verbal confidence vectors...",
        "Applying placement readiness visibility masks (>80%)...",
        "AI Candidate matching protocol complete."
      ];

      const interval = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + 10;
          const logIdx = Math.floor(next / 20);
          if (logs[logIdx] && !scanStatusLogs.includes(logs[logIdx])) {
            setScanStatusLogs(p => [...p, logs[logIdx]]);
          }
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsScanning(false);
              showToast("AI Talent Rank assessment finalized.");
            }, 500);
            return 100;
          }
          return next;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isScanning, scanStatusLogs]);

  // Sort candidates by match scores based on selected job requirement
  const rankedCandidates = useMemo(() => {
    if (!activeJobRequirement) return [];
    return [...students].map(student => ({
      student,
      matchPercentage: computeMatchScore(student, activeJobRequirement)
    })).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [students, activeJobRequirement, premiumStudent]);

  // Recruiter actions on student
  const handleRecruiterActionOnStudent = (studentId: string, actionName: 'connect' | 'invite' | 'shortlist') => {
    const studentObj = students.find(s => s.id === studentId);
    if (!studentObj) return;

    if (studentObj.readinessScore <= 80 && !premiumRecruiter) {
      showToast(`Permission Denied: student is locked (Readiness ${studentObj.readinessScore}% <= 80%). Upgrade to Premium Recruiter Plan!`);
      return;
    }

    if (actionName === 'connect') {
      // Check if connection already exists
      const exists = connections.find(c => c.studentId === studentId && c.type === 'connection');
      if (exists) {
        showToast(`Request already exists with status: ${exists.status}`);
        return;
      }
      const newConn: ConnectionRequest = {
        id: `conn-${Date.now()}`,
        studentId,
        recruiterId: 'recruiter-custom',
        recruiterName: 'Talent Sourcer',
        companyName: activeJobRequirement?.companyName || 'Lead Partner Group',
        type: 'connection',
        status: 'pending',
        date: 'Today'
      };
      setConnections(prev => [...prev, newConn]);
      showToast(`Sent connection request to ${studentObj.name}!`);
    } else if (actionName === 'invite') {
      const newConn: ConnectionRequest = {
        id: `conn-${Date.now()}`,
        studentId,
        recruiterId: 'recruiter-custom',
        recruiterName: 'Talent Sourcer',
        companyName: activeJobRequirement?.companyName || 'Lead Partner Group',
        type: 'interview',
        status: 'pending',
        role: activeJobRequirement?.title || 'Software Engineer',
        date: 'Today'
      };
      setConnections(prev => [...prev, newConn]);
      showToast(`Dispatched formal interview request to ${studentObj.name}!`);
    } else {
      showToast(`Added ${studentObj.name} into Shortlisted Candidates bracket.`);
    }
  };

  // Chat/Messaging System Simulation
  const [chatBoxInput, setChatBoxInput] = useState('');
  const [chatLogs, setChatLogs] = useState<Record<string, ChatMessage[]>>({
    'student-1': [
      { id: 'm1', senderId: 'recruiter-stripe', senderName: 'Devon Carter', text: 'Hi Devon! I loved your GitHub Analyzer telemetry statistics. Your TypeScript profile matches FIGMA microservice nodes perfectly.', timestamp: '10:14 AM' },
      { id: 'm2', senderId: 'student-1', senderName: 'Devon Lee', text: 'Hi Devon! Thank you, yes I worked on streamlining high-concurrency event handling in my React dashboard modules. Glad to connect!', timestamp: '10:30 AM' }
    ]
  });

  const sendChatMessage = (studentId: string) => {
    if (!chatBoxInput.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: activeRole === 'student' ? 'student-1' : 'recruiter-custom',
      senderName: activeRole === 'student' ? 'Devon Lee' : 'Talent Sourcer',
      text: chatBoxInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLogs(prev => {
      const current = prev[studentId] || [];
      return {
        ...prev,
        [studentId]: [...current, msg]
      };
    });
    setChatBoxInput('');

    // Trigger fake AI candidate reply to delight the user in real time
    setTimeout(() => {
      let responseText = "Thanks for matching. Let me review and coordinate with my placement advisors.";
      if (activeRole === 'recruiter') {
        responseText = `Hi! This is Devon. I would be absolutely thrilled to coordinate an interview session. Let me know what date works best.`;
      } else {
        responseText = `Awesome message. Our talent review division at Figma/Stripe is looking forward to scheduling our alignment chat soon.`;
      }
      setChatLogs(prev => {
        const current = prev[studentId] || [];
        return {
          ...prev,
          [studentId]: [...current, {
            id: `msg-reply-${Date.now()}`,
            senderId: activeRole === 'student' ? 'recruiter-system' : studentId,
            senderName: activeRole === 'student' ? 'AI Talent Agent' : 'Devon Lee',
            text: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]
        };
      });
    }, 1505);
  };

  // Determine active recruiter candidate profile object
  const activeRecruiterCandidateObj = useMemo(() => {
    return students.find(s => s.id === selectedRecruiterCandidate) || students[0];
  }, [students, selectedRecruiterCandidate]);

  // Skill verification details modal state
  const [clickedVerificationSkill, setClickedVerificationSkill] = useState<{name: string, source: string, date: string} | null>(null);

  // =========================================================
  // 2. STUDENT PORTAL PERSPECTIVE
  // =========================================================
  // Get student's details (Devon Lee)
  const studentDevonObj = useMemo(() => {
    return students.find(s => s.id === 'student-1') || students[0];
  }, [students]);

  // Recruiter requests pending for Devon
  const pendingRequestsForDevon = useMemo(() => {
    return connections.filter(c => c.studentId === 'student-1' && c.status === 'pending');
  }, [connections]);

  const handleAcceptRequest = (requestId: string) => {
    setConnections(prev => prev.map(c => c.id === requestId ? { ...c, status: 'accepted' } : c));
    const req = connections.find(c => c.id === requestId);
    showToast(`Accepted invitation and initiated direct bridge chat with ${req?.recruiterName || 'Recruiter'}`);
  };

  const handleDeclineRequest = (requestId: string) => {
    setConnections(prev => prev.map(c => c.id === requestId ? { ...c, status: 'declined' } : c));
    showToast('Invitation politely declined.');
  };

  // =========================================================
  // 3. ADMIN SUMMARY METRICS & AUDIT LOGS
  // =========================================================
  const totalIncomingPositions = jobs.length;
  const totalVerifiedEngineConnections = connections.length;
  const totalMatchedPlacementRate = Math.round((students.filter(s => s.placementStatus !== 'Available').length / students.length) * 100);

  // Admin dynamic updates
  const handleAdminClearAll = () => {
    localStorage.removeItem('bridge_students');
    localStorage.removeItem('bridge_jobs');
    localStorage.removeItem('bridge_connections');
    setStudents(INITIAL_STUDENT_POOL);
    setJobs(INITIAL_JOB_POSTINGS);
    setConnections(INITIAL_CONNECTION_REQUESTS);
    showToast("Environment databases restarted to pipeline benchmark states.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative pb-10 bg-white text-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-cyan-400 flex items-center gap-3"
          >
            <Sparkles size={16} className="text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold leading-normal">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern SaaS Grid header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-r from-blue-50 to-cyan-50/50 p-6 rounded-2xl border border-blue-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600 text-white rounded-xl shadow-sm">
              <Users size={20} />
            </span>
            <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">AI Skill-to-Recruiter Bridge</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1.5 max-w-xl">
             Bypassing conventional recruitment friction. CareerPilot matching protocols immediately index verified skills, ATS profiles, mock performance scorecards, and automatically unlock recruiter pipelines.
          </p>
        </div>

        {/* Demo switcher */}
        <div className="flex flex-col space-y-1.5 shrink-0 bg-white p-2.5 rounded-xl shadow-sm border border-slate-200 w-full lg:w-auto">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest text-center">
             DEMO PERSPECTIVE CONTROLLER
          </span>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-205">
            <button
              onClick={() => { setActiveRole('student'); showToast('Switched to Student Perspective (Devon Lee)'); }}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeRole === 'student' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              1. Student
            </button>
            <button
              onClick={() => { setActiveRole('recruiter'); showToast('Switched to Recruiter Hiring Deck'); }}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeRole === 'recruiter' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              2. Recruiter
            </button>
            <button
              onClick={() => { setActiveRole('admin'); showToast('Switched to Admin Analytics Console'); }}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeRole === 'admin' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              3. Admin
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          PERSPECTIVE SWITCHER COMPONENT ROUTING
          ========================================================= */}
      
      {/* ==========================================
          1. STUDENT PERSPECTIVE VIEW
          ========================================== */}
      {activeRole === 'student' && (
        <div className="space-y-6">
          
          {/* TOP BANNER METRICS FOR DEVON */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                <GraduationCap size={160} />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-200">
                Placement Readiness Status
              </span>
              <div className="text-4xl font-extrabold mt-2 flex items-baseline gap-1">
                {studentDevonObj.readinessScore}%
                <span className="text-xs font-medium text-slate-100">Ready</span>
              </div>
              <p className="text-[11px] text-slate-100 mt-2 font-sans">
                 Visibility unlocked to premium headhunters (Readiness exceeds &gt; 80% baseline).
              </p>
              {premiumStudent && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase flex items-center gap-1 shadow-sm">
                  <Zap size={10} className="fill-slate-950" /> Premium Visibility Active
                </span>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
                     ATS Profile Fit Score
                  </span>
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <FileText size={14} />
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">{studentDevonObj.atsScore} / 100</div>
              </div>
              <span className="text-[10px] text-slate-500 mt-3 font-sans block leading-normal pt-2 border-t border-slate-100">
                Analysis tracks resume formatting, standard structure keywords and metadata matches.
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
                     Coding Assessment Score
                  </span>
                  <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Cpu size={14} />
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">{studentDevonObj.codingScore}% / 100</div>
              </div>
              <span className="text-[10px] text-slate-500 mt-3 font-sans block leading-normal pt-2 border-t border-slate-100">
                Verified coding efficiency benchmarks across key framework and algorithms tasks.
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
                     Mock Interview Verbal Score
                  </span>
                  <span className="p-1.5 bg-cyan-50 text-cyan-600 rounded-lg">
                    <MessageSquare size={14} />
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">{studentDevonObj.mockInterviewScore}%</div>
              </div>
              <span className="text-[10px] text-slate-500 mt-3 font-sans block leading-normal pt-2 border-t border-slate-100">
                Evaluated alignment of technical vocabulary, spatial explanation, and confidence indices.
              </span>
            </div>

          </div>

          {/* TWO COLUMN WORKSPACE: Left roadmap & DNA, Right Recruiter Opportunities & bridge chats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left GPS & roadmap (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* CAREER GPS & SKILL DNA SECTION */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Compass size={16} className="text-blue-600" />
                    Student Skill DNA & Verification Footprints
                  </h3>
                  <span className="text-[10px] font-mono bg-cyan-55 bg-cyan-100/60 text-cyan-700 font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                     Career GPS Alignment Vector
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Skill DNA bubble grid */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Verified Skills Inventory</span>
                    <div className="grid grid-cols-1 gap-2">
                      {studentDevonObj.skills.map(skill => {
                         const verify = studentDevonObj.skillVerification[skill] || { source: 'Assessment', date: 'Recent' };
                         return (
                            <div 
                              key={skill}
                              onClick={() => setClickedVerificationSkill({ name: skill, source: verify.source, date: verify.date })}
                              className="p-2.5 rounded-xl border border-slate-150 hover:border-blue-300 hover:bg-blue-50/20 cursor-pointer transition-all flex justify-between items-center group text-xs text-slate-700"
                            >
                              <span className="font-semibold flex items-center gap-1">
                                <CheckCircle2 size={12} className="text-blue-500" />
                                {skill}
                              </span>
                              <span className="text-[9px] font-mono bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 px-2 py-0.5 rounded transition-colors uppercase font-bold tracking-wide">
                                Verified ✔ (By {verify.source})
                              </span>
                            </div>
                         );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      💡 Click any skill block to inspect authenticated platform verification footprints.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-100 space-y-3 text-xs">
                     <span className="font-bold text-blue-900 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                       <Sparkles size={12} className="text-blue-600" />
                       Placement Readiness Diagnosis
                     </span>
                     <div className="space-y-2">
                       <p className="text-slate-600">
                         <strong>Strengths:</strong> {studentDevonObj.strengths.join(', ')}
                       </p>
                       <p className="text-slate-600">
                         <strong>Minor Gaps:</strong> {studentDevonObj.weaknesses.join(', ')}
                       </p>
                       <p className="text-slate-600 leading-normal">
                         <strong>Next Recommendation:</strong> {studentDevonObj.recommendation}
                       </p>
                     </div>
                     <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Verified Artifacts Used:</span>
                        <div className="flex gap-2 flex-wrap mt-1">
                          <span className="text-[9px] font-mono text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">1. Codility API Logs</span>
                          <span className="text-[9px] font-mono text-purple-700 bg-purple-100/60 px-1.5 py-0.5 rounded">2. GitHub Webhook JSON</span>
                          <span className="text-[9px] font-mono text-amber-700 bg-amber-100/60 px-1.5 py-0.5 rounded">3. Speech Prosody Matrix</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC ROADMAP CHRONOLOGY */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <History size={16} className="text-blue-600 animate-pulse" />
                     Career GPS Dynamic AI Roadmap
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    Updated real-time
                  </span>
                </div>

                <div className="space-y-4 relative pl-3 border-l-2 border-slate-100 ml-2">
                  {studentDevonObj.roadmap.map((item, index) => (
                    <div key={index} className="relative space-y-1">
                      {/* circle node */}
                      <span className={`absolute -left-[19.5px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center shrink-0 ${
                        item.status === 'completed' ? 'border-emerald-500' :
                        item.status === 'in-progress' ? 'border-blue-500 animate-pulse' : 'border-slate-300'
                      }`}>
                        {item.status === 'completed' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        {item.status === 'in-progress' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />}
                      </span>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{item.step}</h4>
                        <span className={`text-[9px] uppercase font-black tracking-wide font-mono px-2 py-0.5 rounded-full ${
                          item.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                          item.status === 'in-progress' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PREMIUM STUDENT REVENUE SECTION */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-widest flex items-center gap-1">
                    <Zap size={14} className="fill-blue-600 text-blue-600" />
                    Premium Student Plan Subscription
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed max-w-lg">
                    Unlock advanced Career GPS path matrices, priority placement ranking search optimization (+5% matching factor bias), and custom interview timeline preparation tools.
                  </p>
                </div>
                <button
                  onClick={togglePremiumStudent}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-transform cursor-pointer ${
                    premiumStudent 
                      ? 'bg-slate-900 text-cyan-400 hover:bg-slate-800' 
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                  }`}
                >
                  {premiumStudent ? '★ Cancel Subscription' : '★ Activate Premium ($19/mo)'}
                </button>
              </div>

            </div>

            {/* Right Recruiter Opportunities (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* RECRUITER OPPORTUNITIES BANNER */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Briefcase size={16} className="text-blue-600" />
                    Additional: Recruiter Opportunities
                  </h3>
                  <p className="text-[11px] text-slate-500">Live matched opportunities looking for your Skill DNA footprint.</p>
                </div>

                {/* Sub-section 1: Interested Companies */}
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Companies matching your skills</span>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold tracking-tight text-xs">FI</span>
                        <div>
                          <h4 className="font-bold text-slate-800">Figma</h4>
                          <span className="text-[10px] text-slate-500">Figma Microservices Dev Mandate</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                        94% Match Score
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold tracking-tight text-xs">ST</span>
                        <div>
                          <h4 className="font-bold text-slate-800">Stripe</h4>
                          <span className="text-[10px] text-slate-500">React Core Compiler Mandate</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                        {premiumStudent ? '91%' : '86%'} Match Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-section 2: Connection & Interview invitations requests */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Recruiter requests & invites ({pendingRequestsForDevon.length})</span>
                  {pendingRequestsForDevon.length > 0 ? (
                    <div className="space-y-2.5">
                      {pendingRequestsForDevon.map(req => (
                        <div key={req.id} className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3 text-xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-blue-900">{req.recruiterName}</h4>
                                <span className={`text-[9px] uppercase font-bold px-2 rounded-full ${
                                  req.type === 'interview' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {req.type}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-600">{req.companyName} | sent {req.date}</p>
                              {req.role && <p className="text-[11px] text-slate-700 font-semibold mt-1">Role: {req.role}</p>}
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleDeclineRequest(req.id)}
                              className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 uppercase font-black text-[9px] cursor-pointer"
                            >
                              Politely Decline
                            </button>
                            <button
                              onClick={() => handleAcceptRequest(req.id)}
                              className="px-2.5 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 uppercase font-black text-[9px] cursor-pointer"
                            >
                              Accept & Unlock Discovery Chat
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No pending connection invitations in this session state.</p>
                  )}
                </div>

                {/* STUDENT-RECRUITER CHAT CONSOLE */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Direct Student-Recruiter Connection Chat</span>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 text-xs">
                    
                    {/* Compact messages thread */}
                    <div className="max-h-[160px] overflow-y-auto space-y-2.5 pr-1 font-sans">
                      {(chatLogs['student-1'] || []).map(msg => (
                        <div key={msg.id} className={`flex flex-col ${msg.senderId === 'student-1' ? 'items-end' : 'items-start'}`}>
                          <div className={`p-2 rounded-lg max-w-[85%] ${
                            msg.senderId === 'student-1' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-800'
                          }`}>
                            <p className="text-[10.5px] leading-normal">{msg.text}</p>
                          </div>
                          <span className="text-[8.5px] text-slate-400 mt-0.5 shrink-0 font-mono">{msg.senderName} • {msg.timestamp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sender tool box */}
                    <div className="flex gap-1.5 pt-2 border-t border-slate-200">
                      <input
                        type="text"
                        value={chatBoxInput}
                        onChange={(e) => setChatBoxInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') sendChatMessage('student-1'); }}
                        placeholder="Type direct response invitation text..."
                        className="flex-1 bg-white border border-slate-300 rounded-lg py-1 px-2.5 outline-none focus:border-blue-500 text-xs text-slate-800"
                      />
                      <button
                        onClick={() => sendChatMessage('student-1')}
                        className="p-1 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-bold transition-transform cursor-pointer"
                      >
                        <Send size={12} />
                      </button>
                    </div>

                  </div>
                </div>

              </div>

              {/* STUDENT ANALYTICS MODULE */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <span className="text-[10.5px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                  Student Placement Analytics
                </span>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                      <span>Recruiter Interest Growth</span>
                      <span className="text-emerald-600 font-bold font-mono">+12% this week</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '74%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                      <span>Skill Demand Trend matching React/TS</span>
                      <span className="text-blue-600 font-bold font-mono">92/100 Index</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div>
                     <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                       <span>Placement Readiness Growth</span>
                       <span className="text-emerald-600 font-bold font-mono">+8% (Post C++ verification)</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                     </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          2. RECRUITER PERSPECTIVE PORTAL
          ========================================== */}
      {activeRole === 'recruiter' && (
        <div className="space-y-6">
          
          {/* RECRUITER METRICS & UPGRADE CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Quick Metrics (8 cols) */}
            <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">ACTIVE POSTINGS</span>
                <div className="text-2xl font-black text-slate-900">{jobs.length} Requirements</div>
                <div className="text-[10px] text-slate-500">Scan parameters synced</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">TOTAL VERIFIED POOL</span>
                <div className="text-2xl font-black text-emerald-600">{students.length} Candidates</div>
                <div className="text-[10px] text-slate-500">Placement-ready index</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">AVG PLACEMENT RATING</span>
                <div className="text-2xl font-black text-blue-600">84 ATS Score</div>
                <div className="text-[10px] text-slate-500">Median code score</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">SUCCESS CONNECTIONS</span>
                <div className="text-2xl font-black text-purple-600">{connections.length} Direct Forged</div>
                <div className="text-[10px] text-slate-500">Interview pipeline speed</div>
              </div>
            </div>

            {/* Premium Recruiter Upgrader (4 cols) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-md">
              <div className="space-y-1 z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-200 font-bold">REVENUE ENGINE BLOCK</span>
                  <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase">PREMIUM DECK</span>
                </div>
                <h4 className="text-sm font-extrabold text-white mt-1">Premium Recruiter Plan</h4>
                <p className="text-[10px] text-slate-300 leading-normal">
                   Bypass visibility baseline restriction (inspect &lt; 80% readiness trainees), direct unlimited indexing search, and comprehensive ATS rank breakdowns.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between z-10">
                <span className="text-xs text-amber-300 font-bold">$149/mo active</span>
                <button
                  onClick={togglePremiumRecruiter}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-transform cursor-pointer ${
                    premiumRecruiter 
                      ? 'bg-slate-100 text-indigo-900 hover:bg-white' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  {premiumRecruiter ? '✦ Disable Premium' : '✦ Buy Premium'}
                </button>
              </div>
            </div>

          </div>

          {/* DUAL WORKSPACE: Left form & listings, Right Interactive matcher & ranked lists */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left sidebar recruiter setup (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* POST REQUIREMENT FORM */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
                  <Plus size={16} className="text-blue-600" />
                  1. Post Job Requirements Mandate
                </h3>

                <form onSubmit={handlePostJob} className="space-y-4 text-xs font-sans text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold mb-1">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={newJobTitle}
                        onChange={(e) => setNewJobTitle(e.target.value)}
                        placeholder="e.g. Software Engineer (Microservices)"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                        placeholder="e.g. Figma"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold mb-1">Required Skills * (Separated by commas)</label>
                    <input
                      type="text"
                      required
                      value={newSkillsInput}
                      onChange={(e) => setNewSkillsInput(e.target.value)}
                      placeholder="e.g. React, TypeScript, Node.js, SQL"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold mb-1">Min ATS Score *</label>
                      <input
                        type="number"
                        min="20"
                        max="100"
                        required
                        value={newMinAts}
                        onChange={(e) => setNewMinAts(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold mb-1">Min Coding *</label>
                      <input
                        type="number"
                        min="20"
                        max="100"
                        required
                        value={newMinCoding}
                        onChange={(e) => setNewMinCoding(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold mb-1">Min Verbal Int *</label>
                      <input
                        type="number"
                        min="20"
                        max="100"
                        required
                        value={newMinInterview}
                        onChange={(e) => setNewMinInterview(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold mb-1">Experience</label>
                      <select
                        value={newExp}
                        onChange={(e) => setNewExp(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1 text-xs outline-none focus:border-blue-600 cursor-pointer"
                      >
                        <option value="Entry-Level / Graduate">Entry-Level</option>
                        <option value="Junior-Mid">Junior-Mid</option>
                        <option value="Mid to Senior">Mid to Senior</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold mb-1">Location</label>
                      <input
                        type="text"
                        value={newLoc}
                        onChange={(e) => setNewLoc(e.target.value)}
                        placeholder="Hybrid / Remote"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1 text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold mb-1">Salary Range</label>
                      <input
                        type="text"
                        value={newSalary}
                        onChange={(e) => setNewSalary(e.target.value)}
                        placeholder="e.g. $100k - $120k"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-transform"
                  >
                     Publish Requirement & Index AI Match
                  </button>
                </form>
              </div>

              {/* ACTIVE REQUIREMENTS MANDATES */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Registered Job Mandates</span>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {jobs.map(j => {
                    const isSelected = j.id === selectedJobIdForMatch;
                    return (
                      <div
                        key={j.id}
                        onClick={() => setSelectedJobIdForMatch(j.id)}
                        className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                          isSelected 
                            ? 'bg-blue-50/55 border-blue-400 text-slate-900 shadow-sm' 
                            : 'bg-slate-50/40 border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-xs text-slate-800">{j.title}</h4>
                            <p className="text-[10px] text-slate-500">{j.companyName} | {j.location}</p>
                          </div>
                          <span className="text-[9px] font-mono select-none bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black uppercase">
                            {j.experienceLevel}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {j.requiredSkills.map(sk => (
                            <span key={sk} className="text-[9px] font-semibold bg-white border border-slate-220 text-slate-600 px-1.5 py-0.5 rounded">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right workspace interactive engine & list (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* AI TALENT MATCHING PROTOCOL OVERLAY TRIGGER CARD */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-905 border border-cyan-400/40 text-cyan-400 font-mono space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="animate-spin text-cyan-400 shrink-0" size={16} />
                        <span className="text-xs uppercase font-extrabold tracking-widest font-mono">
                          Live AI Talent Matching Engine Scan In Progress
                        </span>
                      </div>
                      <span className="text-sm font-black">{scanProgress}%</span>
                    </div>

                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                    </div>

                    <div className="space-y-1 text-[10px] text-slate-300 leading-normal border-t border-slate-800 pt-3">
                      {scanStatusLogs.map((logStr, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span>▸</span>
                          <span>{logStr}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CANDIDATE DISCOVERY LIST */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Trophy size={16} className="text-yellow-500" />
                       2. Ranked Candidates List for "{activeJobRequirement?.title}"
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Students ranked alphabetically and by algorithmic alignment vectors.
                    </p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2 text-slate-400 top-1/2 -translate-y-1/2" size={13} />
                    <input
                      type="text"
                      placeholder="Keyword skill search..."
                      value={skillsSearchQuery}
                      onChange={(e) => setSkillsSearchQuery(e.target.value)}
                      className="bg-slate-100 border border-slate-300 rounded-lg py-1 px-2.5 pl-7 text-xs text-slate-800 outline-none w-full sm:w-44"
                    />
                  </div>
                </div>

                {/* Candidate list cards */}
                <div className="space-y-3">
                  {rankedCandidates.filter(({ student }) => {
                    if (!skillsSearchQuery) return true;
                    return student.skills.some(s => s.toLowerCase().includes(skillsSearchQuery.toLowerCase())) ||
                           student.name.toLowerCase().includes(skillsSearchQuery.toLowerCase());
                  }).map(({ student, matchPercentage }) => {
                    const isSelected = selectedRecruiterCandidate === student.id;
                    const isLocked = student.readinessScore <= 80;

                    return (
                      <div
                        key={student.id}
                        onClick={() => setSelectedRecruiterCandidate(student.id)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-blue-50/20 border-blue-400 shadow-sm' 
                            : 'bg-slate-50/20 border-transparent hover:border-slate-200 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="relative">
                            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full border border-slate-200 object-cover" />
                            {isLocked && (
                              <span className="absolute -bottom-1 -right-1 p-1 bg-red-100 text-red-600 rounded-full border border-white" title="Locked">
                                <Lock size={10} />
                              </span>
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div>
                                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                  {student.name}
                                  {student.readinessScore > 80 && (
                                    <span className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full" title="Placement-ready verified">
                                      <ShieldCheck size={12} />
                                    </span>
                                  )}
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-normal">{student.dept}</p>
                              </div>
                              
                              <div className="text-right shrink-0">
                                <span className={`text-[12px] font-black ${
                                  matchPercentage >= 90 ? 'text-emerald-600' : 'text-blue-600'
                                }`}>
                                  {matchPercentage}% AI Match
                                </span>
                                <span className="text-[8px] font-mono uppercase text-slate-400 block font-bold leading-none mt-0.5">Matching Percentage</span>
                              </div>
                            </div>

                            {/* Scoring Parameters indicator */}
                            <div className="grid grid-cols-5 gap-1.5 text-[10px] text-slate-600 bg-slate-100/70 p-2 rounded-lg font-mono">
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase tracking-tight block">Readiness</span>
                                <span className="font-bold text-blue-600">{student.readinessScore}%</span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase tracking-tight block">ATS</span>
                                <span className="font-bold text-indigo-600">{student.atsScore}</span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase tracking-tight block">Coding</span>
                                <span className="font-bold text-emerald-600">{student.codingScore}</span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase tracking-tight block">Interview</span>
                                <span className="font-bold text-purple-600">{student.mockInterviewScore}</span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase tracking-tight block">GitHub</span>
                                <span className="font-bold text-slate-700">{student.githubScore}</span>
                              </div>
                            </div>

                            {/* Verified Skills badges */}
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {student.skills.map(sk => (
                                <span key={sk} className="text-[9px] font-mono bg-blue-100/50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                                  {sk} Verified
                                </span>
                              ))}
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CANDIDATE DEEP DOSSIER AND AI RECOMMENDATIONS */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">AI Recruiter Screening Recommendation card</span>
                
                {activeRecruiterCandidateObj ? (
                  <div className="space-y-4 text-xs font-sans text-slate-700">
                    
                    {/* Locked Candidate Protection Warning */}
                    {activeRecruiterCandidateObj.readinessScore <= 80 ? (
                      <div className="p-4 bg-red-50 border-2 border-dashed border-red-200 rounded-xl space-y-2.5">
                        <div className="flex gap-2 items-center text-red-700 font-black uppercase text-[10px] font-mono">
                          <Lock size={14} className="text-red-650" />
                          RECRUITER VISIBILITY LOCKED BY PLACEMENT PROTOCOL
                        </div>
                        <p className="text-[10.5px] leading-relaxed text-red-600">
                          This student has a placement readiness of <strong>{activeRecruiterCandidateObj.readinessScore}%</strong> which is below the mandatory target baseline of <strong>80%</strong>. Direct headhunting and profile access are restricted as they undergo training path.
                        </p>
                        <div className="pt-1.5 border-t border-red-200 flex justify-between items-center">
                          <span className="text-[9.5px] text-slate-650">Upgrade code/interview score checklist pending</span>
                          {premiumRecruiter ? (
                            <span className="text-[10px] font-mono bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black flex items-center gap-1">
                              <Unlock size={11} /> Bypassed (Active Premium Recruiter)
                            </span>
                          ) : (
                            <button
                              onClick={() => { setPremiumRecruiter(true); showToast('Unlocked restricted profiles!'); }}
                              className="text-[10px] font-mono text-red-600 font-bold hover:underline"
                            >
                              Bypass lockout with Premium Recruiter Plan ✔
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-5c bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1 text-xs">
                        <div className="flex items-center gap-1 text-emerald-700 font-black uppercase text-[10px] font-mono">
                          <ShieldCheck size={13} /> PLACEMENT READY VISIBILITY STATS
                        </div>
                        <p className="text-[10.5px] text-slate-600 leading-normal">
                          This profile is completely open. Unlocked direct recruiter coordinates, verified test artifacts, dynamic calendar slot matching, and chat integrations successfully.
                        </p>
                      </div>
                    )}

                    <div className={`${(activeRecruiterCandidateObj.readinessScore <= 80 && !premiumRecruiter) ? 'opacity-30 pointer-events-none select-none' : ''} space-y-4`}>
                      
                      {/* AI Hiring recommendation container */}
                      <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Screening Decision Block</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider">Verified Recommendation</span>
                        </div>
                        
                        <div className="space-y-2">
                           <p className="text-[11px] leading-relaxed">
                             <strong>Core Strengths:</strong> <span className="font-bold text-emerald-700">{activeRecruiterCandidateObj.strengths.join(', ')}</span>
                           </p>
                           <p className="text-[11px] leading-relaxed">
                             <strong>Key Weaknesses:</strong> <span className="font-bold text-slate-500">{activeRecruiterCandidateObj.weaknesses.join(', ')}</span>
                           </p>
                           <p className="text-[11.5px] leading-relaxed pt-1.5 border-t border-slate-200">
                             <strong>Match Analysis:</strong> {activeRecruiterCandidateObj.recommendation}
                           </p>
                        </div>
                      </div>

                      {/* Connection CTA Operations */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRecruiterActionOnStudent(activeRecruiterCandidateObj.id, 'connect')}
                            className="flex-1 py-2 border border-slate-300 hover:border-blue-400 bg-white text-slate-800 hover:text-blue-700 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Users size={12} /> Connect with Candidate
                          </button>
                          
                          <button
                            onClick={() => handleRecruiterActionOnStudent(activeRecruiterCandidateObj.id, 'invite')}
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-transform flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Mail size={12} /> Send Interview invitation
                          </button>
                        </div>
                        <button
                          onClick={() => handleRecruiterActionOnStudent(activeRecruiterCandidateObj.id, 'shortlist')}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Trophy size={11} className="text-yellow-400" /> Shortlist Candidate
                        </button>
                      </div>

                      {/* Active Recruiter Chats simulation box */}
                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono text-slate-400 uppercase font-black tracking-widest">Active Chat Messenger</span>
                          <span className="text-[9px] text-slate-500 font-mono">To: {activeRecruiterCandidateObj.name}</span>
                        </div>

                        {/* chat window */}
                        <div className="max-h-[140px] overflow-y-auto space-y-2.5 pr-1">
                          {(chatLogs[activeRecruiterCandidateObj.id] || []).map(msg => (
                            <div key={msg.id} className={`flex flex-col ${msg.senderId === 'recruiter-custom' ? 'items-end' : 'items-start'}`}>
                              <div className={`p-2 rounded-lg max-w-[85%] ${
                                msg.senderId === 'recruiter-custom' ? 'bg-indigo-650 bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-800'
                              }`}>
                                <p className="text-[10.5px] leading-normal">{msg.text}</p>
                              </div>
                              <span className="text-[8.5px] text-slate-400 mt-0.5 shrink-0 font-mono">{msg.senderName} • {msg.timestamp}</span>
                            </div>
                          ))}
                        </div>

                        {/* input box */}
                        <div className="flex gap-2 pt-2 border-t border-slate-200">
                          <input
                            type="text"
                            value={chatBoxInput}
                            onChange={(e) => setChatBoxInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') sendChatMessage(activeRecruiterCandidateObj.id); }}
                            placeholder="Draft recruiter direct outreach draft..."
                            className="flex-1 bg-white border border-slate-300 rounded-lg py-1 px-2.5 outline-none focus:border-blue-500 text-xs text-slate-850"
                          />
                          <button
                            onClick={() => sendChatMessage(activeRecruiterCandidateObj.id)}
                            className="p-1 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-transform cursor-pointer"
                          >
                            <Send size={12} />
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Select a candidate above to process deep AI scorecard evaluations.</p>
                )}

              </div>

              {/* RECRUITER ANALYTICS GRAPHS (Top Skills in Demand, Availability) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <span className="text-[10.5px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                  Interactive Recruiter Demand Analytics
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans text-slate-600">
                  <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-400">1. Top Skills In Demand</span>
                    <div className="space-y-1.5 font-bold">
                      <div className="flex justify-between items-center"><span>React / TS</span><span className="text-blue-600">95%</span></div>
                      <div className="flex justify-between items-center"><span>Python</span><span className="text-indigo-600">88%</span></div>
                      <div className="flex justify-between items-center"><span>Go Backend</span><span className="text-purple-600">82%</span></div>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-400">2. Hiring Trend Factors</span>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800">Generative Platform SaaS</span>
                      <p className="text-[9.5px] text-slate-400">Represents &gt; 40% of all outbound startup matches in silicon valley hubs.</p>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-400">3. Match Success Growth</span>
                    <div className="space-y-1.5 font-mono">
                      <div className="flex justify-between items-center"><span>April</span><span>120 pairs</span></div>
                      <div className="flex justify-between items-center"><span>May (Live)</span><span className="text-emerald-500 font-bold">186 matches</span></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          3. ADMIN PERSPECTIVE VIEW
          ========================================== */}
      {activeRole === 'admin' && (
        <div className="space-y-6">
          
          {/* CRITICAL CORE ADMIN METRICS HUB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Students Registered</span>
                <div className="text-3xl font-black text-slate-900 mt-1">{students.length} Students</div>
                <p className="text-[9.5px] text-slate-500 mt-1 leading-normal">
                   Includes {students.filter(s => s.readinessScore > 80).length} placement-ready profiles published.
                </p>
              </div>
              <span className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <GraduationCap size={20} />
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Recruiters Mandates</span>
                <div className="text-3xl font-black text-slate-900 mt-1">4 Companies</div>
                <p className="text-[9.5px] text-slate-500 mt-1 leading-normal">
                   Including Google, Supabase, Stripe, Figma.
                </p>
              </div>
              <span className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Building size={20} />
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Connections Forged</span>
                <div className="text-3xl font-black text-slate-900 mt-1">{totalVerifiedEngineConnections} Active</div>
                <p className="text-[9.5px] text-slate-500 mt-1 leading-normal">
                   Direct communication logs successfully bridged.
                </p>
              </div>
              <span className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Users size={20} />
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Placed Statistics</span>
                <div className="text-3xl font-black text-slate-900 mt-1">{totalMatchedPlacementRate}% Match</div>
                <p className="text-[9.5px] text-slate-500 mt-1 leading-normal">
                   Placement alignment vectors.
                </p>
              </div>
              <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Trophy size={20} />
              </span>
            </div>

          </div>

          {/* TWO COLUMN WORKSPACE: Left match mandates audit, Right performance charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* MATCH telemetry audits (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <History size={16} className="text-purple-600 animate-pulse" />
                    Student-Recruiter Matches & Active Invitations Audit
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Telemetry log capturing real-time direct connection requests.</p>
                </div>
                <button
                  onClick={handleAdminClearAll}
                  className="px-2.5 py-1 text-[10px] font-bold border border-red-200 text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  Restart Sandbox Db
                </button>
              </div>

              <div className="space-y-2.5 max-h-[480px] overflow-y-auto">
                {connections.map(con => {
                  const stud = students.find(s => s.id === con.studentId) || students[0];
                  return (
                    <div key={con.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="p-1 bg-purple-100 text-purple-700 rounded text-[9px] font-mono uppercase font-bold">
                            {con.type} Log
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Date: {con.date}</span>
                        </div>
                        <span className={`text-[10.5px] font-bold uppercase font-mono px-2 py-0.5 rounded-full ${
                          con.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          con.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {con.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 py-1">
                        <div className="flex items-center gap-2">
                          <img src={stud.avatar} alt={stud.name} className="w-6 h-6 rounded-full border" />
                          <span className="font-bold text-slate-800">{stud.name}</span>
                          <span className="text-[9.5px] text-slate-500 font-mono bg-white px-2 py-0.5 border border-slate-100 rounded">GPS: {stud.readinessScore}%</span>
                        </div>
                        <span className="text-slate-400 font-bold">↔</span>
                        <div>
                          <span className="font-bold text-slate-800">{con.recruiterName}</span>
                          <span className="text-[10px] text-slate-500"> ({con.companyName})</span>
                        </div>
                      </div>

                      {con.role && (
                        <p className="text-[10.5px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-150 leading-relaxed italic">
                           "Proposed Target Assignment: {con.role}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance lists and diagrams (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* ACCENT PLACEMENT PROGRESS GRAPH CHART */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Placement Statistics Progression</span>
                
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between items-center text-[11px] font-bold border-b border-slate-105 pb-1">
                    <span>Target Placement Cluster</span>
                    <span>Success Alignment Index</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span>Full-Stack Development</span>
                      <strong className="text-blue-600 font-mono">92% Met</strong>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span>Generative Backend Eng</span>
                      <strong className="text-indigo-600 font-mono">81% Met</strong>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: '81%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span>Databases Architecture</span>
                      <strong className="text-purple-600 font-mono">75% Met</strong>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-3.5 border border-blue-100 rounded-xl text-[10.5px] leading-relaxed text-slate-600">
                   System automation algorithmically triggers active pairing recommendation coordinates when student skill validation parameters fully cross match indexes.
                </div>
              </div>

              {/* ADMIN DECISIONS SCREEN COGNITION */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">System Administrative Controls</span>
                <p className="text-xs text-slate-650 leading-relaxed">
                   CareerPilot verification protocols require authenticated proof (assessment transcripts or direct GitHub repos webhooks) before publish permissions are issued to Student DNA profiles.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-800 block">Verification Rate</span>
                    <span className="text-emerald-600 font-black font-mono">100% Secure</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-800 block">SLA Response Speed</span>
                    <span className="text-blue-600 font-black font-mono">4 Hours Mean</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* DYNAMIC INFORMATION SYSTEM VERIFICATION MODAL */}
      <AnimatePresence>
        {clickedVerificationSkill && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-905/70 backdrop-blur-sm flex items-center justify-center p-4 text-xs font-sans text-slate-700"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border border-slate-200 w-full max-w-sm rounded-2xl p-6 relative shadow-xl"
            >
              <button 
                onClick={() => setClickedVerificationSkill(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[10px] font-mono">
                     Authenticated Skill DNA Proof
                  </h3>
                  <span className="text-xs text-slate-400">CareerPilot OS Blockchain Verification Ledger</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 border rounded-xl space-y-2 text-xs mb-4">
                <p><strong>Verified technology keyword:</strong> <span className="font-black text-blue-600">{clickedVerificationSkill.name}</span></p>
                <p><strong>Verification source:</strong> <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-bold">{clickedVerificationSkill.source} Verification Routine</span></p>
                <p><strong>Completion Timestamp:</strong> {clickedVerificationSkill.date}</p>
                <p><strong>Validation Integrity Check:</strong> <span className="text-emerald-600 font-bold">100% Verified Autocomplete</span></p>
              </div>

              <p className="text-[10.5px] text-slate-500 leading-normal mb-4">
                 Our system integrates directly with code assessments engines and GitHub webhooks to verify competency. Only fully authenticated skills are displayed on recruitement boards.
              </p>

              <button
                onClick={() => setClickedVerificationSkill(null)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase transition-transform cursor-pointer"
              >
                Dismiss Ledger Proof
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
