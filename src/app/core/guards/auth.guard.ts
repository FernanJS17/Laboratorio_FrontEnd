import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isAuthenticated = tokenService.hasToken();

  // 🔹 Si intenta entrar a login estando autenticado → posts
  if (state.url === '/login' && isAuthenticated) {
    router.navigate(['/posts']);
    return false;
  }

  // 🔹 Si NO está autenticado y NO es login → login
  if (!isAuthenticated && state.url !== '/login') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
