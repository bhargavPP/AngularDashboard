import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-performers',
  templateUrl: './top-performers.component.html',
  styleUrls: ['./top-performers.component.css']
})
export class TopPerformersComponent {
  @Input() items: any[] = [];
}
