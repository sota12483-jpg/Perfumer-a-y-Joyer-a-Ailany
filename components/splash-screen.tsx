"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("ailany_splash")) return

    setShow(true)

    // Doble RAF para garantizar que el DOM montó antes de activar la transición
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })

    // Inicio del fade-out a los 2s
    const fadeOut = setTimeout(() => setVisible(false), 2000)

    // Desmontaje tras completar el fade-out (0.75s de transición)
    const unmount = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem("ailany_splash", "1")
    }, 2800)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fadeOut)
      clearTimeout(unmount)
    }
  }, [])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.75s ease-in-out",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Resplandor dorado de fondo */}
      <div className="relative flex items-center justify-center">
        <div
          className="absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            background: "oklch(0.78 0.12 85 / 0.12)",
            filter: "blur(48px)",
            transform: "scale(1.6)",
          }}
        />

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Perfumería y Joyería Ailany"
          width={210}
          height={210}
          priority
          className="relative rounded-full"
          style={{
            transform: visible ? "scale(1)" : "scale(0.92)",
            transition: "transform 0.75s cubic-bezier(0.34, 1.2, 0.64, 1)",
          }}
        />
      </div>
    </div>
  )
}
