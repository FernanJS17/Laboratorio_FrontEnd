import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl:'./comment-form.component.html'
})
export class CommentFormComponent {
  @Input() postId!: string;
  @Output() created = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      body: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const randomNumber = Math.floor(Math.random() * 1000000); // rango amplio para nombres aleatorios
    const username = `user${randomNumber}`;

    this.created.emit({
      postId: this.postId,
      name: username,
      email: `${username}@mail.com`,
      body: this.form.value.body
    });

    this.form.reset();
  }

}
