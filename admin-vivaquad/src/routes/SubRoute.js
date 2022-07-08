import React, { Component, Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'dva/router';

//DASHBOARD
import Dashboard from '../pages/dashboard/dashboard';


//STUDENT MANAGMENT
import StudentList from '../pages/students/list';
import AddEditStudent from '../pages/students/action/addEdit';

//SCHOOL MANAGMENT
import SubAdminList from '../pages/subadmin/list';
import AddEditSubAdmin from '../pages/subadmin/action/addEdit';

//EMPLOYEE MANAGMENT
import EmployeeList from '../pages/employees/list';
import AddEditEmployee from '../pages/employees/action/addEdit';
import ViewEmployee from '../pages/employees/action/view';


//ACCOUNT
import Account from '../pages/account/index';

//PAGES(CMS) 
import PagesList from '../pages/pages/list';
import AddEditPages from '../pages/pages/action/addEdit';

//SETTINGS
import SiteSetting from '../pages/site-setting/list';
import Setting from '../pages/setting/setting';

//EMPLOYEE ROLE
import RoleList from '../pages/roles/list';

//STREAM
import StreamList from '../pages/stream/list';

//CLASS 
import ClassList from '../pages/class/list';

//LUNCH HOLL
import LunchHallList from '../pages/lunch/list';

//ANNOUNCEMENT HOLL
import AnnouncementList from '../pages/announcement/list';

//ANNOUNCEMENT HOLL
import SubjectList from '../pages/subject/list';

//PAGES(CMS) 
import TimeTableList from '../pages/time_table/list';
import AddEditTimeTable from '../pages/time_table/action/addEdit';
import PaymentPage from '../pages/payments/payment';


//SUBSCRIPTIONS PLAN
import PlanList from '../pages/plan/list';
import UserPlanList from '../pages/plan/userplanlist';



function hasAdmin() {
	let role = localStorage.getItem('role');
	if (role === "ADMIN") {
		return true;
	}
	else { return false }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			hasAdmin() ? (<Component {...props} />) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
		}
	/>
);

class SubRoute extends Component {


	render() {
		return (
			<div>
				{/* Dashboard */}
				<Route exact name="Dashboad" breadcrumbName="Dashboad" path={'/'} component={Dashboard} />

				{/*START Student Routes */}
				<Route exact path='/students' component={StudentList} />
				<Route exact path='/student/edit/:id' component={AddEditStudent} />
				{/*End Student Routes */}

				{/*START Student Routes */}
				<PrivateRoute exact path='/subadmins' component={SubAdminList} />
				<PrivateRoute exact path='/subadmin/edit/:id' component={AddEditSubAdmin} />
				{/*End Student Routes */}

				{/*START Employee Routes */}
				<Route exact path='/employees' component={EmployeeList} />
				<Route exact path='/employee/edit/:id' component={AddEditEmployee} />
				<Route exact path='/employee/add' component={AddEditEmployee} />
				<Route exact path='/employee/view/:id' component={ViewEmployee} />
				{/*End Employee Routes */}

				{/* ACCOUNT ROUTES */}
				<Route exact path={"/account"} component={Account} />
				{/* END ROUTES */}

				{/*START PAGE ROUTES */}
				<Route exact path={"/pages"} component={PagesList} />
				<Route exact path={"/pages/add"} component={AddEditPages} />
				<Route exact path='/pages/edit/:id' component={AddEditPages} />
				{/*END PAGE ROUTES */}


				{/* SETTING ROUTES */}
				<Route exact path={`/settings`} component={SiteSetting} />
				<Route exact path={`/setting`} component={Setting} />
				{/* END SETTING ROUTES */}

				{/* EMPLOYEE ROLE ROUTES */}
				<PrivateRoute exact path='/roles' component={RoleList} />
				{/* END ROUTES */}

				{/*STREAM ROUTES */}
				<PrivateRoute exact path='/streams' component={StreamList} />
				{/* END ROUTES */}

				{/*STREAM ROUTES */}
				<Route exact path='/classes' component={ClassList} />
				{/* END ROUTES */}

				{/*LUNCH HALL ROUTES */}
				<Route exact path='/lunches' component={LunchHallList} />
				{/* END ROUTES */}

				{/*AnnouncementList ROUTES */}
				<Route exact path='/announcements' component={AnnouncementList} />
				{/* END ROUTES */}

				{/*Subject ROUTES */}
				<Route exact path='/subjects' component={SubjectList} />
				{/* END ROUTES */}

				{/*START PAGE ROUTES */}
				<Route exact path={"/time-tables"} component={TimeTableList} />
				<Route exact path={"/time-table/add"} component={AddEditTimeTable} />
				<Route exact path='/time-table/edit/:id' component={AddEditTimeTable} />
				{/*END PAGE ROUTES */}

				{/* <Route exact path='/stripe-payment' component={PaymentPage} /> */}

				{/*LUNCH HALL ROUTES */}
				<Route exact path='/plans' component={PlanList} />
				<Route exact path='/user-plans' component={UserPlanList} />

				{/* END ROUTES */}

			</div>



		);
	}
}

export default SubRoute;