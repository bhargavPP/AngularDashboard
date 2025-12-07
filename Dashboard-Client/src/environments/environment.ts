export const environment = {
  production: false,
  devBypassAuth: true,
  apiUrl: 'https://localhost:7243/api',       // your API base
  signalRUrl: 'https://localhost:7243/hubs/notifications',
  // OIDC / OAuth2 config - replace placeholders with your IdP settings
  oidc: {
    clientId: 'YOUR_CLIENT_ID',
    issuer: 'https://your-idp.example.com',
    redirectUri: window.location.origin + '/auth-callback',
    scope: 'openid profile email offline_access', // include roles if needed
    responseType: 'code'
  }
};
