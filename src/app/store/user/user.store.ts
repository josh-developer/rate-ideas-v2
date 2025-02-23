import { signalStore, withMethods, withState } from '@ngrx/signals';
import { IUser } from '../../shared/models/backend/IUser';

interface State {
  user: IUser | null;
  access_token: string | null;
}

const initialState: State = {
  access_token: null,
  user: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withMethods(state => ({}))
);
