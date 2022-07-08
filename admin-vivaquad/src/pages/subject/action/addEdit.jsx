import React, { useState,useEffect,useRef, Fragment} from 'react';
import {Empty, Modal,Form,Input,Button,Switch, Upload, Dropdown, Menu, Select, notification, Transfer, DatePicker } from 'antd';

import { connect } from 'dva';

const formItemLayout = { labelCol: {xs: { span: 24, },  sm: { span: 24, },}};

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
			  ['subject_name']: data.subject_name, 
			});}
		else{ form.resetFields(); }
		
		return () => {unmounted = true;}
    },[props.visible])
	
	useEffect(() => {
		let unmounted = false;
		let {subjects} = props;
		setCatlist(subjects.list ? subjects.list.data:[]);
		return () => {unmounted = true;}
    },[props.subjects.list])
	
	const onFinish= val=>{


		
		setBtnDis(true);
		if(props.detail){
			
			val._id = props.detail._id
			dispatch({type: 'subjects/subjectEdit',  payload: val,});
		}
		else{
			
			dispatch({type: 'subjects/subjectAdd',  payload: val,});

		}
	}
	
	useEffect(() => {
		let unmounted = false;
		let add = props.subjects.add
		if(!unmounted && add.count > count && add.status){
			setBtnDis(false);
		  setCount(add.count);		  
		  props.returnData('success');
		}else if(!unmounted && add.count > count && !add.status){
		  setBtnDis(false);
		  setCount(add.count);
		}
		
		// Edit
		let edit = props.subjects.edit
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
	},[props.subjects])
	
	const cancelFun = ()=>{
		if(!props.detail)
			form.resetFields();
		props.closeModel()
	}

	
return (
	<Modal visible={props.visible} title={props.detail?'Edit Subject':'Add Subject'} onCancel={cancelFun} footer={<Fragment>
				<Button onClick={cancelFun}>Cancel</Button>
				<Button type="primary" disabled={btnDis} className="btn-w25 btn-primary-light" onClick={()=>form.submit()}>{props.detail?'Edit Subject':'Add Subject'}</Button>
			</Fragment>} >
		<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">
			<Form.Item name="subject_name"  rules={[{ required: true, message: 'This field is required!' },{ max: 25, message: 'Subject Name must not be greater than 25 characters.' }]} >
				<Input placeholder="Enter Subject Name" />
			</Form.Item>
		</Form>
		
	</Modal>
)};

export default connect(({ subjects, global, loading }) => ({
  subjects:subjects,
  global: global,
  loading: loading 
}))(AddEdit);