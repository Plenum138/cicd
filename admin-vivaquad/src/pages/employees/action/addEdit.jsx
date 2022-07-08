import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Row, Col, Empty, Modal, Card, Typography, Alert, Form, Input, Checkbox, Button, Space, Upload, Dropdown, Menu, Select, notification, Transfer, DatePicker, Avatar, message, InputNumber } from 'antd';
import { LeftOutlined, LoadingOutlined, MailOutlined, CloseOutlined, PlusOutlined, MinusCircleOutlined ,MobileOutlined } from '@ant-design/icons';
import CropImage from '../../../components/sharing/crop-image'
import TextEditor from '../../../components/sharing/text-editor'
import moment from 'moment';
import { connect } from 'dva';
import MultiImageInput from 'react-multiple-image-input';
const dateFormat = 'MM/DD/YYYY';
const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 24, }, } };
const AddEditEmployee = props => {
	const [form] = Form.useForm();
	let idAdd = props.match.params.id === undefined ? true : false
	const { dispatch } = props;
	const [gallaryImagesList, setGallaryImagesList] = useState([]);
	const [count, setCount] = useState(0)
	const [ecount, setECount] = useState(0)
	const [btnDis, setBtnDis] = useState(false)
	const [galleryImageUriList,setGalleryImageUriList] = useState({});
	let roleList = []
	
    if(props?.roles?.list?.data?.length > 0){
		roleList  =  props?.roles?.list?.data
	}
	console.log('roleList' , roleList)


	useEffect(() => {
		
		let unmounted = false;
		window.scroll(0, 0);
		props.dispatch({ type: 'roles/roleListEmployee', });

		if (props.match.params.id) {
			DetailFun(props.match.params.id)
		} else {
			form.resetFields();
		}
		return () => { unmounted = true; }
	}, [dispatch])

	useEffect(() => {
        let unmounted = false;

		return () => { unmounted = true; }
	}, [props.users])

	const DetailFun = (id) => {
			props.dispatch({type: 'users/getDetail', payload: { _id: id, profile_id: id }});
	}

	const convertToFormData = (values) => {
		let user_id = localStorage.getItem('userId');
		const formData = new FormData();
		formData.append("avatar",values.avatar)
		formData.append("dob",values.dob)
		formData.append("email",values.email)
		formData.append("employee_type",values.employee_type)
		formData.append("mobile_number",values.mobile_number)
		formData.append("username",values.username)
		formData.append("user_id",user_id)	
		return formData;
	}

	const onFinish = val => {
		if(gallaryImagesList.length === 0) {
		  return	message.error('please upload profile image');
		} 
		
		val.avatar = gallaryImagesList[0];
		const formData = convertToFormData(val);


		
		if (props.match.params.id) {
			formData.append('_id',props.match.params.id);

			dispatch({ type: 'users/editEmployee', payload: formData });
		}
		else {
			dispatch({ type: 'users/addEmployee', payload: formData });
		}
	}

	useEffect(() => {	
		let unmounted = false;
		let add = props.users.add
		if (!unmounted && add.count > count && add && add.status) {
            props.dispatch({ type: 'users/clearAction'});
			setBtnDis(false);	
			cancelFun();
			props.history.push('/employees');
		} else if (!unmounted && add.count > count && add && !add.status) {
			setBtnDis(false);
			setCount(add.count);
		}

	// Edit
		let edit = props.users.edit 
		if (!unmounted && edit.count > ecount && edit.status) {
            props.dispatch({ type: 'users/clearAction'});
			setECount(edit.count);
			setBtnDis(false);
			
			cancelFun();
			props.history.push('/employees');
		} else if (!unmounted && edit.count > ecount && !edit.status) {
			setBtnDis(false);
			setECount(edit.count);
		}

		// detail
		if (props.match.params.id) {
			let detail = props.users.detail;
	
			if (!unmounted && detail && detail.status) {
				let data = detail.userLogin;
				form.setFieldsValue({
				 ['username']: data.username, ['email']: data.email, ['mobile_number']: data.mobile_number,['employee_type']: data.employee_type,['dob']: moment(new Date(data.dob) || null, dateFormat)
				});

				let images = [{file : data.avatar }]
				console.log('images' , images)
				setGalleryImageUriList(images.map((galImg) => {
					return galImg.file;
				}));
				setGallaryImagesList(images.map((galImg) => {
					return galImg.file;
				}));


	

			} else if (!unmounted && detail && !detail.status) {
				setBtnDis(false);
			}
		}
		return () => { unmounted = true; }
	


	}, [props.users])

	const cancelFun = () => {
		form.resetFields();	
		props.history.push('/employees');
	}





	  const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);   
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
	
	
	  const onUploadGallery = (data) => {
		const images = Object.values(data).map((image,i) => {
			if(image.startsWith(process.env.REACT_APP_ApiUrl)) {
				return image;
			}else{
				return dataURLtoFile(image,'image_'+i);
			}
		})
		setGalleryImageUriList(data);
		setGallaryImagesList([...images]);
		
	  }

	  


	return (
		<Card title={<span><LeftOutlined onClick={() => props.history.push('/employees')} /> {idAdd ? 'Add Employee' : 'Edit Employee'}</span>} style={{ marginTop: "0" }}>

			<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">
			<Row gutter={15}>
				<Col sm={6} md={6}>
						<Form.Item  label={<span><span style={{ color: 'red' }}>*</span>Profile Images</span>} >
							 <MultiImageInput
									images={galleryImageUriList}
									setImages={onUploadGallery}
									allowCrop = {false}
									theme="light"
									max={1}
									cropConfig={{  minWidth: 10 , maxWidth: 2000  }}
									
    						/>
						</Form.Item>
					</Col>



				</Row>
				<Row gutter={15}>
			


					<Col flex="auto">
						<Row gutter={15}>
							<Col sm={12} md={12}>
								<Form.Item name="username" label="Employee Name" rules={[{ required: true, message: 'This field is required!' },{ max: 25, message: 'Employee Name must not be greater than 25 characters.' }]}  >
									<Input placeholder="Employee Name" />
								</Form.Item>
							</Col>

							<Col sm={12} md={12}>
							<Form.Item name="email" label="Email" rules={[
							{ 
								required: true, 
								message: 'Please input your Email!'
							},
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							}, 
						]} >
						{idAdd ? 
							<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
						:
						<Input disabled prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
						}
					  </Form.Item>
							</Col>
                           
						</Row>
					</Col>
			
				</Row>
				<Row gutter={15}>
				<Col flex="auto">
						<Row gutter={15}>
							<Col sm={12} md={12}>
							<Form.Item name="mobile_number" label="Mobile Number" rules={[ 
						 	{
							required: true,
								message: 'Please input your Mobile Number!', 
							},
							{
								pattern: /^[0-9]+$/,
								message: 'Need to enter number'
							},
							{ 
								len: 10, 
								message: 'Mobile number should be 10 digits long.' 
							},
						]} >

						{idAdd ? 	<Input type="tel"    prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Mobile Number" />
						:
						<Input type="tel" disabled   prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Mobile Number" />}
					
					  </Form.Item>
							</Col>

							<Col sm={12} md={12}>
								<Form.Item name="employee_type" label="Employee Type" rules={[{ required: true, message: 'This field is required!' }]}  >
								<Select placeholder="Select Employee Type" >
										{roleList && roleList.map((item, index) => <Select.Option key={index} value={item._id}>{item.roles}</Select.Option>)}
									</Select>
								</Form.Item>
							</Col>
                           
						</Row>
					</Col>
				</Row>

				<Row gutter={15}>
				<Col flex="auto">
						<Row gutter={15}>
					

							<Col sm={12} md={12}>
							<Form.Item name="dob" label="DOB" rules={[ { required: true, message: 'Field required!', }, ]} >
							<DatePicker  disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current > moment(customDate, "YYYY-MM-DD");
            }}  format="YYYY-MM-DD"/>
						</Form.Item>
							</Col>
                           
						</Row>
					</Col>
				</Row>
				<Form.Item className="mb-0">
					<Button onClick={cancelFun}>Cancel</Button>&nbsp;&nbsp;
				<Button type="primary" disabled={btnDis} className="btn-w25 btn-primary-light" onClick={() => form.submit()}>Save</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default connect(({users ,global ,roles }) => ({
	users:users,
	global: global ,
	roles : roles

}))(AddEditEmployee);