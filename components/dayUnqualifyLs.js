/*
*	name:日不合格统计表-拉丝
*	author: liuzhen
*	time: 2016/12/15
*/
import React from 'react';
import {Table,DatePicker,Button,message} from 'antd';
import actions from '../actions/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Link} from 'react-router';
import MeunList from './MeunList';
import Title from './title';
import config from './config';

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;
const serverUrl = config.serverUrl;

let DayUnQualify = React.createClass({
	goBack(){
		history.back();
	},
	componentDidMount() {
		let title = '拉丝日不合格品统计';
		this.props.dispatch(actions.changeTitle(title));	
		let meunData = {
			current:'53',
			defaultOpenKeys:['sub5']
		};
		this.props.dispatch(actions.meunChangeAction(meunData));

		let query = this.props.location.query;
		if(query.time){
			this.props.dispatch(actions.unqualifyLsActionAsync({
				jgzj:'全部',
				startTime:query.time+' ' + '00:00:00',
				endTime:query.time+" " + '23:59:59',
				isFromProduct:'1'
			}));
		}else{
			this.props.dispatch(actions.unqualifyLsActionAsync({
				jgzj:'全部'
			}));
		}

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
			this.props.dispatch(actions.unqualifyLsActionAsync({
				jgzj:document.getElementById('jgzj').value,
				startTime:startTime,
				endTime:endTime
			}));
		}
	},
	handleDownload(){
		const startTime = this.props.dayTable.startTime;
		const endTime = this.props.dayTable.endTime;
		this.getHref({
			jgzj:document.getElementById('jgzj').value,
			startTime:startTime,
			endTime:endTime,
			type:'2'
		});
	},
	getHref(list){
		$.ajax({
			url:serverUrl+'/downloadDayUnQualify',
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
			<div>
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
						    />
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
						<Button type="primary" icon="search" id='search' onClick={this.handleSearch}>查询</Button>
						<Button type="primary" icon="download" size='default' className='download' onClick={this.handleDownload}>下载</Button>
						<Link to='/dayTable'>
							<Button type="primary" className='see-detail'>查看明细</Button>
						</Link>
						<div className='clear'></div>
					</div>
					<div className='table-container'>
						<div className='table-cont'>
							<Table
								dataSource={this.props.unqualify.dataSource}
								scroll={{ x: config.unQualifyTableScroll}}
								pagination={{
									total:this.props.unqualify.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.props.unqualify.columns.map(function(item){
										if(item.dataIndex == 'yt' || item.dataIndex == 'jgzj' || item.dataIndex == 'lb' || item.dataIndex == 'nx'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex].length - b[item.dataIndex].length
														}
													>
													</Column>
										}else if(item.dataIndex == 'rksj'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => getUnixTime(a[item.dataIndex]) - getUnixTime(b[item.dataIndex])
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
		unqualify:state.unqualify,
		baseData:state.baseData,
		dayTable:state.dayTable
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

DayUnQualify = connect(mapStateToProps)(DayUnQualify);

export default DayUnQualify;