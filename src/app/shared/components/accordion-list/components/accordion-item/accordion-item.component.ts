import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { IIdea } from '../../../../models/backend/IIdea';
import { UserStore } from '../../../../../store/user/user.store';

@Component({
  selector: 'app-accordion-item',
  imports: [MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: 'accordion-item.component.scss',
})
export class AccordionItemComponent {
  userStore = inject(UserStore);

  item = input<IIdea | null>(null);
  canRemove = input(false);
  canReact = input(true);

  onSave = output<number>();
  onVote = output<boolean>();
  isOpened = signal(false);

  reactionCount = computed(() => {
    return this.item()?.votes.reduce(
      (sum, vote) => {
        if (!vote.isUpvote) {
          sum.dislikeCount += 1;
        } else {
          sum.likeCount += 1;
        }

        return sum;
      },
      { dislikeCount: 0, likeCount: 0 }
    );
  });

  isReactionActive(isUpvote: boolean) {
    const vote = this.item()?.votes.find(
      vote => vote.user.id === this.userStore.getUser()?.id
    );

    return vote && vote?.isUpvote === isUpvote;
  }

  onVoteClick(isUpvote: boolean) {
    this.onVote.emit(isUpvote);
  }

  toggleOpenBtn(): void {
    this.isOpened.update(value => !value);
  }
}
