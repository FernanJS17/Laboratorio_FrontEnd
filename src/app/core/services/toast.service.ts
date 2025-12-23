import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message = signal<string | null>(null);
  type = signal<ToastType>('info');

  private timeoutId: any;

  show(message: string, type: ToastType = 'info', duration = 3000): void {
    this.clear(); // limpia cualquier toast previo

    this.message.set(message);
    this.type.set(type);

    this.timeoutId = setTimeout(() => {
      this.clear();
    }, duration);
  }

  clear(): void {
    this.message.set(null);
    this.type.set('info');

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
