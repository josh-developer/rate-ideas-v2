import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ICategory, IIdea, PageName } from '@shared';
import { IdeasService } from '../../services/ideas.service';
import { switchMap, tap } from 'rxjs';

interface State {
  ideas: IIdea[];
  allIdeas: IIdea[];
  myIdeas: IIdea[];
  categories: ICategory[];
  allCategories: ICategory[];
  activeTab: number | null;
  isLoading: boolean;
}

const initialState: State = {
  ideas: [],
  allIdeas: [],
  myIdeas: [],
  categories: [],
  allCategories: [],
  activeTab: null,
  isLoading: false,
};

export const IdeasStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withMethods((state, ideasService = inject(IdeasService)) => ({
    setAllIdeas(ideas: IIdea[]) {
      let categories: ICategory[] = [];

      for (let idea of ideas) {
        if (categories.findIndex(c => c.id === idea.category.id) === -1) {
          categories.push(idea.category);
        }
      }

      patchState(state, { allIdeas: ideas, categories });
    },

    getAllIdeas() {
      return ideasService.getAllIdeas().pipe(
        tap(data => {
          this.setAllIdeas(data.data);
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

      const updatedAllIdeas = state.allIdeas().map(idea => {
        if (idea.id === id) return { ...idea, isSaved: !idea.isSaved };
        return idea;
      });

      patchState(state, {
        ideas: updatedIdeas,
        allIdeas: updatedAllIdeas,
      });
    },

    toggleIdeaVote(body: { isUpvote: boolean; ideaId: number }, pageName: PageName) {
      return ideasService.toggleIdeaVote(body).pipe(
        switchMap(() => {
          switch (pageName) {
            case 'home':
              return this.getAllIdeas();
            case 'saved':
              return this.getAllSavedIdeas();
            default:
              return this.getAllIdeas();
          }
        }),
        tap(() => {
          this.setIdeas(state.activeTab()!);
        })
      );
    },

    toggleSavedIdea(body: { ideaId: number }) {
      return ideasService.toggleSavedIdea(body).pipe(
        tap(() => {
          this.updateSave(body.ideaId);
          this.setIdeas(state.activeTab()!);
        })
      );
    },

    getAllSavedIdeas() {
      return ideasService.getAllSavedIdeas().pipe(
        tap(data => {
          this.setAllIdeas(
            data.data.map(savedIdea => ({ ...savedIdea.idea, isSaved: true }))
          );
        })
      );
    },

    setIdeas(id: number): void {
      patchState(state, {
        ideas: state.allIdeas().filter(idea => idea.category.id === id) || [],
      });
    },

    getMyIdeas(id: string) {
      return ideasService.getMyIdeas(id).pipe(
        tap(data => {
          patchState(state, { myIdeas: data.data });
        })
      );
    },

    createIdea(body: FormData) {
      return ideasService.createIdea(body);
    },

    getAllCategories() {
      return ideasService
        .getAllCategories()
        .pipe(tap(data => patchState(state, { allCategories: data.data })));
    },
  }))
);
