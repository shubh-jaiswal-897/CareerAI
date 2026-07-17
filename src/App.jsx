import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Key, Info } from 'lucide-react';
import DashboardHub from './components/DashboardHub';
import RoadmapView from './components/RoadmapView';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import MockInterview from './components/MockInterview';
import CareerCoach from './components/CareerCoach';
import LandingPage from './components/LandingPage';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function ProtectedApp() {
  const savedUser = localStorage.getItem('careerai_current_user');
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  return <MainApp />;
}

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);
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

  return (
    <div className="app-container">
      {/* Reusable Navbar in Dashboard Mode */}
      <Navbar 
        isDashboard={true} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        showSettings={showSettings} 
        setShowSettings={setShowSettings} 
        apiKey={apiKey} 
      />


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
        {activeTab === 'dashboard' && (
          <DashboardHub 
            userGoal={userGoal}
            roadmapData={roadmapData}
            resumeText={resumeText}
            setActiveTab={setActiveTab}
            apiKey={apiKey}
          />
        )}

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

        {activeTab === 'interview' && (
          <MockInterview 
            apiKey={apiKey}
            userGoal={userGoal}
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

      {/* Reusable Footer */}
      <Footer apiKey={apiKey} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<ProtectedApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
