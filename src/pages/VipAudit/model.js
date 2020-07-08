import { port } from '@/services/globalquery';
import moment from 'moment';
const vipAudit = {
  namespace: 'vipAudit',
  state: {
      defaultVal: {
        VISIT_DT_START: moment().weekday(1).format('YYYY-MM-DD'),
        VISIT_DT_END: moment().weekday(7).format('YYYY-MM-DD'),
        HPHP_NAME: ''
      }
  },
  effects: {
    *fetchCurrent({payload}, { call, put }) {
      const response = yield call(port, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    }
  },
  reducers: {
    saveCurrentUser(state, {payload}) {
      return { ...state, userInfo: payload };
    },
    saveStatus(state, {payload}) {
        return {...state, userStatus: payload.RETURN_CODE == 0 ? 'audit' : 'audit'}
    },
    changeDefaultVal(state, {payload}) {
        Object.assign(state.defaultVal, payload)
        return {...state}
    },
  }
};
export default vipAudit;
