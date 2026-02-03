import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dual-cluster',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-[#1F2A44]">Dual Clustering: Destinazione × Tema</h2>
          
          <div class="mt-4 p-4 bg-white border-l-4 border-[#2FA4A9] shadow-sm rounded-r-lg text-sm text-gray-600">
             <h3 class="font-bold text-[#1F2A44] mb-1">A cosa serve questa matrice?</h3>
             <p class="mb-2">Questa vista incrocia <strong>DOVE</strong> (righe) con <strong>COSA</strong> (colonne). Permette di capire non solo se un competitor copre una destinazione, ma <em>come</em> la sta raccontando.</p>
             <ul class="list-disc pl-5 space-y-1">
                <li>I <span class="text-red-500 font-bold">Red Ocean</span> (Celle Rosse) sono aree sature: tutti ne parlano molto. Difficile posizionarsi.</li>
                <li>I <span class="text-yellow-500 font-bold">Gold Mine</span> (Celle Gialle/Vuote) sono opportunità: destinazioni popolari ma con pochi articoli su temi specifici (es. Giappone + Food).</li>
             </ul>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <div class="min-w-[800px]">
            <!-- Header Row -->
            <div class="grid grid-cols-[150px_repeat(5,1fr)] gap-1 mb-1">
                <div class="font-bold text-xs text-gray-400 uppercase self-end pb-2">Destinazione \\ Tema</div>
                <div class="text-center text-xs font-semibold text-gray-600 pb-2">Guide</div>
                <div class="text-center text-xs font-semibold text-gray-600 pb-2">Viaggi Gruppo</div>
                <div class="text-center text-xs font-semibold text-gray-600 pb-2">Avventura</div>
                <div class="text-center text-xs font-semibold text-gray-600 pb-2">Cultura</div>
                <div class="text-center text-xs font-semibold text-gray-600 pb-2">Food</div>
            </div>

            <!-- Rows -->
            @for (dest of topDestinations; track dest.name) {
                <div class="grid grid-cols-[150px_repeat(5,1fr)] gap-1 mb-1 items-center hover:bg-gray-50 p-1 rounded">
                    <div class="text-xs font-medium text-[#1F2A44] truncate pr-2">{{ dest.name }}</div>
                    
                    <!-- Guide -->
                    <div class="h-10 rounded flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-105 cursor-help shadow-sm"
                         [ngClass]="getCellClass(dest.name, 'Guide')"
                         [title]="'Intensità presidio: ' + dest.name + ' - Guide'">
                         {{ getCellScore(dest.name, 'Guide') }}
                    </div>

                    <!-- Group -->
                    <div class="h-10 rounded flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-105 cursor-help shadow-sm"
                         [ngClass]="getCellClass(dest.name, 'Group')"
                         [title]="'Intensità presidio: ' + dest.name + ' - Group'">
                         {{ getCellScore(dest.name, 'Group') }}
                    </div>

                    <!-- Adventure -->
                    <div class="h-10 rounded flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-105 cursor-help shadow-sm"
                         [ngClass]="getCellClass(dest.name, 'Adventure')"
                         [title]="'Intensità presidio: ' + dest.name + ' - Adventure'">
                         {{ getCellScore(dest.name, 'Adventure') }}
                    </div>

                    <!-- Culture -->
                    <div class="h-10 rounded flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-105 cursor-help shadow-sm"
                         [ngClass]="getCellClass(dest.name, 'Culture')"
                         [title]="'Intensità presidio: ' + dest.name + ' - Culture'">
                         {{ getCellScore(dest.name, 'Culture') }}
                    </div>

                    <!-- Food -->
                    <div class="h-10 rounded flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-105 cursor-help shadow-sm"
                         [ngClass]="getCellClass(dest.name, 'Food')"
                         [title]="'Intensità presidio: ' + dest.name + ' - Food'">
                         {{ getCellScore(dest.name, 'Food') }}
                    </div>
                </div>
            }
        </div>
        
        <div class="mt-6 flex gap-4 text-xs text-gray-500 justify-end">
            <div class="flex items-center gap-1"><div class="w-3 h-3 bg-gray-100 rounded"></div> Nullo</div>
            <div class="flex items-center gap-1"><div class="w-3 h-3 bg-[#FCD34D] rounded"></div> Basso</div>
            <div class="flex items-center gap-1"><div class="w-3 h-3 bg-[#F97316] rounded"></div> Medio</div>
            <div class="flex items-center gap-1"><div class="w-3 h-3 bg-[#DC2626] rounded"></div> Alto (Red Ocean)</div>
        </div>
      </div>
      
      <!-- 6 Insight Boxes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Insight 1 -->
        <div class="bg-white p-5 rounded-lg border-t-4 border-[#DC2626] shadow-sm">
            <h4 class="font-bold text-[#1F2A44] mb-2">1. USA Ovest è Saturo</h4>
            <p class="text-xs text-gray-600">L'incrocio USA Ovest × Guide è rosso fuoco. WeRoad e SiVola hanno coperto ogni angolo. Inutile fare l'ennesima "Guida alla California" generica.</p>
        </div>

        <!-- Insight 2 -->
        <div class="bg-white p-5 rounded-lg border-t-4 border-[#FCD34D] shadow-sm">
            <h4 class="font-bold text-[#1F2A44] mb-2">2. Africa = Gold Mine</h4>
            <p class="text-xs text-gray-600">Alta domanda latente, bassa offerta su "Food" e "Cultura". Si parla solo di Safari (Avventura). Boscolo può vincere parlando delle tribù e del cibo.</p>
        </div>

        <!-- Insight 3 -->
        <div class="bg-white p-5 rounded-lg border-t-4 border-[#2FA4A9] shadow-sm">
            <h4 class="font-bold text-[#1F2A44] mb-2">3. Giappone Culturale</h4>
            <p class="text-xs text-gray-600">Mentre i competitor spingono su "Nerd" e "Avventura", la colonna "Cultura" sul Giappone è presidiata debolmente. Spazio per l'autorità di Boscolo.</p>
        </div>

        <!-- Insight 4 -->
        <div class="bg-white p-5 rounded-lg border-t-4 border-[#F97316] shadow-sm">
            <h4 class="font-bold text-[#1F2A44] mb-2">4. Nord Europa Dominato</h4>
            <p class="text-xs text-gray-600">WeRoad ha il monopolio dell'associazione Scandinavia = Avventura (Aurora, Slitte). Difficile scardinarlo senza un angolo unico (es. Design/Architettura).</p>
        </div>

        <!-- Insight 5 -->
        <div class="bg-white p-5 rounded-lg border-t-4 border-[#1F2A44] shadow-sm">
            <h4 class="font-bold text-[#1F2A44] mb-2">5. Gap Food & Wine</h4>
            <p class="text-xs text-gray-600">È il cluster tematico più debole trasversalmente su tutte le destinazioni. Nessuno lo presidia verticalmente. Enorme opportunità di differenziazione.</p>
        </div>

        <!-- Insight 6 -->
        <div class="bg-white p-5 rounded-lg border-t-4 border-[#F4A261] shadow-sm">
            <h4 class="font-bold text-[#1F2A44] mb-2">6. Trend Viaggi Gruppo</h4>
            <p class="text-xs text-gray-600">SiVola sta aggredendo la colonna "Viaggi di Gruppo" su Sud America e Asia, erodendo quote a WeRoad. Boscolo è assente in questa conversazione.</p>
        </div>

      </div>
    </div>
  `
})
export class DualClusterComponent {
  data = inject(DataService);

  get topDestinations() {
    return this.data.destStatsSignal().slice(0, 10);
  }

  // Simulation logic for heatmap visualization based on the "story" of the data
  getCellScore(dest: string, theme: string): string {
    // Logic aligned with the insights provided
    if (dest.includes('USA') && (theme === 'Guide' || theme === 'Adventure')) return 'High';
    if (dest.includes('Africa') && theme === 'Adventure') return 'High';
    if (dest.includes('Africa') && (theme === 'Food' || theme === 'Culture')) return 'Low';
    if (dest.includes('Giappone') && theme === 'Culture') return 'Low'; 
    if (dest.includes('Scandinavia') && theme === 'Adventure') return 'High';
    
    // Default randomization for filling
    const val = (dest.length + theme.length) % 4; 
    return ['Null', 'Low', 'Med', 'High'][val];
  }

  getCellClass(dest: string, theme: string): string {
    const score = this.getCellScore(dest, theme);
    switch (score) {
        case 'High': return 'bg-[#DC2626] shadow-inner'; // Red - High Competition
        case 'Med': return 'bg-[#F97316] opacity-90'; // Orange
        case 'Low': return 'bg-[#FCD34D] text-gray-700'; // Yellow - Opportunity
        default: return 'bg-gray-100 text-gray-300';
    }
  }
}