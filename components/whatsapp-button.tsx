"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { useSelection } from "@/context/selection-context"
import { useDiscount } from "@/context/discount-context"
import { useStoreSettings } from "@/hooks/use-store-settings"

interface WhatsAppButtonProps {
  phoneNumber: string
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const { selected, clear } = useSelection()
  const { discount } = useDiscount()
  const { settings } = useStoreSettings()
  const [showPanel, setShowPanel] = useState(false)

  const count = selected.length
  const minQty = parseInt(settings.bulk_discount_min_qty, 10) || 3
  const bulkPct = settings.bulk_discount_percentage
  const bulkCode = settings.bulk_discount_code
  const showBulkBanner = count >= minQty && !discount.isActive

  const handleFloatingClick = () => {
    if (count === 0) {
      const msg = encodeURIComponent(
        "¡Hola! Me interesa conocer más sobre sus productos de perfumes y relojes."
      )
      window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank")
      return
    }
    setShowPanel((v) => !v)
  }

  const handleSendConsulta = () => {
    const lines = selected.map((p, i) => {
      const priceInfo = p.discountedPrice
        ? `${p.discountedPrice} (antes ${p.price})`
        : p.price
      return `${i + 1}. ${p.name} – ${p.brand} – ${priceInfo}`
    })

    let msg = `¡Hola! Me interesan los siguientes productos:\n\n${lines.join("\n")}`

    if (discount.isActive) {
      msg += `\n\nCódigo de descuento aplicado: ${discount.code}`
    } else if (showBulkBanner) {
      msg += `\n\nCódigo de mayoreo: ${bulkCode} (${bulkPct}% de descuento por ${count}+ productos)`
    }

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank")
    setShowPanel(false)
    clear()
  }

  return (
    <>
      {/* Bulk discount banner */}
      {showBulkBanner && !showPanel && (
        <div className="fixed bottom-24 right-6 z-50 max-w-[220px] bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg text-center leading-snug">
          🎉 ¡{bulkPct}% de descuento con {count}+ productos!
          <br />
          Usa el código{" "}
          <span className="font-mono font-bold">{bulkCode}</span>
        </div>
      )}

      {/* Selection panel */}
      {showPanel && count > 0 && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-h-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <p className="text-sm font-bold text-foreground">
              {count} producto{count !== 1 ? "s" : ""} en consulta
            </p>
            <button
              onClick={() => setShowPanel(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-4 py-3 space-y-2">
            {selected.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-2 text-xs">
                <div>
                  <p className="font-semibold text-foreground leading-tight">{p.name}</p>
                  <p className="text-muted-foreground">{p.brand}</p>
                </div>
                <span className="font-bold text-primary shrink-0">
                  {p.discountedPrice ?? p.price}
                </span>
              </div>
            ))}
          </div>

          {showBulkBanner && (
            <div className="px-4 py-2 bg-yellow-400/10 border-t border-yellow-400/20 text-xs text-yellow-500 font-medium">
              🎉 Aplica el código{" "}
              <span className="font-mono font-bold">{bulkCode}</span> para {bulkPct}% de descuento
            </div>
          )}

          {discount.isActive && (
            <div className="px-4 py-2 bg-primary/10 border-t border-primary/20 text-xs text-primary font-medium">
              Código <span className="font-mono font-bold">{discount.code}</span> activo —{" "}
              {discount.type === "percentage"
                ? `${discount.value}% off`
                : `RD$${discount.value} off`}
            </div>
          )}

          <div className="px-4 py-3 border-t border-border">
            <button
              onClick={handleSendConsulta}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar consulta por WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleFloatingClick}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
    </>
  )
}
