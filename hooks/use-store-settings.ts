import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export interface StoreSettings {
  free_shipping_threshold: string
  bulk_discount_min_qty: string
  bulk_discount_percentage: string
  bulk_discount_code: string
  viewer_email: string
}

const DEFAULTS: StoreSettings = {
  free_shipping_threshold: "3000",
  bulk_discount_min_qty: "3",
  bulk_discount_percentage: "10",
  bulk_discount_code: "MAYOR",
  viewer_email: "",
}

export function useStoreSettings() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let supabase: ReturnType<typeof createClient>
    try {
      supabase = createClient()
    } catch {
      setLoading(false)
      return
    }
    supabase
      .from("store_settings")
      .select("key, value")
      .then(({ data }) => {
        if (data?.length) {
          const map = Object.fromEntries(
            (data as { key: string; value: string }[]).map((r) => [r.key, r.value])
          )
          setSettings((prev) => ({ ...prev, ...map }))
        }
        setLoading(false)
      })
  }, [])

  return { settings, loading }
}
