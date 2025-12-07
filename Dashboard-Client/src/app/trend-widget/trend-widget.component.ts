import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trend-widget',
  templateUrl: './trend-widget.component.html',
  styleUrls: ['./trend-widget.component.css']
})
export class TrendWidgetComponent {
  @Input() title = '';
  @Input() current = 0;
  @Input() previous = 0;

  get growth(): number {
    if (!this.previous) return 0;
    return ((this.current - this.previous) / this.previous) * 100;
  }

  get growthText() {
    return this.growth >= 0 ? 'Increase' : 'Decrease';
  }

  get growthClass() {
    return this.growth >= 0 ? 'text-success' : 'text-danger';
  }
}
