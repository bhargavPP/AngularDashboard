import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { isDevAuth } from './auth-mode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private fakeToken = 'local-dev-token'; // used only in dev mode

  constructor(private oauth: OAuthService) {}

  init(): void {
    if (isDevAuth()) {
      console.warn('⚠ Development auth active — skipping OIDC.');
      return;
    }

    const config: AuthConfig = {
      issuer: environment.oidc.issuer,
      redirectUri: window.location.origin + '/auth-callback',
      clientId: environment.oidc.clientId,
      responseType: 'code',
      scope: 'openid profile email'
    };

    this.oauth.configure(config);
    this.oauth.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    if (isDevAuth()) {
      console.warn('⚠ Dev mode login — issuing fake token.');
      localStorage.setItem('access_token', this.fakeToken);
      window.location.href = '/';
      return;
    }

    this.oauth.initLoginFlow();
  }

  logout() {
    if (isDevAuth()) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
      return;
    }

    this.oauth.logOut();
  }

  isLoggedIn(): boolean {
    if (isDevAuth()) {
      return !!localStorage.getItem('access_token');
    }

    return this.oauth.hasValidAccessToken();
  }

  getAccessToken(): string {
    if (isDevAuth()) {
      return localStorage.getItem('access_token') ?? '';
    }

    return this.oauth.getAccessToken() ?? '';
  }
}
