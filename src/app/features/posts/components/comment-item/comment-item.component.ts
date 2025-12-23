import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../models/comments.model';

@Component({
  selector: 'app-comment-item',
  templateUrl:'./comment-item.component.html'
})
export class CommentItemComponent {

  @Input() comment!: Comment;
  @Output() deleted = new EventEmitter<string>();

  showDeleteModal = false;

  openModal(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    this.deleted.emit(this.comment._id);
    this.showDeleteModal = false;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }
}
