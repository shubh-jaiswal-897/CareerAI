import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Activity,
  Heart,
} from 'lucide-react';

export default function Footer({ apiKey: passedApiKey }) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (passedApiKey !== undefined) {
      setApiKey(passedApiKey);
    } else {
      const savedKey = localStorage.getItem('careerai_api_key') || '';
      setApiKey(savedKey);
    }
  }, [passedApiKey]);

  const statusText = apiKey ? 'Live AI Mode' : 'Demo Mode';

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816] text-gray-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.22),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%,rgba(255,255,255,0.03))]" />

      <div className="relative w-full px-3 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-14">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_60px_rgba(0,0,0,0.35)] sm:rounded-[28px] sm:p-5 lg:p-8">
          <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
            <div className="space-y-5 text-center sm:text-left">
              <Link to="/" className="inline-flex items-center gap-3 group justify-center sm:justify-start">
                <span className="font-[Outfit] text-2xl font-extrabold tracking-tight text-white">
                  Career<span className="text-purple-500">AI</span>
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_0_18px_rgba(129,140,248,0.35)] transition-transform duration-300 group-hover:scale-105">
                  <Sparkles size={17} className="text-white" />
                </div>
              </Link>

              <p className="max-w-md text-sm leading-6 text-gray-400">
                Your AI career companion for roadmap planning, resume analysis, and guided interview practice.
              </p>

              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:shadow-[0_0_18px_rgba(129,140,248,0.18)]">
                  <Github size={16} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:shadow-[0_0_18px_rgba(129,140,248,0.18)]">
                  <Twitter size={16} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:shadow-[0_0_18px_rgba(129,140,248,0.18)]">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/app" className="transition hover:text-white">Goal Roadmap</Link></li>
                <li><Link to="/app" className="transition hover:text-white">Resume Reviewer</Link></li>
                <li><Link to="/app" className="transition hover:text-white">AI Career Coach</Link></li>
                <li><Link to="/app" className="transition hover:text-white">Interactive Demo</Link></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="transition hover:text-white">Documentation</a></li>
                <li><a href="https://github.com" className="transition hover:text-white">API Guide</a></li>
                <li><a href="https://github.com" className="transition hover:text-white">Release Notes</a></li>
                <li><a href="https://github.com" className="transition hover:text-white">Help Center</a></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="transition hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
                <li><a href="https://github.com" className="transition hover:text-white">Privacy Policy</a></li>
                <li><a href="https://github.com" className="transition hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center gap-4 border-t border-white/10 pt-4 text-center sm:mt-8 sm:pt-5 md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Heart size={12} className="text-rose-500 fill-rose-500" />
              <span>Built for ambitious job seekers.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                <Activity size={12} className={apiKey ? 'text-emerald-500 animate-pulse' : 'text-amber-500'} />
                <span>{statusText}</span>
              </div>

              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_25px_rgba(129,140,248,0.25)] transition hover:scale-[1.02]"
              >
                Open App
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
