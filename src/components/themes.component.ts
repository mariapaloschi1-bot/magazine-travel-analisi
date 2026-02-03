import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Article } from '../services/data.service';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-[#1F2A44]">Clustering Tematiche</h2>
        
         <!-- Explanatory Text -->
        <div class="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-[#1F2A44] leading-relaxed">
            <p><strong>Analisi Semantica e di Intento:</strong> Qui i contenuti non sono divisi per "dove", ma per "cosa" (l'argomento o l'angolo del contenuto).</p>
            <p>Le percentuali mostrano la specializzazione tematica. Ad esempio, "Guide Destinazioni" è tipicamente un contenuto SEO-oriented (Cosa vedere a...), mentre "Viaggi di Gruppo" è bottom-funnel (prodotto).</p>
            <p>Espandendo i cluster, puoi vedere come i titoli variano: WeRoad punta molto su liste e consigli pratici, Si Vola su eventi e natura, Boscolo su cultura e approfondimento.</p>
            <p>Questa vista aiuta a capire se stiamo presidiando gli intenti di ricerca corretti per il nostro target.</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left min-w-[700px]">
            <thead class="bg-gray-50 text-gray-600 font-semibold border-b">
              <tr>
                <th class="px-6 py-3">Cluster Tematico</th>
                <th class="px-6 py-3 text-center text-[#1F2A44]">Boscolo</th>
                <th class="px-6 py-3 text-center text-[#F4A261]">WeRoad</th>
                <th class="px-6 py-3 text-center text-[#2FA4A9]">Si Vola</th>
                <th class="px-6 py-3 text-right">Totale</th>
                <th class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (row of sortedThemes; track row.name) {
                <tr class="hover:bg-gray-50 transition-colors cursor-pointer group" (click)="toggleExpand(row.name)">
                  <td class="px-6 py-4 font-medium text-[#1F2A44]">{{ row.name }}</td>
                  
                  <td class="px-6 py-4 text-center">
                    <span class="block font-bold">{{ row.boscolo }}</span>
                    <div class="h-1.5 w-full bg-gray-100 rounded mt-1 relative">
                      <div class="absolute top-0 left-0 h-full bg-[#1F2A44] rounded" [style.width.%]="getShare(row.boscolo, row.total)"></div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-center">
                    <span class="block font-bold">{{ row.weroad }}</span>
                    <div class="h-1.5 w-full bg-gray-100 rounded mt-1 relative">
                      <div class="absolute top-0 left-0 h-full bg-[#F4A261] rounded" [style.width.%]="getShare(row.weroad, row.total)"></div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-center">
                    <span class="block font-bold">{{ row.sivola }}</span>
                    <div class="h-1.5 w-full bg-gray-100 rounded mt-1 relative">
                      <div class="absolute top-0 left-0 h-full bg-[#2FA4A9] rounded" [style.width.%]="getShare(row.sivola, row.total)"></div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-right font-bold text-lg">{{ row.total }}</td>
                  <td class="px-6 py-4 text-right text-gray-400 group-hover:text-[#2FA4A9]">
                    {{ expandedRow() === row.name ? '▲' : '▼' }}
                  </td>
                </tr>

                <!-- Drill Down -->
                @if (expandedRow() === row.name) {
                  <tr class="bg-gray-50 border-b border-gray-200 animate-fade-in">
                    <td colspan="6" class="px-6 py-4">
                      <div class="mb-3 flex items-center gap-2">
                          <span class="text-xs font-bold uppercase text-gray-500">Analisi Rapida:</span>
                          <p class="text-xs text-gray-600 italic">
                              @if (row.boscolo > row.weroad && row.boscolo > row.sivola) {
                                  Boscolo è leader in questa tematica.
                              } @else if (row.weroad > row.boscolo * 3) {
                                  Dominio netto di WeRoad. Boscolo ha un gap significativo.
                              } @else {
                                  Competizione accesa, Si Vola mostra forte crescita.
                              }
                          </p>
                      </div>
                      <div class="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        @for (art of getArticlesForTheme(row.name); track art.title) {
                          <div class="flex items-center justify-between bg-white p-3 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                            <a [href]="art.url" target="_blank" class="text-gray-400 hover:text-[#2FA4A9]">
                              🔗
                            </a>
                          </div>
                        }
                        @if (getArticlesForTheme(row.name).length === 0) {
                          <div class="text-xs text-gray-400 italic p-2">Nessun articolo di esempio nel dataset ridotto.</div>
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
export class ThemesComponent {
  data = inject(DataService);
  expandedRow = signal<string | null>(null);

  get sortedThemes() {
    return this.data.themeStatsSignal().sort((a, b) => b.total - a.total);
  }

  getShare(val: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((val / total) * 100);
  }

  toggleExpand(name: string) {
    this.expandedRow.set(this.expandedRow() === name ? null : name);
  }

  getArticlesForTheme(themeName: string): Article[] {
    return this.data.articlesSignal().filter(a => a.clusterTheme === themeName);
  }
}