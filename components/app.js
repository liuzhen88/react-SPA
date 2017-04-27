import React from 'react';
import OrderStatus from './orderStatus';	//订单状态表
import StoreHs from './storeHs';	//存量动态表
import DayTable from './tableComponent';	//日明细报表
import SummaryTable from './summaryTable';	//日汇总表
import DayUnqualifyHs from './dayUnqualifyHs';	//日不合格统计表
import WorkerPerformanceHs from './workerPerformanceHs';	//个人绩效
import ProductReport from './productReport';	//生产量报表
import config from './config';
import $ from 'jquery';
import actions from '../actions/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../style/app.css';
import bg from 'url?limit=100000!../images/bg.png';

const serverUrl = config.serverUrl;

let App = React.createClass({
	getInitialState() {
		return {
			priority:'',
			notAuth:{
				'display':'none'
			}
		}	
	},
	componentDidMount() {
		let that = this;
		$.ajax({
			url:serverUrl+'/getPriorityTable',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				let orderName = data.orderName;
				sessionStorage.setItem('orderName',JSON.stringify(orderName));
				that.props.dispatch(actions.meunListAction(orderName));
				if(orderName.length == 0){
					that.setState({
						notAuth:{
							'display':'block'
						}
					});
				}else{
					if(data.priority == ''){
						that.setState({
							notAuth:{
								'display':'block'
							}
						});
					}else{
						that.setState({
							priority:data.priority
						});
						let meunData = that.getCurrentAndKey(data.priority);
						that.props.dispatch(actions.meunChangeAction(meunData));
					}
				}
			}
		});	
	},
	getCurrentAndKey(priority){
		let meunData = this.props.meun;
		let list = {
			current:meunData.current,
			defaultOpenKeys:meunData.defaultOpenKeys
		};
		switch(priority){
			case "orderStatus":
				list.current = '11';
				list.defaultOpenKeys = ['sub1'];
				break;
			case "storeDynamic":
				list.current = '21';
				list.defaultOpenKeys = ['sub2'];
				break;
			case "dayDetail":
				list.current = '31';
				list.defaultOpenKeys = ['sub3'];
				break;
			case "daySummary":
				list.current = '41';
				list.defaultOpenKeys = ['sub4'];
				break;
			case "dayUnqualify":
				list.current = '51';
				list.defaultOpenKeys = ['sub5'];
				break;
			case "workerPerformance":
				list.current = '61';
				list.defaultOpenKeys = ['sub6'];
				break;
			case "productReport":
				list.current = '71';
				list.defaultOpenKeys = ['sub7'];
				break;
		}
		return list;
	},
	render(){
		{
			switch(this.state.priority){
				case "orderStatus":
					return <OrderStatus/>
				case "storeDynamic":
					return <StoreHs/>
				case "dayDetail":
					return <DayTable/>
				case "daySummary":
					return <SummaryTable/>
				case "dayUnqualify":
					return <DayUnqualifyHs/>
				case "workerPerformance":
					return <WorkerPerformanceHs/>
				case "productReport":
					return <ProductReport/>
				default:
					return <div style={this.state.notAuth} className='prompt'>
								<i></i>
								<img src={bg}/>
							</div>
			}
		}
	}
});

const mapStateToProps = (state) => {
	return {
		meun:state.meun
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

App = connect(mapStateToProps)(App);

export default App;