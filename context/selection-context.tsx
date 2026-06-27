"use client"

import { createContext, useContext, useState, useCallback } from "react"

export interface SelectedProduct {
  id: string
  name: string
  brand: string
  price: string
  discountedPrice?: string
}

interface SelectionContextValue {
  selected: SelectedProduct[]
  toggle: (product: SelectedProduct) => void
  isSelected: (id: string) => boolean
  clear: () => void
}

const SelectionContext = createContext<SelectionContextValue>({
  selected: [],
  toggle: () => {},
  isSelected: () => false,
  clear: () => {},
})

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<SelectedProduct[]>([])

  const toggle = useCallback((product: SelectedProduct) => {
    setSelected((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const isSelected = useCallback(
    (id: string) => selected.some((p) => p.id === id),
    [selected]
  )

  const clear = useCallback(() => setSelected([]), [])

  return (
    <SelectionContext.Provider value={{ selected, toggle, isSelected, clear }}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  return useContext(SelectionContext)
}
