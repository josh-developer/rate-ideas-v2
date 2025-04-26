import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DatepickerComponent, InputComponent } from '../../components';
import { UserStore } from '../../../store/user/user.store';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createFormData } from '../../utils/create-formdata';

@Component({
  selector: 'account-modal',
  templateUrl: 'account-modal.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogTitle,
    InputComponent,
    MatInputModule,
    DatepickerComponent,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class AccountModalComponent implements OnInit {
  dialogRef = inject(MatDialogRef);
  userStore = inject(UserStore);
  formBuilder = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  datePipe = inject(DatePipe);

  form!: FormGroup;
  readonly ageRestrictions = {
    max: new Date('01/01/2010'),
    min: new Date('01/01/1950'),
  };

  isLoading = signal(false);

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [
        this.userStore.getUser().firstName,
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [
        this.userStore.getUser()?.lastName,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.userStore.getUser()?.email,
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      userName: [
        this.userStore.getUser()?.userName || this.userStore.getUser()?.username,
        [Validators.required, Validators.minLength(3)],
      ],
      dateOfBirth: [this.userStore.getUser()?.dateOfBirth, [Validators.required]],
    });
  }

  onSave(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);

    const dateFormat = this.datePipe.transform(this.form.value.dateOfBirth, 'YYYY-MM-dd');
    this.form.get('dateOfBirth')?.setValue(dateFormat);

  const formData = createFormData(this.form);

    this.userStore
      .updateProfile(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
