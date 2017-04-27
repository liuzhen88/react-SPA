import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import config from './config';
import $ from 'jquery';

const SubMenu = Menu.SubMenu;
const serverUrl = config.serverUrl;

let MeunList = React.createClass({
	getInitialState() {
		return {
			orderName:[]
		}	
	},
	handleClick(e){
		let current = e.key;
		let openKey = [e.keyPath[1]];
		let meunData = {
			current:current,
			defaultOpenKeys:openKey
		};
		this.props.dispatch(actions.meunChangeAction(meunData));
	},
	render(){
		{
			var sundiv = <div>
							<Menu
								theme='dark'
								selectedKeys={[this.props.data.current]}
								mode="inline"
								defaultOpenKeys={this.props.data.defaultOpenKeys}
								onClick={this.handleClick}
							>
								{
									this.props.orderName.map(function(item){
										if(item == 'orderStatus'){
											return <Menu.Item key="11"><Link to='/orderStatus'>订单状态表</Link></Menu.Item>
										}
										if(item == 'storeDynamic'){
											return <SubMenu key="sub2" title={<span>存量动态表</span>}>
											            <Menu.Item key="21"><Link to='/storeHs'>合绳</Link></Menu.Item>
											            <Menu.Item key="22"><Link to='/storeNg'>捻股</Link></Menu.Item>
											            <Menu.Item key="23"><Link to='/storeLs'>拉丝</Link></Menu.Item>
											        </SubMenu>
										}
										if(item == 'dayDetail'){
											return <SubMenu key="sub3" title={<span>日明细报表</span>}>
											            <Menu.Item key="31"><Link to='/dayTable'>合绳</Link></Menu.Item>
											            <Menu.Item key="32"><Link to='/dayTableNg'>捻股</Link></Menu.Item>
											            <Menu.Item key="33"><Link to='/dayTableLs'>拉丝</Link></Menu.Item>
											        </SubMenu>
										}
										if(item == 'daySummary'){
											return <SubMenu key="sub4" title={<span>日汇总报表</span>}>
											            <Menu.Item key="41"><Link to='/summaryTable'>合绳</Link></Menu.Item>
											            <Menu.Item key="42"><Link to='/summaryTableNg'>捻股</Link></Menu.Item>
											            <Menu.Item key="43"><Link to='/summaryTableLs'>拉丝</Link></Menu.Item>
											        </SubMenu>
										}
										if(item == 'dayUnqualify'){
											return <SubMenu key="sub5" title={<span>日不合格品统计表</span>}>
											            <Menu.Item key="51"><Link to='/dayUnqualifyHs'>合绳</Link></Menu.Item>
											            <Menu.Item key="52"><Link to='/dayUnqualifyNg'>捻股</Link></Menu.Item>
											            <Menu.Item key="53"><Link to='/dayUnqualifyLs'>拉丝</Link></Menu.Item>
											        </SubMenu>
										}
										if(item == 'workerPerformance'){
											return <SubMenu key="sub6" title={<span>工人绩效表</span>}>
											            <Menu.Item key="61"><Link to='/workerPerformanceHs'>合绳</Link></Menu.Item>
											            <Menu.Item key="62"><Link to='/workerPerformanceNg'>捻股</Link></Menu.Item>
											            <Menu.Item key="63"><Link to='/workerPerformanceLs'>拉丝</Link></Menu.Item>
											        </SubMenu>
										}
										if(item == 'productReport'){
											return <Menu.Item key="71"><Link to='/productReport'>生产量报表</Link></Menu.Item>
										}
									})
								}      
							</Menu>
						</div>
		}
		return (
			sundiv
		)
	}
});

const mapStateToProps = (state) => {
	return {
		data:state.meun,
		orderName:state.orderName
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

MeunList = connect(mapStateToProps)(MeunList);

export default MeunList;