import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Camera, 
  CameraOff, 
  Eye, 
  User, 
  Users, 
  Smartphone, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  X, 
  Activity, 
  Award, 
  Sliders, 
  FolderLock, 
  Maximize2,
  Trash2,
  CheckCircle,
  AlertOctagon,
  FileMinus,
  HelpCircle
} from 'lucide-react';

interface ViolationLog {
  id: string;
  studentName: string;
  type: string;
  timestamp: string;
  screenshot: string; // Base64 data URL
  riskScore: number;
  severity: 'low' | 'medium' | 'high';
  gazeDirection?: string;
}

export default function IntegrityMonitor() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVirtualMode, setIsVirtualMode] = useState(false);
  
  // Refs for tracking video and canvas
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameAnimationRef = useRef<number | null>(null);

  // Integrity metrics state
  const [integrityScore, setIntegrityScore] = useState(100);
  const [riskScore, setRiskScore] = useState(0);
  const [violations, setViolations] = useState<ViolationLog[]>([]);

  // Simulation overrides (for fully demonstrating rules instantly)
  const [simulatedGaze, setSimulatedGaze] = useState<'center' | 'left' | 'right' | 'up' | 'down'>('center');
  const [simulatedFace, setSimulatedFace] = useState<'standard' | 'absent' | 'multiple'>('standard');
  const [simulatedPhone, setSimulatedPhone] = useState<boolean>(false);

  // Calibration settings
  const [lookAwayTimer, setLookAwayTimer] = useState<number>(0); // in deciseconds/seconds
  const [isLookingAway, setIsLookingAway] = useState<boolean>(false);
  const [lookAwayStartTime, setLookAwayStartTime] = useState<number | null>(null);

  // Safe Threshold controls
  const [violationsLimit, setViolationsLimit] = useState<number>(3);
  const [autoEndOnThreshold, setAutoEndOnThreshold] = useState<boolean>(true);
  const [isInterviewEnded, setIsInterviewEnded] = useState<boolean>(false);
  const [endCountdown, setEndCountdown] = useState<number | null>(null);

  // Active fullscreen view for screenshot evidence
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  // Sound effect trigger (simulated via Web Audio API)
  const playCameraShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // White noise for camera click
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      noise.start();
    } catch (e) {
      console.warn('Web Audio playback failed', e);
    }
  };

  // Turn camera on/off
  const startCamera = async () => {
    try {
      setCameraError(null);
      setIsVirtualMode(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false
      });
      setStream(mediaStream);
      setIsCameraOn(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Explicitly invoke play() to force browser texture rendering on frames
          videoRef.current.play().catch(e => {
            console.warn("Autoplay initialization interrupted", e);
          });
        }
      }, 150);
    } catch (err: any) {
      console.error("Camera access failed", err);
      setCameraError("Camera permission blocked. Since the app is running in a preview iframe browser tab, direct webcam streaming might be disabled. Grant permissions or start our Interactive Biometric Face Simulator below!");
      setIsCameraOn(false);
    }
  };

  const startVirtualSimulator = () => {
    setCameraError(null);
    setIsVirtualMode(true);
    setIsCameraOn(true);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOn(false);
    setIsVirtualMode(false);
    if (frameAnimationRef.current) {
      cancelAnimationFrame(frameAnimationRef.current);
    }
  };

  useEffect(() => {
    // Load violations on mount from localStorage
    const saved = localStorage.getItem('integrity_violations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setViolations(parsed);
          // Calculate score from localStorage
          const sumRisk = parsed.reduce((sum, v) => sum + v.riskScore, 0);
          setRiskScore(sumRisk);
          setIntegrityScore(Math.max(0, 100 - parsed.length * 15 - parsed.filter(v => v.type.includes('Phone')).length * 20));
        }
      } catch (err) {
        console.warn("Could not parse integrity logs", err);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (frameAnimationRef.current) {
        cancelAnimationFrame(frameAnimationRef.current);
      }
    };
  }, []);

  // 5-Second Looking Away rule validation and tracking loop
  useEffect(() => {
    const isAway = simulatedGaze !== 'center' || simulatedFace === 'absent';
    setIsLookingAway(isAway);

    let intervalId: any;

    if (isAway && !isInterviewEnded) {
      if (lookAwayStartTime === null) {
        setLookAwayStartTime(Date.now());
      }
      
      intervalId = setInterval(() => {
        if (lookAwayStartTime !== null) {
          const delta = (Date.now() - lookAwayStartTime) / 1000;
          setLookAwayTimer(parseFloat(delta.toFixed(1)));

          // TRIGGER VIOLATION ON CONTINUOUS 5 SECONDS!
          if (delta >= 5.0) {
            triggerViolation({
              type: simulatedFace === 'absent' ? 'Face Absent / Profile Check Displaced' : `Gaze Out of Bounds (${simulatedGaze.toUpperCase()})`,
              riskMultiplier: 1.5,
              gazeDir: simulatedGaze
            });
            // Reset start time to allow subsequent violations if they keep looking away
            setLookAwayStartTime(Date.now());
          }
        }
      }, 100);
    } else {
      setLookAwayStartTime(null);
      setLookAwayTimer(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [simulatedGaze, simulatedFace, lookAwayStartTime, isInterviewEnded]);

  // Phone and Multiple faces instantaneous violation checks (triggered on change)
  useEffect(() => {
    if (simulatedPhone && !isInterviewEnded) {
      const delayPhoneTrigger = setTimeout(() => {
        triggerViolation({
          type: "Cell Phone Device Contraband Detected",
          riskMultiplier: 2.5
        });
      }, 600);
      return () => clearTimeout(delayPhoneTrigger);
    }
  }, [simulatedPhone]);

  useEffect(() => {
    if (simulatedFace === 'multiple' && !isInterviewEnded) {
      const delayFaceTrigger = setTimeout(() => {
        triggerViolation({
          type: "Multiple Faces Present in Testing Area",
          riskMultiplier: 2.0
        });
      }, 600);
      return () => clearTimeout(delayFaceTrigger);
    }
  }, [simulatedFace]);

  // Handle threshold exceed warnings and auto-ending of interview
  useEffect(() => {
    const totalViolationsCount = violations.length;
    if (totalViolationsCount >= violationsLimit && !isInterviewEnded) {
      if (autoEndOnThreshold) {
        if (endCountdown === null) {
          setEndCountdown(5);
        }
      }
    }
  }, [violations, violationsLimit, autoEndOnThreshold, isInterviewEnded]);

  // Countdown timer for auto ending
  useEffect(() => {
    if (endCountdown !== null && endCountdown > 0) {
      const timer = setTimeout(() => {
        setEndCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (endCountdown === 0) {
      setIsInterviewEnded(true);
      setEndCountdown(null);
    }
  }, [endCountdown]);

  // Create a base64 Screenshot placeholder when webcam is off or capture frames when webcam is on
  const captureScreenshotBytes = (): string => {
    if (canvasRef.current && isCameraOn) {
      // Return currently rendered canvas frame directly to capture either webcam snapshot or Virtual face tracking telemetry
      return canvasRef.current.toDataURL('image/jpeg', 0.7);
    }
    
    // Generates a descriptive high-tech retro wireframe matrix picture if camera is off
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }
      
      // biometric mock wire lines
      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.ellipse(160, 120, 60, 80, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      // crosshairs
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(110, 100); ctx.lineTo(130, 100);
      ctx.moveTo(194, 100); ctx.lineTo(214, 100);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(`VIOLATION: ${simulatedGaze.toUpperCase()} GAZE AWAY`, 15, 215);
      ctx.fillText(`UTC TIMESTAMP: ${new Date().toLocaleTimeString()}`, 15, 227);
    }
    return canvas.toDataURL('image/jpeg');
  };

  // Append new proctor infraction safely
  const triggerViolation = (info: { type: string, riskMultiplier: number, gazeDir?: string }) => {
    playCameraShutterSound();
    const screenshotData = captureScreenshotBytes();
    
    const penaltyWeight = Math.round(15 * info.riskMultiplier);
    
    const newAlert: ViolationLog = {
      id: "v_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      studentName: "Alex Rivers", // Default logged-in student
      type: info.type,
      timestamp: new Date().toLocaleTimeString(),
      screenshot: screenshotData,
      riskScore: penaltyWeight,
      severity: penaltyWeight >= 30 ? 'high' : penaltyWeight >= 20 ? 'medium' : 'low',
      gazeDirection: info.gazeDir
    };

    setViolations(prev => {
      const updated = [newAlert, ...prev];
      localStorage.setItem('integrity_violations', JSON.stringify(updated));
      return updated;
    });

    setRiskScore(prev => prev + penaltyWeight);
    setIntegrityScore(prev => Math.max(0, prev - penaltyWeight));
  };

  // Reset/Flush database logs
  const handleClearHistory = () => {
    localStorage.removeItem('integrity_violations');
    setViolations([]);
    setRiskScore(0);
    setIntegrityScore(100);
    setSimulatedGaze('center');
    setSimulatedFace('standard');
    setSimulatedPhone(false);
    setIsInterviewEnded(false);
    setEndCountdown(null);
  };

  // Core Webcam Matrix Drawer canvas effect
  useEffect(() => {
    let active = true;
    
    const drawOverlay = () => {
      if (!active) return;
      
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = 640;
          const h = 480;
          canvas.width = w;
          canvas.height = h;

          const hasRealVideo = video && !isVirtualMode && (video.readyState >= 2 || video.currentTime > 0);

          if (hasRealVideo) {
            // Draw matched webcam stream inside canvas size
            ctx.translate(w, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(video, 0, 0, w, h);
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform matrix
          } else {
            // Draw high-tech immersive interactive digital face mesh
            ctx.fillStyle = '#090d16';
            ctx.fillRect(0, 0, w, h);

            // Technical overlay radial glow
            const radGlow = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, 350);
            radGlow.addColorStop(0, '#0f172a');
            radGlow.addColorStop(1, '#020617');
            ctx.fillStyle = radGlow;
            ctx.fillRect(0, 0, w, h);

            // Matrix style scanning coordinate line
            const scanLineY = (Date.now() / 8) % h;
            ctx.fillStyle = 'rgba(6, 182, 212, 0.04)';
            ctx.fillRect(0, scanLineY - 15, w, 30);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, scanLineY);
            ctx.lineTo(w, scanLineY);
            ctx.stroke();

            // Render custom biological face mesh nodes if face is standard or multiple
            if (simulatedFace !== 'absent') {
              const pulseScale = Math.sin(Date.now() / 250) * 3;
              const breathingOffset = Math.sin(Date.now() / 700) * 6;
              const headX = w / 2;
              const headY = h / 2 - 10 + breathingOffset;

              // Neck anchor
              ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(headX - 35, headY + 110);
              ctx.quadraticCurveTo(headX - 50, headY + 170, headX - 100, h - 30);
              ctx.moveTo(headX + 35, headY + 110);
              ctx.quadraticCurveTo(headX + 50, headY + 170, headX + 100, h - 30);
              ctx.stroke();

              // Draw beautiful outer face contour
              ctx.strokeStyle = 'rgba(34, 211, 238, 0.55)';
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.ellipse(headX, headY, 80, 115, 0, 0, 2 * Math.PI);
              ctx.stroke();

              // Interconnected biometric triangulation lines
              ctx.strokeStyle = 'rgba(34, 211, 238, 0.12)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.ellipse(headX, headY, 60, 85, 0, 0, 2 * Math.PI);
              ctx.ellipse(headX, headY, 35, 55, 0, 0, 2 * Math.PI);
              ctx.stroke();

              ctx.strokeStyle = 'rgba(34, 211, 238, 0.22)';
              ctx.beginPath();
              // Forehead to mouth mapping
              ctx.moveTo(headX, headY - 80); // forehead
              ctx.lineTo(headX - 30, headY - 15); // left eye
              ctx.lineTo(headX + 30, headY - 15); // right eye
              ctx.lineTo(headX, headY - 80);
              // Nose bridge
              ctx.lineTo(headX, headY + 20); // nose tip
              ctx.lineTo(headX - 30, headY - 15);
              ctx.moveTo(headX, headY + 20);
              ctx.lineTo(headX + 30, headY - 15);
              // Mouth
              ctx.lineTo(headX + 25, headY + 60);
              ctx.lineTo(headX, headY + 20);
              ctx.lineTo(headX - 25, headY + 60);
              ctx.lineTo(headX, headY + 20);
              ctx.stroke();

              // Labeled Biometric Anchors on avatar
              const landmarks = [
                { x: headX, y: headY - 80, label: "FRON_PT" },
                { x: headX - 30, y: headY - 15, label: "L_PUP" },
                { x: headX + 30, y: headY - 15, label: "R_PUP" },
                { x: headX, y: headY + 20, label: "NSE_ANCH" },
                { x: headX - 25, y: headY + 60, label: "JAW_L" },
                { x: headX + 25, y: headY + 60, label: "JAW_R" }
              ];
              ctx.fillStyle = '#22d3ee';
              landmarks.forEach(pt => {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);
                ctx.fill();
                ctx.font = '8px monospace';
                ctx.fillStyle = '#67e8f9';
                ctx.fillText(pt.label, pt.x + 8, pt.y + 3);
              });

              // Dynamic jaw vector animation
              ctx.strokeStyle = '#34d399';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(headX, headY + 60, 12 + pulseScale, 0, Math.PI, false);
              ctx.stroke();
            }
          }

          // Draw futuristic high-contrast green/red target grids
          const hasInfractions = simulatedGaze !== 'center' || simulatedFace !== 'standard' || simulatedPhone;
          ctx.strokeStyle = hasInfractions ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 211, 238, 0.3)';
          ctx.lineWidth = 1;
          
          for (let step = 40; step < w; step += 40) {
            ctx.beginPath();
            ctx.moveTo(step, 0);
            ctx.lineTo(step, h);
            ctx.stroke();
          }
          for (let step = 40; step < h; step += 40) {
            ctx.beginPath();
            ctx.moveTo(0, step);
            ctx.lineTo(w, step);
            ctx.stroke();
          }

          // Compute matching head coordinate boxes depending on parameters
          if (simulatedFace !== 'absent') {
            const breathingOffset = hasRealVideo ? 0 : Math.sin(Date.now() / 700) * 6;
            const headX = w / 2;
            const headY = h / 2 - 20 + breathingOffset;
            const hRadius = 90;

            // Draw bounding face mask contour
            ctx.strokeStyle = hasInfractions ? '#ef4444' : '#06b6d4';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.ellipse(headX, headY, hRadius - 10, hRadius + 20, 0, 0, 2 * Math.PI);
            ctx.stroke();

            // Eye tracking cursors
            const rx = headX - 35;
            const lx = headX + 35;
            const eyeY = headY - 15;

            // Simulated eye blink trigger
            const blinking = (Date.now() % 4500) < 150;
            ctx.fillStyle = blinking ? '#06b6d4' : '#10b981';
            ctx.beginPath(); 
            ctx.arc(rx, eyeY, blinking ? 1 : 6, 0, 2 * Math.PI); 
            ctx.fill();
            ctx.beginPath(); 
            ctx.arc(lx, eyeY, blinking ? 1 : 6, 0, 2 * Math.PI); 
            ctx.fill();

            // Draw gaze vector lines based on real/simulated directions
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 3;
            
            let vectorOffsetX = 0;
            let vectorOffsetY = 0;
            if (simulatedGaze === 'left') vectorOffsetX = -50;
            if (simulatedGaze === 'right') vectorOffsetX = 50;
            if (simulatedGaze === 'up') vectorOffsetY = -50;
            if (simulatedGaze === 'down') vectorOffsetY = 50;

            if (!blinking) {
              ctx.beginPath();
              ctx.moveTo(rx, eyeY);
              ctx.lineTo(rx + vectorOffsetX, eyeY + vectorOffsetY);
              ctx.moveTo(lx, eyeY);
              ctx.lineTo(lx + vectorOffsetX, eyeY + vectorOffsetY);
              ctx.stroke();
            }

            // Labels around pupils
            ctx.fillStyle = '#c084fc';
            ctx.font = 'bold 10px monospace';
            ctx.fillText(`GAZE VECTOR: [Y:${simulatedGaze.toUpperCase()}]`, lx - 70, eyeY - 20);

            // Bounding box for companion person if "multiple faces" is simulated
            if (simulatedFace === 'multiple') {
              ctx.strokeStyle = '#ef4444';
              ctx.lineWidth = 2;
              ctx.strokeRect(30, 110, 190, h - 160);
              ctx.fillStyle = '#ef4444';
              ctx.font = 'bold 10px monospace';
              ctx.fillText("⚠️ EXTRA FACE DETECTED", 35, 130);

              ctx.beginPath();
              ctx.ellipse(120, 210, 40, 55, 0, 0, 2 * Math.PI);
              ctx.stroke();
            }

            // Bounding box for phone if simulated
            if (simulatedPhone) {
              ctx.strokeStyle = '#f59e0b';
              ctx.lineWidth = 2;
              ctx.strokeRect(w - 170, h - 210, 90, 150);
              ctx.fillStyle = '#f59e0b';
              ctx.font = 'bold 10px monospace';
              ctx.fillText("⚠️ CELL PHONE (CONTRABAND)", w - 165, h - 190);
            }
          } else {
            // "Face Absent" overlay check
            ctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 16px monospace';
            ctx.fillText("⚠️ PROCTOR LOCK: PROFILE ABSENT", w / 2 - 150, h / 2);
          }

          // Top statistics overlay inside frame
          ctx.fillStyle = 'rgba(9, 13, 22, 0.88)';
          ctx.fillRect(10, 10, w - 20, 32);
          ctx.strokeStyle = '#1e293b';
          ctx.strokeRect(10, 10, w - 20, 32);
          
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 10px monospace';
          const faceCountText = simulatedFace === 'multiple' ? 'FACES: 2 (INFRACTION)' : (simulatedFace === 'absent' ? 'FACES: 0 (LOCK)' : 'FACES: 1 (OK)');
          const phoneCountText = simulatedPhone ? 'DEVICES: MOBILE DETECTED' : 'DEVICES: NIL';
          const labelPrefix = isVirtualMode ? 'BIOMETRIC VIRTUAL SIMULATOR' : 'CV ENGINE: LIVE WEBCAM';
          ctx.fillText(`${labelPrefix} | ${faceCountText} | G-VEC: [${simulatedGaze.toUpperCase()}] | ${phoneCountText}`, 20, 29);
        }
      }

      if (isCameraOn && active) {
        frameAnimationRef.current = requestAnimationFrame(drawOverlay);
      }
    };

    if (isCameraOn) {
      drawOverlay();
    }

    return () => {
      active = false;
      if (frameAnimationRef.current) cancelAnimationFrame(frameAnimationRef.current);
    };
  }, [isCameraOn, isVirtualMode, simulatedGaze, simulatedFace, simulatedPhone, cameraError, stream]);

  // Dynamic Risk pill formatting
  const getRiskLevelDetails = () => {
    if (riskScore === 0) return { title: 'NONE', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5', icon: CheckCircle };
    if (riskScore <= 20) return { title: 'LOW RISK', color: 'text-green-400 border-green-500/20 bg-green-500/5', icon: ShieldAlert };
    if (riskScore <= 45) return { title: 'MEDIUM RISK', color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5', icon: AlertTriangle };
    return { title: 'HIGH WARNING', color: 'text-red-400 border-red-500/25 bg-red-500/5 animate-pulse', icon: AlertOctagon };
  };

  const riskDetails = getRiskLevelDetails();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* 1. Interactive Header and Scoring HUD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2.5">
            <ShieldAlert className="text-rose-500 animate-pulse" />
            AI Interview Integrity Monitor
          </h2>
          <p className="text-slate-400 text-xs font-medium">
            Active biometrics analytics, continuous head-gaze mapping, and hardware-accelerated anti-cheat telemetry.
          </p>
        </div>

        {/* HUD Scoreboard */}
        <div className="flex gap-3 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
          <div className="px-3 border-r border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-500 block">Integrity Score</span>
            <span className={`text-xl font-black font-mono block ${integrityScore >= 80 ? 'text-emerald-400' : integrityScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {integrityScore}%
            </span>
          </div>
          <div className="px-3 border-r border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-500 block">Risk Score</span>
            <span className="text-xl font-black font-mono text-cyan-400 block">{riskScore}/100</span>
          </div>
          <div className="px-3">
            <span className="text-[9px] uppercase font-bold text-slate-500 block">Status Level</span>
            <div className={`mt-0.5 px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${riskDetails.color}`}>
              <riskDetails.icon size={11} />
              {riskDetails.title}
            </div>
          </div>
        </div>
      </div>

      {isInterviewEnded ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-12 text-center border-2 border-red-500 bg-red-950/10 max-w-2xl mx-auto space-y-6"
        >
          <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertOctagon size={40} className="animate-spin animate-duration-3000" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-red-400 uppercase tracking-tight">Interview Disqualified</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your session was auto-terminated because continuous biometrics scanning registered high-severity security malpractice threshold violations ({violations.length}/{violationsLimit}).
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-850/60 max-w-md mx-auto">
            <span className="text-[10px] text-slate-550 uppercase font-mono block font-bold">Aggregated Telemetry File</span>
            <div className="grid grid-cols-2 gap-2 mt-2 text-left font-mono text-xs">
              <div className="text-slate-400">Total Infractions:</div>
              <div className="text-red-400 font-bold justify-self-end">{violations.length} logged</div>
              <div className="text-slate-400">Critical Phone Flags:</div>
              <div className="text-yellow-400 font-bold justify-self-end">{violations.filter(v => v.type.includes('Phone')).length}</div>
              <div className="text-slate-400">Final Integrity Rank:</div>
              <div className="text-cyan-400 font-bold justify-self-end">VOID (0%)</div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleClearHistory}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)] cursor-pointer"
            >
              Reset Shield and Restart Session
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 2. Left Column: Camera and Active View (8 columns on large screens) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Camera Box */}
            <div className="glass rounded-2xl p-5 border border-slate-850 bg-slate-900/10">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isCameraOn ? 'bg-rose-500 animate-ping' : 'bg-slate-700'}`} />
                  <span className="text-xs font-black uppercase text-slate-300 tracking-wider">Active Room Proctored Feed</span>
                </div>
                <div className="flex gap-2 items-center">
                  {isCameraOn && (
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider hidden sm:flex items-center gap-1 border ${
                      isVirtualMode 
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {isVirtualMode ? 'Virtual Simulator' : 'Physical Webcam'}
                    </span>
                  )}
                  <button
                    onClick={isCameraOn ? stopCamera : startCamera}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                      isCameraOn 
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20' 
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
                    }`}
                  >
                    {isCameraOn ? 'Close Feed' : 'Start Feed'}
                  </button>
                </div>
              </div>

              {isCameraOn ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-850">
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
                  />
                  <canvas 
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                  />

                  {/* Looking Away active ticking notification */}
                  {isLookingAway && (
                    <div className="absolute bottom-4 left-4 bg-red-950/90 border border-red-500/40 text-red-400 p-3 rounded-xl flex items-center gap-3 shadow-2xl z-20 font-mono text-[10px]">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping shrink-0" />
                      <div>
                        <div className="font-extrabold uppercase tracking-wide">Continuous Glance Infraction</div>
                        <div className="text-slate-400 font-bold mt-0.5">Looking Away: <span className="font-black text-rose-450 text-xs">{lookAwayTimer}s</span> / 5.0s max</div>
                      </div>
                    </div>
                  )}

                  {/* Multiple Faces notification */}
                  {simulatedFace === 'multiple' && (
                    <div className="absolute top-12 left-4 bg-red-950/90 border border-red-500/30 text-rose-400 px-3 py-1.5 rounded-lg font-mono text-[10px] animate-pulse">
                      👥 MULTI-CANDIDATE ALERT (PROHIBITED)
                    </div>
                  )}

                  {/* Phone check notification */}
                  {simulatedPhone && (
                    <div className="absolute top-12 right-4 bg-amber-950/90 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg font-mono text-[10px] animate-pulse">
                      📱 DEVICE FLAG: PHONE SUSPICION LOCK
                    </div>
                  )}

                  {/* Watermark identifier */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/90 border border-slate-800 text-[9px] text-slate-500 font-mono px-2 py-1 rounded select-none">
                    BIOMETRIC TARGET ACTIVE
                  </div>
                </div>
              ) : (
                <div 
                  className="aspect-video bg-slate-950/40 rounded-xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-850 hover:border-cyan-500/20 transition-all cursor-default"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center mb-3 text-cyan-400">
                    <Camera size={20} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-300">Live Telemetry Feed Offline</h4>
                  <p className="text-[10px] text-slate-500 max-w-sm mt-1 leading-normal">
                    Turn on your webcam stream to engage the eye-gaze computer vision engine. We will map facial coordinates dynamically to track integrity.
                  </p>
                  
                  {cameraError && (
                    <p className="text-[10px] text-red-400 mt-2 font-sans bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl max-w-md leading-relaxed text-left">
                      ⚠️ <strong>Camera Error:</strong> Direct webcam feeds are frequently disabled by web browser security inside sandboxed preview iframes. Open the applet in a new tab to grant camera permissions, or use our Sandbox-Safe Virtual Biometrics Simulator!
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-100 text-xs font-black uppercase rounded-lg border border-slate-755 hover:border-slate-655 transition-all cursor-pointer"
                    >
                      Retry Physical Camera
                    </button>
                    <button
                      onClick={startVirtualSimulator}
                      className="px-4 py-2 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 text-xs font-black uppercase rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center gap-1.5"
                    >
                      <Activity size={13} className="animate-pulse" />
                      Start Virtual Face Simulator
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Threshold rules & warnings */}
            {endCountdown !== null && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-xs flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-red-400 animate-spin" />
                  <div>
                    <span className="font-extrabold block">CRITICAL INTEGRITY OUT OF BOUNDS</span>
                    <span>Continuous infractions exceed permitted threshold. Auto terminating interview session.</span>
                  </div>
                </div>
                <div className="text-base font-black font-mono bg-red-955 px-3 py-1 rounded-lg border border-red-500/40">
                  {endCountdown}s
                </div>
              </div>
            )}

            {/* 3. Evidentiary Screenshots Gallery */}
            <div className="glass rounded-2xl p-5 border border-slate-850">
              <div className="flex justify-between items-center border-b border-slate-850/80 pb-3 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <Camera size={15} className="text-cyan-400" />
                  <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Infraction Snapshot Evidence Vault</h4>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Total Saved: {violations.length} images</span>
              </div>

              {violations.length === 0 ? (
                <div className="py-10 text-center font-sans text-xs text-slate-550 border border-dashed border-slate-900 rounded-xl">
                  No captured secure frames. Looking away continuously for 5s or holding phone devices will trigger automatic shutter captures!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {violations.map((v) => (
                    <div 
                      key={v.id} 
                      onClick={() => setActiveScreenshot(v.screenshot)}
                      className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-850 cursor-pointer hover:border-cyan-500/40 transition-all shadow-md select-none"
                    >
                      <img src={v.screenshot} alt="Malpractice snapshot" className="w-full h-24 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-x-0 bottom-0 p-1.5 bg-slate-950/90 backdrop-blur-sm border-t border-slate-900 text-left">
                        <div className="text-[8.5px] truncate text-rose-400 font-mono font-bold leading-none">{v.type}</div>
                        <div className="text-[7.5px] text-slate-550 font-mono mt-0.5">{v.timestamp}</div>
                      </div>
                      <div className="absolute top-1 right-1 p-1 bg-slate-950/70 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={10} className="text-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* 3. Right Column: Controls Panel & Violation Feed (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Target Simulator Controls Dashboard */}
            <div className="glass rounded-2xl p-5 border border-slate-850 bg-slate-900/15">
              <div className="flex items-center gap-1.5 border-b border-slate-850/80 pb-3 mb-4 select-none">
                <Sliders size={15} className="text-purple-400" />
                <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">CV Telemetry Simulator Panel</h4>
              </div>

              <div className="space-y-4">
                
                {/* Rule hint notice */}
                <div className="p-3 bg-cyan-950/15 border border-cyan-500/10 rounded-xl text-[10.5px] text-slate-400 leading-normal">
                  <span className="font-extrabold text-cyan-400 block mb-0.5 font-mono">CV Proctor Guidelines</span>
                  Looking continuously away from center for <strong>over 5 seconds</strong> or displaying mobile contraband creates automated shutter alerts.
                </div>

                {/* Simulated Gaze direction selector */}
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-black uppercase text-slate-500 tracking-wider block">1. Simulated Gaze Angle</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono">
                    {[
                      { key: 'center', label: 'CENTER (OK)' },
                      { key: 'left', label: 'LOOK LEFT' },
                      { key: 'right', label: 'LOOK RIGHT' },
                      { key: 'up', label: 'LOOK UP' },
                      { key: 'down', label: 'LOOK DOWN' }
                    ].map(item => (
                      <button
                        key={item.key}
                        onClick={() => setSimulatedGaze(item.key as any)}
                        className={`py-1.5 px-2 rounded-lg text-center text-[9px] font-bold uppercase transition-all select-none ${
                          simulatedGaze === item.key
                            ? 'bg-purple-500/15 text-purple-400 border border-purple-500/35'
                            : 'bg-slate-950/85 hover:bg-slate-900 text-slate-400 border border-slate-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Face visibility selector */}
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-black uppercase text-slate-500 tracking-wider block">2. Candidate Face Biometrics</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 font-mono">
                    {[
                      { key: 'standard', label: 'STANDARD' },
                      { key: 'absent', label: 'ABSENT' },
                      { key: 'multiple', label: 'MULTI FACE' }
                    ].map(item => (
                      <button
                        key={item.key}
                        onClick={() => setSimulatedFace(item.key as any)}
                        className={`py-1.5 px-2 rounded-lg text-center text-[9px] font-bold uppercase transition-all select-none ${
                          simulatedFace === item.key
                            ? 'bg-purple-500/15 text-purple-400 border border-purple-500/35'
                            : 'bg-slate-950/85 hover:bg-slate-950 text-slate-400 border border-slate-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Usage simulator */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-900 flex justify-between items-center select-none font-sans">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-300 block">3. Cell Phone Contraband</span>
                    <span className="text-[8.5px] text-slate-500 font-bold block mt-0.5">Toggle phone visual flag</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input 
                      type="checkbox" 
                      checked={simulatedPhone} 
                      onChange={(e) => setSimulatedPhone(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500 peer-checked:after:bg-slate-955"></div>
                  </label>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-850/80 pt-4 space-y-3">
                  <span className="text-[9.5px] font-black uppercase text-slate-550 block font-mono">Proctor Safety Locks</span>
                  
                  {/* Infraction threshold selector */}
                  <div className="flex justify-between items-center text-xs text-slate-400 select-none">
                    <span>Violation Alarm threshold:</span>
                    <select
                      value={violationsLimit}
                      onChange={(e) => setViolationsLimit(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-900 rounded px-2 py-0.5 text-[10.5px] font-bold text-slate-300 outline-none"
                    >
                      <option value={2}>2 offenses</option>
                      <option value={3}>3 offenses</option>
                      <option value={4}>4 offenses</option>
                    </select>
                  </div>

                  {/* Auto end simulation state */}
                  <div className="flex justify-between items-center text-xs text-slate-400 select-none">
                    <span>Auto-Disqualify Sessions:</span>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={autoEndOnThreshold} 
                        onChange={(e) => setAutoEndOnThreshold(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-8 h-4.5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-purple-500 peer-checked:after:bg-slate-955"></div>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Infraction logs feed */}
            <div className="glass rounded-2xl p-5 border border-slate-850">
              <div className="flex justify-between items-center border-b border-slate-850/80 pb-3 mb-4 select-none">
                <div className="flex items-center gap-1.5">
                  <Activity size={15} className="text-rose-500" />
                  <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Class Assessment Logs</h4>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="text-[9px] uppercase font-bold text-slate-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
                  title="Purge Proctored Registry Logs"
                >
                  <Trash2 size={11} /> purge system
                </button>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                {violations.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 font-sans leading-relaxed">
                    No active incident filings. Assessment tracking context is clear!
                  </div>
                ) : (
                  violations.map(log => (
                    <div 
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-900 space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-extrabold text-slate-200 block">{log.studentName}</span>
                          <span className="text-[10px] text-slate-550 block mt-0.5">{log.type}</span>
                        </div>
                        <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1.5 rounded font-black border border-rose-500/15">
                          +{log.riskScore} RISK
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono border-t border-slate-900/60 pt-2 font-bold select-none">
                        <span>SECURITY THETA SCANNER</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Screenshot viewer modal */}
      <AnimatePresence>
        {activeScreenshot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveScreenshot(null)}
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
                onClick={() => setActiveScreenshot(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-950 border border-slate-800"
              >
                <X size={16} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-rose-400 font-mono">Biometrics Forensic Snapshot</span>
                <p className="text-xs text-slate-400">Captured at the exact timestamp of infraction telemetry trigger.</p>
              </div>

              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-805">
                <img src={activeScreenshot} alt="Forensic snapshot zoom" className="w-full h-full object-contain" />
              </div>

              <div className="p-3 bg-slate-955 rounded-xl border border-slate-850/60 text-[10px] font-mono text-slate-400 text-left">
                👤 ENROLLED CANDIDATE: ALEX RIVERS | STATUS: TRIAL DISPUTE REVIEWABLE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
