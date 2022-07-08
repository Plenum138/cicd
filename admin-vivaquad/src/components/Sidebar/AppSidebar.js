import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './AppSidebar.less'
import {DashboardOutlined, BarsOutlined, CoffeeOutlined, CodeOutlined, TeamOutlined, SubnodeOutlined, MoneyCollectOutlined, BankOutlined, NotificationOutlined, BellOutlined, SettingOutlined, UserOutlined, ContactsOutlined ,AppstoreOutlined, UserAddOutlined, SnippetsOutlined, BookOutlined, InboxOutlined, MessageOutlined ,CalendarOutlined  } from '@ant-design/icons';
import { Menu, } from 'antd';
import axios from 'axios';
import {Modal} from 'antd';
const { SubMenu } = Menu;
const baseUrl = process.env.REACT_APP_ApiUrl;
const menu = [
	{ path: '/', name: 'Dashboard', icon: <DashboardOutlined />, auth: ['ADMIN' , 'SUBADMIN'] },
	{
		path: '#', name: 'Student Managment', icon: <TeamOutlined />, auth: ['ADMIN' , 'SUBADMIN'], children: [
			{ path: '/students', name: 'Student List', icon: <TeamOutlined />, auth: ['ADMIN' , 'SUBADMIN'] },
		]
	},
	{
		path: '#', name: 'Sub Admin Managment', icon: <TeamOutlined />, auth: ['ADMIN'], children: [
			{ path: '/subadmins', name: 'Sub Admin List', icon: <TeamOutlined />, auth: ['ADMIN'] },
		]
	},
	{
		path: '#', name: 'Employee Managment', icon: <TeamOutlined />, auth: ['SUBADMIN'], children: [
			{ path: '/employees', name: 'Employee List', icon: <TeamOutlined />, auth: ['SUBADMIN'] },
		]
	},
	{
		path: '#', name: 'Class Management', icon: <TeamOutlined />, auth: [ 'SUBADMIN'], children: [
			{ path: '/time-tables', name: 'Time Table', icon: <CalendarOutlined />, auth: [ 'SUBADMIN'] }, 

			// { path: '/settings', name: 'Settings', icon: <CodeOutlined />, auth: ['ADMIN'] }, 
			
			
			
		]
	},
	{
		path: '#', name: 'Master', icon: <TeamOutlined />, auth: ['ADMIN' ,'SUBADMIN'], children: [
			{ path: '/roles', name: 'Employee Role', icon: <UserOutlined />, auth: ['ADMIN'] }, 
			{ path: '/streams', name: 'Streams', icon: <BookOutlined />, auth: ['ADMIN'] }, 
			{ path: '/classes', name: 'Class', icon: <BarsOutlined />, auth: ['SUBADMIN'] }, 
			{ path: '/lunches', name: 'Lunch Hall', icon: <CoffeeOutlined />, auth: ['SUBADMIN'] }, 
			{ path: '/subjects', name: 'Subject', icon: <SubnodeOutlined />, auth: ['SUBADMIN'] }, 





			
		]
	},

	{
		path: '#', name: 'Brodecasting Management', icon: <TeamOutlined />, auth: [ 'SUBADMIN'], children: [
			{ path: '/announcements', name: 'Announcement', icon: <NotificationOutlined />, auth: [ 'SUBADMIN'] }, 

			// { path: '/settings', name: 'Settings', icon: <CodeOutlined />, auth: ['ADMIN'] }, 
			
			
			
		]
	},

	{
		path: '#', name: 'CMS Management', icon: <TeamOutlined />, auth: ['ADMIN' ], children: [
			{ path: '/pages', name: 'Pages', icon: <CodeOutlined />, auth: ['ADMIN' ] }, 

			// { path: '/settings', name: 'Settings', icon: <CodeOutlined />, auth: ['ADMIN'] }, 
			
			
			
		]
	},
	{
		path: '#', name: 'Subscription Plan', icon: <MoneyCollectOutlined />, auth: ['ADMIN' ], children: [
			{ path: '/plans', name: 'Plan List', icon: <MoneyCollectOutlined />, auth: ['ADMIN' ] }, 
			{ path: '/user-plans', name: 'Subscription User', icon: <UserOutlined />, auth: ['ADMIN' ] }, 


			// { path: '/settings', name: 'Settings', icon: <CodeOutlined />, auth: ['ADMIN'] }, 
			
			
			
		]
	},
	
	
	
]

class AppSidebar extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  maintenanceModeModal: false ,
		  isVerify: false

		}
	  }
	  
	componentDidMount() {
		this.getSiteSettingData();	
	}
	
getSingleSettingData = (cards, id) => {
		let result;
		if (cards != undefined) {
			cards.map((item, key) => {
				if (item.option === id) {
					result = item.value;
				}
			})
		}
		return result;
	};

	getSiteSettingData = async () => {
		try {
		
			let user_id = localStorage.getItem('userId');
			const res = await axios.post(`${baseUrl}/api/list/setting`, { _id: user_id });
			let settings = res?.data?.settings;
			let userStatus = this.getSingleSettingData(settings, 'userStatus');
			let maintenanceMode = this.getSingleSettingData(settings, 'SELLER_WEB_UNDER_MAINTENANCE');		
			let user_detail =  res?.data?.user_detail;
			let user_status =  res?.data?.user_detail?.user_status;

			this.setState({isVerify : user_status})
			console.info('user_status' ,user_status)
	
		} catch (e) {
			console.log(e);
		}
	};
	handleRedirect = (path) => {

	let user_role  = localStorage.getItem('role');
	if(user_role != "ADMIN") {
		this.getSiteSettingData();
	}
	this.props.history.push(path)
}

	render() {
		const { location } = this.props;
		const pathSnippets = location.pathname.split('/').filter(i => i);
		const pathval = pathSnippets[pathSnippets.length - 1] || '';
		const routepath = pathval ? '/' + pathval : '/';
		return (
			<>
			<Menu mode="inline" defaultSelectedKeys={[routepath]}
				defaultOpenKeys={['']} selectedKeys={[routepath]} theme="dark">
				 
				{menu.map((item) => {
				
					if (item.auth.find(val => val === localStorage.getItem('role')) && this.state.isVerify) {
						
						if(item.children){
							return ( <SubMenu className="submenu"  key={item.name} title={item.name} >
									{ item.children.map((itemd, index) => {

										if (itemd.auth.find(val => val === localStorage.getItem('role'))) {
											return ( <Menu.Item  key={itemd.path}>
												<a onClick={() => { this.handleRedirect(itemd.path) }}>
													{itemd.img ? <img src={itemd.img} alt={itemd.name} /> : itemd.icon}	
													<span style={{ marginLeft: '5' }}>
														{itemd.name} 
													</span>
													</a>
												</Menu.Item> )
											}
									})	}	
							</SubMenu> )
						}else{
							return (<Menu.Item key={item.path}><a 
							// to={item.path}
							onClick={() => { this.handleRedirect(item.path) }}
							>
								{item.img ? <img src={item.img} alt={item.name} /> : item.icon}
								<span style={{ marginLeft: '5' }}>

								{item.name}
								</span>
								</a></Menu.Item>);
						}
					}
				})
				}
			</Menu>




</>
		);
	}
}
export default AppSidebar;
