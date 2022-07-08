import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Row, Col, Empty, Modal, Card, Typography, Alert, Form, Input, Checkbox, Button, Space, Upload, Dropdown, Menu, Select, notification, Transfer, DatePicker, TimePicker, message, InputNumber } from 'antd';
import { LeftOutlined, LoadingOutlined, EditOutlined, CloseOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { connect } from 'dva';
const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;

const { RangePicker } = TimePicker;
const days = [{ value: 0, day: 'Sunday' }, { value: 1, day: 'Monday' }, { value: 2, day: 'Tuesday' }, { value: 3, day: 'Wednesday' }, { value: 4, day: 'Thursday' }, { value: 5, day: 'Friday' }, { value: 6, day: 'Saturday' }]

const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 24, }, } };
const baseUrl = process.env.REACT_APP_ApiUrl
const AddEditTimeTable = props => {
	const [form] = Form.useForm();
	const { dispatch, subjects } = props;
	const [Inquiry, setInquiry] = useState('');
	const [PageId, setPageId] = useState('');
	const [count, setCount] = useState(0)
	const [yearList, setYearList] = useState([])
	const [classList, setClassList] = useState([])
	const [stream, setStream] = useState('');
	const classArray = subjects?.listData?.data?.class_list;
	const teacherArray = subjects?.listData?.data?.teacher_list;
	const subjectArray = subjects?.listData?.data?.subject_list;
	const streamArray = subjects?.listData?.data?.stream_list




	useEffect(() => {
		let unmounted = false;
		let user_id = localStorage.getItem('userId');
		props.dispatch({ type: 'subjects/getsubjectList', payload: { user_id: user_id } });

		window.scroll(0, 0);
		if (props.match.params.id) {
			DetailFun(props.match.params.id)
		} else {
			form.resetFields();
		}
		return () => { unmounted = true; }
	}, [dispatch])

	const DetailFun = (id) => {
		props.dispatch({ type: 'time_tables/detailTimeTable', payload: id });
	}

	useEffect(() => {
		let unmounted = false;

		if (props.time_tables.add) {
			dispatch({ type: 'time_tables/clearAction' });
			props.history.push('/time-tables');
		}

		if (props.time_tables.edit) {
			dispatch({ type: 'time_tables/clearAction' });
			props.history.push('/time-tables');
		}

		if (props.time_tables && props.time_tables.detail && props.time_tables.detail.status) {
			let data = props.time_tables.detail.data[0];
			console.log('data', data);
			setPageId(data._id)



			form.setFieldsValue({
				['stream_id']: data.stream_id,
				['year']: data.year,
				['class_name']: data.class,
				['teacher_id']: data.teacher_id,
				['subject_id']: data.subject_id,
				['time_range']: [moment(new Date(data.startTime)), moment(new Date(data.endTime))],
				['date']: [moment(new Date(data.startDate)), moment(new Date(data.endDate))],
				['class_location']: data.class_location,
				['days']: data.days,






			})
			// {
			// 	"_id": "629f48a0489d5e8266a0f043",
			// 	"teacher_id": "6299e9526543180bbd65b9ad",
			// 	"school_id": "625031af2eb80e5d5ad3d8e5",
			// 	"subject_id": "629a13eb423b8a4aefa2ed18",
			// 	"startTime": "2022-06-06T18:37:00.051Z",
			// 	"endTime": "2022-06-07T00:30:00.669Z",
			// 	"date": "2022-06-27T12:46:16.628Z",
			// 	"stream_id": "628c7826c70eff5ac08296b4",
			// 	"year": "1 Year",
			// 	"class": "101",
			// 	"created_at": "2022-06-07T12:46:24.059Z",
			// 	"updated_at": "2022-06-07T12:46:24.059Z",
			// 	"__v": 0
			// }

		}

		return () => { unmounted = true; }
	}, [props.time_tables])

	const cancelFun = () => {
		form.resetFields();
		props.history.push('/time_tables');
	}

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	const onFinish = val => {



		


		if (props.match.params.id) {
			val._id = PageId;

			dispatch({ type: 'time_tables/editTimeTable', payload: val });
		} else {
			dispatch({ type: 'time_tables/AddTimeTable', payload: val });
		}
	}


	const onStreamChange = async (e, needUpdate_ = false) => {
		form.setFieldsValue({ ['year']: [], })
		form.setFieldsValue({ ['class_name']: [], })
		form.setFieldsValue({ ['teacher_id']: [], })
		form.setFieldsValue({ ['subject_id']: [], })

		const year_list = [...new Map(classArray && classArray.filter((item) => item.streamInfo._id === e).map((item) => [item["year"], item])).values(),];
		setYearList(year_list)
		setStream(e)
	}
	const onYearChange = async (e, needUpdate_ = false) => {
		form.setFieldsValue({ ['class_name']: [], })
		form.setFieldsValue({ ['teacher_id']: [], })
		form.setFieldsValue({ ['subject_id']: [], })
		const class_list = classArray && classArray.filter((item) => item.year === e && item.stream_id === stream)
		setClassList(class_list)
	}





	return (
		<Card title={<span><LeftOutlined onClick={() => props.history.push('/time-tables')} />
			{props.detail ? 'Edit Time Table' : 'Add Time Table'}</span>} style={{ marginTop: "0" }}>

			<Form {...formItemLayout} form={form} name="loc_info" layout="vertical" onFinish={onFinish} className="innerFields">

				<Row gutter={15}>
					<Col sm={24} md={12}>
						<Form.Item name="stream_id" label="Stream" rules={[{ required: true, message: 'Field required!' },]}  >
							<Select placeholder="Select Stream" onChange={(e) => onStreamChange(e)}>
								{streamArray && streamArray.map((item, index) => <Select.Option key={index} value={item?.streamInfo?._id}>{item?.streamInfo?.name}</Select.Option>)}
							</Select>
						</Form.Item>
					</Col>

					<Col sm={24} md={12}>
						<Form.Item name="year" label="Select Year" rules={[{ required: true, message: 'Field required!' },]}  >
							<Select placeholder="Select Year" onChange={(e) => onYearChange(e)}>
								{yearList && yearList.map((item, index) => <Select.Option key={index} value={item.year}>{item.year}</Select.Option>)}
							</Select>
						</Form.Item>
					</Col>
				</Row>


				<Row gutter={15}>
					<Col sm={24} md={12}>
						<Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Field required!' },]}  >
							<Select placeholder="Select Class" >
								{classList && classList.map((item, index) => <Select.Option key={index} value={item.class_name}>{item.class_name}</Select.Option>)}
							</Select>
						</Form.Item>
					</Col>

					<Col sm={24} md={12}>
						<Form.Item name="subject_id" label="Select Subject" rules={[{ required: true, message: 'Field required!' },]}  >
							<Select placeholder="Select Subject" >
								{subjectArray && subjectArray.map((item, index) => <Select.Option key={index} value={item?._id}>{item?.subject_name}</Select.Option>)}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={15}>
					<Col sm={24} md={12}>
						<Form.Item name="teacher_id" label="Select Teacher" rules={[{ required: true, message: 'Field required!' },]}  >
							<Select placeholder="Select Teacher" >
								{teacherArray && teacherArray.map((item, index) => <Select.Option key={index} value={item?._id}>{item?.username}</Select.Option>)}
							</Select>
						</Form.Item>
					</Col>

					<Col sm={24} md={12}>
						<Form.Item name="class_location" label="Class Location" rules={[{ required: true, message: 'Field required!' },{ max: 20, message: 'Class Location must not be greater than 20 characters.' }]}  >
							<Input size="large" placeholder="Enter Class Location" />
						</Form.Item>
					</Col>


				</Row>


				<Row gutter={15}>
					<Col sm={24} md={6}>
						<Form.Item name="date" label="Select Session" rules={[{ required: true, message: 'Field required!' },]}  >
							<DatePicker.RangePicker format="YYYY-MM-DD" />
						</Form.Item>
					</Col>


					<Col sm={24} md={12}>
						<Form.Item name="days" label="Select Days" rules={[{ required: true, message: 'Field required!' },]}  >
							<Select
								mode="multiple"
								allowClear
								style={{
									width: '100%',
								}}
								placeholder="Please select days"

								onChange={handleChange}
							>
								{days.map((item, index) =>
									<Option key={index} value={item.value} label={item.day}>
										<div className="demo-option-label-item">
										{item.day}
										</div>
									</Option>)}
							</Select>
						</Form.Item>
					</Col>

					<Col sm={24} md={6}>
						<Form.Item name="time_range" label="Time Range" rules={[{ required: true, message: 'Field required!' },]}  >

							<RangePicker 	 use12Hours format="h:mm a" bordered={true} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={15}>

				


				</Row>

				<Form.Item className="mb-0">
					<Button onClick={cancelFun}>Cancel</Button>&nbsp;&nbsp;
					<Button type="primary" className="btn-w25 btn-primary-light" onClick={() => form.submit()}>Save</Button>
				</Form.Item>






			</Form>

		</Card>
	)
};

export default connect(({ time_tables, global, loading, subjects }) => ({
	time_tables: time_tables,
	global: global,
	subjects: subjects,
}))(AddEditTimeTable);