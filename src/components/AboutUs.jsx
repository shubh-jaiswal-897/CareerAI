import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 selection:bg-indigo-500 selection:text-white flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24 z-10 flex flex-col gap-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-5">
          <span className="text-xs text-indigo-400 font-bold tracking-widest uppercase">Our Mission</span>
          <h1 className="font-[Outfit] text-4xl sm:text-5xl font-extrabold text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">CareerAI</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            CareerAI was founded with a simple yet powerful mission: to democratize career mentorship. Using the latest breakthroughs in Generative AI, we help students and professionals navigate the tech landscape, close their skill gaps, and land their dream positions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col gap-2">
            <span className="text-4xl font-extrabold text-indigo-400 font-[Outfit]">10k+</span>
            <span className="text-xs text-gray-400 uppercase font-semibold">Roadmaps Built</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col gap-2">
            <span className="text-4xl font-extrabold text-cyan-400 font-[Outfit]">94%</span>
            <span className="text-xs text-gray-400 uppercase font-semibold">ATS Accuracy</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col gap-2">
            <span className="text-4xl font-extrabold text-purple-400 font-[Outfit]">24/7</span>
            <span className="text-xs text-gray-400 uppercase font-semibold">AI Coach Help</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col gap-2">
            <span className="text-4xl font-extrabold text-pink-400 font-[Outfit]">50+</span>
            <span className="text-xs text-gray-400 uppercase font-semibold">Roles Mapped</span>
          </div>
        </div>

        {/* Values Section */}
        <div className="flex flex-col gap-8">
          <h2 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-white text-center">Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white">Syllabus-driven Progress</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Rather than generic guides, we compile course references, books, and hands-on coding milestones structured specifically around your targeted career profiles.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white">ATS Calibration</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Analyze formatting standards, spelling, keyword frequency, and sections structure using standardized models trained on professional placement criteria.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white">Practice-based Training</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI Coach dialog exchanges and real-time step mock interview evaluation scorecards ensure you learn behavioral and coding heuristics before setting foot in standard recruitment rounds.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
