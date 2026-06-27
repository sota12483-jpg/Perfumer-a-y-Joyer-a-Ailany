import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { JewelrySection } from "@/components/jewelry-section"
import { FeaturesSection } from "@/components/features-section"
import { OffersSection } from "@/components/offers-section"
import { SubscribeSection } from "@/components/subscribe-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DiscountCodeInput } from "@/components/discount-code-input"
import { AdminPanel } from "@/components/admin-panel"

const WHATSAPP_NUMBER = "18093977816"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <DiscountCodeInput />
      <ProductsSection />
      <JewelrySection />
      <FeaturesSection />
      <OffersSection />
      <SubscribeSection />
      <AdminPanel />
      <Footer />
      <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} />
    </main>
  )
}
