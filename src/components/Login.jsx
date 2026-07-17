import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || 'Login failed.');
      }

      localStorage.setItem('careerai_current_user', JSON.stringify(result.user));
      localStorage.setItem('careerai_remember_me', String(rememberMe));
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
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
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">CareerAI</p>
                  <h2 className="font-[Outfit] text-2xl font-bold text-white">Welcome back</h2>
                </div>
              </div>

              <p className="max-w-md text-sm text-slate-300">
                Sign in to continue your roadmap, resume review flow, and interview prep in one confident workspace.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <ShieldCheck size={16} className="text-emerald-300" />
                  <span className="text-sm font-semibold">Fast & secure access</span>
                </div>
                <p className="text-sm text-slate-300">Your sessions stay organized with a clean dashboard flow that’s easy to revisit.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <Zap size={16} className="text-cyan-300" />
                  <span className="text-sm font-semibold">Resume + roadmap + coach</span>
                </div>
                <p className="text-sm text-slate-300">Jump back into your personalized AI progression without losing momentum.</p>
              </div>
            </div>
          </div>

          <div className="auth-card p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h2 className="font-[Outfit] text-2xl font-bold text-white">Sign In</h2>
              <p className="mt-1 text-sm text-slate-300">Continue to your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="loginEmail">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="loginEmail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" placeholder="you@example.com" />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label" htmlFor="loginPassword">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="loginPassword" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-10" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-indigo-500" />
                  Remember me
                </label>
                <Link to="/register" className="text-indigo-300 hover:text-indigo-200">Forgot password?</Link>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-3 text-xs text-rose-300">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-300">
              Don’t have an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-300 hover:text-indigo-200">Create one</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
