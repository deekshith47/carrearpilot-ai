import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../lib/firebase';
import { Sparkles, BrainCircuit, ShieldCheck, ArrowRight, User, Lock, Info, Mail, LogIn, UserPlus } from 'lucide-react';

export default function Login() {
  const { 
    login, 
    user, 
    firebaseSignIn, 
    firebaseSignUp, 
    firebaseGoogleSignIn 
  } = useAuth();
  
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customName, setCustomName] = useState('');
  const [role, setRole] = useState<'student' | 'admin' | 'recruiter'>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      // Store preferred role in localStorage for first-time account provisioning
      localStorage.setItem('google_signin_preferred_role', role);
      await firebaseGoogleSignIn();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Firebase Google Sign-In failed, running local chooser fallback:', err);
      // Fallback popup if browser blocks it or environment is sandboxed
      try {
        const redirectUri = window.location.origin + '/auth/google/callback';
        const res = await fetch(`/api/auth/google/url?redirectUri=${encodeURIComponent(redirectUri)}`);
        if (!res.ok) {
          throw new Error('Fallback authentication service unavailable');
        }
        const data = await res.json();
        if (data && data.url) {
          const w = 450;
          const h = 600;
          const left = (window.screen.width / 2) - (w / 2);
          const top = (window.screen.height / 2) - (h / 2);
          const popup = window.open(
            data.url,
            'Sign In with Google Sandbox',
            `width=${w},height=${h},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
          );
          if (popup) {
            popup.focus();
          } else {
            setError('Popup block suspected. Please enable popups or try normal email credentials.');
          }
        }
      } catch (fallbackError: any) {
        setError('Firebase Google connection failed. Please log in with email/pass or use Quick Connect.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth iframe cross-window event handler (for local simulation fallback)
  useEffect(() => {
    const handleGoogleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        const { email: googleEmail, name, role: googleRole } = event.data;
        // Authenticate locally using returned email & info
        const success = login(googleEmail, (googleRole || role) as 'student' | 'admin', name);
        if (success) {
          navigate('/dashboard');
        } else {
          setError('Google simulation authentication completed, but role login failed.');
        }
      }
    };
    window.addEventListener('message', handleGoogleMessage);
    return () => window.removeEventListener('message', handleGoogleMessage);
  }, [login, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide an email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!customName) {
          setError('Please provide your full name for registration.');
          setIsLoading(false);
          return;
        }
        // Run full Firebase Signup
        await firebaseSignUp(email, password, customName, role);
      } else {
        // Run full Firebase Signin
        await firebaseSignIn(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Firebase Email authentication failure:', err);
      let errMsg = err.message || 'Authentication error';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errMsg = 'Incorrect email or password. Do you need to Register first?';
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = 'This email is already in use. Please sign in instead!';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'Invalid email address syntax.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (selectedRole: 'student' | 'admin' | 'recruiter') => {
    let defaultEmail = 'devon.lee@university.edu';
    let defaultName = 'Devon Lee';

    if (selectedRole === 'admin') {
      defaultEmail = 'sarah.jenkins@university.edu';
      defaultName = 'Dr. Sarah Jenkins';
    } else if (selectedRole === 'recruiter') {
      defaultEmail = 'jason.sterling@talentpartners.com';
      defaultName = 'Jason Sterling';
    }
      
    login(defaultEmail, selectedRole, defaultName);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[130px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-5">
        {/* Brand identity */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] mb-1">
            <BrainCircuit className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
            CareerPilot <span className="text-cyan-400">OS</span>
          </h2>
          <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
            AI Career Operating System
          </p>
        </div>

        {/* Guidance / Manual Notice */}
        <div className={`rounded-xl p-3 flex gap-2.5 items-start text-xs border ${
          isFirebaseConfigured 
            ? 'bg-cyan-500/5 border-cyan-500/15 text-cyan-300' 
            : 'bg-amber-500/5 border-amber-500/15 text-amber-300'
        }`}>
          <Info className={`w-4 h-4 shrink-0 mt-0.5 ${isFirebaseConfigured ? 'text-cyan-400' : 'text-amber-400'}`} />
          <div>
            <p className="leading-relaxed font-semibold mb-0.5">
              {isFirebaseConfigured ? 'Firebase Integration Live!' : 'Sandbox Playground Mode'}
            </p>
            <p className="text-[11px] text-slate-400 leading-normal">
              {isFirebaseConfigured 
                ? 'Sign in with your email, create a new student or admin account, or register via standard Google auth.' 
                : 'Running in a local simulation sandbox because cloud setup was skipped. Enter any email & password or use the Quick Connect options below!'}
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl glass space-y-5">
          {/* Main Auth Toggle Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900">
            <button
              onClick={() => { setIsSignUp(false); setError(''); }}
              type="button"
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(''); }}
              type="button"
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-purple-500 text-white font-black shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Register
            </button>
          </div>

          {/* Role selector specifically for signup */}
          {isSignUp && (
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/50 border border-slate-850">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Select Register Track
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-1.5 px-3 rounded-lg text-[11px] font-bold tracking-wide uppercase border cursor-pointer transition-all ${
                    role === 'student'
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                      : 'border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Student Prep Track
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-1.5 px-3 rounded-lg text-[11px] font-bold tracking-wide uppercase border cursor-pointer transition-all ${
                    role === 'admin'
                      ? 'bg-purple-500/10 border-purple-500 text-purple-300'
                      : 'border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Faculty / Admin Lead
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-xs font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-center">
                {error}
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-1"
                >
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder={role === 'admin' ? 'Dr. Sarah Jenkins' : 'Devon Lee'}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 transition-colors pl-10 text-slate-200"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivers@university.edu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 transition-colors pl-10 text-slate-200"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                {!isSignUp && <span className="text-[9px] text-slate-500 italic">Secure Passcode</span>}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 transition-colors pl-10 text-slate-200"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-2 bg-slate-100 hover:bg-white text-slate-950 font-bold text-sm tracking-wide uppercase rounded-xl transition-all cursor-pointer flex justify-center items-center gap-2 group shadow-xl ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <>
                  {isSignUp ? 'Create Career Account' : 'Secure Login Session'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative my-4 flex items-center justify-center">
              <span className="absolute left-0 right-0 h-[1px] bg-slate-800" />
              <span className="relative z-10 px-3 bg-[#131d31] text-[10px] font-bold text-slate-500 uppercase tracking-widest">or</span>
            </div>

            {/* Google Authentication Role Selector */}
            <div className="space-y-1.5 p-2.5 rounded-xl border border-slate-950 bg-slate-950 p-2.5 text-center">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                Google Authentication Role Setup
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-1 px-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase border cursor-pointer transition-all ${
                    role === 'student'
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Student prep
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-1 px-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase border cursor-pointer transition-all ${
                    role === 'admin'
                      ? 'bg-purple-500/10 border-purple-500 text-purple-300'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Teacher lead
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-100 font-bold text-sm tracking-wide uppercase rounded-xl transition-all cursor-pointer flex justify-center items-center gap-2.5 shadow-md hover:shadow-lg font-sans"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l2.85 2.22c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Quick Demo Login Triggers */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block text-center font-mono">
              Quick Connect (Sandbox Playground)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="p-2.5 bg-slate-950 border border-slate-850 hover:border-cyan-500/30 rounded-xl text-left hover:bg-slate-900 transition-all cursor-pointer"
              >
                <div className="text-[10px] font-black text-cyan-400 uppercase font-sans truncate">Devon Lee</div>
                <div className="text-[8px] text-slate-400 font-mono mt-0.5">Student</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2.5 bg-slate-950 border border-slate-850 hover:border-purple-500/30 rounded-xl text-left hover:bg-slate-900 transition-all cursor-pointer"
              >
                <div className="text-[10px] font-black text-purple-400 uppercase truncate">Dr. S. Jenkins</div>
                <div className="text-[8px] text-slate-400 font-mono mt-0.5">Faculty Lead</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('recruiter')}
                className="p-2.5 bg-slate-950 border border-slate-850 hover:border-amber-500/30 rounded-xl text-left hover:bg-slate-900 transition-all cursor-pointer"
              >
                <div className="text-[10px] font-black text-amber-400 uppercase truncate">J. Sterling</div>
                <div className="text-[8px] text-slate-400 font-mono mt-0.5">Recruiter</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
