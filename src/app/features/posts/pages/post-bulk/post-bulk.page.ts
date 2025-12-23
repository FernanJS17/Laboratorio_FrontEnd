import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Router } from '@angular/router';
import { Post } from '../../models/posts.model';
import { generateBulkPosts } from '../../../../core/utils/bulk-post-generator';

@Component({
  selector: 'app-posts-bulk-page',
  templateUrl: './post-bulk.page.component.html'
})
export class PostsBulkPageComponent implements OnInit {

  form!: FormGroup;

  showConfirmSubmit = false;
  showConfirmCancel = false;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      json: [
        JSON.stringify(generateBulkPosts(), null, 2),
        Validators.required
      ]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.showConfirmSubmit = true;
  }

  confirmSubmit(): void {
    this.showConfirmSubmit = false;

    let parsed: unknown;

    try {
      parsed = JSON.parse(this.form.value.json);
    } catch {
      this.toast.show('JSON inválido', 'error');
      return;
    }

    if (!this.isValidPostsArray(parsed)) {
      this.toast.show(
        'La estructura del JSON no es válida. Verifica title, body y author.',
        'error'
      );
      return;
    }

    this.postsService.bulkCreate(parsed).subscribe({
      next: () => {
        this.toast.show(
          'Posts cargados correctamente',
          'success'
        );
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        // console.error(err);

        if (err.status === 500) {
          this.toast.show(
            'La carga masiva es demasiado grande. Intenta con menos registros.',
            'error'
          );
          return;
        }

        this.toast.show(
          'Ocurrió un error inesperado al cargar los posts.',
          'error'
        );
      }
    });

  }

  cancel(): void {
    if (!this.form.dirty) {
      this.router.navigate(['/posts']);
      return;
    }

    this.showConfirmCancel = true;
  }

  confirmCancel(): void {
    this.showConfirmCancel = false;
    this.router.navigate(['/posts']);
  }

  private isValidPostsArray(data: any): data is Partial<Post>[] {
    if (!Array.isArray(data)) return false;

    return data.every(item =>
      typeof item.title === 'string' &&
      item.title.trim().length >= 3 &&
      typeof item.body === 'string' &&
      item.body.trim().length >= 10 &&
      typeof item.author === 'string' &&
      item.author.trim().length > 0
    );
  }
}
