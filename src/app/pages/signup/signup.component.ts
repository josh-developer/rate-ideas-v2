import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent, DatepickerComponent } from '@shared';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
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
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.uppercaseLowercaseValidator,
        ],
      ],
    });
  }
  uppercaseLowercaseValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
      return { uppercaseLowercase: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.userStore.signup(this.signupForm.value).subscribe({
      next: ({ data }) => {
        this.router.navigateByUrl('/confirmation');
      },
      error: (error) => {
        this.snackBarService.showAlert(error?.error?.message);
      },
    });
  }
  onDateSelected(e: any) {
    const formattedDate = `${
      e.getMonth() + 1
    }/${e.getDate()}/${e.getFullYear()}`;
    this.signupForm.get('dateOfBirth')?.setValue(formattedDate);
  }

  readonly ageRestrictions = {
    max: new Date('01/01/2010'),
    min: new Date('01/01/1950'),
  };
}
