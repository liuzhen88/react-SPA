/*
*	name:下机量统计图
*	author: liuzhen
*	time: 2016/12/15
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';
import actions from '../actions/action';
import iChart from 'ichart';
import config from './config';

const serverUrl = config.serverUrl;

let Deplane = React.createClass({
	drawBar2D(width,data,max){
		let chart = new iChart.Bar2D({
			render : 'bar-2d',
			data: data,
			title : {
				text:'2016年12月计划产量完成量统计',
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
		chart.draw();
	},
	componentDidMount() {
		let width = $("#bar-2d").width();
		let that = this;
		let reportList = this.props.reportList;

		$.ajax({
			url:serverUrl+'/completePlanProduct',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:reportList,
			success:function(data){
				var result = data.data;
				var datas = [
					{name : '合绳',value : (Number(result.hs).toFixed(2)),color:'#1ca9de'},
					{name : '捻股',value : (Number(result.ng).toFixed(2)),color:'#ff9f73'},
					{name : '拉丝',value : (Number(result.ls).toFixed(2)),color:'#ff0000'},
				];
				var max = data.max;
				that.drawBar2D(width,datas,max);
			}
		});	
	},
	render(){
		return (
			<div className='line-base-2d-container box-shadow'>
				<div id='bar-2d'></div>
			</div>
		)
	}
});

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

Deplane = connect(mapStateToProps)(Deplane);

export default Deplane;