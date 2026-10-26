import React, { useState } from 'react'
import {
  Code2,
  Database,
  Layers,
  Cpu,
  Sparkles,
  Bot,
  Binary,
  Radio,
  Compass,
  Zap,
  Server,
  CircuitBoard,
  TableProperties,
  Eye,
  Microchip,
  Cog,
  Brain
} from 'lucide-react'

const ICON_MAP = {
  Code2,
  Database,
  Layers,
  Cpu,
  Sparkles,
  Bot,
  Binary,
  Radio,
  Compass,
  Zap,
  Server,
  CircuitBoard,
  TableProperties,
  Eye,
  Microchip,
  Cog,
  Brain,
}

export default function Skills({ skillsGrouped }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const groups = skillsGrouped || [
    {
      category: "programming",
      title: "Programming",
      skills: [
        { name: "Python", icon_name: "Code2" },
        { name: "C", icon_name: "Cpu" },
        { name: "SQL", icon_name: "Database" }
      ]
    },
    {
      category: "data",
      title: "Data Science",
      skills: [
        { name: "Pandas", icon_name: "TableProperties" }
      ]
    },
    {
      category: "web",
      title: "Web Development",
      skills: [
        { name: "React", icon_name: "Layers" },
        { name: "FastAPI", icon_name: "Zap" },
        { name: "Django", icon_name: "Server" },
        { name: "MySQL", icon_name: "Database" },
        { name: "Next.js", icon_name: "Layers" },
        { name: "Firebase", icon_name: "Zap" }
      ]
    },
    {
      category: "embedded_robotics",
      title: "Embedded & Robotics",
      skills: [
        { name: "Jetson Nano", icon_name: "Cpu" },
        { name: "ESP32", icon_name: "CircuitBoard" },
        { name: "PCA9685 servo driver", icon_name: "Radio" },
        { name: "IMU sensor integration", icon_name: "Compass" },
        { name: "MG995 Servos", icon_name: "Bot" }
      ]
    },
    {
      category: "ai_tools",
      title: "AI Dev Tools",
      skills: [
        { name: "Google Antigravity", icon_name: "Sparkles" },
        { name: "Claude", icon_name: "Bot" }
      ]
    },
    {
      category: "interests",
      title: "Interests & Research",
      skills: [
        { name: "Robotics", icon_name: "Bot" },
        { name: "Artificial Intelligence", icon_name: "Brain" },
        { name: "Machine Learning", icon_name: "Binary" },
        { name: "Computer Vision", icon_name: "Eye" },
        { name: "Embedded Systems", icon_name: "Microchip" },
        { name: "Intelligent Automation", icon_name: "Cog" }
      ]
    }
  ]

  const filteredGroups = activeCategory === 'all'
    ? groups
    : groups.filter(g => g.category === activeCategory)

  return (
    <section
      id="skills"
      aria-label="Skills & Capabilities"
      className="relative py-24 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-purple-600 dark:text-neon-violet bg-purple-50 dark:bg-neon-violet/10 border border-purple-400/30 mb-3">
          <Cpu size={12} />
          Technical Stack
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
          Skills & <span className="gradient-text-cyan">Domain Expertise</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg">
          Hands-on technical competencies across software engineering, machine learning, and physical robotics hardware.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-4" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white dark:bg-neon-cyan dark:text-slate-950 shadow-md shadow-cyan-500/20'
              : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          All Skills
        </button>
        {groups.map((group) => (
          <button
            key={group.category}
            onClick={() => setActiveCategory(group.category)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === group.category
                ? 'bg-slate-900 text-white dark:bg-neon-cyan dark:text-slate-950 shadow-md shadow-cyan-500/20'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            {group.title}
          </button>
        ))}
      </div>

      {/* Skills Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.category}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  {group.title}
                </h3>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                  {group.skills.length} competencies
                </span>
              </div>

              {/* Skill Chips (NO fake percentage bars) */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => {
                  const Icon = ICON_MAP[skill.icon_name] || Code2
                  return (
                    <div
                      key={sIdx}
                      className="group/chip inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-cyan-500 dark:hover:border-neon-cyan/50 hover:bg-cyan-50 dark:hover:bg-neon-cyan/10 hover:scale-105 active:scale-95 transition-all cursor-default"
                    >
                      <Icon size={14} className="text-cyan-600 dark:text-neon-cyan group-hover/chip:rotate-12 transition-transform" />
                      <span>{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
