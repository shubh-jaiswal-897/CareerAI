import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Target, Briefcase, MessageSquare, Award, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Features() {
  return (
    <div className="page-shell selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="page-inner flex flex-col gap-8">
        <section className="section-card text-center">
          <span className="soft-pill">Core Features</span>
          <h1 className="mt-4 font-[Outfit] text-4xl font-extrabold text-white sm:text-5xl">
            A simple workflow for every career step
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
            CareerAI brings resume evaluation, roadmap planning, mock interviews, and live coaching into one streamlined user experience.
          </p>
        </section>

        <section className="grid gap-4">
          <FeatureRow icon={<FileText size={28} className="text-indigo-300" />} title="Smart Resume Reviewer" desc="Analyze structure, keyword coverage, and the right ATS improvements with clear guidance." />
          <FeatureRow icon={<Target size={28} className="text-cyan-300" />} title="Skill Gap Roadmap" desc="Match your current strength with your target role and create a practical learning schedule." />
          <FeatureRow icon={<Award size={28} className="text-purple-300" />} title="AI Mock Interview" desc="Practice realistic interview questions and boost your clarity before the real round." />
          <FeatureRow icon={<MessageSquare size={28} className="text-pink-300" />} title="Career Coach" desc="Ask focused questions about job search, resume revisions, and career decisions whenever needed." />
        </section>

        <section className="section-card flex flex-col items-center gap-4 text-center">
          <h2 className="font-[Outfit] text-2xl font-bold text-white">Ready to try it?</h2>
          <p className="max-w-2xl text-sm text-slate-300">Sign up and experience the full product flow in a few clicks.</p>
          <Link to="/register" className="btn btn-primary">
            Start Your Journey
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureRow({ icon, title, desc }) {
  return (
    <div className="section-card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">{icon}</div>
        <div>
          <h3 className="font-[Outfit] text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-300">{desc}</p>
        </div>
      </div>
    </div>
  );
}
