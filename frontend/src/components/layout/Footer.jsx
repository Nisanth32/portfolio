import React from 'react'
import { ArrowUp, Github, Linkedin, Mail, Download } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-black/50 py-12 px-4 sm:px-8 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="text-center sm:text-left">
          <div className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <span>NISANTH</span>
            <span className="text-cyan-600 dark:text-neon-cyan">.</span>
            <span>K</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            B.Tech AI & Data Science Student · Robotics Builder · Full-Stack Developer
          </p>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            © 2026 Nisanth K. All rights reserved. Indra Ganesan College of Engineering.
          </div>
        </div>

        {/* Social Links & Resume */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Nisanth32"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-colors shadow-sm"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/nisanth-k"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-colors shadow-sm"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:nisanth0202@gmail.com"
            aria-label="Email Nisanth K"
            className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-colors shadow-sm"
          >
            <Mail size={18} />
          </a>
          <a
            href="/assets/resume.pdf"
            download="Nisanth_K_Resume.pdf"
            aria-label="Download Resume"
            className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:border-slate-300 dark:hover:border-white/20 transition-colors shadow-sm"
            title="Download Resume (PDF)"
          >
            <Download size={18} />
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 transition-all group"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
