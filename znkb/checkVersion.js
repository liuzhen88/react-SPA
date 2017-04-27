$(function(){
    setTimeout(function(){getVersionCode()},500);
    setInterval(function(){getVersion()},1000);


    function getVersion(){
        cordova.getAppVersion.getVersionNumber(function(version){
            localStorage.setItem("version",version);
        });
    };


function getVersionCode(){
        cordova.getAppVersion.getVersionCode(function(version){

       
        $.ajax({
                        type: "GET",
                        url: "http://120.25.69.229:7000/users/getUploadDataByZnkb",
            
                        dataType: "json",
                        success:function(thisData){
                            

                            var data = thisData.data;
                            

                          

                            var num = Number(data.length)-1;
                            

                            var newData = data[num];
                           

                            

                            if(version<newData.versionCode){
                                
                                window.open(newData.apk, '_system', 'location=yes');
                                
                            }


                        },
                        error:function(error){
                            console.log(error);
                            alert(error);
                            stopWork(error);
                        }
                    });
    });
}



});

