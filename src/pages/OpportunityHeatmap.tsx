import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  Search, 
  DollarSign, 
  Briefcase, 
  Plus, 
  AlertCircle, 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  Home, 
  Info, 
  Building, 
  ArrowRight, 
  CloudLightning,
  Coins
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

// Fetch API Key from defined environments
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim() !== '';

export interface CityHub {
  id: string;
  name: string;
  lat: number;
  lng: number;
  openings: number;
  avgSalary: string;
  growth: string;
  remoteIndex: string;
  topSkill: string;
}

const DEFAULT_HUBS: CityHub[] = [
  { id: 'sf', name: 'San Francisco, USA', lat: 37.7749, lng: -122.4194, openings: 12450, avgSalary: '$165,000', growth: '+15%', remoteIndex: '72%', topSkill: 'AI / LLMs' },
  { id: 'nyc', name: 'New York, USA', lat: 40.7128, lng: -74.0060, openings: 9800, avgSalary: '$148,000', growth: '+8%', remoteIndex: '65%', topSkill: 'Fintech / React' },
  { id: 'sea', name: 'Seattle, USA', lat: 47.6062, lng: -122.3321, openings: 8100, avgSalary: '$155,000', growth: '+6%', remoteIndex: '70%', topSkill: 'Cloud / Go' },
  { id: 'aus', name: 'Austin, USA', lat: 30.2672, lng: -97.7431, openings: 5900, avgSalary: '$128,000', growth: '+19%', remoteIndex: '74%', topSkill: 'SaaS / Django' },
  { id: 'tor', name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, openings: 6200, avgSalary: '$95,000', growth: '+11%', remoteIndex: '62%', topSkill: 'React / Node' },
  { id: 'ldn', name: 'London, UK', lat: 51.5074, lng: -0.1278, openings: 7400, avgSalary: '$98,000', growth: '+12%', remoteIndex: '58%', topSkill: 'TypeScript / Nest' },
  { id: 'ber', name: 'Berlin, Germany', lat: 52.5200, lng: 13.4050, openings: 4905, avgSalary: '$88,000', growth: '+14%', remoteIndex: '60%', topSkill: 'Go / K8s' },
  { id: 'ams', name: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041, openings: 3800, avgSalary: '$94,000', growth: '+9%', remoteIndex: '64%', topSkill: 'Frontend / Vue' },
  { id: 'zur', name: 'Zurich, Switzerland', lat: 47.3769, lng: 8.5417, openings: 2100, avgSalary: '$145,000', growth: '+5%', remoteIndex: '42%', topSkill: 'Fintech / C++' },
  { id: 'blr', name: 'Bangalore, India', lat: 12.9716, lng: 77.5946, openings: 18200, avgSalary: '$45,000', growth: '+28%', remoteIndex: '48%', topSkill: 'Full Stack / AWS' },
  { id: 'mysore', name: 'Mysore, India', lat: 12.2958, lng: 76.6394, openings: 3800, avgSalary: '$32,000', growth: '+22%', remoteIndex: '75%', topSkill: 'Infor / Incture / React Dev' },
  { id: 'mysorekrs', name: 'Mysore K.R.S., India', lat: 12.4262, lng: 76.5724, openings: 1500, avgSalary: '$28,000', growth: '+15%', remoteIndex: '60%', topSkill: 'Smart Energy IoT / C++' },
  { id: 'googleliveloc', name: 'Google Live Location', lat: 12.3392, lng: 76.6190, openings: 10500, avgSalary: '$55,000', growth: '+32%', remoteIndex: '72%', topSkill: 'MERN / AWS Cloud Architect' },
  { id: 'sgp', name: 'Singapore', lat: 1.3521, lng: 103.8198, openings: 5100, avgSalary: '$110,000', growth: '+16%', remoteIndex: '50%', topSkill: 'Node / Devops' },
  { id: 'tok', name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, openings: 4300, avgSalary: '$82,000', growth: '+4%', remoteIndex: '30%', topSkill: 'Embedded / Rust' },
  { id: 'syd', name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, openings: 3100, avgSalary: '$96,000', growth: '+8%', remoteIndex: '56%', topSkill: 'Python / Flask' },
];

const VIRTUAL_COORDINATES: {[key: string]: {x: number, y: number}} = {
  sf: { x: 12, y: 32 },
  nyc: { x: 28, y: 30 },
  sea: { x: 12, y: 22 },
  aus: { x: 18, y: 39 },
  tor: { x: 25, y: 22 },
  ldn: { x: 43, y: 20 },
  ber: { x: 54, y: 21 },
  ams: { x: 48, y: 24 },
  zur: { x: 53, y: 28 },
  blr: { x: 69, y: 55 },
  mysore: { x: 62, y: 64 },
  mysorekrs: { x: 56, y: 67 },
  googleliveloc: { x: 67, y: 44 },
  sgp: { x: 75, y: 64 },
  tok: { x: 84, y: 37 },
  syd: { x: 91, y: 78 }
};

const getLabelStyle = (id: string): string => {
  const directions: {[key: string]: string} = {
    // USA / Canada
    sf: 'right-7 top-1/2 -translate-y-1/2', // Left of dot
    sea: 'bottom-7 left-1/2 -translate-x-1/2', // Above dot
    aus: 'top-7 left-1/2 -translate-x-1/2', // Below dot
    tor: 'bottom-7 left-1/2 -translate-x-1/2', // Above dot
    nyc: 'left-7 top-1/2 -translate-y-1/2', // Right of dot
    
    // Europe
    ldn: 'bottom-7 left-1/2 -translate-x-1/2', // Above dot
    ams: 'right-7 top-1/2 -translate-y-1/2', // Left of dot
    ber: 'bottom-7 left-1/2 -translate-x-1/2', // Above dot
    zur: 'top-7 left-1/2 -translate-x-1/2', // Below dot
    
    // India
    blr: 'left-7 top-1/2 -translate-y-1/2', // Right of dot
    mysore: 'right-7 top-1/2 -translate-y-1/2', // Left of dot
    mysorekrs: 'top-7 left-1/2 -translate-x-1/2', // Below dot
    googleliveloc: 'bottom-7 left-1/2 -translate-x-1/2', // Above dot
    
    // Far East / Oceania
    sgp: 'top-7 left-1/2 -translate-x-1/2', // Below dot
    tok: 'left-7 top-1/2 -translate-y-1/2', // Right of dot
    syd: 'bottom-7 left-1/2 -translate-x-1/2', // Above dot
  };
  
  return directions[id] || 'left-7 top-1/2 -translate-y-1/2';
};


// Map custom cities to stable logical coordinates
const getCoordinates = (id: string, name: string): {x: number, y: number} => {
  if (VIRTUAL_COORDINATES[id]) return VIRTUAL_COORDINATES[id];
  
  const nameLower = name.toLowerCase();
  if (nameLower.includes('usa') || nameLower.includes('america') || nameLower.includes('ca') || nameLower.includes('tx')) {
    return { x: 22 + (id.charCodeAt(0) % 8), y: 31 + (id.charCodeAt(id.length - 1 || 0) % 6) };
  }
  if (nameLower.includes('europe') || nameLower.includes('germany') || nameLower.includes('uk') || nameLower.includes('france') || nameLower.includes('netherlands')) {
    return { x: 50 + (id.charCodeAt(0) % 5), y: 23 + (id.charCodeAt(id.length - 1 || 0) % 4) };
  }
  if (nameLower.includes('asia') || nameLower.includes('india') || nameLower.includes('china') || nameLower.includes('singapore') || nameLower.includes('japan')) {
    return { x: 72 + (id.charCodeAt(0) % 10), y: 50 + (id.charCodeAt(id.length - 1 || 0) % 10) };
  }
  // Safe default within responsive bound
  return { x: 40 + (id.charCodeAt(0) % 30), y: 35 + (id.charCodeAt(id.length - 1 || 0) % 25) };
};

// Generate customizable mock statistics for detailed city profiles
const getCityAnalytics = (hub: CityHub) => {
  const name = hub.name.split(',')[0];
  switch (hub.id) {
    case 'sf':
      return {
        rentTier: 'Ultra High',
        localStatus: 'Neural Core Hotspot',
        advisory: 'The planetary command cluster of AI. Scale-focused systems and neural networks are matching high compensation limits but expect grueling validation processes.',
        topCompanies: ['CognitiveAI', 'Vertex Scale', 'OpenFoundation', 'OmniSys']
      };
    case 'nyc':
      return {
        rentTier: 'Extreme High',
        localStatus: 'Fintech Surge Hub',
        advisory: 'Trading engines, latency critical interfaces, and hyper-reliable REST clusters rule. Perfect for developers with clean multi-threading expertise.',
        topCompanies: ['QuantGate', 'PrimeFintech', 'ApexAlpha', 'LedgerTrust']
      };
    case 'sea':
      return {
        rentTier: 'Very High',
        localStatus: 'Cloud Architecture Core',
        advisory: 'Large scale distributed microservices, Docker orchestration, and high volume databases represent the core regional tech stack here.',
        topCompanies: ['SovereignCloud', 'Vortex Systems', 'ScaleNetwork', 'ApexCompute']
      };
    case 'aus':
      return {
        rentTier: 'Moderate',
        localStatus: 'SaaS Influx Zone',
        advisory: 'A robust remote-friendly paradise. Exceptional creative flow and low cost of living index. A massive hotbed for full stack Django/React devs.',
        topCompanies: ['AtelierSaaS', 'SvelteCraft', 'ModernFlow', 'CloudScale']
      };
    case 'ldn':
      return {
        rentTier: 'High',
        localStatus: 'Global Fintech Port',
        advisory: 'A rich mixture of high-end startups and institutional banking hubs. High affinity for strongly typed modular structures like TypeScript or Nest.',
        topCompanies: ['Finova', 'Neobank Systems', 'GlobalSettle', 'SavantWeb']
      };
    case 'ber':
      return {
        rentTier: 'Moderate',
        localStatus: 'Creative Infrastructure Haven',
        advisory: 'Amazing remote workspaces and solid team synergy cultures. High affinity for Go frameworks, Kubernetes scaling, and open source architectures.',
        topCompanies: ['VanguardLabs', 'ScyllaSystems', 'KryptonWeb', 'CoreDevops']
      };
    case 'blr':
      return {
        rentTier: 'Low Cost',
        localStatus: 'Hyper-Hiring Force',
        advisory: 'The dense silicon capital of India. Sizzling hiring velocity and hyper-growth scaling. AWS orchestration, cloud architecture, and full stack React are extreme priorities.',
        topCompanies: ['NeuralNode', 'IndusScale', 'ZenithEng', 'ScribeSaaS']
      };
    case 'mysore':
      return {
        rentTier: 'Very Low Cost',
        localStatus: 'Emerging Cultural Tech Corridor',
        advisory: 'Academic-rich corridor with clean green campuses. Heavy hiring presence for regional enterprises such as Infor, Incture, and IT delivery centers. Highly favorable for React, modern web development, and DSA-qualified graduates.',
        topCompanies: ['Incture Technologies', 'Infor Mysore', 'L&T Infotech', 'Wipro Technologies']
      };
    case 'mysorekrs':
      return {
        rentTier: 'Minimal',
        localStatus: 'IoT Smart Infrastructure Sector',
        advisory: 'K.R.S. (Kannambadi) corridor. Specializes in advanced hydrology telemetry, smart manufacturing automation, energy grids, and embedded C++/Go infrastructures.',
        topCompanies: ['KRS Irrigation Automation Labs', 'Vidyavardhaka IoT Systems', 'PowerGrid Telemetries']
      };
    case 'googleliveloc':
      return {
        rentTier: 'Variable / Dynamic',
        localStatus: 'Google Live Location Channel',
        advisory: 'Synthesizing global and regional telemetries under matching criteria. Derived placements cover top tier MNC positions such as Google India development centers.',
        topCompanies: ['Google LLC', 'Amazon Web Services', 'Microsoft Corporation', 'Incture Innovations']
      };
    case 'tok':
      return {
        rentTier: 'Moderate',
        localStatus: 'Embedded System Hub',
        advisory: 'Ultra high stability targets, low-level Rust/C++ structures, and heavy manufacturing interfaces. Prized for perfect structural safety standards.',
        topCompanies: ['CyberdyneCore', 'ZenithRobotics', 'KyotoMicro', 'NeoTokyoSystems']
      };
    default:
      return {
        rentTier: 'Moderate',
        localStatus: 'Emerging Market Hotspot',
        advisory: 'Fast growing technological center. High expansion velocity with solid regional subsidies, creating an excellent workspace for software creators.',
        topCompanies: ['PrismAlpha', 'LocalHub Technologies', 'QuantumSaaS']
      };
  }
};

export default function OpportunityHeatmap() {
  const [hubs, setHubs] = useState<CityHub[]>(DEFAULT_HUBS);
  const [selectedHub, setSelectedHub] = useState<CityHub | null>(DEFAULT_HUBS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Google Maps reactive positioning states
  const [center, setCenter] = useState({ lat: 25.0, lng: 10.0 });
  const [zoom, setZoom] = useState(2);
  const [showInstruction, setShowInstruction] = useState(true);

  // Query browser-level geolocation on mount to auto-position the live coordinate maps
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Live maps coordinates detected: ${latitude}, ${longitude}`);
          
          const liveHub: CityHub = {
            id: 'live_user_loc',
            name: 'Your Live Location, India & Local',
            lat: latitude,
            lng: longitude,
            openings: 8650,
            avgSalary: '$118,500',
            growth: '+24%',
            remoteIndex: '69%',
            topSkill: 'TypeScript / React & Node'
          };

          // Center maps on live user's sector
          setCenter({ lat: latitude, lng: longitude });
          setZoom(5);

          setHubs(prev => {
            if (prev.some(h => h.id === 'live_user_loc')) return prev;
            return [liveHub, ...prev];
          });
          setSelectedHub(liveHub);
        },
        (error) => {
          console.warn("Geolocation check blocked or unavailable:", error.message);
          // Standard graceful default alignment for high-density competitive systems (Singapore/Blr corridor)
          setCenter({ lat: 12.9716, lng: 77.5946 }); 
          setZoom(3);
        }
      );
    }
  }, []);

  // Sync google map location whenever a hub/city is selected
  useEffect(() => {
    if (selectedHub) {
      setCenter({ lat: selectedHub.lat, lng: selectedHub.lng });
      setZoom(selectedHub.id === 'live_user_loc' ? 8 : 6);
    }
  }, [selectedHub]);
  
  // Dynamic settings for Heatmap visualization
  const [heatmapBasis, setHeatmapBasis] = useState<'listings' | 'salary' | 'growth'>('listings');
  const [techFocus, setTechFocus] = useState<'all' | 'ai' | 'frontend' | 'cloud' | 'rust'>('all');

  // New market center creation form state
  const [showAddHubForm, setShowAddHubForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formOpenings, setFormOpenings] = useState(5000);
  const [formSalary, setFormSalary] = useState(115000);
  const [formGrowth, setFormGrowth] = useState(15);
  const [formSkill, setFormSkill] = useState('React / Node');

  // Trigger custom market insertion
  const handleAddHub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newId = formName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 6) || 'custom_' + Date.now();
    
    // Create new node object
    const newHub: CityHub = {
      id: newId,
      name: formName + ', Custom Zone',
      lat: 30.0 + (Math.random() - 0.5) * 20, // Approximate random valid coords for Live Map
      lng: -10.0 + (Math.random() - 0.5) * 40,
      openings: formOpenings,
      avgSalary: '$' + formSalary.toLocaleString(),
      growth: `+${formGrowth}%`,
      remoteIndex: '62%',
      topSkill: formSkill
    };

    const updated = [newHub, ...hubs];
    setHubs(updated);
    setSelectedHub(newHub);
    
    // Reset form fields
    setFormName('');
    setShowAddHubForm(false);
  };

  // Dynamically calculate interactive heatmap values based on filters
  const getWeightedHeatMetrics = (hub: CityHub) => {
    let baseValue = 0.5;

    // 1. Evaluate baseline metric factor
    if (heatmapBasis === 'listings') {
      baseValue = hub.openings / 19000;
    } else if (heatmapBasis === 'salary') {
      const numRaw = parseInt(hub.avgSalary.replace(/[^0-9]/g, ''), 10);
      baseValue = (numRaw - 35000) / 135000;
    } else if (heatmapBasis === 'growth') {
      const numRaw = parseInt(hub.growth.replace(/[^0-9-]/g, ''), 10);
      baseValue = numRaw / 30;
    }

    // 2. Adjust weight according to selected technical category filter
    let multiplier = 1.0;
    const skillLower = hub.topSkill.toLowerCase();
    
    if (techFocus === 'ai') {
      if (skillLower.includes('ai') || skillLower.includes('llm')) multiplier = 1.4;
      else multiplier = 0.45;
    } else if (techFocus === 'frontend') {
      if (skillLower.includes('react') || skillLower.includes('frontend') || skillLower.includes('vue')) multiplier = 1.4;
      else multiplier = 0.45;
    } else if (techFocus === 'cloud') {
      if (skillLower.includes('cloud') || skillLower.includes('aws') || skillLower.includes('k8s') || skillLower.includes('devops')) multiplier = 1.4;
      else multiplier = 0.45;
    } else if (techFocus === 'rust') {
      if (skillLower.includes('rust') || skillLower.includes('systems') || skillLower.includes('embedded')) multiplier = 1.4;
      else multiplier = 0.45;
    }

    const finalFactor = Math.max(0.12, Math.min(1.0, baseValue * multiplier));

    // Dynamic color coding spectrum representation
    let color = '#a855f7'; // Low (Purple)
    if (finalFactor > 0.65) {
      color = '#f97316'; // High (Red / Orange)
    } else if (finalFactor > 0.35) {
      color = '#22d3ee'; // Mid (Cyan)
    }

    return {
      radius: Math.round(35 + finalFactor * 105), // Radius range: 35px to 140px
      opacity: 0.15 + finalFactor * 0.4,       // Opacity range: 15% to 55%
      color,
      factor: finalFactor
    };
  };

  // Filtering based on search query
  const filteredHubs = hubs.filter(hub => 
    hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hub.topSkill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-focus and highlight to prevent clutter if exactly one matches search
  useEffect(() => {
    if (filteredHubs.length === 1 && filteredHubs[0].id !== selectedHub?.id) {
      setSelectedHub(filteredHubs[0]);
    }
  }, [searchQuery, filteredHubs.length]);

  const selectedHubAnalytics = selectedHub ? getCityAnalytics(selectedHub) : null;
  const activeHeatBasisInfo = {
    listings: { label: 'Hiring Openings', unit: 'available jobs', color: 'text-orange-400' },
    salary: { label: 'Average Annual Comp', unit: 'annual median USD', color: 'text-cyan-400' },
    growth: { label: 'Yearly Momentum %', unit: 'YoY scale percentage', color: 'text-purple-400' }
  }[heatmapBasis];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Globe className="text-cyan-400" />
            Interactive Career Opportunity Heatmap
          </h2>
          <p className="text-slate-400 text-sm">Real-time geographic distribution of developer roles, salaries, and regional tech cluster weights.</p>
        </div>
        
        {/* Metric selection controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 mr-1 flex items-center gap-1">
            <Sliders size={12} /> Heat Value Basis:
          </span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900">
            {(['listings', 'salary', 'growth'] as const).map(basis => (
              <button
                key={basis}
                onClick={() => setHeatmapBasis(basis)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${heatmapBasis === basis ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shadow-sm' : 'text-slate-400 hover:text-slate-200 bg-transparent border border-transparent'}`}
              >
                {basis === 'listings' ? 'Openings' : basis === 'salary' ? 'Comp Level' : 'Growth %'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Hand Actions (Interactive controls, search & add tools) - 4 Cols */}
        <div className="lg:col-span-4 space-y-5 flex flex-col">
          
          {/* Tech cluster focus selector tab */}
          <div className="glass rounded-2xl p-4.5 space-y-2.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
              <Sparkles size={11} className="text-cyan-400" /> Technological Affinity Weighted Filter
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['all', 'ai', 'frontend', 'cloud', 'rust'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setTechFocus(f)}
                  className={`py-2 text-[11px] font-bold rounded-lg border text-center transition-all ${techFocus === f ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400' : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800'}`}
                >
                  {f === 'all' && 'All Technology'}
                  {f === 'ai' && 'AI & LLM Focused'}
                  {f === 'frontend' && 'React / Frontend'}
                  {f === 'cloud' && 'Cloud & DevOps'}
                  {f === 'rust' && 'Systems & Rust'}
                </button>
              ))}
            </div>
          </div>

          {/* List Search Hub Tool */}
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Search className="text-slate-500 shrink-0" size={18} />
            <input 
              type="text" 
              placeholder="Search by city name or core language..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-slate-200 text-xs w-full focus:outline-none"
            />
          </div>

          {/* Action button to insert customized marketplace nodes */}
          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-1.5">
            <button
              onClick={() => setShowAddHubForm(!showAddHubForm)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-900/50 hover:bg-slate-900 rounded-xl transition-all text-xs text-slate-300 font-bold border border-slate-900 hover:border-slate-800"
            >
              <span className="flex items-center gap-2 text-cyan-400">
                <Plus size={14} /> Inject Custom Hub Node
              </span>
              <span className="text-[10px] font-mono text-slate-500">Add market</span>
            </button>

            {/* Ingestion form sliding visibility */}
            <AnimatePresence>
              {showAddHubForm && (
                <motion.form 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleAddHub}
                  className="overflow-hidden px-3.5 py-4 space-y-4 text-xs"
                >
                  <div className="space-y-1">
                    <label className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider">City / Hub Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Austin, Toronto, Singapore" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider">Estimated Listings</label>
                      <input 
                        type="number" 
                        min="500"
                        max="25000"
                        value={formOpenings}
                        onChange={(e) => setFormOpenings(parseInt(e.target.value) || 5000)}
                        className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider">Median Comp ($)</label>
                      <input 
                        type="number" 
                        min="20000"
                        max="200000"
                        value={formSalary}
                        onChange={(e) => setFormSalary(parseInt(e.target.value) || 100000)}
                        className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider">Growth Factor (%)</label>
                      <input 
                        type="number" 
                        min="1"
                        max="40"
                        value={formGrowth}
                        onChange={(e) => setFormGrowth(parseInt(e.target.value) || 12)}
                        className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider">Focus Stack Label</label>
                      <select 
                        value={formSkill}
                        onChange={(e) => setFormSkill(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                      >
                        <option>AI / LLMs</option>
                        <option>React / Node</option>
                        <option>Cloud / Go</option>
                        <option>TypeScript / Nest</option>
                        <option>Embedded / Rust</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all rounded-lg text-xs tracking-wider"
                  >
                    DEPLOY GEOGRAPHIC NODE
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Standings list box for quick selection */}
          <div className="glass rounded-3xl p-4.5 flex-1 max-h-[280px] lg:max-h-[350px] overflow-y-auto space-y-2 custom-scrollbar">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2 mt-0.5 block">Market Center Standings</h3>
            
            <div className="space-y-1.5">
              {filteredHubs.map(hub => {
                const isHubSelected = selectedHub?.id === hub.id;
                const heatMetrics = getWeightedHeatMetrics(hub);
                
                return (
                  <div 
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    className={`flex justify-between items-center p-2.5 rounded-xl cursor-pointer transition-all border ${isHubSelected ? 'bg-cyan-950/20 border-cyan-400/40 text-cyan-400' : 'bg-slate-900/10 border-transparent hover:border-slate-800 hover:bg-slate-900/30'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <MapPin size={15} className={isHubSelected ? 'text-cyan-400' : 'text-slate-500'} />
                        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: heatMetrics.color }} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{hub.name.split(',')[0]}</h4>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">{hub.topSkill}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-300 block">
                        {heatmapBasis === 'listings' ? hub.openings.toLocaleString() : heatmapBasis === 'salary' ? hub.avgSalary : hub.growth}
                      </span>
                      <span className="text-[8px] font-bold text-slate-500 block uppercase">
                        {heatmapBasis === 'listings' ? 'Openings' : heatmapBasis === 'salary' ? 'Avg Cap' : 'YoY Growth'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Columns (Glow Map Visual Component + Expanded Analytics Grid) - 8 Cols */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* THE HEATMAP CANVAS CONTAINER */}
          <div className="relative min-h-[440px] lg:min-h-[480px] glass rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col">
            
            {hasValidKey ? (
              /* GOOGLE MAPS ACTIVE ENVIRONMENT (Exposes custom HTML markers with concentric glowing radial metrics) */
              <div className="w-full h-full min-h-[440px] lg:min-h-[480px] relative flex flex-col flex-1">
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    center={center}
                    zoom={zoom}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{width: '100%', height: '100%', flex: 1}}
                    gestureHandling="cooperative"
                  >
                  {filteredHubs.map(hub => {
                    const isSelected = selectedHub?.id === hub.id;
                    const heatWeight = getWeightedHeatMetrics(hub);
                    
                    return (
                      <AdvancedMarker
                        key={hub.id}
                        position={{ lat: hub.lat, lng: hub.lng }}
                        onClick={() => setSelectedHub(hub)}
                      >
                        <div className="relative flex items-center justify-center cursor-pointer pointer-events-auto" style={{ width: '40px', height: '40px' }}>
                          
                          {/* Dynamically sizing and colored glowing heatmap element */}
                          <div 
                            style={{
                              position: 'absolute',
                              width: `${heatWeight.radius}px`,
                              height: `${heatWeight.radius}px`,
                              borderRadius: '50%',
                              background: `radial-gradient(circle, ${heatWeight.color}60 0%, ${heatWeight.color}10 40%, transparent 75%)`,
                              pointerEvents: 'none',
                              transform: 'translate(-50%, -50%)',
                              top: '50%',
                              left: '50%',
                              transition: 'all 0.4s ease-out'
                            }} 
                          />
                          
                          {/* Concentric point */}
                          <div 
                            className="bg-slate-900 border-2 rounded-full flex items-center justify-center transition-all shadow-md"
                            style={{
                              width: isSelected ? '18px' : '12px',
                              height: isSelected ? '18px' : '12px',
                              borderColor: isSelected ? '#ffffff' : heatWeight.color,
                            }}
                          >
                            <span 
                              className="rounded-full"
                              style={{
                                width: '4px',
                                height: '4px',
                                backgroundColor: isSelected ? '#22d3ee' : '#ffffff'
                              }}
                            />
                          </div>

                        </div>
                      </AdvancedMarker>
                    );
                  })}
                </Map>
              </APIProvider>
            </div>
            ) : (
              /* HIGH-TECH EMBEDDED DENSITY SIMULATION MAP (Uses percentage geometry mapping instead of absolute pixels) */
              <div className="absolute inset-0 bg-[#060a12] flex flex-col justify-between overflow-hidden select-none">
                
                {/* Clean isometric map mesh background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Elegant, high-fidelity SVG world map silhouette backdrop trace */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.25] text-cyan-500/10 pointer-events-none select-none z-0" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" fill="currentColor">
                  {/* North America */}
                  <path d="M 120 100 Q 170 120 200 140 Q 220 120 270 130 T 310 100 T 340 140 T 320 170 T 270 180 T 245 200 T 200 210 Q 170 230 180 270 T 200 300 L 180 310 L 160 290 L 140 240 L 110 220 L 90 200 L 70 170 Z" />
                  {/* South America */}
                  <path d="M 200 300 Q 250 320 260 350 T 240 400 T 230 440 T 215 490 L 195 490 L 200 450 Q 190 400 180 370 T 170 330 Z" />
                  {/* Greenland */}
                  <path d="M 300 60 Q 350 55 360 70 T 330 100 T 280 85 Z" />
                  {/* Africa */}
                  <path d="M 460 240 Q 500 230 540 240 T 585 280 T 595 320 T 580 360 T 565 400 T 540 440 Q 505 470 510 490 Q 480 400 460 350 Q 430 300 445 260 Z" />
                  {/* Eurasia (Europe + Asia) */}
                  <path d="M 440 130 Q 470 120 500 130 T 570 150 T 620 135 T 690 140 T 750 130 Q 820 150 860 130 T 910 160 T 900 200 L 870 210 T 840 190 T 800 220 Q 770 270 840 310 T 870 330 L 840 340 Q 770 310 730 280 Q 690 260 665 305 T 620 320 T 550 300 Q 500 260 470 250 Z" />
                  {/* India Peninsula */}
                  <path d="M 690 260 Q 715 305 725 330 L 705 335 Q 690 300 680 275 Z" />
                  {/* Indochina and Southeast Asia Islands */}
                  <path d="M 770 310 Q 790 340 800 360 L 785 365 T 765 330 Z" />
                  {/* Australia */}
                  <path d="M 820 430 Q 860 435 900 445 T 895 490 T 840 485 T 810 460 Z" />
                </svg>

                {/* Schematics vectors rendering connection lines */}
                <svg className="absolute inset-0 w-full h-full text-slate-800/20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M15,35 L48,23 C52,23 58,24 67,55" fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5" strokeDasharray="1,2" />
                  <path d="M48,23 L82,37 Q90,50 88,76" fill="none" stroke="rgba(34,211,238,0.06)" strokeWidth="0.5" strokeDasharray="1,1" />
                </svg>

                {/* Highly-reactive fluid points rendered in virtual geographical projection */}
                {filteredHubs.map((hub) => {
                  const coord = getCoordinates(hub.id, hub.name);
                  const isHubSelected = selectedHub?.id === hub.id;
                  const heatWeight = getWeightedHeatMetrics(hub);

                  return (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub)}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus:outline-none focus:ring-0 active:scale-95 transition-transform"
                      style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
                    >
                      <div className="relative flex items-center justify-center">
                        
                        {/* Interactive dynamic glow radial envelope */}
                        <div 
                          style={{
                            position: 'absolute',
                            width: `${heatWeight.radius}px`,
                            height: `${heatWeight.radius}px`,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${heatWeight.color}45 0%, ${heatWeight.color}08 45%, transparent 75%)`,
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%)',
                            top: '50%',
                            left: '50%',
                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                          }} 
                        />

                        {/* Ripple ping if active */}
                        {isHubSelected && (
                          <span 
                            className="absolute inline-flex h-14 w-14 rounded-full opacity-35 animate-ping pointer-events-none"
                            style={{ backgroundColor: heatWeight.color }}
                          />
                        )}

                        {/* Hardened physical pinpoint vector */}
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all"
                          style={{ 
                            backgroundColor: isHubSelected ? '#0b1329' : '#030712', 
                            borderColor: isHubSelected ? '#ffffff' : heatWeight.color,
                            transform: isHubSelected ? 'scale(1.2)' : 'scale(1)',
                            boxShadow: isHubSelected ? `0 0 12px ${heatWeight.color}` : 'none'
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full transition-colors"
                            style={{ backgroundColor: isHubSelected ? '#22d3ee' : heatWeight.color }}
                          />
                        </div>

                        {/* Minimalist responsive marker tag */}
                        <span 
                          className={`absolute whitespace-nowrap text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded border transition-all ${getLabelStyle(hub.id)} ${
                            isHubSelected 
                              ? 'bg-slate-100 text-slate-950 border-white font-extrabold scale-105 z-30 shadow-[0_4px_20px_rgba(34,211,238,0.25)]' 
                              : 'bg-slate-950/90 text-slate-300 border-slate-900 shadow-sm z-10'
                          }`}
                        >
                          {hub.name.split(',')[0]}
                        </span>

                      </div>
                    </button>
                  );
                })}

                {/* Overlay Instruction banner if GMAPS key is empty */}
                {showInstruction && (
                  <div className="absolute top-4 left-4 right-4 bg-slate-950/95 border border-slate-900 p-3.5 rounded-2xl flex items-start gap-3 z-20 shadow-2xl relative pr-8">
                    <AlertCircle className="text-cyan-400 shrink-0 mt-0.5 animate-pulse" size={16} />
                    <div className="flex-1 space-y-0.5">
                      <h4 className="text-[11px] font-bold text-slate-200">Simulated Heatmap Canvas Online</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed pr-2">
                        Toggle parameters and technological scopes to see heat zones change. For live Google Maps terrain overlays, append your maps credential in AI Studio secrets <b>(Settings ⚙️ → Secrets → name <code>GOOGLE_MAPS_PLATFORM_KEY</code>)</b>.
                      </p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowInstruction(false)}
                      className="absolute top-3.5 right-3.5 text-slate-500 hover:text-slate-300 font-bold transition-all px-1.5 py-0.5 rounded-md hover:bg-slate-900 hover:border hover:border-slate-850 text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Embedded status footer */}
                <div className="p-3 bg-slate-950/95 border-t border-slate-900/60 flex justify-between items-center text-[9px] font-mono text-slate-500 z-10 select-none">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> SIMULATION OVERLAY ENGINE ACTIVE
                  </span>
                  <span>HUBS RENDERED: {hubs.length} REGIONS</span>
                </div>

              </div>
            )}

            {/* SPECTRUM COLOR LEGEND DRAWER */}
            <div className="p-4 bg-slate-950/95 border-t border-slate-900/70 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4.5 z-10 relative">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 flex-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 self-center md:self-auto shrink-0">Spectral Legend:</span>
                <div className="flex flex-col gap-1.5 flex-1 w-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-orange-500 border border-slate-900" />
                  <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400 px-1">
                    <span>Low Demand</span>
                    <span className="text-slate-200 uppercase font-black">{activeHeatBasisInfo.label}</span>
                    <span>High Demand</span>
                  </div>
                </div>
              </div>
              
              {/* Dynamic summary indicator */}
              <div className="text-center md:text-right text-[10px] font-medium text-slate-400 shrink-0 border-t md:border-t-0 border-slate-900/40 pt-2.5 md:pt-0">
                Active Value Basis: <span className={`font-mono font-bold ${activeHeatBasisInfo.color}`}>{activeHeatBasisInfo.label}</span> ({activeHeatBasisInfo.unit})
              </div>
            </div>

          </div>

          {/* DETAILED REGIONAL BENTO-GRID EXPOSÉ SECTION */}
          <AnimatePresence mode="wait">
            {selectedHub && selectedHubAnalytics && (
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                
                {/* Visual stats and status indicator card - Grid span 1 */}
                <div className="glass rounded-3xl p-5 border-cyan-500/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-cyan-400" size={16} />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Dynamic Market Status</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-100">{selectedHub.name.split(',')[0]}</h3>
                    <span className="inline-block text-[9px] font-mono font-black tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                      {selectedHubAnalytics.localStatus}
                    </span>
                  </div>

                  {(() => {
                    const hasHighSalary = parseInt(selectedHub.avgSalary.replace(/[^0-9]/g, ''), 10) > 110000;
                    const growthNum = parseInt(selectedHub.growth.replace(/[^0-9-]/g, ''), 10);
                    const isHyperscale = growthNum > 15;
                    
                    const compLevel = hasHighSalary && isHyperscale 
                      ? "High (94%) — Intense" 
                      : hasHighSalary 
                        ? "Competitive (85%) — Advanced" 
                        : isHyperscale 
                          ? "Growth Wave (78%) — Fast" 
                          : "Stable (62%) — Balanced";

                    const openingsLevel = selectedHub.openings > 11000 
                      ? "Critical Surplus Core" 
                      : selectedHub.openings > 6000 
                        ? "High Density Network" 
                        : "Sustained Regional Volume";

                    return (
                      <div className="space-y-2 border-t border-slate-900 pt-3 text-[11px] block">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium font-sans">Central Openings Level</span>
                          <span className="font-semibold text-purple-400 font-mono text-[10px]">{openingsLevel}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium font-sans">Competition Difficulty</span>
                          <span className="font-semibold text-cyan-400 font-mono text-[10px]">{compLevel}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium font-sans">YoY Growth Momentum</span>
                          <span className="font-mono text-emerald-400 font-bold text-[10px]">{selectedHub.growth}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium font-sans font-sans">Remote Index Rate</span>
                          <span className="font-mono text-slate-200 font-bold text-[10px]">{selectedHub.remoteIndex}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium font-sans font-sans">Rent & Cost Tier</span>
                          <span className="font-semibold text-orange-400 font-mono text-[10px]">{selectedHubAnalytics.rentTier}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Career and Immigration Tech Advisory Card - Grid span 2 */}
                <div className="glass rounded-3xl p-5 border-purple-500/10 flex flex-col justify-between md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Info className="text-purple-400" size={16} />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Regional Tech Stack Advisory</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      "{selectedHubAnalytics.advisory}"
                    </p>
                  </div>

                  <div className="border-t border-slate-900/60 pt-3 flex flex-wrap gap-2 items-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold mr-1 flex items-center gap-1">
                      <Building size={11} className="text-cyan-400" /> Hot Local Employers:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedHubAnalytics.topCompanies.map(comp => (
                        <span 
                          key={comp}
                          className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-900 hover:border-slate-800 transition-colors"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}

