import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-form-page',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="p-6 space-y-4"
    >
      <input
        class="border p-2 w-full"
        placeholder="Título"
        formControlName="title"
      />

      <textarea
        class="border p-2 w-full"
        placeholder="Contenido"
        rows="5"
        formControlName="body"
      ></textarea>

      <input
        class="border p-2 w-full"
        placeholder="Autor"
        formControlName="author"
      />

      <app-button type="submit" [disabled]="form.invalid">
        Guardar
      </app-button>
    </form>
  `
})
export class PostFormPageComponent implements OnInit {


  private postId?: string;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', Validators.required]
    });

    this.postId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.postId) {
      this.postsService.getById(this.postId).subscribe(post => {
        this.form.patchValue(post);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const request$ = this.postId
      ? this.postsService.update(this.postId, this.form.value as any)
      : this.postsService.create(this.form.value as any);

    request$.subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }
}
