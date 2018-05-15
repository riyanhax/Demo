var cityChart = echarts.init(document.getElementById('cityWrapper'));

getCityData()

function getCityData(){
    var cities = []
    var cityDataAxis = []
    var cityDataAxis2 = []
    var cityData = []
    var cityDataShadow = []
    request(DATASERVER + ROUTES.aircompany, {}, function (res) {
        res = res.data[0]
        Object.keys(res.airportPairSchFlightCount).map((key)=>{
            var city = key.split('-')
            cities.push(city)
            cityDataAxis2.push(res.airportPairSchFlightCount[key])
            cityDataShadow.push(res.airportPairSchFlightCount[key])
            var data = res.airportPairExcFlightCount[key] || 0;
            if(!data){
                var newkey = city.reverse().join('-')
                if(res.airportPairExcFlightCount[newkey]){
                    data = res.airportPairExcFlightCount[newkey]
                }
            }
            cityData.push(data)
        })
        cities = cities.slice(0,11)
        cityDataAxis2 = cityDataAxis2.slice(0,11)
        cityData = cityData.slice(0,11)
        cityDataShadow = cityDataShadow.slice(0,11)

        for(var i in cities){
            var str = '';
            request(DATASERVER+ROUTES.airport+'?apName='+cities[i][0],{},function(res){
                res = res.data;
                var airportName = res.airportName.split('/');
                if(airportName[0]=='上海' ){
                    str+=airportName[1]
                }else{
                    str+=airportName[0]
                }
                
            })
            str+='-'
            request(DATASERVER+ROUTES.airport+'?apName='+cities[i][1],{},function(res){
                res = res.data;
                var airportName = res.airportName.split('/');
                if(airportName[0]=='上海' ){
                    str+=airportName[1]
                }else{
                    str+=airportName[0]
                }
            })
            cityDataAxis.push(str)
        }
        var option = {
            title:{
                itemGap: -15,
                text:'今日国内主要城市对班次排名',
                textStyle:{
                    color:'#fff',
                    fontSize:20
                },
                // subtext:'\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\vTODAY WEATHER',
                subtextStyle:{
                    color:'#1397ff',
                    fontSize:14,
                    width:'50%'
                },
                left:30,
                top:10
            },
            grid:{
                top:70,
                left:30,
                bottom:48,
                right:16
            },
            backgroundColor:'rgba(0,0,0,0.3)',
            xAxis: [{
                data: cityDataAxis,
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#f4bf48'
                    },
                    rotate: 45,
                    interval: 0
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },{
                data: cityDataAxis2,
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            }],
            yAxis: {
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show:false,
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0.3)',
                            borderColor: '#053f68',
                            borderWidth: 2,
                            borderType: 'solid'
                        }
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: cityDataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color:'#00f2c4'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#01faca'},
                                    {offset: 0.5, color: '#01faca'},
                                    {offset: 1, color: '#287991'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#01faca'},
                                    {offset: 0.7, color: '#01faca'},
                                    {offset: 1, color: '#287991'}
                                ]
                            )
                        }
                    },
                    data: cityData
                }
            ]
        };

        cityChart.setOption(option);
    },true)
}



