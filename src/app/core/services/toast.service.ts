import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message = signal<string | null>(null);

  show(msg: string): void {
    this.message.set(msg);
    setTimeout(() => this.message.set(null), 2500);
  }
}
