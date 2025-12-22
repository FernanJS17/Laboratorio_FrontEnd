import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, delay, map } from 'rxjs/operators';
import { Post } from '../models/posts.model';
import { ApiResponse } from '../../../core/utils/api-response';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts = signal<Post[]>([]);
  loading = signal<boolean>(false);
  total = signal(0);
  totalPages = signal(1);

  constructor(private api: ApiService) {}

  getAll(page = 1, limit = 5): Observable<void> {
    this.loading.set(true);

    return this.api
      .get<{
        items: Post[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>('/posts', { page, limit })
      .pipe(
        delay(400),
        tap(res => {
          this.posts.set(res.items);
          this.total.set(res.total);
          this.totalPages.set(res.totalPages);
          this.loading.set(false);
        }),
        map(() => void 0),
        catchError(err => {
          this.loading.set(false);
          throw err;
        })
      );
  }





  getById(id: string): Observable<Post> {
    return this.api
      .get<ApiResponse<Post>>(`/posts/${id}`)
      .pipe(map(res => res.data));
  }

  create(data: Partial<Post>): Observable<Post> {
    return this.api
      .post<ApiResponse<Post>>('/posts', data)
      .pipe(map(res => res.data));
  }

  bulkCreate(posts: Partial<Post>[]): Observable<Post[]> {
    return this.api.post<ApiResponse<Post[]>>('/posts/bulk', { posts })
      .pipe(map(res => res.data));
  }

  update(id: string, data: Partial<Post>): Observable<Post> {
    return this.api
      .put<ApiResponse<Post>>(`/posts/${id}`, data)
      .pipe(map(res => res.data));
  }

  delete(id: string): Observable<void> {
    return this.api
      .delete<ApiResponse<void>>(`/posts/${id}`)
      .pipe(map(() => void 0));
  }

}
