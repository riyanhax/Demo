var develop = false;
var DATASERVER = develop?'172.30.8.80:3000':'./web/assets/localdata/';
var ROUTES = {
    'onDutyPerson':'/ondutypeople.json',
    'airportdynamicAll':'/airportdynamicAll.json',
    'weather':'/weather.json',
    'aircompany':'/flightCountRanking.json',
    'airport':'airport.json',
    'airportdynamic':'/airportdynamic.json'
}
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var URL = require('url')
var querystring = require('querystring')

// 左侧菜单
generateMenuList()
getOnDutyPerson()

function generateMenuList(){
    var name = [
        "scheduleFlightsCount",
        "nnsFlightsCount",
        "nfsFlightsCount",
        "fasFlightsCount",
        "fosFlightsCount",
        "specialFlightsCount",
        "vipFlightsCount",
        "executeDepFlihgtsCount",
        "executeArrFlihgtsCount",
        "cld120FlightsCount",
        "delayFlightsCount",
        "scheduleOnTimeRate",
        "delayAvgTime"
    ]
    request(DATASERVER+ROUTES.airportdynamicAll,{},function(res){
        var tmp = parseRequestData(res)[0]
        var data = JSON.parse(tmp.countStasticsResult);
        $(name).each(function(index,id){
            var val = data[id];
            if(id == 'scheduleOnTimeRate'){
                val = Math.round(data.scheduleOnTimeRate*100)+'%'
            }
            $('#'+id).text(val)
        })
        
    })  
}

// 获取值班人员信息
function getOnDutyPerson(){
    request(DATASERVER+ROUTES.onDutyPerson,{},function(res){
        var data = parseRequestData(res)[0].onDutyPerson;
        var leader = '';
        data = JSON.parse(data);
        if (data.atmbLeader) {
          try {
            var leaderArr = data.atmbLeader.split(/[\s+|\,|、]/);
            if (leaderArr && leaderArr.length) {
              leader = '值班领导：民航局' + leaderArr[0] + ' 监控中心' + (leaderArr[1] || '')
            }
          } catch (e) {

          }
        }
        $('.notice span').text(leader + ' 值班大厅' + data.omcLeader)
    })
}

// 日期
var dateText = $('.date').eq(0);
getNowTime()

setInterval(function(){
    getNowTime()
},1000)

function parseRequestData(res){

    return res.data
}

function request(url,data,callback,flag){
    var query = URL.parse(url)
    var adapter = new FileSync(query.pathname)
    var db = low(adapter)
    var data = {}
    if (query.query) {
        var str = querystring.parse(query.query)
        data = db.get('data')
            .find(str)
            .value()
    }else{
        data = db.get('data')
            .value()
    }
    callback({code:200,data:data})
}

function getNowTime(){
    var oDate = new Date();
    var y = oDate.getFullYear();
    var m = oDate.getMonth()+1;
    var d = oDate.getDate();

    var h = oDate.getHours();
    var min = oDate.getMinutes();
    var s = oDate.getSeconds();

    dateText.text(y+'-'+toDub(m)+'-'+toDub(d)+' '+toDub(h)+':'+toDub(min)+':'+toDub(s));
}

function toDub(n){
    return n>9?''+n:'0'+n
}

