import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-posts-bulk-page',
  template: `
    <div class="p-6 max-w-2xl mx-auto">
      <h1 class="text-xl font-bold mb-4">Carga Masiva de Posts</h1>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <textarea
          class="w-full h-64 border rounded p-2 font-mono text-sm"

          formControlName="json"
        ></textarea>

        <div
          *ngIf="form.invalid && form.touched"
          class="text-red-500 text-sm mt-2"
        >
          JSON requerido
        </div>

        <button
          type="submit"
          [disabled]="form.invalid"
          class="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Cargar Posts
        </button>
      </form>
    </div>
  `
})
export class PostsBulkPageComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      json: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    let postsArray: Partial<Post>[];

    try {
      postsArray = JSON.parse(this.form.value.json);
      if (!Array.isArray(postsArray)) throw new Error('Debe ser un array');
    } catch (e:any) {
      alert('JSON inválido: ' + e.message);
      return;
    }

    this.postsService.bulkCreate(postsArray).subscribe(() => {
      this.toast.show('Posts cargados correctamente');
      this.form.reset();
    });
  }

}
