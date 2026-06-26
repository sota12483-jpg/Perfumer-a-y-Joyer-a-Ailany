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
  category: "perfume" | "reloj" | "oferta"
  position: number
}

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (product: Omit<Product, "id" | "position">) => Promise<void>
  category: "perfume" | "reloj"
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

function AddProductModal({ isOpen, onClose, onAdd, category }: AddProductModalProps) {
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setImageUrl(result)
      }
      reader.readAsDataURL(file)
    }
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
      category,
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

        <h3 className="text-xl font-bold text-foreground mb-6">
          Agregar {category === "perfume" ? "Perfume" : "Reloj"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Nombre del producto</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Dior Sauvage"
              className="bg-secondary border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Marca</label>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Ej: Dior"
              className="bg-secondary border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Precio</label>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ej: RD$5,500"
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
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
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
              <><Loader2 className="h-4 w-4 animate-spin mr-2" />Guardando...</>
            ) : (
              "Agregar Producto"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export function ProductsSection() {
  const [perfumes, setPerfumes] = useState<Product[]>([])
  const [relojes, setRelojes] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showPerfumeModal, setShowPerfumeModal] = useState(false)
  const [showRelojModal, setShowRelojModal] = useState(false)
  const { isAdmin } = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("products")
        .select("*")
        .in("category", ["perfume", "reloj"])
        .order("position")

      if (data) {
        setPerfumes(data.filter((p) => p.category === "perfume"))
        setRelojes(data.filter((p) => p.category === "reloj"))
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const addProduct = async (product: Omit<Product, "id" | "position">) => {
    const supabase = createClient()
    const list = product.category === "perfume" ? perfumes : relojes
    const { data } = await supabase
      .from("products")
      .insert({ ...product, position: list.length + 1 })
      .select()
      .single()

    if (data) {
      if (data.category === "perfume") setPerfumes((prev) => [...prev, data])
      else setRelojes((prev) => [...prev, data])
    }
  }

  return (
    <>
      {/* Perfumes */}
      <section id="perfumes" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Colección</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Perfumes de Lujo</h2>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Fragancias exclusivas de las marcas más prestigiosas del mundo
              </p>
            </div>
            {isAdmin && (
              <Button
                onClick={() => setShowPerfumeModal(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Agregar Perfume</span>
                <span className="sm:hidden">Agregar</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : perfumes.map((product) => (
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

      {/* Relojes */}
      <section id="relojes" className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Colección</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Relojes Exclusivos</h2>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Elegancia y precisión en cada pieza de nuestra colección
              </p>
            </div>
            {isAdmin && (
              <Button
                onClick={() => setShowRelojModal(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Agregar Reloj</span>
                <span className="sm:hidden">Agregar</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : relojes.map((product) => (
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

      {isAdmin && (
        <>
          <AddProductModal
            isOpen={showPerfumeModal}
            onClose={() => setShowPerfumeModal(false)}
            onAdd={addProduct}
            category="perfume"
          />
          <AddProductModal
            isOpen={showRelojModal}
            onClose={() => setShowRelojModal(false)}
            onAdd={addProduct}
            category="reloj"
          />
        </>
      )}
    </>
  )
}
