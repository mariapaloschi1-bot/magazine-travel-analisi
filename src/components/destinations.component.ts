import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ClusterStat, Article } from '../services/data.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-[#1F2A44]">Clustering Destinazioni</h2>
        
        <!-- Explanatory Text -->
        <div class="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-[#1F2A44] leading-relaxed">
            <p><strong>Come leggere questa tabella:</strong> Questa vista aggrega l'intero corpus editoriale suddiviso per macro-regioni geografiche.</p>
            <p>Le percentuali (%) indicano la "Quota di Scaffale" (Share of Shelf) digitale: quanto spazio occupa ogni brand rispetto al totale degli articoli pubblicati su quella specifica destinazione.</p>
            <p>Espandendo le righe, puoi accedere a un <strong>campionario qualitativo</strong> degli articoli (Titoli e H1) per analizzare il "Tone of Voice" e gli angoli editoriali utilizzati dai competitor.</p>
            <p>Un alto numero di articoli non significa necessariamente alto traffico, ma indica un investimento strategico sulla destinazione.</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left min-w-[700px]">
            <thead class="bg-gray-50 text-gray-600 font-semibold border-b">
              <tr>
                <th class="px-6 py-3">Cluster Geografico</th>
                <th class="px-6 py-3 text-center text-[#1F2A44]">Boscolo</th>
                <th class="px-6 py-3 text-center text-[#F4A261]">WeRoad</th>
                <th class="px-6 py-3 text-center text-[#2FA4A9]">Si Vola</th>
                <th class="px-6 py-3 text-right">Totale</th>
                <th class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (row of sortedDestinations; track row.name) {
                <tr class="hover:bg-gray-50 transition-colors cursor-pointer group" (click)="toggleExpand(row.name)">
                  <td class="px-6 py-4 font-medium text-[#1F2A44]">{{ row.name }}</td>
                  
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <span class="font-bold">{{ row.boscolo }}</span>
                      <span class="text-xs text-gray-400">({{ getShare(row.boscolo, row.total) }}%)</span>
                    </div>
                    <div class="h-1 w-full bg-gray-100 rounded mt-1">
                      <div class="h-1 bg-[#1F2A44] rounded" [style.width.%]="getShare(row.boscolo, row.total)"></div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <span class="font-bold">{{ row.weroad }}</span>
                      <span class="text-xs text-gray-400">({{ getShare(row.weroad, row.total) }}%)</span>
                    </div>
                    <div class="h-1 w-full bg-gray-100 rounded mt-1">
                      <div class="h-1 bg-[#F4A261] rounded" [style.width.%]="getShare(row.weroad, row.total)"></div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <span class="font-bold">{{ row.sivola }}</span>
                      <span class="text-xs text-gray-400">({{ getShare(row.sivola, row.total) }}%)</span>
                    </div>
                    <div class="h-1 w-full bg-gray-100 rounded mt-1">
                      <div class="h-1 bg-[#2FA4A9] rounded" [style.width.%]="getShare(row.sivola, row.total)"></div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-right font-bold">{{ row.total }}</td>
                  <td class="px-6 py-4 text-right text-gray-400 group-hover:text-[#2FA4A9]">
                    {{ expandedRow() === row.name ? '▲' : '▼' }}
                  </td>
                </tr>

                <!-- Expanded Row Drill Down -->
                @if (expandedRow() === row.name) {
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <td colspan="6" class="px-6 py-4">
                      <div class="mb-2 font-semibold text-xs uppercase tracking-wide text-gray-500">
                        Campionario Articoli (Drill-down)
                      </div>
                      <div class="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        @for (art of getArticlesForCluster(row.name); track art.title) {
                          <div class="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                            <div class="flex items-center gap-3">
                              <span class="px-2 py-1 text-[10px] font-bold rounded text-white min-w-[70px] text-center"
                                    [ngClass]="{
                                      'bg-[#1F2A44]': art.magazine === 'Boscolo',
                                      'bg-[#F4A261]': art.magazine === 'WeRoad',
                                      'bg-[#2FA4A9]': art.magazine === 'Si Vola'
                                    }">
                                {{ art.magazine }}
                              </span>
                              <div>
                                <div class="font-medium text-sm text-[#1F2A44]">{{ art.title }}</div>
                                <div class="text-xs text-gray-500">H1: {{ art.h1 }}</div>
                              </div>
                            </div>
                            <a [href]="art.url" target="_blank" class="text-blue-500 hover:text-blue-700 text-lg px-2">
                              ↗
                            </a>
                          </div>
                        }
                        @if (getArticlesForCluster(row.name).length === 0) {
                          <div class="text-xs text-gray-400 italic text-center py-4">Nessun articolo di esempio disponibile in questo dataset campione.</div>
                        }
                      </div>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DestinationsComponent {
  data = inject(DataService);
  expandedRow = signal<string | null>(null);

  get sortedDestinations() {
    return this.data.destStatsSignal().sort((a, b) => b.total - a.total);
  }

  getShare(val: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((val / total) * 100);
  }

  toggleExpand(name: string) {
    if (this.expandedRow() === name) {
      this.expandedRow.set(null);
    } else {
      this.expandedRow.set(name);
    }
  }

  getArticlesForCluster(clusterName: string): Article[] {
    return this.data.articlesSignal().filter(a => a.clusterDest === clusterName);
  }
}