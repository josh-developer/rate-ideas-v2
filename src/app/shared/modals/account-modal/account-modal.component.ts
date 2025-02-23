import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { InputComponent } from '../../components';

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
  ],
})
export class AccountModalComponent implements OnInit {
  dialogRef = inject(MatDialogRef);

  ngOnInit() {}
}
