/*
*	name:工人绩效表-捻股
*	author: liuzhen
*	time: 2016/12/16
*/

import React from 'react';
import {Table,DatePicker,Button,message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import {Link} from 'react-router';
import $ from 'jquery';
import '../style/app.css';
import MeunList from './MeunList';
import Title from './title';
import config from './config';

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;
const serverUrl = config.serverUrl;

let workerPerformance = React.createClass({
	goBack(){
		history.back();
	},
	getInitialState() {
		return {
			startTime:'',
			endTime:'',
			cj:'全部',
			bz:'全部',
			jth:'全部',
			workerPerformance:{
				columns:[],
				dataSource:[],
				pagination:{
					total:1
				},
				loading:true
			}
		}	
	},
	componentDidMount() {
		let title = '拉丝工人绩效表';
		this.props.dispatch(actions.changeTitle(title));
		this.props.dispatch(actions.baseDataActionAsync('2'));
		let cj = document.getElementById('cj').value;
		let bz = document.getElementById('bz').value;
		let jth = document.getElementById('jth').value;
		let list = {
			startTime:this.state.startTime,
			endTime:this.state.endTime,
			cj:cj,
			bz:bz,
			jth:jth,
			type:'2'
		};
		this.getPerformanceData(list);
	},
	getChangeTime(value,dataString){
		this.setState({
			startTime:dataString[0],
			endTime:dataString[1]
		});
	},
	handleSearch(){
		let cj = document.getElementById('cj').value;
		let bz = document.getElementById('bz').value;
		let jth = document.getElementById('jth').value;
		let list = {
			startTime:this.state.startTime,
			endTime:this.state.endTime,
			cj:cj,
			bz:bz,
			jth:jth,
			type:'2'
		};
		this.getPerformanceData(list);
	},
	getPerformanceData(list){
		let that =  this;
		$.ajax({
			url:serverUrl+'/getWorkerPerformance',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				var performance = data.data.workerPerformance;
				that.setState({
					workerPerformance:performance
				});
			}
		});
	},
	handleDownload(){
		let cj = document.getElementById('cj').value;
		let bz = document.getElementById('bz').value;
		let jth = document.getElementById('jth').value;
		let list = {
			startTime:this.state.startTime,
			endTime:this.state.endTime,
			cj:cj,
			bz:bz,
			jth:jth,
			type:'2'
		};
		this.getHref(list);
	},
	getHref(list){
		$.ajax({
			url:serverUrl+'/downloadWorkPerformance',
			type:'get',
			dataType:'jsonp',
			data:list,
			jsonp:'callback',
			success:function(data){
				window.location.href = data.href;
			}
		});
	},
	render(){
		return (
			<div className='cont'>
				<Title/>
				<div className='null'></div>
				<div className='meun-list-left'>
					<MeunList/>
				</div>
				<div className='meun-list-right'>
					<div className='time-container'>
						<div className='time-day selection'>
							<span>日期 : </span>
						    <RangePicker
						    	showTime
						    	format="YYYY-MM-DD HH:mm:ss"
						        placeholder={['开始时间', '结束时间']}
						        onChange={this.getChangeTime}
						    >
						    </RangePicker>
						</div>
						<div className='selection'>
							<span>车间 : </span>
							<select className='select' id='cj'>
								<option>全部</option>
								{
									this.props.baseData.cj.map(function(item){
										return <option key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>班组 : </span>
							<select className='select' id='bz'>
								<option>全部</option>
								{
									this.props.baseData.bz.map(function(item){
										return <option key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>机台号 : </span>
							<select className='select' id='jth'>
								<option>全部</option>
								{
									this.props.baseData.jth.map(function(item){
										return <option key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<Button type="primary" icon="search" id='search' onClick={this.handleSearch}>查询</Button>
						<Button type="primary" icon="download" size='default' className='download' onClick={this.handleDownload}>下载</Button>
						<div className='clear'></div>
					</div>
					<div className='table-container'>
						<div className='table-cont'>
							<Table
								dataSource={this.state.workerPerformance.dataSource}
								loading={this.state.workerPerformance.loading}
								scroll={{ x: config.workerPerformanceScroll}}
								pagination={{
									total:this.state.workerPerformance.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.state.workerPerformance.columns.map(function(item){
										if(item.dataIndex == 'name' || item.dataIndex == 'username' || item.dataIndex == 'gw'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex].length - b[item.dataIndex].length
														}
													>
													</Column>
										}else if(item.dataIndex == 'bhgl'){
											return <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={(a,b) => transformNumber(a[item.dataIndex]) - transformNumber(b[item.dataIndex])}
													>
													</Column>
										}else{
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex] - b[item.dataIndex]
														}
													>
													</Column>
										}
									})
								}
								<Column
									title='操作'
									key='action'
									render={(text, record) => (
										<Link to={
											{
												pathname:'/workerPerformanceDetail',
												query:{
													id:record._id,
													type:'2',
													startTime:this.state.startTime,
													endTime:this.state.endTime,
													cj:this.state.cj,
													bz:this.state.bz,
													jth:this.state.jth,
													name:record.name
												}
											}
										}>
											查看
										</Link>
									)}
								>
								</Column>
							</Table>
						</div>
					</div>
				</div>
			</div>
		)
	}
});
function transformNumber(str){
	var arg = str.split('%')[0];
	arg = Number(arg);
	return arg;
}
const mapStateToProps = (state) => {
	return {
		workerPerformance:state.workerPerformance,
		baseData:state.baseData,
		dayTable:state.dayTable
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

workerPerformance = connect(mapStateToProps)(workerPerformance);

export default workerPerformance;