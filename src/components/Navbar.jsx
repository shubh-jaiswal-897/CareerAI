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
  LayoutDashboard,
  Award,
} from 'lucide-react';

export default function Navbar({
  isDashboard = false,
  activeTab,
  setActiveTab,
  showSettings,
  setShowSettings,
  apiKey,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => navigate('/');
  const isLinkActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/features', label: 'Features' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-1280 items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-[Outfit] text-xl font-bold text-white sm:text-2xl">
            Career<span className="text-purple-400">AI</span>
          </span>
        </Link>

        {!isDashboard ? (
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition ${isLinkActive(link.to) ? 'text-indigo-300' : 'text-slate-400 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/app" className="text-sm font-semibold text-slate-300 hover:text-white">
              Interactive Demo
            </Link>
          </nav>
        ) : (
          <nav className="hidden items-center gap-2 lg:flex">
            {[
              { key: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { key: 'roadmap', label: 'Roadmap', icon: Briefcase },
              { key: 'resume', label: 'Resume', icon: FileText },
              { key: 'interview', label: 'Interview', icon: Award },
              { key: 'chat', label: 'Coach', icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  className={`btn ${activeTab === item.key ? 'btn-primary' : 'btn-secondary'} !py-2 !px-4 text-sm`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {isDashboard ? (
            <>
              <button
                className="btn btn-secondary !px-3 !py-2 text-sm"
                onClick={() => setShowSettings(!showSettings)}
                title="Gemini API configuration"
              >
                <Settings size={16} className={showSettings ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Settings</span>
                <span className={`h-2 w-2 rounded-full ${apiKey ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </button>
              <button
                className="btn btn-secondary !px-3 !py-2 text-sm"
                onClick={handleLogout}
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/register" className="btn btn-primary !px-4 !py-2 text-sm">
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          <button
            className="btn btn-secondary !px-3 !py-2 md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {!isDashboard ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/app" className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  Interactive Demo
                </Link>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Link to="/login" className="btn btn-secondary justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/register" className="btn btn-primary justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              </>
            ) : (
              <>
                {[
                  { key: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                  { key: 'roadmap', label: 'Roadmap', icon: Briefcase },
                  { key: 'resume', label: 'Resume', icon: FileText },
                  { key: 'interview', label: 'Interview', icon: Award },
                  { key: 'chat', label: 'Coach', icon: MessageSquare },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      className={`btn w-full justify-start ${activeTab === item.key ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => {
                        setActiveTab(item.key);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button className="btn btn-secondary justify-center" onClick={() => { setShowSettings(true); setIsMobileMenuOpen(false); }}>
                    <Settings size={16} /> Settings
                  </button>
                  <button className="btn btn-secondary justify-center text-rose-300" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
