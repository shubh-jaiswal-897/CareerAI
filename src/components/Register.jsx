import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Connect to FastAPI backend
    console.log("Registering...", name, email);
    // For now, redirect to dashboard/app
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex flex-col relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10 my-10">
        <div className="w-full max-w-md glass-card animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)] mb-4 hover:scale-105 transition-transform">
            <Sparkles size={24} className="text-white" />
          </Link>
          <h2 className="font-[Outfit] text-2xl font-bold text-white mb-2">Create an Account</h2>
          <p className="text-gray-400 text-sm">Join CareerAI to accelerate your growth</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-10"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
