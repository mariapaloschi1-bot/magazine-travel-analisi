import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-depth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-[#1F2A44]">Content Depth & Format Analysis</h2>
          <p class="text-sm text-gray-500 mt-1">Non solo di cosa parlano, ma come lo fanno.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Metric Card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="text-sm text-gray-500 mb-1">Lunghezza Media (Parole)</div>
            <div class="flex items-end gap-3">
                <span class="text-3xl font-bold text-[#2FA4A9]">1.450</span>
                <span class="text-xs text-green-600 font-medium mb-1">Si Vola (Leader)</span>
            </div>
            <div class="mt-4 text-xs text-gray-400">
                Boscolo avg: ~800 words <br>
                WeRoad avg: ~1.100 words
            </div>
        </div>

        <!-- Metric Card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="text-sm text-gray-500 mb-1">SEO Structure (H2/H3)</div>
            <div class="flex items-end gap-3">
                <span class="text-3xl font-bold text-[#F4A261]">High</span>
                <span class="text-xs text-gray-500 mb-1">WeRoad</span>
            </div>
            <p class="mt-4 text-xs text-gray-500">
                WeRoad utilizza strutture molto frammentate (liste, bullet points) ideali per mobile. Boscolo usa paragrafi più discorsivi.
            </p>
        </div>

        <!-- Metric Card 3 -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="text-sm text-gray-500 mb-1">Format Vincente</div>
            <div class="flex items-end gap-3">
                <span class="text-3xl font-bold text-[#1F2A44]">Liste</span>
            </div>
            <p class="mt-4 text-xs text-gray-500">
                "10 cose da vedere", "7 luoghi imperdibili". Il format lista domina per engagement e SEO su tutti i competitor.
            </p>
        </div>
      </div>

      <!-- Detail Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="font-semibold text-[#1F2A44]">Analisi Qualitativa Campione (Si Vola)</h3>
        </div>
        <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-semibold border-b">
                <tr>
                    <th class="px-6 py-3">Titolo Articolo</th>
                    <th class="px-6 py-3">H1</th>
                    <th class="px-6 py-3 text-right">Word Count</th>
                    <th class="px-6 py-3 text-center">Depth Score</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium">7 mete imperdibili in Spagna</td>
                    <td class="px-6 py-4 text-gray-500 text-xs">7 destinazioni imperdibili...</td>
                    <td class="px-6 py-4 text-right font-mono">1.563</td>
                    <td class="px-6 py-4 text-center"><span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Deep</span></td>
                </tr>
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium">Viaggio di gruppo nella Cuba autentica</td>
                    <td class="px-6 py-4 text-gray-500 text-xs">Volate alla scoperta...</td>
                    <td class="px-6 py-4 text-right font-mono">1.211</td>
                    <td class="px-6 py-4 text-center"><span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Med</span></td>
                </tr>
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium">Toronto Pride e natura canadese</td>
                    <td class="px-6 py-4 text-gray-500 text-xs">Toronto Pride e Canada...</td>
                    <td class="px-6 py-4 text-right font-mono">1.501</td>
                    <td class="px-6 py-4 text-center"><span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Deep</span></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  `
})
export class ContentDepthComponent {}