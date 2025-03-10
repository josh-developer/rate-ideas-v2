import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ICategory, IIdea } from '@shared';
import { IdeasService } from '../../services/ideas.service';
import { tap } from 'rxjs';

interface State {
  ideas: IIdea[];
  categories: ICategory[];
  isLoading: boolean;
}

const initialState: State = {
  ideas: [
    {
      id: 2,
      title: 'Angularni rivojlantirish',
      isSaved: false,
      user: { firstName: 'Testbek' },
      description: "Hamma Reactchilani majburlab Angularga ko'chirish kerak",
    } as unknown as IIdea,
  ],
  categories: [],
  isLoading: false,
};

export const IdeasStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withMethods((state, ideasService = inject(IdeasService)) => ({
    getAllCategories() {
      return ideasService.getAllCategories().pipe(
        tap(data => {
          console.log(data);
        })
      );
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
  }))
);
