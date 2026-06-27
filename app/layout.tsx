import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import { DiscountProvider } from '@/context/discount-context'
import { SelectionProvider } from '@/context/selection-context'
import { SplashScreen } from '@/components/splash-screen'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Perfumería y Joyería Ailany',
  description: 'Tienda de perfumes y joyería de lujo. Productos originales y exclusivos con garantía.',
  generator: 'v0.app',
  other: {
    'google-adsense-account': 'ca-pub-7243616382463721',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-background">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7243616382463721"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <SplashScreen />
        <AuthProvider>
          <DiscountProvider>
            <SelectionProvider>
              {children}
            </SelectionProvider>
          </DiscountProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
