import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TenantService } from '../core/tenant.service';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  constructor(public tenant: TenantService, public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
