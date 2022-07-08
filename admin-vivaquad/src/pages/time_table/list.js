import React from 'react';
import { Link } from 'react-router-dom';
import Apploader from '../../components/loader/loader'
import { connect } from 'dva';
import moment from 'moment';

import { Form, Select, Card, Typography, Alert, Input, Button, Table, Radio, Divider, Switch, Row, Col, Avatar, Pagination, Tabs, Modal, Badge, Popconfirm ,DatePicker} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddEdit from './action/addEdit';
import { getTitleImage } from '../../utils/functions';
const { Search } = Input;
const { Text } = Typography;
const { TabPane } = Tabs;
const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 24, }, } };



class TimeTableList extends React.Component {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			limit: 25,
			current: 1,
			sortBy: 'asc',
			addModel: false,
			inactive: false,
			searchText: '',
			loader: false,
			detail: '',
			count: 0,
			Addcount: 0,
			listData: [],
			stream_list: [],
			year_list: [],
			class_list: [],
			subject_list: [],
			teacher_list: [],
			setStream: '',
			setYear: '',
			setClass: '',
			setSubject: '',




		}

		setTimeout(() => document.title = 'Time Table List', 100,);
		this.isUpdate = false;

	
	
	}

	componentDidMount() {
		this.ListFun();

	
	}



	ListFun = async() => {
	let data = 	await this.props.dispatch({ type: 'time_tables/timeTableList', payload: {} });
    const allData = data?.data

	if (allData.length > 0) {
		const streamList = [...new Map(allData.map((item) => [item.streamInfo[0]["name"], item])).values(),];
		const yearList = [...new Map(allData.map((item) => [item["year"], item])).values(),];
		const  classList = [...new Map(allData.map((item) => [item["class"], item])).values(),];
		const subjectList = [...new Map(allData.map((item) => [item.subjectInfo["subject_name"], item])).values(),];
		const teacherList = [...new Map(allData.map((item) => [item.userInfo[0]["username"], item])).values(),];
		this.setState({ 
			stream_list : streamList, 
			year_list : yearList ,
			class_list : classList,
			subject_list : subjectList,
			teacher_list : teacherList,
		})
	}

	}


	ShowSizeChange = (current, size) => this.setState({ limit: size }, () => this.ListFun());
	switchFun = (val) => this.setState({ inactive: val }, () => this.ListFun());
	ChangeOrder = (val) => this.setState({ sortBy: this.state.sortBy === 'asc' ? 'desc' : 'asc' }, () => this.ListFun());

	searchVal = (val) => {
		this.state.searchText = val;
		const resultAutos = this.props.time_tables.list.filter((auto) =>
			auto.streamInfo[0].name.toLowerCase().includes(val.toLowerCase()) ||
			auto.year.toLowerCase().includes(val.toLowerCase()) ||
			auto.class.toLowerCase().includes(val.toLowerCase()) ||
			auto.userInfo[0].username.toLowerCase().includes(val.toLowerCase()) ||
			auto.subjectInfo.subject_name.toLowerCase().includes(val.toLowerCase())
			
		)
		this.setState({ listData: resultAutos })
	}

	createCat = (val) => {
		if (val) { this.ListFun() }
		this.setState({ detail: '', addModel: false })
	}

	deletetime_tables = id => {
		this.props.dispatch({ type: 'time_tables/deleteTimeTable', payload: id });
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (this.props.time_tables.delete) {
			this.props.dispatch({ type: 'time_tables/clearAction' });
			this.ListFun();
			return true
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// console.log('prevProps' ,prevProps)
		// console.log('prevState' ,prevState)
		// console.log('snapshot' ,snapshot)


		if (snapshot) {
		}
	}

	onStreamChange = (e) => {
		const year_list = [...new Map(this.state.listData && this.state.listData.filter((item) => item.streamInfo[0]._id === e).map((item) => [item["year"], item])).values(),];
		this.setState({ year_list: year_list, setStream: e ,listData : year_list })	
	}

	onYearChange = (e) => {
		const class_list = [...new Map(this.state.listData && this.state.listData.filter((item) => item.year === e && item.stream_id === this.state.setStream).map((item) => [item["class"], item])).values(),];
		this.setState({ class_list: class_list, setYear: e })

	}
	onClassChange = (e) => {
		const subject_list = [...new Map(this.state.listData && this.state.listData.filter((item) => item.class === e && item.year === this.state.setYear && item.stream_id === this.state.setStream).map((item) => [item.subjectInfo["subject_name"], item])).values(),];
		this.setState({ subject_list: subject_list, setClass: e })
	}

	onSubjectChange = (e) => {
		const teacher_list = [...new Map(this.state.listData && this.state.listData.filter((item) => item.subjectInfo._id === e && item.class === this.state.setClass && item.year === this.state.setYear && item.stream_id === this.state.setStream).map((item) => [item.userInfo[0]["username"], item])).values(),];
		this.setState({ teacher_list: teacher_list, })
	}

	handleSubmit = async(val) => {
	console.log('val' ,val)
	let data = 	await this.props.dispatch({ type: 'time_tables/timeTableList', payload: val });
	}

	

	render() {
		const { inactive, limit, searchText, addModel, detail } = this.state;
	
		let allData = this.props?.time_tables?.list

		

		const { time_tables } = this.props;
		if (this.state.searchText == '') {
			this.state.listData = time_tables.list ? time_tables.list : [];
		}

		if (allData.length > 0) {
			const streamList = [...new Map(allData.map((item) => [item.streamInfo[0]["name"], item])).values(),];
			const yearList = [...new Map(allData.map((item) => [item["year"], item])).values(),];
			const  classList = [...new Map(allData.map((item) => [item["class"], item])).values(),];
			const subjectList = [...new Map(allData.map((item) => [item.subjectInfo["subject_name"], item])).values(),];
			const teacherList = [...new Map(allData.map((item) => [item.userInfo[0]["username"], item])).values(),];
			// this.state.stream_list = streamList
			// this.state.year_list = yearList
			// this.state.class_list = classList
			// this.state.subject_list = subjectList
			// this.state.teacher_list = teacherList
		}

		const columns = [

			{
				title: <strong className='time_table_text'>Stream Name</strong>, dataIndex: 'streamInfo',

				render: (value, row) => {
					return <span className='time_table_text'>{value[0]?.name}</span>
				}
			},
			{
				title: <strong className='time_table_text'>Year</strong>,
				dataIndex: 'year',
				
				render: (value, row) => {
					return <span className='time_table_text'>{value}</span>
				}
			}, {
				title: <strong className='time_table_text'>Class</strong>,
				dataIndex: 'class',
				
				render: (value, row) => {
					return <span className='time_table_text'>{value}</span>
				}
			},{
				title: <strong className='time_table_text'>Class Location</strong>,
				dataIndex: 'class_location',
				render: (value, row) => {
					return <span className='time_table_text'>{value}</span>
				}
			},
			{
				title: <strong className='time_table_text'>Subject Name</strong>, dataIndex: 'subjectInfo',
				render: (value, row) => {
					return <span className='time_table_text'>{value?.subject_name}</span>
				}
			},
			{
				title: <strong className='time_table_text'>Teacher Name</strong>, dataIndex: 'userInfo',
				render: (value, row) => {
					return <span className='time_table_text'>{value[0]?.username}</span>
				}
			},
			{
				title: <strong className='time_table_text'>Start Date</strong>, dataIndex: 'startDate',
				render: (value, row) => {
					return <span className='time_table_text'>{moment(value).format("DD-MM-YYYY")}</span>
				}
			},
			{
				title: <strong className='time_table_text'>End Date</strong>, dataIndex: 'endDate',
				render: (value, row) => {
					return <span className='time_table_text'>{moment(value).format("DD-MM-YYYY")}</span>
				}
			},
			{
				title: <strong className='time_table_text'>Start Time</strong>, dataIndex: 'startTime',
				render: (value, row) => {
					return <span className='time_table_text'>{moment(value).format("hh:mm a")}</span>
				}
			},
			{
				title: <strong className='time_table_text'>End Time</strong>, dataIndex: 'endTime',
				render: (value, row) => {
					return <span className='time_table_text'>{moment(value).format("hh:mm a")}</span>
				}
			},
			
			{
				title: <strong className='time_table_text'>Action</strong>, align: 'center',
				render: (val, data) => <div onClick={e => e.stopPropagation()}>
					<Button size='small' type="default" className="edit_btn" onClick={() => { this.props.history.push('/time-table/edit/' + data._id) }}><EditOutlined /></Button>
					<Popconfirm title="Are you sure delete this time table?" onConfirm={e => { this.deletetime_tables(data._id); e.stopPropagation() }} okText="Yes" cancelText="No" >
						<Button size='small' type="danger" ><DeleteOutlined /></Button>
					</Popconfirm>
				</div>
			},
		];
		return (
			<div>
				{/* <Apploader show={this.props.loading.global} /> */}
				<Row className="TopActionBar" gutter={[16, 0]} justify="space-between" align="middle">
					<Col>
						<Search placeholder="Search..." onChange={(e) => this.searchVal(e.target.value)} value={searchText} />
					</Col>
					<Col>
						<Button type="primary" onClick={() => this.props.history.push('/time-table/add')}>Add</Button>
					</Col>
				</Row>

				<div className="innerContainer">
					<Card style={{ marginTop: "0" }} bodyStyle={{ padding: '0 15px 15px' }}>
						<Table columns={columns}
							dataSource={this.state.listData}
							rowKey={record => record._id}
							onRow={(record, rowIndex) => {
								return {
									// onClick: event => this.setState({ addModel: true, detail: record })
								};
							}}
							pagination={{
								position: ['bottomLeft'],
								showTotal: (total, range) => <Text type="secondary">{`Showing ${range[0]}-${range[1]} of ${total}`}</Text>, showSizeChanger: true,
								responsive: true,
								onShowSizeChange: (current, size) => this.ShowSizeChange(current, size),
								pageSizeOptions: ['10', '25', '50', '100', '250', '500'],

							}}
							loading={this.props.loading.global}
							title={() => {
								return <>

									<Form ref={this.formRef} {...formItemLayout} className="bg-light" style={{ maxWidth: '100%' }} layout="vertical" onFinish={this.handleSubmit}>
										<Row gutter={15}>
											<Col sm={12} md={8}>
												<Form.Item name="stream_id" label="Stream Name"   >
													<Select placeholder="Select Stream" onChange={(e) => this.onStreamChange(e)}>
														{this.state.stream_list && this.state.stream_list.map((item, index) => {

															return <Select.Option key={index} value={item?.streamInfo[0]?._id}>{item?.streamInfo[0]?.name}</Select.Option>
														})}
													</Select>

												</Form.Item>
											</Col>
											<Col sm={12} md={8}>
												<Form.Item name="year" label="Year"   >
													<Select placeholder="Select Year" onChange={(e) => this.onYearChange(e)}>
														{this.state.year_list && this.state.year_list.map((item, index) => <Select.Option key={index} value={item?.year}>{item?.year}</Select.Option>)}
													</Select>
												</Form.Item>
											</Col>
											<Col sm={12} md={8}>
												<Form.Item name="class_name" label="Class" >
													<Select placeholder="Select Class" onChange={(e) => this.onClassChange(e)}>
														{this.state.class_list && this.state.class_list.map((item, index) => <Select.Option key={index} value={item?.class}>{item?.class}</Select.Option>)}
													</Select>
												</Form.Item>
											</Col>
										</Row>
										<Row gutter={15}>
											<Col sm={12} md={8}>
												<Form.Item name="subject_id" label="Subject"   >
													<Select placeholder="Select Subject" onChange={(e) => this.onSubjectChange(e)}>
														{this.state.subject_list && this.state.subject_list.map((item, index) => <Select.Option key={index} value={item?.subjectInfo?._id}>{item?.subjectInfo?.subject_name}</Select.Option>)}
													</Select>
												</Form.Item>
											</Col>
											<Col sm={12} md={8}>
												<Form.Item name="teacher_id" label="Teacher"   >
													<Select placeholder="Select Teacher" >
														{this.state.teacher_list && this.state.teacher_list.map((item, index) => <Select.Option key={index} value={item?.userInfo[0]?._id}>{item?.userInfo[0]?.username}</Select.Option>)}
													</Select>
												</Form.Item>
											</Col>
											<Col sm={12} md={8}>
												<Form.Item name="date" label="Select Date"   >
													<DatePicker format="DD-MM-YYYY"  />
												</Form.Item>
											</Col>
										</Row>

										<Form.Item className="mb-0">
											<Button onClick={() => {
												this.ListFun();
												this.formRef.current.resetFields()}} >Reset</Button>&nbsp;&nbsp;
											<Button type="primary" className="btn-w25 btn-primary-light" onClick={() => this.formRef.current.submit()} >Filter</Button>
											

										</Form.Item>



									</Form>

								</>
							}}


						/>
					</Card>
				</div>

			</div>

		);
	}
};

export default connect(({ time_tables, loading }) => ({
	time_tables, loading
}))(TimeTableList);