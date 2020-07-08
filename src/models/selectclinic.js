
import { port } from '@/services/globalquery';
const selectclinic = {
  namespace: 'selectclinic',
  state: {
    dataSource: [],
    page: 1,
    total: 1,
    hasMore: true,
    HPHP_NAME: '',
    switchPlan: false,
    HPHP_ID: ''
  },
  effects: {
    *fetchClinicData({ payload }, {call, put, select}) {
        const respone = yield call(port, payload);
        respone.page = payload.page;
        yield put({
          type: 'saveClinicData',
          payload: respone
        })
    },
    *fetchScheme({ payload }, {call, put, select}){
        const respone = yield call(port, payload);
        yield put({
          type: 'saveNoticesPeron',
          payload: respone
        })
    }
  },
  reducers: {
    saveClinicData(state, { payload }){
        const pageCount = (totalnum,limit) => {
            return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt(totalnum / limit) + 1) : (totalnum / limit))) : 0;
        }
        state.page = payload.page;
        if (state.page == 1) {
            state.dataSource = payload.rows;
            state.hasMore = true;
        } else {
            state.dataSource = state.dataSource.concat(payload.rows);
        }
        state.total = pageCount(payload.total, 20);
        return {...state}
    },
    ChangePlan(state, {payload}){
        state.switchPlan = payload.switchPlan;
        state.HPHP_ID = payload.HPHP_ID
        return {...state}
    },
    cleanStatus(state){
        state.dataSource = [];
        state.page = 1;
        state.total = 1;
        state.total = true;
        return {...state}
    },
    switchHasMore(state){
        state.hasMore = false;
        return {...state}
    },
    saveNoticesPeron(state, {payload}){
        state.share.NoticesPeron = payload;
        return {...state}
    }
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default selectclinic;
