import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private tokenService: TokenService) {}

  login(_: any): Observable<void> {
    this.tokenService.set('fake-jwt-token');
    return of(void 0);
  }

  logout(): void {
    this.tokenService.clear();
  }

  getToken(): string | null {
    return this.tokenService.get();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
