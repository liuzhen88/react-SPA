import {combineReducers} from 'redux';

const tableReducer = (state='',action) => {
	switch(action.type){
		case "CHANGE_TAB":
			return state;
			break;
		case "INIT_TABLE":
			return action.data;
			break;
		case "SEARCH_DAY_TABLE":
			return action.data;
		default:
			return state;
			break;
	}
};

const baseDataReducer = (state='',action) => {
	switch(action.type){
		case "BASE_DATA":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

const dayTableReducer = (state='',action) => {
	switch(action.type){
		case 'TIME_CHANGE':
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

const summaryReducer = (state='',action) => {
	switch(action.type){
		case "SUMMARY":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

const meunReducer = (state='',action) => {
	switch(action.type){
		case "CHANGE_MEUN":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let unqualifyReducer = (state='',action) => {
	switch(action.type){
		case "UN_QUALIFY":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let workerPerformanceReducer = (state='',action) => {
	switch(action.type){
		case 'INIT_WPF':
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let titleReducer = (state='',action) => {
	switch(action.type){
		case "CHANGE_TITLE":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let storeReducer = (state='',action) => {
	switch(action.type){
		case "STORE":
			return action.data;
			break;
		case "CHANGE_LOADING":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let storeSelectReducer = (state='',action) => {
	switch(action.type){
		case "INIT_STORE":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let orderStatusReducer = (state='',action) => {
	switch(action.type){
		case "INIT_ORDER_STATUS":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let pieReducer = (state='',action) => {
	switch(action.type){
		case "INIT_PIE":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let delayReducer = (state='',action) => {
	switch(action.type){
		case 'INIT_DELAY':
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let openMachineReducer = (state='',action) => {
	switch(action.type){
		case "OPEN_MACHINE":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let changeReportReducer = (state='',action) => {
	switch(action.type){
		case "CHANGE_REPORT_LIST":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let dayReportReducer = (state='',action) => {
	switch(action.type){
		case "DAT_REPORT":
			return action.data;
			break;
		case "CHANGE_LOAD":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

const orderNameReducerAysnc = (state='',action) => {
	switch(action.type){
		case "INIT_MEUN_LIST":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let rootReducer = combineReducers({
	tableStore:tableReducer,
	baseData:baseDataReducer,
	dayTable:dayTableReducer,
	summary:summaryReducer,
	meun:meunReducer,
	unqualify:unqualifyReducer,
	workerPerformance:workerPerformanceReducer,
	title:titleReducer,
	storeTable:storeReducer,
	store:storeSelectReducer,
	orderStatus:orderStatusReducer,
	pie:pieReducer,
	delay:delayReducer,
	openMachine:openMachineReducer,
	reportList:changeReportReducer,
	dayReport:dayReportReducer,
	orderName:orderNameReducerAysnc
});

export default rootReducer;