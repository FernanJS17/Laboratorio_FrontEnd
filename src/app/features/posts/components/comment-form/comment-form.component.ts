import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      class="bg-gray-50 p-4 rounded-lg space-y-3"
    >
      <input
        class="w-full border rounded p-2"
        placeholder="Nombre"
        formControlName="name"
      />

      <input
        class="w-full border rounded p-2"
        placeholder="Email"
        formControlName="email"
      />

      <textarea
        class="w-full border rounded p-2"
        rows="3"
        placeholder="Comentario"
        formControlName="body"
      ></textarea>

      <button
        type="submit"
        [disabled]="form.invalid"
        class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Agregar comentario
      </button>
    </form>
  `
})
export class CommentFormComponent {

  @Input() postId!: string;
  @Output() created = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.created.emit({
      ...this.form.value,
      postId: this.postId
    });

    this.form.reset();
  }
}
