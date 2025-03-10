import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IResponse } from '../shared/models/backend/IResponse';
import { IUserResponse } from '../shared/models/backend/IUserResponse';
import { LoginFormValue } from '../shared/models/backend/ILogin';
import { Observable } from 'rxjs';
import { IverifyWithEmail } from '../shared/models/frontend/User.types';

@Injectable({ providedIn: 'root' })
export class UserService {
  httpClient = inject(HttpClient);
  login(formValue: LoginFormValue) {
    return this.httpClient.post<IResponse<IUserResponse>>(
      environment.apiUrl + 'auth/login',
      formValue
    );
  }

  sign(formData: FormData): Observable<IResponse<string>> { // ✅ FormData qabul qiladi
    return this.httpClient.post<IResponse<string>>(
      environment.apiUrl + 'auth/sign-up',
      formData,
      {
        headers: new HttpHeaders({
          'Accept': 'text/plain' // ✅ `Content-Type` avtomatik `multipart/form-data` bo‘ladi
        })
      }
    );
  }

  verify(verifyData: IverifyWithEmail) {
    return this.httpClient.post<IResponse<IUserResponse>>(
      environment.apiUrl + 'auth/verify-email',
      verifyData
    );
  }

  setToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
  }

  clearToken() {
    localStorage.clear();
  }

  check() {
    const token = localStorage.getItem('access_token'); // Json Web Token
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(atob(base64));
      const now = Date.now() / 1000;

      if (payload.exp > now) {
        return true;
      }
    }
    this.clearToken();

    return false;
  }
}
