// Navigation configuration
export interface NavItem {
  title: string
  href: string
  description?: string
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Domov',
    href: '/',
  },
  {
    title: 'Flota',
    href: '/flota',
    description: 'Naša flota jet skijev',
  },
  {
    title: 'Cenik',
    href: '/cenik',
    description: 'Pregled cen in paketov',
  },
  {
    title: 'Kako deluje',
    href: '/kako-deluje',
    description: 'Postopek najema korak za korakom',
  },
  {
    title: 'Pogosta vprašanja',
    href: '/vprasanja',
    description: 'Odgovori na najpogostejša vprašanja',
  },
  {
    title: 'Kontakt',
    href: '/kontakt',
    description: 'Pošljite povpraševanje',
  },
]

export const footerNavigation = {
  main: [
    { title: 'Domov', href: '/' },
    { title: 'Flota', href: '/flota' },
    { title: 'Cenik', href: '/cenik' },
    { title: 'Rezervacija', href: '/rezervacija' },
    { title: 'Kako deluje', href: '/kako-deluje' },
    { title: 'Pogosta vprašanja', href: '/vprasanja' },
    { title: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { title: 'Pogoji uporabe', href: '/pogoji' },
    { title: 'Zasebnost', href: '/zasebnost' },
    { title: 'Najemna pogodba', href: '/pogodba' },
  ],
}
