var defaultCity = ["ZYHB","ZYTX","ZYCC","ZBHH","ZBSJ","ZBYN","ZSJN","ZSOF","ZSCN","ZLXN","ZSFZ","ZLLL","ZJSY","ZULS","ZLIC","ZGNN","ZUGY"]
var LINES_COLORS = ['#ff8300', '#ffec00', '#004fff','#009eff','#18ea2c'];

var geoCoordMap = {};
var airports = []
var seriesData = []

request(DATASERVER+ROUTES.airport,{},function(res){
    var data = res.data;
    for(var i in data){
        if(data[i].apName.toUpperCase() != 'ALL'){
            geoCoordMap[data[i].airportName+""] = [data[i].lng,data[i].lat]
            if(data[i].airportLevel == 2 || data[i].airportLevel == 3 ||  defaultCity.indexOf(data[i].apName) != -1){
                airports.push({name:data[i].airportName,apName:data[i].apName})
            }
        }
    }
})

request(DATASERVER + ROUTES.aircompany, {}, function (res) {
    var data = res.data[0].airportPairSchFlightCount;
    var tmpData = [];
    Object.keys(data).map((key)=>{
        if(key.charAt(0).toUpperCase() == 'Z' && key.charAt(5).toUpperCase() == 'Z'){
            tmpData.push({
                cities:key.split('-'),
                value:0
            })
        }
        
    })
    tmpData = tmpData.slice(0,30)
    var tmp = []
    for(var i in tmpData){
        var startCity = ''
        var endCity = ''
        var value = 0
        request(DATASERVER+ROUTES.airport+'?apName='+tmpData[i].cities[0],{},function(res){
            var data = res.data
            if(data){
                startCity = data.airportName;
            }
            
        })
        request(DATASERVER+ROUTES.airport+'?apName='+tmpData[i].cities[1],{},function(res){
            var data = res.data
            if(data){
                endCity = data.airportName;
            }
        })

        request(DATASERVER+ROUTES.airportdynamic+'?apName='+tmpData[i].cities[0],{},function(res){
            
            var data = res.data
            var tmp = JSON.parse(data.countStasticsResult)
            value = parseFloat(tmp.scheduleOnTimeRate).toFixed(3)
            
        })
        var num = i*1+1;
        if(startCity&&endCity){
            tmp.push([{'name':startCity},{name:endCity,value:value}])
        }
        if(num%6==0){
            seriesData.push(tmp)
            tmp =[];
        }
    }
},true)

// 获取两千万机场的正常率
var airports_rate = []
for(var i in airports){
    request(DATASERVER+ROUTES.airportdynamic+'?apName='+airports[i].apName,{},function(res){
        var data = res.data
        var tmp = JSON.parse(data.countStasticsResult)
        var value = parseFloat(tmp.scheduleOnTimeRate).toFixed(3)
        airports_rate.push(value)
    })
}

// 修改机场标记数据
airports.forEach(function (dataItem,i) {
    if(dataItem.name == '上海/浦东'){
        geoCoordMap['上海/浦东'][0] = '121.9925'
    }
    if(dataItem.name == '上海/虹桥'){
        geoCoordMap['上海/虹桥'][0] = '121.13611111111111'
    }
    var rate = airports_rate[i]*100;
    airports[i] = geoCoordMap[dataItem.name].concat([toDub(rate.toFixed(0)),clacRate(rate)])
    // return geoCoordMap[dataItem.name].concat([(airports_rate[i]*100).toFixed(0)]);
})
// 计算正常率
function clacRate(rate) {
    if(rate<25){
        return 1;
    }else if(rate<50){
        return 2;
    }else if(rate<75){
        return 3;
    }
    return 0;
}

function toDub(n){
    return n>9?''+n:'0'+n
}

var AIRPORTS_DATA = airports;
// 航迹线的数据
var PATH_DATA = (function() {
    var lines = [];
    seriesData.forEach((paths) =>{
        paths.forEach((path)=>{
            lines.push(
                {
                    start: geoCoordMap[path[0].name],
                    end: geoCoordMap[path[1].name]
                }
            )
        })
    })
    return lines;
})()
