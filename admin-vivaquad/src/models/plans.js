import { planAllList, createplan, updateplan, deleteplan , getplanList ,getUserPlanList} from '../services/api'
import { message } from 'antd';

export default {
  namespace: 'plans',

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

    *planAllList({ payload }, { call, put }) {
      const response = yield call(planAllList, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      yield put({ type: 'list', ...response });
    },
    *getUserPlanList({ payload }, { call, put }) {
      const response = yield call(getUserPlanList, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      yield put({ type: 'user_list', ...response });
    },
    *planAdd({ payload }, { call, put }) {
      const response = yield call(createplan, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      if (response.status) { message.success(response.message, 5); }
      yield put({ type: 'add', ...response });
    },
    *planEdit({ payload }, { call, put }) {
      const response = yield call(updateplan, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      if (response.status) { message.success(response.message, 5); }
      yield put({ type: 'edit', ...response });
    },
    *planDelete({ payload }, { call, put }) {
      const response = yield call(deleteplan, payload);
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
    user_list(state, action) {
      return { ...state, user_list: action };
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