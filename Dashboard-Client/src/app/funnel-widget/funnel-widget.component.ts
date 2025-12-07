import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-funnel-widget',
  templateUrl: './funnel-widget.component.html',
  styleUrls: ['./funnel-widget.component.css']
})
export class FunnelWidgetComponent {
  @Input() steps = [
    { label: 'Visitors', value: 0 },
    { label: 'Signups', value: 0 },
    { label: 'Active Users', value: 0 }
  ];

  get conversionRate() {
    if (this.steps.length < 2) return 0;
    return (this.steps[this.steps.length - 1].value / this.steps[0].value) * 100;
  }
}
