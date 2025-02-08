import { Component, input } from '@angular/core';
import { AccordionItemComponent } from './components/accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion-list',
  imports: [AccordionItemComponent],
  templateUrl: './accordion-list.component.html',
})
export class AccordionListComponent {
  title = input('Ideas');
  canRemove = input(false);
  canReact = input(true);
}
