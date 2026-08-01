// Page content in Slovenian - centralized for easy editing
export const homeContent = {
  hero: {
    title: 'Najemite jet ski v Ljubljani.',
    titleAccent: 'Že jutri ste na morju.',
    subtitle: 'Prevzemite Sea-Doo Spark s prikolico in brez zapletov odpeljite naravnost na Hrvaško. Brez čakanja. Brez birokratskih zapletov.',
    primaryCTA: 'Rezervirajte termin',
    secondaryCTA: 'Poglejte cenik',
    badge: 'Poletje 2026 — termini se polnijo',
    trustItems: [
      'Prevzem v Ljubljani',
      'Prikolica vključena',
      'Dokumenti za Hrvaško morje urejeni',
      'Tedenski najem = najboljša cena',
    ],
  },

  socialProof: {
    stat1: { value: '60+', label: 'uspešnih najemov' },
    stat2: { value: '4.9', label: 'ocena strank' },
    stat3: { value: '24h', label: 'odzivni čas' },
    subtitle: 'Stranke se vsako leto vračajo. Najbolj priljubljeni termini so rezervirani že tedne vnaprej.',
  },

  benefits: {
    label: 'Zakaj Jet4You',
    title: 'Potrebujete samo avto s kljuko in veljaven izpit za voditelja čolna.',
    subtitle: 'Za vse ostalo poskrbimo mi.',
    items: [
      {
        title: 'Prevzem v Ljubljani',
        description: 'Dogovorimo se za termin in lokacijo — jet ski vas čaka pripravljen.',
        icon: 'MapPin',
      },
      {
        title: 'Prikolica vključena',
        description: 'Prikolica ima opravljen tehnični pregled in je pripravljena. Priklopite, odpeljete, uživate.',
        icon: 'Truck',
      },
      {
        title: 'Urejeno za Hrvaško',
        description: 'Vsa dokumentacija in navodila za brezskrben dopust na morju. Hrvaška vinjeta in komercialno zavarovanje je urejeno.',
        icon: 'FileCheck',
      },
      {
        title: 'Tedenski najem = najboljša cena',
        description: 'Daljši najem pomeni nižjo ceno na dan. Najbolj priljubljena izbira.',
        icon: 'TrendingDown',
      },
      {
        title: 'Enostavno za začetnike',
        description: 'Prejmete jasna navodila. Jet ski je stabilen in enostaven za uporabo.',
        icon: 'Zap',
      },
      {
        title: 'Brez skritih stroškov',
        description: 'Vse vključeno. Kavcija 500 € se vrne ob vračilu brez poškodb.',
        icon: 'ShieldCheck',
      },
    ],
  },

  howItWorks: {
    label: 'Kako deluje',
    title: 'Od rezervacije do morja v 3 korakih',
    subtitle: 'Postopek je zasnovan tako, da ste na dopustu čim hitreje.',
    steps: [
      {
        step: 1,
        title: 'Rezervirate termin',
        description: 'Izberete datume in pošljete rezervacijo. Termin zadržimo za vas.',
      },
      {
        step: 2,
        title: 'Potrdimo in uredimo vse',
        description: 'Po prejemu akontacije potrdimo rezervacijo in vam pošljemo vse informacije.',
      },
      {
        step: 3,
        title: 'Prevzamete in uživate',
        description: 'Prevzem v Ljubljani, priklopite in že ste na poti proti morju.',
      },
    ],
  },

  pricingPreview: {
    label: 'Cenik',
    title: 'Jasne cene. Brez presenečenj.',
    subtitle: 'Plačate točno to, kar vidite. Prikolica in dokumentacija sta vedno vključeni.',
    ctaText: 'Celoten cenik in podrobnosti',
    urgencyNote: '⚠️ Najboljši termini v visoki sezoni so hitro razprodani.',
  },

  faqPreview: {
    label: 'Pogosta vprašanja',
    title: 'Imate vprašanje? Verjetno imamo odgovor.',
    subtitle: 'Najpogostejša vprašanja naših strank pred prvim najemom.',
    ctaText: 'Vsa vprašanja in odgovori',
  },

  contactCTA: {
    title: 'Rezervirajte svoj termin, preden ga nekdo drug.',
    subtitle: 'Najbolj priljubljeni datumi se zapolnijo prvi. Pošljite rezervacijo danes in si zagotovite brezskrben dopust.',
    ctaText: 'Rezerviraj termin',
    secondaryCTA: 'Pokliči nas',
    phone: '+386 40 698 807',
    urgencyNote: 'Brezplačno povpraševanje • Brez obveznosti • Odziv v 24h',
  },
}

export const fleetContent = {
  hero: {
    title: 'Naša flota',
    subtitle: 'Izberite jet ski, ki ustreza vašim željam. Vsak je pripravljen za vaše morske pustolovščine.',
    badge: 'Flota',
  },
  cta: 'Več informacij',
}

export interface FleetItem {
  slug: string
  name: string
  tagline: string
  image: string
  specs: { label: string; value: string }[]
}

export const fleetItems: FleetItem[] = [
  {
    slug: 'spark-1',
    name: 'Sea-Doo Spark 2UP 90HP',
    tagline: 'Kompakten, hiter in izjemno zabaven. Idealen za dopust na morju.',
    image: '/images/1.jpg',
    specs: [
      { label: 'Moč', value: '90 KM' },
      { label: 'Hitrost', value: '~80 km/h' },
      { label: 'Oseb', value: '2' },
    ],
  },
]

export const jetSkiContent = {
  hero: {
    title: 'Sea-Doo Spark 2UP 90HP',
    subtitle: 'Kompakten, hiter in izjemno zabaven. Idealen spremljevalec za vaš dopust na morju.',
    badge: 'Naš jet ski',
  },

  intro: {
    title: 'Zakaj Sea-Doo Spark?',
    description: 'Sea-Doo Spark je eden najbolj priljubljenih osebnih plovil na svetu — in to z razlogom. Zasnovan je za enostavno upravljanje, minimalno vzdrževanje in maksimalno zabavo. Njegova lahka konstrukcija iz materiala Polytec™ ga naredi izjemno okretnega, ekonomičen Rotax 900 ACE motor pa poskrbi za dovolj moči brez pretirane porabe goriva.',
  },

  highlights: [
    {
      title: 'Lahek in okreten',
      description: 'Z le 185 kg suhe teže je Spark eden najlažjih jet skijev na trgu. Enostavno ga naložite in odpeljete.',
      icon: 'Feather',
    },
    {
      title: '90 KM moči',
      description: 'Rotax 900 ACE motor zagotavlja do 80 km/h na vodi — dovolj za adrenalinski užitek.',
      icon: 'Gauge',
    },
    {
      title: 'Ekonomična poraba',
      description: 'Le 8–12 litrov goriva na uro pri intenzivni vožnji. 30-litrski rezervoar za daljše izlete.',
      icon: 'Fuel',
    },
    {
      title: 'Primeren za začetnike',
      description: 'Intuitivno upravljanje in IBR (Intelligent Brake & Reverse) sistem za varno in enostavno vožnjo.',
      icon: 'ThumbsUp',
    },
    {
      title: 'Za 1–2 osebi',
      description: 'Udoben sedež za voznika in sopotnika. Popoln za pare ali solo pustolovščine.',
      icon: 'Users',
    },
    {
      title: 'Prikolica vključena',
      description: 'Registrirana prikolica je del paketa. Pripnete in odpeljete — brez dodatnih stroškov.',
      icon: 'Truck',
    },
  ],

  specs: {
    title: 'Tehnične specifikacije',
    subtitle: 'Vse podrobnosti o našem Sea-Doo Spark 2UP 90HP (letnik 2016)',
  },

  gallery: {
    title: 'Galerija',
    subtitle: 'Oglejte si naš jet ski iz vseh zornih kotov',
  },

  cta: {
    title: 'Želite ta jet ski na vašem dopustu?',
    subtitle: 'Pošljite povpraševanje in ga rezervirajte za svoj termin.',
    ctaText: 'Rezerviraj termin',
  },
}

export const howItWorksContent = {
  hero: {
    title: 'Kako deluje najem?',
    subtitle: 'Preprost postopek od povpraševanja do vračila',
  },
  
  steps: [
    {
      step: 1,
      title: 'Oddaja povpraševanja ali rezervacija',
      description: 'Rezervirajte vaš termin preko rezervacijskega sistema na spletni strani, izpolnite kontaktni obrazec ali nas kontaktirajte po telefonu. Navedite želeni datum najema, trajanje in destinacijo uporabe. Odgovorili vam bomo v najkrajšem možnem času.',
      icon: 'Send',
    },
    {
      step: 2,
      title: 'Potrditev termina',
      description: 'Preverimo razpoložljivost jet skija za vaš termin. Ob potrditvi vam pošljemo vse podrobnosti o najemu, ceno ter navodila za prevzem.',
      icon: 'CalendarCheck',
    },
    {
      step: 3,
      title: 'Prevzem v Ljubljani',
      description: 'Na dogovorjeni dan in uri se srečamo v okolici Ljubljane. Skupaj preverimo stanje jet skija, podpišemo pogodbo in plačate kavcijo. Prejmete tudi ključe in vso potrebno dokumentacijo.',
      icon: 'MapPin',
    },
    {
      step: 4,
      title: 'Navodila za uporabo',
      description: 'Pred prevzemom vam podrobno razložimo delovanje jet skija, varnostna pravila in nasvete za uporabo. Če ste začetnik, si vzemite čas za vprašanja.',
      icon: 'BookOpen',
    },
    {
      step: 5,
      title: 'Vračilo po koncu najema',
      description: 'Ob koncu najemnega obdobja jet ski vrnete na dogovorjeno lokacijo. Skupaj preverimo stanje, in če je vse v redu, vam vrnemo kavcijo. Tako preprosto!',
      icon: 'CheckCircle',
    },
  ],
  
  checklist: {
    title: 'Kaj potrebujete?',
    subtitle: 'Pred prevzemom preverite, da imate vse potrebno',
    items: [
      {
        title: 'Vozilo s kljuko',
        description: 'Vaše vozilo mora imeti tovorno kljuko z ustrezno vlečno kapaciteto (prikolica tehta ~400 kg).',
        required: true,
      },
      {
        title: 'Dokumenti za vleko',
        description: 'Preverite, ali vaše vozniško dovoljenje omogoča vleko prikolice te teže. Po potrebi pridobite tretjo registrsko tablico.',
        required: true,
      },
      {
        title: 'Veljavno dovoljenje za voditelja čolna',
        description: 'Stranka mora imeti veljavno dovoljenje za voditelja čolna, ki je obvezno za upravljanje jet skija na Hrvaškem. Preverite pogoje na www.mmpi.gov.hr.',
        required: true,
      },
      {
        title: 'Osebni dokument',
        description: 'Za podpis pogodbe potrebujete veljaven osebni dokument.',
        required: true,
      },
      {
        title: 'Kavcija',
        description: 'Ob prevzemu je potrebno plačilo kavcije v višini 500 € (gotovina ali po dogovoru).',
        required: true,
      },
      {
        title: 'Osnovno razumevanje varne uporabe',
        description: 'Ob prevzemu vam razložimo delovanje, vendar je dobrodošlo, da se predhodno seznanite z osnovno plovbo.',
        required: false,
      },
    ],
  },
  
  warnings: {
    title: 'Pomembna opozorila',
    items: [
      {
        title: 'Jet ski je zmogljivo plovilo',
        description: 'Sea-Doo Spark je sicer primeren za začetnike, vendar je kljub temu zmogljiv in zahteva odgovorno uporabo. Vedno upoštevajte varnostna pravila.',
        type: 'warning',
      },
      {
        title: 'Ne zaganjajte v plitki vodi',
        description: 'Jet ski nikoli ne zaganjajte v plitki vodi ali blizu obale. Motor črpa vodo in lahko posesa pesek ali kamenje, kar povzroči resne poškodbe.',
        type: 'error',
      },
      {
        title: 'Odgovornost najemnika',
        description: 'Stranka je odgovorna za skrbno ravnanje z jet skijem in prikolico. Poškodbe, nastale zaradi malomarnosti, se pokrijejo iz kavcije oziroma jih plača najemnik.',
        type: 'info',
      },
    ],
  },
}

export const contactContent = {
  hero: {
    title: 'Pošljite povpraševanje',
    subtitle: 'Izpolnite obrazec in odgovorili vam bomo v najkrajšem možnem času.',
  },
  
  form: {
    submitButton: 'Pošlji povpraševanje',
    submitting: 'Pošiljam...',
    successTitle: 'Povpraševanje poslano!',
    successMessage: 'Hvala za vaše povpraševanje. Odgovorili vam bomo v najkrajšem možnem času.',
    errorTitle: 'Napaka pri pošiljanju',
    errorMessage: 'Prišlo je do napake. Prosimo, poskusite ponovno ali nas kontaktirajte po telefonu.',
  },
  
  contactInfo: {
    title: 'Kontaktni podatki',
    subtitle: 'Lahko nas tudi pokličete ali pišete direktno.',
  },
}

export const pricingContent = {
  hero: {
    title: 'Cenik najema',
    subtitle: 'Pregledne cene prilagojene različnim potrebam',
    badge: 'Najbolj primerno za tedenski najem',
  },
}
