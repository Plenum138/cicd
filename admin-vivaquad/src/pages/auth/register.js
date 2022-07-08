import React, { useState, Component, useEffect } from 'react';
import Apploader from './../../components/loader/loader'
import { Redirect, Route } from 'react-router';
import { UserOutlined, LockOutlined, MailOutlined, MobileOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import UploadImages from './../../components/upload-images/index'


//import styles from './login.less';

import { Modal, Row, Col, Form, Input, Button, Avatar, message, Select, Checkbox, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const formRef = React.createRef();


const AppRegister = (props) => {
	const [count, setCount] = useState(0);
	const [visible, setVisible] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [imagesList, setImagesList] = useState([]);
	const [form] = Form.useForm();


	const handelPassword = () => {
		setShowPassword(!showPassword);

	}

	const updateImageData = val => {
		setImagesList(val);
		form.setFieldsValue({ images: [] });

	}
	const onFinish = values => {

		if (imagesList.length === 0) {
			return message.error("please upload logo");
		}
		values.images = imagesList;
		values.roleType = "SUBADMIN";
		localStorage.setItem("flow", 'reg');
		localStorage.setItem("user_email", values.email);
		const formData = new FormData();
		formData.append("school_name", values.school_name)
		formData.append("roleType", values.roleType)
		formData.append("password", values.password)
		formData.append("owner_name", values.owner_name)
		formData.append("mobile_number", values.mobile_number)
		formData.append("images", values.images[0].file)
		formData.append("email", values.email)
		formData.append("address", values.address)
		props.dispatch({ type: 'auth/register', payload: formData, });

	};

	useEffect(() => {
		let unmounted = false;
		setTimeout(() => document.title = 'register', 100);
		let register = props.auth.reg;
		if (!unmounted && register.action && register.action.status === true && register.action.count > count) {
			setCount(register.action.count)
			props.dispatch({ type: 'auth/registerSuccess' });
			formRef.current.setFieldsValue({ ['name']: '', ['email']: '', ['mobile_number']: '', ['username']: '', ['password']: '', ['gstin']: '', ['fssai']: '' });
			setTimeout(() => {
				Modal.success({
					content: ('Registered Successfully! Vivaquad team will contact you soon'),
					onOk() {
						props.history.push('/verify')
					}
				});
			}, 300)
		}
		return () => {
			unmounted = true;
		}
	}, [props.auth.reg])

	useEffect(() => {
		let unmounted = false;
		let response = [];
		let alrdreg = props.auth.alrdreg;
		if (alrdreg.action && alrdreg.action.status === false) {
			props.dispatch({ type: 'auth/alrdregisterSuccess' });
			props.dispatch({ type: 'auth/alrdreg', ...response });
			props.history.push('/login');
		}
		return () => {
			unmounted = true;
		}
	}, [props.auth.alrdreg])


	return (
		<div>
			<Apploader show={props.loading.global} />
			<Row type="flex" className={"basicpage"} justify="space-around" align="middle" style={{ minHeight: '100vh' }}>
				<Col className="basicbox ">
					<div className="mainimg registerimg basicbox_height"></div>
					<div className="mainform mobile_mainform">

						<Form ref={formRef} layout={'vertical'} name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish} >
							<Form.Item name="owner_name" rules={[
								{
									required: true,
									message: 'Please input owner name!'
								},
								{
									pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
									message: 'letters and digits, with hyphens, underscores and spaces as internal separator'
								},
								{ max: 25, message: 'owner name must not be greater than 25 characters.' },

							]} >
								<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter owner name" />
							</Form.Item>
							<Form.Item name="school_name" rules={[
								{
									required: true,
									message: 'Please input school name!'
								},

								{ max: 50, message: 'school name must not be greater than 50 characters.' },

							]} >
								<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter school name" />
							</Form.Item>
							<Form.Item name="email" rules={[
								{
									required: true,
									message: 'Please input your Email!'
								},
								{
									type: 'email',
									message: 'The input is not valid E-mail!',
								},
							]} >
								<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
							</Form.Item>
							<Form.Item name="mobile_number" rules={[
								{
									required: true,
									message: 'Please input your Phone Number!',
								},
								{
									pattern: /^[0-9]+$/,
									message: 'Need to enter number'
								},
								{
									len: 10,
									message: 'Phone number should be 10 digits long.'
								},
							]} >
								<Input type="tel" prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
							</Form.Item>
							<Form.Item name="address" rules={[
								{
									required: true,
									message: 'Please input address!'
								},

								{ max: 100, message: 'address must not be greater than 100 characters.' },

							]} >
								<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter school address" />
							</Form.Item>

							<Form.Item name="password" rules={[
								{
									required: true,
									message: 'Please input your Password!',
								},
								{
									pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
									message: 'Minimum eight characters, at least one letter, one number and one special character:'
								}
							]} >
								<Input prefix={<LockOutlined className="site-form-item-icon" />}
									type={showPassword ? 'text' : 'password'}
									placeholder="Password"
									suffix={showPassword ? <EyeTwoTone onClick={handelPassword} /> : <EyeInvisibleOutlined onClick={handelPassword} />}

								/>
							</Form.Item>

							{/* <Form.Item name="images" label={<span><span style={{color:'#ff4d4f'}}>* </span>Upload Logo</span>} rules={[{ required: false, message: 'Field required!', }, ]}  >
			{imagesList.map((item,index)=>
			{
				console.log(item)
			return <Avatar key={index} shape="square" size={150} src={item.urls || item} style={{margin:5}} />
			 }
			 )}
			{imagesList.length>0?<br/>:''}
			<Button onClick={()=>setVisible(true)}> Upload Logo </Button>
		</Form.Item>		 */}
							<div className="mb-3">
								{imagesList.map((item, index) => {
									console.log(item)
									return <Avatar key={index} shape="square" size={80} src={item.urls || item} style={{ marginBottom: '2px' }} />
								}
								)}
								{imagesList.length > 0 ? <br /> : ''}
								{imagesList.length > 0 ? <Button className="upload_logo" onClick={() => setVisible(true)}> Edit Logo </Button> : <Button className="upload_logo" onClick={() => setVisible(true)}> Upload Logo </Button>}
							</div>

							<Form.Item>
								<Button type="primary" htmlType="submit" className="login-form-button mobile-register-form-button"> Sign Up </Button> <br /><br />
								Or <span onClick={() => props.history.push('/')}><a href="#" className="mobile-register-already">Already have a account!</a></span>
							</Form.Item>
						</Form>
						<UploadImages visible={visible} closeFun={() => setVisible(false)} returnImg={val => updateImageData(val)} resetVal={imagesList} aspect={9 / 12} />
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default connect(({ auth, loading }) => ({
	auth, loading
}))(AppRegister);
