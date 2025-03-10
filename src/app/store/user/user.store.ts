import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { LoginFormValue } from '../../shared/models/backend/ILogin';
import { inject, } from '@angular/core';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { IUserResponse } from '../../shared/models/backend/IUserResponse';
import { IConfirmationMessage, IverifyWithEmail } from '../../shared/models/frontend/User.types';


interface State {
  user: IUserResponse | null;
  access_token: string | null;
  message: string;
  email: string
}


const initialState: State = {
  access_token: null,
  user: null,
  message: "",
  email: ""
};


export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withMethods((state, userService = inject(UserService)) => ({

    login: (form: LoginFormValue) => {
      return userService.login(form).pipe(
        tap(({ data }) => {
          console.log(data, "=> In a store")
          patchState(state, {
            access_token: data.token,
            user: data,
          });

          userService.setToken(data.token);
        })
      );
    },

    signup: (form: FormData) => {
      return userService.sign(form).pipe(
        tap(({ data }) => {
          return data
        })
      );
    },

    verify: (values: IverifyWithEmail) => {
      return userService.verify(values).pipe(
        tap(({ data }) => {
          console.log(data, "=> In a store")
          patchState(state, {
            access_token: data.token,
            user: data,
          });

          userService.setToken(data.token);
        })
      );
    },

    setEmailAndMessage: ({ message, email }: IConfirmationMessage) => {
      patchState(state, {
        email,
        message
      })
    },

    getEmailAndMessage: (): IConfirmationMessage => {
      return { message: state.message(), email: state.email() }
    }


  }))
);
