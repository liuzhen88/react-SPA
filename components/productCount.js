/*
*	name:产量统计,产量统计趋势图(拉丝,捻股,合绳)
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
import {Table,Icon} from 'antd';
import $ from 'jquery';
import {Link} from 'react-router';
import config from './config';

const { Column } = Table;
const serverUrl = config.serverUrl;

let ProductCount = React.createClass({
	drawBarStacked2D(data,labels,width,obj){
        var chart = new iChart.BarStacked2D({
			render : 'total-bar-stacked-2D',
			data: data,
			labels:labels,
			align:'center',
			padding:10,
			offsetx:0,
			width : width,
			height : 900,
			bar_height:25,
			background_color : '#2e2e2e',
			border:'none',
			shadow : true,
			shadow_blur : 2,
			shadow_color : '#aaaaaa',
			shadow_offsetx : 1,
			shadow_offsety : 0, 
			animation:true,
			sub_option:{
				label:{color:'#ffffff',fontsize:12,fontweight:600},
				border : {
					width : 0,
					color : '#d3d4f0'
				} 
			},
			label:{color:'#d3d4f0',fontsize:12,fontweight:600},
			showpercent:true,
			decimalsnum:0,
			turn_off_touchmove:true,
			coordinate:{
				background_color : 0,
				axis : {
					color : '#c0c8e7',
					width : 0
				}, 
				scale:[{
					 position:'bottom',	
					 scale_enable : false,
					 start_scale:obj.min,
					 scale_space:obj.scale,
					 end_scale:obj.max,
					 label:{color:'#d3d4f0',fontsize:11,fontweight:600}
				}],
				width:(width-120),
				height:800
			}
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
				.fillText('(吨)',x-20,y+h+30,false,'#a8b2d7');
				
			}
		}));
		chart.draw();
	},
	getNum(thisWidths,rootNg,rootHs,rootLs){
		if(thisWidths<=340){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 5);
    	}
    	if(thisWidths>340 && thisWidths<=450){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 6);
    	}
    	if(thisWidths>450 && thisWidths<=500){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 7);
    	}
    	if(thisWidths>500 && thisWidths<=600){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 9);
    	}
    	if(thisWidths>600 && thisWidths<=700){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 10);
    	}
    	if(thisWidths>700 && thisWidths<=800){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 11);
    	}
    	if(thisWidths>800 && thisWidths<=900){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 12);
    	}
    	if(thisWidths>900 && thisWidths<=1000){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 13);
       	}
       	if(thisWidths>1000 && thisWidths<=1100){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 14);
    	}
    	if(thisWidths>1100 && thisWidths<=1200){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 15);
    	}
    	if(thisWidths>1200 && thisWidths<=1300){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 16);
    	}
    	if(thisWidths>1300 && thisWidths<=1400){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 17);
    	}
    	if(thisWidths>1400 && thisWidths<=1500){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 18);
    	}
    	if(thisWidths>1500 && thisWidths<=1600){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 19);
    	}
    	if(thisWidths>1600 && thisWidths<=1700){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 20);
    	}
    	if(thisWidths>1700 && thisWidths<=1800){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 21);
    	}
    	if(thisWidths>1800 && thisWidths<=1900){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 22);
    	}
    	if(thisWidths>1900){
    		var obj = this.getMaxAndMin(rootNg, rootHs, rootLs, 23);
    	}
    	return obj;
	},
	getMaxAndMin(rootNg, rootHs, rootLs, num){
		var max = 0;
		var min = 0;
		var scale = 0;
		for(var i=0;i<rootNg.length;i++){
			var thisMaxNg = rootNg[i];
			var thisMaxHs = rootHs[i];
			var thisMaxLs = rootLs[i];
			var thisMax = Number(thisMaxHs) + Number(thisMaxNg) + Number(thisMaxLs);
			if(thisMax>max){
				max = thisMax;
			}
		}
		/*
			修改最大值
			算法：需要找出num的最小整数倍并且是100的整数倍并且大于等于max
		*/
		var little = parseInt(Number(max) / Number(num));
		for(var i=little;i>0;i++){
			var mid = i * num;
			var scales = Math.ceil(mid/num);
			if(mid>max){
				max = mid;
				break;		
			}
		}
		var diff = Number(max) - Number(min);
		if(diff == 0){
			scale = 0;
		}else{
			scale = Math.ceil(diff/num);
		}
		var obj = {
			max:max,
			min:min,
			scale:scale
		};
		return obj;
	},
	getInitialState() {
		let lookMore = {};
		for(let i=0;i<31;i++){
			lookMore[i] = {
				'display':'none'
			}
		}
        let columns = [
        	{
        		title:'日期',
        		dataIndex:'rksj',
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
        		title:'总产量',
        		dataIndex:'zcl'
        	}
        ];
        let dataSource = [];
		return {
			productCount:{
				dataSource:dataSource,
				columns:columns,
				pagination:{
					total:dataSource.length
				},
				loading:true
			},
			lookMore:lookMore
		}	
	},
	componentDidMount() {
		let that = this;
		$('html, body').animate({scrollTop:0}, 50);
		let list = this.props.reportList;
		let width = $('#total-bar-stacked-2D').width();
		$.ajax({
			url:serverUrl+'/countProductYield',
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				let datas = [
					{name : '合绳',value:data.rootHs,color:config.color.hs},
					{name : '捻股',value:data.rootNg,color:config.color.ng},
					{name : '拉丝',value:data.rootLs,color:config.color.ls}
				];
				let obj = that.getNum(width,data.rootNg,data.rootHs,data.rootLs);
				that.drawBarStacked2D(
					datas,
					data.labels,
					width,
					obj
				);
				let productCount = that.state.productCount;
				productCount.loading = false;
				that.setState({
					productCount:{
						dataSource:data.table,
						columns:productCount.columns,
						pagination:{
							total:data.table.length
						},
						loading:false
					}
				});
			}
		});
	},
	render(){
		if(this.props.reportList.bblx == '月报表'){
			return (
			<div className='cont'>
				<Title/>
				<div className='null'></div>
				<div className='meun-list-left'>
					<MeunList/>
				</div>
				<div className='meun-list-right'>
					<div className='product-count-title'>
						<div className='product-count-list'>
							<div className='product-count-bg hs-bg'></div>
							<div className='product-count-list-name'>合绳</div>
						</div>
						<div className='product-count-list'>
							<div className='product-count-bg ng-bg'></div>
							<div className='product-count-list-name'>捻股</div>
						</div>
						<div className='product-count-list'>
							<div className='product-count-bg ls-bg'></div>
							<div className='product-count-list-name'>拉丝</div>
						</div>
					</div>
					<div>
						<div id='total-bar-stacked-2D'></div>
					</div>
					<div className='table-containers'>
						<div className='title-style'>12月产量汇总表</div>
						<Table
							dataSource={this.state.productCount.dataSource}
							scroll={{ x: config.productCountScorll}}
							pagination={{
								total:this.state.productCount.pagination.total,
								showSizeChanger:true,
								pageSizeOptions:config.pageSizeOptions
							}}  
							loading={this.state.productCount.loading}
							bordered
						>
							{
								this.state.productCount.columns.map(function(item){
									if(item.dataIndex == 'rksj'){
										return  <Column
													title={item.title}
													dataIndex={item.dataIndex}
													key={item.title}
													sorter={
														(a,b) => getUnixTime(a[item.dataIndex]) - getUnixTime(b[item.dataIndex])
													}
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
							<Column
								title='操作'
								key='action'
								render={(text, record) => (
									<div className='look-more-container'>
										<a className="ant-dropdown-link" onClick={
											() => {
												let lookMore = this.state.lookMore;
												for(let key in lookMore){
													if(key != record.index){
														lookMore[key] = {
															'display':'none'
														}
													}
												}
												if(lookMore[record.index]['display'] == 'none'){

													lookMore[record.index] = {
														'display':'block'
													}
													this.setState({
														lookMore:lookMore
													})
												}else{
													lookMore[record.index] = {
														'display':'none'
													}
													this.setState({
														lookMore:lookMore
													})
												}
											}
										}>
											查看
											<Icon type='down'/>
										</a>
										<div className='look-more' style={this.state.lookMore[record.index]}>
											<Link to={
												{
													pathname:'/summaryTable',
													query:{
														time:record.rksj
													}
												}
											} className='look-more-list'>
												合绳
											</Link>
											<Link to={
												{
													pathname:'/summaryTableNg',
													query:{
														time:record.rksj
													}
												}
											} className='look-more-list'>
												捻股
											</Link>
											<Link to={
												{
													pathname:'/summaryTableLs',
													query:{
														time:record.rksj
													}
												}
											} className='look-more-list'>
												拉丝
											</Link>
										</div>
									</div>
								)}
							>
							</Column>
						</Table>
					</div>
				</div>
			</div>
		)
		}else{

			return (
				<div className='cont'>
					<Title/>
					<div className='null'></div>
					<div className='meun-list-left'>
						<MeunList/>
					</div>
					<div className='meun-list-right'>
						<div className='product-count-title'>
							<div className='product-count-list'>
								<div className='product-count-bg hs-bg'></div>
								<div className='product-count-list-name'>合绳</div>
							</div>
							<div className='product-count-list'>
								<div className='product-count-bg ng-bg'></div>
								<div className='product-count-list-name'>捻股</div>
							</div>
							<div className='product-count-list'>
								<div className='product-count-bg ls-bg'></div>
								<div className='product-count-list-name'>拉丝</div>
							</div>
						</div>
						<div>
							<div id='total-bar-stacked-2D'></div>
						</div>
						<div className='table-containers'>
							<div className='title-style'>12月产量汇总表</div>
							<Table
								dataSource={this.state.productCount.dataSource}
								scroll={{ x: config.productCountScorll}}
								pagination={{
									total:this.state.productCount.pagination.total,
									showSizeChanger:true,
									pageSizeOptions:config.pageSizeOptions
								}}  
								loading={this.state.productCount.loading}
								bordered
							>
								{
									this.state.productCount.columns.map(function(item){
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
	}
});

function getUnixTime(dateStr){
    var newstr = dateStr.replace(/-/g,'/'); 
    var date =  new Date(newstr); 
    var time_str = date.getTime().toString();
    return time_str.substr(0, 13);
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

ProductCount = connect(mapStateToProps)(ProductCount);

export default ProductCount;