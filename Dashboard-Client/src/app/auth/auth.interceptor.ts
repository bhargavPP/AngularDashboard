// src/app/auth/auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { TenantService } from '../core/tenant.service';
import { isDevAuth } from '../core/auth-mode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private oauth = inject(OAuthService);      // FIX: no constructor injection
  private tenant = inject(TenantService);    // FIX: inject() avoids circular DI

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers
      .set('X-Tenant-ID', this.tenant.getTenant() || '');

   const token = isDevAuth()
  ? localStorage.getItem('access_token')
  : this.oauth.getAccessToken();


    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const cloned = req.clone({ headers });
    return next.handle(cloned);
  }
}
