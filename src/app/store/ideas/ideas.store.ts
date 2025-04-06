import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ICategory, IIdea } from '@shared';
import { IdeasService } from '../../services/ideas.service';
import { switchMap, tap } from 'rxjs';

interface State {
  ideas: IIdea[];
  categories: ICategory[];
  activeTab: number | null;
  isLoading: boolean;
}

const initialState: State = {
  ideas: [],
  categories: [],
  activeTab: null,
  isLoading: false,
};

export const IdeasStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withMethods((state, ideasService = inject(IdeasService)) => ({
    getAllCategories() {
      return ideasService.getAllCategories().pipe(
        tap(data => {
          patchState(state, { categories: data.data });
        })
      );
    },

    setActiveTab(id: number) {
      patchState(state, { activeTab: id });
    },

    updateSave(id: number): void {
      const updatedIdeas = state.ideas().map(idea => {
        if (idea.id === id) return { ...idea, isSaved: !idea.isSaved };
        return idea;
      });

      patchState(state, {
        ideas: updatedIdeas,
      });
    },

    toggleIdeaVote(body: { isUpvote: boolean; ideaId: number }) {
      return ideasService.toggleIdeaVote(body).pipe(
        switchMap(() => {
          return this.getAllCategories();
        }),
        tap(data => {
          this.setIdeas(state.activeTab()!);
        })
      );
    },

    setIdeas(id: number): void {
      patchState(state, {
        ideas: state.categories().find(c => c.id === id)?.ideas || [],
      });
    },
  }))
);
