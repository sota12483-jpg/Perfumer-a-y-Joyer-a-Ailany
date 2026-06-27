import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : null
    if (!code) {
      return NextResponse.json({ valid: false, message: "Código inválido" }, { status: 400 })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      return NextResponse.json({ valid: false, message: "Servicio no disponible" }, { status: 503 })
    }

    const supabase = createClient(url, key)

    const { data, error } = await supabase
      .from("discount_codes")
      .select("type, value, active, expires_at")
      .eq("code", code)
      .single()

    if (error || !data) {
      return NextResponse.json({ valid: false, message: "Código no encontrado" })
    }
    if (!data.active) {
      return NextResponse.json({ valid: false, message: "Este código no está activo" })
    }
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, message: "Este código ha expirado" })
    }

    return NextResponse.json({
      valid: true,
      type: data.type,
      value: data.value,
      message:
        data.type === "percentage"
          ? `¡${data.value}% de descuento aplicado!`
          : `¡Descuento de RD$${data.value} aplicado!`,
    })
  } catch {
    return NextResponse.json({ valid: false, message: "Error al validar el código" }, { status: 500 })
  }
}
