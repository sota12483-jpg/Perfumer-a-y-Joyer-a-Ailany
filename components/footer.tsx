import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

const WHATSAPP_NUMBER = "18093977816"

export function Footer() {
  return (
    <footer id="contacto" className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Perfumería y Joyería Ailany"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-medium text-primary leading-tight">Perfumería y Joyería</p>
                <p className="text-lg font-bold text-foreground leading-tight">Ailany</p>
              </div>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
              Tu destino para perfumes y relojes de lujo. Productos 100% originales con garantía.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#perfumes" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Perfumes
                </Link>
              </li>
              <li>
                <Link href="#relojes" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Relojes
                </Link>
              </li>
              <li>
                <Link href="#ofertas" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Perfumes Hombre
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Perfumes Mujer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Relojes Deportivos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Relojes Elegantes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  809-397-7816
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>monteromonteroeduard@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>República Dominicana</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 Perfumería y Joyería Ailany. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
              <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" className="h-8" />
              <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
