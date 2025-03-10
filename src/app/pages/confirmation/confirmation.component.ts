import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputGroupComponent } from '@shared';
import { UserStore } from '../../store/user/user.store';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-confirmation',
  imports: [MatIconModule, InputGroupComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: 'confirmation.component.scss',
})
export default class ConfirmationComponent {
  userStore = inject(UserStore);
  router = inject(Router);
  snackBarService = inject(SnackbarService);
  
  email = signal('');

  onFilled(values: string[]) {
    this.userStore.verify(this.email(), values.join('')).subscribe({
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

  ngOnInit() {
    if(!this.userStore.email()) {
      this.router.navigateByUrl('/login')
    }

    this.email.set(this.userStore.email());
  }
}
