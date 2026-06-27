import { NextRequest, NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  })

  const data = await res.json()
  return data.success === true
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"

  const { ok, retryAfter } = rateLimit(ip, { limit: 5 })
  if (!ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta en un momento." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    )
  }

  try {
    const { email, turnstileToken } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const captchaOk = await verifyTurnstile(turnstileToken ?? "")
    if (!captchaOk) {
      return NextResponse.json({ error: "Verificación de seguridad fallida. Intenta de nuevo." }, { status: 403 })
    }

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 500 })
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
      }),
    })

    // 201 = creado, 204 = ya existía y fue actualizado
    if (response.status === 201 || response.status === 204) {
      return NextResponse.json({ success: true })
    }

    const data = await response.json()
    return NextResponse.json(
      { error: data.message ?? "Error al suscribir" },
      { status: response.status }
    )
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
