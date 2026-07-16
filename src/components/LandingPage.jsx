import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Briefcase, FileText, Target } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 overflow-hidden relative selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      {/* Floating Animated Background Cards (Wow Effect) */}
      <div className="hidden lg:block absolute top-1/4 right-10 w-64 h-32 glass-card animate-bounce shadow-glow-purple transform rotate-12 opacity-40 blur-[2px] pointer-events-none"></div>
      <div className="hidden lg:block absolute bottom-1/4 left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500/30 to-cyan-500/30 blur-2xl animate-pulse pointer-events-none"></div>

      {/* Reusable Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <main className="w-full relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-16 sm:pt-24 pb-24 max-w-5xl mx-auto gap-16">
        <div className="flex flex-col items-center text-center max-w-3xl w-full">
          <h1 className="w-full font-[Outfit] text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 text-center">
            Supercharge your career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-500">AI Guidance</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl text-center font-normal">
            Upload your resume, discover skill gaps, and get a personalized roadmap to land your dream job faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              Start Your Journey <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold text-lg hover:bg-white/10 transition-all text-center">
              View Live Demo
            </Link>
          </div>
        </div>

        {/* Clean Dashboard Preview Card (No messy overlaps) */}
        <div className="w-full max-w-4xl rounded-2xl bg-white/5 border border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 mt-4 backdrop-blur-xl text-left">
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-[11px] text-gray-500 ml-2 font-mono">careerai.console</span>
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full font-medium">
              Target Profile: React Engineer
            </div>
          </div>

          {/* Interior Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Metrics */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">ATS Score</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-[Outfit]">92/100</span>
                </div>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-md font-bold">Excellent</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Syllabus Progress</span>
                  <span className="text-base font-bold text-white">Phase 2: System Design</span>
                </div>
                <span className="text-xs text-indigo-400 font-bold">65%</span>
              </div>
            </div>

            {/* Right Flowchart Simulation */}
            <div className="md:col-span-7 flex flex-col gap-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">AI Pipeline Status</div>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold flex items-center justify-center">1</div>
                <span className="text-xs text-gray-200">Parse resume & verify compliance checks</span>
                <span className="text-[10px] text-indigo-400 font-bold ml-auto">Completed</span>
              </div>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">2</div>
                <span className="text-xs text-white font-semibold">Generate personalized interactive roadmap</span>
                <span className="text-[10px] text-purple-400 font-bold ml-auto">Active</span>
              </div>
              <div className="flex gap-3 items-center p-3 rounded-xl bg-white/5 border border-white/5 opacity-55">
                <div className="w-6 h-6 rounded-full bg-gray-500/20 text-gray-400 text-xs font-bold flex items-center justify-center">3</div>
                <span className="text-xs text-gray-300 font-normal">Initiate AI technical mock interview</span>
                <span className="text-[10px] text-gray-500 ml-auto">Queued</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Cards Summary */}
      <div className="w-full relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-[Outfit] text-3xl font-bold text-white">Full-Suite AI Tools</h2>
          <p className="text-sm text-gray-400 mt-2">Explore the tools designed to guide you from start to finish.</p>
        </div>
        
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

        <div className="flex justify-center mt-10">
          <Link to="/features" className="btn btn-secondary text-sm font-semibold flex items-center gap-2">
            Explore All Features <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#111928]/65 border border-white/5 backdrop-blur-xl hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all text-center flex flex-col items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-[Outfit] text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
