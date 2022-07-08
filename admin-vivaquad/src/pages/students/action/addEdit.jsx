import React, { useState,useEffect,useRef, Fragment} from 'react';
import {Row, Col, Empty, Modal, Card, Typography, InputNumber,Form,Input, Checkbox,Button,Switch, Upload, Dropdown, Menu, Select, notification, Transfer, DatePicker, Avatar, message, Descriptions } from 'antd';
import { LeftOutlined, LoadingOutlined, EditOutlined, CloseOutlined} from '@ant-design/icons';
import {section , semester} from '../../../utils/section'
import moment from 'moment';
import { connect } from 'dva';
import styles from './style.less';

const { Text } = Typography;
const { TextArea } = Input;
const timestemp = (new Date()).getTime();
const { RangePicker } = DatePicker;
const formItemLayout = { labelCol: {xs: { span: 24, },  sm: { span: 24, },}};
const dateFormat = 'YYYY/MM/DD';

const AddEditStudent =props => {
	const [form] = Form.useForm();
	const [form_class] = Form.useForm();

	const { dispatch, category } = props;
	const [visible, setVisible] = useState(false);
	const [detail, setDetail] = useState({});
	const [classDetail,setclassDetail] = useState([]);
	const [stream, setStream] = useState('');
	const [year_list,setYearList] = useState([]);
	const [class_list,setClassList] = useState([]);
	const [itemId, setItemId] = useState()
	const [imageUrl, setImageUrl] = useState('');
	const [picModel, setPicModel] = useState(false);
	const [loading, setLoading] = useState(false);
	const [InquiryData, setInquiryData] = useState(''); 
	const [Inquiry, setInquiry] = useState('');
	const [count, setCount] = useState(0)
	const [ecount, setECount] = useState(0)
	const [dcount, setDCount] = useState(0)
	const [btnDis, setBtnDis] = useState(false)
    const stream_list = classDetail?.stream_list
useEffect(() => {
		let unmounted = false;
		window.scroll(0, 0);
		if(props.match && props.match.params.id)
		{
			setItemId(props.match.params.id)
			DetailFun(props.match.params.id)

		}else {
			form.resetFields();
			setImageUrl('');
		}
		return () => { unmounted = true; }
    },[dispatch])
	
	
	const DetailFun=(id)=>{
		props.dispatch({type: 'users/getDetail', payload: { _id: id, profile_id: id }});
	}
	


	const onFinish= val=>{
		props.dispatch({type: 'users/updateMeal', payload: { _id: props.match.params.id, meal  : val.meal  }});
		form.setFieldsValue({
			 ['meal']: val.meal , 
		  });

	}


	const onFinishClass= val=>{
		val._id = props.match.params.id
		props.dispatch({type: 'users/updateSection', payload:val});
		form.setFieldsValue({
			 ['stream_id']: val.stream_id , 
			 ['year']: val.year , 
			 ['class_name']: val.class_name , 

		  });

	}
	
	useEffect(() => {
		let unmounted = false;
		// Edit
		let edit = props.users.edit
		if(!unmounted && edit.count > ecount && edit.status){
		  setECount(edit.count);
		  setBtnDis(false);
		  setImageUrl('');
		  cancelFun();
		}else if(!unmounted && edit.count > ecount && !edit.status){
		  setBtnDis(false);
		  setECount(edit.count);
		}

		
		
		// detail
		if(props.match && props.match.params.id)
		{
			
			let detail = props.users.detail;
			console.log("detail : ", detail);
			if(!unmounted &&  detail && detail.status){
			  setDCount(detail.count);
			  let data = detail.profile;
			  setclassDetail(detail)

				setDetail({
					...data,
					username: data.username,
					email: data.email,
					mobile_number: data.mobile_number,
					isEmailVerified: data.isEmailVerified,
					isMobileVerified: data.isMobileVerified,
					roles: data.roles,
				})
				form.setFieldsValue({
				  ['dob']: moment(new Date(data.dob), 'YYYY/MM/DD'),  ['email']: data.email, ['gender']: data.gender, ['name']: data.name, ['phone']: data.phone, ['photo']: data.photo  ,['meal']: data.meal	});
				
				  form_class.setFieldsValue({
					['stream_id']: data.stream_id, 
					['year']: data.year, 
					['class_name']: data.class_name, 
					
				})
				

				setImageUrl(data.photo);
			}else if(!unmounted && detail && !detail.status){
			  setBtnDis(false);
			  setDCount(detail.count);
			}
		}
	

		return () => {unmounted = true;	}

    },[props.users])
	
	const cancelFun = ()=>{
		form.resetFields();
		setImageUrl('');
		props.history.push('/students');
	}


	const onStreamChange = (e) => {
		form_class.setFieldsValue({['year']:[], })
		form_class.setFieldsValue({['class_name']:[], })
		const year_list = [...new Map(classDetail?.class_list && classDetail?.class_list.filter((item) => item.stream_id === e).map((item) => [item["year"], item])).values(),];
		setYearList(year_list)
		setStream(e)
	}

	const onYearChange = (e) => {
		form_class.setFieldsValue({['class_name']:[], })
		const class_list = [...new Map(classDetail?.class_list && classDetail?.class_list.filter((item) => item.year === e && item.stream_id === stream).map((item) => [item["class_name"], item])).values(),];
		console.log('class_list' ,class_list)
		setClassList(class_list)

	}
	
return (
	<> 
	<Card title={<span><LeftOutlined onClick={()=> props.history.push('/students')}/> User Details</span>} style={{marginTop:"0"}}>
	<Row gutter={15} className='mb-4'>
				<Col flex="auto">
						<Row gutter={100}>
						<Col sm={8} md={8}>
						<h4><span class="label label-default">Profile Image</span></h4>
						<Avatar shape="round" size={160} src={detail.avatar} style={{marginBottom: '2px'}} />

							</Col>

							<Col sm={8} md={8}>
							<h4><span class="label label-default">ID Card Front </span></h4>


							<Avatar shape="square" size={160} src={detail?.id_card && detail?.id_card[0] && detail?.id_card[0].id_card_front} style={{marginBottom: '2px'}} />


							</Col>
							<Col sm={8} md={8}>
							<h4><span class="label label-default">ID Card Back</span></h4>


							<Avatar shape="square" size={160} src={detail?.id_card && detail?.id_card[1] && detail?.id_card[1]?.id_card_back} style={{marginBottom: '2px'}} />


							</Col>
                           
						</Row>
					</Col>
				</Row>



		<Descriptions size={'middle'} bordered>					
          <Descriptions.Item label="Name">{detail.username}</Descriptions.Item>
		  <Descriptions.Item label="Email">{detail.email}</Descriptions.Item>
		  <Descriptions.Item label="Is Email Verified">{detail.isEmailVerified ? 'true' : 'false'}</Descriptions.Item>
		  <Descriptions.Item label="Role">{detail.roles}</Descriptions.Item>
          <Descriptions.Item label="Profile Created On">{moment(detail.create).format(dateFormat)}</Descriptions.Item>
		  <Descriptions.Item label="DOB">{detail.dob}</Descriptions.Item>
		  <Descriptions.Item label="Mobile No">{detail.mobile_number}</Descriptions.Item>


		  
        </Descriptions>
	</Card>

	<Card title={<span> Meal Details</span>} style={{marginTop:"30px"}}>
	<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">

				<Row gutter={15}>
				<Col flex="auto">
						<Row gutter={15}>
						<Col sm={12} md={12}>
								<Form.Item name="meal" label="Meal"    rules={[{ required: true, message: 'This field is required.' } ,
		  ({ getFieldValue }) => ({
			validator(rule, value) {
			  if (!value) {
				return Promise.reject('');
			  }
			  if (value > 999) {
				  return Promise.reject('meal can not be greater than 999');
				}
				return Promise.resolve();
  
			},
		  }),
		  
          ]}  >
								<InputNumber type={'number'} placeholder="Enter Meal"
         
           
           
		 />
								</Form.Item>
							</Col>
                           
						</Row>
					</Col>
				</Row>

				
		
				<Form.Item className="mb-0">
					
				<Button type="primary" disabled={btnDis} className="btn-w25 btn-primary-light" onClick={() => form.submit()}>Update Meal</Button>
				</Form.Item>
			</Form>
	</Card>
	

	<Card title={<span> Class Details</span>} style={{marginTop:"30px"}}>
	<Form {...formItemLayout} form={form_class} name="loc_info" layout="vertical" onFinish={onFinishClass} className="innerFields">

				<Row gutter={15}>
				<Col flex="auto">
						<Row gutter={15}>
						<Col sm={12} md={8}>
						<Form.Item name="stream_id" label="Stream"  rules={[{ required: true, message: 'Field required!' },]} >
													<Select placeholder="Select Stream" onChange={(e) => onStreamChange(e)}>
														{stream_list && stream_list.map((item, index) => {
															return <Select.Option key={index} value={item?.stream_id}>{item?.stream_name}</Select.Option>
														})}
													</Select>

												</Form.Item>
							</Col>

							<Col sm={12} md={8}>
							<Form.Item name="year" label="Year"   rules={[{ required: true, message: 'Field required!' },]} >
													<Select placeholder="Select Year" onChange={(e) => onYearChange(e)}>
														{year_list && year_list.map((item, index) => <Select.Option key={index} value={item?.year}>{item?.year}</Select.Option>)}
													</Select>
												</Form.Item>
							</Col>

							<Col sm={12} md={8}>
							<Form.Item name="class_name" label="Class"  rules={[{ required: true, message: 'Field required!' },]}>
													<Select placeholder="Select Class" >
														{class_list && class_list.map((item, index) => <Select.Option key={index} value={item?.class_name}>{item?.class_name}</Select.Option>)}
													</Select>
												</Form.Item>
							</Col>
                           
						</Row>
					</Col>
				</Row>

				
		
				<Form.Item className="mb-0">
					
				<Button type="primary" disabled={btnDis} className="btn-w25 btn-primary-light" onClick={() => form_class.submit()}>Update Class</Button>
				</Form.Item>
			</Form>
	</Card> 

	<Card title={<span> School Details</span>} style={{marginTop:"30px" ,marginBottom:"30px"}}>
     		<Descriptions size={'middle'} bordered>						
          <Descriptions.Item label="School Name">{detail.schoolDetail?.school_name}</Descriptions.Item><br />
		  <Descriptions.Item label="School Address">{detail.schoolDetail?.address}</Descriptions.Item>


		  
        </Descriptions>
	 <Avatar shape="square" size={160} src={detail.schoolDetail?.media} style={{marginBottom: '2px'}} />

	</Card>

	

	
	</>

	

)};

export default connect(({ users, global, loading }) => ({
  users:users,
  global: global
}))(AddEditStudent);