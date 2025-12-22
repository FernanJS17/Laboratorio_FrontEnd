import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Comment } from '../models/comments.model';
import { ApiResponse } from '../../../core/utils/api-response';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments = signal<Comment[]>([]);
  loading = signal<boolean>(false);

  constructor(private api: ApiService) {}

  getByPost(postId: string): Observable<Comment[]> {
    this.loading.set(true);

    return this.api
      .get<ApiResponse<Comment[]>>('/comments', { postId })
      .pipe(
        map(res => res.data),
        map(comments => {
          this.comments.set(comments);
          this.loading.set(false);
          return comments;
        }),
        catchError(err => {
          this.loading.set(false);
          return throwError(() => err);
        })
      );
  }

  create(data: Partial<Comment>): Observable<Comment> {
    return this.api
      .post<ApiResponse<Comment>>('/comments', data)
      .pipe(map(res => res.data));
  }

  delete(id: string): Observable<void> {
    return this.api
      .delete<ApiResponse<void>>(`/comments/${id}`)
      .pipe(map(() => void 0));
  }
}
