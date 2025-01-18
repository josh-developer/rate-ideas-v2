import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent, DatepickerComponent } from '@shared';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrl: 'signup.component.scss',
  imports: [InputComponent, MatButtonModule, DatepickerComponent],
})
export default class SignupComponent {
  readonly ageRestrictions = { max: new Date('01/01/2010'), min: new Date('01/01/1950') };
}
