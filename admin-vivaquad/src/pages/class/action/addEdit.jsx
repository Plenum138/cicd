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

	let streamList = []
	let yearList = ['1 Year', '2 Year', '3 Year', '4 Year' , '5 Year' , '6 Year']

	
    if(props?.streams?.list?.data?.length > 0){
		streamList  =  props?.streams?.list?.data
	}
	


	useEffect(() => {


		let unmounted = false;
		return () => {unmounted = true;}
    },[dispatch])
	
	
	useEffect(() => {
	dispatch({type: 'streams/streamListStudent', });


		let unmounted = false;

		let data = props.detail;		
		if(props.detail){
			form.setFieldsValue({
			  ['stream_id']: data.stream_id, 
			  ['year']: data.year, 
			  ['class_name']: data.class_name, 

			});}
		else{ form.resetFields(); }
		
		return () => {unmounted = true;}
    },[props.visible])
	
	useEffect(() => {
		let unmounted = false;
		let {classes} = props;
		setCatlist(classes.list ? classes.list.data:[]);
		return () => {unmounted = true;}
    },[props.classes.list])
	
	const onFinish= val=>{

		
		setBtnDis(true);
		if(props.detail){
			val._id = props.detail._id
			dispatch({type: 'classes/classEdit',  payload: val,});
		}
		else{
			
			dispatch({type: 'classes/classAdd',  payload: val,});
		}
	}
	
	useEffect(() => {
		let unmounted = false;
		let add = props.classes.add
		if(!unmounted && add.count > count && add.status){
			setBtnDis(false);
		  setCount(add.count);		  
		  props.returnData('success');
		}else if(!unmounted && add.count > count && !add.status){
		  setBtnDis(false);
		  setCount(add.count);
		}
		
		// Edit
		let edit = props.classes.edit
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
	},[props.classes])
	
	const cancelFun = ()=>{
		if(!props.detail)
			form.resetFields();
		props.closeModel()
	}

	
return (
	<Modal visible={props.visible} title={props.detail?'Edit Class':'Add Class'} onCancel={cancelFun} footer={<Fragment>
				<Button onClick={cancelFun}>Cancel</Button>
				<Button type="primary" disabled={btnDis} className="btn-w25 btn-primary-light" onClick={()=>form.submit()}>{props.detail?'Edit Class':'Add Class'}</Button>
			</Fragment>} >
		



		<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">



		<Form.Item name="stream_id"  rules={[{ required: true, message: 'This field is required!' }]}  >
								<Select placeholder="Select Stream" >
										{streamList && streamList.map((item, index) => <Select.Option key={index} value={item._id}>{item.name}</Select.Option>)}
									</Select>
								</Form.Item>
								<Form.Item name="year"  rules={[{ required: true, message: 'This field is required!' }]}  >
								<Select placeholder="Select  Year" >
										{yearList && yearList.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
									</Select>
								</Form.Item>

			<Form.Item name="class_name"  rules={[{ required: true, message: 'This field is required!' },{ max: 20, message: 'Class Name must not be greater than 20 characters.' }]} >
				<Input placeholder="Enter Class Name" />
			</Form.Item>
			
		</Form>
		
	</Modal>
)};

export default connect(({ classes,streams, global, loading }) => ({
  classes:classes,
  global: global,
  loading: loading ,
  streams: streams
}))(AddEdit);