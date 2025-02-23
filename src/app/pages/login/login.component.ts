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
import { InputComponent } from '@shared';
import { LoginFormValue } from '../../shared/models/backend/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [InputComponent, MatButtonModule, ReactiveFormsModule],
})
export default class LoginComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailOrUserName: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), this.uppercaseLowercaseValidator],
      ],
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid)
  }

  uppercaseLowercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
      return { uppercaseLowercase: true };
    }
    return null;
  }
}
