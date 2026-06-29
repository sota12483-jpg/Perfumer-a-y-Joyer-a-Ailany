import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { articles } from "@/lib/blog-data"
import { ArrowRight, Clock, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Guías de Perfumería | Perfumería y Joyería Ailany",
  description:
    "Aprende todo sobre perfumes: cómo elegirlos, las diferencias entre concentraciones, tendencias orientales y trucos para que duren más. Guías expertas de Ailany.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Blog & Guías
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              El mundo de la perfumería
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Guías prácticas y consejos expertos para que elijas, uses y disfrutes tus fragancias como un profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="h-44 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center text-7xl">
                  {article.coverEmoji}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      <Tag className="h-3 w-3" />
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Leer guía <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
