import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  InputComponent,
  DatepickerComponent,
  uppercaseLowercaseValidator,
} from '@shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Router, RouterLink } from '@angular/router';
import { UserStore } from '../../store/user/user.store';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrl: 'signup.component.scss',
  imports: [
    InputComponent,
    MatButtonModule,
    ReactiveFormsModule,
    DatepickerComponent,
    RouterLink,
  ],
})
export default class SignupComponent {
  formBuilder = inject(FormBuilder);
  snackBarService = inject(SnackbarService);
  router = inject(Router);
  signupForm!: FormGroup;
  userStore = inject(UserStore);

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      dateOfBirth: [new Date(), [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), uppercaseLowercaseValidator],
      ],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }
    const date = this.signupForm.value.dateOfBirth;
    const dateOfBirth = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    const value = { ...this.signupForm.value, dateOfBirth };

    this.userStore.signup(value).subscribe({
      next: ({ data }) => {
        this.router.navigateByUrl('/confirmation');
      },
      error: error => {
        this.snackBarService.showAlert(error?.error?.message);
      },
    });
  }

  readonly ageRestrictions = {
    max: new Date('01/01/2010'),
    min: new Date('01/01/1950'),
  };
}
