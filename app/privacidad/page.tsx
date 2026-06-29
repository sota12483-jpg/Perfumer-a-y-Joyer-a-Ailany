import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Política de Privacidad | Perfumería y Joyería Ailany",
  description:
    "Lee nuestra política de privacidad y conoce cómo recopilamos, usamos y protegemos tu información personal en Perfumería y Joyería Ailany.",
}

const sections = [
  {
    title: "1. Información que recopilamos",
    content: [
      "Al interactuar con Perfumería y Joyería Ailany a través de nuestro sitio web o por WhatsApp, podemos recopilar la siguiente información personal:",
      "• Nombre completo y datos de contacto (número de teléfono, dirección de correo electrónico) cuando nos los proporcionas voluntariamente.",
      "• Dirección de envío o entrega cuando realizas una compra.",
      "• Preferencias de productos e historial de consultas cuando nos contactas por WhatsApp.",
      "• Datos de navegación de forma anónima a través de herramientas de análisis web (como Google Analytics), incluyendo páginas visitadas, tiempo de permanencia y dispositivo utilizado.",
      "• Información de cuenta cuando inicias sesión con Google a través de nuestra plataforma, incluyendo nombre, dirección de correo y foto de perfil.",
    ],
  },
  {
    title: "2. Cómo usamos tu información",
    content: [
      "La información que recopilamos se utiliza exclusivamente para los siguientes fines:",
      "• Procesar y gestionar tus pedidos y consultas de productos.",
      "• Comunicarnos contigo para confirmar compras, coordinar entregas y responder preguntas.",
      "• Mejorar nuestros productos, servicios y la experiencia de usuario en nuestro sitio web.",
      "• Enviarte información relevante sobre nuevos productos, ofertas especiales o novedades, únicamente si has dado tu consentimiento expreso.",
      "• Cumplir con obligaciones legales aplicables en la República Dominicana.",
    ],
  },
  {
    title: "3. Compartir información con terceros",
    content: [
      "En Perfumería y Joyería Ailany nos comprometemos a no vender, alquilar ni ceder tu información personal a terceros con fines comerciales.",
      "Sin embargo, podemos compartir información limitada con proveedores de servicios de confianza que nos ayudan a operar nuestro negocio, como servicios de logística o plataformas de pago, bajo estrictos acuerdos de confidencialidad.",
      "También podemos divulgar información cuando sea requerido por ley, orden judicial u otra autoridad competente de la República Dominicana.",
    ],
  },
  {
    title: "4. Cookies y tecnologías similares",
    content: [
      "Nuestro sitio web utiliza cookies y tecnologías similares para mejorar tu experiencia de navegación. Las cookies son pequeños archivos que se almacenan en tu dispositivo y nos permiten:",
      "• Recordar tus preferencias de navegación.",
      "• Analizar el tráfico y comportamiento de los usuarios en el sitio.",
      "• Mostrar publicidad relevante a través de Google AdSense.",
      "Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envíe una cookie. Ten en cuenta que algunas funcionalidades del sitio pueden no funcionar correctamente si rechazas las cookies.",
    ],
  },
  {
    title: "5. Seguridad de la información",
    content: [
      "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, pérdida, alteración o divulgación. Nuestro sitio utiliza cifrado SSL/TLS para proteger la transmisión de datos.",
      "Sin embargo, ningún sistema de transmisión de datos por Internet es completamente seguro. Si tienes razones para creer que tu interacción con nosotros ya no es segura, por favor contáctanos de inmediato.",
    ],
  },
  {
    title: "6. Tus derechos sobre tu información",
    content: [
      "Como titular de tus datos personales, tienes derecho a:",
      "• Acceder a la información personal que tenemos sobre ti.",
      "• Solicitar la corrección de datos incorrectos o desactualizados.",
      "• Solicitar la eliminación de tu información personal, sujeto a obligaciones legales.",
      "• Retirar tu consentimiento para el uso de tus datos en cualquier momento.",
      "• Oponerte al uso de tus datos para comunicaciones de marketing.",
      "Para ejercer cualquiera de estos derechos, contáctanos a través de nuestro WhatsApp (+1 809-397-7816) o al correo electrónico monteromonteroeduard@gmail.com.",
    ],
  },
  {
    title: "7. Retención de datos",
    content: [
      "Conservamos tu información personal durante el tiempo necesario para cumplir los fines descritos en esta política, a menos que la ley exija o permita un período de retención más largo.",
      "Cuando ya no necesitemos tu información personal, la eliminaremos o anonimizaremos de forma segura.",
    ],
  },
  {
    title: "8. Cambios a esta política",
    content: [
      "Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cualquier cambio significativo será notificado en nuestro sitio web con al menos 30 días de anticipación.",
      "Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier actualización. El uso continuo de nuestros servicios después de los cambios constituye tu aceptación de la política revisada.",
    ],
  },
  {
    title: "9. Contacto",
    content: [
      "Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad, puedes contactarnos a través de:",
      "• WhatsApp: +1 809-397-7816",
      "• Correo electrónico: monteromonteroeduard@gmail.com",
      "• Ubicación: República Dominicana",
    ],
  },
]

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground">
              Última actualización: 29 de junio de 2026
            </p>
            <div className="mt-5 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-sm text-foreground/90 leading-relaxed">
                En <strong>Perfumería y Joyería Ailany</strong> nos tomamos muy en serio la privacidad de nuestros clientes.
                Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando interactúas
                con nuestro sitio web y servicios.
              </p>
            </div>
          </div>

          <div className="space-y-8">
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
              href="/terminos"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-sm text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              Ver Términos y Condiciones
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
