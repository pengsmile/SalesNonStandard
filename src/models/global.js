import { queryNotices } from '@/services/user';
import { port } from '@/services/globalquery';
// import moment from 'moment';
function getDates() {
  var new_Date = new Date()
  var timesStamp = new_Date.getTime();
  var currenDay = new_Date.getDay();
  var startDate = new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 6) % 7))
  var endDate = new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 6) % 7))

  return {
      START: FormatDate(startDate),
      END: FormatDate(endDate)
  }
}
function FormatDate(date) {  
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate
}
const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    userstatus: '0',
    share: {
      PayType: [],
      NoticesPeron: [],
      AuditStatus: []
    },
    defaultVal: {
      START_DATE: getDates().START,
      END_DATE: getDates().END,
      MEME_INFO: '',
      HPHP_ID: '',
      HPHP_NAME: '',
      VPTP_STATUS: ''
    }
  },
  effects: {
    *fetchPayType({ payload }, {call, put, select}) {
        const respone = yield call(port, payload);
        yield put({
          type: 'saveShare',
          payload: respone
        })
    },
    *fetchNoticesPeron({ payload }, {call, put, select}){
        const respone = yield call(port, payload);
        yield put({
          type: 'saveNoticesPeron',
          payload: respone
        })
    },
    *fetchAuditStatus({ payload }, action){
      const {call, put, select} = action;
        const respone = yield call(port, payload);
        yield put({
          type: 'saveAuditStatus',
          payload: respone
        })
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    changeUserState(state, {payload}){
        return {...state, userstatus: payload}
    },
    changeDefaultVal(state, {payload}) {
        Object.assign(state.defaultVal, payload)
        return {...state}
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveShare(state, { payload }){
        
        state.share.PayType = payload;
        return {...state}
    },
    saveNoticesPeron(state, {payload}){
        state.share.NoticesPeron = payload;
        return {...state}
    },
    saveAuditStatus(state, {payload}){
        state.share.AuditStatus = payload;
        return {...state}
    },
    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    // setup({ history }) {
    //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
    //   history.listen(({ pathname, search }) => {
    //     if (typeof window.ga !== 'undefined') {
    //       window.ga('send', 'pageview', pathname + search);
    //     }
    //   });
    // },
  },
};
export default GlobalModel;
