import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';

// This is your Angular app's equivalent of Program.cs - it's where every
// piece we've built (routing, the HTTP interceptor) actually gets
// switched on. Without this file wired correctly, your routes and
// interceptor exist as code but are never actually used.
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};