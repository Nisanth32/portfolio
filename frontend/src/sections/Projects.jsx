import React, { useState } from 'react'
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Bot,
  QrCode,
  Users,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Flame,
  CheckCircle2
} from 'lucide-react'
import ProjectModal from '../components/ui/ProjectModal'

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null)

  const projectList = projects && projects.length > 0 ? projects : []
  const featuredProject = projectList.find(p => p.is_featured) || projectList[0]
  const otherProjects = projectList.filter(p => p.id !== featuredProject?.id)

  return (
    <section
      id="projects"
      aria-label="Projects Portfolio"
      className="relative py-24 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-emerald-600 dark:text-neon-emerald bg-emerald-50 dark:bg-neon-emerald/10 border border-emerald-400/30 mb-3">
          <Sparkles size={12} />
          Portfolio Showcase
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
          Featured & <span className="gradient-text-cyan">Engineered Systems</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
          Real-world implementations spanning humanoid robotics, distributed edge AI, and secure enterprise college web platforms.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-4" />
      </div>

      {/* 1. Featured Project Hero Bento Card: AURA 12-DOF Humanoid Robot */}
      {featuredProject && (
        <div className="mb-12">
          <div className="animated-glow-border p-[1.5px] rounded-3xl group">
            <div 
              onClick={() => setSelectedProject(featuredProject)}
              className="bg-white dark:bg-[#0b0f17] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-neon-cyan/40 cursor-pointer shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Information Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                      <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                      {featuredProject.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-neon-cyan border border-cyan-500/30">
                      ★ Flagship 12-DOF Humanoid Robot
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
                    {featuredProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {featuredProject.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {featuredProject.bullets?.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-cyan-600 dark:text-neon-cyan shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Chips */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {featuredProject.stack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-neon-cyan group-hover:translate-x-1 transition-transform"
                    >
                      <span>Click to View Full Hardware Architecture & Kinematics</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Architecture Blueprint Card */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-black/60 rounded-2xl p-5 border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                    <span className="text-cyan-600 dark:text-neon-cyan font-bold flex items-center gap-1.5 font-sans">
                      <Bot size={16} />
                      AURA ROBOTIC DUAL-BRAIN
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-sans font-semibold">12-DOF Upper Body</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <div className="text-[10px] text-cyan-600 dark:text-neon-cyan font-semibold uppercase font-sans">
                        Cognitive Perception Brain
                      </div>
                      <div className="text-slate-900 dark:text-slate-200 font-bold text-xs mt-0.5 font-sans">
                        NVIDIA Jetson Nano
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Computer Vision, Speech Synthesis, Autonomous State Machine
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <div className="text-[10px] text-purple-600 dark:text-neon-violet font-semibold uppercase font-sans">
                        Real-Time Actuation Brain
                      </div>
                      <div className="text-slate-900 dark:text-slate-200 font-bold text-xs mt-0.5 font-sans">
                        ESP32 + PCA9685 PWM Driver
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        12x MG995 Metal-Gear Servos (Arms, Torso, Neck) + MPU6050 IMU
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-neon-emerald/5 border border-emerald-400/30 dark:border-neon-emerald/20 flex items-center gap-2.5">
                      <ShieldCheck size={18} className="text-emerald-600 dark:text-neon-emerald shrink-0" />
                      <div className="text-[11px] text-emerald-800 dark:text-neon-emerald font-sans font-medium">
                        Upper body built (arms, torso, head) with standing-pose zero calibration completed for all 12 joints!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Grid for the Other 3 Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherProjects.map((project) => {
          return (
            <div
              key={project.id || project.slug}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-neon-cyan/40 transition-all hover:-translate-y-1"
            >
              <div>
                {/* Header status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    project.status === 'In Progress' || project.status === 'In Development'
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-700 dark:text-neon-emerald border border-emerald-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${project.status.includes('In') ? 'bg-amber-500 dark:bg-amber-400 animate-pulse' : 'bg-emerald-500 dark:bg-neon-emerald'}`} />
                    {project.status}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors flex items-center gap-1 font-semibold">
                    Read Details <ArrowRight size={12} />
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors mb-2 leading-snug">
                  {project.title}
                </h4>

                {/* Tagline */}
                {project.tagline && (
                  <p className="text-xs text-cyan-600 dark:text-neon-cyan font-semibold mb-2">
                    {project.tagline}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Bullets */}
                {project.bullets && (
                  <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    {project.bullets.slice(0, 2).map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-neon-cyan mt-1 shrink-0" />
                        <span className="line-clamp-2">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom: Stack chips */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack?.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack?.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-cyan-600 dark:text-neon-cyan">
                      +{project.stack.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal View */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
