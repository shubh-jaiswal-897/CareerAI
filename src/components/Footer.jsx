import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Github, 
  Twitter, 
  Linkedin, 
  ChevronUp, 
  Activity,
  Heart
} from 'lucide-react';

export default function Footer({ apiKey: passedApiKey }) {
  const [apiKey, setApiKey] = useState('');

  // Fallback to checking localStorage if apiKey wasn't passed directly (e.g. on static pages)
  useEffect(() => {
    if (passedApiKey !== undefined) {
      setApiKey(passedApiKey);
    } else {
      const savedKey = localStorage.getItem('careerai_api_key') || '';
      setApiKey(savedKey);
    }
  }, [passedApiKey]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070b14] border-t border-white/10 text-gray-400 font-sans mt-auto">
      
      {/* Main Footer Links & Bio */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Bio & Branding (left aligned on larger screens) */}
        <div className="lg:col-span-2 flex flex-col items-start text-left gap-5">
          <Link to="/" className="flex items-center justify-start gap-2.5 group">
            <span className="font-[Outfit] text-xl font-extrabold tracking-tight text-white">
              Career<span className="text-purple-500">AI</span>
            </span>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.25)] group-hover:scale-105 transition-all">
              <Sparkles size={18} className="text-white" />
            </div>
          </Link>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            Supercharge your career guidance using AI. Generate tailormade roadmaps, analyze ATS resume scores, and chat with a context-aware Career Coach.
          </p>
          {/* Social Links */}
          <div className="flex items-center justify-start gap-3.5 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all">
              <Github size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all">
              <Twitter size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] transition-all">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Platform Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[Outfit] text-sm font-semibold text-white tracking-wider uppercase">Platform</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/app" className="hover:text-white transition-colors">Goal Roadmap</Link>
            </li>
            <li>
              <Link to="/app" className="hover:text-white transition-colors">Resume Reviewer</Link>
            </li>
            <li>
              <Link to="/app" className="hover:text-white transition-colors">AI Career Coach</Link>
            </li>
            <li>
              <Link to="/app" className="hover:text-white transition-colors">Interactive Demo</Link>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[Outfit] text-sm font-semibold text-white tracking-wider uppercase">Resources</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href="#features" className="hover:text-white transition-colors">Documentation</a>
            </li>
            <li>
              <a href="https://github.com" className="hover:text-white transition-colors">API Guide</a>
            </li>
            <li>
              <a href="https://github.com" className="hover:text-white transition-colors">Release Notes</a>
            </li>
            <li>
              <a href="https://github.com" className="hover:text-white transition-colors">Help Center</a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[Outfit] text-sm font-semibold text-white tracking-wider uppercase">Company</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </li>
            <li>
              <a href="https://github.com" className="hover:text-white transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="https://github.com" className="hover:text-white transition-colors">Terms & Conditions</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Status Bar */}
      <div className="border-t border-white/5 bg-[#04060b] py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-1.5 text-gray-500">
            <span>&copy; {new Date().getFullYear()} CareerAI. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              Made with <Heart size={10} className="text-rose-500 fill-rose-500" /> for job seekers.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Live API Key Config Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <Activity size={12} className={apiKey ? 'text-emerald-500 animate-pulse' : 'text-amber-500'} />
              <span className="text-gray-400">
                Mode: {apiKey ? 'Live (Gemini AI Key)' : 'Demo (Mock Prompts)'}
              </span>
            </div>

            {/* Scroll To Top */}
            <button 
              onClick={scrollToTop}
              className="p-1.5 rounded-md hover:bg-white/5 hover:text-white transition-all"
              title="Back to Top"
            >
              <ChevronUp size={16} />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
