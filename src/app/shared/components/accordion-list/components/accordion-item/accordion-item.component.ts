import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { IIdea } from '../../../../models/backend/IIdea';

@Component({
  selector: 'app-accordion-item',
  imports: [MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: 'accordion-item.component.scss',
})
export class AccordionItemComponent {
  item = input<IIdea | null>(null);
  canRemove = input(false);
  canReact = input(true);
  
  onSave = output<number>();
  isOpened = signal(false);

  toggleOpenBtn(): void {
    this.isOpened.update(value => !value);
  }
}
