import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputGroupComponent } from '@shared';

@Component({
  selector: 'app-confirmation',
  imports: [MatIconModule, InputGroupComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: 'confirmation.component.scss',
})
export default class ConfirmationComponent {
  onFilled(values: string[]) {
    console.log(values);
  }
}
