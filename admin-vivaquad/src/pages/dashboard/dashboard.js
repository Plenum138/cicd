// import React, {useState, Component, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import React, {useState, Component, useEffect } from 'react';
import Apploader from './../../components/loader/loader'
import { connect } from 'dva';
import {Row, Col, Form, Input, Button, Avatar, Card, Descriptions, Statistic, Collapse , Alert} from 'antd';
const { Panel } = Collapse;

const Dashboard = (props) => {
	
	const { dispatch } = props;
	const [details, setDetails] = useState([{}])
	const [role, setRole] = useState('')
	const [userId, setUserId] = useState('')
	const [countData, setCountData] = useState({})
	const [detailData, setDetailData] = useState({});
	const [verified, setVerified] = useState(false);



	
	
	useEffect(() => {
		let unmounted = false;
		setTimeout(()=>document.title = 'Dashboard', 100);
        getDashbordDetail(props.countData);
        setRole(localStorage.getItem('role'))
		setUserId(localStorage.getItem('userId'))
		return () => {
			unmounted = true;
		}
    },[dispatch])
	
	const getDashbordDetail = async (id) => {
        let user_id = localStorage.getItem('userId');
        let userId = localStorage.getItem('userId');



		dispatch({ type: 'account/getDashbordDetail',  payload: { start_date:"" , user_id:userId },});
	}
	
	useEffect(() => {
		let detail = props.account.dashborddetail;
		setDetails(detail.countData)
		console.log(detail.countData)
		setDetailData(detail)
		setVerified(detail.countData && detail.countData.get_UserInfo.user_status)
console.log(detail.countData && detail.countData.get_UserInfo.user_status)	



	},[props.account])
	  

	  
  return (
	

	<div>
		<Apploader show={props.loading.global}/>
		<Row gutter={15}>
			<Col xs={{ span: 24 }} sm={24} md={24}>
			<Collapse defaultActiveKey={['']}>
				<Panel header={role === "ADMIN"?"Admin Info":"SUB ADMIN Info"} key="1">
				  <Descriptions>
					<Descriptions.Item label="Name">{detailData.countData && detailData.countData.get_UserInfo.username || ''}</Descriptions.Item>
					<Descriptions.Item label="Mobile Number">{detailData.countData && detailData.countData.get_UserInfo.mobile_number || ''}</Descriptions.Item>
					<Descriptions.Item label="Email">{detailData.countData && detailData.countData.get_UserInfo.email || ''}</Descriptions.Item>
					<Descriptions.Item label="Roles">{detailData.countData && detailData.countData.get_UserInfo.roles || ''}</Descriptions.Item>
				  </Descriptions>
				</Panel>
			  </Collapse>
				<br/>
			</Col>
		</Row> 
		{role === 'SUBADMIN' &&
				<Row gutter={15}>
				<Col xs={{ span: 24 }} sm={24} md={24}>
				<Collapse defaultActiveKey={['']}>
					<Panel header={'School Info'} key="1">
					  <Descriptions>
						<Descriptions.Item label="School Name">{detailData.countData && detailData.countData.get_UserInfo.schoolInfo.school_name || ''}</Descriptions.Item>
						<Descriptions.Item label="School Address">{detailData.countData && detailData.countData.get_UserInfo.schoolInfo.address || ''}</Descriptions.Item>
					  </Descriptions>
					  <Avatar shape="square" size={160} src={detailData?.countData?.get_UserInfo?.schoolInfo?.media} style={{marginBottom: '2px'}} />
					</Panel>
				  </Collapse>
					<br/>
				</Col>
			</Row> }

		<Row gutter={15} className="mobile_dashboard">
		{role == 'ADMIN' ? 
				<Col xs={{ span: 12 }} sm={12} md={8}>
					<Card><Statistic title="Total Users" value={details && details.GetTotalUsers} /></Card><br/>
				</Col>: verified &&
				<>
				<Col xs={{ span: 12 }} sm={12} md={8}>
					<Card><Statistic title="Total Students" value={details && details.Total_Student} /></Card><br/>
				</Col>

				<Col xs={{ span: 12 }} sm={12} md={8}>
					<Card><Statistic title="Total Employees" value={details && details.Total_Employee} /></Card><br/>
				</Col>
				</>
			
				 } 

			{/* {role == 'ADMIN' ? 
				<Col xs={{ span: 12 }} sm={12} md={8} >
					<Card><Statistic title="Active Users" value={countData.get_Total_Active_Users} /></Card><br/>
				</Col>: '' } */}
			{/* {role == 'ADMIN' ? 
				<Col xs={{ span: 12 }} sm={12} md={8}>
					<Card><Statistic title="Visitor" value={countData.get_Total_Visitor}/></Card><br/>
				</Col>: '' }
			{role == 'ADMIN' ? 
				<Col xs={{ span: 12 }} sm={12} md={8}>
					<Card><Statistic title="Feedback" value={countData.get_Total_Feedback} prefix={<LikeOutlined />} /></Card><br/>
				</Col>: '' }
			{role == 'ADMIN' ? 
				<Col xs={{ span: 12 }} sm={12} md={8}>
					<Card><Statistic title="Total Seller" value={countData.get_Total_Seller} /></Card><br/>
				</Col>: '' }
		
			<Col xs={{ span: 12 }} md={8}>
				<Card><Statistic title="Total Product" value={countData.GetTotalProducts} /></Card><br/>
			</Col>
			<Col xs={{ span: 12 }} md={8}>
				<Card><Statistic title="Total Order" value={countData.get_Total_Orders} /></Card><br/>
			</Col>
			<Col xs={{ span: 12 }} md={8}>
				<Card><Statistic title="Total Cancel Order" value={countData.get_Cancel_Orders} /></Card><br/>
			</Col>
			<Col xs={{ span: 12 }}  md={8}>
				<Card><Statistic title="Total Refund Order" value={countData.get_Total_Refund_Orders} /></Card><br/>
			</Col>
			
			<Col xs={{ span: 12 }} xs={{ span: 12 }}  md={8}>
				<Card>
				  <Statistic
					title="Today Sale"
					value={countData.get_ToDay_Sale}
					precision={2}
					valueStyle={{ color: '#3f8600' }}
					prefix={<ArrowUpOutlined />}
					suffix="%"
				  />
				</Card><br/>
			</Col>
			<Col xs={{ span: 12 }}  md={8}>
				<Card>
				  <Statistic
					title="Today Return Products"
					value={countData.get_ToDay_Return_Order}
					precision={2}
					valueStyle={{ color: '#cf1322' }}
					prefix={<ArrowDownOutlined />}
					suffix="%"
				  />
				</Card><br/>
			</Col> */}
		</Row>
		     {role !== 'ADMIN' &&    !verified &&  <Alert
				message="Account Not Activated"
				description={"Your request is received by Vivaquad verification team, our team is verifying your details and you will notified as soon as your account will be verified."}
				type="error"
				/>}
		
	
		
	</div>
  );
};

export default connect(({account, loading}) => ({
	loading, account
}))(Dashboard);


