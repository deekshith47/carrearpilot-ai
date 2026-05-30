import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  UserCircle, 
  BrainCircuit, 
  BrainCircuit as BrainIcon, 
  Github, 
  Map, 
  Mic, 
  Settings, 
  Target, 
  FolderGit2, 
  Users, 
  PieChart, 
  MapPin, 
  Globe, 
  Grid,
  X,
  Sparkles,
  ArrowUpRight,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Wallet,
  Code2,
  Compass,
  Briefcase
} from 'lucide-react';
import clsx from 'clsx';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  // Student-oriented navigation items
  const studentNavItems = [
    { name: 'Dashboard Home', path: '/dashboard', icon: LayoutDashboard, color: 'text-cyan-400', desc: 'Overview & telemetry' },
    { name: 'Career GPS', path: '/dashboard/gps', icon: Compass, color: 'text-cyan-400', desc: 'Live career navigation engine' },
    { name: 'Enrolled Courses', path: '/dashboard/courses', icon: Wallet, color: 'text-yellow-400', desc: 'Secure billing & live syllabus' },
    { name: 'Resume Analyzer', path: '/dashboard/resume', icon: FileText, color: 'text-purple-400', desc: 'ATS scanner & optimizer' },
    { name: 'Skill DNA', path: '/dashboard/skill-dna', icon: BrainCircuit, color: 'text-emerald-400', desc: 'Algorithmic path mapping' },
    { name: 'GitHub Analyzer', path: '/dashboard/github', icon: Github, color: 'text-slate-300', desc: 'Repository performance analysis' },
    { name: 'Project Verification', path: '/dashboard/project-verification', icon: ShieldCheck, color: 'text-emerald-400', desc: 'Secure repository authenticity analyzer' },
    { name: 'Coding Platform', path: '/dashboard/coding', icon: Code2, color: 'text-cyan-500', desc: 'Interactive coding assessment' },
    { name: 'Concept Recovery', path: '/dashboard/concept-recovery', icon: BrainIcon, color: 'text-rose-400', desc: 'Identify DSA skill gaps' },
    { name: 'Mock Interview', path: '/dashboard/interview', icon: Mic, color: 'text-rose-400', desc: 'Simulated AI verbal evaluator' },
    { name: 'Integrity Monitor', path: '/dashboard/integrity-monitor', icon: ShieldAlert, color: 'text-rose-500', desc: 'AI proctor & gaze tracker' },
    { name: 'Recruiter Bridge', path: '/dashboard/recruiter', icon: Users, color: 'text-blue-400', desc: 'AI Skill-to-Recruiter Bridge' },
    { name: 'Project Marketplace', path: '/dashboard/project-marketplace', icon: Briefcase, color: 'text-indigo-400', desc: 'Secure paid projects & escrow' },
    { name: 'Heatmap', path: '/dashboard/heatmap', icon: MapPin, color: 'text-orange-400', desc: 'Regional job opening dense graph' }
  ];

  // Admin-oriented navigation items (puts dashboard at top, keeps others categorized as 'Inspect Modules')
  const adminNavItems = [
    { name: 'Faculty Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-purple-400', desc: 'Faculty proctoring overview' }
  ];

  // Recruiter-oriented navigation items
  const recruiterNavItems = [
    { name: 'Talent Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-amber-400', desc: 'Recruiting & Student Analytics' }
  ];

  const renderedNavItems = user?.role === 'admin' 
    ? [...adminNavItems, ...studentNavItems.slice(1)] 
    : (user?.role === 'recruiter'
        ? [...recruiterNavItems, ...studentNavItems.slice(1)]
        : studentNavItems);

  // Primary bottom tabs for mobile viewport
  const mobileCoreTabs = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'GPS', path: '/dashboard/gps', icon: Compass },
    { name: 'Resume', path: '/dashboard/resume', icon: FileText },
  ];

  const filteredTools = renderedNavItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* 1. Desktop Sidebar (hidden on mobile, shown on md screens) */}
      <aside className="hidden md:flex w-60 border-r border-slate-800 flex-col glass z-10 shrink-0">
        <div className="p-6 mb-2">
          <h1 className="text-xl font-bold tracking-tighter text-cyan-400">
            CareerPilot<span className="text-slate-100">OS</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            {user?.role === 'admin' ? 'Faculty Admin Console' : 'Career Operating System'}
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <div className="px-6 py-2 mb-2">
            <div className="px-2.5 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert size={12} className="text-purple-400 shrink-0" />
              Faculty Access Level
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 pb-4 space-y-1 text-sm font-medium overflow-y-auto custom-scrollbar">
          {user?.role === 'admin' && (
            <div className="px-3 mb-1.5 text-[9px] uppercase font-black tracking-widest text-slate-500">
              Core Faculty Tool
            </div>
          )}
          {renderedNavItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            // Render divider for admins before the inspection list
            const showInspectionDivider = user?.role === 'admin' && idx === 1;

            return (
              <div key={item.path}>
                {showInspectionDivider && (
                  <div className="px-3 mt-4 mb-2 text-[9px] uppercase font-black tracking-widest text-slate-500">
                    Inspect Student Modules
                  </div>
                )}
                <Link
                  to={item.path}
                  className={clsx(
                    "flex items-center px-3 py-2 transition-all rounded-lg group relative",
                    isActive 
                      ? "text-cyan-400 bg-cyan-400/10" 
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/45"
                  )}
                >
                  <Icon size={18} className={clsx("opacity-70 mr-3 shrink-0 transition-transform group-hover:scale-110", isActive && "text-cyan-400 opacity-100")} />
                  <span className="font-medium text-xs">{item.name}</span>
                  {isActive && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
        
        {/* Dynamic User Profile Indicator bottom section */}
        <div className="p-4 border-t border-slate-800 flex flex-col gap-2 bg-slate-900/10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] overflow-hidden">
              <img src={user?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"} className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-bold text-slate-200 block truncate">{user?.name || 'Guest User'}</span>
              <span className="text-[9px] text-slate-500 font-mono tracking-wide uppercase truncate block">
                {user?.role === 'admin' ? 'Faculty Panel' : 'AlexRivers-Dev'}
              </span>
            </div>
            <button 
              onClick={handleSignOut}
              className="p-1 hover:bg-red-500/10 rounded text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main content block */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Responsive Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800/50 glass bg-slate-950/20 shrink-0 select-none z-10">
          <div className="flex items-center gap-3">
            {/* Small viewport brand title logo */}
            <div className="block md:hidden">
              <h1 className="text-lg font-black tracking-tighter text-cyan-400">
                C<span className="text-slate-100">OS</span>
              </h1>
            </div>
            <h1 className="text-sm md:text-lg font-bold text-slate-100 truncate">
              {renderedNavItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest hidden sm:block">
                {user?.role === 'admin' ? 'Cohort Live Attendance' : 'Placement Readiness'}
              </span>
              <div className="h-8 px-2 bg-slate-900/90 border border-slate-700/80 rounded flex items-center justify-center font-bold text-cyan-400 font-mono text-xs sm:text-sm shadow-[0_0_10px_rgba(34,211,238,0.15)]">
                {user?.role === 'admin' ? '94%' : '82%'}
              </div>
            </div>

            {/* Mobile View Logout and quick indicator */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 border border-slate-700 p-[1px] shrink-0">
                <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <button 
                onClick={handleSignOut}
                className="md:hidden p-2 hover:bg-slate-900 rounded text-slate-400 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic page render container */}
        <div className="flex-1 p-4 md:p-6 overflow-auto pb-24 md:pb-6 relative mb-16 md:mb-0">
          <Outlet />
        </div>

        {/* 3. Mobile BOTTOM Tab Bar (visible ONLY on screen widths below md) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/80 px-2 pb-5 pt-2 flex justify-around items-center h-20 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
          {mobileCoreTabs.map((tab) => {
            const isActive = location.pathname === tab.path && !isDrawerOpen;
            const Icon = tab.icon;
            return (
              <Link 
                key={tab.path} 
                to={tab.path}
                onClick={() => setIsDrawerOpen(false)}
                className="flex flex-col items-center justify-center flex-1 py-1 transition-all"
              >
                <div className={clsx(
                  "p-1.5 rounded-xl transition-all relative",
                  isActive ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]" : "text-slate-400 hover:text-slate-300"
                )}>
                  <Icon size={20} />
                  {isActive && (
                    <motion.span 
                      layoutId="activeTabOutline"
                      className="absolute inset-0 border-2 border-cyan-400/30 rounded-xl"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </div>
                <span className={clsx("text-[9px] mt-1 font-semibold tracking-wide", isActive ? "text-cyan-400" : "text-slate-500")}>
                  {tab.name}
                </span>
              </Link>
            );
          })}

          {/* More Tools Launcher Button */}
          <button 
            onClick={() => setIsDrawerOpen(prev => !prev)}
            className="flex flex-col items-center justify-center flex-1 py-1 relative"
          >
            <div className={clsx(
              "p-1.5 rounded-xl transition-all relative",
              isDrawerOpen ? "bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "text-slate-400"
            )}>
              <Grid size={20} className={clsx("transition-transform", isDrawerOpen && "rotate-45")} />
            </div>
            <span className={clsx("text-[9px] mt-1 font-semibold tracking-wide", isDrawerOpen ? "text-purple-400" : "text-slate-500")}>
              Apps Grid
            </span>
          </button>
        </div>

      </main>

      {/* 4. Animated Slide-Up Full Tool Grid Bottom Sheet */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop filter overlay click-to-close */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsDrawerOpen(false)}
               className="md:hidden fixed inset-0 z-45 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Slide-Up Container */}
            <motion.div 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{ type: "spring", stiffness: 280, damping: 28 }}
               className="md:hidden fixed bottom-20 left-1 right-1 z-50 rounded-t-3xl glass bg-slate-900/95 border border-slate-800 shadow-[0_-15px_30px_rgba(0,0,0,0.6)] flex flex-col max-h-[75vh]"
            >
               {/* Drawer Handle Accent */}
               <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto my-3 shrink-0" />

               <div className="px-5 pb-3">
                 <div className="flex items-center justify-between mb-3">
                   <div>
                     <h3 className="text-base font-black text-slate-100 flex items-center gap-1.5">
                       <Sparkles size={16} className="text-purple-400" />
                       Tool Cabinet Grid
                     </h3>
                     <p className="text-[10px] text-slate-500 font-semibold tracking-wide lowercase">Select a specialized carrier program</p>
                   </div>
                   <button 
                     onClick={() => setIsDrawerOpen(false)}
                     className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
                   >
                     <X size={16} className="text-slate-400" />
                   </button>
                 </div>

                 {/* Custom interactive search bar inside sheet */}
                 <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Search specialized tools..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-slate-950/90 border border-slate-800 focus:border-purple-500 rounded-xl py-2 px-3 pl-9 text-xs placeholder:text-slate-600 focus:outline-none transition-colors"
                   />
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] font-sans">🔍</span>
                   {searchQuery && (
                     <button 
                       onClick={() => setSearchQuery('')}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-slate-500 hover:text-slate-300"
                     >
                       clear
                     </button>
                   )}
                 </div>
               </div>

               {/* Apps Bento List Container */}
               <div className="flex-1 overflow-y-auto px-5 pb-6 custom-scrollbar space-y-2.5">
                 {filteredTools.length === 0 ? (
                   <div className="py-12 text-center">
                     <p className="text-xs text-slate-500">No companion modules found matching "{searchQuery}"</p>
                   </div>
                 ) : (
                   <div className="grid grid-cols-2 gap-2.5">
                     {filteredTools.map((item) => {
                       const Icon = item.icon;
                       const isPageActive = location.pathname === item.path;
                       return (
                         <Link 
                           key={item.path}
                           to={item.path}
                           onClick={() => setIsDrawerOpen(false)}
                           className={clsx(
                             "relative p-3.5 rounded-2xl border flex flex-col justify-between transition-all group overflow-hidden bg-slate-950/40 text-left",
                             isPageActive 
                               ? "border-cyan-500/50 bg-cyan-950/10 shadow-[0_0_12px_rgba(34,211,238,0.08)]" 
                               : "border-slate-800/80 hover:border-slate-700"
                           )}
                         >
                           {/* Icon and action key */}
                           <div className="flex items-start justify-between">
                             <div className={clsx("p-2 rounded-xl bg-slate-900 border border-slate-800 inline-block shrink-0", item.color)}>
                               <Icon size={16} />
                             </div>
                             <ArrowUpRight size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                           </div>

                           {/* Label content */}
                           <div className="mt-4">
                             <h4 className="font-bold text-xs text-slate-200 line-clamp-1 group-hover:text-white transition-colors">{item.name}</h4>
                             <p className="text-[9px] text-slate-500 font-medium leading-normal mt-1 line-clamp-2">{item.desc}</p>
                           </div>

                           {isPageActive && (
                             <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                           )}
                         </Link>
                       );
                     })}
                   </div>
                 )}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

