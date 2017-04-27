/*
*	name:存量动态表-捻股
*	author: liuzhen
*	time: 2016/12/12
*/
import React from 'react';
import {Table,DatePicker,Button,message} from 'antd';
import MeunList from './MeunList';
import Title from './title';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import config from './config';
import $ from 'jquery';

const { Column } = Table;
const serverUrl = config.serverUrl;

let StoreNg = React.createClass({
	handleSearch(){
		let gdzzh = document.getElementById('gdzzh').value;
		let jgzj = document.getElementById('store-jg-zj').value;
		let storeTableData = {
			columns:this.props.storeTable.columns,
			dataSource:this.props.storeTable.dataSource,
			pagination:this.props.storeTable.pagination,
			loading:true
		}
		this.props.dispatch(actions.changeLoading(storeTableData));
		this.props.dispatch(actions.storeActionSelectAsync({
			gdzzh:gdzzh,
			jgzj:jgzj,
			type:'1'
		}));
	},
	componentDidMount() {
		let selectOptions = {
			gdzzh:document.getElementById('gdzzh').value,
			jgzj:document.getElementById('store-jg-zj').value,
			type:'1'
		}
		this.props.dispatch(actions.storeActionAsync(selectOptions));
		let title = '捻股存量动态表';
		this.props.dispatch(actions.changeTitle(title));	
	},
	handleDownload(){
		let gdzzh = document.getElementById('gdzzh').value;
		let jgzj = document.getElementById('store-jg-zj').value;
		this.getHref({
			gdzzh:gdzzh,
			jgzj:jgzj,
			type:'1'
		});
	},
	getHref(list){
		$.ajax({
			url:serverUrl+'/downloadStore',
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
							<span>工段制造号 : </span>
							<select className='select' id='gdzzh'>
								<option>全部</option>
								{
									this.props.store.gdzzh.map(function(item){
										return <option key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>结构-直径 : </span>
							<select className='select' id='store-jg-zj'>
								<option>全部</option>
								{
									this.props.store.jgzj.map(function(item){
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
								dataSource={this.props.storeTable.dataSource}
								loading={this.props.storeTable.loading}
								scroll={{ x: config.storeTableScroll}}
								pagination={{
									total:this.props.storeTable.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}
							>
								{
									this.props.storeTable.columns.map(function(item){
										if(item.dataIndex == 'gdzzh' || item.dataIndex == 'jgzj' || item.dataIndex == 'lb' || item.dataIndex == 'lp'){	
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
		store:state.store,
		storeTable:state.storeTable
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

StoreNg = connect(mapStateToProps)(StoreNg);

export default StoreNg;