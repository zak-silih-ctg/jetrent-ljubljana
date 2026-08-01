import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Najemna pogodba',
  description: 'Informacije o najemni pogodbi za najem jet skija.',
}

export default function PogodbaPage() {
  return (
    <div className="page-padding-top">
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Nazaj na domov
              </Link>
            </Button>

            <h1 className="heading-2 text-gray-900 mb-8">Najemna pogodba</h1>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">
                Ob prevzemu jet skija se podpiše najemna pogodba, ki določa
                pravice in obveznosti obeh strani.
              </p>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 flex items-start gap-4 mb-8">
                <FileText className="w-6 h-6 text-primary-600 shrink-0" />
                <div>
                  <p className="text-primary-800 font-medium mb-1">
                    Pogodba ob prevzemu
                  </p>
                  <p className="text-primary-700 text-sm">
                    Najemna pogodba se je na voljo za prenos ob zaključeni rezervaciji. Pogodbo je potrebno izpolniti, digitalno podpisati in vrniti na e-poštni naslov najemodajalca pred prevzemom jet skija. V primeru, da pogodba ni vrnjena pravočasno, se lahko najem zavrne.
                  </p>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pogodba običajno vključuje:
              </h2>

              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Podatke o najemniku in najemodajalcu
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Obdobje najema in lokacijo prevzema/vračila
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Ceno najema in način plačila
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Višino in pogoje vračila kavcije
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Pravila uporabe in vzdrževanja
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Odgovornost za poškodbe
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  Postopek v primeru okvare
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
