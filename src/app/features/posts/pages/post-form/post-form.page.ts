import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { ToastService } from '../../../../core/services/toast.service';


@Component({
  selector: 'app-post-form-page',
  templateUrl: './post-form.page.component.html'
})
export class PostFormPageComponent implements OnInit {


  postId?: string;
  form!: FormGroup;

  showCancelModal = false;
  showSubmitModal = false;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1200)]],
      author: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.postId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.postId) {
      this.postsService.getById(this.postId).subscribe(post => {
        this.form.patchValue(post);
      });
    }
  }

    cancel(): void {
      if (this.form.dirty) {
        this.showCancelModal = true;
        return;
      }

      this.router.navigate(['/posts']);
    }

    confirmCancel(): void {
      this.showCancelModal = false;
      this.router.navigate(['/posts']);
    }

    openSubmitModal(): void {
      if (this.form.invalid) return;
      this.showSubmitModal = true;
    }

    confirmSubmit(): void {
      this.showSubmitModal = false;
      this.onSubmit();
    }

  onSubmit(): void {
    if (this.form.invalid) return;

    const request$ = this.postId
      ? this.postsService.update(this.postId, this.form.value as any)
      : this.postsService.create(this.form.value as any);

    request$.subscribe(() => {
      this.toast.show(
        this.postId
          ? 'Post actualizado correctamente'
          : 'Post creado correctamente',
          'success'
      );

      this.router.navigate(['/posts']);
    });
  }
}
