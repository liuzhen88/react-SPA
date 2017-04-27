import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../actions/action';
import back from 'url?limit=10000!../images/back.png';
import more from 'url?limit=10000!../images/more.png';
import search from 'url?limit=10000!../images/search.png';
import $ from 'jquery';

let Title = React.createClass({
	goBack(){
		history.back();
	},
	slide(){
		$(".meun-list-left").slideToggle();
	},
	searchListToggle(){
		$(".time-container").slideToggle();
	},
	render(){
		return (
			<div className='day-chart-title'>
				{this.props.title}
				<div className='back' onClick={this.goBack}>
					<img src={back} width='20px'/>
				</div>
				<div className='search-container' onClick={this.searchListToggle}>
					<img src={search} width='20px'/>
				</div>
				<div className='more' id='more' onClick={this.slide}>
					<img src={more} width='20px'/>
				</div>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {
		title:state.title
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions:bindActionCreators(actions,dispatch)
	}
}

Title = connect(mapStateToProps)(Title);

export default Title;