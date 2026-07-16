import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 selection:bg-indigo-500 selection:text-white flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 z-10 flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs text-indigo-400 font-bold tracking-widest uppercase">Support Channel</span>
          <h1 className="font-[Outfit] text-4xl sm:text-5xl font-extrabold text-white">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about our custom roadmap features or recruiter API licenses? Send us a message and our support team will respond shortly.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-card p-6 sm:p-10 flex flex-col gap-6">
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent successfully."); }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="contactName">Full Name</label>
                <input id="contactName" type="text" className="input-field" placeholder="John Doe" required />
              </div>
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="contactEmail">Email Address</label>
                <input id="contactEmail" type="email" className="input-field" placeholder="you@example.com" required />
              </div>
            </div>
            
            <div className="form-group mb-0">
              <label className="form-label" htmlFor="contactSubject">Subject</label>
              <input id="contactSubject" type="text" className="input-field" placeholder="How can we help?" required />
            </div>

            <div className="form-group mb-0">
              <label className="form-label" htmlFor="contactMessage">Message</label>
              <textarea id="contactMessage" className="input-field" rows={5} placeholder="Your message here..." style={{ resize: 'none' }} required />
            </div>

            <button type="submit" className="btn btn-primary justify-center w-full sm:w-auto self-center px-10 py-3.5 mt-2 text-base font-semibold shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
