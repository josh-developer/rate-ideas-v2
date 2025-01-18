import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from '@shared';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [InputComponent, MatButtonModule]
})
export default class LoginComponent {}
