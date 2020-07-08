import { queryBasicProfile } from './service';

const Model = {
  namespace: 'profileAndbasic',
  state: {
    basicGoods: [],
  },
  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryBasicProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },
  reducers: {
    show(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
