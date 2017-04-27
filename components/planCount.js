/*
*	name:计划完成率-计划完成量统计(合绳,捻股,拉丝)
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
import {Table} from 'antd';
import config from './config';
import load from 'url?limit=10000!../images/load.gif';

const serverUrl = config.serverUrl;
const { Column, ColumnGroup } = Table;

let PlanCount = React.createClass({
	drawBar2D(width,data,max,title){
		let chart = new iChart.Bar2D({
			render : 'bar-2d',
			data: data,
			title : {
				text:title,
				color:'#b5bcc5'
			},
			width : width,
			height : 300,
			offsetx:20,
			animation:true,
			coordinate:{
				width:0.8*width,
				height:160,
				grid_color:'#4e5464',
				axis:{
					color:'#4e5464',
					width:[0,0,8,1]
				},
				scale:[{
					 position:'bottom',	
					 start_scale:0,
					 end_scale:max,
					 scale_space:(max/5),
					 label:{color:'#ffffff'},
					 listeners:{
						parseText:function(t,x,y){
							return {text:t}
						}
					 }
				}]
			},
			label:{color:'#dcdcdc'},
			background_color : '#2e2e2e',
			sub_option:{
				listeners:{
					parseText:function(r,t){
						return t;
					}
				}
			},
			legend:{enable:false}
		});
		chart.plugin(new iChart.Custom({
			drawFn:function(){
				var coo = chart.getCoordinate(),
					x = coo.get('originx'),
					y = coo.get('originy'),
					h = coo.height;
				chart.target.textAlign('start')
				.textBaseline('bottom')
				.textFont('600 11px Verdana')
				.fillText('(吨)',x-30,y+h+30,false,'#a8b2d7');
				
			}
		}));
		chart.draw();
	},
	getInitialState() {
		return {
			dataSource:[],
			load:{
				'display':'block'
			}
		}	
	},
	componentDidMount() {
		$('html, body').animate({scrollTop:0}, 50);
		let that = this;	
		let list = this.props.reportList;
		$.ajax({
			url:serverUrl+'/countPlanComplete',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				console.log(data);
				that.setState({
					dataSource:data.table,
					load:{
						'display':'none'
					}
				});
				let datas = [
					{name : '合绳',value : data.rootHs,color:config.color.hs},
					{name : '捻股',value : data.rootNg,color:config.color.ng},
					{name : '拉丝',value : data.rootLs,color:config.color.ls},
				];
				let width = $("#bar-2d").width();
				that.drawBar2D(width,datas,data.max,data.title);
				let title = data.title;
				that.props.dispatch(actions.changeTitle(title));
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
					<div className='line-base-2d-container conta'>
						<div id='bar-2d'></div>
						<div className='loading' style={this.state.load}>
							<img src={load}/>
						</div>
					</div>
					<div className='plan-count-container'>
						<div className='plan-count'>
							<Table 
								dataSource={this.state.dataSource}
								scroll={{ x: config.planCountScroll}}
								pagination={{
									total:this.state.dataSource.length,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}  
								bordered>
								<Column
									title="日期"
									dataIndex="rksj"
									key="rksj"
									sorter={
										(a,b) => getUnixTime(a['rksj']) - getUnixTime(b['rksj'])
									}>
								</Column>
								<ColumnGroup title="拉丝">
									<Column
										title="计划产量(吨)"
										dataIndex="cpsjhcl"
										key="cpsjhcl"
										sorter={(a,b) => a['cpsjhcl'] - b['cpsjhcl']}>
									</Column>
									<Column
										title="拉丝实际产量(吨)"
										dataIndex="cps"
										key="cps"
										sorter={(a,b) => a['cps'] - b['cps']}>
									</Column>
									<Column
										title="完成率"
										dataIndex="cpswcl"
										key="cpswcl"
										sorter={(a,b) => transformNumber(a['cpswcl']) - transformNumber(b['cpswcl'])}>
									</Column>
								</ColumnGroup>
								<ColumnGroup title="捻股">
									<Column
										title="计划产量(吨)"
										dataIndex="cpgjhcl"
										key="cpgjhcl"
										sorter={(a,b) => a['cpgjhcl'] - b['cpgjhcl']}>
									</Column>
									<Column
										title="捻股实际产量(吨)"
										dataIndex="cpg"
										key="cpg"
										sorter={(a,b) => a['cpg'] - b['cpg']}>
									</Column>
									<Column
										title="累计完成率"
										dataIndex="cpgwcl"
										key="cpgwcl"
										sorter={(a,b) => transformNumber(a['cpgwcl']) - transformNumber(b['cpgwcl'])}>
									</Column>
								</ColumnGroup>
								<ColumnGroup title="合绳">
									<Column
										title="计划产量(吨)"
										dataIndex="gssjhcl"
										key="gssjhcl"
										sorter={(a,b) => a['gssjhcl'] - b['gssjhcl']}>
									</Column>
									<Column
										title="合绳实际产量(吨)"
										dataIndex="gss"
										key="gss"
										sorter={(a,b) => a['gss'] - b['gss']}>
									</Column>
									<Column
										title="累计完成率"
										dataIndex="gsswcl"
										key="gsswcl"
										sorter={(a,b) => transformNumber(a['gsswcl']) - transformNumber(b['gsswcl'])}>
									</Column>
								</ColumnGroup>
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
		reportList:state.reportList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

PlanCount = connect(mapStateToProps)(PlanCount);

export default PlanCount;