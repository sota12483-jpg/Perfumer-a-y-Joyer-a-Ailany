"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

const ADMIN_EMAILS = [
  "monteromonteroeduard@gmail.com",
  "martinezmuzll02@gmail.com",
]

interface AuthContextValue {
  user: User | null
  isAdmin: boolean
  isViewer: boolean
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAdmin: false,
  isViewer: false,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

const isConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("https://") &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("TU_PROYECTO")

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isConfigured)
  const [viewerEmail, setViewerEmail] = useState("")

  useEffect(() => {
    if (!isConfigured) return

    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    supabase
      .from("store_settings")
      .select("value")
      .eq("key", "viewer_email")
      .single()
      .then(({ data }) => {
        if (data?.value) setViewerEmail(data.value)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    if (!isConfigured) return
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const signOut = async () => {
    if (!isConfigured) return
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email)
  const isViewer = !isAdmin && !!viewerEmail && user?.email === viewerEmail

  return (
    <AuthContext.Provider value={{ user, isAdmin, isViewer, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
