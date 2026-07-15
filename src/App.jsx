import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Settings, 
  Key, 
  Sparkles,
  Menu,
  X,
  Info
} from 'lucide-react';
import RoadmapView from './components/RoadmapView';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import CareerCoach from './components/CareerCoach';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';

function MainApp() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);
  
  // Shared context for chat session
  const [resumeText, setResumeText] = useState('');

  // Load API Key from LocalStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('careerai_api_key') || '';
    setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('careerai_api_key', key);
    setShowSettings(false);
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('careerai_api_key');
  };

  const NavButtons = ({ isMobile = false }) => (
    <>
      <button 
        className={`btn w-full md:w-auto justify-start md:justify-center ${activeTab === 'roadmap' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => { setActiveTab('roadmap'); setIsMobileMenuOpen(false); }}
      >
        <Briefcase size={18} />
        <span>Goal Roadmap</span>
      </button>
      <button 
        className={`btn w-full md:w-auto justify-start md:justify-center ${activeTab === 'resume' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => { setActiveTab('resume'); setIsMobileMenuOpen(false); }}
      >
        <FileText size={18} />
        <span>Resume Reviewer</span>
      </button>
      <button 
        className={`btn w-full md:w-auto justify-start md:justify-center ${activeTab === 'chat' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }}
      >
        <MessageSquare size={18} />
        <span>AI Career Coach</span>
      </button>
    </>
  );

  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)]">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="font-[Outfit] text-xl md:text-2xl font-extrabold tracking-tight text-white">
            Career<span className="text-purple-500">AI</span>
          </span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-3">
          <NavButtons />
        </nav>

        {/* ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            className="btn btn-secondary !p-2 md:!px-4 md:!py-2" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={18} className={showSettings ? 'animate-spin' : ''} />
            <span className="hidden md:inline">Settings</span>
            <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${apiKey ? 'bg-emerald-500 shadow-emerald-500' : 'bg-amber-500 shadow-amber-500'}`}></div>
          </button>
          
          <button 
            className="md:hidden btn btn-secondary !p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0a0f1e]/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-4">
          <NavButtons isMobile={true} />
        </div>
      )}

      {/* SETTINGS DRAWER / DRAWER BACKDROP */}
      {showSettings && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
          <div className="glass-card w-full max-w-md flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Key size={18} className="text-indigo-500" />
                <h3 className="text-lg font-semibold">Gemini API Settings</h3>
              </div>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white text-2xl leading-none">
                &times;
              </button>
            </div>
            
            <div className="my-2">
              <p className="text-sm text-gray-400 mb-3">
                Insert your Google Gemini API Key to enable real-time personalized roadmap generation, deep resume parsing, and coach responses.
              </p>
              
              <div className="flex gap-2 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs text-gray-200 leading-relaxed">
                <Info size={16} className="text-cyan-500 flex-shrink-0" />
                <span>
                  If left blank, CareerAI operates in <strong>Demo Mock Mode</strong>. Keys are stored safely in your browser's localStorage.
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="apiKeyInput">Gemini API Key</label>
              <input 
                id="apiKeyInput"
                type="password" 
                className="input-field font-mono" 
                placeholder="AIzaSy..." 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button className="btn btn-secondary flex-1 justify-center" onClick={handleClearApiKey}>
                Clear
              </button>
              <button className="btn btn-primary flex-[2] justify-center" onClick={() => handleSaveApiKey(apiKey)}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="main-content">
        {activeTab === 'roadmap' && (
          <RoadmapView 
            apiKey={apiKey} 
            userGoal={userGoal}
            setUserGoal={setUserGoal}
            userSkills={userSkills}
            setUserSkills={setUserSkills}
            roadmapData={roadmapData}
            setRoadmapData={setRoadmapData}
          />
        )}
        
        {activeTab === 'resume' && (
          <ResumeAnalyzer 
            apiKey={apiKey}
            setSharedResumeText={setResumeText}
          />
        )}
        
        {activeTab === 'chat' && (
          <CareerCoach 
            apiKey={apiKey}
            context={{
              goal: userGoal,
              skills: userSkills,
              resumeText: resumeText
            }}
          />
        )}
      </main>

      <footer className="text-center p-6 border-t border-white/10 bg-[#0a0f1e]/50 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} CareerAI. Built with React, Tailwind & Gemini AI.</p>
        <p className="text-xs text-gray-500 mt-1">
          Configured: {apiKey ? '🔴 Gemini-1.5-Flash (Live Key)' : '🟢 Self-Contained Demo (Mock AI)'}
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
