import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  // inject() works at field-initialization time (unlike constructor
  // parameters, which aren't ready yet until the constructor body runs) -
  // this is the fix for the "used before initialization" error.
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Reactive Forms: the form's structure and validation rules are defined
  // here in TypeScript (not scattered across HTML attributes), which is
  // why it's called "reactive" - the form is a real object you control.
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // forces validation messages to show even if user never clicked into a field
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService
      .login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message ?? 'Login failed. Check your email and password.');
        }
      });
  }

  // Convenience getters so the template can read validation state cleanly,
  // e.g. email?.invalid instead of loginForm.get('email')?.invalid.
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}