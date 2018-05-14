;(function(window,document,undefined){
    function Chartline2(ops){
        var blueCircle = 'data:image/png;base64,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'
        var yellowSymbol = 'data:image/png;base64,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'
        var images="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABECAYAAAAvMQN7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA/pJREFUeNrsnM1qHEcQx7t6P2zLJpaCDQETry7xOUZ6AT+Bg5/AN13zBn6B5J5jCPgayAMEx8eARHL2SRsMFhgjIcfS2rPT5aqu7pme2ZEMtnxI+BcM1V1VXdP965np6WFZYmaX5fC37U1RDx1kSH7euL+7nyvjnlPBPQKjQflDjlVwm5ub9M1XvH7tygiIBuT1af3l79/RSO7QugNuPp9PT05ujqbTKSgNyGKxuCLqKhH9K/CCV+POzg6JulwvlzeAaFjqqrotkDakGG/JCG5vb0/VJITwBRANi7C5KeCuZmY+O0jLzBMgOlOmZFcbdcBBPiiUoQHcJwjAARzAAdz/WTp71WUI1WJx+k8IvCavJt4RDbXhlUJadMjpFwNaXYvObecGzJSqNBBC/XAaWv46RV49VdnRc3tMzES+quu6KjONi5ggO4dXpyG8ChIU5GokbaYuA8htKBVdIselrxvb2LhvcymO+jbu5qQ8ToukdmCUQgo4TOXgYyxzCcPacJkr+blJksuUp897WvCyPpRynYMiuK2tLd09VH7kj/xofEzeL73dxtyCI7aUecBxKpzFRF/qhcVxjks+7rcvIHOvbr3u+PoQ7Eh1auslzNjDsg05q3Ppb3tGBj6DZcpTLn2panYHXFVvdBPh7EJME0t06frG+vZ4PP5eLGMjEeEYJGe6PJItMHlnNklqp1KbDj5DbfK4Jo/afITEZg/xGo8dy5OiedKkxBYhDTa29oaVPeVByt6bXWoRY5N27DXU697cYEYwml1Opzm9S7HZTzFWR6PtnTzD3v70+vj4Tzl33OQ3t+psNnu3qN4dymCPnYCIp/deU4SoY9d9YCm7aCMbOHnTMdbF2BhHPkPlGOt8bBPjNUbh+F5OyrrJHSxGuiOt5WGiAxGtZ9IPFKo1oo42G2xQ3D5BtjZqj1OqcYEaf9S1a/wpj/i82TRnHUGO/OhAwL1RaJ1n3P7+Pt+6/fVS1wiD4EMHXDOQDK4BFlpw1ILzJVRq8iVwBqcb2wWYbKYVXAlBz1Tb1RNCCy7aGiDUa+MsrucX7hQyJGomJcaSXT7aZjSZvM3f4oa+AF+08AUf7gx9ns+dsUTjPQ4vwAAHcBCAAziAAziAgwAcwAEcwEEADuAADuAADgJwAAdwAAdwEIADOIADOICDABzAARzAQQDuYqT/i8zncvxY1Pkjy3wBOfrlLNTTH7J9qp8KNq2z/BcICG5VgPtPPOO2f/1rXdS3wDIof+8+uHt01uKg0J6A0aDcc/anLavgjn75Ya2aP5uD0apMZnfW3IPHw7fqYvfpiagZMK1K/fLFCRYHrKoAB3AABwG4z75z0Fc5OZ4Cy6AclZX3AgwAou2AkfoyJoQAAAAASUVORK5CYII="
        var symbolSize = 50;
        this.myChart = echarts.init(ops.el)
        this.initWidth = ops.width || this.myChart.getWidth()
        this.initHeight = ops.height || this.myChart.getHeight();
        
        this.dataValue=[15,25,30];
        var dataValues=[23,30,35];
        this.option = {
            title: {
                text: '扬州 "双创" 战略的经济发展',
                textStyle:{
                    color:'#33adce',
                    fontSize:20
                }
            },
            legend: {
            	right:"50",
            	textStyle:{
            		color:"#33adce",
            		fontSize:20
            	},
		        data:['整体产业GDP','新兴产业GDP']
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
            grid: {
                top:'80',
                left: '20',
                right: '50',
                bottom: '20',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                name:"/年",
                nameTextStyle:{"color":"#236e82","fontSize":"24"},
                boundaryGap: false,
                data: ['2015','2016','2017'],
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
                name:"/个",
                nameTextStyle:{"color":"#236e82","fontSize":"24"},
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
//              splitArea: {
//                  show: true,
//                  interval: '1',
//                  areaStyle:{
//                      color:[
//                          new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                              offset: 0,
//                              color: 'rgba(8, 23, 29, 0.2)'
//                          }, {
//                              offset: 0.5,
//                              color: 'rgba(8, 23, 29, 1)'
//                          },
//                          {
//                              offset: 1,
//                              color: 'rgba(8, 23, 29, 0.2)'
//                          }]),
//                          'transparent'
//                      ]
//                  }
//              }
            },
            series: [
                {
		            name:'整体产业GDP',
		            type:'line',
		            color:"#eeb033",
		            itemStyle: {
		            	normal: {
		            		areaStyle: {
		            			type: 'default',
		            			color:new echarts.graphic.LinearGradient(0, 0, 0,1, [{
	                                offset: 0,
	                                color: 'rgba(238,176,51,0.4)'
	                            }, {
	                                offset: 1,
	                                color: 'rgba(238,176,51,0.1)'
	                            }],false)        
		            		}
		            	}
		            },
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
			        		value:this.dataValue[1],
			        		coord: ["2016", this.dataValue[1]-7]
			        	}]
			        },
		            data:[
		            	{
		            		value:this.dataValue[0],
		            		symbol:'image://'+blueCircle,
		            		symbolSize:symbolSize
		            	},
		            	{
		            		value:this.dataValue[1],
		            		symbol:'image://'+yellowSymbol,
                    		symbolSize:symbolSize,                    		
		            	},
		            	{
		            		value:this.dataValue[2],
		            		symbol:'image://'+blueCircle,
                    		symbolSize:symbolSize,
		            	}
		            ]
		        },
		        {
		            name:'新兴产业GDP',
		            type:'line',
		            color:"#33adce",
		            symbol:'image://'+blueCircle,
		            symbolSize:symbolSize,
		            data:dataValues
		        }
            ]
        }       
        this.myChart.setOption(this.option);
    }  
    window.Chartline2 = Chartline2
})(window,document)