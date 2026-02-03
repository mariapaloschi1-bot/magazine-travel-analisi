import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview.component';
import { DestinationsComponent } from './components/destinations.component';
import { ThemesComponent } from './components/themes.component';
import { DualClusterComponent } from './components/dual-cluster.component';
import { IdeasComponent } from './components/ideas.component';
import { GapAnalysisComponent } from './components/gap-analysis.component';
import { ContentDepthComponent } from './components/content-depth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    OverviewComponent, 
    DestinationsComponent, 
    ThemesComponent, 
    DualClusterComponent, 
    ContentDepthComponent,
    IdeasComponent, 
    GapAnalysisComponent
  ],
  template: `
    <div class="min-h-screen bg-[#F9FAFB] font-sans text-[#1C1C1C] flex flex-col">
      <!-- Header -->
      <header class="bg-[#1F2A44] text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-[#F4A261] rounded flex items-center justify-center font-bold text-[#1F2A44]">E</div>
            <h1 class="text-xl font-bold tracking-tight">Editorial Intelligence Dashboard</h1>
          </div>
          <div class="text-xs text-gray-300 hidden sm:block">
            Data Analysis: Boscolo vs WeRoad vs Si Vola
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="max-w-7xl mx-auto px-6 mt-2 overflow-x-auto custom-scrollbar">
          <div class="flex gap-6 border-b border-gray-700">
            @for (tab of tabs; track tab.id) {
              <button 
                (click)="activeTab.set(tab.id)"
                class="pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap"
                [class.border-[#2FA4A9]]="activeTab() === tab.id"
