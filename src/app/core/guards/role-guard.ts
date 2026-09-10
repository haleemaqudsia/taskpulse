import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Blocks a route unless the logged-in user's role is in the route's
// allowed list (set via route data, see app.routes.ts next step).
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!allowedRoles || authService.hasRole(...allowedRoles)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};