import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-skeleton',
  template: `
    <div class="space-y-4 animate-pulse">
      <div
        *ngFor="let i of items"
        class="flex gap-3 bg-white rounded-lg p-3 border"
      >
        <!-- Avatar -->
        <div class="w-9 h-9 rounded-full bg-gray-300"></div>

        <!-- Content -->
        <div class="flex-1 space-y-2">
          <div class="h-3 w-32 bg-gray-300 rounded"></div>
          <div class="h-3 w-full bg-gray-200 rounded"></div>
          <div class="h-3 w-5/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  `
})
export class CommentSkeletonComponent {
  @Input() count = 3;

  get items() {
    return Array(this.count);
  }
}
