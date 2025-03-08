import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IUser } from '../../shared/models/backend/IUser';
import { LoginFormValue } from '../../shared/models/backend/ILogin';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { IUserResponse } from '../../shared/models/backend/IUserResponse';

interface State {
  user: IUserResponse | null;
  access_token: string | null;
}

const initialState: State = {
  access_token: null,
  user: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withMethods((state, userService = inject(UserService)) => ({
    login: (form: LoginFormValue) => {
      return userService.login(form).pipe(
        tap(({ data }) => {
          patchState(state, {
            access_token: data.token,
            user: data,
          });

          userService.setToken(data.token);
        })
      );
    },
  }))
);
