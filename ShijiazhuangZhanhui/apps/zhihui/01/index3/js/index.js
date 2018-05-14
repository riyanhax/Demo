$(function(){
	var data = {
		data1:{
			eqpnt:[
				{title:'25%', val:[25,75]},
				{title:'50%', val:[100,100]},
				{title:'30%', val:[30,100]},
				{title:'60%', val:[60,40]},
				{title:'98%', val:[98,2]},
				{title:'25%', val:[25,75]},
				{title:'10%', val:[10,90]},
				{title:'25%', val:[25,100]},
			],
			parking:{
				val:[22, 30, 25, 60, 35, 45, 50,23,45,50,65,30,50,60,50],
				xAxis:[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]
			},
			personnel:{
				total:50,
				val:[5,4,11,5,25]
			},
			income:[3000,91650,'30%']
		},
		data2:{
			eqpnt:[
				{title:'30%', val:[25,75]},
				{title:'45%', val:[100,100]},
				{title:'50%', val:[100,100]},
				{title:'2%', val:[2,98]},
				{title:'10%', val:[90,10]},
				{title:'25%', val:[25,75]},
				{title:'50%', val:[100,100]},
				{title:'25%', val:[25,100]},
			],
			parking:{
				val:[50, 20, 50, 75, 55, 60, 50,23,50,70,55,25,60,60,25],
				xAxis:[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]
			},
			personnel:{
				total:70,
				val:[5,14,11,15,25]
			},
			income:[5000,85410,'45%']
		},
		data3:{
			eqpnt:[
				{title:'50%', val:[100,100]},
				{title:'40%', val:[60,40]},
				{title:'25%', val:[25,75]},
				{title:'99%', val:[99,1]},
				{title:'15%', val:[85,15]},
				{title:'22%', val:[22,78]},
				{title:'50%', val:[100,100]},
				{title:'25%', val:[25,100]},
			],
			parking:{
				val:[20, 50, 25, 65, 42, 28, 45,44,75,65,12,78,60,20,25],
				xAxis:[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]
			},
			personnel:{
				total:80,
				val:[15,14,11,15,25]
			},
			income:[1250,75421,'20%']
		}
	}
	var dataArr = ['data1', 'data2', 'data3'];
	var id = setInterval(box, 3000);
	var index = 0;
	
	function box () {
		if (index < dataArr.length - 1) {
			switchDta(data[dataArr[index]]);
			index ++;
		}else {
			switchDta(data.data1);
			index = 0;
		}
	}
	switchDta ();
	function switchDta () {
		$('.top .top-right').find('.number span').html(data[dataArr[index]].personnel.total);
		for(var i = 0 ; i < data[dataArr[index]].personnel.val.length; i++){
			$('.top .top-right').find('.list .list-val').eq(i).html(data[dataArr[index]].personnel.val[i]);
		}
		$('.top .top-right').find('.floor-list').removeClass('yellow');
		$('.top .top-right').find('.floor-list').eq(index).addClass('yellow');
		for(var i = 0 ; i < data[dataArr[index]].income.length; i++){
			$('.bottom').find('.income').eq(i).html(data[dataArr[index]].income[i]);
		}
		for(var i = 0; i < data[dataArr[index]].eqpnt.length; i++){
			var myChart = echarts.init(document.getElementsByClassName('conta')[i]);
			var option = {
				title: {
			        "text": data[dataArr[index]].eqpnt[i].title,    
			        "x": '47%',
			        "y": '40%',
			        textAlign: "center",
			        "textStyle": {
			            "fontWeight": 'normal',
			            "fontSize": 30,
			            color: '#fff'
			        }
			    },
				color:['#00ADFE','#00416E'],
			    series: [
			        {
			            name:'访问来源',
			            type:'pie',
			            radius: ['73%', '90%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:data[dataArr[index]].eqpnt[i].val
			        }
			    ]
			};
			myChart.setOption(option);
		}
		var myChart1 = echarts.init(document.getElementsByClassName('bottom-char')[0]);
		var option1 = {
			grid:{
				left:'4%',
				top:'5%',
				right:'2%',
				bottom:'10%'
			},
			tooltip:{
				show:true,
				formatter:'{c}',
				position:'top',
				backgroundColor: 'rgba(50,50,50,0)',
				textStyle:{
					color:'#FBB03B',
					fontSize:24
				}
			},
		    xAxis: {
		        type: 'category',
		        axisLine:{
		        	lineStyle:{
		        		color:'#064471'
		        	}
		        },
		        axisTick:{
		        	show:false
		        },
		        axisLabel:{
		        	fontSize:18,
		        	color:'#00AEFF'
		        },
		        data: data[dataArr[index]].parking.xAxis
		    },
		    yAxis: {
		        type: 'value',
		        axisLine:{
		        	lineStyle:{
		        		color:'#064471'
		        	}
		        },
		        axisTick:{
		        	show:false
		        },
		        axisLabel:{
		        	fontSize:18,
		        	color:'#00AEFF'
		        },
		        splitLine:{
		        	lineStyle:{
		        		color:'#064471'
		        	}
		        }
		    },
		    series: [{
		    	type: 'line',
		    	lineStyle:{
		    		normal:{
		    			color:'#00AEFF'
		    		}
		    	},
		    	symbolSize:20,
				symbol:'image://img/lanse.png',
		        data: data[dataArr[index]].parking.val
		        
		    }]
		};
		myChart1.setOption(option1);
	}
	
})