 import {getUserList,createEmployee, updateEmployee,getUserDetail, editUsers, deleteUser , updateSection , updateLunchHall , updateMeal} from '../services/api'
import {message} from 'antd'; 
export default {
  namespace: 'users',

  state: {
	del:{count:0},
	add:{count:0},
	edit:{count:0}
	}, 

  subscriptions: {
    setup({ dispatch, history }) { 
    },
  },

  effects: { 
    *addEmployee({ payload }, {call,put}) {
      let response = {};
      response = yield call(createEmployee,payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      if(response.status) {message.success('employee added successfully', 5);} 

	    yield put({ type: 'add', ...response });
    },

    *editEmployee({ payload }, { call, put }) {
      const response = yield call(updateEmployee, payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      if(response.status) {message.success(response.msg || response.message || response.err, 5);} 
      yield put({ type: 'edit', ...response});
    },
    *updateSection({ payload }, { call, put }) {
      const response = yield call(updateSection, payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      if(response.status) {message.success(response.msg || response.message || response.err, 5);} 
    },
    *updateMeal({ payload }, { call, put }) {
      const response = yield call(updateMeal, payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      if(response.status) {message.success(response.msg || response.message || response.err, 5);} 
    },
    *updateLunchHall({ payload }, { call, put }) {
      const response = yield call(updateLunchHall, payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      if(response.status) {message.success(response.msg || response.message || response.err, 5);} 
    },

    *getList({ payload }, { call, put }) {
      const response = yield call(getUserList, payload);
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
	  yield put({ type: 'list', ...response});
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getUserDetail, payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      yield put({ type: 'detail', ...response});
    },
    *editItem({ payload }, { call, put }) {
      const response = yield call(editUsers, payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      if(response.status) {message.success(response.msg || response.message || response.err, 5);} 
      yield put({ type: 'edit', ...response});
    },
    *deleteItem({ payload }, { call, put }) {
      const response = yield call(deleteUser, payload); 
      if(!response.status) {message.error(response.msg || response.message || response.err, 5);}
      if(response.status) {message.success("User Deleted Successfully!", 5);} 
      yield put({ type: 'del', ...response});
    },
	*clearAction({ payload }, { call, put }) {
    console.log('clearAction')
      yield put({ type: 'clear'});
    },
  },

  reducers: {
    list(state, action) {
      return { ...state, list:action };
    },
    add(state, action) {
      action.count = state.add.count + 1;
      return { ...state, add: action };
    },
    detail(state, action) {
      return { ...state, detail:action };
    },
    edit(state, action) {
		action.count = state.edit.count+1;
		return { ...state, edit:action };
    },
    del(state, action) {
		action.count = state.del.count+1;
		return { ...state, del:action };
    },
	clear(state, action) {
		return { ...state, edit:{count:0}, add:{count:0}, del:{count:0}};
    },
  },
};