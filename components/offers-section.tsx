"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Tag, Percent, Gift, Zap } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { createClient } from "@/lib/supabase/client"

const WHATSAPP_NUMBER = "18093977816"

interface Product {
  id: string
  name: string
  brand: string
  image: string
  price: string
  category: "perfume" | "reloj" | "oferta"
  position: number
}

const badges = [
  { icon: Tag, label: "Descuentos hasta 30%" },
  { icon: Percent, label: "Ofertas Flash" },
  { icon: Gift, label: "Combos Especiales" },
  { icon: Zap, label: "Envío Gratis" },
]

function OfertaSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
      <div className="aspect-square bg-secondary/40" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-secondary/60 rounded" />
        <div className="h-5 w-3/4 bg-secondary/60 rounded" />
        <div className="h-8 w-24 bg-secondary/60 rounded" />
        <div className="h-10 w-full bg-secondary/40 rounded" />
      </div>
    </div>
  )
}

export function OffersSection() {
  const [ofertas, setOfertas] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { isAdmin } = useAuth()

  useEffect(() => {
    const fetchOfertas = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category", "oferta")
        .order("position")

      setOfertas(data ?? [])
      setLoading(false)
    }
    fetchOfertas()
  }, [])

  return (
    <section id="ofertas" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Aprovecha</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ofertas Especiales</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Descuentos exclusivos en combos y paquetes seleccionados
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary"
            >
              <badge.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <OfertaSkeleton key={i} />)
            : ofertas.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  whatsappNumber={WHATSAPP_NUMBER}
                  isAdmin={isAdmin}
                />
              ))}
        </div>
      </div>
    </section>
  )
}
