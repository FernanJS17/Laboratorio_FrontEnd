import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-post-card',
  template: `
    <div class="bg-white p-4 rounded-xl shadow">
      <h2 class="text-lg font-semibold">{{ post.title }}</h2>

      <p class="text-sm text-gray-500">
        {{ post.author }} · {{ post.createdAt | formatDate }}
      </p>

      <p class="mt-2 text-gray-700">
        {{ post.body | truncate:120 }}
      </p>

      <div class="flex gap-2 mt-4">
        <app-button [routerLink]="['/posts', post._id]">Ver</app-button>
        <app-button
          variant="secondary"
          [routerLink]="['/posts', post._id, 'edit']"
        >
          Editar
        </app-button>

        <app-button
          variant="danger"
          (click)="onDelete()"
        >
          Eliminar
        </app-button>
      </div>
    </div>
  `
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() delete = new EventEmitter<string>();

  onDelete(): void {
    if (!confirm('¿Eliminar este post?')) return;
    this.delete.emit(this.post._id);
  }
}
