/*
*	name:订单状态表(合绳，捻股，拉丝)
*	author: liuzhen
*	time: 2016/12/25
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MeunList from './MeunList';
import Title from './title';
import actions from '../actions/action';
import {Table,Button,message} from 'antd';
import {Link} from 'react-router';
import $ from 'jquery';
import config from './config';

const { Column } = Table;
const serverUrl = config.serverUrl;

let OrderStatus = React.createClass({
	getInitialState() {
		return {
			jgzj:[],
			ddh:[],
			status:['未完工','已完工'],
			defaultOrderNum:'全部'
		}	
	},
	componentDidMount() {
		let that = this;
		let title = '订单状态表';
		let ddh = '全部';
		if(this.props.location){
			let query = this.props.location.query;
			if(query.ddh){
				ddh = query.ddh;
				this.setState({
					defaultOrderNum:ddh
				});
			}
		}
		this.props.dispatch(actions.changeTitle(title));
		this.props.dispatch(actions.getInitOrderStatusAsync({
			jgzj:'全部',
			ddh:ddh,
			status:'全部'
		}));
		$.ajax({
			url:serverUrl+'/getOrderStatusSelect',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				that.setState({
					jgzj:data.jgzj,
					ddh:data.ddh
				});
			}
		});
	},
	handleSearch(){
		this.props.dispatch(actions.getInitOrderStatusAsync({
			jgzj:document.getElementById('jgzj').value,
			ddh:document.getElementById('ddh').value,
			status:document.getElementById('zt').value
		}));
	},
	handleDownload(){
		let list = {
			jgzj:document.getElementById('jgzj').value,
			ddh:document.getElementById('ddh').value,
			status:document.getElementById('zt').value
		};
		this.getHref(list);
	},
	getHref(list){
		$.ajax({
			url:serverUrl+'/downloadOrderStatus',
			type:'get',
			data:list,
			dataType:'jsonp',
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
						<div className='selection'>
							<span>订单号 : </span>
							<select className='select' id='ddh' defaultValue={this.state.defaultOrderNum}>
								<option value='全部'>全部</option>
								{
									this.state.ddh.map(function(item){
										return <option key={item} value={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>结构直径 : </span>
							<select className='select' id='jgzj' defaultValue='全部'>
								<option value='全部'>全部</option>
								{
									this.state.jgzj.map(function(item){
										return <option key={item} value={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>状态 : </span>
							<select className='select' id='zt' defaultValue='全部'>
								<option value='全部'>全部</option>
								{
									this.state.status.map(function(item){
										return <option key={item} value={item}>{item}</option>
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
								dataSource={this.props.orderStatus.dataSource}
								loading={this.props.orderStatus.loading}
								scroll={{ x: config.orderStatusScroll}}
								pagination={{
									total:this.props.orderStatus.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.props.orderStatus.columns.map(function(item){
										if(item.dataIndex == 'ddh' || item.dataIndex == 'jgzj'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex].length - b[item.dataIndex].length
														}
													>
													</Column>
										}else if(item.dataIndex == 'sjwcsj' || item.dataIndex == 'jhrq'){
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
												pathname:'/combineProductPlan',
												query:{
													id:record.id,
													jgzj:record.jgzj,
													status:record.status,
													cpbh:record.cpbh,
													lx:record.lx
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
		orderStatus:state.orderStatus,
		meun:state.meun
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

OrderStatus = connect(mapStateToProps)(OrderStatus);

export default OrderStatus;