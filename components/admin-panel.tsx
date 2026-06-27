"use client"

import { useState, useEffect } from "react"
import {
  Settings,
  Tag,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/context/auth-context"

interface DiscountCode {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  active: boolean
  expires_at: string | null
  created_at: string
}

type CodeForm = {
  code: string
  type: "percentage" | "fixed"
  value: number
  active: boolean
  expires_at: string
}

const emptyForm: CodeForm = {
  code: "",
  type: "percentage",
  value: 10,
  active: true,
  expires_at: "",
}

interface SettingsMap {
  free_shipping_threshold: string
  bulk_discount_min_qty: string
  bulk_discount_percentage: string
  bulk_discount_code: string
  viewer_email: string
}

const defaultSettings: SettingsMap = {
  free_shipping_threshold: "3000",
  bulk_discount_min_qty: "3",
  bulk_discount_percentage: "10",
  bulk_discount_code: "MAYOR",
  viewer_email: "",
}

export function AdminPanel() {
  const { isAdmin } = useAuth()
  const [expanded, setExpanded] = useState(false)

  const [codes, setCodes] = useState<DiscountCode[]>([])
  const [loadingCodes, setLoadingCodes] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newForm, setNewForm] = useState<CodeForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<CodeForm>(emptyForm)

  const [storeSettings, setStoreSettings] = useState<SettingsMap>(defaultSettings)
  const [savingSettings, setSavingSettings] = useState(false)
  const [settingsSaved, setSettingsSaved] = useState(false)

  useEffect(() => {
    if (!expanded || !isAdmin) return

    let supabase: ReturnType<typeof createClient>
    try {
      supabase = createClient()
    } catch {
      return
    }

    setLoadingCodes(true)
    supabase
      .from("discount_codes")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setCodes((data as DiscountCode[]) ?? [])
        setLoadingCodes(false)
      })

    supabase
      .from("store_settings")
      .select("key, value")
      .then(({ data }) => {
        if (data?.length) {
          const map = Object.fromEntries(
            (data as { key: string; value: string }[]).map((r) => [r.key, r.value])
          )
          setStoreSettings((prev) => ({ ...prev, ...map }))
        }
      })
  }, [expanded, isAdmin])

  const handleCreateCode = async () => {
    if (!newForm.code.trim()) return
    setSaving(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("discount_codes")
        .insert({
          code: newForm.code.toUpperCase().trim(),
          type: newForm.type,
          value: newForm.value,
          active: newForm.active,
          expires_at: newForm.expires_at ? new Date(newForm.expires_at).toISOString() : null,
        })
        .select()
        .single()
      if (!error && data) {
        setCodes((prev) => [data as DiscountCode, ...prev])
        setNewForm(emptyForm)
        setShowNewForm(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateCode = async (id: string) => {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("discount_codes")
        .update({
          code: editForm.code.toUpperCase().trim(),
          type: editForm.type,
          value: editForm.value,
          active: editForm.active,
          expires_at: editForm.expires_at ? new Date(editForm.expires_at).toISOString() : null,
        })
        .eq("id", id)
        .select()
        .single()
      if (!error && data) {
        setCodes((prev) => prev.map((c) => (c.id === id ? (data as DiscountCode) : c)))
        setEditingId(null)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCode = async (id: string) => {
    if (!confirm("¿Eliminar este código de descuento?")) return
    const supabase = createClient()
    const { error } = await supabase.from("discount_codes").delete().eq("id", id)
    if (!error) setCodes((prev) => prev.filter((c) => c.id !== id))
  }

  const handleToggleActive = async (id: string, current: boolean) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("discount_codes")
      .update({ active: !current })
      .eq("id", id)
    if (!error)
      setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, active: !current } : c)))
  }

  const handleSaveSettings = async () => {
    setSavingSettings(true)
    try {
      const supabase = createClient()
      const entries = Object.entries(storeSettings).map(([key, value]) => ({
        key,
        value: String(value),
        updated_at: new Date().toISOString(),
      }))
      await supabase.from("store_settings").upsert(entries, { onConflict: "key" })
      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
    } finally {
      setSavingSettings(false)
    }
  }

  if (!isAdmin) return null

  return (
    <section className="bg-card border-t-2 border-primary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-4"
        >
          <div className="flex items-center gap-2 text-primary">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Panel de Administración
            </span>
          </div>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {expanded && (
          <div className="pb-10">
            <Tabs defaultValue="codes">
              <TabsList className="mb-6">
                <TabsTrigger value="codes" className="gap-2">
                  <Tag className="h-4 w-4" />
                  Códigos de Descuento
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configuración
                </TabsTrigger>
              </TabsList>

              {/* ── CODES ── */}
              <TabsContent value="codes">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Códigos de Descuento</h3>
                  <Button
                    size="sm"
                    onClick={() => setShowNewForm(!showNewForm)}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                    Nuevo Código
                  </Button>
                </div>

                {showNewForm && (
                  <CodeForm
                    form={newForm}
                    onChange={setNewForm}
                    onSubmit={handleCreateCode}
                    onCancel={() => setShowNewForm(false)}
                    saving={saving}
                    submitLabel="Crear Código"
                  />
                )}

                {loadingCodes ? (
                  <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Cargando códigos...
                  </div>
                ) : codes.length === 0 ? (
                  <p className="text-center py-10 text-sm text-muted-foreground">
                    No hay códigos de descuento. Crea el primero.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {codes.map((code) =>
                      editingId === code.id ? (
                        <div key={code.id} className="bg-background border border-border rounded-lg p-4">
                          <CodeForm
                            form={editForm}
                            onChange={setEditForm}
                            onSubmit={() => handleUpdateCode(code.id)}
                            onCancel={() => setEditingId(null)}
                            saving={saving}
                            submitLabel="Guardar"
                          />
                        </div>
                      ) : (
                        <div
                          key={code.id}
                          className="bg-background border border-border rounded-lg px-4 py-3 flex items-center justify-between flex-wrap gap-2"
                        >
                          <div className="flex items-center gap-3 flex-wrap">
                            <code className="text-sm font-bold font-mono text-foreground bg-secondary px-2 py-0.5 rounded">
                              {code.code}
                            </code>
                            <span className="text-sm text-muted-foreground">
                              {code.type === "percentage"
                                ? `${code.value}%`
                                : `RD$${code.value}`}
                            </span>
                            {code.expires_at && (
                              <span className="text-xs text-muted-foreground">
                                Expira:{" "}
                                {new Date(code.expires_at).toLocaleDateString("es-DO", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleActive(code.id, code.active)}
                              className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
                                code.active
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                            >
                              {code.active ? "Activo" : "Inactivo"}
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(code.id)
                                setEditForm({
                                  code: code.code,
                                  type: code.type,
                                  value: code.value,
                                  active: code.active,
                                  expires_at: code.expires_at
                                    ? new Date(code.expires_at).toISOString().slice(0, 16)
                                    : "",
                                })
                              }}
                              className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCode(code.id)}
                              className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </TabsContent>

              {/* ── SETTINGS ── */}
              <TabsContent value="settings">
                <div className="max-w-lg space-y-6">
                  <h3 className="text-lg font-bold text-foreground">Configuración de la Tienda</h3>

                  <fieldset className="bg-background border border-border rounded-lg p-4 space-y-3">
                    <legend className="text-sm font-semibold text-foreground px-1">
                      Envío Gratis
                    </legend>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Monto mínimo (RD$)
                      </label>
                      <Input
                        type="number"
                        value={storeSettings.free_shipping_threshold}
                        onChange={(e) =>
                          setStoreSettings((p) => ({
                            ...p,
                            free_shipping_threshold: e.target.value,
                          }))
                        }
                        className="bg-secondary border-border"
                        min={0}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Compras mayores a este monto tienen envío gratis
                      </p>
                    </div>
                  </fieldset>

                  <fieldset className="bg-background border border-border rounded-lg p-4 space-y-3">
                    <legend className="text-sm font-semibold text-foreground px-1">
                      Descuento por Cantidad (Mayoreo)
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">
                          Mínimo de productos
                        </label>
                        <Input
                          type="number"
                          value={storeSettings.bulk_discount_min_qty}
                          onChange={(e) =>
                            setStoreSettings((p) => ({
                              ...p,
                              bulk_discount_min_qty: e.target.value,
                            }))
                          }
                          className="bg-secondary border-border"
                          min={2}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">
                          Descuento (%)
                        </label>
                        <Input
                          type="number"
                          value={storeSettings.bulk_discount_percentage}
                          onChange={(e) =>
                            setStoreSettings((p) => ({
                              ...p,
                              bulk_discount_percentage: e.target.value,
                            }))
                          }
                          className="bg-secondary border-border"
                          min={0}
                          max={100}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Código de mayoreo
                      </label>
                      <Input
                        value={storeSettings.bulk_discount_code}
                        onChange={(e) =>
                          setStoreSettings((p) => ({
                            ...p,
                            bulk_discount_code: e.target.value.toUpperCase(),
                          }))
                        }
                        className="bg-secondary border-border font-mono"
                        placeholder="MAYOR"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="bg-background border border-border rounded-lg p-4 space-y-3">
                    <legend className="text-sm font-semibold text-foreground px-1">Permisos</legend>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Email de la dueña (solo lectura)
                      </label>
                      <Input
                        type="email"
                        value={storeSettings.viewer_email}
                        onChange={(e) =>
                          setStoreSettings((p) => ({ ...p, viewer_email: e.target.value }))
                        }
                        className="bg-secondary border-border"
                        placeholder="dueña@gmail.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Esta cuenta puede iniciar sesión pero no puede editar nada
                      </p>
                    </div>
                  </fieldset>

                  <Button
                    onClick={handleSaveSettings}
                    disabled={savingSettings}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {savingSettings ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Guardando...
                      </>
                    ) : settingsSaved ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        ¡Guardado!
                      </>
                    ) : (
                      "Guardar Configuración"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  )
}

function CodeForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  saving,
  submitLabel,
}: {
  form: CodeForm
  onChange: (f: CodeForm) => void
  onSubmit: () => void
  onCancel: () => void
  saving: boolean
  submitLabel: string
}) {
  return (
    <div className="mb-4 p-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Código</label>
          <Input
            value={form.code}
            onChange={(e) => onChange({ ...form, code: e.target.value.toUpperCase() })}
            placeholder="VERANO25"
            className="font-mono bg-secondary border-border"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Tipo</label>
          <select
            value={form.type}
            onChange={(e) => onChange({ ...form, type: e.target.value as "percentage" | "fixed" })}
            className="w-full h-10 px-3 bg-secondary border border-border rounded-md text-sm text-foreground"
          >
            <option value="percentage">Porcentaje (%)</option>
            <option value="fixed">Valor fijo (RD$)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Valor {form.type === "percentage" ? "(%)" : "(RD$)"}
          </label>
          <Input
            type="number"
            value={form.value}
            onChange={(e) => onChange({ ...form, value: parseFloat(e.target.value) || 0 })}
            className="bg-secondary border-border"
            min={0}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Expira (opcional)</label>
          <Input
            type="datetime-local"
            value={form.expires_at}
            onChange={(e) => onChange({ ...form, expires_at: e.target.value })}
            className="bg-secondary border-border"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => onChange({ ...form, active: e.target.checked })}
            className="accent-primary"
          />
          Activo
        </label>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={onSubmit}
          disabled={saving || !form.code.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {submitLabel}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
