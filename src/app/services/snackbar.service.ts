import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private matSnackbar = inject(MatSnackBar);

  showAlert(errorMessage = 'Error occured', okayButtonText = 'Okay'): void {
    this.matSnackbar.open(errorMessage, okayButtonText, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
