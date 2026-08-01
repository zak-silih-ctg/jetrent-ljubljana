import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Feather,
  Gauge,
  Fuel,
  ThumbsUp,
  Users,
  Truck,
  LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import PhotoGallery from '@/components/PhotoGallery'
import { businessInfo } from '@/data/business'
import { jetSkiContent } from '@/data/content'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Sea-Doo Spark 2UP 90HP',
  description:
    'Spoznajte naš Sea-Doo Spark 2UP 90HP – lahek, okreten in idealen za začetnike in izkušene voznike. Tehnične specifikacije, galerija fotografij in vse, kar morate vedeti.',
}

const iconMap: Record<string, LucideIcon> = {
  Feather,
  Gauge,
  Fuel,
  ThumbsUp,
  Users,
  Truck,
}

export default function JetSkiPage() {
  const { product } = businessInfo
  const { hero, intro, highlights, specs, gallery, cta } = jetSkiContent

  const specRows = [
    { label: 'Model', value: product.model },
    { label: 'Letnik', value: String(product.year) },
    { label: 'Motor', value: product.engine },
    { label: 'Moč', value: `${product.horsepower} KM` },
    { label: 'Najvišja hitrost', value: `~${product.topSpeed} km/h` },
    { label: 'Gorivo', value: product.fuelType },
    { label: 'Prostornina rezervoarja', value: `${product.fuelCapacity} L` },
    { label: 'Poraba goriva', value: product.fuelConsumption },
    { label: 'Suha teža', value: `${product.weight} kg` },
    { label: 'Dolžina', value: `${product.length} cm` },
    { label: 'Širina', value: `${product.width} cm` },
    { label: 'Število oseb', value: String(product.capacity) },
  ]

  return (
    <div className="page-padding-top">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary-950 via-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjAzIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-60" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 border-secondary-400/40 text-secondary-300 bg-secondary-400/10 backdrop-blur-sm px-4 py-2">
            {hero.badge}
          </Badge>
          <h1 className="heading-1 mb-4">
            <span className="bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-200 max-w-2xl mx-auto text-balance">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Featured image + Intro */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Featured image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={product.images[0]}
                alt={product.model}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Intro text */}
            <div>
              <h2 className="heading-2 text-gray-900 mb-5">
                {intro.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                {intro.description}
              </p>
              <div className="mt-8">
                <Button asChild variant="cta" size="lg">
                  <Link href="/kontakt" className="gap-2">
                    Povpraševanje
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {highlights.map((item, index) => {
              const Icon = iconMap[item.icon] || Feather
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 flex items-center justify-center mb-5 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Specs table */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Specifikacije</Badge>
              <h2 className="heading-2 text-gray-900 mb-4">{specs.title}</h2>
              <p className="text-lg text-gray-500">{specs.subtitle}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
              {specRows.map((row, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex justify-between items-center px-6 py-4',
                    index !== specRows.length - 1 && 'border-b border-gray-100'
                  )}
                >
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Fotografije</Badge>
            <h2 className="heading-2 text-gray-900 mb-4">{gallery.title}</h2>
            <p className="text-lg text-gray-500">{gallery.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <PhotoGallery images={product.images} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-20 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-60" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              {cta.title}
            </h2>
            <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto">
              {cta.subtitle}
            </p>
            <Button
              asChild
              size="xl"
              className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl shadow-black/10 font-semibold"
            >
              <Link href="/kontakt" className="gap-2">
                {cta.ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
