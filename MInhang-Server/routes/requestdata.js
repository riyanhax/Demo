var router = require('koa-router')();
var wrapper = require('co-mysql');
var mysql = require('mysql');
var config = require('../config/mysql_config');
var asy = require('async');
var connection = mysql.createConnection({
    host: config.IP,
    user: config.USER,
    password: config.PASSWORD,
    port: config.PORT,
    database: 'minhang'
});

var pool = mysql.createPool({
    connectionLimit: 40,
    host: config.IP,
    user: config.USER,
    password: config.PASSWORD,
    port: config.PORT,
    database: 'minhang'
})

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(null)
            return
        }

        callback(connection)
    })
}

var request = require('request');

//var DATASERVER = 'http://127.0.0.1:8081'
var DATASERVER = 'http://172.30.8.208:8080'

//保存机场静态数据
function saveAirport() {
    var path = '/GeneralMonitor/rest/monitor/airportStaticData/';
    var p = wrapper(connection);
    var oDate = new Date();
    var timestamp = oDate.getTime();
    request.post({
         url: DATASERVER + path,
         form:{}
    },function(err,res,body){
        var geted = true;
        try {
            var data = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }

        if(geted){
            getConnection(function(connection) {
                connection.beginTransaction(function(err){
                    if (err) {
                        console.log('连接池错误:' + err);
                        return;
                    }

                    var deleteData = function(callback){
                        connection.query('DELETE FROM `t_airport`',function(err){
                            callback(err)
                        })
                    }

                    var insertData = function(callback){
                        var values = formatValues(data, timestamp);
                        connection.query('INSERT INTO  `t_airport`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                            callback(err, rows)
                        })
                    }

                    asyncFunc([deleteData,insertData], connection);

                })
            })
        }
    })

}

//保存正常率
function saveRegularrate(date) {
    var path = '/GeneralMonitor/rest/monitor/regularRateData/'
    var p = wrapper(connection);

    var oDate = new Date();
    var timestamp = oDate.getTime();
    request.post({
        url: DATASERVER + path,
        form: {
            missionDate: date
        }
    }, function(err, res, body) {
        var geted = true;
        try {
            var data = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误:' + err);
                        return;
                    }

                    // var hasData =  p.query('SELECT * FROM `t_regularrate` WHERE month = ?',[date]);
                    
                    // if(!hasData.length){
                    //     var insertData = function(callback) {
                    //     var timestamp = new Date().getTime();
                    //     var values = formatValues(data, timestamp);
                    //     connection.query('INSERT INTO  `t_regularrate`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                    //         callback(err, rows)
                    //         })
                    //     }

                    //     asyncFunc([insertData], connection);
                    // }else{

                        var deleteData = function(callback){
                            connection.query('DELETE FROM `t_regularrate` WHERE month = ?',[date], function(err) {
                                callback(err)
                            });
                        }

                        var insertData = function(callback) {
                            var timestamp = new Date().getTime();
                            var values = formatValues(data, timestamp);
                            connection.query('INSERT INTO  `t_regularrate`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                                callback(err, rows)
                            })
                        }

                        asyncFunc([deleteData,insertData], connection);
                    // }
                    

                })
            });

        }

    });
}

//保存机场名字
function saveAirportantdynamic() {
    var path = '/GeneralMonitor/rest/monitor/dynamicData/'
    var p = wrapper(connection);

    var oDate = new Date;
    var timestamp = oDate.getTime();

    request.post({
        url: DATASERVER + path,
        form: {
            missionDate: getNow(oDate),
            apName: 'null'
        }
    }, function(err, httpResponse, body) {
        var geted = true;
        try {
            var arr = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误:' + err);
                        return;
                    }

                    var deleteTable = function(callback) {
                        connection.query('DELETE FROM `t_airportdynamic`', function(err) {
                            callback(err)
                        });
                    }

                    var insertData = function(callback) {
                        var valuesArr = [];
                        var valuesStr = '';
                        for (var key in arr) {
                            var values = formatValues(arr[key].stasticsResult);
                            valuesArr = valuesArr.concat(values.arr);
                            valuesStr = values.str;
                        }

                        connection.query('INSERT INTO `t_airportdynamic`(' + valuesStr + ') VALUES ?', [valuesArr], function(err, rows, fields) {
                            callback(err, rows);
                        });
                    }

                    asyncFunc([deleteTable, insertData], connection);

                })
            })

        }
    })
}

//保存机场从控制区域
function saveAirportContrilArea() {
    var p = wrapper(connection);
    var path = '/GeneralMonitor/rest/monitor/accStaticData/';


    request.post({
        url: DATASERVER + path,
        form: {}
    }, function(err, res, body) {
        var geted = true;
        try {
            var arr = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误：' + err)
                        return
                    }

                    var deleteTable = function(callback) {
                        connection.query('DELETE FROM `t_ctrlarea`', function(err) {
                            callback(err)
                        })
                    }

                    var insertData = function(callback) {
                        var timestamp = new Date().getTime();
                        var values = formatValues(arr, timestamp);
                        connection.query('INSERT INTO `t_ctrlarea`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                            callback(err, rows)
                        })
                    }

                    asyncFunc([deleteTable, insertData], connection)

                });
            });

        }

        console.log('数据已更新')
    });
}

//保存机场天气数据
function saveAirportWeather() {
    var p = wrapper(connection);
    var path = '/GeneralMonitor/rest/monitor/airportWeatherData/'

    request.post({
        url: DATASERVER + path,
        from: {}
    }, function(err, res, body) {
        var geted = true;
        try {
            var json = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误：' + err)
                        return
                    }

                    var deleteTable = function(callback) {
                        connection.query('DELETE FROM  `t_weather`', function(err) {
                            callback(err)
                        })
                    }

                    var insertData = function(callback) {
                        var arr = [];
                        var str = '';
                        for (var key in json) {
                            var values = formatValues(json[key]);
                            str = values.str;
                            arr = arr.concat(values.arr)
                        }
                        connection.query('INSERT INTO `t_weather`(' + str + ') VALUES ?', [arr], function(err, rows, fields) {
                            callback(err, rows)
                        })
                    }
                    asyncFunc([deleteTable, insertData], connection)
                });
            })

        }

    });
}

//保存扇区的数据
function saveAirportSelection() {
    var path = '/GeneralMonitor/rest/monitor/sectorStaticData/';
    request.post({
        url: DATASERVER + path,
        from: {}
    }, function(err, res, body) {
        var geted = true;
        try {
            var arr = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误111...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误:' + err);
                        return;
                    }
                    //请空表
                    var deleteTable = function(callback) {
                        connection.query('DELETE FROM `t_section`', function(err) {
                            callback(err)
                        })
                    }
                    //添加数据
                    var insertData = function(callback) {
                        var timestamp = new Date().getTime();
                        var values = formatValues(arr, timestamp);
                        connection.query('INSERT INTO `t_section`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                            callback(err, rows);
                        });
                    }

                    asyncFunc([deleteTable, insertData], connection);

                })
            });
        }

    })
}

//保存航路的数据
function saveAirroute() {
    var p = wrapper(connection);
    var path = '/GeneralMonitor/rest/monitor/routeAndPointStaticData/';
    request.post({
        url: DATASERVER + path,
        from: {}
    }, function(err, res, body) {
        var geted = true;
        try {
            var json = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误：' + err)
                        return
                    }

                    //删除航路信息
                    var deleteNationTable = function(callback) {
                        connection.query('DELETE FROM `t_nationwideroutestaticdata`', function(err) {
                            callback(err)
                        })
                    }

                    //删除航路关系
                    var deleteRpdataTable = function(callback) {
                        connection.query('DELETE FROM `t_airroute_rpdata`', function(err) {
                            callback(err)
                        })
                    }

                    //删除航路
                    var deleteRoutedataTable = function(callback) {
                        connection.query('DELETE FROM `t_airroute_routedata`', function(err) {
                            callback(err)
                        })
                    }

                    //删除航路点
                    var deletePointdataTable = function(callback) {
                        connection.query('DELETE FROM `t_airroute_pointdata`', function(err) {
                            callback(err)
                        })
                    }

                    //插入航路信息
                    var insertNationData = function(callback) {
                        var timestamp = new Date().getTime();
                        var data = json.nationwideRouteStaticData;
                        if (typeof data !== 'object') {
                            data = JSON.parse(data);
                        }

                        var values = formatValues(data, timestamp);
                        var arr = [];
                        for (var key in data) {
                            arr.push([data[key]])
                        }
                        arr.push([timestamp])
                        connection.query('INSERT INTO `t_nationwideroutestaticdata`(' + values.str + ') VALUES ?', [
                            [arr]
                        ], function(err, rows, fields) {
                            callback(err, rows)
                        });
                    }

                    //插入航路关系
                    var insertRpData = function(callback) {
                        var timestamp = new Date().getTime();
                        var data = json.rpData;
                        if (typeof data !== 'object') {
                            data = JSON.parse(data);
                        }
                        var values = formatValues(data, timestamp);
                        connection.query('INSERT INTO `t_airroute_rpdata`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                            callback(err, rows)
                        });
                    }

                    //插入航路
                    var insertRouteData = function(callback) {
                        var timestamp = new Date().getTime();
                        var data = json.routeData;
                        if (typeof data !== 'object') {
                            data = JSON.parse(data);
                        }

                        var values = formatValues(data, timestamp);
                        for (var i = 0; i < values.arr.length; i++) {
                            values.arr[i][1] = JSON.stringify(values.arr[i][1]);
                        }
                        // console.log(values.arr)
                        connection.query('INSERT INTO `t_airroute_routedata`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                            callback(err, rows)
                        });
                    }

                    //插入航路点
                    var insertPointData = function(callback) {
                        var timestamp = new Date().getTime();
                        var data = json.pointData;
                        if (typeof data !== 'object') {
                            data = JSON.parse(data);
                        }

                        var values = formatValues(data, timestamp);
                        connection.query('INSERT INTO `t_airroute_pointdata`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                            callback(err, rows)
                        });
                    }
                    asyncFunc([deleteNationTable, insertNationData, deleteRpdataTable, insertRpData, deletePointdataTable, insertPointData, deleteRoutedataTable, insertRouteData], connection)
                });
            })
        }

    });
}

//保存值班人员信息
function saveOndutypeople() {
    var oDate = new Date();
    var path = '/GeneralMonitor/rest/monitor/onDutyPerson/'
    var p = wrapper(connection);

    var timestamp = new Date().getTime();
    request.post({
        url: DATASERVER + path,
        form: {
            missionDate: getNow(oDate)
        }
    }, function(err, res, body) {
        var geted = true;
        try {
            var json = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误：' + err)
                        return
                    }

                    var deleteTable = function(callback) {
                        connection.query('DELETE FROM `t_onduty`', function(err) {
                            callback(err)
                        })
                    }

                    var insertData = function(callback) {
                        var timestamp = new Date().getTime();
                        var values = formatValues(json)
                        connection.query('INSERT INTO `t_onduty`(' + values.str + ') VALUES ?', [values.arr], function(err, rows, fields) {
                            callback(err, rows)
                        })
                    }

                    asyncFunc([deleteTable, insertData], connection)

                })
            })

        }
    })
}

//保存扇区、管制区以及航路的延误情况
function saveDelay(body) {
    var path = '/GeneralMonitor/rest/monitor/delayStatusData'
    var p = wrapper(connection);

    var oDate = new Date();
    var timestamp = oDate.getTime();
    request.post({
        url: DATASERVER + path,
        form: {
            missionDate: getNow(oDate)
        }
    }, function(err, res, body) {
        var geted = true;
        try {
            var json = JSON.parse(body);
        } catch (e) {
            console.log('读取数据错误...')
            geted = false;
        }
        if (geted) {
            getConnection(function(connection) {
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.log('连接池错误：' + err)
                        return
                    }

                    var deleteTable = function(callback) {
                        connection.query('DELETE FROM `t_delay`', function(err) {
                            callback(err)
                        })
                    }

                    var insertData = function(callback) {
                        var arr = [];
                        var str = '';
                        for (var key in json) {
                            var obj = json[key]
                            for (var o in obj) {
                                var values = formatValues(obj[o]);
                                arr = arr.concat(values.arr);
                                str = values.str;
                            }
                        }
                        connection.query('INSERT INTO `t_delay`(' + str + ') VALUES ?', [arr], function(err, rows, fields) {
                            callback(err, rows)
                        })
                    }

                    asyncFunc([deleteTable, insertData], connection)

                })
            });

        }
    });

}

//格式化数据格存储式
function formatValues(arr, timestamp, level) {
    var key = '';
    var tmp = [];
    if (Object.prototype.toString.call(arr) == '[object Object]') {
        var tmpArr = [];
        for (var k in arr) {
            var obj = arr[k];
            key += k;
            key += ',';
            if (typeof obj == 'object') {
                tmpArr.push(JSON.stringify(obj))
            } else {
                tmpArr.push(obj)
            }

            if (timestamp) {
                tmpArr.push(timestamp)
            }
        }
        tmp.push(tmpArr);
    } else {
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            var tmpArr = [];
            for (var o in obj) {
                tmpArr.push(obj[o])
            }
            if (timestamp) {
                tmpArr.push(timestamp)
            }

            tmp.push(tmpArr)
        }

        var json = arr[0];
        for (var o in json) {
            key += o;
            key += ','
        }

    }
    if (timestamp) {
        key += 'timestamp';
    } else {
        key = key.substr(0, key.length - 1)
    }
    return {
        arr: tmp,
        str: key
    }
}

//异步方法
function asyncFunc(arr, connection) {
    asy.series(arr, function(err, result) {
        if (err) {
            console.log('异步错误：' + err);
            connection.release();
            return;
        }

        connection.commit(function(err) {
            if (err) {
                console.log('数据库提交错误：' + err);
                return;
            }

            console.log('提交成功')
            connection.release();

        })

    })
}

function toDub(n) {
    return n < 10 ? '0' + n : '' + n;
}

function getNow(date) {
    return date.getFullYear() + '' + toDub(date.getMonth() + 1) + '' + toDub(date.getDate())
}

//保存动态数据的方法
function saveData() {
    saveAirportantdynamic();
    saveAirportWeather();
    saveOndutypeople();
    saveDelay();
}

//更新静态数据方法
function updateStaticDataByHand() {
    saveAirport();
    saveAirportContrilArea();
    saveAirportSelection();
    saveAirroute();
}


// 循环保存正常率
function saveRegular(begin,end){
    var beginDate = new Date(begin).getTime();
    var endDate   = new Date(end).getTime();
    if(endDate<beginDate){
        var tmp = end;
        end = begin;
        begin = tmp;
    }

    var beginYear = begin.substr(0,4);
    var endYear = end.substr(0,4);
    var total = (endYear - beginYear)*12;
    var month = (end.substr(-2)*1 - begin.substr(-2)*1);
    if(total >=0){
        var len = total + month;
        var time = begin;

        for(var i=0;i<=len;i++){
            var str = time.substr(0,4)+'/'+time.substr(-2);

            var oDate = new Date(str);
            saveRegularrate(time);
            if(oDate.getMonth() >= 11){
                time = (oDate.getFullYear()+1)+'01';
            }else{
                time*=1;
                time++;
                time+='';
            }
            
        }
    }

}

module.exports.staticdata = {
    saveairport: saveAirport,
    savesection: saveAirportSelection,
    saveairroute: saveAirroute,
    saveregular:saveRegular
}
module.exports.start = function(time) {
    saveData()
    setInterval(function() {
        console.log('重新加载数据...')
        saveData()
    }, time);
}