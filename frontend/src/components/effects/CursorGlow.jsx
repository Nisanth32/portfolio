import React, { useState, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 })
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Disable on touch devices or reduced motion preference
    if (prefersReducedMotion || ('ontouchstart' in window)) return

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion, isVisible])

  if (prefersReducedMotion || !isVisible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
        borderRadius: '50%'
      }}
    />
  )
}
