import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-post-card',
  templateUrl:'./posts-card.component.html'
})
export class PostCardComponent {

  @Input() post!: Post;
  @Output() deleted = new EventEmitter<string>();

  showDeleteModal = false;

  constructor(
    private postsService: PostsService,
    private toast: ToastService
  ) {}

  get wasEdited(): boolean {
    if (!this.post?.updatedAt || !this.post?.createdAt) return false;

    return new Date(this.post.updatedAt).getTime() >
           new Date(this.post.createdAt).getTime();
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  onDeleteConfirmed(): void {
  this.postsService.delete(this.post._id).subscribe({
    next: () => {
      this.toast.show('Registro eliminado exitosamente', 'success');
      this.deleted.emit(this.post._id);
    },
    error: () => {
      this.toast.show('Error al eliminar el registro', 'error');
    }
  });
  }

}
