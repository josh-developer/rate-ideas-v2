import { Component, DestroyRef, inject, input } from '@angular/core';
import { AccordionItemComponent } from './components/accordion-item/accordion-item.component';
import { IIdea } from '../../models/backend/IIdea';
import { IdeasStore } from '../../../store/ideas/ideas.store';
import { pipe } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageName } from '../../models';

@Component({
  selector: 'app-accordion-list',
  imports: [AccordionItemComponent],
  templateUrl: './accordion-list.component.html',
})
export class AccordionListComponent {
  ideaStore = inject(IdeasStore);
  destroyRef = inject(DestroyRef);

  title = input('Ideas');
  canRemove = input(false);
  canReact = input(true);
  ideas = input<IIdea[]>([]);
  pageName = input<PageName>('home');

  onVote(isUpvote: boolean, id: number) {
    this.ideaStore
      .toggleIdeaVote({ isUpvote, ideaId: id }, this.pageName())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onSaveClick(ideaId: number): void {
    this.ideaStore
      .toggleSavedIdea({ ideaId })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
