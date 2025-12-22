import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comments.model';
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-post-detail-page',
  template: `
    <div class="p-6" *ngIf="post">
      <h1 class="text-2xl font-bold mb-2">{{ post.title }}</h1>
      <p class="text-gray-500 mb-4">
        {{ post.author }} · {{ post.createdAt | formatDate }}
      </p>

      <p class="mb-6">{{ post.body }}</p>

      <h2 class="text-xl font-semibold mb-2">Comentarios</h2>

      <app-comment-form
        [postId]="post._id"
        (created)="onCreateComment($event)"
      ></app-comment-form>

      <div *ngIf="loadingComments" class="text-gray-500 mt-4">
        Cargando comentarios...
      </div>

      <div *ngIf="!loadingComments && comments.length === 0" class="text-gray-400 mt-4">
        No hay comentarios aún
      </div>

      <div class="space-y-2 mt-4">
        <app-comment-item
          *ngFor="let comment of comments"
          [comment]="comment"
          (deleted)="onDeleteComment(comment._id)"
        ></app-comment-item>
      </div>
    </div>
  `
})
export class PostDetailPageComponent implements OnInit {

  post!: Post;
  comments: Comment[] = [];
  loadingComments = false;


  constructor(
    private route: ActivatedRoute,

    @Inject(PostsService)
    private postsService: PostsService,

    @Inject(CommentsService)
    private commentsService: CommentsService
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
      console.log(comments);
    });
  }

  onCreateComment(data: any): void {
    this.commentsService.create(data).subscribe(() => {
      this.loadComments(this.post._id);
    });
  }

  onDeleteComment(id: string): void {
    if (!confirm('¿Eliminar comentario?')) return;

    this.commentsService.delete(id).subscribe(() => {
      this.loadComments(this.post._id);
    });
  }


}
