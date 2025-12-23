import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comments.model';
import { Post } from '../../models/posts.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail.page.component.html'
})
export class PostDetailPageComponent implements OnInit {

  post!: Post;
  comments: Comment[] = [];
  loadingComments = false;

  showDeleteModal = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id')!;
    this.loadPost(postId);
    this.loadComments(postId);
  }

  private loadPost(id: string): void {
    this.postsService.getById(id).subscribe(post => {
      this.post = post;
    });
  }

  private loadComments(postId: string): void {
    this.commentsService.getByPost(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  onCreateComment(data: any): void {
    this.commentsService.create(data).subscribe(() => {
      this.loadComments(this.post._id);
    });
  }

  onDeleteComment(id: string): void {
    this.commentsService.delete(id).subscribe({
      next: () => {
        this.toast.show('Comentario eliminado', 'success');
        this.loadComments(this.post._id);
      },
      error: () => {
        this.toast.show('No se pudo eliminar el comentario', 'error');
      }
    });
  }

  deletePost(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    this.postsService.delete(this.post._id).subscribe({
      next: () => {
        this.toast.show('Post eliminado correctamente', 'success');
        this.showDeleteModal = false;
        this.goBack();
      },
      error: () => {
        this.toast.show('No se pudo eliminar el post', 'error');
        this.showDeleteModal = false;
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  goBack(): void {
    history.back();
  }

}
