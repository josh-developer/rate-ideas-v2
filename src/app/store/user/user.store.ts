import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { IUserResponse, LoginFormValue, SignUpFormValue } from '@shared';
interface State {
  user: IUserResponse | null;
  access_token: string | null;
  email: string;
}

const initialState: State = {
  access_token: null,
  user: null,
  email: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withComputed(({ user, access_token }) => ({
    getUser: computed(() => user() || JSON.parse(localStorage.getItem('user')!)),
    getToken: computed(() => access_token() || localStorage.getItem('access_token')!),
  })),
  withMethods((state, userService = inject(UserService), router = inject(Router)) => ({
    login: (form: LoginFormValue) => {
      return userService.login(form).pipe(
        tap(({ data }) => {
          patchState(state, {
            access_token: data.token,
            user: data,
          });
          userService.setToken(data.token, data);
          router.navigate(['/']);
        })
      );
    },

    signup: (form: SignUpFormValue) => {
      return userService.signup(form).pipe(
        tap(() => {
          patchState(state, {
            email: form.email,
          });
        })
      );
    },

    updateProfile: (data: FormData) => {
      return userService.updateProfile(data).pipe(
        tap(response => {
          patchState(state, {
            user: response.data,
          });

          userService.setToken(state.getToken()!, response.data);
        })
      );
    },

    verify: (email: string, verificationCode: string) => {
      return userService.verify(email, verificationCode).pipe(
        tap(({ data }) => {
          patchState(state, {
            user: data,
            access_token: data.token,
          });

          userService.setToken(data.token, data);
        })
      );
    },
  }))
);
