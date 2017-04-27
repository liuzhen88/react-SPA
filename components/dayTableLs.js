/*
*	name:日明细报表-拉丝
*	author: liuzhen
*	time: 2016/12/15
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import {Table,DatePicker,Button,message} from 'antd';
import {Link, Lifecycle, RouteContext } from 'react-router';
import $ from 'jquery';
import '../style/app.css';
import MeunList from './MeunList';
import Title from './title';
import config from './config';

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;
const serverUrl = config.serverUrl;

let TableLsComponent = React.createClass({
	goBack(){
		history.back();
	},
	componentDidMount() {
		let title = '拉丝日明细报表';
		this.props.dispatch(actions.changeTitle(title));
		this.props.dispatch(actions.tableLsActionAsync());
		this.props.dispatch(actions.baseDataActionAsync('2'));
	},
	getChangeTime(value, dateString) {
		let listData = this.props.dayTable;
		listData.startTime = dateString[0];
		listData.endTime = dateString[1];
	    this.props.dispatch(actions.dayTableAction(listData));
	},
	handleSearch(){
		const startTime = this.props.dayTable.startTime;
		const endTime = this.props.dayTable.endTime;
		if(startTime == '' || endTime == ''){
			message.warning('时间选择不能为空!');
		}else{
			let bz = document.getElementById('bz').value;
			let jgzj = document.getElementById('jgzj').value;
			let jth = document.getElementById('jth').value;
			let czg = document.getElementById('czg').value;
			let list = this.props.dayTable;
			list.bz = bz;
			list.jgzj =  jgzj;
			list.jth = jth;
			list.czg = czg;
			list.type = '2';
			this.props.dispatch(actions.dayTableSearchAction(list));
			//console.log(this.props.dayTable);
		}
	},
	handleDownload(){
		const startTime = this.props.dayTable.startTime;
		const endTime = this.props.dayTable.endTime;
		let bz = document.getElementById('bz').value;
		let jgzj = document.getElementById('jgzj').value;
		let jth = document.getElementById('jth').value;
		let czg = document.getElementById('czg').value;
		let list = this.props.dayTable;
		list.bz = bz;
		list.jgzj =  jgzj;
		list.jth = jth;
		list.czg = czg;
		list.type = '2';
		this.getHref(list);
	},
	getHref(list){
		$.ajax({
			url:serverUrl+'/downDayDetailChart',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
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
						        placeholder={['开始时间', '结束时间']}
						        onChange={this.getChangeTime}
						    >
						    </RangePicker>
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
							<span>规格结构 : </span>
							<select className='select' id='jgzj'>
								<option>全部</option>
								{
									this.props.baseData.jgzj.map(function(item){
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
						<div className='selection'>
							<span>操作工 : </span>
							<select className='select' id='czg'>
								<option>全部</option>
								{
									this.props.baseData.czg.map(function(item){
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
								dataSource={this.props.tableStore.dataSource}
								loading={this.props.tableStore.loading}
								scroll={{ x: config.dayDetailScroll}}
								pagination={{
									total:this.props.tableStore.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.props.tableStore.columns.map(function(item){
										if(item.dataIndex == 'rksj'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => getUnixTime(a[item.dataIndex]) - getUnixTime(b[item.dataIndex])
														}
													>
													</Column>
										}else if(item.dataIndex == 'bz' || item.dataIndex == 'jth' || item.dataIndex == 'yt' || item.dataIndex == 'jgzj' || item.dataIndex == 'lb'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex].length - b[item.dataIndex].length
														}
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
												pathname:'/TableDetail',
												query:{
													id:record.id,
													type:'ng'
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

function getUnixTime(dateStr){
    var newstr = dateStr.replace(/-/g,'/'); 
    var date =  new Date(newstr); 
    var time_str = date.getTime().toString();
    return time_str.substr(0, 13);
}

const mapStateToProps = (state) => {
	return {
		tableStore:state.tableStore,
		baseData:state.baseData,
		dayTable:state.dayTable
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

TableLsComponent = connect(mapStateToProps)(TableLsComponent);

export default TableLsComponent;