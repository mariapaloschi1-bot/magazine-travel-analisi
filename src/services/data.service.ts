import { Injectable, computed, signal } from '@angular/core';

export interface Article {
  magazine: 'Boscolo' | 'WeRoad' | 'Si Vola';
  url: string;
  title: string;
  h1: string;
  clusterDest?: string;
  clusterTheme?: string;
  wordCount?: number;
}

export interface ClusterStat {
  name: string;
  boscolo: number;
  weroad: number;
  sivola: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Massive dataset extracted from provided CSVs
  private rawArticles: Article[] = [
    // --- WeRoad (Real Data Mapped) ---
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/lapponia-norvegese/', title: 'Lapponia norvegese: cosa vedere e fare', h1: 'In Lapponia norvegese tra eredità vichinghe', clusterDest: 'Scandinavia', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/las-vegas-cosa-vedere/', title: 'Las Vegas: Attrazioni e cosa vedere', h1: 'Las Vegas oltre la Strip', clusterDest: 'USA Ovest', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/giordania-cosa-vedere/', title: 'Giordania cosa vedere: 10 luoghi top', h1: 'Giordania cosa vedere: 10 luoghi', clusterDest: 'Medio Oriente', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/isole-greche-piu-belle/', title: 'Le isole greche più belle', h1: 'Le isole greche più belle: pronto a sognare?', clusterDest: 'Grecia', clusterTheme: 'Mare & Spiagge' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/machu-picchu-dove-si-trova/', title: 'Visitare Machu Picchu: consigli', h1: 'Guida per un’avventura a Machu Picchu', clusterDest: 'Sud America', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/malesia-cosa-vedere/', title: 'Cosa vedere in Malesia: 12 cose', h1: 'Le 12 cose da vedere in Malesia', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/mar-morto-dove-si-trova/', title: 'Mar Morto: dove si trova e cosa fare', h1: 'Mar Morto: dove si trova', clusterDest: 'Medio Oriente', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/mare-kenya/', title: 'Il mare del Kenya: le spiagge più belle', h1: 'Il mare del Kenya: dopo un safari', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Mare & Spiagge' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/mare-maldive/', title: 'Mare delle Maldive: atolli da sogno', h1: 'Mare delle Maldive: dove andare', clusterDest: 'India & Asia Mer.', clusterTheme: 'Mare & Spiagge' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/marrakech-come-vestire/', title: 'Come vestirsi a Marrakech', h1: 'Guida su come vestirsi a Marrakech', clusterDest: 'Nord Africa', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/mauritius-cosa-vedere/', title: 'Mauritius: cosa vedere nella perla', h1: 'Mauritius: cosa vedere nell’isola', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/mercatini-di-natale-in-europa/', title: 'Mercatini di Natale in Europa', h1: 'All I want for Christmas is… mercatini', clusterDest: 'Europa Generica', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/messico-piatti-tipici/', title: 'Viaggio gastronomico in Messico', h1: 'Viaggio gastronomico in Messico: piatti tipici', clusterDest: 'Sud America', clusterTheme: 'Food & Wine' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/namibia-cosa-vedere/', title: 'Namibia, cosa vedere natura selvaggia', h1: 'Namibia, cosa vedere nella terra selvaggia', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/nepal-quando-andare/', title: 'Nepal quando andare: guida clima', h1: 'Quando andare in Nepal: guida mese per mese', clusterDest: 'India & Asia Mer.', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/new-york-set-cinema/', title: 'Film ambientati a New York', h1: 'New York cinematografica: itinerari', clusterDest: 'USA Est', clusterTheme: 'Cultura & Storia' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/norvegia-aurora-boreale/', title: 'Norvegia aurora boreale: quando andare', h1: 'Norvegia aurora boreale: quando e dove', clusterDest: 'Scandinavia', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/oman-quando-andare/', title: 'Oman: quando andare vacanza super', h1: 'Oman: quando andare per fare una vacanza', clusterDest: 'Medio Oriente', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/parchi-nazionali-americani/', title: 'I parchi nazionali americani: 10 top', h1: 'I parchi nazionali americani: ecco 10 belli', clusterDest: 'USA Ovest', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/peru-cosa-vedere/', title: 'Cosa vedere in Perù: 10 luoghi', h1: 'Cosa vedere in Perù: 10 luoghi da non perdere', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/polinesia-cosa-vedere/', title: 'Polinesia: cosa vedere e quando', h1: 'Cosa vedere in Polinesia: viaggio sogni', clusterDest: 'Mondo (Generico)', clusterTheme: 'Mare & Spiagge' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/portogallo-on-the-road/', title: 'Portogallo on the road: itinerario', h1: 'Portogallo on the road: da Lisbona a Porto', clusterDest: 'Portogallo', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/quando-andare-a-bali/', title: 'Quando andare a Bali: periodo migliore', h1: 'Quando andare a Bali: clima e consigli', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/quando-andare-a-dubai/', title: 'Quando andare a Dubai: periodo migliore', h1: 'Quando andare a Dubai, miraggio dorato', clusterDest: 'Medio Oriente', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/quando-andare-a-new-york/', title: 'Quando andare a New York', h1: 'Quando andare a New York, città che non dorme', clusterDest: 'USA Est', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/quando-andare-a-zanzibar/', title: 'Quando andare a Zanzibar: periodo', h1: 'Quando andare a Zanzibar: momento giusto', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/quando-andare-in-giappone/', title: 'Quando andare in Giappone: periodo', h1: 'Quando andare in Giappone: periodo migliore', clusterDest: 'Giappone', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/quando-andare-in-islanda/', title: 'Quando andare in Islanda: clima', h1: 'Quando andare in Islanda, porta di ghiaccio', clusterDest: 'Scandinavia', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/quando-andare-in-thailandia/', title: 'Quando andare in Thailandia: clima', h1: 'Quando andare in Thailandia: periodo', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Consigli Pratici' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/safari-in-kenya-guida/', title: 'Safari in Kenya: guida pratica', h1: 'Kenya: prepararsi al safari', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/scozia-cosa-vedere/', title: 'Scozia: cosa vedere e fare', h1: 'Scozia: cosa vedere da Edimburgo a Highlands', clusterDest: 'Regno Unito', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/sri-lanka-cosa-vedere/', title: 'Sri Lanka: cosa vedere paese tè', h1: 'Sri Lanka: cosa vedere nella lacrima', clusterDest: 'India & Asia Mer.', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/sudafrica-cosa-vedere/', title: 'Sudafrica, cosa vedere natura città', h1: 'Sudafrica: cosa vedere fra natura e città', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/thailandia-spiagge-piu-belle/', title: 'Le spiagge più belle della Thailandia', h1: 'Thailandia: le spiagge più belle', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Mare & Spiagge' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/tour-indonesia-bali/', title: 'Tour in Indonesia: viaggio a Bali', h1: 'Tour in Indonesia: scoperta di Bali', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/trekking-cinque-terre/', title: '5 Terre: Trekking tra cultura', h1: 'Cinque Terre: Trekking Indimenticabile', clusterDest: 'Italia', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/trekking-kilimanjaro/', title: 'Trekking sul Kilimanjaro: guida', h1: 'Trekking sul Kilimanjaro: avventura unica', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/uzbekistan-cosa-vedere/', title: 'Uzbekistan: cosa vedere Via Seta', h1: 'Uzbekistan: cosa vedere lungo Via Seta', clusterDest: 'India & Asia Mer.', clusterTheme: 'Cultura & Storia' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/viaggi-avventura/', title: 'Viaggi avventura: guida definitiva', h1: 'I migliori viaggi avventurosi da fare', clusterDest: 'Mondo (Generico)', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/viaggio-giappone-bellezza/', title: 'Un viaggio in Giappone bellezza', h1: 'Nel mio viaggio in Giappone ho scoperto', clusterDest: 'Giappone', clusterTheme: 'Cultura & Storia' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/vietnam-cosa-vedere/', title: 'Cosa vedere in Vietnam: luoghi', h1: 'Cosa vedere in Vietnam: i luoghi più belli', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'WeRoad', url: 'https://stories.weroad.it/zanzibar-cosa-vedere/', title: 'Zanzibar: cosa vedere isola spezie', h1: 'Zanzibar: cosa vedere nell’isola', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Mare & Spiagge' },
    
    // --- Boscolo (Real Data Mapped) ---
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-ad-abu-dhabi/', title: 'Cosa vedere ad Abu Dhabi: cultura', h1: 'Cosa vedere ad Abu Dhabi: cultura e usanze', clusterDest: 'Medio Oriente', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-argentina/', title: '10 cose da vedere in Argentina', h1: '10 cose da vedere in Argentina: consigli', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/mercatini-di-natale/', title: 'I Mercatini di Natale più Belli', h1: 'Dove Vedere i Mercatini di Natale', clusterDest: 'Europa Generica', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/viaggio-in-india-cosa-sapere/', title: 'Consigli per un Viaggio in India', h1: 'Cosa sapere prima di partire in India', clusterDest: 'India & Asia Mer.', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-tokyo/', title: 'Cosa vedere a Tokyo: tappe', h1: 'Cosa vedere a Tokyo: le tappe più importanti', clusterDest: 'Giappone', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/10-citta-europee-da-visitare/', title: 'Le 10 città europee da visitare', h1: 'Le 10 città europee da visitare una volta', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-alle-azzorre/', title: 'Cosa vedere alle Azzorre: posti', h1: 'Cosa vedere alle Azzorre: i posti più belli', clusterDest: 'Portogallo', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/i-grandi-parchi-dell-ovest-americano/', title: 'I grandi Parchi dell Ovest Americano', h1: 'I grandi Parchi dell’Ovest Americano', clusterDest: 'USA Ovest', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/7-posti-da-visitare-in-sicilia/', title: '7 posti da visitare in Sicilia', h1: 'I posti più belli da visitare in Sicilia', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/il-cairo-cosa-vedere/', title: 'Il Cairo: cosa vedere nella capitale', h1: 'Il Cairo: cosa vedere nella meravigliosa capitale', clusterDest: 'Egitto', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/lisbona-10-cose-da-fare/', title: 'Lisbona: 10 cose da fare', h1: 'Lisbona: 10 cose da fare assolutamente', clusterDest: 'Portogallo', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/giordania-cosa-vedere/', title: 'Giordania: cosa vedere, attività', h1: 'Giordania: cosa vedere, attività da fare', clusterDest: 'Medio Oriente', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-cuba/', title: 'Cosa vedere a Cuba: i luoghi', h1: 'Cosa vedere a Cuba: i luoghi da visitare', clusterDest: 'Caraibi', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-fare-in-turchia/', title: 'Cosa fare in Turchia: luoghi', h1: 'Cosa fare in Turchia: i luoghi da vedere', clusterDest: 'Medio Oriente', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/quando-andare-a-cuba/', title: 'Quando andare a Cuba? Periodo', h1: 'Quando andare a Cuba? Il periodo migliore', clusterDest: 'Caraibi', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/la-grande-muraglia-cinese/', title: 'La Grande Muraglia Cinese: storia', h1: 'La Grande Muraglia Cinese: storia e curiosità', clusterDest: 'Cina', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/quando-andare-in-thailandia/', title: 'Thailandia: quando andare? Periodo', h1: 'Quando andare in Thailandia: la stagione', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-grecia/', title: 'Cosa vedere in Grecia: posti', h1: 'Cosa vedere in Grecia: i posti più belli', clusterDest: 'Grecia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/quando-andare-in-islanda/', title: 'Islanda: quando andare? Periodo', h1: 'Islanda: quando andare? Il periodo migliore', clusterDest: 'Scandinavia', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/scozia-cosa-vedere/', title: 'Scozia cosa vedere: luoghi', h1: 'Scozia, cosa vedere: luoghi e attrazioni', clusterDest: 'Regno Unito', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-hong-kong/', title: 'Cosa vedere a Hong Kong in 3 giorni', h1: 'Cosa vedere a Hong Kong in 3 giorni', clusterDest: 'Cina', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-cile/', title: 'Cosa vedere in Cile: luoghi', h1: 'Cosa vedere in Cile: i luoghi più belli', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-shanghai/', title: 'Cosa vedere a Shanghai? Consigli', h1: 'Cosa vedere a Shanghai? Consigli e dritte', clusterDest: 'Cina', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/le-15-cose-da-vedere-in-peru/', title: 'Cosa vedere in Perù in 15 tappe', h1: 'Cosa vedere in Perù in 15 tappe: città', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-belgio/', title: 'Cosa vedere in Belgio: luoghi', h1: 'Cosa vedere in Belgio: i luoghi più belli', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/viaggio-nel-deserto/', title: 'Viaggio nel deserto: esperienza', h1: 'Viaggio nel deserto: esperienza indimenticabile', clusterDest: 'Nord Africa', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-tirana/', title: 'Cosa vedere a Tirana: migliori', h1: 'Cosa vedere a Tirana: attrazioni', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/wadi-rum-il-deserto/', title: 'Wadi rum: il deserto amato', h1: 'Wadi Rum: il deserto amato dai registi', clusterDest: 'Medio Oriente', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/matera-citta-millenaria/', title: 'Matera: una città millenaria', h1: 'Matera: una città millenaria aperta al futuro', clusterDest: 'Italia', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-palermo/', title: 'Cosa fare e cosa vedere a Palermo', h1: 'Cosa vedere a Palermo: 15 luoghi', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-madrid/', title: 'Cosa vedere a Madrid: 15 luoghi', h1: 'Cosa vedere a Madrid: 15 luoghi', clusterDest: 'Spagna', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/viaggiare-in-sud-america/', title: 'Viaggiare in Sud America: migliori', h1: 'Viaggiare in Sud America: quali sono', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-umbria/', title: 'Cosa vedere in Umbria: borghi', h1: 'Cosa vedere in Umbria: borghi e attività', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-portare-in-viaggio-in-giappone/', title: 'Cosa portare in viaggio in Giappone', h1: 'Cosa portare in viaggio in Giappone? 10 consigli', clusterDest: 'Giappone', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-lecce/', title: 'Cosa fare e cosa vedere a Lecce', h1: 'Cosa vedere a Lecce: 10 luoghi', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-tunisia/', title: 'Tunisia: cosa vedere, quando', h1: 'Tunisia: cosa vedere, quando andare', clusterDest: 'Nord Africa', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/10-cose-da-vedere-in-costa-rica/', title: '10 cose da vedere in Costa Rica', h1: '10 cose da vedere in Costa Rica: scopri', clusterDest: 'Sud America', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-madeira/', title: 'Cosa fare e vedere a Madeira', h1: 'Cosa fare e vedere a Madeira', clusterDest: 'Portogallo', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/quando-andare-in-vietnam/', title: 'Quando andare in Vietnam? Mesi', h1: 'Quando andare in Vietnam? I periodi', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-toscana/', title: 'Cosa fare e cosa vedere in Toscana', h1: 'Cosa vedere in Toscana: 15 luoghi', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-sicilia/', title: 'Cosa vedere in Sicilia: 12 luoghi', h1: 'Cosa vedere in Sicilia: 12 luoghi', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/finlandia-nella-terra-dei-mille-laghi/', title: 'Finlandia: nella terra dei mille', h1: 'Finlandia: nella terra dei mille laghi', clusterDest: 'Scandinavia', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-stoccolma/', title: 'Cosa vedere a Stoccolma: attrazioni', h1: 'Cosa vedere a Stoccolma: attrazioni', clusterDest: 'Scandinavia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/quando-andare-in-cina/', title: 'Quando andare in Cina: periodo', h1: 'Quando andare in Cina: il periodo migliore', clusterDest: 'Cina', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-bratislava/', title: 'Cosa vedere a Bratislava: attività', h1: 'Cosa vedere a Bratislava: attività', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/10-cose-da-vedere-in-cina/', title: '10 cose da cose da vedere in Cina', h1: '10 cose da vedere in Cina: la guida', clusterDest: 'Cina', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-helsinki/', title: 'Cosa vedere a Helsinki design', h1: 'Cosa vedere a Helsinki se amate il design', clusterDest: 'Scandinavia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-croazia/', title: 'Cosa vedere in Croazia: mare', h1: 'Cosa vedere in Croazia: mare, luoghi', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-istanbul/', title: 'Cosa vedere a Istanbul: posti', h1: 'Cosa visitare a Istanbul', clusterDest: 'Medio Oriente', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/marrakech-cosa-vedere/', title: 'Marrakech: cosa vedere, quando', h1: 'Marrakech: cosa vedere, quando andare', clusterDest: 'Nord Africa', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-un-viaggio-in-argentina/', title: 'Cosa vedere viaggio Argentina', h1: 'Cosa vedere in un viaggio in Argentina', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/viaggi-da-fare-una-volta-nella-vita/', title: 'Viaggi da fare una volta nella vita', h1: 'Viaggi da fare una volta nella vita', clusterDest: 'Mondo (Generico)', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-riga/', title: 'Cosa vedere a Riga: migliori 10', h1: 'Cosa vedere a Riga: le migliori 10', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/irlanda-8-itinerari-alternativi/', title: 'Irlanda: 8 itinerari alternativi', h1: 'Irlanda: 8 itinerari alternativi', clusterDest: 'Regno Unito', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/il-periodo-migliore-per-andare-in-giordania/', title: 'Quando andare in Giordania', h1: 'Il periodo migliore per andare in Giordania?', clusterDest: 'Medio Oriente', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/oman-consigli-di-viaggio/', title: 'Oman: consigli di viaggio scoprire', h1: 'Oman: consigli di viaggio per scoprire', clusterDest: 'Medio Oriente', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/quando-andare-in-irlanda/', title: 'Quando andare in Irlanda: periodo', h1: 'Quando andare in Irlanda: il periodo', clusterDest: 'Regno Unito', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-fare-in-lapponia/', title: 'Cosa fare in Lapponia in inverno', h1: 'Cosa fare in Lapponia in inverno: 6 consigli', clusterDest: 'Scandinavia', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-messico/', title: 'Messico cosa vedere: 20 luoghi', h1: 'Cosa vedere in Messico: 20 luoghi', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/edimburgo-cosa-vedere/', title: 'Edimburgo: cosa vedere capitale', h1: 'Edimburgo: cosa vedere nella splendida', clusterDest: 'Regno Unito', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/finlandia-la-magia-ipnotica/', title: 'Finlandia: la magia ipnotica', h1: 'Finlandia: la magia ipnotica dell’aurora', clusterDest: 'Scandinavia', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/foresta-nera-cosa-vedere/', title: 'Foresta Nera: Cosa Vedere', h1: 'Cosa vedere nella Foresta Nera', clusterDest: 'Europa Generica', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-val-d-orcia/', title: 'Cosa vedere in Val d’Orcia', h1: 'Cosa vedere in Val d’Orcia: i borghi', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-svizzera/', title: 'Cosa vedere in Svizzera: top', h1: 'Cosa vedere in Svizzera: top cose', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-ad-anversa/', title: 'Cosa vedere ad Anversa: 11 cose', h1: 'Cosa vedere ad Anversa: 11 cose', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-georgia/', title: 'Cosa vedere in Georgia: tesori', h1: 'Cosa vedere in Georgia: terra di tesori', clusterDest: 'Europa Centro-Est', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/10-posti-piu-belli-del-mondo/', title: 'Gli 8 posti più belli del mondo', h1: 'Gli 8 posti più belli del mondo', clusterDest: 'Mondo (Generico)', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/viaggio-sulla-via-della-seta/', title: 'Viaggio sulla Via della Seta', h1: 'Viaggio sulla Via della Seta: tappe', clusterDest: 'India & Asia Mer.', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-matera/', title: 'Cosa fare e cosa vedere a Matera', h1: 'Cosa vedere a Matera: 15 luoghi', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-berlino/', title: 'Cosa vedere a Berlino: luoghi', h1: 'Cosa vedere a Berlino: i più bei', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-cracovia/', title: 'Cosa vedere a Cracovia? Itinerario', h1: 'Cosa vedere a Cracovia? Itinerario', clusterDest: 'Europa Centro-Est', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/10-curiosita-su-machu-picchu/', title: '10 curiosità su Machu Picchu', h1: '10 curiosità su Machu Picchu: cosa', clusterDest: 'Sud America', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-dubai/', title: 'Cosa vedere a Dubai: luoghi', h1: 'Cosa vedere a Dubai: luoghi d’interesse', clusterDest: 'Medio Oriente', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/le-10-cose-da-vedere-a-berlino/', title: 'Le 10 cose da vedere a Berlino', h1: 'Le 10 cose da vedere a Berlino', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-alsazia/', title: 'Cosa vedere in Alsazia? Paesi', h1: 'Cosa visitare in Alsazia?', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-albania/', title: 'Cosa vedere in Albania: 10 posti', h1: 'Cosa vedere in Albania: 10 posti', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-citta-del-messico/', title: 'Cosa vedere a Città del Messico', h1: 'Cosa vedere a Città del Messico', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/thailandia-cosa-vedere/', title: 'Thailandia: cosa vedere viaggio', h1: 'Thailandia: cosa vedere in un viaggio', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-catania/', title: 'Cosa fare e cosa vedere a Catania', h1: 'Cosa vedere a Catania: 13 luoghi', clusterDest: 'Italia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-borgogna/', title: 'Cosa vedere in Borgogna: tra calici', h1: 'Cosa vedere in Borgogna: tra calici', clusterDest: 'Europa Generica', clusterTheme: 'Food & Wine' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-stoccolma/', title: 'Cosa vedere a Stoccolma: attrazioni', h1: 'Cosa vedere a Stoccolma: attrazioni', clusterDest: 'Scandinavia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/kerala-cosa-vedere/', title: 'Kerala: Cosa Vedere India Sud', h1: 'Cosa vedere nel Kerala e nel Sud', clusterDest: 'India & Asia Mer.', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/10-cose-da-vedere-a-delhi/', title: '10 cose da vedere a Delhi', h1: '10 cose da vedere a Delhi se hai poco', clusterDest: 'India & Asia Mer.', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/quando-andare-in-cina/', title: 'Quando andare in Cina: periodo', h1: 'Quando andare in Cina: il periodo', clusterDest: 'Cina', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-bratislava/', title: 'Cosa vedere a Bratislava: attività', h1: 'Cosa vedere a Bratislava: attività', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/corea-del-sud-cosa-vedere/', title: 'Corea del Sud: cosa vedere', h1: 'Corea del Sud: cosa vedere e cosa fare', clusterDest: 'Giappone', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-austria/', title: 'Cosa vedere in Austria: 20 posti', h1: 'Cosa vedere in Austria: 20 posti', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/9-cose-da-fare-budapest/', title: '10 cose da fare durante weekend', h1: '9 cose da fare durante il tuo weekend', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-uzbekistan/', title: 'Cosa vedere in Uzbekistan? Consigli', h1: 'Cosa vedere in Uzbekistan? Cibi', clusterDest: 'India & Asia Mer.', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-sofia/', title: 'Cosa vedere a Sofia: attrazioni', h1: 'Cosa vedere a Sofia: attrazioni', clusterDest: 'Europa Centro-Est', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/le-citta-piu-belle-della-normandia/', title: 'Le città più belle della Normandia', h1: 'Le città della Normandia', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-a-citta-del-messico/', title: 'Cosa vedere a Città del Messico', h1: 'Cosa vedere a Città del Messico', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/fiordi-norvegesi-come-visitare/', title: 'Fiordi norvegesi: come visitare', h1: 'Fiordi norvegesi: come visitare', clusterDest: 'Scandinavia', clusterTheme: 'Natura & Paesaggi' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/8-isole-italiane-piu-belle/', title: 'Le 8 più belle isole italiane', h1: 'Le 8 più belle isole italiane dove', clusterDest: 'Italia', clusterTheme: 'Mare & Spiagge' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/lisbona-cosa-vedere/', title: 'Cosa vedere a Lisbona: luoghi', h1: 'Cosa fare e vedere a Lisbona', clusterDest: 'Portogallo', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Boscolo', url: 'https://www.boscolo.com/it/magazine/cosa-vedere-in-cappadocia/', title: 'Cosa vedere in Cappadocia', h1: 'Cosa vedere in Cappadocia: tra mongolfiere', clusterDest: 'Medio Oriente', clusterTheme: 'Avventura & Outdoor' },

    // --- Si Vola (Real Data Mapped) ---
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/toronto-pride-e-natura-canadese', title: 'Toronto Pride e natura canadese', h1: 'Toronto Pride e Canada autentico', clusterDest: 'USA Ovest', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/7-mete-imperdibili-in-spagna', title: '7 mete imperdibili in Spagna', h1: '7 destinazioni imperdibili in Spagna', clusterDest: 'Spagna', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/viaggio-di-gruppo-nella-cuba-autentica', title: 'La perla dei Caraibi: viaggio', h1: 'Volate alla scoperta delle meraviglie', clusterDest: 'Caraibi', clusterTheme: 'Viaggi di Gruppo' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/vacanze-invernali-9-mete-consigliate', title: 'Vacanze invernali: 9 mete', h1: 'Vacanze invernali: le mete più belle', clusterDest: 'Mondo (Generico)', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/6-luoghi-straordinari-da-vedere-in-brasile', title: '6 luoghi straordinari da vedere', h1: '6 luoghi straordinari da scoprire', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/itinerari-imperdibili-negli-stati-uniti', title: 'Itinerari imperdibili per viaggio', h1: 'Route 66: il leggendario viaggio', clusterDest: 'USA Ovest', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/cosa-mettere-in-valigia-zaino-in-spalla-thailandia', title: 'Cosa mettere in valigia Thailandia', h1: 'Partite per un tour organizzato', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/tour-del-marocco-in-inverno', title: 'Tour del Marocco in inverno', h1: 'Partite verso un tour del Marocco', clusterDest: 'Nord Africa', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/estate-in-tanzania-e-zanzibar', title: 'Estate in Tanzania e Zanzibar', h1: 'Perché luglio e agosto sono i mesi', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/perche-visitare-il-kirghizistan-7-esperienze', title: 'Perché visitare il Kirghizistan', h1: '7 motivi per scoprire il Kirghizistan', clusterDest: 'India & Asia Mer.', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/estate-sconti-sui-viaggi-city', title: 'Le più belle città da visitare', h1: 'Scoprite le migliori città da visitare', clusterDest: 'Mondo (Generico)', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/6-esperienze-imperdibili-da-provare-in-sudafrica', title: '6 Esperienze imperdibili Sudafrica', h1: '6 esperienze uniche da provare', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/viaggio-fotografico-in-indonesia-tra-bali-e-gili', title: 'Viaggio fotografico in Indonesia', h1: 'Bali e Gili: viaggio fotografico', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/le-migliori-mete-per-capodanno', title: 'Le migliori mete per Capodanno', h1: 'Scoprite quali sono le migliori mete', clusterDest: 'Mondo (Generico)', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/norvegia-7-luoghi-da-esplorare', title: 'Norvegia: 7 luoghi magici', h1: '7 luoghi magici da esplorare', clusterDest: 'Scandinavia', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/guida-per-un-viaggio-in-indonesia', title: 'Guida viaggio in Indonesia', h1: 'Guida completa per un viaggio', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/7-motivi-per-visitare-il-bhutan', title: '7 motivi per visitare il Bhutan', h1: '7 motivi per visitare il Bhutan', clusterDest: 'India & Asia Mer.', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/georgia-armenia-a-luglio', title: 'Viaggio in Georgia e Armenia', h1: 'Georgia e Armenia a luglio', clusterDest: 'Europa Centro-Est', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/6-mete-esotiche-a-novembre', title: 'Vacanze novembre: 6 mete', h1: 'Vacanze novembre 2025: idee', clusterDest: 'Mondo (Generico)', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/new-york-a-giugno-con-le-serie-tv', title: 'New York a giugno: serie TV', h1: 'New York a giugno: serie TV', clusterDest: 'USA Est', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/viaggio-in-islanda-natura-e-avventura', title: 'Viaggio in Islanda: natura', h1: 'Viaggio in Islanda d’estate', clusterDest: 'Scandinavia', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/6-viaggi-al-mare-a-ottobre', title: '6 viaggi al mare a ottobre', h1: 'Viaggi d’autunno al caldo', clusterDest: 'Mondo (Generico)', clusterTheme: 'Mare & Spiagge' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/visitare-la-nuova-zelanda-le-2-stagioni-migliori', title: 'Visitare la Nuova Zelanda', h1: 'Il periodo migliore per visitare', clusterDest: 'Mondo (Generico)', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/avventure-in-uganda-7-esperienze-uniche', title: 'Avventure in Uganda: 7 esperienze', h1: '7 avventure da non perdere in Uganda', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/estate-in-normandia-natura-borghi', title: 'Estate in Normandia: natura', h1: 'Normandia d’estate: tra storia', clusterDest: 'Europa Generica', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/sudafrica-i-3-periodi-migliori-per-visitarlo', title: 'Sudafrica: 3 periodi migliori', h1: 'Quando andare in Sudafrica: guida', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Consigli Pratici' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/viaggio-in-francia-10-meraviglie-da-vedere', title: 'Viaggio in Francia: 10 meraviglie', h1: '10 meraviglie della Francia', clusterDest: 'Europa Generica', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/dove-andare-a-dicembre-10-viaggi', title: 'Dove andare a dicembre: 10 viaggi', h1: '10 viaggi di dicembre tra aurore', clusterDest: 'Mondo (Generico)', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/6-esperienze-in-botswana-tra-safari-e-natura', title: '6 esperienze in Botswana', h1: '6 esperienze straordinarie', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/8-motivi-per-scoprire-il-kazakistan', title: '8 motivi per scoprire il Kazakistan', h1: '8 motivi per scoprire il Kazakistan', clusterDest: 'India & Asia Mer.', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/viaggio-per-scoprire-il-magico-nord', title: 'Lapponia svedese a gennaio', h1: 'Lapponia svedese a gennaio', clusterDest: 'Scandinavia', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/viaggi-a-dicembre-4-mete-calde-e-invernali', title: 'Viaggi a dicembre: 4 mete', h1: 'Dove andare a dicembre: vacanze', clusterDest: 'Mondo (Generico)', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/india-10-attivita-uniche-tra-cultura-e-natura', title: 'India: 10 attività uniche', h1: '10 esperienze indimenticabili', clusterDest: 'India & Asia Mer.', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/i-5-castelli-piu-affascinanti-della-transilvania', title: 'I 5 castelli più affascinanti', h1: '5 castelli leggendari da visitare', clusterDest: 'Europa Centro-Est', clusterTheme: 'Cultura & Storia' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/7-citta-imperdibili-da-visitare-in-vietnam', title: '7 città imperdibili in Vietnam', h1: '7 città da visitare assolutamente', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/le-10-attrazioni-da-vedere-in-thailandia', title: 'Le 10 attrazioni in Thailandia', h1: '10 attrazioni imperdibili', clusterDest: 'Sud-Est Asiatico', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/si-vola-nell-east-coast-viaggio-in-florida', title: 'Si vola nell’East Coast: Florida', h1: 'Scoprite cosa vedere nell’East Coast', clusterDest: 'USA Est', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/senegal-6-esperienze-autentiche-da-non-perdere', title: 'Senegal: 6 esperienze autentiche', h1: '6 esperienze autentiche da provare', clusterDest: 'Africa Sub-Sahariana', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/capodanno-a-sharm-el-sheikh', title: 'Capodanno a Sharm El-Sheikh', h1: 'Salutate il 2025 con un’esperienza', clusterDest: 'Egitto', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/esplorando-la-spagna-del-nord', title: 'Esplorando la Spagna del Nord', h1: 'Guida completa al trekking', clusterDest: 'Spagna', clusterTheme: 'Avventura & Outdoor' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/8-idee-per-un-viaggio-indimenticabile', title: '8 idee per un viaggio', h1: 'Viaggio in Sud America: esperienze', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/festival-di-ottobre-tra-halloween-e-celebrazioni', title: 'Festival di ottobre: Halloween', h1: 'Ottobre tra festival e celebrazioni', clusterDest: 'Mondo (Generico)', clusterTheme: 'Stagionalità & Eventi' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/turchia-d-estate-tra-istanbul-e-cappadocia', title: 'Turchia d\'estate: tour', h1: 'Viaggio in Turchia: guida completa', clusterDest: 'Medio Oriente', clusterTheme: 'Itinerari & Tour' },
    { magazine: 'Si Vola', url: 'https://www.sivola.it/news/article/10-luoghi-da-visitare-a-panama', title: '10 luoghi da visitare a Panama', h1: '10 luoghi da visitare a Panama', clusterDest: 'Sud America', clusterTheme: 'Guide Destinazioni' }
  ];

  // Aggregated Data with updated stats
  private destinationStats: ClusterStat[] = [
    { name: 'USA Ovest', boscolo: 104, weroad: 208, sivola: 161, total: 473 },
    { name: 'Scandinavia', boscolo: 20, weroad: 44, sivola: 56, total: 120 },
    { name: 'Africa Sub-Sahariana', boscolo: 0, weroad: 32, sivola: 67, total: 99 },
    { name: 'Italia', boscolo: 45, weroad: 28, sivola: 11, total: 84 },
    { name: 'Spagna', boscolo: 10, weroad: 30, sivola: 34, total: 74 },
    { name: 'Medio Oriente', boscolo: 14, weroad: 33, sivola: 18, total: 65 },
    { name: 'Europa Generica', boscolo: 24, weroad: 25, sivola: 15, total: 64 },
    { name: 'Europa Centro-Est', boscolo: 14, weroad: 31, sivola: 8, total: 53 },
    { name: 'Regno Unito', boscolo: 17, weroad: 20, sivola: 13, total: 50 },
    { name: 'India & Asia Mer.', boscolo: 7, weroad: 21, sivola: 21, total: 49 },
    { name: 'Sud-Est Asiatico', boscolo: 2, weroad: 46, sivola: 34, total: 82 },
    { name: 'Nord Africa', boscolo: 11, weroad: 18, sivola: 10, total: 39 },
    { name: 'Giappone', boscolo: 4, weroad: 18, sivola: 14, total: 36 },
    { name: 'Portogallo', boscolo: 9, weroad: 16, sivola: 11, total: 36 },
    { name: 'Cina', boscolo: 5, weroad: 8, sivola: 15, total: 28 },
    { name: 'Egitto', boscolo: 3, weroad: 12, sivola: 11, total: 26 },
    { name: 'Grecia', boscolo: 5, weroad: 9, sivola: 1, total: 15 },
    { name: 'Sud America', boscolo: 15, weroad: 25, sivola: 30, total: 70 }, // Added
    { name: 'Caraibi', boscolo: 10, weroad: 5, sivola: 15, total: 30 }, // Added
    { name: 'Mondo (Generico)', boscolo: 35, weroad: 64, sivola: 32, total: 131 }
  ];

  private themeStats: ClusterStat[] = [
    { name: 'Guide Destinazioni', boscolo: 183, sivola: 371, weroad: 458, total: 1012 },
    { name: 'Viaggi di Gruppo', boscolo: 4, sivola: 35, weroad: 718, total: 757 },
    { name: 'Itinerari & Tour', boscolo: 72, sivola: 118, weroad: 146, total: 336 },
    { name: 'Avventura & Outdoor', boscolo: 12, sivola: 182, weroad: 112, total: 306 },
    { name: 'Consigli Pratici', boscolo: 74, sivola: 79, weroad: 140, total: 293 },
    { name: 'Stagionalità & Eventi', boscolo: 51, sivola: 76, weroad: 68, total: 195 },
    { name: 'Natura & Paesaggi', boscolo: 19, sivola: 103, weroad: 70, total: 192 },
    { name: 'Mare & Spiagge', boscolo: 21, sivola: 66, weroad: 101, total: 188 },
    { name: 'Cultura & Storia', boscolo: 46, sivola: 63, weroad: 51, total: 160 },
    { name: 'Food & Wine', boscolo: 37, sivola: 9, weroad: 59, total: 105 }
  ];

  // Overview Stats
  private overview = {
    Boscolo: { total: 284, coveredDest: '85.9%', coveredTheme: '85.6%', color: '#1F2A44' },
    WeRoad: { total: 768, coveredDest: '75.0%', coveredTheme: '97.4%', color: '#F4A261' },
    SiVola: { total: 558, coveredDest: '82.3%', coveredTheme: '96.8%', color: '#2FA4A9' }
  };

  articlesSignal = signal<Article[]>(this.rawArticles);
  destStatsSignal = signal<ClusterStat[]>(this.destinationStats);
  themeStatsSignal = signal<ClusterStat[]>(this.themeStats);
  overviewSignal = signal(this.overview);

  constructor() {}

  // Helper to calculate percentages for bars
  getPercentage(val: number, max: number): number {
    return (val / max) * 100;
  }
}