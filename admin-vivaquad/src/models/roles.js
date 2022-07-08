import { roleList, createRole, updateRole, deleteRole , roleListEmployee} from '../services/api'
import { message } from 'antd';

export default {
  namespace: 'roles',

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
    *roleList({ payload }, { call, put }) {
      const response = yield call(roleList, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      yield put({ type: 'list', ...response });
    },
    *roleListEmployee({ payload }, { call, put }) {
      const response = yield call(roleListEmployee, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      yield put({ type: 'list', ...response });
    },
    *roleAdd({ payload }, { call, put }) {
      const response = yield call(createRole, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      if (response.status) { message.success(response.message, 5); }
      yield put({ type: 'add', ...response });
    },
    *roleEdit({ payload }, { call, put }) {
      const response = yield call(updateRole, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      if (response.status) { message.success(response.message, 5); }
      yield put({ type: 'edit', ...response });
    },
    *roleDelete({ payload }, { call, put }) {
      const response = yield call(deleteRole, payload);
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