"use client"

import React, { useEffect, useState } from "react"

interface FadeInHeadingProps {
  text: string
  delay?: number
  duration?: number
}

export function FadeInHeading({ text, delay = 0, duration = 1000 }: FadeInHeadingProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <h1
      className="text-8xl font-bold text-white "
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`,
      }}
      aria-hidden={!isVisible}
    >
      {text}
    </h1>
  )
}
