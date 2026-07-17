import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight, Rocket, BadgeCheck, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      setError('Please accept the terms to create your account.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || 'Registration failed.');
      }

      localStorage.setItem('careerai_current_user', JSON.stringify(result.user));
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Unable to create the account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="page-inner flex items-center justify-center">
        <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="auth-card flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
                  <Sparkles size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Start here</p>
                  <h2 className="font-[Outfit] text-2xl font-bold text-white">Create your account</h2>
                </div>
              </div>
              <p className="max-w-md text-sm text-slate-300">
                Open your personalized career workspace and begin with a clear roadmap, resume insight, and interview practice flow.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <Rocket size={16} className="text-cyan-300" />
                  <span className="text-sm font-semibold">Set your target role faster</span>
                </div>
                <p className="text-sm text-slate-300">Kick off with your goals and generate a straightforward action plan in minutes.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <BadgeCheck size={16} className="text-emerald-300" />
                  <span className="text-sm font-semibold">Build confidence before interviews</span>
                </div>
                <p className="text-sm text-slate-300">Use the coaching and interview tools to stay prepared and reduce uncertainty.</p>
              </div>
            </div>
          </div>

          <div className="auth-card p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h2 className="font-[Outfit] text-2xl font-bold text-white">Register</h2>
              <p className="mt-1 text-sm text-slate-300">Join CareerAI and start your next step</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="registerName">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="registerName" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="input-field pl-10" placeholder="John Doe" />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label" htmlFor="registerEmail">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="registerEmail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" placeholder="you@example.com" />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label" htmlFor="registerPassword">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="registerPassword" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-10" placeholder="••••••••" />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-1 accent-indigo-500" />
                I agree to the terms and want to begin using CareerAI.
              </label>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-3 text-xs text-rose-300">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-300 hover:text-indigo-200">Sign in</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
