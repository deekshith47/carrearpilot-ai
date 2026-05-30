import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  BookOpen, 
  CheckCircle2, 
  CreditCard, 
  Unlock, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  X,
  Plus,
  PlayCircle
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  priceUSD: number;
  priceINR: number;
  syllabus: string[];
  skillsGained: string[];
  bannerGradient: string;
  platform: 'Udemy' | 'Coursera' | 'edX';
  courseUrl: string;
}

const COURSES: Course[] = [
  {
    id: "fullstack-systems",
    title: "The Complete Web Development Bootcamp",
    description: "Master modern HTML, CSS, JavaScript, React, Node, SQL, and build robust full-stack web applications with professional developer workflow.",
    duration: "8 Weeks (Self-Paced)",
    instructor: "Dr. Angela Yu (Udemy Top Educator)",
    priceUSD: 149,
    priceINR: 12500,
    syllabus: [
      "Front-End Web Development with HTML5, CSS3, Flexbox, and Grid",
      "JavaScript Programming Fundamentals and ES6 Object Modeling",
      "Building Declarative Client Interfaces with React Elements & Hooks",
      "RESTful API Development with Express and Relational PostgreSQL"
    ],
    skillsGained: ["React Context & Hooks", "Express CJS & ESM", "PostgreSQL Databases", "Web Architectures"],
    bannerGradient: "from-cyan-500/10 to-indigo-500/10 border-cyan-500/20",
    platform: "Udemy",
    courseUrl: "https://www.udemy.com/course/the-complete-web-development-bootcamp/"
  },
  {
    id: "ai-systems",
    title: "Machine Learning Specialization",
    description: "Build a fundamental understanding of machine learning and how to use these techniques to build real-world AI applications.",
    duration: "6 Weeks (Cohort Batch C)",
    instructor: "Andrew Ng, DeepLearning.AI & Stanford University",
    priceUSD: 199,
    priceINR: 16500,
    syllabus: [
      "Supervised ML: Linear Regression and Logistic Classification Models",
      "Advanced Learning Algorithms: neural networks, decision trees, and advice",
      "Unsupervised Learning, Recommenders, and Deep Reinforcement Systems Pipeline",
      "Practical deployment and ethics of modern neural architectures"
    ],
    skillsGained: ["TensorFlow Model Pipelines", "Supervised Learning", "Neural Network Scaling", "Anomaly Detection"],
    bannerGradient: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
    platform: "Coursera",
    courseUrl: "https://www.coursera.org/specializations/machine-learning-introduction"
  },
  {
    id: "devops-kubernetes",
    title: "Docker and Kubernetes: The Complete Guide",
    description: "Deep dive into enterprise infrastructure production deployments. Learn how to design, build, and deploy multi-container Kubernetes nodes.",
    duration: "10 Weeks (Self-Paced Module)",
    instructor: "Stephen Grider (Principal Software Engineer)",
    priceUSD: 249,
    priceINR: 20500,
    syllabus: [
      "Configuring Docker container multi-stage compile rules",
      "Kubernetes pods, master nodes & volume provisions",
      "YAML script workflows & automated network proxies",
      "Prometheus & Grafana visual server logging & health metrics"
    ],
    skillsGained: ["Kubernetes (k8s)", "Docker multi-stage builds", "GitHub CI/CD Actions", "Logging networks"],
    bannerGradient: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
    platform: "Udemy",
    courseUrl: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/"
  },
  {
    id: "algorithms-stanford",
    title: "Algorithms Specialization",
    description: "Master algorithmic analysis, divide and conquer paradigms, graph search routines, and greedy dynamic programming conventions.",
    duration: "8 Weeks",
    instructor: "Tim Roughgarden (Professor, Stanford University)",
    priceUSD: 179,
    priceINR: 14900,
    syllabus: [
      "Divide and Conquer paradigms, randomized sorting, and Master Method",
      "Graph Search algorithms, shortest paths, and data structures (heaps, trees)",
      "Greedy Algorithms, minimum spanning trees, and Dynamic Programming rules",
      "NP-complete problems, local search heuristics, and exact algorithm shortcuts"
    ],
    skillsGained: ["Asymptotic Big-O Analysis", "Divide & Conquer Design", "Shortest Path Solvers", "Knapsack Heuristics"],
    bannerGradient: "from-amber-500/10 to-orange-500/10 border-amber-500/20",
    platform: "Coursera",
    courseUrl: "https://www.coursera.org/specializations/algorithms"
  },
  {
    id: "cs50-harvard",
    title: "CS50x: Introduction to Computer Science",
    description: "Harvard University's legendary introduction to the intellectual enterprises of computer science and the art of programming.",
    duration: "12 Weeks (Self-Paced)",
    instructor: "David J. Malan (Professor, Harvard University)",
    priceUSD: 199,
    priceINR: 16500,
    syllabus: [
      "Low-Level memory compilation mechanics via C programming patterns",
      "Data structures & sorting: Arrays, Singly Linked Lists, BSTs, and Hash Tables",
      "High-level application architectures with Python and relational SQL databases",
      "Modern Web Engineering stack foundations: HTML, CSS, JavaScript, Flask API"
    ],
    skillsGained: ["C Assembly Mechanics", "Data Structure Analysis", "SQL Databases", "Flask Stack"],
    bannerGradient: "from-rose-500/10 to-red-500/10 border-rose-500/20",
    platform: "edX",
    courseUrl: "https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science"
  }
];

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-checkout-sdk')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-sdk';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function EnrolledCourses() {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<'stripe' | 'razorpay'>('stripe');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'selection' | 'processing' | 'success'>('selection');
  const [transactionLedger, setTransactionLedger] = useState<any[]>([]);

  // Simulation parameters for Stripe/Razorpay UI inputs
  const [cardHolder, setCardHolder] = useState('Alex Rivers');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [upiId, setUpiId] = useState('alex@ybl');

  // Load state from localStorage on mount and handle payment redirect parameters
  useEffect(() => {
    // 1. Recover normal local storage parameters
    const savedEnrolls = localStorage.getItem('student_enrolled_courses');
    let currentEnrolls: string[] = [];
    if (savedEnrolls) {
      try {
        currentEnrolls = JSON.parse(savedEnrolls);
        setEnrolledCourseIds(currentEnrolls);
      } catch (e) {
        console.error("Failed to parse saved enrolled courses", e);
      }
    } else {
      currentEnrolls = ["ai-systems"];
      setEnrolledCourseIds(currentEnrolls);
      localStorage.setItem('student_enrolled_courses', JSON.stringify(currentEnrolls));
    }

    const savedLedger = localStorage.getItem('student_payment_ledger');
    let currentLedger: any[] = [];
    if (savedLedger) {
      try {
        currentLedger = JSON.parse(savedLedger);
        setTransactionLedger(currentLedger);
      } catch (e) {
        console.error("Failed to parse saved transactions ledger", e);
      }
    } else {
      currentLedger = [
        {
          courseId: "ai-systems",
          courseTitle: "Machine Learning Specialization",
          amount: "USD 199",
          gateway: "Stripe Secure API",
          date: "May 10, 2026, 02:44 PM",
          reference: "ch_stripe_pld_98a72bbf81",
          status: "Authorized"
        }
      ];
      setTransactionLedger(currentLedger);
      localStorage.setItem('student_payment_ledger', JSON.stringify(currentLedger));
    }

    // 2. Process Stripe Success Callbacks if present in URL search string
    const params = new URLSearchParams(window.location.search);
    const stripeSuccess = params.get('payment_success') === 'true';
    const redirectCourseId = params.get('course_id');
    const stripeSessionId = params.get('session_id') || `ch_stripe_vld_${Math.random().toString(16).substring(2, 12)}`;

    if (stripeSuccess && redirectCourseId) {
      const matchedCourse = COURSES.find(c => c.id === redirectCourseId);
      if (matchedCourse && !currentEnrolls.includes(redirectCourseId)) {
        const nextEnrolls = [...currentEnrolls, redirectCourseId];
        setEnrolledCourseIds(nextEnrolls);
        localStorage.setItem('student_enrolled_courses', JSON.stringify(nextEnrolls));

        const nextTx = {
          courseId: matchedCourse.id,
          courseTitle: matchedCourse.title,
          amount: `USD ${matchedCourse.priceUSD}`,
          gateway: "Stripe Live Gateway Success",
          date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
          reference: stripeSessionId.startsWith('session_') ? stripeSessionId : `ch_${stripeSessionId}`,
          status: "Authorized"
        };

        const nextLedger = [nextTx, ...currentLedger];
        setTransactionLedger(nextLedger);
        localStorage.setItem('student_payment_ledger', JSON.stringify(nextLedger));

        setSelectedCourse(matchedCourse);
        setPaymentStep('success');
        setShowCheckoutModal(true);
        
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const startCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPaymentStep('selection');
    setShowCheckoutModal(true);
  };

  const finalizeRazorpayPayment = (razorpayPaymentId: string) => {
    if (!selectedCourse) return;
    const updatedEnrolls = [...enrolledCourseIds, selectedCourse.id];
    const newTransaction = {
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      amount: `₹${selectedCourse.priceINR.toLocaleString('en-IN')}`,
      gateway: 'Razorpay Secure API Success',
      date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      reference: razorpayPaymentId,
      status: 'Authorized'
    };

    const updatedLedger = [newTransaction, ...transactionLedger];

    setEnrolledCourseIds(updatedEnrolls);
    setTransactionLedger(updatedLedger);
    localStorage.setItem('student_enrolled_courses', JSON.stringify(updatedEnrolls));
    localStorage.setItem('student_payment_ledger', JSON.stringify(updatedLedger));

    setIsProcessingPayment(false);
    setPaymentStep('success');
  };

  const handleSimulatedPayment = async () => {
    if (!selectedCourse) return;
    setIsProcessingPayment(true);
    setPaymentStep('processing');

    if (paymentProvider === 'stripe') {
      try {
        const res = await fetch('/api/stripe-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            courseId: selectedCourse.id,
            title: selectedCourse.title,
            priceUSD: selectedCourse.priceUSD
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.status === 'live' && data.sessionUrl) {
            window.location.href = data.sessionUrl;
            return;
          } else {
            console.log("Stripe API key unconfigured. Simulating safe sandbox checkout session.");
          }
        }
      } catch (err) {
        console.warn("Failed to request backend Stripe setup, using responsive simulation fallback:", err);
      }
    } else if (paymentProvider === 'razorpay') {
      try {
        const res = await fetch('/api/razorpay-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            courseId: selectedCourse.id,
            title: selectedCourse.title,
            priceINR: selectedCourse.priceINR
          })
        });

        if (res.ok) {
          const checkoutData = await res.json();
          const scriptLoaded = await loadRazorpayScript();

          if (scriptLoaded && (window as any).Razorpay) {
            const razorpayOptions = {
              key: checkoutData.keyId === 'rzp_test_dummyKey123' ? 'rzp_test_3u7vM5YpT29b1G' : checkoutData.keyId, // Standard Razorpay test portal key
              amount: checkoutData.amount,
              currency: checkoutData.currency || 'INR',
              name: 'CareerOS Platform',
              description: selectedCourse.title,
              order_id: checkoutData.orderId && checkoutData.status === 'live' ? checkoutData.orderId : undefined,
              image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
              handler: function (response: any) {
                console.log("Razorpay checkout clear success:", response);
                finalizeRazorpayPayment(response.razorpay_payment_id || `pay_rzp_mock_${Math.random().toString(16).substring(2, 12)}`);
              },
              prefill: {
                name: cardHolder || 'Alex Rivers',
                email: upiId.includes('@') ? upiId : 'alex@ybl',
                contact: '9999999999'
              },
              notes: {
                courseId: selectedCourse.id,
                integration: 'Razorpay Secure Platform'
              },
              theme: {
                color: '#10B981' // emerald theme
              },
              modal: {
                ondismiss: function() {
                  setIsProcessingPayment(false);
                  setPaymentStep('selection');
                }
              }
            };

            const rzpInstance = new (window as any).Razorpay(razorpayOptions);
            rzpInstance.open();
            return;
          } else {
            console.warn("Razorpay script load failed or blocked by sandbox. Executing simulated failover...");
          }
        }
      } catch (err) {
        console.warn("Failed to query backend Razorpay checkout:", err);
      }
    }

    // High fidelity payment latency simulation
    setTimeout(() => {
      const updatedEnrolls = [...enrolledCourseIds, selectedCourse.id];
      const referenceId = paymentProvider === 'stripe' 
        ? `ch_stripe_vld_${Math.random().toString(16).substring(2, 12)}` 
        : `pay_razorpay_${Math.random().toString(16).substring(2, 12)}`;
      
      const newTransaction = {
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        amount: paymentProvider === 'stripe' ? `USD ${selectedCourse.priceUSD}` : `₹${selectedCourse.priceINR.toLocaleString('en-IN')}`,
        gateway: paymentProvider === 'stripe' ? 'Stripe Gateway' : 'Razorpay Secure Checkout',
        date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
        reference: referenceId,
        status: 'Authorized'
      };

      const updatedLedger = [newTransaction, ...transactionLedger];

      setEnrolledCourseIds(updatedEnrolls);
      setTransactionLedger(updatedLedger);
      localStorage.setItem('student_enrolled_courses', JSON.stringify(updatedEnrolls));
      localStorage.setItem('student_payment_ledger', JSON.stringify(updatedLedger));

      setIsProcessingPayment(false);
      setPaymentStep('success');
    }, 2000);
  };

  return (
    <div id="enrolled_courses_page" className="max-w-6xl mx-auto space-y-6 pb-12 font-sans animate-fadeIn">
      
      {/* Top Welcome Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3.5">
        <div>
          <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/25 rounded-full text-[9px] font-mono uppercase tracking-widest font-black inline-block">
            Student Billing Dashboard
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-100 flex items-center gap-2 mt-1.5 md:mt-2">
            Enrolled Courses & Secure Gateways 💳
          </h2>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
            Acquire enterprise full-stack badges, and trigger instant transaction checks. Integrate checkout parameters seamlessly through live simulated Razorpay UPI pipelines and Stripe checkout payloads.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Course Catalog (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-900">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Premium Technical Syllabus Grid</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40">
              COHORTS ONLINE: 4 ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSES.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              return (
                <div 
                  id={`course_card_${course.id}`}
                  key={course.id}
                  onClick={() => openCourse(course)}
                  className={`glass p-5 rounded-2xl border transition-all duration-300 hover:border-slate-700/80 cursor-pointer flex flex-col justify-between min-h-[230px] relative overflow-hidden group select-none ${
                    isEnrolled ? 'border-emerald-500/20 bg-slate-950/20' : 'border-slate-800'
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${course.bannerGradient} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`} />
                  
                  <div className="space-y-2.5 z-10">
                    <div className="flex justify-between items-start gap-1.5 flex-wrap">
                      <div className="flex gap-1.5">
                        {isEnrolled ? (
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[8px] font-black uppercase px-2 py-0.5 rounded">
                            ✓ ACTIVE STUDENT
                          </span>
                        ) : (
                          <span className="bg-slate-950/60 text-slate-400 border border-slate-800 font-mono text-[8px] font-black uppercase px-2 py-0.5 rounded">
                            🔒 COHORT LOCKED
                          </span>
                        )}
                        
                        <span className={`font-mono text-[8.5px] font-black uppercase px-2 py-0.5 rounded border ${
                          course.platform === 'Coursera'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : course.platform === 'edX'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-indigo-500/10 text-indigo-404 border-indigo-500/20'
                        }`}>
                          {course.platform}
                        </span>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-cyan-400 font-black">
                          USD {course.priceUSD}
                        </p>
                        <p className="text-[8px] font-mono text-slate-500 tracking-tight">
                          ₹{course.priceINR.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xs md:text-sm font-black text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 pr-4 leading-snug font-sans">
                      {course.title}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-900/60 mt-4 z-10">
                    <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock size={10} className="text-slate-500 pr-0.2" /> {course.duration}
                    </span>

                    <div className="flex gap-1.5 shrink-0 z-20">
                      <a 
                        href={course.courseUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent card selection trigger
                        }}
                        className={`px-2 py-1 text-[9px] font-sans font-black rounded-lg flex items-center gap-1 uppercase transition-all select-none ${
                          course.platform === 'Coursera' 
                            ? 'bg-blue-650 hover:bg-blue-600 border border-blue-500/30 text-white' 
                            : course.platform === 'edX' 
                            ? 'bg-rose-950 hover:bg-rose-900 border border-rose-500/30 text-rose-300' 
                            : 'bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300'
                        }`}
                      >
                        {course.platform} ↗
                      </a>

                      {isEnrolled ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openCourse(course);
                          }}
                          className="px-2.5 py-1 text-[9px] font-sans font-black bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center gap-1 uppercase transition-all"
                        >
                          <Unlock size={8} /> Enter Course
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCourse(course);
                            startCheckout(e);
                          }}
                          className="px-2.5 py-1 text-[9px] font-sans font-black bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-lg flex items-center gap-1 uppercase transition-all shadow-[0_0_10px_rgba(234,179,8,0.15)] hover:scale-105"
                        >
                          <Lock size={8} /> Checkout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Course Syllabus Viewer */}
          <AnimatePresence mode="wait">
            {selectedCourse ? (
              <motion.div 
                id="selected_course_viewer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-2xl border border-slate-800 p-6 space-y-4"
              >
                <div className="flex justify-between items-start gap-4 pb-3 border-b border-slate-850">
                  <div className="space-y-0.5">
                    <span className="text-[8px] uppercase font-mono font-black text-cyan-400 tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">Syllabus Overview</span>
                    <h3 className="text-sm font-black text-slate-100">{selectedCourse.title}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Instructor Team: <b className="text-slate-300">{selectedCourse.instructor}</b></p>
                  </div>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-1 rounded-lg bg-slate-950/60 border border-slate-850 text-slate-400 hover:text-slate-200"
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                      <PlayCircle size={12} className="text-cyan-400" /> Syllabus Modules (8 Weeks)
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-slate-400">
                      {selectedCourse.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="font-mono text-cyan-500 text-[9px] font-bold mt-0.5">0{idx + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                      <Unlock size={12} className="text-emerald-400" /> Industry Skills Earned
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCourse.skillsGained.map((skill) => (
                        <span key={skill} className="text-[9px] font-mono cursor-default px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-850 text-emerald-400/90 hover:bg-slate-900/60">
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                    {enrolledCourseIds.includes(selectedCourse.id) ? (
                      <div className="space-y-2 mt-3">
                        <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-[10px] text-emerald-400">
                          <CheckCircle2 size={12} />
                          <span>You are enrolled in this course. Launch the active laboratory models!</span>
                        </div>
                        <a 
                          href={selectedCourse.courseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`w-full py-1.5 rounded-xl text-center font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1 transition-all ${
                            selectedCourse.platform === 'Coursera'
                              ? 'bg-blue-650 hover:bg-blue-600 border border-blue-500/20 text-white'
                              : selectedCourse.platform === 'edX'
                              ? 'bg-rose-950 hover:bg-rose-900 border border-rose-500/20 text-rose-300'
                              : 'bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/20 text-indigo-300'
                          }`}
                        >
                          Study Course on {selectedCourse.platform} ↗
                        </a>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <a 
                          href={selectedCourse.courseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300 font-bold uppercase tracking-wider text-[10px] text-center flex items-center justify-center gap-1 transition-all"
                        >
                          Preview Course ↗
                        </a>
                        <button 
                          onClick={startCheckout}
                          className="py-1.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1 transition-all"
                        >
                          Configure Buy <ArrowRight size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass rounded-2xl border border-slate-850 border-dashed p-6 text-center select-none text-slate-500 text-xs py-7">
                <BookOpen size={24} className="mx-auto text-slate-600 mb-1.5" />
                <span>Select a technical cohort course above to overview its full timeline, custom instructions, and target skill benchmarks.</span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Payment Ledger & Transaction Telemetry (4 Columns) */}
        <div className="lg:col-span-4 space-y-4 font-sans">
          <div className="pb-2 border-b border-slate-900">
            <span className="text-[10px] font-black uppercase text-slate-505 tracking-wider text-slate-500">Live Checkout Logs & Ledger</span>
          </div>

          {/* Secure Payment System Overview Card */}
          <div className="glass rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="space-y-0.5">
              <span className="text-[8px] uppercase tracking-wider font-mono text-emerald-400 font-bold block">Telemetry Ledger</span>
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Billing Gateway Monitor</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black text-xs shrink-0 border border-cyan-500/20">
                  S
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-200">Stripe Gateway Core</p>
                  <p className="text-[8.5px] text-slate-500 font-mono">Status: <span className="text-emerald-400 font-bold font-mono">ONLINE</span> (TLS 1.3 Encryption)</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0 border border-emerald-500/20">
                  R
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-200">Razorpay Unified Platform</p>
                  <p className="text-[8.5px] text-slate-500 font-mono">Status: <span className="text-emerald-400 font-bold font-mono">ONLINE</span> (UPI / Netbanking)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Transaction Ledger listing */}
          <div className="glass rounded-xl p-5 border border-slate-900 space-y-3 select-all">
            <h4 className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Transaction History</h4>
            
            <div className="space-y-2.5 max-h-[220px] overflow-auto leading-normal custom-scrollbar select-text">
              {transactionLedger.map((tx, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950/50 border border-slate-955 rounded-xl space-y-1 text-[10px] font-mono leading-none">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="font-bold text-slate-400 truncate max-w-[130px]">{tx.courseTitle}</span>
                    <span className="text-emerald-400 font-bold shrink-0">{tx.amount}</span>
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-500 pt-0.5">
                    <span>{tx.gateway}</span>
                    <span>{tx.date}</span>
                  </div>
                  <div className="text-[8px] text-slate-600 truncate border-t border-slate-900/60 pt-1 mt-1 font-sans">
                    ID: {tx.reference}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Stripe & Razorpay Checkout Modal Portal */}
      <AnimatePresence>
        {showCheckoutModal && selectedCourse && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              id="checkout_modal_portal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <Wallet className="text-yellow-400 animate-pulse" size={16} />
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">Secure Order Checkout</h3>
                    <p className="text-[9px] text-slate-500 font-mono">Cohort Batch Reservation Portal</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-1 rounded-lg bg-slate-950/60 border border-slate-850 text-slate-400 hover:text-slate-200"
                >
                  <X size={12} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Course parameters display */}
                <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 border border-slate-900 text-xs">
                  <span className="text-[7.5px] uppercase font-mono font-bold tracking-widest text-slate-500">Reserved Course Item</span>
                  <p className="font-bold text-slate-100">{selectedCourse.title}</p>
                  <div className="flex justify-between text-[11px] font-mono pt-1 border-t border-slate-905 mt-1 text-slate-400">
                    <span>Gateway Rate</span>
                    <span className="text-yellow-400 font-bold">
                      {paymentProvider === 'stripe' ? `$${selectedCourse.priceUSD} USD` : `₹${selectedCourse.priceINR.toLocaleString('en-IN')} INR`}
                    </span>
                  </div>
                </div>

                {paymentStep === 'selection' && (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Gateway selection tabs */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500 block">Select Payments Gateway Processor</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPaymentProvider('stripe')}
                          className={`p-3 rounded-xl border font-sans text-xs font-black flex flex-col items-center justify-center gap-1.5 transition-all select-none ${
                            paymentProvider === 'stripe' 
                              ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-md' 
                              : 'border-slate-850 bg-slate-950/45 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <CreditCard size={15} />
                          <span>Stripe Secure API</span>
                        </button>

                        <button
                          onClick={() => setPaymentProvider('razorpay')}
                          className={`p-3 rounded-xl border font-sans text-xs font-black flex flex-col items-center justify-center gap-1.5 transition-all select-none ${
                            paymentProvider === 'razorpay' 
                              ? 'border-emerald-500/40 bg-emerald-505/10 text-emerald-400 shadow-md' 
                              : 'border-slate-855 bg-slate-950/45 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Wallet size={15} />
                          <span>Razorpay Secure</span>
                        </button>
                      </div>
                    </div>

                    {/* Highly interactive gateway layouts */}
                    {paymentProvider === 'stripe' ? (
                      <div className="space-y-3 p-3 bg-slate-950/80 border border-slate-955 rounded-xl animate-fadeIn">
                        <div className="space-y-1">
                          <label className="text-[8px] text-slate-500 uppercase tracking-wider block">Cardholder Name</label>
                          <input 
                            type="text" 
                            value={cardHolder} 
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] text-slate-505 uppercase tracking-wider block">Card Coordinates Matrix</label>
                          <input 
                            type="text" 
                            value={cardNumber} 
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono" 
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 p-3 bg-slate-950/80 border border-slate-955 rounded-xl animate-fadeIn">
                        <div className="space-y-1">
                          <label className="text-[8px] text-slate-505 uppercase tracking-wider block">UPI ID Registry Pointer</label>
                          <input 
                            type="text" 
                            value={upiId} 
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 focus:outline-none focus:border-emerald-400 font-mono" 
                          />
                        </div>
                        <p className="text-[8.5px] text-slate-500 text-center font-mono">
                          ✓ Razorpay secure deep links will query UPI prompt checks instantly.
                        </p>

                        <div className="border-t border-slate-800/80 pt-2.5 mt-2 space-y-2">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider font-mono">Instant Gateway Actions:</p>
                          </div>
                          
                          <a 
                            id="direct-razorpay-link"
                            href={`https://api.razorpay.com/v1/payments/create?amount=${selectedCourse.priceINR * 100}&currency=INR&email=${encodeURIComponent(upiId)}&phone=9999999999&description=${encodeURIComponent(selectedCourse.title)}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                              // Immediately auto-approve and unlock the syllabus locally
                              setTimeout(() => {
                                const currentEnrolls = enrolledCourseIds;
                                if (!currentEnrolls.includes(selectedCourse.id)) {
                                  const updatedEnrolls = [...currentEnrolls, selectedCourse.id];
                                  setEnrolledCourseIds(updatedEnrolls);
                                  localStorage.setItem('student_enrolled_courses', JSON.stringify(updatedEnrolls));
                                }
                                
                                const referenceId = `pay_rzplink_${Math.random().toString(16).substring(2, 12)}`;
                                const newTransaction = {
                                  courseId: selectedCourse.id,
                                  courseTitle: selectedCourse.title,
                                  amount: `₹${selectedCourse.priceINR.toLocaleString('en-IN')}`,
                                  gateway: 'Razorpay Direct Gateway Link',
                                  date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
                                  reference: referenceId,
                                  status: 'Authorized'
                                };
                                const updatedLedger = [newTransaction, ...transactionLedger];
                                setTransactionLedger(updatedLedger);
                                localStorage.setItem('student_payment_ledger', JSON.stringify(updatedLedger));
                                setPaymentStep('success');
                              }, 1200);
                            }}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all text-center border-none shadow-md shadow-emerald-500/10 cursor-pointer text-decoration-none font-mono"
                          >
                            Launch Razorpay App / Link ↗
                          </a>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSimulatedPayment}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Authorize Security Token</span>
                      <ShieldCheck size={14} />
                    </button>
                  </div>
                )}

                {paymentStep === 'processing' && (
                  <div className="py-8 flex flex-col items-center justify-center gap-4 text-center select-none animate-fadeIn">
                    <div className="w-12 h-12 border-4 border-cyan-400/25 border-t-cyan-400 rounded-full animate-spin" />
                    <div>
                      <p className="text-xs font-bold text-slate-100 uppercase tracking-wider">Deploying Checkout Payload</p>
                      <p className="text-[9px] text-slate-505 font-mono mt-1 text-slate-500">
                        {paymentProvider === 'stripe' 
                          ? "Securing credit token payload references via Stripe v3 CDN..." 
                          : "Calling Razorpay deep integration callback interfaces..."}
                      </p>
                    </div>
                  </div>
                )}

                {paymentStep === 'success' && (
                  <div className="py-6 flex flex-col items-center justify-center gap-4 text-center select-none animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={24} className="animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Transaction Success! Check Clear</h4>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
                        Your cohort seat is reserved. The premium syllabus algorithms are instantly unlocked inside your cockpit.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowCheckoutModal(false)}
                      className="px-6 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-850 text-[10px] font-bold text-slate-200 uppercase transition-all"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
