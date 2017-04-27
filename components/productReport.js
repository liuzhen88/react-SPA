/*
*	name:生产量报表(合绳，捻股，拉丝)
*	author: liuzhen
*	time: 2016/12/14
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table,DatePicker,Button,message} from 'antd';
import MeunList from './MeunList';
import Title from './title';
import actions from '../actions/action';
import OpenMachinePrecent from './OpenMachinePrecent';
import Deplane from './deplane';
import {Link} from 'react-router';
import $ from 'jquery';
import ichart from 'ichart';
import {createHashHistory} from 'history';
import config from './config';
import load from 'url?limit=1000!../images/load.gif';
import DayReport from './dayReport';

const history = createHashHistory();
const serverUrl = config.serverUrl;
const {MonthPicker,RangePicker} = DatePicker;

let ProductReport = React.createClass({
	drawPie(data,renderContainer,width,stateNum){
		var chart = new iChart.Pie2D({
			render : renderContainer,
			data: data,
			showpercent:true,
			decimalsnum:2,
			width : $("#plan-complete-precent").width(),
			height : 300,
			radius:80,
			sub_option : {
				label : {
					background_color:null,
					sign:false,
					fontsize:11,
					fontweight:600,
					color : '#4572a7'
				},
				border:{
					width:0
				},
				listeners:{
					click:function(c, e){
						switch(stateNum){
							case 0:
								history.push('/productReport');
								history.replace('/planCount');
								break;
							case 1:
								history.push('/productReport');
								history.replace('/unQualifyCount');
								break;
							case 2:
								history.push('/productReport');
								history.replace('/productCount');
								break;
						}
					}
				}
			},
			bound_event:'click',
			turn_off_touchmove:true,
			animation:true
		});
		chart.draw();
	},
	drawLineBasic2D(date,data,max,text){	
		let w = $("#line-basic-charts").width();
		let chart = new ichart.LineBasic2D({
			render : 'line-basic-charts',
			data: data,
			align:'center',
			title : {
				text:text,
				font : '微软雅黑',
				fontsize:24,
				color:'#b4b4b4'
			},
			labels:date,
			animation:true,
			animation_duration:500,
			width : w,
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
						return "<span style='color:#005268;font-size:12px;'>"+date[i]+""+name+"产量:<br/>"+
						"</span><span style='color:#005268;font-size:20px;'>"+Number(value).toFixed(2)+"kg</span>";
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
				width:0.9*w,
				height:260,
				striped_factor : 0.18,
				grid_color:'#4e4e4e',
				scale:[{
					 position:'left',	
					 start_scale:0,
					 end_scale:max,
					 scale_space:(max/6),
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
					 scale_space:(max/4),
					 label:{color:'#ffffff'},
					 listeners:{
						parseText:function(t,x,y){
							return {text:t}
						}
					 }
				}]
			},
			label:{color:'#dcdcdc'},
			background_color : '#353757',
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
				.fillText('(吨)',x-40,y+h+30,false,'#a8b2d7');
				
			}
		}));
		chart.draw();
	},
	getInitialState() {
		let timeArr = [];
		for(let i=2010;i<2030;i++){
			timeArr.push(i);
		} 
		return {
			cj:[],
			bz:[],
			gdcp:['拉丝','捻股','合绳'],
			bblx:['月报表','年报表','日报表'],
			dateFormat:'YYYY-MM',
			total:'',
			dayStyle:{
				'display':'none'
			},
			style:{
				'display':'block'
			},
			yearStyle:{
				'display':'none'
			},
			plan:'12月计划完成率',
			unQualify:'12月不合格产出率',
			store:'12月产量统计',
			planLoading:{
				'display':'block'
			},
			unQualifyLoading:{
				'display':'block'
			},
			storeLoading:{
				'display':'block'
			},
			chart:{
				'display':'block'
			},
			table:{
				'display':'none'
			},
			lineBasic:{
				'display':'none'
			},
			basic:{
				'display':'none'
			},
			timeArr:timeArr
		}	
	},
	componentDidMount() {
		let title = '生产量报表';
		let that = this;
		let list = this.props.reportList;
		this.props.dispatch(actions.changeTitle(title));
		$.ajax({
			url:serverUrl+'/getInitReportInfo',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				that.setState({
					cj:data.data.values.org1,
					bz:data.data.values.org2
				});
				that.props.dispatch(actions.changeReportList({
					cj:list.cj,
					bz:list.bz,
					gdcp:list.gdcp,
					bblx:list.bblx,
					startTime:data.time.startTime,
					endTime:data.time.endTime
				}));
			}
		});	
		if(list.bblx != '日报表'){
			if(list.gdcp == '全部'){
				that.setState({
					chart:{
						'display':'block'
					},
					table:{
						'display':'none'
					},
					lineBasic:{
						'display':'none'
					}
				});
				this.props.dispatch(actions.openMachineAsync(list));
				let width = $("#plan-complete-precent").width();
				this.drawPlanComplete(list,width);
				this.drawUnQualify(list,width);
				this.drawStore(list,width);
				this.drawBar(list);
			}else{
				//折线图
				that.setState({
					chart:{
						'display':'none'
					},
					table:{
						'display':'none'
					},
					lineBasic:{
						'display':'block'
					}
				});
			}
			if(list.bblx == '年报表'){
				that.setState({
					dayStyle:{
						'display':'none'
					},
					style:{
						'display':'none'
					},
					yearStyle:{
						'display':'block'
					}
				})
			}
			if(list.bblx == '月报表'){
				that.setState({
					dayStyle:{
						'display':'none'
					},
					style:{
						'display':'block'
					},
					yearStyle:{
						'display':'none'
					}
				});
			}
		}else{
			//日报表
			that.setState({
				chart:{
					'display':'none'
				},
				table:{
					'display':'block'
				},
				lineBasic:{
					'display':'none'
				}
			});
		}
	},
	drawPlanComplete(list,width){
		let that = this;
		$("#plan-complete-precent").empty();
		this.setState({
			planLoading:{
				'display':'block'
			}
		});
		$.ajax({
			url:serverUrl+'/getPlanPieChart',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				var data = data.data;
				that.setState({
					plan:data.text,
					planLoading:{
						'display':'none'
					},
					total:data.total
				});
				var plan = [
					{name:'拉丝',value:data.ls_precent,color:config.color.ls},
					{name:'捻股',value:data.ng_precent,color:config.color.ng},
					{name:'合绳',value:data.hs_precent,color:config.color.hs},
					{name:'',value:data.other,color:config.color.other}
				];
				that.drawPie(plan,'plan-complete-precent',width,0);
			}
		})
	},
	drawUnQualify(list,width){
		let that = this;
		$("#not-match-precent").empty();
		this.setState({
			unQualifyLoading:{
				'display':'block'
			}
		});
		$.ajax({
			url:serverUrl+'/getUnQualifyPieChart',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				var data = data.data;
				that.setState({
					unQualify:data.text,
					unQualifyLoading:{
						'display':'none'
					}
				});
				let unQualify = [
					{name:'捻股',value:data.ng,color:config.color.ng},
					{name:'合绳',value:data.hs,color:config.color.hs},
					{name:'',value:data.other,color:config.color.other},
					{name:'拉丝',value:data.ls,color:config.color.ls},
				];
				that.drawPie(unQualify,'not-match-precent',width,1);
			}
		})
	},
	drawStore(list,width){
		let that = this;
		$("#store-machine-precent").empty();
		this.setState({
			storeLoading:{
				'display':'block'
			}
		});
		$.ajax({
			url:serverUrl+'/getStorePieChart',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				var data = data.data;
				that.setState({
					store:data.text,
					storeLoading:{
						'display':'none'
					}
				});
				let storeData = [
					{name:'拉丝',value:data.shop_cps,color:config.color.ls},
					{name:'捻股',value:data.shop_g,color:config.color.ng},
					{name:'合绳',value:data.shop_gss,color:config.color.hs}
				];
				that.drawPie(storeData,'store-machine-precent',width,2);
			}
		})
	},
	drawBar(newList){
		let width = $("#bar-2d").width();
		let that = this;
		$("#bar-2d").empty();
		$.ajax({
			url:serverUrl+'/completePlanProduct',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:newList,
			success:function(data){
				var result = data.data;
				var datas = [
					{name : '合绳',value : (Number(result.hs).toFixed(2)),color:config.color.hs},
					{name : '捻股',value : (Number(result.ng).toFixed(2)),color:config.color.ng},
					{name : '拉丝',value : (Number(result.ls).toFixed(2)),color:config.color.ls},
				];
				var max = result.max;
				that.drawBar2D(width,datas,max,result.title);
			}
		});	
	},
	handleChange(){
		let reportType = document.getElementById('bblx').value;
		if(reportType == '日报表'){
			this.setState({
				dayStyle:{
					'display':'block'
				},
				style:{
					'display':'none'
				},
				yearStyle:{
					'display':'none'
				}
			});
		}else{
			if(reportType == '年报表'){
				this.setState({
					dayStyle:{
						'display':'none'
					},
					style:{
						'display':'none'
					},
					yearStyle:{
						'display':'block'
					}
				});
				 
			}else{
				this.setState({
					dayStyle:{
						'display':'none'
					},
					style:{
						'display':'block'
					},
					yearStyle:{
						'display':'none'
					}
				});
			}
		}
	},
	handleSearch(){
		let that = this;
		let lx = $("#bblx").val();
		let list = this.props.reportList;
		if(lx != '年报表'){
			if(list.startTime == '' || list.endTime == ''){
				message.warning('时间选择不能为空!');
				return;
			}
		}
		let newList = {
			cj:document.getElementById('cj').value,
			bz:document.getElementById('bz').value,
			gdcp:document.getElementById('gdcp').value,
			bblx:document.getElementById('bblx').value,
			startTime:list.startTime,
			endTime:list.endTime
		}
		if(lx == '年报表'){
			let year = document.getElementById('year-time').value;
			let nextYear = Number(year) + 1;
			let startTime = year + '-01-01';
			let endTime = nextYear + '-01-01';
			newList.startTime = startTime;
			newList.endTime = endTime;
		}
		this.props.dispatch(actions.changeReportList(newList));

		if(newList.bblx == '日报表'){
			that.setState({
				chart:{
					'display':'none'
				},
				table:{
					'display':'block'
				},
				lineBasic:{
					'display':'none'
				}
			});
			let dayReportNew = this.props.dayReport;
			console.log(dayReportNew);
			this.props.dispatch(actions.changeLoad({
				dataSource:dayReportNew.dataSource,
				pagination:{
					total:dayReportNew.dataSource.length
				},
				loading:true
			}));
			this.props.dispatch(actions.dayReportAsync(newList));	
		}else{
			if(newList.gdcp == '全部'){
				that.setState({
					chart:{
						'display':'block'
					},
					table:{
						'display':'none'
					},
					lineBasic:{
						'display':"none"
					}
				});
				this.props.dispatch(actions.openMachineAsync(newList));
				let width = $("#plan-complete-precent").width();
				this.drawPlanComplete(newList,width);
				this.drawUnQualify(newList,width);
				this.drawStore(newList,width);
				this.drawBar(newList);
			}else{
				//折线图
				that.setState({
					chart:{
						'display':'none'
					},
					table:{
						'display':'none'
					},
					lineBasic:{
						'display':"block"
					}
				});
				that.getBasicDataAndDraw(newList);
			}
		}

	},
	getBasicDataAndDraw(list){
		let that = this;
		$("#line-basic-charts").empty();
		that.setState({
			basic:{
				'display':'block'
			}
		});
		$.ajax({
			url:serverUrl+'/getLineBasicData',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				let datas = data.data;
				that.setState({
					basic:{
						'display':'none'
					}
				});
				that.drawLineBasic2D(datas.label,datas.data,datas.max,datas.text);
			}
		});
	},
	getChangeTime(value, dateString) {
		let list = this.props.reportList;
		let newList = {
			cj:list.cj,
			bz:list.bz,
			gdcp:list.gdcp,
			bblx:list.bblx,
			startTime:dateString[0],
			endTime:dateString[1]
		}
		//change report list data
		this.props.dispatch(actions.changeReportList(newList));
	},
	getMonthTime(date, dateString){
		let time = dateString;
		let year = time.split('-')[0];
		let month = time.split('-')[1];
		let startTime = year + '-'+ month + '-01';
		let endTime = '';
		if(month<9){
			let nextMonth = '0'+(Number(month)+1);
			endTime = year + '-' + nextMonth + '-01';
		}else{
			if(month == 12){
				let nextYear = Number(year) + 1;
				endTime = nextYear + '-01-01'
			}else{
				let nextMonth = Number(month) + 1;
				endTime = year + '-' + nextMonth + '-01';
			}
		}
		let list = this.props.reportList;
		let newList = {
			cj:list.cj,
			bz:list.bz,
			gdcp:list.gdcp,
			bblx:list.bblx,
			startTime:startTime,
			endTime:endTime
		}
		this.props.dispatch(actions.changeReportList(newList));
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
							<span>车间 : </span>
							<select className='select' id='cj' defaultValue={this.props.reportList.cj}>
								<option value='全部'>全部</option>
								{
									this.state.cj.map(function(item){
										return <option key={item} value={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>班组 : </span>
							<select className='select' id='bz' defaultValue={this.props.reportList.bz}>
								<option value='全部'>全部</option>
								{
									this.state.bz.map(function(item){
										return <option key={item} value={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>工段产品 : </span>
							<select className='select' id='gdcp' defaultValue={this.props.reportList.gdcp}>
								<option value='全部'>全部</option>
								{
									this.state.gdcp.map(function(item){
										return <option key={item} value={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection'>
							<span>报表类型 : </span>
							<select className='select' id='bblx' onChange={this.handleChange} defaultValue={this.props.reportList.bblx}>
								{
									this.state.bblx.map(function(item){
										return <option key={item} value={item}>{item}</option>
									})
								}
							</select>
						</div>
						<div className='selection' style={this.state.style}>
							<span>日期 : </span>
							<MonthPicker format={this.state.dateFormat} onChange={this.getMonthTime} id='monthInput'/>
						</div>
						<div className='selection' style={this.state.dayStyle}>
							<span>日期 : </span>
							<RangePicker
						        placeholder={['开始时间', '结束时间']}
						        onChange={this.getChangeTime}
						    >
						    </RangePicker>
						</div>
						<div className='selection' style={this.state.yearStyle}>
							<span>日期 : </span>
							<select defaultValue='2016' id='year-time' className='time-select'>
								{
									this.state.timeArr.map(function(item){
										return <option value={item} key={item}>{item}</option>
									})
								}
							</select>
						</div>
						<Button type="primary" icon="search" id='search' onClick={this.handleSearch}>查询</Button>
						<div className='clear'></div>
					</div>
					<div style={this.state.chart}>
						<div className='open-machine-precent'>
							<OpenMachinePrecent/>
							<div className='pie'>
								<div className='pie-container' id='plan-complete-precents'>
									<div className='pie-2d-title'>{this.state.plan}</div>
									<div id='plan-complete-precent' className='pie-containers'></div>
									<div className='loading' style={this.state.planLoading}>
										<img src={load}/>
									</div>
									<div className='plan-total-num'>计划产量{this.state.total}吨</div>
								</div>
								<div className='pie-container' id='not-match-precents'>
									<div className='pie-2d-title'>{this.state.unQualify}</div>
									<div id='not-match-precent' className='pie-containers'></div>
									<div className='loading' style={this.state.unQualifyLoading}>
										<img src={load}/>
									</div>
								</div>
								<div className='pie-container' id='store-machine-precents'>
									<div className='pie-2d-title'>{this.state.store}</div>
									<div id='store-machine-precent' className='pie-containers'></div>
									<div className='loading' style={this.state.storeLoading}>
										<img src={load}/>
									</div>
								</div>
								<div className='clear'></div>
							</div>
						</div>
						<Link to={
							{
								pathname:'/deplaneDetail'
							}
						}>
							<div className='line-base-2d-container box-shadow'>
								<div id='bar-2d'></div>
							</div>
						</Link>
						<div className='clear'></div>
					</div>
					<div style={this.state.table}>
						<DayReport/>
					</div>
					<div style={this.state.lineBasic} className='basic-container'>
						<div id='line-basic-charts'></div>
						<div style={this.state.basic} className='loading'>
							<img src={load}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {
		reportList:state.reportList,
		pie:state.pie,
		dayReport:state.dayReport
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(dispatch,actions)
	}
}

ProductReport = connect(mapStateToProps)(ProductReport);

export default ProductReport;