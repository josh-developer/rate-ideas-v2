import { Component, inject, input } from '@angular/core';
import { AccordionItemComponent } from './components/accordion-item/accordion-item.component';
import { IIdea } from '../../models/backend/IIdea';
import { IdeasStore } from '../../../store/ideas/ideas.store';

@Component({
  selector: 'app-accordion-list',
  imports: [AccordionItemComponent],
  templateUrl: './accordion-list.component.html',
})
export class AccordionListComponent {
  ideaStore = inject(IdeasStore);

  title = input('Ideas');
  canRemove = input(false);
  canReact = input(true);

  onSaveClick(id: number): void {
    this.ideaStore.updateSave(id);
  }
}
