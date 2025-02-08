import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-accordion-item',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: 'accordion-item.component.scss',
})
export class AccordionItemComponent {
  canRemove = input(false);
  canReact = input(true);

  isOpened = signal(false);

  toggleOpenBtn(): void {
    this.isOpened.update(value => !value);
  }
}
