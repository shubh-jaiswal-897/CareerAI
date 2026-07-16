import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  ArrowRight,
  Home,
  LayoutDashboard,
  Award
} from 'lucide-react';

export default function Navbar({ 
  isDashboard = false, 
  activeTab, 
  setActiveTab, 
  showSettings, 
  setShowSettings, 
  apiKey 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // For now, redirect to landing page
    navigate('/');
  };

  const isLinkActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0f19]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-5.5 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.25)] group-hover:scale-105 transition-all duration-300">
            <Sparkles size={22} className="text-white" />
          </div>
          <span className="font-[Outfit] text-2xl font-extrabold tracking-tight text-white">
            Career<span className="text-purple-500 group-hover:text-purple-400 transition-colors">AI</span>
          </span>
        </Link>

        {/* NAVIGATION SECTIONS */}
        {isDashboard ? (
          /* DASHBOARD NAVIGATION (TAB SWITCHERS) */
          <nav className="hidden md:flex items-center gap-3">
            <button 
              className={`btn !py-2.5 !px-5 justify-center text-base ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>
            <button 
              className={`btn !py-2.5 !px-5 justify-center text-base ${activeTab === 'roadmap' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('roadmap')}
            >
              <Briefcase size={18} />
              <span>Goal Roadmap</span>
            </button>
            <button 
              className={`btn !py-2.5 !px-5 justify-center text-base ${activeTab === 'resume' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('resume')}
            >
              <FileText size={18} />
              <span>Resume Reviewer</span>
            </button>
            <button 
              className={`btn !py-2.5 !px-5 justify-center text-base ${activeTab === 'interview' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('interview')}
            >
              <Award size={18} />
              <span>Mock Interview</span>
            </button>
            <button 
              className={`btn !py-2.5 !px-5 justify-center text-base ${activeTab === 'chat' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare size={18} />
              <span>AI Career Coach</span>
            </button>
          </nav>
        ) : (
          /* PUBLIC PAGES NAVIGATION */
          <nav className="hidden md:flex items-center gap-10">
            <Link 
              to="/" 
              className={`text-base font-semibold transition-colors hover:text-white ${isLinkActive('/') ? 'text-indigo-400' : 'text-gray-400'}`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`text-base font-semibold transition-colors hover:text-white ${isLinkActive('/features') ? 'text-indigo-400' : 'text-gray-400'}`}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className={`text-base font-semibold transition-colors hover:text-white ${isLinkActive('/about') ? 'text-indigo-400' : 'text-gray-400'}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`text-base font-semibold transition-colors hover:text-white ${isLinkActive('/contact') ? 'text-indigo-400' : 'text-gray-400'}`}
            >
              Contact
            </Link>
            <Link 
              to="/app" 
              className="text-base font-semibold text-gray-400 hover:text-white transition-colors"
            >
              Interactive Demo
            </Link>
          </nav>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3.5">
          {isDashboard ? (
            <>
              {/* SETTINGS BUTTON */}
              <button 
                className="btn btn-secondary !p-2.5 md:!px-5 md:!py-2.5 text-base" 
                onClick={() => setShowSettings(!showSettings)}
                title="Gemini API Configuration"
              >
                <Settings size={18} className={showSettings ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Settings</span>
                <span className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${apiKey ? 'bg-emerald-500 shadow-emerald-500' : 'bg-amber-500 shadow-amber-500'}`}></span>
              </button>

              {/* LOGOUT BUTTON */}
              <button 
                className="btn btn-secondary !p-2.5 text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
                onClick={handleLogout}
                title="Log Out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/login" 
                className={`px-5 py-2.5 rounded-xl text-base font-semibold transition-all ${isLinkActive('/login') ? 'text-white bg-white/5' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="px-5.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-base font-semibold shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden btn btn-secondary !p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU PANELS */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0b0f19]/95 backdrop-blur-xl absolute top-full left-0 w-full p-6 flex flex-col gap-3.5 shadow-2xl z-[60] animate-[slideUp_0.25s_ease-out]">
          {isDashboard ? (
            <>
              <button 
                className={`btn w-full justify-start ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
              >
                <LayoutDashboard size={16} />
                <span>Overview</span>
              </button>
              <button 
                className={`btn w-full justify-start ${activeTab === 'roadmap' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('roadmap'); setIsMobileMenuOpen(false); }}
              >
                <Briefcase size={16} />
                <span>Goal Roadmap</span>
              </button>
              <button 
                className={`btn w-full justify-start ${activeTab === 'resume' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('resume'); setIsMobileMenuOpen(false); }}
              >
                <FileText size={16} />
                <span>Resume Reviewer</span>
              </button>
              <button 
                className={`btn w-full justify-start ${activeTab === 'interview' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('interview'); setIsMobileMenuOpen(false); }}
              >
                <Award size={16} />
                <span>Mock Interview</span>
              </button>
              <button 
                className={`btn w-full justify-start ${activeTab === 'chat' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }}
              >
                <MessageSquare size={16} />
                <span>AI Career Coach</span>
              </button>
              <div className="border-t border-white/10 my-1 pt-3.5 flex gap-2">
                <button 
                  className="btn btn-secondary flex-1 justify-center"
                  onClick={() => { setShowSettings(true); setIsMobileMenuOpen(false); }}
                >
                  <Settings size={16} /> Settings
                </button>
                <button 
                  className="btn btn-secondary !text-rose-400 justify-center"
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isLinkActive('/') ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-300 hover:bg-white/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isLinkActive('/features') ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-300 hover:bg-white/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isLinkActive('/about') ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-300 hover:bg-white/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isLinkActive('/contact') ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-300 hover:bg-white/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/app" 
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Interactive Demo
              </Link>
              <div className="border-t border-white/10 my-1 pt-3.5 flex flex-col gap-2">
                <Link 
                  to="/login" 
                  className="w-full btn btn-secondary justify-center text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="w-full btn btn-primary justify-center text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
