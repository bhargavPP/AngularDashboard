import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TenantService } from '../core/tenant.service';

@Component({
  selector: 'app-login',
  template: `
<div class="container mt-5">
  <div class="card mx-auto" style="max-width:420px">
    <div class="card-body">
      <h4 class="mb-3">Tenant Login</h4>

      <label>Select Tenant</label>
      <select class="form-select mb-3" [(ngModel)]="tenant">
        <option value="tenant1">Tenant One</option>
        <option value="tenant2">Tenant Two</option>
      </select>

      <button class="btn btn-primary w-100" (click)="login()">Login</button>
    </div>
  </div>
</div>
`
})
export class LoginComponent {

  tenant = 'tenant1';

  constructor(private tenantSvc: TenantService, private auth: AuthService) {}

  login() {
    this.tenantSvc.setTenant(this.tenant);
    this.auth.login();
  }
}
