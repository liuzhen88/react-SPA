var tenant = request('tenant');
if(tenant){
    if(tenant.indexOf('#')>=0){
        tenant = tenant.split('#')[0]
    }
	localStorage.setItem('tenant',tenant);
}else{
	tenant = localStorage.getItem('tenant');
}
var config = {
	//serverUrl:'http://localhost:3000/'+tenant+'/user',
	serverUrl:'http://120.25.69.229:3000/'+tenant+'/user',
    //serverUrl:'https://inkanban.cn/'+tenant+'/user',
    pageSizeOptions:['10','25','50','100'],
    orderStatusScroll:1700,
    storeTableScroll:1100,
    dayDetailScroll:1100,
    dayDetailSecondScroll:1500,
    summaryTableScroll:1100,
    unQualifyTableScroll:1100,
    workerPerformanceScroll:700,
    workerPerformanceDetailScroll:700,
    analysisScroll:1100,
    delayScroll:1100,
    planCountScroll:1100,
    unQualifyCountScorll:500,
    productCountScorll:500,
    deplanDetailScorll:500,
    color:{
        hs:'#32c5d2',
        ng:'#e7505a',
        ls:'#3598dc',
        overSchedule:"#8e44ad",
        other:'#e8e8e8'
    }
}

function request(paras) {
    var url = location.href;
    url = decodeURI(url);
    var j = '';
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (var i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

export default config;