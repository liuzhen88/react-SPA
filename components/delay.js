/*
*	name:延期订单明细表(合绳，捻股，拉丝)
*	author: liuzhen
*	time: 2016/12/14
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table,Button} from 'antd';
import {Link} from 'react-router';
import actions from '../actions/action';
import MeunList from './MeunList';
import Title from './title';
import config from './config';
import $ from 'jquery';

const { Column } = Table;
const serverUrl = config.serverUrl;

let Delay = React.createClass({
	getInitialState() {
		return {
			jgzj:[],
			ddh:[],
            columns:[],
            dataSource:[],
            pagination:{
                total:0
            },
            loading:true,
            title:''
		}	
	},
	componentDidMount() {
		let reportList = this.props.reportList;
		let list = {
			startTime:reportList.startTime + ' ' + '00:00:00',
			endTime:reportList.endTime + ' ' + '00:00:00',
			jgzj:'全部',
			ddh:'全部',
			bblx:reportList.bblx
		}
		this.searchDelayOrder(list,true);
	},
	searchDelayOrder(list,flag){
		let that = this;
		$.ajax({
			url:serverUrl+'/getDelayOrderByYearMonth',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				let result = data.data;
				let title = data.title;
				that.setState({
					columns:result.delay.columns,
					dataSource:result.delay.dataSource,
					loading:false,
					pagination:result.delay.pagination
				});
				if(flag == true){
					that.setState({
						ddh:result.ddh,
					});
				}
				that.props.dispatch(actions.changeTitle(title));
			}
		});
	},
	handleSearch(){
		let reportList = this.props.reportList;
		let list = {
			startTime:reportList.startTime + ' ' + '00:00:00',
			endTime:reportList.endTime + ' ' + '00:00:00',
			jgzj:document.getElementById('jgzj').value,
			ddh:document.getElementById('ddh').value,
			bblx:reportList.bblx
		}
		this.searchDelayOrder(list,false);
	},
	handleDownload(){
		let reportList = this.props.reportList;
		let list = {
			startTime:reportList.startTime + ' ' + '00:00:00',
			endTime:reportList.endTime + ' ' + '00:00:00',
			jgzj:document.getElementById('jgzj').value,
			ddh:document.getElementById('ddh').value,
			bblx:reportList.bblx
		}
		this.getHref(list);
	},
	getHref(list){
		$.ajax({
			url:serverUrl+'/downloadDelay',
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
						<div className='selection'>
							<span>结构直径 : </span>
							<select className='select' id='jgzj'>
								<option>全部</option>
								{
									this.state.jgzj.map(function(item){
										return <option key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>订单号 : </span>
							<select className='select' id='ddh'>
								<option>全部</option>
								{
									this.state.ddh.map(function(item){
										return <option key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<Button type="primary" icon="search" id='search' onClick={this.handleSearch}>查询</Button>
						<Button type="primary" icon="download" id='download' className='download' onClick={this.handleDownload}>下载</Button>
						<div className='clear'></div>
					</div>
					<div className='table-container'>
						<div className='table-cont'>
							<Table
								dataSource={this.state.dataSource}
								scroll={{ x: config.delayScroll}}
								pagination={{
									total:this.state.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}} 
								loading={this.state.loading}
							>
								{
									this.state.columns.map(function(item){
										if(item.dataIndex == 'ddh' || item.dataIndex == 'jgzj' || item.dataIndex == 'nx'){

											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex].length - b[item.dataIndex].length
														}
													>
													</Column>
										}else if(item.dataIndex == 'jhrq' || item.dataIndex == 'yjwcsj'){
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
								<Column
									title='操作'
									key='action'
									render={(text, record) => (
										<Link to={
											{
												pathname:'/orderStatus',
												query:{
													id:record.id,
													ddh:record.ddh
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
		delay:state.delay,
		reportList:state.reportList
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

Delay = connect(mapStateToProps)(Delay);

export default Delay;