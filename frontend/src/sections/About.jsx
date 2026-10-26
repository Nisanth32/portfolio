import React from 'react'
import { GraduationCap, Trophy, Cpu, Code2, Calendar, MapPin, Sparkles, Download, FileText } from 'lucide-react'

export default function About({ profile }) {
  const education = profile?.education || [
    {
      degree: "B.Tech AI & Data Science",
      institution: "Indra Ganesan College of Engineering",
      period: "2025-2029 (Ongoing)",
      status: "Ongoing",
      details: "Hands-on engineering across AI/ML, robotics, embedded hardware, and full-stack web development."
    },
    {
      degree: "Higher Secondary, Computer Science Group",
      institution: "Vinmathee Matric Higher Secondary School",
      period: "2023-2025",
      status: "Completed | 60%",
      details: "Specialized in Computer Science, Mathematics, and Physical Sciences."
    }
  ]

  const stats = [
    {
      number: "2",
      title: "First Places in 2026",
      desc: "Won 1st place in both Paper Presentation (CARE Tech Fest '26) & Project Expo (Engineers' Day 2026)",
      icon: Trophy,
      color: "text-amber-500 dark:text-amber-400",
      border: "border-amber-400/30",
      bg: "bg-amber-50 dark:bg-amber-500/5"
    },
    {
      number: "4",
      title: "Engineered Systems",
      desc: "AURA 12-DOF Humanoid Robot, Smart Gate Pass, SmartAttend AI, Smart Energy System",
      icon: Cpu,
      color: "text-cyan-600 dark:text-neon-cyan",
      border: "border-cyan-400/30",
      bg: "bg-cyan-50 dark:bg-neon-cyan/5"
    },
    {
      number: "Full-Stack",
      title: "Robotics + AI + Web",
      desc: "Jetson Nano & ESP32 embedded integration combined with FastAPI & Django cloud architectures",
      icon: Code2,
      color: "text-purple-600 dark:text-neon-violet",
      border: "border-purple-400/30",
      bg: "bg-purple-50 dark:bg-neon-violet/5"
    }
  ]

  return (
    <section
      id="about"
      aria-label="About Nisanth K"
      className="relative py-24 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-neon-cyan bg-cyan-50 dark:bg-neon-cyan/10 border border-cyan-400/30 mb-3">
          <Sparkles size={12} />
          About Me
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
          Architecting Hardware & <span className="gradient-text-cyan">Intelligent Systems</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mt-4" />
      </div>

      {/* Main Grid: Narrative + Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Narrative Biography */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-4 pb-2">
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-cyan-500/30 shadow-md shrink-0">
              <img 
                src="/assets/nisanth_photo.jpg" 
                alt="Nisanth K" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Engineering with Purpose & Precision
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI & Data Science Student · Indra Ganesan College of Engineering
              </p>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {profile?.summary || (
              "B.Tech Artificial Intelligence and Data Science student at Indra Ganesan College of Engineering with hands-on project experience across AI/ML, robotics, embedded hardware and full-stack web development. Builds practical systems that combine intelligent software, hardware and real-world problem solving. Won first place at both a paper presentation and a project expo in 2026."
            )}
          </p>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span><strong>Institution:</strong> Indra Ganesan College</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span><strong>Specialization:</strong> AI & Data Science</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span><strong>Location:</strong> Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span><strong>Competitions:</strong> Dual 1st Place 2026</span>
            </div>
          </div>

          {/* Download Resume Row */}
          <div className="pt-3">
            <a
              href="/assets/resume.pdf"
              download="Nisanth_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition-all shadow-sm"
            >
              <Download size={14} />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* 3 Quick Stat Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl p-5 border ${stat.border} ${stat.bg} hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`text-2xl sm:text-3xl font-extrabold font-heading ${stat.color}`}>
                      {stat.number}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {stat.title}
                    </div>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-white dark:bg-white/5 shadow-sm ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  {stat.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Education Timeline */}
      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-cyan-50 dark:bg-neon-cyan/10 text-cyan-600 dark:text-neon-cyan">
            <GraduationCap size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Academic Background
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Formal engineering and foundational curriculum</p>
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
          {education.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10 group">
              <div className="absolute left-1.5 sm:left-2.5 top-1.5 w-3 h-3 rounded-full bg-cyan-500 dark:bg-neon-cyan border-2 border-white dark:border-slate-900 group-hover:scale-125 transition-transform" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
                  {item.degree}
                </h4>
                <div className="inline-flex items-center gap-1.5 text-xs text-cyan-700 dark:text-neon-cyan font-mono bg-cyan-50 dark:bg-neon-cyan/5 px-2.5 py-1 rounded-md border border-cyan-400/20 w-fit">
                  <Calendar size={12} />
                  {item.period}
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {item.institution}
              </div>
              {item.details && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
