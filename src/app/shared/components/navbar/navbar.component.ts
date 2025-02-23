import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountModalComponent } from '../../modals/account-modal/account-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  imports: [MatButtonModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  dialog = inject(MatDialog);

  openAccountModal(): void {
    const dialogRef = this.dialog.open(AccountModalComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
