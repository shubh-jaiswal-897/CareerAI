import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Briefcase, FileText, Target } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="page-shell selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="page-inner z-10 flex flex-col gap-10">
        <section className="hero-card overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col items-start gap-5 text-left">
              <span className="soft-pill">AI Career Growth Platform</span>
              <h1 className="font-[Outfit] text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build a stronger career path with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">smart AI support</span>
              </h1>
              <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
                CareerAI helps job seekers review resumes, map skill gaps, and prepare with guided AI coaching in one clean and simple workflow.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Link to="/register" className="btn btn-primary w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="btn btn-secondary w-full sm:w-auto">
                  View Demo
                </Link>
              </div>
            </div>

            <div className="section-card bg-slate-900/60">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] text-slate-400">careerai.console</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="metric-card">
                  <p className="text-xs uppercase text-slate-400">ATS score</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-300">92/100</p>
                </div>
                <div className="metric-card">
                  <p className="text-xs uppercase text-slate-400">Role target</p>
                  <p className="mt-2 text-lg font-bold text-white">React Engineer</p>
                </div>
                <div className="metric-card sm:col-span-2">
                  <p className="text-xs uppercase text-slate-400">Learning flow</p>
                  <div className="mt-3 space-y-3 text-sm text-slate-200">
                    <div className="rounded-xl bg-white/5 p-3">Resume review completed</div>
                    <div className="rounded-xl bg-indigo-500/10 p-3 text-white">Roadmap generated and active</div>
                    <div className="rounded-xl bg-white/5 p-3">Interview preparation queued</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <FeatureCard icon={<FileText size={24} className="text-indigo-300" />} title="Resume Reviewer" desc="Quickly check ATS alignment and get simple feedback on what to improve." />
          <FeatureCard icon={<Target size={24} className="text-cyan-300" />} title="Roadmap Builder" desc="Turn your career goal into a realistic step-by-step learning plan." />
          <FeatureCard icon={<Briefcase size={24} className="text-purple-300" />} title="Mock Interview" desc="Practice with guided AI interview prompts and keep your confidence high." />
        </section>

        <section className="section-card flex flex-col items-center gap-4 text-center">
          <h2 className="font-[Outfit] text-2xl font-bold text-white sm:text-3xl">Built to look polished, feel easy to use</h2>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            The design is intentionally clean, responsive, and presentation-ready so it can be shown confidently to stakeholders and leadership.
          </p>
          <Link to="/features" className="btn btn-secondary">
            Explore Full Features
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="metric-card flex flex-col items-start gap-3 text-left">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">{icon}</div>
      <h3 className="font-[Outfit] text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-300">{desc}</p>
    </div>
  );
}
