import React from 'react';
import $ from 'jquery';
import config from '../components/config';
// const serverUrl = 'http://120.25.69.229:3000/swgl/user';
const serverUrl = config.serverUrl;

let tableAction = () => {
	return {
		type:'CHANGE_TAB'
	}
}

let tableActionAsync = () => {
	return function(dispatch,getState){
		let url = serverUrl+'/getInitGroupDayChart?type=0';
		$.ajax({
			url:url,
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				dispatch(initTableAction(data));
			}
		})
	}
}

let tableNgActionAsync = () => {
	return function(dispatch,getState){
		let url = serverUrl+'/getInitGroupDayChart?type=1';
		$.ajax({
			url:url,
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				dispatch(initTableAction(data));
			}
		})
	}
}

let tableLsActionAsync = () => {
	return function(dispatch,getState){
		let url = serverUrl+'/getInitGroupDayChart?type=2';
		$.ajax({
			url:url,
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				dispatch(initTableAction(data));
			}
		})
	}
}

let initTableAction = (data) => {
	return {
		type:'INIT_TABLE',
		data:data.data.tableStore
	}
}

let baseDataActionAsync = (index) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getBaseData?type='+index;
		$.ajax({
			url:url,
			type:'get',
			dataType:'jsonp',
			success:function(data){
				dispatch(baseDataAction(data));
			}
		});
	}
}

let baseDataAction = (data) => {
	return {
		type:'BASE_DATA',
		data:data.data
	}
}

let dayTableAction = (data) => {
	return {
		type:'TIME_CHANGE',
		data:data
	}
}

let dayTableSearchAction = (data) => {
	return function(dispatch,getState){
		$.ajax({
			url:serverUrl+'/getGroupDayChart',
			type:'get',
			dataType:'jsonp',
			data:data,
			success:function(data){
				console.log(data);
				dispatch(dayTableSearchActions(data));
			}
		});
	}
}

let dayTableSearchActions = (data) => {
	return {
		type:'SEARCH_DAY_TABLE',
		data:data.data.tableStore
	}
}

let summaryTableActionAsync = (list) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getSummaryData';
		$.ajax({
			url:url,
			type:'get',
			data:list,
			dataType:'jsonp',
			success:function(data){
				dispatch(summaryTableAction(data));
			}
		});
	}
}

let summaryTableNgActionAsync = (list) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getSummaryData?type=1';
		$.ajax({
			url:url,
			type:'get',
			data:list,
			dataType:'jsonp',
			success:function(data){
				dispatch(summaryTableAction(data));
			}
		});
	}
}

let summaryTableLsActionAsync = (list) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getSummaryData?type=2';
		$.ajax({
			url:url,
			type:'get',
			data:list,
			dataType:'jsonp',
			success:function(data){
				dispatch(summaryTableAction(data));
			}
		});
	}
}

let summaryTableAction = (data) => {
	return {
		type:'SUMMARY',
		data:data.data.summary
	}
}

let meunChangeAction = (data) => {
	return {
		type:'CHANGE_MEUN',
		data:data
	}
}

let unqualifyActionAsync = (list) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getUnQualify?type=0';
		$.ajax({
			url:url,
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				dispatch(unqualifyAction(data));
			}
		})
	}
}

let unqualifyNgActionAsync = (list) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getUnQualify?type=1';
		$.ajax({
			url:url,
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				dispatch(unqualifyAction(data));
			}
		})
	}
}

let unqualifyLsActionAsync = (list) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getUnQualify?type=2';
		$.ajax({
			url:url,
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				dispatch(unqualifyAction(data));
			}
		})
	}
}

let unqualifyAction = (data) => {
	return {
		type:'UN_QUALIFY',
		data:data.data.unqualify
	}
}


let workerPerformanceAsync = (list) => {
	return function(dispatch,getState){
		let url = serverUrl+'/getWorkerPerformance';
		$.ajax({
			url:url,
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				//dispatch(workerPerformanceAction(data));
				console.log(data);
			}
		});
	}
}

let workerPerformanceAction = (data) => {
	return {
		type:'INIT_WPF',
		data:data.data.workerPerformance
	}
}

let changeTitle = (data) => {
	return {
		type:'CHANGE_TITLE',
		data:data
	}
}

let storeActionAsync = (option) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getStoreData';
		$.ajax({
			url:url,
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:option,
			success:function(data){
				dispatch(storeAction(data));
				dispatch(changeDynamicstore(data));
			}
		});
	}
}

let storeActionSelectAsync = (option) => {
	return function(dispatch,getState){
		let url = serverUrl + '/getStoreData';
		$.ajax({
			url:url,
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:option,
			success:function(data){
				dispatch(storeAction(data));
			}
		});
	}
}

let changeDynamicstore = (data) => {
	return {
		type:'INIT_STORE',
		data:{
			gdzzh:data.gdzzh,
			jgzj:data.jgzj
		}
	}
}

let storeAction = (data) => {
	return {
		type:'STORE',
		data:data.data.storeTable
	}
}

let getInitOrderStatusAsync = (data) => {
	return function(dispatch,getState){
		$.ajax({
			url:serverUrl+'/getInitOrderStatus',
			type:'get',
			data:data,
			dataType:'jsonp',
			success:function(data){
				dispatch(getInitOrderAction(data));
			}
		});
	}
}

let getInitOrderAction = (data) => {
	return {
		type:'INIT_ORDER_STATUS',
		data:data.data.orderStatus
	}
}

let delayAsync = (list) => {
	return function(dispatch,getState){
		$.ajax({
			url:serverUrl+'/getDelayOrderByYearMonth',
			type:'get',
			dataType:'jsonp',
			data:list,
			jsonp:'callback',
			success:function(data){
				console.log(data);
				dispatch(delayAction(data));
			}
		})
	}
}

let delayAction = (data) => {
	return {
		type:'INIT_DELAY',
		data:data.data.delay
	}
}

let changeLoading = (data) => {
	return {
		type:'CHANGE_LOADING',
		data:data
	}
}

let openMachineAsync = (list) => {
	return function(dispatch,getState){
		$.ajax({
			url:serverUrl+'/getOpenMachine',
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				dispatch(openMachineAction(data));
			}
		});
	}
}

let changeReportList = (list) => {
	return {
		type:'CHANGE_REPORT_LIST',
		data:list
	}
}


let openMachineAction = (data) => {
	return {
		type:'OPEN_MACHINE',
		data:data.data
	}
}

let dayReportAsync = (list) => {
	return function(dispatch,getState){
		$.ajax({
			url:serverUrl+'/getDayReport',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:list,
			success:function(data){
				dispatch(dayReportAction(data));
			}
		});
	}
}

let dayReportAction = (data) => {
	return {
		type:'DAT_REPORT',
		data:data
	}
}

let changeLoad = (list) => {
	return {
		type:'CHANGE_LOAD',
		data:list
	}
}

let meunListAction = (list) => {
	return {
		type:'INIT_MEUN_LIST',
		data:list
	}
}

export default {
	tableActionAsync:tableActionAsync,
	baseDataActionAsync:baseDataActionAsync,
	dayTableAction:dayTableAction,
	dayTableSearchAction:dayTableSearchAction,
	summaryTableActionAsync:summaryTableActionAsync,
	meunChangeAction:meunChangeAction,
	tableNgActionAsync:tableNgActionAsync,
	summaryTableNgActionAsync:summaryTableNgActionAsync,
	summaryTableLsActionAsync:summaryTableLsActionAsync,
	unqualifyActionAsync:unqualifyActionAsync,
	unqualifyNgActionAsync:unqualifyNgActionAsync,
	workerPerformanceAsync:workerPerformanceAsync,
	changeTitle:changeTitle,
	storeActionAsync:storeActionAsync,
	getInitOrderStatusAsync:getInitOrderStatusAsync,
	delayAsync:delayAsync,
	tableLsActionAsync:tableLsActionAsync,
	unqualifyLsActionAsync:unqualifyLsActionAsync,
	changeLoading:changeLoading,
	storeActionSelectAsync:storeActionSelectAsync,
	openMachineAsync:openMachineAsync,
	changeReportList:changeReportList,
	dayReportAsync:dayReportAsync,
	changeLoad:changeLoad,
	meunListAction:meunListAction
}