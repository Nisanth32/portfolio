import React, { useState } from 'react'
import { Sun, Moon, Menu, X, FileText, Download } from 'lucide-react'

export default function Navbar({ activeSection, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 py-4">
      <nav 
        aria-label="Main Navigation"
        className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl glass-panel shadow-lg shadow-black/5 dark:shadow-black/20 backdrop-blur-xl transition-colors"
      >
        {/* Brand with photo avatar preview */}
        <a 
          href="#hero" 
          className="flex items-center gap-2.5 group text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-neon-cyan/50 shadow-md group-hover:scale-105 transition-transform">
            <img 
              src="/assets/nisanth_photo.jpg" 
              alt="Nisanth K" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="font-heading tracking-wide group-hover:text-neon-cyan transition-colors">
            NISANTH<span className="text-neon-cyan">.</span>K
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-600 dark:text-neon-cyan bg-cyan-50 dark:bg-white/5 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-full" />
                )}
              </a>
            )
          })}
        </div>

        {/* Actions: Resume + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/assets/resume.pdf"
            download="Nisanth_K_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/60 hover:border-cyan-500 dark:hover:border-neon-cyan hover:text-cyan-600 dark:hover:text-neon-cyan hover:shadow-sm transition-all"
          >
            <Download size={14} className="text-neon-cyan" />
            <span>Resume</span>
          </a>

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl glass-panel p-4 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={handleLinkClick}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-cyan-600 dark:text-neon-cyan bg-cyan-50 dark:bg-white/5 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10">
            <a
              href="/assets/resume.pdf"
              download="Nisanth_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-cyan-600 dark:text-neon-cyan border border-cyan-500/40 bg-cyan-50 dark:bg-neon-cyan/5"
            >
              <Download size={16} />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
