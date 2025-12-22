import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="classes"
      class="px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'danger' | 'secondary' = 'primary';

  get classes(): string {
    switch (this.variant) {
      case 'danger':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'secondary':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      default:
        return 'bg-blue-500 text-white hover:bg-blue-600';
    }
  }
}
