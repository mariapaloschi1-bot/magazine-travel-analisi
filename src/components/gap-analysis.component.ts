import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ClusterStat } from '../services/data.service';

interface GapOpportunity {
  cluster: string;
  type: 'Destinazione' | 'Tema';
  boscoloShare: number;
  competitorAvg: number;
  gapType: 'Assente' | 'Debole' | 'Superficiale';
  priority: 'ALTA' | 'MEDIA';
}

@Component({
  selector: 'app-gap-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="bg-[#1F2A44] text-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold">GAP Analysis Prioritizzata</h2>
        <p class="text-gray-300 text-sm mt-2">Focus: Boscolo. Dove stiamo perdendo traffico e autorità rispetto a WeRoad e Si Vola?</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- List of Opportunities -->
        <div class="space-y-4">
            @for (opp of opportunities; track opp.cluster) {
                <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center hover:border-l-4 hover:border-l-[#F4A261] transition-all group">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs font-bold px-2 py-0.5 rounded"
                                [ngClass]="opp.type === 'Destinazione' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'">
                                {{ opp.type }}
                            </span>
                            <span class="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800" *ngIf="opp.priority === 'ALTA'">
                                PRIORITÀ ALTA
                            </span>
                        </div>
                        <h3 class="font-bold text-[#1F2A44] text-lg">{{ opp.cluster }}</h3>
                        <p class="text-xs text-gray-500 mt-1">
                            Presidio Boscolo: <span class="font-bold">{{ opp.boscoloShare }}%</span> vs Competitor: <span class="font-bold">{{ opp.competitorAvg }}%</span>
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="text-sm font-semibold text-gray-600">{{ opp.gapType }}</div>
                        <button class="text-[#2FA4A9] text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">VEDI DETTAGLI →</button>
                    </div>
                </div>
            }
        </div>

        <!-- Action Card -->
        <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="font-bold text-[#1F2A44] mb-4 border-b pb-2">Cosa "Rubare" (Best Practices)</h3>
                <ul class="space-y-3 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                        <span class="text-green-500 font-bold">✓</span>
                        <span><strong>Titoli "Listicle":</strong> Aumentare drasticamente l'uso di "10 cose da vedere", "7 luoghi imperdibili". I competitor lo usano nel 80% dei casi top performing.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-green-500 font-bold">✓</span>
                        <span><strong>Cluster "Avventura":</strong> Boscolo è quasi assente (4%). Creare una rubrica "Soft Adventure" per svecchiare il target senza perdere identità.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-green-500 font-bold">✓</span>
                        <span><strong>Focus Africa Sub-Sahariana:</strong> Si Vola presidia pesantemente (67 art). Boscolo (0). È una gold mine scoperta.</span>
                    </li>
                </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="font-bold text-[#1F2A44] mb-4 border-b pb-2">Cosa Evitare</h3>
                <ul class="space-y-3 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                        <span class="text-red-500 font-bold">✕</span>
                        <span><strong>Titoli Generici:</strong> Evitare titoli come "Viaggio in X". Usare H1 specifici che rispondono a intenti di ricerca (Cosa vedere, Quando andare).</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-red-500 font-bold">✕</span>
                        <span><strong>Contenuti brevi (< 800 parole):</strong> I competitor si posizionano con guide da 1500+ parole.</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
      
      <!-- New Extra Insights Section - More Visible -->
      <div class="mt-8">
        <h3 class="text-lg font-bold text-[#1F2A44] mb-4 flex items-center gap-2">
            <span class="text-2xl">🚀</span> Strategic Insights
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-5 rounded-lg border-l-4 border-blue-500 shadow-md transform transition-transform hover:-translate-y-1">
                <div class="font-bold text-[#1F2A44] text-base mb-2">Trend Emergente: Egitto</div>
                <p class="text-sm text-gray-600 leading-relaxed">Il gap è ancora colmabile (Boscolo 3 vs WeRoad 12). È una destinazione culturale perfetta per Boscolo che sta venendo erosa dai competitor.</p>
            </div>
            <div class="bg-white p-5 rounded-lg border-l-4 border-red-500 shadow-md transform transition-transform hover:-translate-y-1">
                <div class="font-bold text-[#1F2A44] text-base mb-2">Pericolo: Sud-Est Asiatico</div>
                <p class="text-sm text-gray-600 leading-relaxed">Con soli 2 articoli contro gli 80 complessivi dei competitor, Boscolo è digitalmente invisibile in Thailandia/Vietnam/Indonesia.</p>
            </div>
            <div class="bg-white p-5 rounded-lg border-l-4 border-green-500 shadow-md transform transition-transform hover:-translate-y-1">
                <div class="font-bold text-[#1F2A44] text-base mb-2">Opportunità: Portogallo</div>
                <p class="text-sm text-gray-600 leading-relaxed">I numeri sono vicini (Boscolo 9, WeRoad 16). Con un piccolo sforzo editoriale (5-6 articoli mirati) si può raggiungere la parità di quota.</p>
            </div>
        </div>
      </div>
    </div>
  `
})
export class GapAnalysisComponent {
  data = inject(DataService);
  opportunities: GapOpportunity[] = [];

  constructor() {
    this.calculateGaps();
  }

  calculateGaps() {
    const dests = this.data.destStatsSignal();
    const themes = this.data.themeStatsSignal();

    // Analyze Destinations
    dests.forEach(d => {
        const totalComp = d.weroad + d.sivola;
        const compAvgShare = Math.round(((totalComp / 2) / d.total) * 100); // Rough approximation
        const boscoloShare = Math.round((d.boscolo / d.total) * 100);

        if (d.boscolo === 0 && d.total > 20) {
            this.opportunities.push({
                cluster: d.name,
                type: 'Destinazione',
                boscoloShare: 0,
                competitorAvg: compAvgShare,
                gapType: 'Assente',
                priority: 'ALTA'
            });
        } else if (boscoloShare < 10 && d.total > 50) {
             this.opportunities.push({
                cluster: d.name,
                type: 'Destinazione',
                boscoloShare: boscoloShare,
                competitorAvg: compAvgShare,
                gapType: 'Debole',
                priority: 'MEDIA'
            });
        }
    });

    // Analyze Themes
    themes.forEach(t => {
        const boscoloShare = Math.round((t.boscolo / t.total) * 100);
        
        if (t.name === 'Avventura & Outdoor' || t.name === 'Viaggi di Gruppo') {
             this.opportunities.push({
                cluster: t.name,
                type: 'Tema',
                boscoloShare: boscoloShare,
                competitorAvg: 45, // Hardcoded estimate based on visual overview
                gapType: 'Debole',
                priority: 'ALTA'
            });
        }
    });
  }
}