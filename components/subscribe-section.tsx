"use client"

import { useState, useRef } from "react"
import { Loader2, Mail, Sparkles, CheckCircle2 } from "lucide-react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"

type Status = "idle" | "loading" | "success" | "error"

export function SubscribeSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading" || status === "success") return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setErrorMsg(data.error ?? "Ocurrió un error. Intenta de nuevo.")
        setStatus("error")
        // Reset widget so the user can get a fresh token on retry
        turnstileRef.current?.reset()
        setTurnstileToken(null)
      }
    } catch {
      setErrorMsg("No se pudo conectar. Intenta de nuevo.")
      setStatus("error")
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""

  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="mx-auto max-w-2xl px-4 text-center">

        {/* Icono decorativo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-primary text-xs font-medium tracking-widest uppercase">
            Club Exclusivo
          </span>
          <Sparkles className="h-4 w-4 text-primary" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ofertas que{" "}
          <span className="text-primary">no encontrarás</span>
          {" "}en otro lugar
        </h2>

        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Suscríbete y recibe primero las promociones exclusivas, nuevos productos y descuentos especiales de Ailany.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-3 py-4">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <p className="text-lg font-medium text-foreground">
              ¡Suscrito exitosamente! Pronto recibirás nuestras ofertas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === "error") setStatus("idle")
                  }}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !turnstileToken}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-70 transition-colors whitespace-nowrap"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Recibir ofertas exclusivas"
                )}
              </button>
            </div>

            {siteKey && (
              <Turnstile
                ref={turnstileRef}
                siteKey={siteKey}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
                options={{ size: "invisible" }}
              />
            )}
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-destructive">{errorMsg}</p>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          Sin spam. Puedes cancelar cuando quieras.
        </p>
      </div>
    </section>
  )
}
