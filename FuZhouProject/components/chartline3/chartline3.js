;(function(window,document,undefined){
    function Chartline3(ops){

        var blueSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEX///8zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc7///+xxXthAAAASHRSTlMAIi8BE49phT1nTSCLCSaIBmBUAn01A77f3SUQjhc+dmazSGwKH+pGBSsaCyr8cm5FW1mXBw2NFe9PgDFEcDBDcYIbLGRaVWiOMnmnAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+IDHRAeFk44zEUAAACfSURBVAjXLY/XAoJADARXEM+CXRHEXil2BTt25f+/yGvzcEnmHrIBKAlFoEKQ1FIckpYikxU1p+d5LRRL8qdcYW+1VofRME2rCbvVpqLTVdGLKX1gMARG+hj2hIl4Coe48DQfszkXC2C5AtYbYMtmaweXOEAQetgfqDjCOJ3ZmsuVRogiBbjd+XbjoYgYQfgUzYuIU94fGRBfccvPp/0fEYkSPlK77+8AAAAASUVORK5CYII='
        var yellowSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA6lBMVEX////usDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDP///+DuKlwAAAATHRSTlMAByYTUoNzdoIDFI8QcUNpSxqNDSiGBT6/fllbAjQE0vwtC4wcQHQBaEFnTqrxDpEKF44l+XVuR1Vfi9oGLAkgDD8vPXdEcHwpGSRKctb04AAAAAFiS0dEAIgFHUgAAAAHdElNRQfiAx0QICG3QHI3AAAApElEQVQI1y2P5RaCQBSExwBRMTAXA1vswEAxEDv2/Z/HXZbvz9yZc88NAAiFBREERCWZE1PiwieSqihSaaGZbNCp5fJcCsUSyoQQHahUma/pdRgNSmmzhXanC/T6JgaUQ4ChDIzGwMQPpjNo8wWWlorVmgcbYGuzIbs94DB/OOIkGSw4Oy4unue5MJSrv/52N8Udj6dQ82X7r7ytT3DhVxb8uPkDe4IT6n/KNScAAAAASUVORK5CYII='
        var images="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABECAYAAAAvMQN7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA/pJREFUeNrsnM1qHEcQx7t6P2zLJpaCDQETry7xOUZ6AT+Bg5/AN13zBn6B5J5jCPgayAMEx8eARHL2SRsMFhgjIcfS2rPT5aqu7pme2ZEMtnxI+BcM1V1VXdP965np6WFZYmaX5fC37U1RDx1kSH7euL+7nyvjnlPBPQKjQflDjlVwm5ub9M1XvH7tygiIBuT1af3l79/RSO7QugNuPp9PT05ujqbTKSgNyGKxuCLqKhH9K/CCV+POzg6JulwvlzeAaFjqqrotkDakGG/JCG5vb0/VJITwBRANi7C5KeCuZmY+O0jLzBMgOlOmZFcbdcBBPiiUoQHcJwjAARzAAdz/WTp71WUI1WJx+k8IvCavJt4RDbXhlUJadMjpFwNaXYvObecGzJSqNBBC/XAaWv46RV49VdnRc3tMzES+quu6KjONi5ggO4dXpyG8ChIU5GokbaYuA8htKBVdIselrxvb2LhvcymO+jbu5qQ8ToukdmCUQgo4TOXgYyxzCcPacJkr+blJksuUp897WvCyPpRynYMiuK2tLd09VH7kj/xofEzeL73dxtyCI7aUecBxKpzFRF/qhcVxjks+7rcvIHOvbr3u+PoQ7Eh1auslzNjDsg05q3Ppb3tGBj6DZcpTLn2panYHXFVvdBPh7EJME0t06frG+vZ4PP5eLGMjEeEYJGe6PJItMHlnNklqp1KbDj5DbfK4Jo/afITEZg/xGo8dy5OiedKkxBYhDTa29oaVPeVByt6bXWoRY5N27DXU697cYEYwml1Opzm9S7HZTzFWR6PtnTzD3v70+vj4Tzl33OQ3t+psNnu3qN4dymCPnYCIp/deU4SoY9d9YCm7aCMbOHnTMdbF2BhHPkPlGOt8bBPjNUbh+F5OyrrJHSxGuiOt5WGiAxGtZ9IPFKo1oo42G2xQ3D5BtjZqj1OqcYEaf9S1a/wpj/i82TRnHUGO/OhAwL1RaJ1n3P7+Pt+6/fVS1wiD4EMHXDOQDK4BFlpw1ILzJVRq8iVwBqcb2wWYbKYVXAlBz1Tb1RNCCy7aGiDUa+MsrucX7hQyJGomJcaSXT7aZjSZvM3f4oa+AF+08AUf7gx9ns+dsUTjPQ4vwAAHcBCAAziAAziAgwAcwAEcwEEADuAADuAADgJwAAdwAAdwEIADOIADOICDABzAARzAQQDuYqT/i8zncvxY1Pkjy3wBOfrlLNTTH7J9qp8KNq2z/BcICG5VgPtPPOO2f/1rXdS3wDIof+8+uHt01uKg0J6A0aDcc/anLavgjn75Ya2aP5uD0apMZnfW3IPHw7fqYvfpiagZMK1K/fLFCRYHrKoAB3AABwG4z75z0Fc5OZ4Cy6AclZX3AgwAou2AkfoyJoQAAAAASUVORK5CYII="
        var symbolSize = 30;

        this.myChart = echarts.init(ops.el)
        this.initWidth = ops.width || this.myChart.getWidth()
        this.initHeight = ops.height || this.myChart.getHeight()
		var data=[500, 700, 900, 1100, 1200, {value:1500,symbol:'image://'+yellowSymbol,symbolSize:symbolSize}, 1800,2100]
        this.option = {
            title: {
                text: '折线图',
                textStyle:{
                    color:'#33adce',
                    fontSize:24
                }
            },
            grid: {
                top:'60',
                left: '20',
                right: '50',
                bottom: '20',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['2011','2012','2013','2014','2015','2016','2017','2018'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    lineStyle:{
                        color:'#236e82'
                    }
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        color:'#122025',
                        width:2
                    }
                },
                axisLabel: {
                    fontSize:20
                }
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'#236e82'
                    }
                },
                splitNumber:4,
                axisTick: {
                    show:true
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        color:'#122025',
                        width:2
                    }
                },
                axisLabel: {
                    fontSize:20
                },
                splitArea: {
                    show: true,
                    interval: '1',
                    areaStyle:{
                        color:[
                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgba(8, 23, 29, 0.2)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(8, 23, 29, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(8, 23, 29, 0.2)'
                            }]),
                            'transparent'
                        ]
                    }
                }
            },
            series: [
                {
                    symbol:'image://'+blueSymbol,
                    symbolSize:symbolSize,
                    name: '增长趋势',
                    type:'line',
                    stack: '总量',
                    markPoint:{
			        	symbol:'image://'+images,
			        	symbolSize: [72, 68],
			        	symbolOffset: [0, '-90%'],			        	
			        	itemStyle:{
			        		normal:{
								label:{
				                    color:'#CA9933',
				                    fontSize: 24
				                }
			        		}
			        	},
			        	data :[{
			        		value:data[5].value,
			        		coord: [5, data[5].value+50]
			        	}]
			        },
                    data:data,
                    itemStyle: {
                        color:'#33adce'
                    }
                }
            ]
        }        
        this.myChart.setOption(this.option);
    }
    window.Chartline3 = Chartline3
})(window,document)