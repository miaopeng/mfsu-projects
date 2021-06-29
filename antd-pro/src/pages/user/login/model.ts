import { AnyAction, Reducer } from 'redux';
import { message } from 'antd';
import { EffectsCommandMap, routerRedux } from 'dva';
import { setAuthority } from '@/utils/utils';
import { login } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  errorMessage?: string;
  currentAuthority?: 'sales' | 'op' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { [key: string]: Effect };
  reducers: { [key: string]: Reducer<StateType> };
}

const Model: ModelType = {
  namespace: 'userAndlogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response;

      try {
        response = yield call(login, payload);
        const { data, error } = response;
        if (error || !data || !data.signIn) {
          throw new Error(error || 'Network Error');
        }
        if (data.signIn.errors) {
          throw new Error(response.data.signIn.errors);
        }
      } catch (error) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error', errorMessage: error.message },
        });
        return;
      }

      const { token, user } = response.data.signIn;

      if (!token || !user) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error', errorMessage: 'Login failed' },
        });
        return;
      }

      const auth = user.roles;

      // Login successfully
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'ok',
          currentAuthority: auth,
        },
      });

      yield put({
        type: 'user/login',
        payload: { user, token, auth },
      });

      message.success('登录成功！');
      yield put(routerRedux.replace('/'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
