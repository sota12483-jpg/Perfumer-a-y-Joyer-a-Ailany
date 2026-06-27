"use client"

import { createContext, useContext, useState, useCallback } from "react"

interface DiscountState {
  code: string
  type: "percentage" | "fixed" | null
  value: number
  isActive: boolean
}

interface DiscountContextValue {
  discount: DiscountState
  applyDiscount: (code: string, type: "percentage" | "fixed", value: number) => void
  clearDiscount: () => void
  applyToPrice: (priceString: string) => { original: string; discounted: string | null }
}

const initial: DiscountState = { code: "", type: null, value: 0, isActive: false }

const DiscountContext = createContext<DiscountContextValue>({
  discount: initial,
  applyDiscount: () => {},
  clearDiscount: () => {},
  applyToPrice: (p) => ({ original: p, discounted: null }),
})

function parsePrice(priceString: string): number {
  return parseFloat(priceString.replace(/[^0-9.]/g, "")) || 0
}

function formatPrice(value: number): string {
  return `RD$${Math.round(value).toLocaleString("es-DO")}`
}

export function DiscountProvider({ children }: { children: React.ReactNode }) {
  const [discount, setDiscount] = useState<DiscountState>(initial)

  const applyDiscount = useCallback((code: string, type: "percentage" | "fixed", value: number) => {
    setDiscount({ code, type, value, isActive: true })
  }, [])

  const clearDiscount = useCallback(() => setDiscount(initial), [])

  const applyToPrice = useCallback(
    (priceString: string) => {
      if (!discount.isActive) return { original: priceString, discounted: null }
      const original = parsePrice(priceString)
      if (original === 0) return { original: priceString, discounted: null }
      const discounted =
        discount.type === "percentage"
          ? original * (1 - discount.value / 100)
          : original - discount.value
      return { original: priceString, discounted: formatPrice(Math.max(0, discounted)) }
    },
    [discount]
  )

  return (
    <DiscountContext.Provider value={{ discount, applyDiscount, clearDiscount, applyToPrice }}>
      {children}
    </DiscountContext.Provider>
  )
}

export function useDiscount() {
  return useContext(DiscountContext)
}
