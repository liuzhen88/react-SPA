/*
*	name:机台开机率(合绳，捻股，拉丝)
*	author: liuzhen
*	time: 2016/12/14
*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import actions from '../actions/action';

let OpenMachinePrecent = React.createClass({
	componentDidMount() {
		// this.props.dispatch(actions.openMachineAsync({
		// 	cj:'全部',
		// 	bz:'全部'
		// }));
	},
	render(){
		return (
			<div>
				<div className='open-machine-ls common-machine'>
					<Link to={
						{
							pathname:'/analysis',
							query:{
								type:2
							}
						}
					}>
						<div className='open-middle'>
							<div className='open-machine-left'>{this.props.data.slikOpenMachinePrecent.text}</div>
							<div className='open-machine-right'>{this.props.data.slikOpenMachinePrecent.value}</div>
						</div>
					</Link>
				</div>
				<div className='open-machine-ng common-machine'>
					<Link to={
						{
							pathname:'/analysis',
							query:{
								type:1
							}
						}
					}>
						<div className='open-middle'>
							<div className='open-machine-left'>{this.props.data.twistOpenMachinePrecent.text}</div>
							<div className='open-machine-right'>{this.props.data.twistOpenMachinePrecent.value}</div>
						</div>
					</Link>
				</div>
				<div className='open-machine-hs common-machine'>
					<Link to={
						{
							pathname:'/analysis',
							query:{
								type:0
							}
						}
					}>
						<div className='open-middle'>
							<div className='open-machine-left'>{this.props.data.ropeOpenMachinePrecent.text}</div>
							<div className='open-machine-right'>{this.props.data.ropeOpenMachinePrecent.value}</div>
						</div>
					</Link>
				</div>
				<div className='on-schedule-precent common-machine'>
					<Link to={
						{
							pathname:'/delay'
						}
					}>
						<div className='open-middle'>
							<div className='open-machine-left'>{this.props.data.onTimeDeliveryPrecent.text}</div>
							<div className='open-machine-right'>{this.props.data.onTimeDeliveryPrecent.value}</div>
						</div>
					</Link>
				</div>
				<div className='clear'></div>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {
		data:state.openMachine
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

OpenMachinePrecent = connect(mapStateToProps)(OpenMachinePrecent);

export default OpenMachinePrecent;