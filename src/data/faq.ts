// FAQ items - easy to add/edit questions
export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: 'general' | 'rental' | 'requirements' | 'usage'
}

export const faqItems: FAQItem[] = [
  {
    id: 'pickup-location',
    question: 'Kje poteka prevzem jet skija?',
    answer: 'Prevzem poteka v okolici Ljubljane. Točno lokacijo določimo ob potrditvi rezervacije. Po dogovoru je možna tudi dostava (doplačilo 0,70 €/km).',
    category: 'general',
  },
  {
    id: 'trailer-included',
    question: 'Ali je prikolica vključena v ceno?',
    answer: 'Da. Prikolica je vedno vključena, registrirana in pripravljena za uporabo. Jet ski prevzamete skupaj s prikolico in ga po koncu najema vrnete.',
    category: 'rental',
  },
  {
    id: 'tow-hitch',
    question: 'Ali potrebujem kljuko na vozilu?',
    answer: 'Da. Vozilo mora imeti vlečno kljuko in dovoljeno vlečno maso (približno 400 kg). Preverite tudi, ali imate ustrezne dokumente za vleko prikolice.',
    category: 'requirements',
  },
  {
    id: 'boat-license',
    question: 'Ali potrebujem dovoljenje za voditelja čolna?',
    answer: 'Da, obvezno. Za upravljanje jet skija na Hrvaškem potrebujete veljavno dovoljenje za voditelja čolna. Več informacij lahko preverite na mmpi.gov.hr. Ob prevzemu morate pokazati veljavno dovoljenje.',
    category: 'requirements',
  },
  {
    id: 'weekend-rental',
    question: 'Ali lahko najamem jet ski samo za vikend?',
    answer: 'Da, vikend najem je možen glede na razpoložljivost. Petek popoldan – nedelja popoldan. Cena: 90 €/dan.',
    category: 'rental',
  },
  {
    id: 'weekly-rental',
    question: 'Kakšne so prednosti tedenskega najema?',
    answer: 'Tedenski najem vam zagotovi ugodnejšo dnevno ceno (60 € v nizki sezoni, 80 € v visoki sezoni) ter prednost pri rezervaciji. Idealen je za dopust na Hrvaškem, kjer lahko jet ski v celoti izkoristite. Dvotedenski najemi so še ugodnejši.',
    category: 'rental',
  },
  {
    id: 'damage',
    question: 'Kaj se zgodi v primeru škode na jet skiju?',
    answer: 'Ob prevzemu preverimo stanje jet skija skupaj z vami in to dokumentiramo. V primeru škode med najemom se stroški popravila pokrijejo iz kavcije. Za večje poškodbe, nastale zaradi malomarnosti, odgovarja najemnik. Priporočamo skrbno ravnanje in upoštevanje navodil za uporabo.',
    category: 'usage',
  },
  {
    id: 'croatia-usage',
    question: 'Ali lahko jet ski uporabljam na Hrvaškem?',
    answer: 'Seveda! Večina naših strank najame jet ski ravno za uporabo na Hrvaškem. Jet ski je registriran in ima vso potrebno dokumentacijo. Za vas pripravimo tudi navodila glede hrvaških predpisov za plovbo.',
    category: 'usage',
  },
  {
    id: 'helmet-life-jacket',
    question: 'Ali je obvezna uporaba čelade in rešilnega jopiča?',
    answer: 'Da, obvezna je uporaba čelade in rešilnega jopiča med uporabo jet skija. Ob prevzemu vodnega skuterja boste prejeli dva rešilna jopiča, medtem ko si morate čelade priskrbeti sami. Za morebitne kazni prejete zaradi neupoštevanja teh pravil je odgovorna stranka.',
    category: 'usage',
  },
  {
    id: 'deposit',
    question: 'Kako je s kavcijo?',
    answer: 'Ob prevzemu jet skija je obvezna kavcija v višini 500 €, ki se plača v gotovini ali po dogovoru. Kavcija se vrne v celoti ob vračilu, če je jet ski nepoškodovan in vrnjen pravočasno. Morebitne poškodbe ali manjkajoče gorivo se odštejejo od kavcije.',
    category: 'rental',
  },
  {
    id: 'booking-process',
    question: 'Kako poteka postopek rezervacije?',
    answer: 'Pošljete povpraševanje preko obrazca ali nas kontaktirate po telefonu. Preverimo razpoložljivost in vam potrdimo termin. Ob potrditvi se dogovorimo za prevzem, plačilo in podpis pogodbe. Priporočamo rezervacijo vsaj teden dni vnaprej, v visoki sezoni pa še prej.',
    category: 'general',
  },
  {
    id: 'pickup-requirements',
    question: 'Kaj potrebujem ob prevzemu?',
    answer: 'Ob prevzemu potrebujete: osebni dokument, vozniško dovoljenje, dovoljenje za voditelja čolna, vozilo s kljuko ustrezne vlečne kapacitete, kavcijo (500 €) ter podpisan najemni dogovor. Na prevzemu vam razložimo delovanje jet skija in varnostna pravila.',
    category: 'requirements',
  },
  {
    id: 'fuel',
    question: 'Kako je z gorivom?',
    answer: 'Jet ski prejmete s polnim rezervoarjem goriva in ga v enakem stanju tudi vrnete. Sea-Doo Spark je zelo ekonomičen in porabi približno 8–12 litrov na uro intenzivne vožnje. Uporablja se bencin (običajni 95).',
    category: 'usage',
  },
  {
    id: 'experience-required',
    question: 'Ali potrebujem izkušnje z jet skijem?',
    answer: 'Predhodne izkušnje niso nujne, a so dobrodošle. Ob prevzemu vam podamo podrobna navodila za uporabo in varno vožnjo. Jet ski Sea-Doo Spark je zasnovan za enostavno upravljanje in je primeren tudi za začetnike. Obvezno pa je upoštevanje varnostnih pravil.',
    category: 'requirements',
  },
]

// Get FAQ items by category
export const getFAQsByCategory = (category: FAQItem['category']) => {
  return faqItems.filter((item) => item.category === category)
}

// Get featured FAQ items for homepage preview
export const featuredFAQs = faqItems.slice(0, 4)
