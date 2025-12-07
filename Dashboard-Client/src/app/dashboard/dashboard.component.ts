import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  template: `
<h3>Dashboard</h3>

<div class="row">
  <div class="col-md-3" *ngFor="let tile of tiles">
    <div class="card mb-3">
      <div class="card-body">
        <h5>{{ tile.name }}</h5>
        <h2>{{ tile.value }}</h2>
      </div>
    </div>
  </div>
</div>

<h4 class="mt-4">Products</h4>
<ul class="list-group">
  <li class="list-group-item" *ngFor="let p of products">
    {{ p.name }} — {{ p.price }}
  </li>
</ul>
`
})
export class DashboardComponent implements OnInit {

  tiles: any[] = [];
  products: any[] = [];

  constructor(private ds: DashboardService) {}

  ngOnInit(): void {
    this.ds.getTiles().subscribe(i => this.tiles = i.tiles || []);
    this.ds.getProducts().subscribe(p => this.products = p as any[]);
  }
}
