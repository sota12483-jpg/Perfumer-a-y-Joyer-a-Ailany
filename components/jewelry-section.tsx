"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Upload, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { createClient } from "@/lib/supabase/client"

const WHATSAPP_NUMBER = "18093977816"

interface Product {
  id: string
  name: string
  brand: string
  image: string
  price: string
  category: "perfume" | "reloj" | "oferta" | "joyeria"
  position: number
  is_limited_offer?: boolean
  offer_expires_at?: string | null
}

function ProductSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
      <div className="aspect-square bg-secondary/40" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-secondary/60 rounded" />
        <div className="h-5 w-3/4 bg-secondary/60 rounded" />
        <div className="h-8 w-24 bg-secondary/60 rounded" />
        <div className="h-10 w-full bg-secondary/40 rounded" />
      </div>
    </div>
  )
}

function AddJoyaModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean
  onClose: () => void
  onAdd: (product: Omit<Product, "id" | "position">) => Promise<void>
}) {
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setImagePreview(result)
      setImageUrl(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !brand || !price || !imageUrl) return
    setSubmitting(true)
    await onAdd({
      name,
      brand,
      image: imageUrl,
      price: price.startsWith("RD$") ? price : `RD$${price}`,
      category: "joyeria",
    })
    setName("")
    setBrand("")
    setPrice("")
    setImageUrl("")
    setImagePreview("")
    setSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-xl font-bold text-foreground mb-6">Agregar Joya</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Nombre</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Cadena Love Cartier"
              className="bg-secondary border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Marca</label>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Ej: Cartier"
              className="bg-secondary border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Precio</label>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ej: RD$15,000"
              className="bg-secondary border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Imagen</label>
            <div className="space-y-3">
              <Input
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                  setImagePreview(e.target.value)
                }}
                placeholder="URL de la imagen"
                className="bg-secondary border-border"
              />
              <div className="text-center text-sm text-muted-foreground">o</div>
              <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Subir imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <div className="relative aspect-square w-32 mx-auto rounded-lg overflow-hidden border border-border">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Guardando...
              </>
            ) : (
              "Agregar Joya"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export function JewelrySection() {
  const [joyas, setJoyas] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { isAdmin } = useAuth()

  useEffect(() => {
    const fetchJoyas = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("category", "joyeria")
          .order("position")

        if (data) setJoyas(data as Product[])
      } catch (e) {
        console.error("Error cargando joyería:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchJoyas()
  }, [])

  const deleteJoya = (id: string) => {
    setJoyas((prev) => prev.filter((p) => p.id !== id))
  }

  const addJoya = async (product: Omit<Product, "id" | "position">) => {
    const supabase = createClient()
    const { data } = await supabase
      .from("products")
      .insert({ ...product, position: joyas.length + 1 })
      .select()
      .single()

    if (data) setJoyas((prev) => [...prev, data as Product])
  }

  return (
    <>
      <section id="joyeria" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
                Colección
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Joyería Exclusiva
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Cadenas, anillos, pulseras y aretes de lujo
              </p>
            </div>
            {isAdmin && (
              <Button
                onClick={() => setShowModal(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Agregar Joya</span>
                <span className="sm:hidden">Agregar</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : joyas.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    whatsappNumber={WHATSAPP_NUMBER}
                    isAdmin={isAdmin}
                    onDelete={deleteJoya}
                  />
                ))}
          </div>
        </div>
      </section>

      {isAdmin && (
        <AddJoyaModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={addJoya}
        />
      )}
    </>
  )
}
