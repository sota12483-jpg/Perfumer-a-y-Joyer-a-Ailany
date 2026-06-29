import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Perfumería y Joyería Ailany",
  description:
    "Lee los términos y condiciones de uso del sitio web y los servicios de Perfumería y Joyería Ailany.",
}

const sections = [
  {
    title: "1. Aceptación de los términos",
    content: [
      "Al acceder y utilizar el sitio web de Perfumería y Joyería Ailany (en adelante 'el Sitio'), aceptas cumplir y quedar vinculado por los presentes Términos y Condiciones de uso. Si no estás de acuerdo con alguno de estos términos, te pedimos que no uses nuestro Sitio.",
      "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el Sitio. El uso continuado del Sitio después de dichos cambios constituirá tu aceptación de los nuevos términos.",
    ],
  },
  {
    title: "2. Descripción del servicio",
    content: [
      "Perfumería y Joyería Ailany es una tienda en línea con sede en República Dominicana que ofrece perfumes, relojes y joyería de marcas reconocidas a nivel internacional. Nuestro modelo de negocio opera principalmente a través de consultas y ventas por WhatsApp.",
      "Todos los productos que comercializamos son 100% originales y cuentan con su empaque completo y sellado de fábrica. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del Sitio o de nuestros servicios en cualquier momento sin previo aviso.",
    ],
  },
  {
    title: "3. Precios y pagos",
    content: [
      "Todos los precios publicados en nuestro Sitio están expresados en pesos dominicanos (RD$) salvo que se indique lo contrario. Los precios pueden estar sujetos a cambios sin previo aviso debido a fluctuaciones del mercado o disponibilidad de inventario.",
      "Aceptamos distintos métodos de pago según lo acordado en cada transacción por WhatsApp, incluyendo transferencias bancarias locales y otros métodos disponibles en República Dominicana. Los detalles de pago se confirmarán directamente con el cliente antes de procesar cada pedido.",
      "El precio final de cada producto incluye el costo del artículo. Los gastos de envío, si aplican, se indicarán por separado al momento de confirmar el pedido.",
    ],
  },
  {
    title: "4. Política de envíos y entregas",
    content: [
      "Realizamos entregas a todo el territorio de República Dominicana. Los tiempos de entrega y costos de envío varían según la ubicación del cliente y la disponibilidad del producto.",
      "Una vez confirmado el pago, procesamos los pedidos en un plazo de 1 a 2 días hábiles. Los tiempos de entrega estimados son: Santo Domingo y área metropolitana: 1 a 2 días hábiles. Interior del país: 2 a 5 días hábiles.",
      "En caso de demora o inconveniente con el envío, te notificaremos por WhatsApp y buscaremos la solución más conveniente para ti.",
    ],
  },
  {
    title: "5. Política de devoluciones y garantías",
    content: [
      "Dado que comercializamos productos de perfumería y artículos de uso personal, las devoluciones están sujetas a las siguientes condiciones:",
      "• El producto debe estar en su empaque original, sin abrir y sin usar.",
      "• La solicitud de devolución debe realizarse dentro de los 3 días calendario siguientes a la recepción del producto.",
      "• Los productos que han sido abiertos, usados o que muestren señales de uso no son elegibles para devolución, salvo que presenten un defecto de fabricación comprobable.",
      "• Los gastos de envío asociados a la devolución serán responsabilidad del cliente, excepto en casos donde el producto presente defectos comprobados.",
      "Para iniciar un proceso de devolución, contacta a nuestro equipo por WhatsApp con tu número de pedido y una descripción del inconveniente.",
    ],
  },
  {
    title: "6. Uso aceptable del sitio",
    content: [
      "Al usar nuestro Sitio, te comprometes a no:",
      "• Usar el Sitio con fines ilegales o no autorizados.",
      "• Intentar acceder sin autorización a áreas restringidas del Sitio.",
      "• Publicar o transmitir contenido falso, engañoso, difamatorio u ofensivo.",
      "• Usar herramientas automatizadas para extraer datos del Sitio sin autorización.",
      "• Interferir con el funcionamiento normal del Sitio o sus servidores.",
      "El incumplimiento de estas condiciones puede resultar en la suspensión o cancelación de tu acceso al Sitio.",
    ],
  },
  {
    title: "7. Propiedad intelectual",
    content: [
      "Todo el contenido del Sitio, incluyendo textos, imágenes, logotipos, diseño y código, es propiedad de Perfumería y Joyería Ailany o está licenciado para su uso, y está protegido por las leyes de propiedad intelectual aplicables.",
      "Queda prohibida la reproducción, distribución, modificación o uso comercial de cualquier contenido del Sitio sin autorización expresa y por escrito de Perfumería y Joyería Ailany.",
    ],
  },
  {
    title: "8. Limitación de responsabilidad",
    content: [
      "Perfumería y Joyería Ailany no será responsable por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de uso de nuestros productos o servicios.",
      "No garantizamos que el Sitio esté libre de errores, virus u otros elementos dañinos. El uso del Sitio es bajo tu propio riesgo. Nuestra responsabilidad máxima en cualquier caso no excederá el monto que hayas pagado por el producto o servicio en cuestión.",
    ],
  },
  {
    title: "9. Publicidad de terceros",
    content: [
      "Nuestro sitio web puede mostrar anuncios de terceros a través de servicios como Google AdSense. Estos anuncios son gestionados por terceros y el contenido de los mismos no refleja necesariamente las opiniones o valores de Perfumería y Joyería Ailany.",
      "Los anunciantes pueden usar cookies para mostrar anuncios relevantes basados en tus visitas previas a este sitio y otros sitios web. Para más información, puedes revisar la Política de Privacidad de Google en su sitio oficial.",
    ],
  },
  {
    title: "10. Ley aplicable y jurisdicción",
    content: [
      "Estos Términos y Condiciones se rigen por las leyes de la República Dominicana. Cualquier disputa que surja en relación con estos términos o con el uso de nuestros servicios estará sujeta a la jurisdicción exclusiva de los tribunales competentes de la República Dominicana.",
    ],
  },
  {
    title: "11. Contacto",
    content: [
      "Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través de:",
      "• WhatsApp: +1 809-397-7816",
      "• Correo electrónico: monteromonteroeduard@gmail.com",
      "• Ubicación: República Dominicana",
    ],
  },
]

export default function TerminosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground">
              Última actualización: 29 de junio de 2026
            </p>
            <div className="mt-5 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-sm text-foreground/90 leading-relaxed">
                Por favor, lee estos Términos y Condiciones cuidadosamente antes de usar el sitio web de{" "}
                <strong>Perfumería y Joyería Ailany</strong>. Al acceder o usar nuestro sitio, aceptas quedar vinculado
                por los términos descritos a continuación.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="bg-card border border-border rounded-xl p-6 md:p-7">
                <h2 className="text-lg font-bold text-foreground mb-4">{section.title}</h2>
                <div className="space-y-2">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-sm text-foreground/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-sm text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              href="/privacidad"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-sm text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              Ver Política de Privacidad
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
