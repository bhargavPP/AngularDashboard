import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-widget',
  templateUrl: './timeline-widget.component.html',
  styleUrls: ['./timeline-widget.component.css']
})
export class TimelineWidgetComponent {
  @Input() events: { time: string, desc: string }[] = [];
}
