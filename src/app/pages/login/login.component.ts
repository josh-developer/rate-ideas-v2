import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent, uppercaseLowercaseValidator } from '@shared';
import { UserStore } from '../../store/user/user.store';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [InputComponent, MatButtonModule, ReactiveFormsModule, RouterLink],
})
export default class LoginComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  snackBarService = inject(SnackbarService);
  userStore = inject(UserStore);
  router = inject(Router);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailOrUserName: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), uppercaseLowercaseValidator],
      ],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.userStore.login(this.loginForm.value).subscribe({
      next: ({ data }) => {
        if (data.token) {
          this.router.navigateByUrl('/home');
        }
      },
      error: error => {
        this.snackBarService.showAlert(error?.error?.message);
      },
    });
  }
}
