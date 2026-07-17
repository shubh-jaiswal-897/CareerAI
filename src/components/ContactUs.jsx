import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ContactUs() {
  return (
    <div className="page-shell selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="page-inner flex flex-col gap-8">
        <section className="section-card text-center">
          <span className="soft-pill">Support</span>
          <h1 className="mt-4 font-[Outfit] text-4xl font-extrabold text-white sm:text-5xl">
            Get in touch with the team
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Share your questions and we’ll help you understand the product, roadmap, or demo flow quickly.
          </p>
        </section>

        <section className="section-card">
          <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your message has been sent successfully.'); }}>
            <div className="grid gap-4 sm:grid-cols-2">
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
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
