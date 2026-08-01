import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createServerClient } from '@/lib/supabase/server'
import { fleetContent } from '@/data/content'
import type { JetSkiPageContent } from '@/lib/supabase/types'

export const metadata: Metadata = {
  title: 'Flota',
  description:
    'Oglejte si našo floto jet skijev. Izberite plovilo, ki ustreza vašim željam, in ga rezervirajte za vaš dopust.',
}

async function getActiveJetSkis() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('jetskis')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
  return data || []
}

export default async function FleetPage() {
  const { hero, cta } = fleetContent
  const jetskis = await getActiveJetSkis()

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

      {/* Fleet grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {jetskis.map((js) => {
              const pc = (js.page_content || {}) as JetSkiPageContent
              const image = js.images?.[0] || js.image_url
              const tagline = js.tagline || pc.hero?.subtitle || js.description
              const specRows = pc.specs?.rows || []
              const topSpecs = specRows.slice(0, 3)

              return (
                <Link
                  key={js.id}
                  href={`/flota/${js.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={js.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {js.name}
                    </h2>
                    {tagline && (
                      <p className="text-sm text-gray-500 mb-4">{tagline}</p>
                    )}

                    {topSpecs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {topSpecs.map((spec) => (
                          <Badge key={spec.label} variant="secondary" className="text-xs">
                            {spec.label}: {spec.value}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button variant="outline" size="sm" className="w-full gap-2 group-hover:bg-primary-50">
                      {cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Link>
              )
            })}
          </div>

          {jetskis.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>Trenutno ni razpoložljivih jet skijev.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
