/*
*	name:工人绩效表二级表单
*	author: liuzhen
*	time: 2016/12/12
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import {Table} from 'antd';
import config from './config';
import $ from 'jquery';
import MeunList from './MeunList';
import Title from './title';

const { Column } = Table;
const serverUrl = config.serverUrl;

let WorkerPerformanceDetail = React.createClass({
	goBack(){
		history.back();
	},
	getInitialState() {
		return {
			columns:[],
			dataSource:[],
			pagination:{
				total:0
			},
			loading:true
		}	
	},
	componentDidMount() {
		let type = this.props.location.query.type;
		let title = '';
		let query = this.props.location.query;
		switch(type){
			case '0':
				title = query.name+'-合绳工人绩效详情';
				break;
			case '1':
				title = query.name+'-捻股工人绩效详情';
				break;
			case '2':
				title = query.name+'-拉丝工人绩效详情';
				break;
			default:
				title = query.name+'-合绳工人绩效详情';
				break;
		}
		this.props.dispatch(actions.changeTitle(title));
		let list = {
			startTime:query.startTime,
			endTime:query.endTime,
			cj:query.cj,
			bz:query.bz,
			jth:query.jth,
			type:query.type,
			id:query.id
		};
		this.getPerformanceData(list);
	},
	getPerformanceData(list){
		let that =  this;
		$.ajax({
			url:serverUrl+'/getWorkerPerformanceList',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				var performance = data.data.workerPerformance;
				that.setState({
					columns:performance.columns,
					dataSource:performance.dataSource,
					pagination:performance.pagination,
					loading:performance.loading
				});
				console.log(data);
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
					<div className='table-container'>
						<div className='table-cont'>
							<Table
								dataSource={this.state.dataSource}
								loading={this.state.loading}
								scroll={{ x: config.workerPerformanceDetailScroll}}
								pagination={{
									total:this.state.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.state.columns.map(function(item){
										if(item.dataIndex == 'jth' || item.dataIndex == 'jgzjlb' || item.dataIndex == 'ghzj'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex].length - b[item.dataIndex].length
														}
													>
													</Column>
										}else if(item.dataIndex == 'rbhgl'){
											return <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={(a,b) => transformNumber(a[item.dataIndex]) - transformNumber(b[item.dataIndex])}
													>
													</Column>
										}else if(item.dataIndex == 'sxsj'){
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
function transformNumber(str){
	var arg = str.split('%')[0];
	arg = Number(arg);
	return arg;
}

const mapStateToProps = (state) => {
	return {
		title:state.title
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

WorkerPerformanceDetail = connect(mapStateToProps)(WorkerPerformanceDetail);

export default WorkerPerformanceDetail;