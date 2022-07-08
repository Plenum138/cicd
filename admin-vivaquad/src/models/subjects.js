// import { lunchAllList, createlunch, updatelunch, deletelunch , getLunchList} from '../services/api'
// import { message } from 'antd';

// export default {
//   namespace: 'subjects',

//   state: {
//     add: { count: 0 },
//     edit: { count: 0 },
//     fileUp: { count: 0 },
//     del: { count: 0 }
//   },

//   subscriptions: {
//     setup({ dispatch, history }) {
//     },
//   }, 

//   effects: {
//     *lunchAllList({ payload }, { call, put }) {
//       const response = yield call(lunchAllList, payload);
//       if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
//       yield put({ type: 'list', ...response });
//     },
//     *getLunchList({ payload }, { call, put }) {
//       const response = yield call(getLunchList, payload);
//       if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
//       yield put({ type: 'list', ...response });
//     },
//     *lunchAdd({ payload }, { call, put }) {
//       const response = yield call(createlunch, payload);
//       if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
//       if (response.status) { message.success(response.message, 5); }
//       yield put({ type: 'add', ...response });
//     },
//     *lunchEdit({ payload }, { call, put }) {
//       const response = yield call(updatelunch, payload);
//       if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
//       if (response.status) { message.success(response.message, 5); }
//       yield put({ type: 'edit', ...response });
//     },
//     *lunchDelete({ payload }, { call, put }) {
//       const response = yield call(deletelunch, payload);
//       if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
//       if (response.status) { message.success(response.message, 5); }
//       yield put({ type: 'del', ...response });
//     },
//     *clearAction({ payload }, { call, put }) {
//       yield put({ type: 'clear'});
//     },
  
//   },

//   reducers: {
//     list(state, action) {
//       return { ...state, list: action };
//     },
//     add(state, action) {
//       action.count = state.add.count + 1;
//       return { ...state, add: action };
//     },
//     edit(state, action) {
//       action.count = state.edit.count + 1;
//       return { ...state, edit: action };
//     },
//     del(state, action) {
//       action.count = state.del.count + 1;
//       return { ...state, del: action };
//     },
//     clear(state, action) {
//       return { ...state, edit:{count:0}, del:{count:0}};
//       },
//   },
// };


import { subjectAllList, createsubject, updatesubject, deletesubject , getsubjectList} from '../services/api'
import { message } from 'antd';

export default {
  namespace: 'subjects',

  state: {
    add: { count: 0 },
    edit: { count: 0 },
    fileUp: { count: 0 },
    del: { count: 0 }
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  }, 

  effects: {
    *subjectAllList({ payload }, { call, put }) {
      const response = yield call(subjectAllList, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      yield put({ type: 'list', ...response });
    },
    *getsubjectList({ payload }, { call, put }) {
      const response = yield call(getsubjectList, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      yield put({ type: 'listData', ...response });
    },
    *subjectAdd({ payload }, { call, put }) {
      const response = yield call(createsubject, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      if (response.status) { message.success(response.message, 5); }
      yield put({ type: 'add', ...response });
    },
    *subjectEdit({ payload }, { call, put }) {
      const response = yield call(updatesubject, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      if (response.status) { message.success(response.message, 5); }
      yield put({ type: 'edit', ...response });
    },
    *subjectDelete({ payload }, { call, put }) {
      const response = yield call(deletesubject, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      if (response.status) { message.success(response.message, 5); }
      yield put({ type: 'del', ...response });
    },
    *clearAction({ payload }, { call, put }) {
      yield put({ type: 'clear'});
    },
  
  },

  reducers: {
    list(state, action) {
      return { ...state, list: action };
    },
    listData(state, action) {
      return { ...state, listData: action };
    },
    add(state, action) {
      action.count = state.add.count + 1;
      return { ...state, add: action };
    },
    edit(state, action) {
      action.count = state.edit.count + 1;
      return { ...state, edit: action };
    },
    del(state, action) {
      action.count = state.del.count + 1;
      return { ...state, del: action };
    },
    clear(state, action) {
      return { ...state, edit:{count:0}, del:{count:0}};
      },
  },
};