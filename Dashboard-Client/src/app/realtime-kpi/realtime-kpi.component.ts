import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-kpi',
  templateUrl: './realtime-kpi.component.html',
  styleUrls: ['./realtime-kpi.component.css']
})
export class RealtimeKpiComponent implements OnInit {

  @Input() label = '';
  @Input() value = 0;
  @Input() refreshRate = 5000; // every 5 seconds

  ngOnInit() {
    setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10 - 5);
    }, this.refreshRate);
  }
}
