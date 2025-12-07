import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TenantService } from '../core/tenant.service';
import { ThemeService,Theme } from '../core/theme.service';
import { Subscription } from "rxjs"; 

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnDestroy{
  theme: Theme;
  private sub: Subscription;
  constructor(public tenant: TenantService, public auth: AuthService, private themeSvc: ThemeService) {
    this.theme = this.themeSvc.current();
    this.sub = this.themeSvc.theme$.subscribe(t => this.theme = t);
  }

  logout() {
    this.auth.logout();
  }
  toggleTheme() {
    this.themeSvc.toggle();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
