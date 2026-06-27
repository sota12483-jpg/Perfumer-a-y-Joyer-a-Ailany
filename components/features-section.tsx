"use client"

import { Shield, Truck, Clock, Award, Sparkles } from "lucide-react"
import { useStoreSettings } from "@/hooks/use-store-settings"

export function FeaturesSection() {
  const { settings } = useStoreSettings()
  const threshold = parseInt(settings.free_shipping_threshold, 10) || 3000
  const formatted = threshold.toLocaleString("es-DO")

  const features = [
    {
      icon: Shield,
      title: "Garantía de Autenticidad",
      description: "Todos nuestros productos son 100% originales con certificado de autenticidad.",
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Solo trabajamos con las marcas más reconocidas y prestigiosas del mercado.",
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: `Entrega segura en todo el país. Envío gratis en compras mayores a RD$${formatted}.`,
    },
    {
      icon: Clock,
      title: "Atención 24/7",
      description: "Estamos disponibles para atenderte en cualquier momento vía WhatsApp.",
    },
  ]

  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-primary text-sm font-medium tracking-widest uppercase">
              Por qué elegirnos
            </p>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Productos Originales y Exclusivos
          </h2>

          {/* Free shipping banner */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Truck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Envío gratis en compras mayores a RD${formatted}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-lg border border-border bg-background/50 hover:border-primary/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
