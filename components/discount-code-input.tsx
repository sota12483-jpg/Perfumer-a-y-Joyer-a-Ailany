"use client"

import { useState } from "react"
import { Tag, Check, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDiscount } from "@/context/discount-context"

export function DiscountCodeInput() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)
  const { discount, applyDiscount, clearDiscount } = useDiscount()

  const handleValidate = async () => {
    const trimmed = code.trim()
    if (!trimmed) return
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      })
      const data = await res.json()
      if (data.valid) {
        applyDiscount(trimmed.toUpperCase(), data.type, data.value)
        setMessage({ text: data.message, ok: true })
        setCode("")
      } else {
        setMessage({ text: data.message, ok: false })
      }
    } catch {
      setMessage({ text: "Error de conexión", ok: false })
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    clearDiscount()
    setCode("")
    setMessage(null)
  }

  return (
    <section className="py-10 bg-secondary/20 border-y border-border">
      <div className="mx-auto max-w-xl px-4">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Tag className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium text-foreground">¿Tienes un código de descuento?</p>
        </div>

        {discount.isActive ? (
          <div className="flex items-center justify-between bg-primary/10 border border-primary/30 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Código <strong>{discount.code}</strong> activo —{" "}
                {discount.type === "percentage"
                  ? `${discount.value}% de descuento`
                  : `RD$${discount.value} de descuento`}
              </span>
            </div>
            <button
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground ml-4 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleValidate()}
              placeholder="CÓDIGO123"
              className="bg-background border-border font-mono tracking-wider"
              maxLength={20}
            />
            <Button
              onClick={handleValidate}
              disabled={loading || !code.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Aplicar"}
            </Button>
          </div>
        )}

        {message && !discount.isActive && (
          <p
            className={`mt-2 text-sm text-center ${
              message.ok ? "text-green-500" : "text-destructive"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </section>
  )
}
