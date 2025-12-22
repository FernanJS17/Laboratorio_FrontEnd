import { Component } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div
      *ngIf="toast.message()"
      class="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded"
    >
      {{ toast.message() }}
    </div>
  `
})
export class ToastComponent {
  constructor(public toast: ToastService) {}
}
