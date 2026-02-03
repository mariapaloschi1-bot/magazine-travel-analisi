import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-end">
        <div>
          <h2 class="text-2xl font-bold text-[#1F2A44]">Overview Competitivo</h2>
          <p class="text-sm text-gray-500 mt-1">Market Share Editoriale: quote di presidio per volume di articoli.</p>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Boscolo Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#1F2A44]"></div>
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Boscolo</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-[#1F2A44]">{{ data.overviewSignal().Boscolo.total }}</span>
            <span class="text-sm text-gray-400">articoli</span>
          </div>
          <div class="mt-4 text-xs text-gray-500">
            <div class="flex justify-between mb-1">
              <span>Destinazioni coperte</span>
              <span class="font-medium">{{ data.overviewSignal().Boscolo.coveredDest }}</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5">
              <div class="bg-[#1F2A44] h-1.5 rounded-full" style="width: 85.9%"></div>
            </div>
          </div>
        </div>

        <!-- WeRoad Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#F4A261]"></div>
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">WeRoad</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-[#1F2A44]">{{ data.overviewSignal().WeRoad.total }}</span>
            <span class="text-sm text-gray-400">articoli</span>
          </div>
          <div class="mt-4 text-xs text-gray-500">
            <div class="flex justify-between mb-1">
              <span>Leader per Volume</span>
              <span class="font-medium text-[#F4A261]">Dominante</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5">
              <div class="bg-[#F4A261] h-1.5 rounded-full" style="width: 100%"></div>
            </div>
          </div>
        </div>

        <!-- Si Vola Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2FA4A9]"></div>
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Si Vola</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-[#1F2A44]">{{ data.overviewSignal().SiVola.total }}</span>
            <span class="text-sm text-gray-400">articoli</span>
          </div>
          <div class="mt-4 text-xs text-gray-500">
            <div class="flex justify-between mb-1">
              <span>Tematiche coperte</span>
              <span class="font-medium">{{ data.overviewSignal().SiVola.coveredTheme }}</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5">
              <div class="bg-[#2FA4A9] h-1.5 rounded-full" style="width: 96.8%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Chart: Distribution -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-[#1F2A44] mb-6">Quota di Presidio Totale (Share of Voice)</h3>
        
        <div class="flex h-12 w-full rounded-md overflow-hidden mb-4">
          <div class="bg-[#1F2A44] flex items-center justify-center text-white text-xs font-bold" 
               [style.width.%]="(284/1610)*100">Boscolo 17%</div>
          <div class="bg-[#F4A261] flex items-center justify-center text-white text-xs font-bold" 
               [style.width.%]="(768/1610)*100">WeRoad 48%</div>
          <div class="bg-[#2FA4A9] flex items-center justify-center text-white text-xs font-bold" 
               [style.width.%]="(558/1610)*100">Si Vola 35%</div>
        </div>
      </div>

      <!-- Secondary Chart: Top Destinations Coverage -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 class="font-semibold text-[#1F2A44] mb-4">Top 10 Destinazioni (Volume)</h3>
          <div class="space-y-4">
            @for (dest of topDestinations; track dest.name) {
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-medium">{{dest.name}}</span>
                  <span class="text-gray-400">{{dest.total}} art.</span>
                </div>
                <div class="flex h-3 rounded-full overflow-visible bg-gray-100 relative">
                  <!-- Boscolo Segment -->
                  <div class="bg-[#1F2A44] h-3 rounded-l-full relative group cursor-pointer" [style.width.%]="(dest.boscolo / dest.total) * 100">
                     <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#1F2A44] text-white text-[10px] p-2 rounded shadow-xl z-20 whitespace-nowrap">
                        <strong>Boscolo:</strong> {{dest.boscolo}} articoli ({{ getPct(dest.boscolo, dest.total) }}%)
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1F2A44]"></div>
                     </div>
                  </div>
                  <!-- WeRoad Segment -->
                  <div class="bg-[#F4A261] h-3 relative group cursor-pointer" [style.width.%]="(dest.weroad / dest.total) * 100">
                     <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#F4A261] text-white text-[10px] p-2 rounded shadow-xl z-20 whitespace-nowrap">
                        <strong>WeRoad:</strong> {{dest.weroad}} articoli ({{ getPct(dest.weroad, dest.total) }}%)
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#F4A261]"></div>
                     </div>
                  </div>
                  <!-- SiVola Segment -->
                  <div class="bg-[#2FA4A9] h-3 rounded-r-full relative group cursor-pointer" [style.width.%]="(dest.sivola / dest.total) * 100">
                     <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#2FA4A9] text-white text-[10px] p-2 rounded shadow-xl z-20 whitespace-nowrap">
                        <strong>Si Vola:</strong> {{dest.sivola}} articoli ({{ getPct(dest.sivola, dest.total) }}%)
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2FA4A9]"></div>
                     </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 class="font-semibold text-[#1F2A44] mb-4">Top 10 Tematiche</h3>
          <div class="space-y-4">
            @for (theme of topThemes; track theme.name) {
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-medium">{{theme.name}}</span>
                  <span class="text-gray-400">{{theme.total}} art.</span>
                </div>
                <div class="flex h-3 rounded-full overflow-visible bg-gray-100 relative">
                  <!-- Boscolo -->
                  <div class="bg-[#1F2A44] h-3 rounded-l-full relative group cursor-pointer" [style.width.%]="(theme.boscolo / theme.total) * 100">
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#1F2A44] text-white text-[10px] p-2 rounded shadow-xl z-20 whitespace-nowrap">
                        <strong>Boscolo:</strong> {{theme.boscolo}} articoli ({{ getPct(theme.boscolo, theme.total) }}%)
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1F2A44]"></div>
                     </div>
                  </div>
                  <!-- WeRoad -->
                  <div class="bg-[#F4A261] h-3 relative group cursor-pointer" [style.width.%]="(theme.weroad / theme.total) * 100">
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#F4A261] text-white text-[10px] p-2 rounded shadow-xl z-20 whitespace-nowrap">
                        <strong>WeRoad:</strong> {{theme.weroad}} articoli ({{ getPct(theme.weroad, theme.total) }}%)
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#F4A261]"></div>
                     </div>
                  </div>
                  <!-- SiVola -->
                  <div class="bg-[#2FA4A9] h-3 rounded-r-full relative group cursor-pointer" [style.width.%]="(theme.sivola / theme.total) * 100">
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#2FA4A9] text-white text-[10px] p-2 rounded shadow-xl z-20 whitespace-nowrap">
                        <strong>Si Vola:</strong> {{theme.sivola}} articoli ({{ getPct(theme.sivola, theme.total) }}%)
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2FA4A9]"></div>
                     </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Insights Box -->
      <div class="bg-[#F3F4F6] border-l-4 border-[#1F2A44] p-6 rounded-r-lg shadow-inner">
         <h3 class="font-bold text-[#1F2A44] text-lg mb-4 flex items-center gap-2">
            <span class="text-2xl">💡</span> Key Insights dai Dati
         </h3>
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded shadow-sm">
                <div class="text-[#F4A261] font-bold text-xs uppercase mb-1">Volume Leader</div>
                <p class="text-sm text-gray-600">WeRoad presidia massivamente gli <strong>USA Ovest (208 art.)</strong>, doppiando Boscolo. È un muro di contenuti difficile da scalfire frontalmente.</p>
            </div>
            <div class="bg-white p-4 rounded shadow-sm">
                <div class="text-[#2FA4A9] font-bold text-xs uppercase mb-1">Crescita Si Vola</div>
                <p class="text-sm text-gray-600">Si Vola sta investendo pesantemente sull'<strong>Avventura & Outdoor (182 art.)</strong>, superando anche WeRoad in questa nicchia specifica.</p>
            </div>
            <div class="bg-white p-4 rounded shadow-sm">
                <div class="text-[#1F2A44] font-bold text-xs uppercase mb-1">Qualità Boscolo</div>
                <p class="text-sm text-gray-600">Nonostante i volumi inferiori, Boscolo mantiene una quota dignitosa in <strong>Italia (45 art.)</strong>, superiore a entrambi i competitor.</p>
            </div>
             <div class="bg-white p-4 rounded shadow-sm">
                <div class="text-red-500 font-bold text-xs uppercase mb-1">Area Critica</div>
                <p class="text-sm text-gray-600">Totale assenza Boscolo in <strong>Africa Sub-Sahariana (0 art.)</strong>, mentre i competitor ne hanno quasi 100 in totale. Perdita di traffico rilevante.</p>
            </div>
         </div>
      </div>

    </div>
  `
})
export class OverviewComponent {
  data = inject(DataService);

  get topDestinations() {
    return this.data.destStatsSignal().sort((a,b) => b.total - a.total).slice(0, 10);
  }

  get topThemes() {
    return this.data.themeStatsSignal().sort((a,b) => b.total - a.total).slice(0, 10);
  }

  getPct(val: number, total: number): string {
    if(!total) return '0';
    return ((val/total)*100).toFixed(1);
  }
}