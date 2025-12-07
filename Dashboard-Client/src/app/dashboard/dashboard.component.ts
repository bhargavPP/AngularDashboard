import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ThemeService } from '../core/theme.service';
import { Subscription } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  private revenueChart?: Chart;
  private salesChart?: Chart;
  private donutChart?: Chart;
  private sub?: Subscription;

  constructor(private theme: ThemeService) { }

  ngAfterViewInit() {
    this.createCharts();
    this.sub = this.theme.theme$.subscribe(() => this.updateChartsTheme());
  }

  private createCharts() {
    this.revenueChart = new Chart('revenueChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{ label: 'Revenue', data: [12000, 15000, 11000, 18000], borderColor: getComputedStyle(document.body).getPropertyValue('--primary').trim(), backgroundColor: 'rgba(0,0,0,0.0)' }]
      },
      options: { plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text').trim() } } }, scales: { x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--muted').trim() } }, y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--muted').trim() } } } }
    });

    this.salesChart = new Chart('salesBarChart', {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{ data: [50, 75, 100, 60], backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#dc3545'] }]
      },
      options: { plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text').trim() } } } }
    });

    this.donutChart = new Chart('categoryDonutChart', {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Clothing', 'Furniture'],
        datasets: [{ data: [45, 30, 25], backgroundColor: ['#6610f2', '#20c997', '#fd7e14'] }]
      },
      options: { plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text').trim() } } } }
    });
  }

  private updateChartsTheme() {
    const text = getComputedStyle(document.body).getPropertyValue('--text').trim();
    const muted = getComputedStyle(document.body).getPropertyValue('--muted').trim();
    const primary = getComputedStyle(document.body).getPropertyValue('--primary').trim();

    if (this.revenueChart) {
      this.revenueChart.options!.plugins = { legend: { labels: { color: text } } } as any;
      this.revenueChart.data!.datasets[0].borderColor = primary;
      // update axis tick colors
      (this.revenueChart.options!.scales as any).x.ticks.color = muted;
      (this.revenueChart.options!.scales as any).y.ticks.color = muted;
      this.revenueChart.update();
    }

    if (this.salesChart) {
      (this.salesChart.options!.plugins as any).legend.labels.color = text;
      this.salesChart.update();
    }

    if (this.donutChart) {
      (this.donutChart.options!.plugins as any).legend.labels.color = text;
      this.donutChart.update();
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.revenueChart?.destroy();
    this.salesChart?.destroy();
    this.donutChart?.destroy();
  }
}
