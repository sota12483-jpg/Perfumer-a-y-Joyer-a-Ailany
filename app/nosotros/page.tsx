import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, Heart, Shield, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Perfumería y Joyería Ailany",
  description:
    "Conoce la historia de Perfumería y Joyería Ailany: nuestra pasión por las fragancias de lujo, nuestro compromiso con la originalidad y nuestro servicio personalizado en República Dominicana.",
}

const values = [
  {
    icon: Shield,
    title: "100% Originales",
    description:
      "Solo comercializamos productos auténticos de las mejores marcas internacionales. Tu inversión está protegida.",
  },
  {
    icon: Heart,
    title: "Pasión por la perfumería",
    description:
      "Somos amantes de las fragancias. Conocemos cada producto que vendemos y lo recomendamos con honestidad.",
  },
  {
    icon: Star,
    title: "Atención personalizada",
    description:
      "Te ayudamos a encontrar el perfume ideal para ti, tu estilo de vida y tu presupuesto. Sin presiones, con criterio.",
  },
  {
    icon: CheckCircle,
    title: "Confianza y transparencia",
    description:
      "Precios claros, descripciones honestas y un equipo disponible para responder todas tus preguntas.",
  },
]

export default function NosotrosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-4xl">

          {/* Hero */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Nuestra historia
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre Nosotros
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Perfumería y Joyería Ailany nació de una pasión genuina por las fragancias de lujo y el deseo de acercar
              ese mundo a más personas en República Dominicana.
            </p>
          </div>

          {/* Story */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-5">Nuestra historia</h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Ailany comenzó como un proyecto personal impulsado por el amor a los perfumes. Lo que empezó como una
                búsqueda propia de fragancias originales a buen precio se convirtió en algo más grande: la oportunidad
                de ayudar a otras personas a descubrir el poder transformador de una buena fragancia.
              </p>
              <p>
                Desde nuestros inicios, nos propusimos un objetivo claro: ofrecer perfumes, relojes y joyería
                100% originales, con la misma calidad que encontrarías en las tiendas internacionales más exclusivas,
                pero con el trato cercano y personalizado de un negocio familiar dominicano.
              </p>
              <p>
                Hoy atendemos a clientes de toda República Dominicana a través de nuestra plataforma en línea y
                WhatsApp, donde cada consulta recibe una respuesta honesta y una recomendación genuina. No vendemos
                solo productos: ayudamos a nuestros clientes a encontrar su fragancia identidad, ese aroma que los
                representa y que los acompañará en sus momentos más importantes.
              </p>
            </div>
          </div>

          {/* Values */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What we offer */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-5">Qué ofrecemos</h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                En Ailany encontrarás una selección curada de <strong className="text-foreground">perfumes de lujo</strong> para hombre y mujer,
                incluyendo fragancias de las casas más reconocidas del mundo. Cada frasco que vendemos es original,
                con su empaque completo y sellado de fábrica.
              </p>
              <p>
                Nuestra sección de <strong className="text-foreground">relojes</strong> incluye piezas que combinan elegancia y funcionalidad,
                desde modelos clásicos hasta diseños deportivos modernos. También contamos con <strong className="text-foreground">joyería</strong> seleccionada
                para complementar tu estilo en cualquier ocasión.
              </p>
              <p>
                Todo nuestro proceso de compra se realiza de manera sencilla: exploras nuestro catálogo, seleccionas
                los productos que te interesan y nos consultas directamente por WhatsApp. Sin complicaciones, sin
                procesos eternos. Solo atención rápida, honesta y personalizada.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center p-8 rounded-2xl bg-primary/10 border border-primary/20">
            <p className="text-xl font-semibold text-foreground mb-2">¿Tienes alguna pregunta?</p>
            <p className="text-muted-foreground mb-6">
              Estamos disponibles en WhatsApp para ayudarte con cualquier consulta sobre nuestros productos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/18093977816"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors text-sm"
              >
                Contactar por WhatsApp
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-secondary transition-colors text-sm"
              >
                Ver nuestros productos
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
