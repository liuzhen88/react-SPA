/*
*	name:下机量统计表
*	author: liuzhen
*	time: 2016/12/15
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import iChart from 'ichart';
import $ from 'jquery';
import MeunList from './MeunList';
import Title from './title';
import {Table} from 'antd';
import config from './config';
import load from 'url?limit=10000!../images/load.gif';

const { Column } = Table;
const serverUrl = config.serverUrl;

let DeplaneDetail = React.createClass({
	drawLineBasic2D(data,width,date,title,max){		
		let chart = new iChart.LineBasic2D({
			render : 'line-base-2ds',
			data: data,
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
						return "<span style='color:#005268;font-size:12px;'>"+date[i]+name+"下机量:<br/>"+
						"</span><span style='color:#005268;font-size:20px;'>"+value+"吨</span>";
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
					 end_scale:max,
					 scale_space:(max/10),
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
					title:'成品丝(吨)',
					dataIndex:'cps'
				},
				{
					title:'成品股(吨)',
					dataIndex:'cpg'
				},
				{
					title:'钢丝绳(吨)',
					dataIndex:'gss'
				},
				{
					title:'每天合计',
					dataIndex:'zcl'
				}
			],
			load:{
				'display':'block'
			}
		}	
	},
	componentDidMount() {
		$('html, body').animate({scrollTop:0}, 50);
		let that = this;
		let list = this.props.reportList;
		var width = $("#line-base-2ds").width();
		
		$.ajax({
			url:serverUrl+'/getDeplaneDetail',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				let datas = [
					{name:'合绳',value:data.rootHs,color:config.color.hs,line_width:2},
					{name:'捻股',value:data.rootNg,color:config.color.ng,line_width:2},
					{name:'拉丝',value:data.rootLs,color:config.color.ls,line_width:2}
				];
				that.setState({
					load:{
						'display':'none'
					}
				});
				that.drawLineBasic2D(datas,width,data.labels,data.title,data.max);
				that.setState({
					dataSource:data.table,
					loading:false,
					pagination:{
						total:data.table.length
					}
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
					<div className='line-base-2d-container load-container'>
						<div id='line-base-2ds'></div>
						<div className='loading' style={this.state.load}>
							<img src={load}/>
						</div>
					</div>
					<div className='table-containers'>
						<Table
							dataSource={this.state.dataSource}
							scroll={{ x: config.deplanDetailScorll}}
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
		)
	}
});

const mapStateToProps = (state) => {
	return {
		reportList:state.reportList
	}
}

DeplaneDetail = connect(mapStateToProps)(DeplaneDetail);

export default DeplaneDetail;