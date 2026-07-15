import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Briefcase, FileText, Target, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 overflow-hidden relative selection:bg-indigo-500 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      {/* Floating Animated Background Cards (Wow Effect) */}
      <div className="hidden lg:block absolute top-1/4 right-10 w-64 h-32 glass-card animate-bounce shadow-glow-purple transform rotate-12 opacity-40 blur-[2px]"></div>
      <div className="hidden lg:block absolute bottom-1/4 left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500/30 to-cyan-500/30 blur-2xl animate-pulse"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)]">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="font-[Outfit] text-2xl font-extrabold tracking-tight text-white">
            Career<span className="text-purple-500">AI</span>
          </span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="px-5 py-2.5 rounded-lg text-gray-200 hover:bg-white/5 transition-all font-medium">
            Log in
          </Link>
          <Link to="/register" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-2 text-gray-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0b0f19]/95 backdrop-blur-xl z-40 p-6 flex flex-col gap-4 border-b border-white/10 shadow-xl">
          <Link to="/login" className="px-5 py-3 rounded-lg text-gray-200 bg-white/5 text-center font-medium">Log in</Link>
          <Link to="/register" className="px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center font-medium shadow-lg flex items-center justify-center gap-2">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 pt-16 sm:pt-24 pb-32 max-w-7xl mx-auto gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
            <span className="text-sm font-medium text-gray-400">CareerAI v2.0 is now live</span>
          </div>
          
          <h1 className="font-[Outfit] text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            Supercharge your career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-500">AI Guidance</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Upload your resume, discover skill gaps, and get a personalized roadmap to land your dream job faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              Start Your Journey <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold text-lg hover:bg-white/10 transition-all text-center">
              View Live Demo
            </Link>
          </div>
        </div>

        {/* Hero Visual Component (Cards stacking) */}
        <div className="hidden lg:flex flex-1 relative w-full h-[500px] justify-center items-center">
          <div className="absolute z-20 w-80 h-48 glass-card transform -rotate-6 -translate-x-12 translate-y-12 shadow-2xl flex flex-col justify-between hover:rotate-0 transition-all duration-500">
            <div className="flex items-center gap-3"><FileText className="text-indigo-400" /> <span className="font-bold text-white">ATS Score</span></div>
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">92/100</div>
          </div>
          <div className="absolute z-10 w-80 h-48 glass-card transform rotate-6 translate-x-12 -translate-y-12 shadow-2xl opacity-90 flex flex-col justify-between">
            <div className="flex items-center gap-3"><Briefcase className="text-purple-400" /> <span className="font-bold text-white">Next Step</span></div>
            <div className="text-lg font-medium text-gray-300">Master System Design</div>
            <div className="w-full bg-white/10 rounded-full h-2 mt-2"><div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-[65%]"></div></div>
          </div>
        </div>
      </main>

      {/* Feature Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<FileText size={24} className="text-indigo-400" />}
            title="Smart Resume Analyzer"
            desc="AI parses your resume to highlight strengths and recommend crucial improvements."
          />
          <FeatureCard 
            icon={<Target size={24} className="text-cyan-400" />}
            title="Skill Gap Detector"
            desc="Match your current skills against your target role to see exactly what you need to learn."
          />
          <FeatureCard 
            icon={<Briefcase size={24} className="text-purple-400" />}
            title="Personalized Roadmap"
            desc="Get a step-by-step learning plan tailored specifically to your career goals."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#111928]/65 border border-white/5 backdrop-blur-xl hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all text-left flex flex-col gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-[Outfit] text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
