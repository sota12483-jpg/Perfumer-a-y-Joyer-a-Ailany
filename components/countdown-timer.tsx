"use client"

import { useState, useEffect, useRef } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  expiresAt: string
  onExpire?: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

export function CountdownTimer({ expiresAt, onExpire }: CountdownTimerProps) {
  const target = useRef(new Date(expiresAt))
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calcTimeLeft(target.current))

  useEffect(() => {
    target.current = new Date(expiresAt)
    setTimeLeft(calcTimeLeft(target.current))
  }, [expiresAt])

  useEffect(() => {
    const id = setInterval(() => {
      const t = calcTimeLeft(target.current)
      setTimeLeft(t)
      if (!t) {
        clearInterval(id)
        onExpire?.()
      }
    }, 1_000)
    return () => clearInterval(id)
  }, [expiresAt, onExpire])

  if (!timeLeft) return null

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-orange-400">
      <Clock className="h-3 w-3 shrink-0" />
      {timeLeft.days > 0 && <span>{timeLeft.days}d</span>}
      <span>{pad(timeLeft.hours)}h</span>
      <span>{pad(timeLeft.minutes)}m</span>
      <span>{pad(timeLeft.seconds)}s</span>
    </div>
  )
}
