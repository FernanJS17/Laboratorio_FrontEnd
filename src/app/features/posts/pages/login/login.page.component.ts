import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.component.html'
})
export class LoginPageComponent {


  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  }

  login(): void {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }
}
