import React, { useEffect } from 'react'
import { X, ExternalLink, Github, Cpu, Layers, CheckCircle2, Bot, Target, Rocket, UserCheck } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!project) return null

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-white/10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Status Badge & Category */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
            project.status.includes('In')
              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30' 
              : 'bg-emerald-500/10 text-emerald-700 dark:text-neon-emerald border border-emerald-500/30'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${project.status.includes('In') ? 'bg-amber-500 dark:bg-amber-400 animate-pulse' : 'bg-emerald-500 dark:bg-neon-emerald'}`} />
            {project.status}
          </span>
          {project.is_featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-neon-cyan border border-cyan-500/30">
              Featured Flagship
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="mt-1 text-sm sm:text-base text-cyan-600 dark:text-neon-cyan font-semibold">
            {project.tagline}
          </p>
        )}

        {/* Overview */}
        <div className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {project.description}
        </div>

        {/* Tech Stack Chips */}
        <div className="mt-5">
          <h4 className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
            <Layers size={14} className="text-purple-600 dark:text-neon-violet" />
            Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack && project.stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features & Highlights */}
        {project.bullets && project.bullets.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600 dark:text-neon-emerald" />
              Key Features & Architectural Highlights
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-neon-cyan mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* System Architecture Specifications */}
        {project.architecture_notes && Object.keys(project.architecture_notes).length > 0 && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <div className="text-[11px] font-semibold text-cyan-600 dark:text-neon-cyan uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
              <Cpu size={14} />
              Technical Architecture Specifications
            </div>
            {Object.entries(project.architecture_notes).map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:gap-2 border-b border-slate-200/50 dark:border-white/5 pb-1.5 last:border-0 last:pb-0">
                <span className="text-slate-500 dark:text-slate-400 font-semibold capitalize sm:w-44 shrink-0 font-sans">
                  {k.replace(/_/g, ' ')}:
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                  {String(v)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white transition-colors"
              >
                <Github size={16} />
                <span>GitHub Repository</span>
              </a>
            ) : null}

            {project.demo_url ? (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-600 text-white dark:bg-neon-cyan dark:text-black hover:opacity-90 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Live Demonstration</span>
              </a>
            ) : null}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}
