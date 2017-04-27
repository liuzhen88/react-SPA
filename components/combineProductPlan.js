/*
*	name:订单状态表二级页面(合绳，捻股，拉丝)
*	author: liuzhen
*	time: 2016/12/26
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MeunList from './MeunList';
import Title from './title';
import actions from '../actions/action';
import {Table} from 'antd';
import $ from 'jquery';
import config from './config';
import {Link} from 'react-router';

const { Column } = Table;
const serverUrl = config.serverUrl;

let orderStatusSecondDetail = React.createClass({
	getInitialState() {
		return {
			columns:[
				{
					title:'工段制造号',
					dataIndex:'gdzzh'
				},
				{
					title:'结构-直径',
					dataIndex:'jgzj'
				},
				{
					title:'类别',
					dataIndex:'lb'
				},
				{
					title:'强度(Mpa)',
					dataIndex:'qd'
				},
				{
					title:'表面状态',
					dataIndex:'bmzt'
				},
				{
					title:'捻向',
					dataIndex:'nx'
				},
				{
					title:'段长',
					dataIndex:'dc'
				},
				{
					title:'段数',
					dataIndex:'ds'
				},
				{
					title:'单件米长',
					dataIndex:'djmc'
				},
				{
					title:'重量',
					dataIndex:'zl'
				},
				{
					title:'总件数',
					dataIndex:'zjs'
				},
				{
					title:'已完成件数',
					dataIndex:'ywcjs'
				},
				{
					title:'不合格件数',
					dataIndex:'bhgjs'
				},
				{
					title:'未完成件数',
					dataIndex:'wwcjs'
				},
				{
					title:'可用存量',
					dataIndex:'kycl'
				},
				{
					title:'预计完成时间',
					dataIndex:'yjwcsj'
				},
				{
					title:'状态',
					dataIndex:'zt'
				},
				{
					title:'在制机台数',
					dataIndex:'zzjts'
				}
			],
			dataSource:[],
			pagination:{
				total:0
			},
			loading:true
		}	
	},
	componentDidMount() {
		let that = this;
		let title = '订单状态表明细';
		this.props.dispatch(actions.changeTitle(title));
		let query = this.props.location.query;
		$.ajax({
			url:serverUrl+'/getOrderStatusDetail',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:query,
			success:function(data){
				that.setState({
					dataSource:data,
					pagination:{
						total:data.length
					},
					loading:false
				});
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
					<div className='table-container'>
						<div className='table-cont'>
							<Table
								dataSource={this.state.dataSource}
								loading={this.state.loading}
								scroll={{ x: config.orderStatusScroll}}
								pagination={{
									total:this.state.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.state.columns.map(function(item){
										if(item.dataIndex == 'gdzzh' || item.dataIndex == 'jgzj' || item.dataIndex == 'lb'){	
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => a[item.dataIndex].length - b[item.dataIndex].length
														}
													>
													</Column>
										}else if(item.dataIndex == 'yjwcsj'){
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
									render={
										(text,record) => {
											if(record.gdzzh!=''){
												return (
													<Link to={
														{
															pathname:'/workPlanMachineDetail',
															query:{
																gdzzh:record.gdzzh
															}
														}
													}>
														查看
													</Link>
												)
											}else{
												return (
													<a></a>
												)
											}
										}
									}
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
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

orderStatusSecondDetail = connect(mapStateToProps)(orderStatusSecondDetail);

export default orderStatusSecondDetail;