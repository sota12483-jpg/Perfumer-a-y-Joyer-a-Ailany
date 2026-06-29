import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { articles, getArticleBySlug } from "@/lib/blog-data"
import { ArrowLeft, Clock, Tag, ChevronRight } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | Guías Ailany`,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header />

      <article className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-primary transition-colors">Guías</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground truncate max-w-xs">{article.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {article.description}
            </p>

            <div className="flex items-center gap-3 pb-8 border-b border-border">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                {article.coverEmoji}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Perfumería y Joyería Ailany</p>
                <p className="text-xs text-muted-foreground">{article.publishedAt}</p>
              </div>
            </div>
          </div>

          {/* Hero image area */}
          <div className="h-52 md:h-64 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/8 to-transparent flex items-center justify-center text-8xl mb-10 border border-border">
            {article.coverEmoji}
          </div>

          {/* Article content */}
          <div className="prose-custom space-y-8">
            {article.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 mt-8 first:mt-0">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-foreground/90 leading-relaxed text-base mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 p-6 md:p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              ¿Listo para encontrar tu fragancia ideal?
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              En Ailany te asesoramos por WhatsApp para que encuentres el perfume perfecto para ti.
            </p>
            <a
              href="https://wa.me/18093977816"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              Consultar por WhatsApp
            </a>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver todas las guías
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {otherArticles.length > 0 && (
        <section className="pb-16 px-4 border-t border-border">
          <div className="mx-auto max-w-6xl pt-12">
            <h3 className="text-xl font-bold text-foreground mb-8">Otras guías que te pueden interesar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all"
                >
                  <div className="text-3xl mb-3">{a.coverEmoji}</div>
                  <span className="text-xs text-primary font-medium">{a.category}</span>
                  <h4 className="text-sm font-semibold text-foreground mt-1 group-hover:text-primary transition-colors leading-snug">
                    {a.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{a.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
