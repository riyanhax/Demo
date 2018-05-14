$(function(){
	$.ajax({ url: '../../../data/barData_02/data_01.json', dataType:'json', type:"get" ,async: false, success: function(data){
		var color = ['#32AACB','#143F4C','#CCCFD1'];
		var myChart = echarts.init(document.getElementsByClassName('column')[0]);
		var fontSize = 20;
		var xAxis = data.xAxis;
		var max = Math.max.apply(null, data.data);
		var seriesData = [max * 0.03, max * 0.03, max * 0.03];
		var option = {
		    grid: {
		    	top: '10%',
		        left: '2%',
		        right: '2%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        data: xAxis,
		        axisLine:{
		        	lineStyle:{
		        		color:color[0],
		        		width:'1',
		        		opacity:'0.5'
		        	}
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	margin: 10
		        },
		        axisTick:{
		        	show: false
		        },
		        splitLine:{
		        	show: true,
		        	lineStyle:{
		        		color:'#142026'
		        	}
		        }
		    }],
		    yAxis: [{
		        type: 'value',
		        splitNumber: 4,
		        name: '总数/家',
		        nameTextStyle:{
		        	fontSize: fontSize,
		        	padding:[0, 0, -10, 870]
		        },
		        splitArea:{
		        	show: true,
		        	interval:2,
		        	areaStyle:{
		        		color:[hexToRgba(color[0], '0.05'), hexToRgba(color[0], '0')]
		        	}
		        },
		        axisLine:{
		        	lineStyle:{
		        		color: color[0],
		        		width:'1',
		        		opacity:'0.5'
		        	}
		        },
		        axisLabel:{
		        	fontSize:fontSize
		        },
		        axisTick:{
		        	show: false
		        },
		        splitLine:{
		        	lineStyle:{
		        		color:'#142026'
		        	}
		        }
		    }],
		    series: [{
		        type: 'bar',
		        stack: 1,
		        barWidth: '40',
		        barGap:'100%',
		        itemStyle:{
					normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0, color: 'rgba(50, 171, 204, 1)'
	                    }, {
	                        offset: 1, color: 'rgba(50, 171, 204, 0.3)'
	                    }], false)
	                }
		        },
		        data: data.data
		    },
		    {
		        type: 'bar',
		        stack: 1,
		        barWidth: '40',
		        barGap:'100%',
		        itemStyle:{
					normal: {
	                    color: 'rgba(0,0,0,0)'
	                }
		        },
		        data: seriesData
		    },
		    {
		        type: 'bar',
		        stack: 1,
		        barWidth: '40',
		        barGap:'100%',
		        itemStyle:{
					normal: {
	                    color:color[0]
	                }
		        },
		        data: seriesData
		    }]
		};
		myChart.setOption(option);
		function hexToRgba(hex, opacity) { 
			return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
		}
  	}});
	
})
