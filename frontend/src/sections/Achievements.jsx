import React, { useState } from 'react'
import { Trophy, Award, Calendar, ChevronDown, ChevronUp, Sparkles, MapPin, Gamepad2 } from 'lucide-react'

export default function Achievements({ achievements }) {
  const [showMore, setShowMore] = useState(false)

  const items = achievements && achievements.length > 0 ? achievements : [
    {
      id: 1,
      title: "Paper Presentation",
      event: "CARE Tech Fest '26",
      organization: "CARE College of Engineering, Tiruchirappalli",
      date_str: "2026",
      rank_badge: "1st Prize",
      is_major: true,
      is_collapsed_only: false
    },
    {
      id: 2,
      title: "Project Expo 2026",
      event: "Engineers' Day Celebrations",
      organization: "Indra Ganesan College of Engineering",
      date_str: "15 Sep 2026",
      rank_badge: "1st Place",
      is_major: true,
      is_collapsed_only: false
    },
    {
      id: 3,
      title: "Idea Presentation",
      event: "WARTECH '26",
      organization: "Parisutham Institute of Technology & Science",
      date_str: "28 Aug 2026",
      rank_badge: "Certificate of Appreciation",
      is_major: true,
      is_collapsed_only: false
    },
    {
      id: 4,
      title: "Esports (Free Fire)",
      event: "AIROX 2026 National-Level Technical Symposium",
      organization: "J.J. College of Engineering and Technology",
      date_str: "22 Aug 2026",
      rank_badge: "2nd Place",
      is_major: false,
      is_collapsed_only: true // Show in collapsed 'More' row only
    }
  ]

  const majorAchievements = items.filter(a => !a.is_collapsed_only)
  const collapsedAchievements = items.filter(a => a.is_collapsed_only)

  const getBadgeStyle = (badge) => {
    if (badge.includes('1st')) {
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-400/30',
        dot: 'bg-amber-500'
      }
    }
    if (badge.includes('Certificate')) {
      return {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-700 dark:text-neon-cyan',
        border: 'border-cyan-400/30',
        dot: 'bg-cyan-500'
      }
    }
    return {
      bg: 'bg-purple-500/10',
      text: 'text-purple-700 dark:text-neon-violet',
      border: 'border-purple-400/30',
      dot: 'bg-purple-500'
    }
  }

  return (
    <section
      id="achievements"
      aria-label="Achievements and Honors"
      className="relative py-24 px-4 sm:px-8 max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border border-amber-400/30 mb-3">
          <Trophy size={12} />
          Honors & Recognition
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
          Awards & <span className="gradient-text-cyan">Milestones</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg">
          Proven competitive success across research paper presentations, engineering expos, and technical summits.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full mt-4" />
      </div>

      {/* Vertical Animated Timeline */}
      <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {majorAchievements.map((item, idx) => {
          const style = getBadgeStyle(item.rank_badge)
          return (
            <div key={item.id || idx} className="relative group">
              {/* Timeline Node Icon */}
              <div className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full ${style.bg} border ${style.border} flex items-center justify-center group-hover:scale-125 transition-transform shadow-md bg-white dark:bg-slate-900`}>
                <span className={`w-2 h-2 rounded-full ${style.dot}`} />
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-amber-400/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text} border ${style.border}`}>
                      <Trophy size={12} />
                      {item.rank_badge}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <Calendar size={12} className="text-slate-400" />
                    <span>{item.date_str}</span>
                  </div>
                </div>

                <div className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-slate-100 mt-2">
                  {item.event}
                </div>

                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin size={13} className="text-cyan-600 dark:text-neon-cyan shrink-0" />
                  <span>{item.organization}</span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Collapsible Row for Esports (Free Fire 2nd Place) */}
        {collapsedAchievements.length > 0 && (
          <div className="pt-2">
            <button
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all"
            >
              <Gamepad2 size={14} className="text-purple-600 dark:text-neon-violet" />
              <span>{showMore ? "Hide Additional Achievements" : "View More Achievements (Esports)"}</span>
              {showMore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showMore && (
              <div className="mt-4 space-y-4 animate-in fade-in duration-300">
                {collapsedAchievements.map((item, idx) => {
                  const style = getBadgeStyle(item.rank_badge)
                  return (
                    <div key={item.id || idx} className="relative group">
                      <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-white/5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.bg} ${style.text} border ${style.border}`}>
                              {item.rank_badge}
                            </span>
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {item.title}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{item.date_str}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1.5">
                          {item.event} — {item.organization}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
