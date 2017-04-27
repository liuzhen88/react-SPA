/*
*	name:首页
*	author: liuzhen
*	time: 2016/12/08
*/

import React from 'react';
import {Link} from 'react-router';

let Mobile = React.createClass({
	render(){
		return (
			<div>
				<div className='mobile-title'>易恒智行经营决策平台</div>
				<div className='null'></div>
				<div className='mobile-list-container'>
					<div className='mobile-lists border-right border-bottom'>
						<img src='http://t12.baidu.com/it/u=3454731078,2508592457&fm=72'/>
						<p>订单状态表</p>
					</div>
					<div className='mobile-lists border-bottom'>
						<img src='http://img3.imgtn.bdimg.com/it/u=809233534,2909204573&fm=23&gp=0.jpg'/>
						<p>自制品存量动态表</p>
					</div>
					<Link to='/dayTable'>
						<div className='mobile-lists border-right border-bottom'>
							<img src='http://img4.imgtn.bdimg.com/it/u=2828326475,2226773913&fm=23&gp=0.jpg'/>
							<p>日报表明细</p>
						</div>
					</Link>
					<Link to='/summaryTable'>
						<div className='mobile-lists border-bottom'>
							<img src='http://img5.imgtn.bdimg.com/it/u=2773649918,619035579&fm=23&gp=0.jpg'/>
							<p>日汇总表</p>
						</div>
					</Link>
					<div className='mobile-lists border-right border-bottom'>
						<img src='http://img3.imgtn.bdimg.com/it/u=1696931886,1653866931&fm=23&gp=0.jpg'/>
						<p>日不合格表统计表</p>
					</div>
					<div className='mobile-lists border-bottom'>
						<img src='http://img1.imgtn.bdimg.com/it/u=2585895372,2978738861&fm=23&gp=0.jpg'/>
						<p>工人绩效表</p>
					</div>
					<div className='mobile-lists border-right'>
						<img src='http://img5.imgtn.bdimg.com/it/u=2506440040,1726957117&fm=23&gp=0.jpg'/>
						<p>月报表</p>
					</div>
					<div className='mobile-lists'>
						<img src='http://img3.imgtn.bdimg.com/it/u=3336901111,3070776426&fm=23&gp=0.jpg'/>
						<p>年报表</p>
					</div>
				</div>
			</div>
		)
	}
});

export default Mobile;