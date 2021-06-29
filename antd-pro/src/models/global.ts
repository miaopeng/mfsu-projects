import { Subscription, Reducer } from 'umi';

export interface GlobalModelState {
  collapsed: boolean;
  error: any;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    setError: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const initialState = {
  collapsed: true,
  error: null,
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: initialState,

  effects: {},

  reducers: {
    changeLayoutCollapsed(state = initialState, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    setError(state = initialState, { payload }) {
      return { ...state, error: payload };
    },
  },

  subscriptions: {
    setup({ history }): void {
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
