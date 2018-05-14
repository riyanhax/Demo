$(function(){
	$.ajax({ url: '../../../data/barData_03/data_02.json', dataType:'json', type:"get" ,async: false, success: function(data){
		var color = ['#32AACB','#143F4C','#CCCFD1'];
		var myChart = echarts.init(document.getElementsByClassName('column')[0]);
		var fontSize = 18;
		var legend = data.legend;
		var yAxis = data.yAxis;
		var max = Math.max.apply(null, data.data);

		var option = {
		    legend: {
		        data: legend
		    },
		    grid: {
		    	top: '10%',
		        left: '2%',
		        right: '5%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis:  {
		        type: 'value',
		        axisLine:{
		        	show:false
		        },
		        axisTick:{
		        	show:false
		        },
		        splitLine:{
		        	show:false
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	color:color[0]
		        }
		    },
		    yAxis: {
		        type: 'category',
		        axisLine:{
		        	show:false
		        },
		        axisTick:{
		        	show:false
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	color:color[0]
		        },
		        data: yAxis
		    },
		    series: [
		        {
		            name: legend[0],
		            barWidth:20,
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'insideRight'
		                }
		            },
		            data: [320, 302, 301, 334, 390]
		        },
		        {
		            name: legend[1],
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'insideRight'
		                }
		            },
		            data: [120, 132, 101, 134, 90]
		        },
		        {
		            name: legend[2],
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'insideRight'
		                }
		            },
		            data: [220, 182, 191, 234, 290]
		        },
		        {
		            name: legend[3],
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'insideRight'
		                }
		            },
		            data: [150, 212, 201, 154, 190]
		        },
		        {
		            name: legend[4],
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'insideRight'
		                }
		            },
		            data: [820, 832, 901, 934, 1290]
		        }
		    ]
		};
		myChart.setOption(option);
		function hexToRgba(hex, opacity) { 
			return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
		}
  	}});
	
})
