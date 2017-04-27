/*
*	name:机台开机率分析表(合绳，捻股，拉丝)
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
import $ from 'jquery';
import config from './config';

const { Column, ColumnGroup } = Table;
const serverUrl = config.serverUrl;

let MachineOpenPrecent = React.createClass({
	getInitialState() {
		return {
			jth:[],
			dataSource:[],
			loading:true
		}	
	},
	componentDidMount() {
		let that = this;
		let type = this.props.location.query.type;
		let name = this.getName(type);
		let title = name+'机台开机率分析表';
		this.props.dispatch(actions.changeTitle(title));
		let list = this.props.reportList;
		switch(type){
			case '0':
				list.type = '合绳';
				break;
			case '1':
				list.type = '捻股';
				break;
			case '2':
				list.type = '拉丝';
				break;
		}
		$.ajax({
			url:serverUrl+'/getOpenMachineDetail',
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				that.setState({
					jth:data.data.jth,
					dataSource:data.data.dataSource,
					loading:false
				});
			}
		});
	},
	getName(type){
		let name = '';
		switch(type){
			case "2":
				name = '拉丝';
				break;
			case "1":
				name = '捻股';
				break;
			case "0":
				name = '合绳';
				break;
		}
		return name;
	},
	handleClick(){
		let that = this;
		let list = this.props.reportList;
		let jth = $("#jth").val();
		list.jth = jth;
		this.setState({loading:true});
		$.ajax({
			url:serverUrl+'/getMachineDetailByJth',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				that.setState({
					dataSource:data.data,
					loading:false
				})
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
							<span>机台 : </span>
							<select className='select' id='jth'>
								<option>全部</option>
								{
									this.state.jth.map(function(item){
										return <option key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<Button type="primary" icon="search" id='search' onClick={this.handleClick}>查询</Button>
						<Button type="primary" icon="download" id='download' className='download'>下载</Button>
						<div className='clear'></div>
					</div>
					<div className='table-container'>
						<div className='table-cont'>
							<Table 
								dataSource={this.state.dataSource} 
								loading={this.state.loading}
								scroll={{ x: config.analysisScroll}}
								pagination={{
									total:this.state.dataSource.length,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}} 
								bordered>
								<Column
									title="机台号"
									dataIndex="jth"
									key="jth">
								</Column>
								<ColumnGroup title="调产损失">
									<Column
										title='时间(h)'
										dataIndex='adjustTime'
										key='adjustTime'
									>
									</Column>
									<Column
										title='损失率'
										dataIndex='adjustLoss'
										key='adjustLoss'
									>
									</Column>
								</ColumnGroup>
								<ColumnGroup title="故障停机损失">
									<Column
										title='时间(h)'
										dataIndex='pauseTime'
										key='pauseTime'
									>
									</Column>
									<Column
										title='损失率'
										dataIndex='pauseLoss'
										key='pauseLoss'
									>
									</Column>
								</ColumnGroup>
								<ColumnGroup title="中间停机损失">
									<Column
										title='时间(h)'
										dataIndex='middlePauseTime'
										key='middlePauseTime'
									>
									</Column>
									<Column
										title='损失率'
										dataIndex='middlePauseLoss'
										key='middlePauseLoss'
									>
									</Column>
								</ColumnGroup>
								<ColumnGroup title="机台闲置损失">
									<Column
										title='时间(h)'
										dataIndex='unUseTime'
										key='unUseTime'
									>
									</Column>
									<Column
										title='损失率'
										dataIndex='unUseLoss'
										key='unUseLoss'
									>
									</Column>
								</ColumnGroup>
								<ColumnGroup title="不合格品产出">
									<Column
										title='时间(h)'
										dataIndex='failTime'
										key='failTime'
									>
									</Column>
									<Column
										title='损失率'
										dataIndex='failLoss'
										key='failLoss'
									>
									</Column>
								</ColumnGroup>
								<Column
									title='实现产能(吨)'
									dataIndex='realizeProduct'
									key='realizeProduct'
								>
								</Column>
								<Column
									title='预估损失产能'
									dataIndex='LossProduct'
									key='LossProduct'
								>
								</Column>
								<Column
									title='开机率'
									dataIndex='openMachinePrecent'
									key='openMachinePrecent'
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

const mapStateToProps = (state) => {
	return {
		reportList:state.reportList
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

MachineOpenPrecent = connect(mapStateToProps)(MachineOpenPrecent);

export default MachineOpenPrecent;