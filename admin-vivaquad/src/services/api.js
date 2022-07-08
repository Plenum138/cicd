import request from '../utils/request';


// ****START GLOBAL API **** 
export function approvebussiness(params) {
  return request('/api/approvebussiness', { method: 'POST', body: params, });
}

// ****START GLOBAL API ****

// ****START AUTH API **** 
export function login(params) {
  return request('/api/admin/login', { method: 'POST', body: {...params, isOtp: "0", firbaseToken:'' }, });
}
export function Register(params) {
  return request('/api/subadmin/signup', { method: 'POST', body: params, });
}
export function forgetpassword(params) {
  return request('/api/forgetpassword', { method: 'POST', body: params, });
}
export function resetpassword(params) {
  return request('/api/admin/resetpassword', { method: 'POST', body: params, });
  
}
export function varifyUser(params) {
  return request('/api/verify/otp', {method: 'POST', body: params});
}

export function resendOTPTOUser(params) {
  return request('/api/send-otp-to-user', {method: 'POST', body: params});
}

export function resetPassword(params) {
  return request('/api/admin/resetPassword', {method: 'POST', body: params});
}

export function changePassword(params) {
  return request('/api/changepassword', {method: 'POST', body: params});
}
// ****END AUTH API **** 



// ****START DASHBOARD API **** 
export function getDashboardData(val) {
  return request('/api/dashboard', { method: 'POST', body: val, });
} 
// ****END DASHBOARD API **** 



// ****START USERS API **** 
export function getUserList(params) {
  return request('/api/getalluserlist', { method: 'POST', body: params, });
}
export function getprofile(val) {
  return request('/api/getprofile', { method: 'POST', body: val, });
}
 
export function updateprofile(val) {
  return request('/api/admin/updateprofile', { method: 'POST', body: val, });
}

export function getUserDetail(params) {
  return request('/api/getprofile', { method: 'POST', body: params, });
}
export function editUsers(params) {
  return request('/api/editUsers', { method: 'POST', body: params, });
}
export function deleteUser(params) {
  return request('/api/deleteuser', { method: 'POST', body: params, });
}
export function updateSection(params) {
  return request('/api/user/update/section', { method: 'POST', body: params, });
}

export function updateMeal(params) {
  return request('/api/user/update/meal', { method: 'POST', body: params, });
}

// ****END USERS API **** 



// ****START EMPLOYESS API **** 
export function createEmployee(params) {
  return request('/api/admin/epmloyee/create', { method: 'POST', body: params, });
}

export function updateEmployee(params) {
  return request('/api/admin/epmloyee/update', { method: 'POST', body: params, });
}
export function updateLunchHall(params) {
  return request('/api/employee/update/hall', { method: 'POST', body: params, });
}

// ****END EMPLOYESS API **** 


// ****START PAGES API **** 
export function getPagesList(params){
  return request('/api/getAll-pages',{method:'POST', body:params});
}

export function createPages(params) {
  return request('/api/create-pages',{method:'POST', body:params});
}

export function pagesDetail(params) {
  return request('/api/get-pages?slug='+params,{method:'GET'});
}

export function editPages(params) {
  return request('/api/update-pages',{method:'PUT', body:params});
}

export function deletePages(params) {
  return request('/api/delete-pages?slug='+params,{method:'DELETE'});
}
// ****END PAGES API **** 




// ****START NOTIFICATIONS API **** 
export function getNotifList(params){
  return request('/api/notification/listing',{method:'POST', body:params});
}

export function createNotif(params) {
  return request('/api/add-notification',{method:'POST', body:params});
}

export function deleteNotif(params) {
  return request('/api/delete-notification',{method:'POST', body:params});
}
// ****END NOTIFICATIONS API **** 



// ****START ROLE API **** 
export async function  roleList(params) {
  return await request('/api/getAll/role-list',{method:'POST',body:params})
}

export function createRole(params) {
  return request('/api/create/role',{method:'POST',body:params})
}

export function updateRole(params) {
  return request('/api/update/role',{method:'POST',body:params})
}

export function deleteRole(params) {
  return request('/api/delete/role',{method:'POST',body:params})
}

export async function  roleListEmployee(params) {
  return await request('/api/get/role-list',{method:'GET'})
}

// ****END ROLE API **** 


// ****START STREAM API **** 
export async function  streamList(params) {
  return await request('/api/getAll/stream-list',{method:'POST',body:params})
}

export function createstream(params) {
  return request('/api/create/stream',{method:'POST',body:params})
}

export function updatestream(params) {
  return request('/api/update/stream',{method:'POST',body:params})
}

export function deletestream(params) {
  return request('/api/delete/stream',{method:'POST',body:params})
}

export async function  streamListStudent(params) {
  return await request('/api/get/stream-list',{method:'GET'})
}

// ****END STREAM API **** 


// ****START CLASS API **** 
export async function  classList(params) {
  return await request('/api/getAll/class-list',{method:'POST',body:params})
}

export function createclass(params) {
  return request('/api/create/class',{method:'POST',body:params})
}

export function updateclass(params) {
  return request('/api/update/class',{method:'POST',body:params})
}

export function deleteclass(params) {
  return request('/api/delete/class',{method:'POST',body:params})
}


// ****END STREAM API **** 

// ****START LUNCH API **** 
export async function  lunchAllList(params) {
  return await request('/api/getAll/lunch-list',{method:'POST',body:params})
}

export function createlunch(params) {
  return request('/api/create/lunch',{method:'POST',body:params})
}

export function updatelunch(params) {
  return request('/api/update/lunch',{method:'POST',body:params})
}

export function deletelunch(params) {
  return request('/api/delete/lunch',{method:'POST',body:params})
}

export async function  getLunchList(params) {
  return await request('/api/get/lunch-list',{method:'POST' ,body:params})
}

// ****END LUNCH API **** 


// ****START ANNOUNCEMENT API **** 
export async function  announcementAllList(params) {
  return await request('/api/getAll/announcement-list',{method:'POST',body:params})
}

export function createannouncement(params) {
  return request('/api/create/announcement',{method:'POST',body:params})
}

export function updateannouncement(params) {
  return request('/api/update/announcement',{method:'POST',body:params})
}

export function deleteannouncement(params) {
  return request('/api/delete/announcement',{method:'POST',body:params})
}


// ****END ANNOUNCEMENT API **** 


// ****START SUBJECT API **** 
export async function  subjectAllList(params) {
  return await request('/api/getAll/subject-list',{method:'POST',body:params})
}

export function createsubject(params) {
  return request('/api/create/subject',{method:'POST',body:params})
}

export function updatesubject(params) {
  return request('/api/update/subject',{method:'POST',body:params})
}

export function deletesubject(params) {
  return request('/api/delete/subject',{method:'POST',body:params})
}

export async function  getsubjectList(params) {
  return await request('/api/get/subject-list',{method:'POST' ,body:params})
}
// ****END SUBJECT API **** 



// ****START TIME TABLE API **** 
export function getTimeTableList(params){
  return request('/api/getAll/time-table-list',{method:'POST', body:params});
}

export function createTimeTable(params) {
  return request('/api/create/time-table',{method:'POST', body:params});
}

export function detailTimeTable(params) {
  return request('/api/get-time-table?slug='+params,{method:'GET'});
}

export function editTimeTable(params) {
  return request('/api/update/time-table',{method:'PUT', body:params});
}

export function deleteTimeTable(params) {
  return request('/api/delete/time-table?slug='+params,{method:'DELETE'});
}
// ****END TIME TABLE API **** 


// ****START PLAN API **** 
export async function  planAllList(params) {
  return await request('/api/getAll/plan-list',{method:'POST',body:params})
}

export function createplan(params) {
  return request('/api/create/plan',{method:'POST',body:params})
}

export function updateplan(params) {
  return request('/api/update/plan',{method:'POST',body:params})
}

export function deleteplan(params) {
  return request('/api/delete/plan',{method:'POST',body:params})
}

export async function  getplanList(params) {
  return await request('/api/get/plan-list',{method:'POST' ,body:params})
}

export async function  getUserPlanList(params) {
  return await request('/api/get/user-plan-list',{method:'POST' ,body:params})
}

// ****END PLAN API **** 












