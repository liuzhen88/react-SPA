/*
*	name:不合格率统计表
*	author: liuzhen
*	time: 2016/12/15
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import iChart from 'ichart';
import actions from '../actions/action';
import MeunList from './MeunList';
import Title from './title';
import $ from 'jquery';
import {Table,Icon} from 'antd';
import {Link} from 'react-router';
import config from './config';

const serverUrl = config.serverUrl;
const { Column } = Table;

let UnQualifyCount = React.createClass({
	drawLineBasic2D(width,date,datas,title){		
		let chart = new iChart.LineBasic2D({
			render : 'line-base-2d',
			data:datas,
			align:'center',
			title : {
				text:title,
				font : '微软雅黑',
				fontsize:24,
				color:'#b4b4b4'
			},
			labels:date,
			animation:true,
			animation_duration:500,
			width : width,
			height : 400,
			shadow:true,
			shadow_color : '#202020',
			shadow_blur : 8,
			shadow_offsetx : 0,
			shadow_offsety : 0,
			background_color:'#2e2e2e',
			crosshair:{
				enable:true,
				line_color:'#ec4646'
			},
			tip:{
				enable:true,
				shadow:true,
				listeners:{
					parseText:function(tip,name,value,text,i){
						return "<span style='color:#005268;font-size:12px;'>"+date[i]+"号"+name+"不合格率:<br/>"+
						"</span><span style='color:#005268;font-size:20px;'>"+value+"%</span>";
					}
				}
			},
			sub_option : {
				smooth : true,
				label:false,
				hollow:false,
				hollow_inside:false,
				point_size:8
			},
			legend:{
	            enable : true,
                shadow:true,
                background_color:null,
                border:false,
                legend_space:60,//图例间距
                line_height:14,//设置行高
                sign_space:2,//小图标与文本间距
                sign_size:40,//小图标大小
                color:'#fff',
                fontsize:15,
                align:'right',
                offsety:-10,
                row:1,
                column:'middle',
                valign:'top'
	        },
			coordinate:{
				width:0.9*width,
				height:260,
				striped_factor : 0.18,
				grid_color:'#4e4e4e',
				scale:[{
					 position:'left',	
					 start_scale:0,
					 end_scale:100,
					 scale_space:10,
					 scale_size:2,
					 scale_enable : false,
					 label : {color:'#9d987a',font : '微软雅黑',fontsize:11,fontweight:600},
					 scale_color:'#9f9f9f'
				},{
					 position:'bottom',	
					 label : {color:'#9d987a',font : '微软雅黑',fontsize:11,fontweight:600},
					 labels:date
				}]
			}
		});
		chart.draw();
	},
	getInitialState() {
		let lookMore = {};
		for(let i=0;i<31;i++){
			lookMore[i] = {
				'display':'none'
			}
		}
		return {
			dataSource:[],
			pagination:{
				total:0
			},
			loading:true,
			columns:[
				{
					title:'日期',
					dataIndex:'rksj'
				},
				{
					title:'拉丝不合格率',
					dataIndex:'lsbhgl'
				},
				{
					title:'捻股不合格率',
					dataIndex:'ngbhgl'
				},
				{
					title:'合绳不合格率',
					dataIndex:'hsbhgl'
				}
			],
			lookMore:lookMore
		}
	},
	componentDidMount() {
		$('html, body').animate({scrollTop:0}, 50);
		let that = this;
		let list = this.props.reportList;
		let meun = {
			defaultOpenKeys:['71'],
			current:'71'
		}
		this.props.dispatch(actions.meunChangeAction(meun));
		$.ajax({
			url:serverUrl+'/getUnQualifyDetail',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				let title = data.title;
				that.props.dispatch(actions.changeTitle(title));
				let datas = [
					{name:'合绳',value:data.rootHs,color:config.color.hs,line_width:2},
					{name:'捻股',value:data.rootNg,color:config.color.ng,line_width:2},
					{name:'拉丝',value:data.rootLs,color:config.color.ls,line_width:2}
				];
				var width = $("#line-base-2d").width();
				let date = data.labels;
				that.drawLineBasic2D(width,date,datas,data.title);
				that.setState({
					dataSource:data.table,
					pagination:{
						total:data.table.length
					},
					loading:false
				});
			}
		});
	},
	handleLookMore(v,e) {
		console.log(this);
		console.log(v);
		console.log(e);
	},
	render(){
		if(this.props.reportList.bblx == '月报表'){	
			return (
				<div className='cont'>
					<Title/>
					<div className='null'></div>
					<div className='meun-list-left'>
						<MeunList/>
					</div>
					<div className='meun-list-right'>
						<div className='line-base-2d-container'>
							<div id='line-base-2d'></div>
						</div>
						<div className='table-containers'>
							<Table
								dataSource={this.state.dataSource}
								scroll={{ x: config.unQualifyCountScorll}}
								pagination={{
									total:this.state.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}  
								loading={this.state.loading}
							>
								{
									this.state.columns.map(function(item){
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
										}else{

											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => transformNumber(a[item.dataIndex]) - transformNumber(b[item.dataIndex])
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
										<div className='look-more-container'>
											<a className="ant-dropdown-link" onClick={
												() => {
													let lookMore = this.state.lookMore;
													for(let key in lookMore){
														if(key != record.index){
															lookMore[key] = {
																'display':'none'
															}
														}
													}
													if(lookMore[record.index]['display'] == 'none'){

														lookMore[record.index] = {
															'display':'block'
														}
														this.setState({
															lookMore:lookMore
														})
													}else{
														lookMore[record.index] = {
															'display':'none'
														}
														this.setState({
															lookMore:lookMore
														})
													}
												}
											}>
												查看
												<Icon type='down'/>
											</a>
											<div className='look-more' style={this.state.lookMore[record.index]}>
												<Link to={
													{
														pathname:'/dayUnqualifyHs',
														query:{
															time:record.rksj
														}
													}
												} className='look-more-list'>
													合绳
												</Link>
												<Link to={
													{
														pathname:'/dayUnqualifyNg',
														query:{
															time:record.rksj
														}
													}
												} className='look-more-list'>
													捻股
												</Link>
												<Link to={
													{
														pathname:'/dayUnqualifyLs',
														query:{
															time:record.rksj
														}
													}
												} className='look-more-list'>
													拉丝
												</Link>
											</div>
										</div>
									)}
								>
								</Column>
							</Table>
						</div>
					</div>
				</div>
			)
		}else{
			return (
				<div className='cont'>
					<Title/>
					<div className='null'></div>
					<div className='meun-list-left'>
						<MeunList/>
					</div>
					<div className='meun-list-right'>
						<div className='line-base-2d-container'>
							<div id='line-base-2d'></div>
						</div>
						<div className='table-containers'>
							<Table
								dataSource={this.state.dataSource}
								scroll={{ x: config.unQualifyCountScorll}}
								pagination={{
									total:this.state.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}  
								loading={this.state.loading}
							>
								{
									this.state.columns.map(function(item){
										if(item.dataIndex == 'rksj'){
											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
													>
													</Column>
										}else{

											return  <Column
														title={item.title}
														dataIndex={item.dataIndex}
														key={item.title}
														sorter={
															(a,b) => transformNumber(a[item.dataIndex]) - transformNumber(b[item.dataIndex])
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
			)
		}
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
		reportList:state.reportList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

UnQualifyCount = connect(mapStateToProps)(UnQualifyCount);

export default UnQualifyCount;