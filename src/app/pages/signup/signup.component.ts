import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent, DatepickerComponent } from '@shared';
import { UserStore } from '../../store/user/user.store';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: 'signup.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, MatButtonModule, DatepickerComponent],
})
export default class SignupComponent implements OnInit {
  readonly ageRestrictions = { max: new Date('2010-01-01'), min: new Date('1950-01-01') };
  signupForm!: FormGroup;
  private userStore = inject(UserStore);
  private formBuilder = inject(FormBuilder);
  private snackBarService = inject(SnackbarService);
  private router = inject(Router);
  @Input() control!: FormControl;
  selectedDate: Date | null = null; // ✅ Tanlangan sanani saqlash uchun

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(6), this.usernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.uppercaseLowercaseValidator,]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), this.uppercaseLowercaseValidator,]],
      dateOfBirth: ['', Validators.required]
    });
  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!value) {
      // Hech qanday value yo'q bo'lsa shunchaki null qaytariladi
      return null;
    }

    // Maxsus belgilar va bo'shliq uchun tekshirish
    if (!/^[A-Za-z0-9]+$/.test(value)) {
      return { usernameInvalid: true };
    }

    return null; // Hamma shartlar bajarildi
  }

  uppercaseLowercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
      return { uppercaseLowercase: true };
    }
    return null;
  }
  onDateSelected(date: Date) {
    this.selectedDate = date; // ✅ Sana saqlanadi
    this.signupForm.patchValue({ dateOfBirth: date }); // ✅ Formga qo‘shiladi
    console.log("SignupComponent: Form Values:", this.signupForm.value); // ✅ Konsolda chiqadi
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('FirstName', this.signupForm.value.firstName);
    formData.append('LastName', this.signupForm.value.lastName);
    formData.append('UserName', this.signupForm.value.userName);
    formData.append('Email', this.signupForm.value.email);
    formData.append('Password', this.signupForm.value.password);
    formData.append('ConfirmPassword', this.signupForm.value.confirmPassword);
    formData.append('DateOfBirth', new Date(this.signupForm.value.dateOfBirth).toISOString());

    this.userStore.signup(formData).subscribe({
      next: ({ data }) => {
        if (data) {
          this.userStore.setEmailAndMessage({ message: data, email: this.signupForm.value.email })
          this.router.navigateByUrl('/confirmation');
        }
      },
      error: (error) => {
        this.snackBarService.showAlert(error?.error?.message);
      },
    });
  }
}
