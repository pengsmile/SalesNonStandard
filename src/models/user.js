import { port } from '@/services/globalquery';
const UserModel = {
  namespace: 'user',
  state: {
      userInfo: [],
      userStatus: ''
  },
  effects: {
    *fetchCurrent({payload}, { call, put }) {
      const response = yield call(port, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchvipAudit({payload}, {call, put}) {
      const response = yield call(port, payload);
      yield put({
          type: 'saveStatus',
          payload: response
      })
    }
  },
  reducers: {
    saveCurrentUser(state, {payload}) {
      return { ...state, userInfo: payload };
    },
    saveStatus(state, {payload}) {
        return {...state, userStatus: payload.RETURN_CODE == 0 ? 'audit' : 'admin'}
    }
  }
};
export default UserModel;
