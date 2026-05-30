import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import SkillDNA from './pages/SkillDNA';
import CareerGPS from './pages/CareerGPS';
import GitHubAnalyzer from './pages/GitHubAnalyzer';
import OpportunityHeatmap from './pages/OpportunityHeatmap';
import MockInterview from './pages/MockInterview';
import RecruiterHub from './pages/RecruiterHub';
import ProjectMarketplace from './pages/ProjectMarketplace';
import EnrolledCourses from './pages/EnrolledCourses';
import CodingPlatform from './pages/CodingPlatform';
import ConceptRecovery from './pages/ConceptRecovery';
import IntegrityMonitor from './pages/IntegrityMonitor';
import ProjectVerification from './pages/ProjectVerification';

// Secure Route Shield
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-cyan-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-400/25 border-t-cyan-400 rounded-full animate-spin"></div>
          <span className="text-[10px] uppercase tracking-widest font-black text-cyan-500 animate-pulse">
            Readying telemetry modules...
          </span>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Views */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Secure career cockpit dashboard views hidden behind auth */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<EnrolledCourses />} />
            <Route path="resume" element={<ResumeAnalyzer />} />
            <Route path="gps" element={<CareerGPS />} />
            <Route path="skill-dna" element={<SkillDNA />} />
            <Route path="github" element={<GitHubAnalyzer />} />
            <Route path="project-verification" element={<ProjectVerification />} />
            <Route path="coding" element={<CodingPlatform />} />
            <Route path="concept-recovery" element={<ConceptRecovery />} />
            <Route path="interview" element={<MockInterview />} />
            <Route path="integrity-monitor" element={<IntegrityMonitor />} />
            <Route path="recruiter" element={<RecruiterHub />} />
            <Route path="project-marketplace" element={<ProjectMarketplace />} />
            <Route path="heatmap" element={<OpportunityHeatmap />} />
          </Route>

          {/* Fallback wildcard route redirecting back to index */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

