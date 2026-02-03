import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-[#1F2A44]">Idee da Rubare (Competitor Benchmark)</h2>
          <p class="text-sm text-gray-500 mt-1">Articoli top-performing di WeRoad e SiVola rimodulati per il target Boscolo.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6">
        
        <!-- Idea 1: Lapponia -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 p-6 border-r border-gray-100 bg-gray-50">
                <span class="text-[10px] font-bold tracking-wider text-[#F4A261] uppercase mb-2 block">Cosa fa WeRoad</span>
                <h3 class="font-bold text-gray-800 text-lg mb-1">"Lapponia selvaggia: a caccia dell'aurora tra i ghiacci"</h3>
                <p class="text-xs text-gray-500 mb-3">Focus su adrenalina, freddo estremo e spirito di adattamento.</p>
                <div class="flex gap-2">
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Traffic Driver</span>
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">SEO: Aurora Boreale</span>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 relative">
                 <div class="absolute top-0 right-0 bg-[#2FA4A9] text-white text-[10px] font-bold px-3 py-1 rounded-bl">PROPOSTA BOSCOLO</div>
                 <span class="text-[10px] font-bold tracking-wider text-[#1F2A44] uppercase mb-2 block">Come lo facciamo noi</span>
                 <h3 class="font-bold text-[#1F2A44] text-lg mb-1">"Aurora Boreale in Lapponia: i lodge di vetro più esclusivi"</h3>
                 <p class="text-sm text-gray-600 mt-2">
                    <strong>Perché funziona:</strong> Manteniamo il topic (Aurora) che ha alto volume di ricerca, ma spostiamo l'intento dall'"avventura scomoda" al "comfort esclusivo", targettizzando chi vuole vedere l'aurora dal caldo del proprio letto.
                 </p>
                 <div class="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-mono">
                    H1: I Migliori Glass Igloo in Finlandia per vedere l'Aurora
                 </div>
            </div>
        </div>

        <!-- Idea 2: Spagna (Demographic) -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 p-6 border-r border-gray-100 bg-gray-50">
                <span class="text-[10px] font-bold tracking-wider text-[#2FA4A9] uppercase mb-2 block">Cosa fa Si Vola</span>
                <h3 class="font-bold text-gray-800 text-lg mb-1">"7 mete imperdibili in Spagna per giovani under 30"</h3>
                <p class="text-xs text-gray-500 mb-3">Targetizzazione demografica precisa. Listicle veloce e fruibile.</p>
                <div class="flex gap-2">
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Engagement</span>
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Social Viral</span>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 relative">
                 <div class="absolute top-0 right-0 bg-[#2FA4A9] text-white text-[10px] font-bold px-3 py-1 rounded-bl">PROPOSTA BOSCOLO</div>
                 <span class="text-[10px] font-bold tracking-wider text-[#1F2A44] uppercase mb-2 block">Come lo facciamo noi</span>
                 <h3 class="font-bold text-[#1F2A44] text-lg mb-1">"Spagna Insolita: 7 città d'arte oltre Barcellona e Madrid"</h3>
                 <p class="text-sm text-gray-600 mt-2">
                    <strong>Perché funziona:</strong> Usiamo lo stesso format "Listicle" (7 mete) che piace all'algoritmo di Google, ma eliminiamo il target "under 30" sostituendolo con l'interesse "Arte/Cultura" e la promessa di scoprire luoghi meno battuti (Andalusia segreta, Paesi Baschi).
                 </p>
                 <div class="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-mono">
                    H1: Itinerario nella Spagna meno conosciuta: da Bilbao a Siviglia
                 </div>
            </div>
        </div>

        <!-- Idea 3: Japan Food -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 p-6 border-r border-gray-100 bg-gray-50">
                <span class="text-[10px] font-bold tracking-wider text-[#F4A261] uppercase mb-2 block">Cosa fa WeRoad</span>
                <h3 class="font-bold text-gray-800 text-lg mb-1">"Cosa mangiare in Giappone: sushi, ramen e street food"</h3>
                <p class="text-xs text-gray-500 mb-3">Guida generalista molto cercata. Copre le keyword base.</p>
                <div class="flex gap-2">
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Volume SEO</span>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 relative">
                 <div class="absolute top-0 right-0 bg-[#2FA4A9] text-white text-[10px] font-bold px-3 py-1 rounded-bl">PROPOSTA BOSCOLO</div>
                 <span class="text-[10px] font-bold tracking-wider text-[#1F2A44] uppercase mb-2 block">Come lo facciamo noi</span>
                 <h3 class="font-bold text-[#1F2A44] text-lg mb-1">"Kaiseki e Cerimonia del Tè: Guida all'Alta Cucina Giapponese"</h3>
                 <p class="text-sm text-gray-600 mt-2">
                    <strong>Perché funziona:</strong> Evitiamo lo scontro diretto su keyword iper-competitive come "Sushi" dove WeRoad è forte. Ci posizioniamo su nicchie di alto valore (Cucina Kaiseki, Galateo) che attraggono un viaggiatore colto e disposto a spendere per esperienze autentiche.
                 </p>
                 <div class="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-mono">
                    H1: Gastronomia in Giappone: guida alle esperienze tradizionali
                 </div>
            </div>
        </div>

        <!-- Idea 4: Giordania -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 p-6 border-r border-gray-100 bg-gray-50">
                <span class="text-[10px] font-bold tracking-wider text-[#F4A261] uppercase mb-2 block">Cosa fa WeRoad</span>
                <h3 class="font-bold text-gray-800 text-lg mb-1">"Trekking a Petra: entrare dal monastero a piedi"</h3>
                <p class="text-xs text-gray-500 mb-3">Focus sulla fatica fisica come conquista e rewarding.</p>
                <div class="flex gap-2">
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Adventure</span>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 relative">
                 <div class="absolute top-0 right-0 bg-[#2FA4A9] text-white text-[10px] font-bold px-3 py-1 rounded-bl">PROPOSTA BOSCOLO</div>
                 <span class="text-[10px] font-bold tracking-wider text-[#1F2A44] uppercase mb-2 block">Come lo facciamo noi</span>
                 <h3 class="font-bold text-[#1F2A44] text-lg mb-1">"Petra di Notte e Wadi Rum: il fascino del silenzio"</h3>
                 <p class="text-sm text-gray-600 mt-2">
                    <strong>Perché funziona:</strong> Sostituiamo il "sudore" del trekking con l'"esclusività" dell'esperienza notturna e del glamping nel deserto. Parliamo al desiderio di atmosfere uniche e comfort fotografico.
                 </p>
                 <div class="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-mono">
                    H1: Giordania Esclusiva: Petra by Night e Glamping nel Deserto
                 </div>
            </div>
        </div>

        <!-- Idea 5: Peru -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 p-6 border-r border-gray-100 bg-gray-50">
                <span class="text-[10px] font-bold tracking-wider text-[#F4A261] uppercase mb-2 block">Cosa fa WeRoad</span>
                <h3 class="font-bold text-gray-800 text-lg mb-1">"Machu Picchu da soli: come arrivare senza tour"</h3>
                <p class="text-xs text-gray-500 mb-3">Guida pratica al fai-da-te e all'indipendenza.</p>
                <div class="flex gap-2">
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Practical Guide</span>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 relative">
                 <div class="absolute top-0 right-0 bg-[#2FA4A9] text-white text-[10px] font-bold px-3 py-1 rounded-bl">PROPOSTA BOSCOLO</div>
                 <span class="text-[10px] font-bold tracking-wider text-[#1F2A44] uppercase mb-2 block">Come lo facciamo noi</span>
                 <h3 class="font-bold text-[#1F2A44] text-lg mb-1">"Ande in Treno: il viaggio di lusso verso Machu Picchu"</h3>
                 <p class="text-sm text-gray-600 mt-2">
                    <strong>Perché funziona:</strong> Invece di competere sul "come arrangiarsi", offriamo l'esperienza opposta: il viaggio panoramico sul treno Vistadome o Hiram Bingham. Puntiamo sul target che vuole vedere il mondo senza rinunciare ai servizi premium.
                 </p>
                 <div class="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-mono">
                    H1: Perù in Treno Panoramico: la via più bella per Machu Picchu
                 </div>
            </div>
        </div>

        <!-- Idea 6: Giappone (Cultura Pop vs Tradizione) -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 p-6 border-r border-gray-100 bg-gray-50">
                <span class="text-[10px] font-bold tracking-wider text-[#F4A261] uppercase mb-2 block">Cosa fa WeRoad</span>
                <h3 class="font-bold text-gray-800 text-lg mb-1">"Giappone Nerd: Akihabara, Manga e Anime"</h3>
                <p class="text-xs text-gray-500 mb-3">Target giovane, appassionato di cultura pop e tecnologia.</p>
                <div class="flex gap-2">
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Pop Culture</span>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 relative">
                 <div class="absolute top-0 right-0 bg-[#2FA4A9] text-white text-[10px] font-bold px-3 py-1 rounded-bl">PROPOSTA BOSCOLO</div>
                 <span class="text-[10px] font-bold tracking-wider text-[#1F2A44] uppercase mb-2 block">Come lo facciamo noi</span>
                 <h3 class="font-bold text-[#1F2A44] text-lg mb-1">"Kyoto Segreta: Templi Zen e Giardini Privati"</h3>
                 <p class="text-sm text-gray-600 mt-2">
                    <strong>Perché funziona:</strong> Mentre i competitor si concentrano sulla frenesia di Tokyo, Boscolo può presidiare l'aspetto spirituale ed estetico del Giappone classico, offrendo accesso a luoghi di meditazione e bellezza esclusiva.
                 </p>
                 <div class="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-mono">
                    H1: L'Anima del Giappone: Itinerario tra i Templi Zen di Kyoto
                 </div>
            </div>
        </div>

        <!-- Idea 7: Viaggi di Nozze (Alternativi vs Classici) -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 p-6 border-r border-gray-100 bg-gray-50">
                <span class="text-[10px] font-bold tracking-wider text-[#2FA4A9] uppercase mb-2 block">Cosa fa Si Vola</span>
                <h3 class="font-bold text-gray-800 text-lg mb-1">"Viaggi di Nozze Avventura: dalla Namibia alla Patagonia"</h3>
                <p class="text-xs text-gray-500 mb-3">Honeymoon per coppie dinamiche che cercano adrenalina.</p>
                <div class="flex gap-2">
                    <span class="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded font-bold">Honeymoon</span>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 relative">
                 <div class="absolute top-0 right-0 bg-[#2FA4A9] text-white text-[10px] font-bold px-3 py-1 rounded-bl">PROPOSTA BOSCOLO</div>
                 <span class="text-[10px] font-bold tracking-wider text-[#1F2A44] uppercase mb-2 block">Come lo facciamo noi</span>
                 <h3 class="font-bold text-[#1F2A44] text-lg mb-1">"Luna di Miele d'Autore: Suite e Panorami in Polinesia"</h3>
                 <p class="text-sm text-gray-600 mt-2">
                    <strong>Perché funziona:</strong> Il target Boscolo cerca il "viaggio della vita" inteso come perfezione, servizio impeccabile e location da sogno. Recuperiamo l'idea di viaggio di nozze come momento di assoluto relax e lusso, differenziandoci dall'avventura "scomoda".
                 </p>
                 <div class="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-mono">
                    H1: Viaggio di Nozze in Polinesia: le isole più romantiche del mondo
                 </div>
            </div>
        </div>

      </div>
    </div>
  `
})
export class IdeasComponent {}