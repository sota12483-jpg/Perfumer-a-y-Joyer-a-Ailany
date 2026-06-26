import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { FeaturesSection } from "@/components/features-section"
import { OffersSection } from "@/components/offers-section"
import { SubscribeSection } from "@/components/subscribe-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

const WHATSAPP_NUMBER = "18093977816"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <OffersSection />
      <SubscribeSection />
      <Footer />
      <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} />
    </main>
  )
}
