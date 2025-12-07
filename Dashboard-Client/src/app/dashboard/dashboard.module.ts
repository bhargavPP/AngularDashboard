import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';

// Advanced analytics widgets
import { TrendWidgetComponent } from '../trend-widget/trend-widget.component';
import { FunnelWidgetComponent } from '../funnel-widget/funnel-widget.component';
import { RealtimeKpiComponent } from '../realtime-kpi/realtime-kpi.component';
import { TopPerformersComponent } from '../top-performers/top-performers.component';
import { TimelineWidgetComponent } from '../timeline-widget/timeline-widget.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TrendWidgetComponent,
    FunnelWidgetComponent,
    RealtimeKpiComponent,
    TopPerformersComponent,
    TimelineWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
