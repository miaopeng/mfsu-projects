import { Effect, Reducer, history } from 'umi';
import persist from '@/utils/persist';

export interface CurrentUser {
  id?: string;
  name?: string;
  phone?: string;
  roles?: string[];
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: { [key: string]: Effect };
  reducers: { [key: string]: Reducer<UserModelState> };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { put }) {
      const { user } = persist;
      if (user) {
        yield put({
          type: 'saveCurrentUser',
          payload: user,
        });
      }
    },

    *login({ payload }, { put }) {
      const { token, user, auth } = payload;
      yield put({ type: 'saveCurrentUser', payload: user });
      persist.init({ token, user, auth });
    },

    *logout(_, { put }) {
      yield put({ type: 'saveCurrentUser' });
      yield put({
        type: 'userAndlogin/changeLoginStatus',
        payload: {
          status: undefined,
        },
      });

      persist.clear();

      if (window.location.pathname !== '/user/login') {
        history.replace('/user/login');
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
