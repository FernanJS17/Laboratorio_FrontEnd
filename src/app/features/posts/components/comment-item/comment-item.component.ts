import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../models/comments.model';

@Component({
  selector: 'app-comment-item',
  template: `
    <div class="border p-3 rounded flex justify-between">
      <div>
        <p class="font-semibold">{{ comment.name }}</p>
        <p class="text-sm text-gray-500">{{ comment.email }}</p>
        <p>{{ comment.body }}</p>
      </div>

      <button
        class="text-red-500 text-sm"
        (click)="deleted.emit()"
      >
        Eliminar
      </button>
    </div>
  `
})
export class CommentItemComponent {
  @Input() comment!: Comment;
  @Output() deleted = new EventEmitter<void>();
}
