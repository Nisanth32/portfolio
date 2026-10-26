import React, { useState, useEffect } from 'react'
import { ArrowDown, Code, Cpu, Sparkles, Send, Download, MapPin, Award, CheckCircle2 } from 'lucide-react'
import NeuralCanvas from '../components/effects/NeuralCanvas'

const ROLES = [
  "AI & Data Science Student",
  "Robotics Builder",
  "Full-Stack Developer"
]

export default function Hero({ profile }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex]
    let timeout

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    } else {
      const speed = isDeleting ? 35 : 75
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section
      id="hero"
      aria-label="Introduction & Hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background Neural Canvas */}
      <NeuralCanvas />

      {/* Radiant ambient glow blobs */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" 
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Top Status & Location Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-6 shadow-sm border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-colors">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 dark:bg-neon-cyan"></span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">B.Tech AI & Data Science</span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <MapPin size={13} className="text-cyan-500 dark:text-neon-cyan" />
                Tamil Nadu, India
              </span>
            </div>

            {/* Name Title - Clean without wavy line */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
              Hi, I'm <span className="gradient-text-cyan">NISANTH K</span>
            </h1>

            {/* Rotating Typewriter Role */}
            <div className="h-10 sm:h-12 mt-3 flex items-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold font-heading text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span>Building as a</span>
                <span className="text-cyan-600 dark:text-neon-cyan font-bold tracking-tight">
                  {displayText}
                </span>
                <span className="inline-block w-0.5 h-6 sm:h-8 bg-cyan-500 dark:bg-neon-cyan animate-pulse" />
              </div>
            </div>

            {/* Value Statement */}
            <p className="mt-5 max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              B.Tech Artificial Intelligence & Data Science student at Indra Ganesan College of Engineering. 
              Engineering practical intelligent systems that integrate cutting-edge AI/ML, 
              12-DOF humanoid robotics hardware, and production-ready full-stack web platforms.
            </p>

            {/* Quick Highlights Ribbon */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-semibold">
                <Award size={14} />
                Dual 1st Place Winner 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-neon-cyan font-semibold">
                <Cpu size={14} />
                12-DOF Humanoid (AURA)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-neon-violet font-semibold">
                <Code size={14} />
                Full-Stack Systems
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-neon-cyan dark:to-cyan-400 text-white dark:text-slate-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles size={16} />
                <span>View Projects</span>
              </a>

              <a
                href="/assets/resume.pdf"
                download="Nisanth_K_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm glass-card text-slate-800 dark:text-white hover:text-cyan-600 dark:hover:text-neon-cyan border border-slate-300 dark:border-white/10 hover:border-cyan-500 dark:hover:border-neon-cyan/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download size={16} className="text-cyan-500 dark:text-neon-cyan" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white glass-panel hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <Send size={16} />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Impact Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer Radiant Glow Rings */}
              <div 
                aria-hidden="true" 
                className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/30 via-purple-500/20 to-neon-cyan/40 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" 
              />
              
              {/* Main Photo Card Container */}
              <div className="relative rounded-[2rem] p-3 glass-panel border-2 border-slate-200 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 shadow-2xl backdrop-blur-xl">
                <div className="relative w-64 sm:w-80 h-80 sm:h-96 rounded-[1.5rem] overflow-hidden bg-slate-950">
                  <img
                    src="/assets/nisanth_photo.jpg"
                    alt="Nisanth K - AI & Robotics Builder"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Photo overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white">
                    <div className="text-xs font-mono text-neon-cyan flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neon-emerald animate-pulse" />
                      Active Engineering Portfolio
                    </div>
                    <div className="text-sm font-bold font-heading mt-0.5">
                      Nisanth K
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Badge Top Right */}
                <div className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold border border-cyan-400/50 shadow-lg flex items-center gap-1.5">
                  <Sparkles size={12} className="text-neon-cyan" />
                  <span>AI & Robotics</span>
                </div>

                {/* Floating Micro-Badge Bottom Left */}
                <div className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold border border-amber-400/50 shadow-lg flex items-center gap-1.5">
                  <Award size={12} className="text-amber-400" />
                  <span>1st Prize '26</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 flex justify-center animate-bounce">
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="p-2.5 rounded-full glass-panel text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors inline-block"
          >
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
