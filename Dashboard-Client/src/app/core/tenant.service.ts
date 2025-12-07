import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private tenantId: string | null = null;

  setTenant(id: string) { this.tenantId = id; }
  getTenant(): string | null { return this.tenantId; }
}
