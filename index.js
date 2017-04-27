import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router,Route,Link,hashHistory} from 'react-router';
import store from './store/store';
import App from './components/app';
import TableDetail from './components/tableDetail';
import DayTable from './components/tableComponent';
import SummaryTable from './components/summaryTable';
import DayTableNg from './components/dayTableNg';
import TableLsComponent from './components/dayTableLs';
import SummaryTableNg from './components/summaryTableNg';
import SummaryTableLs from './components/summaryTableLs';
import DayUnqualifyHs from './components/dayUnqualifyHs';
import DayUnqualifyNg from './components/dayUnqualifyNg';
import DayUnqualifyLs from './components/dayUnqualifyLs';
import WorkerPerformanceHs from './components/workerPerformanceHs';
import WorkerPerformanceDetail from './components/workerPerformanceDetail';
import WorkerPerformanceNg from './components/workerPerformanceNg';
import WorkerPerformanceLs from './components/workerPerformanceLs';
import StoreHs from './components/storeHs';
import StoreNg from './components/storeNg';
import StoreLs from './components/storeLs';
import OrderStatus from './components/orderStatus';
import ProductReport from './components/productReport';
import Analysis from './components/analysis';
import Delay from './components/delay';
import UnQualifyCount from './components/unQualifyCount';
import PlanCount from './components/planCount';
import ProductCount from './components/productCount';
import DeplaneDetail from './components/deplaneDetail';
import CombineProductPlan from './components/combineProductPlan';
import WorkPlanMachineDetail from './components/workPlanMachineDetail';

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={App}></Route>
			<Route path='/dayTable' component={DayTable}></Route>
			<Route path='/tableDetail' component={TableDetail}></Route>
			<Route path='/summaryTable' component={SummaryTable}></Route>
			<Route path='/dayTableNg' components={DayTableNg}></Route>
			<Route path='/dayTableLs' components={TableLsComponent}></Route>
			<Route path='/summaryTableNg' components={SummaryTableNg}></Route>
			<Route path='/summaryTableLs' components={SummaryTableLs}></Route>
			<Route path='/dayUnqualifyHs' components={DayUnqualifyHs}></Route>
			<Route path='/dayUnqualifyNg' components={DayUnqualifyNg}></Route>
			<Route path='/dayUnqualifyLs' components={DayUnqualifyLs}></Route>
			<Route path='/workerPerformanceHs' components={WorkerPerformanceHs}></Route>
			<Route path='/workerPerformanceDetail' components={WorkerPerformanceDetail}></Route>
			<Route path='/workerPerformanceNg' components={WorkerPerformanceNg}></Route>
			<Route path='/workerPerformanceLs' components={WorkerPerformanceLs}></Route>
			<Route path='/storeHs' components={StoreHs}></Route>
			<Route path='/storeNg' components={StoreNg}></Route>
			<Route path='/storeLs' components={StoreLs}></Route>
			<Route path='/orderStatus' components={OrderStatus}></Route>
			<Route path='/productReport' components={ProductReport}></Route>
			<Route path='/analysis' components={Analysis}></Route>
			<Route path='/delay' components={Delay}></Route>
			<Route path='/unQualifyCount' components={UnQualifyCount}></Route>
			<Route path='/planCount' components={PlanCount}></Route>
			<Route path='/productCount' components={ProductCount}></Route>
			<Route path='/deplaneDetail' components={DeplaneDetail}></Route>
			<Route path='/combineProductPlan' components={CombineProductPlan}></Route>
			<Route path='/workPlanMachineDetail' components={WorkPlanMachineDetail}></Route>
		</Router>
	</Provider>,
	document.getElementById('root'),
	function(){
		console.log('react app start success');
	}
)