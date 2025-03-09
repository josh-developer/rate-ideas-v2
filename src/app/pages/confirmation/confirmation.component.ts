import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputGroupComponent } from '@shared';
import { UserStore } from '../../store/user/user.store';
import { IConfirmationMessage, IverifyWithEmail } from '../../shared/models/frontend/User.types';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-confirmation',
  imports: [MatIconModule, InputGroupComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: 'confirmation.component.scss',
})
export default class ConfirmationComponent {
  private userStore = inject(UserStore)
  private router = inject(Router)
  private snackBarService = inject(SnackbarService)
  messageAndEmail: IConfirmationMessage = { message: "", email: "" }
  ngOnInit(): void {
    this.messageAndEmail = this.userStore.getEmailAndMessage()
    if (!this.messageAndEmail.email) {
      this.router.navigateByUrl('/signup');

    }
  }
  onFilled(values: string[]) {
    let data: IverifyWithEmail = { email: this.userStore.getEmailAndMessage().email, verificationCode: values.join("") }
    this.userStore.verify(data).subscribe({
      next: ({ data }) => {
        if (data) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (error) => {
        this.snackBarService.showAlert(error?.error?.message);
      },
    });
  }
}
