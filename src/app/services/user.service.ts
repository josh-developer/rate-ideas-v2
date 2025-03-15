import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IResponse, IUserResponse, LoginFormValue, SignUpFormValue } from '@shared';
@Injectable({ providedIn: 'root' })
export class UserService {
  httpClient = inject(HttpClient);

  login(formValue: LoginFormValue) {
    return this.httpClient.post<IResponse<IUserResponse>>(
      environment.apiUrl + 'auth/login',
      formValue
    );
  }

  verify(email: string, verificationCode: string) {
    return this.httpClient.post<IResponse<IUserResponse>>(
      `${environment.apiUrl}auth/verify-email`,
      { email, verificationCode }
    );
  }

  signup(formValue: SignUpFormValue) {
    const params = new URLSearchParams({
      FirstName: formValue.firstName,
      Email: formValue.email,
      Password: formValue.password,
      DateOfBirth: formValue.dateOfBirth,
      UserName: formValue.userName,
    }).toString();

    return this.httpClient.post<IResponse<IUserResponse>>(
      `${environment.apiUrl}auth/sign-up?${params}`,
      {}
    );
  }

  updateProfile(data: FormData) {
    return this.httpClient.put<IResponse<IUserResponse>>(
      `${environment.apiUrl}users/update`,
      data
    );
  }

  setToken(access_token: string, user: IUserResponse) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
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
