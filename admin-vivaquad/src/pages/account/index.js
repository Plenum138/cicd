import React, {useState, Component, useEffect } from 'react';
import Apploader from './../../components/loader/loader'
import { connect } from 'dva';
import moment from 'moment';
import {Row, Col, Form, Input, Button,DatePicker, Card, Radio, Modal, Upload, message, Avatar, Image  } from 'antd';
import UploadImages from '../../components/sharing/upload-images'
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_ApiUrl;

const dateFormat = 'MM/DD/YYYY';

const Account = props => {
	const [count, setCount] = useState(0)
	const [dcount, setDcount] = useState(0)
	const [imagesList, setImagesList] = useState([]);
	const [visible, setVisible] = useState(false);
	const [userId, setUserId] = useState('');
	const [avatar, setAvatar] = useState('');
	const [detailData, setDetailData] = useState({})
	const role = useState(localStorage.getItem('role'))
	const { dispatch } = props;
	const [form] = Form.useForm();
	const [myMobileNoOTP, setMyMobileNoOTP] = useState('');

	const [modalVisible, setModalVisible] = useState(false);
	let user_data = JSON.parse(localStorage.getItem('user'));
	const [myMobileNo, setMyMobileNo] = useState('');
	const [isMobileVerify, setIsMobileVerified] = useState(false);
	const [modalVerifyVisible, setModalVerifyVisible] = useState(false);

	const openModalForVerify = () => {
		let val = { mobile_number:myMobileNo };
		dispatch({ type: 'setting/resendOTPTOUser', payload: val, });
		setModalVerifyVisible(true);
	}


	const convertToFormData = (val) => {
		const formData = new FormData();
	
		for(const key in val) {

				formData.append(key,val[key])
			
		}
		if(imagesList.length > 0 && imagesList[0].file) {
		
			formData.append("file",imagesList[0].file);
		}  
	
		return formData;
	}


	useEffect(() => {
		let mobile_verified = localStorage.getItem('isMobileVerified');
		if(mobile_verified == 'false' || mobile_verified == false) {
			setIsMobileVerified(false);
		}else {
			setIsMobileVerified(true);
		}
	}, [])


	const handleCancel = () => {
		setModalVisible(false);
		setModalVerifyVisible(false);
	}

	const changeMobileOTP = (event) =>{
		setMyMobileNoOTP(event.target.value);
	}

	const addMobileVerify = async () => {

		let data = {
			otp : myMobileNoOTP, 
			mobile: myMobileNo,
		};
		
		const res = await axios.post(`${baseUrl}/is-mobile/verified`,  data);
		if(res.data.status === true) {
			alert(res.data.message);
			localStorage.setItem('isMobileVerified', true);
			setModalVerifyVisible(false);
			setIsMobileVerified(true);
		}else {
			alert(res.data.message);
			return; 
		}
		// console.log(res);	
	}


	useEffect(() => {
		let myMobileNo = user_data.mobile;
		setMyMobileNo(myMobileNo);

		let unmounted = false;
		setTimeout(()=>document.title = 'Setting', 100);
		dispatch({type: 'account/clearAction'});
		setUserId(localStorage.getItem('userId'))
		getDetail(localStorage.getItem('userId'))
		return () => {
			unmounted = true;
		}
    },[dispatch])

	const getDetail=(id)=> dispatch({ type: 'account/getDetail',  payload: { _id:id, profile_id: id },});
	
	useEffect(() => {

		let unmounted = false;
		let detail = props.account.detail;	
		if(!unmounted && detail.count > dcount && detail.status){
			setDcount(detail.count);
			let profile_data = props.account.detail ? props.account.detail.profile : {};
			let userLoginData = props.account.detail ? props.account.detail.userLogin : {};
			setDetailData(userLoginData);
			if(userLoginData.roles === 'SUBADMIN'){
				setAvatar(profile_data?.schoolDetail?.media);
					form.setFieldsValue({
				  ['school_name']:profile_data?.schoolDetail?.school_name, 
				  ['address']: profile_data?.schoolDetail?.address, 
				
			});
		
		
		


			}else{
				setAvatar(userLoginData.avatar);

			}
		console.log(profile_data)

		
			form.setFieldsValue({
				  ['name']: userLoginData.username, 
				  ['email']: userLoginData.email, 
				  ['mobile_number']: profile_data.mobile_number, 
				
			});
		}
		
		let edit = props.account.edit;		
		if(!unmounted && edit.count > count && edit.status){
			setCount(edit.count);
			getDetail(userId);
		}else if(!unmounted && edit.count > count && !edit.status){
			setCount(edit.count);
		}
		
		return () => {
			unmounted = true;
		}
    },[props.account])
	
	
	const verifyFormFun = val =>{
		getDetail(userId);
	}

	

	const onFinish = val =>{
		

	



		let values = {
			"name": val.name ,
			"email": val.email,
			"phone": val.mobile_number,
			"school_name" : val.school_name, 
			"address" : val.address, 
		}
		console.log('onFinish',val);
		const formData = convertToFormData(values);
		console.log("formData" , formData)

	
		dispatch({ type: 'account/editItem',  payload: formData , history : props});
	}
	
	const handlePostal = async (e) =>{
		let value = e.target.value;

		

		if(value.length === 6) {
			
			const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`)


			if(res.data[0].PostOffice != null && res.data[0].PostOffice != undefined && res.data[0].PostOffice != "") {

				let pincode_data = res.data[0].PostOffice[0];
				form.setFieldsValue({
					city:pincode_data.District,
					state: pincode_data.State,
				});
			}
		}
	  }


	  console.log('detailData',detailData?.roles === "SUBADMIN")

  return (
	<div>
		<Apploader show={props.loading.global}/>
		<Card style={{ width: '100%' }} title="Account" bodyStyle={{padding:'20px 20px'}}>
		<Image
			width={200}
			height={200}
			src={avatar === null || avatar === undefined ? 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' : avatar}
			/>
			<Form name="normal_login" form={form} className="full-width-form" initialValues={{ remember: true, }} onFinish={onFinish} layout={'vertical'}>
				<Row gutter={16}>
				
					<Col  xs={24} sm={24} md={12}>
						<Form.Item name="name" label="Name" rules={[ { required: true, message: 'Please input your Name!', }, ]} >
						<Input placeholder="Name" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="email" label="Email" rules={[ { required: true, message: 'Field required!', }, ]} >
						<Input placeholder="Email" disabled/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						

							<Form.Item label="Mobile Number">
								<Row gutter={12}>
									<Col xs={24} span={12}>
										<Form.Item name="mobile_number" rules={[{ required: true, message: 'Field required!', },]}  >
											<Input disabled placeholder="mobile_number"  />
										</Form.Item>
									</Col>
									{/* <Col  xs={12} span={12}>	
									{ (isMobileVerify === true) ? '' :
										<Button type="primary" className="btn-w25 mobile_verify_btn" onClick={openModalForVerify} >Verify</Button>
									} 
									</Col> */}
								</Row>
							</Form.Item>

					</Col>
{detailData?.roles === "SUBADMIN" &&
<>
<Col  xs={24} sm={24} md={12}>
						<Form.Item name="school_name" label="School Name" rules={[ { required: true, message: 'Please input your school name!', }, ]} >
						<Input placeholder="Enter School Name" />
						</Form.Item>
					</Col>
					
				
					
			

				

			<Col  xs={24} sm={24} md={12}>
						<Form.Item name="address" label="School Address" rules={[ { required: true, message: 'Please input your school address!', }, ]} >
						<Input placeholder="Enter School Address" />
						</Form.Item>
					</Col>


					<Col  xs={24} sm={24} md={12}>
						<Form.Item name="thumbnail" 
						label={<><span> School Logo </span> </>} 

						>
							{imagesList.length >0 && imagesList.map((item, index) => 
								item.urls ? <Avatar key={index} shape="square" size={150} src={item.urls } style={{margin:5}} /> :
								<Avatar key={index} shape="square" size={150} src={process.env.REACT_APP_ApiUrl+'/'+ item.url} style={{ margin: 5 }} />
							)}
						
							{imagesList.length > 0 ? <span><br /><Button onClick={() => setImagesList([])}>Remove</Button>&nbsp;&nbsp;</span> : ''}
							{imagesList.length === 0 && <Button onClick={() => setVisible(true)}> Upload Logo </Button>}
						</Form.Item>
					</Col></>
}


					

				</Row>
				
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button bg-success border-0">Update</Button>
					
				</Form.Item>
				</Form>
			
        </Card>





		<Modal
			width={400}
			visible={modalVerifyVisible}
			title='Verify Your Mobile'
			footer={null}
			onCancel={handleCancel} >
				
				<div style={{ textAlign:'center',marginBottom: '1rem'}}>
              		A OTP ( One Time Password ) has been sent to <b>{ myMobileNo }</b> . Please enter the OTP in the field below to verify. 
				</div>
				<Form className="login-form" >
					<Form.Item name="otp" rules={[ { required: true, message: 'Please input your Otp!', }, ]} >
						<Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={(e) => changeMobileOTP(e)} placeholder="OTP Enter Here!" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button" onClick={() => addMobileVerify()}> Verify </Button>
					</Form.Item>
				</Form>
		</Modal>

		{
			visible && 
			<UploadImages visible={visible} closeFun={() => setVisible(false)} 
			returnImg={
				val => 
				{ 
					setImagesList(val);
				}} 
				resetVal={imagesList} limit={5 - imagesList.length}  aspect={9/12}
			 />}
	</div>
  );
};

export default connect(({account, loading}) => ({
	account, loading
}))(Account);