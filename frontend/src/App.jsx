import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { useTheme } from './hooks/useTheme'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useReducedMotion } from './hooks/useReducedMotion'
import { api } from './services/api'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CursorGlow from './components/effects/CursorGlow'

import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'achievements', 'contact']
  const activeSection = useScrollSpy(sectionIds, 150)

  const [data, setData] = useState({
    profile: null,
    skills: null,
    projects: [],
    achievements: []
  })
  const [loading, setLoading] = useState(true)

  // Lenis Smooth Scroll Initialization
  useEffect(() => {
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const animId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animId)
      lenis.destroy()
    }
  }, [prefersReducedMotion])

  // Fetch data (API with fallback)
  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [profile, skills, projects, achievements] = await Promise.all([
          api.getProfile(),
          api.getSkills(),
          api.getProjects(),
          api.getAchievements()
        ])

        setData({
          profile,
          skills,
          projects,
          achievements
        })
      } catch (err) {
        console.warn('Fallback data loaded:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolioData()
  }, [])

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#07090e] dark:text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:bg-neon-cyan/20 dark:selection:text-neon-cyan transition-colors duration-300">
      {/* Desktop Ambient Cursor Glow */}
      <CursorGlow />

      {/* Sticky Glass Navbar */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Skills skillsGrouped={data.skills} />
        <Projects projects={data.projects} />
        <Achievements achievements={data.achievements} />
        <Contact profile={data.profile} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
