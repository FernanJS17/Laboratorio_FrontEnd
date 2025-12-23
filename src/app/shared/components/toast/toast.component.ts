import { Component } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div
      *ngIf="toast.message()"
      class="fixed top-4 right-4 z-50 animate-toast-in"
    >
      <div
        class="flex items-start gap-3 px-4 py-3 min-w-[280px]
               rounded-xl border shadow-lg"
        [ngClass]="containerClass()"
      >

        <!-- ICON -->
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full"
          [ngClass]="iconClass()"
        >
          {{ icon() }}
        </div>

        <!-- TEXT -->
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-800">
            {{ toast.message() }}
          </p>
        </div>

        <!-- CLOSE -->
        <button
          class="text-gray-400 hover:text-gray-600"
          (click)="toast.clear()"
        >
          ✕
        </button>

      </div>
    </div>
  `,
  styles: [`
    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translateY(-10px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .animate-toast-in {
      animation: toast-in 0.25s ease-out;
    }
  `]
})
export class ToastComponent {

  constructor(public toast: ToastService) {}

  containerClass(): string {
    switch (this.toast.type()) {
      case 'success':
        return 'bg-white border-green-200';
      case 'error':
        return 'bg-white border-red-200';
      default:
        return 'bg-white border-gray-200';
    }
  }

  iconClass(): string {
    switch (this.toast.type()) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'error':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  }

  icon(): string {
    switch (this.toast.type()) {
      case 'success':
        return '✓';
      case 'error':
        return '⚠';
      default:
        return 'ℹ';
    }
  }
}
