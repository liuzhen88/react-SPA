/*
*	name:扇形图(合绳，捻股，拉丝)
*	author: liuzhen
*	time: 2016/12/14
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ichart from 'ichart';
import actions from '../actions/action';
import $ from 'jquery';
import {createHashHistory} from 'history';
import config from './config';

const history = createHashHistory();
const serverUrl = config.serverUrl;

let Pie = React.createClass({
	drawPie(data,renderContainer,width,stateNum){
		var chart = new iChart.Pie2D({
			render : renderContainer,
			data: data,
			showpercent:true,
			decimalsnum:0,
			width : width,
			height : 300,
			radius:100,
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
	componentDidMount() {
		let width = $("#plan-complete-precent").width();
		let data = this.props.pie;
		let plan = data.plan;
		let unQualify = data.unQualify;
		let storeData = data.store;
		this.drawPie(plan,'plan-complete-precent',width,0);
		this.drawPie(unQualify,'not-match-precent',width,1);
		this.drawPie(storeData,'store-machine-precent',width,2);
	},
	handleClick(){
		console.log(this);
	},
	render(){
		return (
			<div className='pie'>
				<div className='pie-container' id='plan-complete-precents'>
					<div className='pie-2d-title'>12月计划完成率</div>
					<div id='plan-complete-precent' className='pie-containers'></div>
				</div>
				<div className='pie-container' id='not-match-precents'>
					<div className='pie-2d-title'>12月不合格产出率</div>
					<div id='not-match-precent' className='pie-containers'></div>
				</div>
				<div className='pie-container' id='store-machine-precents'>
					<div className='pie-2d-title'>12月产量统计</div>
					<div id='store-machine-precent' className='pie-containers'></div>
				</div>
				<div className='clear'></div>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {
		pie:state.pie,
		reportList:state.reportList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

Pie = connect(mapStateToProps)(Pie);

export default Pie;