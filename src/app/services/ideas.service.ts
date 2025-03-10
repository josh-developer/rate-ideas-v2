import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory, IResponse } from '@shared';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IdeasService {
  httpClient = inject(HttpClient);

  getAllCategories() {
    return this.httpClient.get<IResponse<ICategory[]>>(
      environment.apiUrl + 'categories/get-all'
    );
  }
}
