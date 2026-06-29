"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogIn, LogOut, Shield, Eye } from "lucide-react"
import { useAuth } from "@/context/auth-context"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Perfumes", href: "/#perfumes" },
  { name: "Relojes", href: "/#relojes" },
  { name: "Joyería", href: "/#joyeria" },
  { name: "Ofertas", href: "/#ofertas" },
  { name: "Guías", href: "/blog" },
  { name: "Contacto", href: "/#contacto" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, isAdmin, isViewer, loading, signInWithGoogle, signOut } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Perfumería y Joyería Ailany"
              width={48}
              height={48}
              className="rounded-full object-cover"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-primary leading-tight">Perfumería y Joyería</p>
              <p className="text-lg font-bold text-foreground leading-tight">Ailany</p>
            </div>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.full_name ?? "Usuario"}
                        className="h-8 w-8 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">
                          {(user.email ?? "U")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    {isAdmin && (
                      <Shield className="h-4 w-4 text-primary" aria-label="Administrador" />
                    )}
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-10 z-20 w-52 bg-card border border-border rounded-lg shadow-xl py-2">
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-xs font-medium text-foreground truncate">
                            {user.user_metadata?.full_name ?? user.email}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          {isAdmin && (
                            <span className="inline-flex items-center gap-1 mt-1 text-xs text-primary font-medium">
                              <Shield className="h-3 w-3" /> Administrador
                            </span>
                          )}
                          {isViewer && (
                            <span className="inline-flex items-center gap-1 mt-1 text-xs text-muted-foreground font-medium">
                              <Eye className="h-3 w-3" /> Solo lectura
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => { signOut(); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar sesión
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border px-6 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Ailany"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
                <span className="text-xl font-bold text-foreground">Ailany</span>
              </Link>
              <button
                type="button"
                className="text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 flow-root">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                {!loading && (
                  <>
                    {user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {user.user_metadata?.avatar_url ? (
                            <img
                              src={user.user_metadata.avatar_url}
                              alt="Avatar"
                              className="h-10 w-10 rounded-full object-cover border border-border"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-bold">
                                {(user.email ?? "U")[0].toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-foreground truncate">
                              {user.user_metadata?.full_name ?? user.email}
                            </p>
                            {isAdmin && (
                              <span className="flex items-center gap-1 text-xs text-primary">
                                <Shield className="h-3 w-3" /> Administrador
                              </span>
                            )}
                            {isViewer && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Eye className="h-3 w-3" /> Solo lectura
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => { signOut(); setMobileMenuOpen(false) }}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { signInWithGoogle(); setMobileMenuOpen(false) }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <LogIn className="h-4 w-4" />
                        Iniciar sesión con Google
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
