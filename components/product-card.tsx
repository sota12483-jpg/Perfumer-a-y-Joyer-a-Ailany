"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  Edit2,
  Check,
  X,
  Loader2,
  Trash2,
  Timer,
  Plus,
  Minus,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useDiscount } from "@/context/discount-context"
import { useSelection } from "@/context/selection-context"
import { useAuth } from "@/context/auth-context"
import { CountdownTimer } from "@/components/countdown-timer"

interface ProductCardProps {
  id: string
  name: string
  brand: string
  image: string
  price: string
  category: "perfume" | "reloj" | "oferta" | "joyeria"
  whatsappNumber: string
  /** Pasado desde el padre; el card también verifica useAuth para evitar el flash */
  isAdmin?: boolean
  is_limited_offer?: boolean
  offer_expires_at?: string | null
  onDelete?: (id: string) => void
}

export function ProductCard({
  id,
  name: initialName,
  brand: initialBrand,
  image,
  price: initialPrice,
  whatsappNumber,
  is_limited_offer: initialIsLimited = false,
  offer_expires_at: initialExpiresAt = null,
  onDelete,
}: ProductCardProps) {
  // Usa isAdmin y loading del contexto directamente para evitar el flash
  // donde isAdmin=false mientras el auth carga
  const { isAdmin, loading: authLoading } = useAuth()
  const showAdminControls = isAdmin && !authLoading

  // ── Nombre / Marca ──────────────────────────────────────────────
  const [name, setName] = useState(initialName)
  const [brand, setBrand] = useState(initialBrand)
  const [isEditingInfo, setIsEditingInfo] = useState(false)
  const [tempName, setTempName] = useState(name)
  const [tempBrand, setTempBrand] = useState(brand)
  const [savingInfo, setSavingInfo] = useState(false)

  // ── Precio ──────────────────────────────────────────────────────
  const [price, setPrice] = useState(initialPrice)
  const [isEditingPrice, setIsEditingPrice] = useState(false)
  const [tempPrice, setTempPrice] = useState(price)
  const [savingPrice, setSavingPrice] = useState(false)

  // ── Eliminar ────────────────────────────────────────────────────
  const [deleting, setDeleting] = useState(false)

  // ── Oferta limitada ─────────────────────────────────────────────
  const [isLimited, setIsLimited] = useState(initialIsLimited)
  const [expiresAt, setExpiresAt] = useState<string | null>(initialExpiresAt)
  const [showLimitedForm, setShowLimitedForm] = useState(false)
  const [tempExpiry, setTempExpiry] = useState("")
  const [savingLimited, setSavingLimited] = useState(false)
  const [offerExpired, setOfferExpired] = useState(false)

  const { applyToPrice } = useDiscount()
  const { isSelected, toggle } = useSelection()

  const { original, discounted } = applyToPrice(price)
  const selected = isSelected(id)
  const showOffer = isLimited && !!expiresAt && !offerExpired

  // ── Handlers ────────────────────────────────────────────────────

  const handleSaveInfo = async () => {
    if (!tempName.trim() || !tempBrand.trim()) return
    setSavingInfo(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("products")
      .update({ name: tempName.trim(), brand: tempBrand.trim() })
      .eq("id", id)
    if (!error) {
      setName(tempName.trim())
      setBrand(tempBrand.trim())
    }
    setSavingInfo(false)
    setIsEditingInfo(false)
  }

  const handleCancelInfo = () => {
    setTempName(name)
    setTempBrand(brand)
    setIsEditingInfo(false)
  }

  const handleSavePrice = async () => {
    setSavingPrice(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("products")
      .update({ price: tempPrice })
      .eq("id", id)
    if (!error) setPrice(tempPrice)
    setSavingPrice(false)
    setIsEditingPrice(false)
  }

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (!error) {
      onDelete?.(id)
    } else {
      setDeleting(false)
    }
  }

  const handleActivateLimitedOffer = async () => {
    if (!tempExpiry) return
    setSavingLimited(true)
    const supabase = createClient()
    const iso = new Date(tempExpiry).toISOString()
    const { error } = await supabase
      .from("products")
      .update({ is_limited_offer: true, offer_expires_at: iso })
      .eq("id", id)
    if (!error) {
      setIsLimited(true)
      setExpiresAt(iso)
      setOfferExpired(false)
      setShowLimitedForm(false)
      setTempExpiry("")
    }
    setSavingLimited(false)
  }

  const handleRemoveLimitedOffer = async () => {
    setSavingLimited(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("products")
      .update({ is_limited_offer: false, offer_expires_at: null })
      .eq("id", id)
    if (!error) {
      setIsLimited(false)
      setExpiresAt(null)
      setShowLimitedForm(false)
    }
    setSavingLimited(false)
  }

  const handleWhatsAppClick = () => {
    const priceLabel = discounted
      ? `${discounted} (precio original: ${original})`
      : original
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto: ${name} de ${brand}. Precio: ${priceLabel}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  if (deleting) return null

  return (
    <div
      className={`group relative bg-card rounded-lg overflow-hidden border transition-all duration-300 ${
        selected
          ? "border-primary shadow-md shadow-primary/10"
          : "border-border hover:border-primary/50"
      }`}
    >
      {/* Limited offer badge */}
      {showOffer && (
        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          🔥 OFERTA
        </div>
      )}

      {/* Admin controls (top-right of image) */}
      {showAdminControls && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          <button
            onClick={() => setShowLimitedForm((v) => !v)}
            title="Oferta limitada"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors shadow ${
              showOffer
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-black/50 hover:bg-orange-400"
            }`}
          >
            <Timer className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDelete}
            title="Eliminar producto"
            className="w-7 h-7 rounded-full bg-black/50 hover:bg-destructive flex items-center justify-center text-white transition-colors shadow"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Admin: limited offer form */}
      {showAdminControls && showLimitedForm && (
        <div className="px-4 py-3 bg-orange-500/10 border-b border-orange-500/20">
          <p className="text-xs font-semibold text-orange-400 mb-2">Oferta por tiempo limitado</p>
          <Input
            type="datetime-local"
            value={tempExpiry}
            onChange={(e) => setTempExpiry(e.target.value)}
            className="h-8 text-xs bg-background border-border mb-2"
            min={new Date().toISOString().slice(0, 16)}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleActivateLimitedOffer}
              disabled={!tempExpiry || savingLimited}
              className="h-7 text-xs bg-orange-500 hover:bg-orange-600 text-white flex-1"
            >
              {savingLimited ? <Loader2 className="h-3 w-3 animate-spin" /> : "Activar"}
            </Button>
            {isLimited && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleRemoveLimitedOffer}
                disabled={savingLimited}
                className="h-7 text-xs flex-1"
              >
                Quitar
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        {/* Nombre y Marca — editables */}
        {showAdminControls && isEditingInfo ? (
          <div className="space-y-1.5 mb-2">
            <Input
              value={tempBrand}
              onChange={(e) => setTempBrand(e.target.value)}
              placeholder="Marca"
              className="h-7 text-xs bg-secondary border-border font-medium uppercase tracking-wider"
              autoFocus
            />
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Nombre del producto"
              className="h-8 text-sm bg-secondary border-border font-semibold"
            />
            <div className="flex gap-1.5 pt-1">
              <Button
                size="sm"
                onClick={handleSaveInfo}
                disabled={savingInfo || !tempName.trim() || !tempBrand.trim()}
                className="h-7 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
              >
                {savingInfo ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Check className="h-3 w-3 mr-1" />Guardar</>}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelInfo}
                className="h-7 px-3 text-xs"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-1 group/info">
            <div className="min-w-0">
              <p className="text-xs text-primary uppercase tracking-wider">{brand}</p>
              <h3 className="text-lg font-semibold text-foreground mt-1 line-clamp-2">{name}</h3>
            </div>
            {showAdminControls && (
              <button
                onClick={() => {
                  setTempName(name)
                  setTempBrand(brand)
                  setIsEditingInfo(true)
                }}
                title="Editar nombre y marca"
                className="mt-1 shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover/info:opacity-100"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Countdown */}
        {showOffer && expiresAt && (
          <div className="mt-1">
            <CountdownTimer expiresAt={expiresAt} onExpire={() => setOfferExpired(true)} />
          </div>
        )}

        {/* Precio */}
        <div className="mt-3 flex items-center gap-2">
          {showAdminControls && isEditingPrice ? (
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
                disabled={savingPrice}
                className="h-8 w-8 p-0 bg-primary text-primary-foreground"
              >
                {savingPrice ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div>
                {discounted ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{discounted}</span>
                    <span className="text-sm text-muted-foreground line-through">{original}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-primary">{original}</span>
                )}
              </div>
              {showAdminControls && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setTempPrice(price)
                    setIsEditingPrice(true)
                  }}
                  title="Editar precio"
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

        <button
          onClick={() =>
            toggle({
              id,
              name,
              brand,
              price: original,
              discountedPrice: discounted ?? undefined,
            })
          }
          className={`w-full mt-2 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded transition-colors ${
            selected
              ? "text-primary bg-primary/10 hover:bg-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {selected ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          {selected ? "Quitar de consulta" : "Agregar a consulta"}
        </button>
      </div>
    </div>
  )
}
