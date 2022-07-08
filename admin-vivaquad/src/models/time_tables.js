import {getTimeTableList,detailTimeTable, deleteTimeTable , createTimeTable , editTimeTable} 
from '../services/api'
import {message} from 'antd'; 

export default {
  namespace: 'time_tables',

  state: {
      list:[],
      detail:{},
      delete:false, 
      add:false,
      edit:false
	},

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    *timeTableList({ payload }, { call, put }) {
      let response = {};
        response = yield call(getTimeTableList ,payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
	    yield put({ type: 'list', data:[...response.data] });
      return response
    },
    *detailTimeTable({ payload }, { call, put }) {
      const response = yield call(detailTimeTable, payload);
      if (!response.status) { message.error(response.msg || response.message || response.err, 5); }
      // if(response.status) {message.success(response.msg, 5);} 
      yield put({ type: 'detail', ...response });
    },
    *deleteTimeTable({ payload }, {call,put}) {
      let response = {};
      response = yield call(deleteTimeTable,payload); 
      if(response.status) {message.success(response.msg || response.message || response.err, 5);}
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      yield put({ type: 'delete', message:response.status });
    },
    *AddTimeTable({ payload }, {call,put}) {
      let response = {};
      response = yield call(createTimeTable,payload); 
      if(response.status) {
        message.success(response.msg || response.message || response.err, 5);
        yield put({ type: 'add', message: response.status });
      }
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
	   
    },
    *editTimeTable({ payload }, {call,put}) {
      let response = {};
      response = yield call(editTimeTable,payload); 
      if(response.status) {message.success(response.msg || response.message || response.err, 5);}
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
	    yield put({ type: 'edit', message: response.status });
    },
    *clearAction({ payload }, { call, put }) {
      yield put({ type: 'clear' });
    },
  },
  
  reducers: {

    list (state, action) {
      return { ...state, list:[...action.data] };
    },
    detail(state, action) {
      return { ...state, detail: action };
    },
    delete (state, action) {
      return { ...state, delete:action };
    },

    add (state,action) {
      return { ...state, add: action };
    },

    edit (state,action) {
      return { ...state, edit: action };
    },
    clear (state,action) {
      return { ...state,  detail:{}, delete:false, add:false, edit:false };
    }

  },
};