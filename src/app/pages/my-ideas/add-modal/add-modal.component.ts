import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'add-modal',
  templateUrl: 'add-modal.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
  ],
})
export class AddModalComponent implements OnInit {
  dialogRef = inject(MatDialogRef);

  ngOnInit() {}
}
