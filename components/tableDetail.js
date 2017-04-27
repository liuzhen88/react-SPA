/*
*	name:日明细报表二级表单
*	author: liuzhen
*	time: 2016/12/07
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import {Table} from 'antd';
import MeunList from './MeunList';
import Title from './title';
import config from './config';

const { Column } = Table;

let TableDetail = React.createClass({
	getInitialState() {
		return {
			columns:[],
			dataSource:[],
			pagination:{
				total:1
			},
			loading:true
		}	
	},
	componentDidMount() {
		var id = this.props.location.query.id;
		var type = this.props.location.query.type;
		let title = '';
		switch(type){
			case 'hs':
				title = '合绳日明细报表详情';
				break;
			case 'ng':
				title = '捻股日明细报表详情';
				break;
			case 'ls':
				title = '拉丝日明细报表详情';
				break;
			default:
				title = '合绳日明细报表详情';
				break;
		}
		this.props.dispatch(actions.changeTitle(title));
		let parentData = this.props.tableStore;
		var listDataSource = [];
		parentData.dataSource.forEach(function(value,index){
			if(value.id == id){
				listDataSource = value.childList;
			}
		});
		parentData.columns.forEach(function(vv,ii){
			if(vv.dataIndex == 'num'){
				parentData.columns.splice(ii,1);
			}
		});
		parentData.columns.forEach(function(vv,ii){
			if(vv.dataIndex == 'unqualNum'){
				parentData.columns.splice(ii,1);
			}
		});
		parentData.columns.push({
			title:'轮盘编号',
			dataIndex:'lpbh'
		},{
			title:'是否合格',
			dataIndex:'zjjg'
		},{
			title:'不良原因',
			dataIndex:'blyy'
		},{
			title:'报废原因',
			dataIndex:'bfyy'
		});
		var paginations = {
			total:listDataSource.length
		}
		this.setState({
			columns:parentData.columns,
			dataSource:listDataSource,
			pagination:paginations,
			loading:false
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
								scroll={{ x: config.dayDetailSecondScroll}}
								pagination={{
									total:this.state.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.state.columns.map(function(item){
										if(item.dataIndex == 'jth' || item.dataIndex == 'yt' || item.dataIndex == 'jgzj' || item.dataIndex == 'lb' || item.dataIndex == 'lpbh'){	
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
		tableStore:state.tableStore,
		dayTableDetail:state.dayTableDetail
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

TableDetail = connect(mapStateToProps)(TableDetail);

export default TableDetail;