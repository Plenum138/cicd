import React, { useState,useEffect,useRef, Fragment} from 'react';
import {Empty, Modal,Form,Input,Button,Switch, Upload, Dropdown, Menu, Select, notification, Transfer, DatePicker } from 'antd';

import { connect } from 'dva';

const formItemLayout = { labelCol: {xs: { span: 24, },  sm: { span: 24, },}};
const { TextArea } = Input;
let typeList = ['All', 'Student', 'Employee']


const AddEdit =props => {
	const [form] = Form.useForm();
	const { dispatch} = props;
	const [catlist, setCatlist] = useState([])
	const [count, setCount] = useState(0)
	const [dcount, setDCount] = useState(0)
	const [btnDis, setBtnDis] = useState(false)
	
	useEffect(() => {
		let unmounted = false;
		return () => {unmounted = true;}
    },[dispatch])
	
	
	useEffect(() => {
		let unmounted = false;

		let data = props.detail;		
		if(props.detail){
			form.setFieldsValue({
			//   ['hall_name']: data.hall_name, 
			});}
		else{ form.resetFields(); }
		
		return () => {unmounted = true;}
    },[props.visible])
	
	useEffect(() => {
		let unmounted = false;
		let {announcements} = props;
		setCatlist(announcements.list ? announcements.list.data:[]);
		return () => {unmounted = true;}
    },[props.announcements.list])
	
	const onFinish= val=>{
	


		
		setBtnDis(true);
		if(props.detail){
			val._id = props.detail._id
			dispatch({type: 'announcements/announcementEdit',  payload: val,});
		}
		else{
			
			dispatch({type: 'announcements/announcementAdd',  payload: val,});
		}
	}
	
	useEffect(() => {
		let unmounted = false;
		let add = props.announcements.add
		if(!unmounted && add.count > count && add.status){
			setBtnDis(false);
		  setCount(add.count);		  
		  props.returnData('success');
		}else if(!unmounted && add.count > count && !add.status){
		  setBtnDis(false);
		  setCount(add.count);
		}
		
		// Edit
		let edit = props.announcements.edit
		if(!unmounted && edit.count > dcount && edit.status){
		  setBtnDis(false);
		  setDCount(edit.count);
		  
		  props.returnData('success');
		}else if(!unmounted && edit.count > dcount && !edit.status){
		  setBtnDis(false);
		  setDCount(edit.count);
		}
		return () => {
			unmounted = true;
		}
	},[props.announcements])
	
	const cancelFun = ()=>{
		if(!props.detail)
			form.resetFields();
		props.closeModel()
	}

	
return (
	<Modal visible={props.visible} title={props.detail?'Edit Announcement':'Add Announcement'} onCancel={cancelFun} footer={<Fragment>
				<Button onClick={cancelFun}>Cancel</Button>
				<Button type="primary" disabled={btnDis} className="btn-w25 btn-primary-light" onClick={()=>form.submit()}>{props.detail?'Edit Announcement':'Add Announcement'}</Button>
			</Fragment>} >
		<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">
			<Form.Item name="title" label="Title"  rules={[{ required: true, message: 'This field is required!' },{ max: 50, message: 'Title must not be greater than 50 characters.' },]} >
				<Input placeholder="Enter Title" />
			</Form.Item>
		</Form>

		<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">
			<Form.Item name="message" label="Description"  rules={[{ required: true, message: 'This field is required!' },{ max: 100, message: 'Description must not be greater than 100 characters.' },]} >
			<TextArea placeholder="Description"  rows={3}  />
			</Form.Item>
		</Form>
		<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">
			<Form.Item name="type" label="Select Type"  rules={[{ required: true, message: 'This field is required!' },{ max: 100, message: 'Description must not be greater than 100 characters.' },]} >
			<Select placeholder="Select Type" >
										{typeList && typeList.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
									</Select>
			</Form.Item>
		</Form>
		
	</Modal>
)};

export default connect(({ announcements, global, loading }) => ({
  announcements:announcements,
  global: global,
  loading: loading 
}))(AddEdit);