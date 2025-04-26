import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory, IIdea, IResponse } from '@shared';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private httpClient = inject(HttpClient);

  getAllCategories() {
    return this.httpClient.get<IResponse<ICategory[]>>(
      environment.apiUrl + 'categories/get-all'
    );
  }

  getAllIdeas() {
    return this.httpClient.get<IResponse<IIdea[]>>(
      environment.apiUrl + 'ideas/get-all-full'
    );
  }

  getMyIdeas(id: string) {
    return this.httpClient.get<IResponse<IIdea[]>>(
      environment.apiUrl + 'ideas/get-by-user-id/' + id
    );
  }

  getAllSavedIdeas() {
    return this.httpClient.get<IResponse<{ id: number; idea: IIdea }[]>>(
      environment.apiUrl + 'saved-ideas/get-all'
    );
  }

  toggleIdeaVote(body: { isUpvote: boolean; ideaId: number }) {
    return this.httpClient.post<IResponse<null>>(
      environment.apiUrl + 'idea-votes/toggle-idea-vote',
      body
    );
  }

  createIdea(body: FormData) {
    return this.httpClient.post<IResponse<null>>(
      environment.apiUrl + 'ideas/create',
      body
    );
  }

  toggleSavedIdea(body: { ideaId: number }) {
    return this.httpClient.post<IResponse<null>>(
      environment.apiUrl + 'saved-ideas/toggle-saved-idea',
      body
    );
  }
}
