/*
*	name:生产量报表日报表
*	author: liuzhen
*	time: 2016/12/21
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import {Table} from 'antd';

let DayReport = React.createClass({
	getInitialState() {
		return {
			columns:[
				{
					title:'操作工',
					dataIndex:'operator'
				},
				{
					title:'规格',
					dataIndex:'struct'
				},
				{
					title:'直径',
					dataIndex:"diameter"
				},
				{
					title:'捻向',
					dataIndex:'twist'
				},
				{
					title:"捻距",
					dataIndex:'distance'
				},
				{
					title:'单件米长',
					dataIndex:'meters_length'
				}
			]
		}	
	},
	render(){
		return (
			<div>
				<Table
					columns={this.state.columns}
					dataSource={this.props.dayReport.dataSource}
					pagination={this.props.dayReport.pagination}
					loading={this.props.dayReport.loading}
					bordered
				>
				</Table>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {
		dayReport:state.dayReport,
		reportList:state.reportList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

DayReport = connect(mapStateToProps)(DayReport);

export default DayReport;