"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Edit2, Check, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ProductCardProps {
  id: string
  name: string
  brand: string
  image: string
  price: string
  category: "perfume" | "reloj" | "oferta"
  whatsappNumber: string
  isAdmin?: boolean
}

export function ProductCard({
  id,
  name,
  brand,
  image,
  price: initialPrice,
  whatsappNumber,
  isAdmin = false,
}: ProductCardProps) {
  const [price, setPrice] = useState(initialPrice)
  const [isEditing, setIsEditing] = useState(false)
  const [tempPrice, setTempPrice] = useState(price)
  const [saving, setSaving] = useState(false)

  const handleSavePrice = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("products")
      .update({ price: tempPrice })
      .eq("id", id)
    if (!error) {
      setPrice(tempPrice)
    }
    setSaving(false)
    setIsEditing(false)
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto: ${name} de ${brand}. Precio: ${price}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <p className="text-xs text-primary uppercase tracking-wider">{brand}</p>
        <h3 className="text-lg font-semibold text-foreground mt-1 line-clamp-2">{name}</h3>

        <div className="mt-3 flex items-center gap-2">
          {isAdmin && isEditing ? (
            <div className="flex items-center gap-2 w-full">
              <Input
                type="text"
                value={tempPrice}
                onChange={(e) => setTempPrice(e.target.value)}
                className="h-8 text-lg font-bold bg-secondary border-border"
                placeholder="RD$0.00"
                autoFocus
              />
              <Button
                size="sm"
                onClick={handleSavePrice}
                disabled={saving}
                className="h-8 w-8 p-0 bg-primary text-primary-foreground"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl font-bold text-primary">{price}</span>
              {isAdmin && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setTempPrice(price)
                    setIsEditing(true)
                  }}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={handleWhatsAppClick}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Consultar por WhatsApp
        </Button>
      </div>
    </div>
  )
}
