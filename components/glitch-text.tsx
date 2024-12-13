import React, { useState, useEffect } from 'react'

interface GlitchTextProps {
  children: React.ReactNode
  duration?: number
}

export function GlitchText({ children, duration = 2000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsGlitching(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!isGlitching) return <>{children}</>

  return (
    <span className="relative inline-block">
      <span className="absolute top-0 left-0 clip-text">{children}</span>
      <span className="absolute top-0 left-0 clip-text animation-glitch-1">{children}</span>
      <span className="absolute top-0 left-0 clip-text animation-glitch-2">{children}</span>
      {children}
    </span>
  )
}

