import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewComponent } from './components/overview.component';
import { DestinationsComponent } from './components/destinations.component';
import { ThemesComponent } from './components/themes.component';
import { DualClusterComponent } from './components/dual-cluster.component';
import { IdeasComponent } from './components/ideas.component';
import { GapAnalysisComponent } from './components/gap-analysis.component';
import { ContentDepthComponent } from './components/content-depth.component';

type TabId =
  | 'overview'
  | 'destinations'
  | 'themes'
  | 'dual-cluster'
  | 'content-depth'
  | 'ideas'
  | 'gap-analysis';

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
    GapAnalysisComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  tabs = [
    { id: 'overview' as TabId, label: 'Overview' },
    { id: 'destinations' as TabId, label: 'Destinations' },
    { id: 'themes' as TabId, label: 'Themes' },
    { id: 'dual-cluster' as TabId, label: 'Dual Cluster' },
    { id: 'content-depth' as TabId, label: 'Content Depth' },
    { id: 'ideas' as TabId, label: 'Ideas' },
    { id: 'gap-analysis' as TabId, label: 'Gap Analysis' },
  ];

  activeTab = signal<TabId>('overview');
}
