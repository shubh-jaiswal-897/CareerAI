import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AboutUs() {
  return (
    <div className="page-shell selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="page-inner flex flex-col gap-8">
        <section className="section-card text-center">
          <span className="soft-pill">Our Mission</span>
          <h1 className="mt-4 font-[Outfit] text-4xl font-extrabold text-white sm:text-5xl">
            CareerAI was built to make growth feel simple
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
            We help students and professionals navigate job transitions with a simpler, more supportive AI experience that turns career progress into clear action.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard value="10k+" label="Roadmaps built" />
          <MetricCard value="94%" label="ATS alignment focus" />
          <MetricCard value="24/7" label="Coach availability" />
          <MetricCard value="50+" label="Roles mapped" />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="section-card">
            <h3 className="font-[Outfit] text-lg font-bold text-white">Clear learning direction</h3>
            <p className="mt-2 text-sm text-slate-300">Instead of vague advice, the platform turns your target role into a practical path.</p>
          </div>
          <div className="section-card">
            <h3 className="font-[Outfit] text-lg font-bold text-white">Real-world feedback</h3>
            <p className="mt-2 text-sm text-slate-300">Resume checks, roadmap planning, and interview practice all reinforce the same growth loop.</p>
          </div>
          <div className="section-card">
            <h3 className="font-[Outfit] text-lg font-bold text-white">Friendly support</h3>
            <p className="mt-2 text-sm text-slate-300">The coaching flow keeps the experience approachable and useful, even for first-time users.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function MetricCard({ value, label }) {
  return (
    <div className="section-card text-center">
      <div className="font-[Outfit] text-3xl font-bold text-indigo-300">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
    </div>
  );
}
