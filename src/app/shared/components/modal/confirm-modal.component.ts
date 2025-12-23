import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        (click)="cancel.emit()"
      ></div>

      <!-- Modal -->
      <div
        class="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-scale-in"
      >
        <h2 class="text-lg font-semibold text-gray-800">
          {{ title }}
        </h2>

        <p class="text-sm text-gray-600 mt-2">
          {{ message }}
        </p>

        <div class="flex justify-end gap-3 mt-6">
          <button
            class="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
            (click)="cancel.emit()"
          >
            {{ cancelText }}
          </button>

          <button
            class="px-4 py-2 text-sm rounded-lg text-white"
            [ngClass]="danger ? dangerClass : confirmClass"
            (click)="confirm.emit()"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .animate-scale-in {
      animation: scale-in 0.2s ease-out;
    }
  `]
})
export class ConfirmModalComponent {
  @Input() title = 'Confirmación';
  @Input() message = '¿Estás seguro?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';

  @Input() danger = false;

  @Input() confirmClass = 'bg-blue-600 hover:bg-blue-700';
  @Input() dangerClass = 'bg-red-600 hover:bg-red-700';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
