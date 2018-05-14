//var electron = window.require ? require('electron') : null;
//var ipc = electron ? electron.ipcRenderer : null;

var vList = ['./videos/北京展会.mp4', './videos/北京展会.mp4'];
var cList = [
    "实现以三维为基础的监控资源有序管控和指挥调度，有效管理城市范围内海量离散视频；以事件目标为驱动，宏观与细节有机结合；以真实三维场景为背景灵活操作，不必死记硬背监控点位，一线人员轻松上手，提高指挥调度能力、现场处置能力和综合监管能力。",
    [
    	"可视化指挥决策平台平台集成监测预警、应急指挥调度、仿真推演、分析研判等于一身，支持从警力警情分布、视频监控、卡口分布、辖区人口、重点场所等多个维度进行日常监测与协调管理。",
    	"对城市交通态势进行可视化展示，包括浮动车、交通流量、路况、拥堵排名、交通事件、诱导屏、历史数据统计、数据回放、异常拥堵报警等。",
   		"可视化展示展示民航系统的关键业务信息：航班运行态势、机场运行态势、机场气象信息、航路 运行态势、管制区运行态势、空管设施设备状态、正常率统计、飞行架次统计等重要民航业务数据。",
   		"构建低空安全态势监测系统来实现安全管控以及调度管理工作的直观可视化，对机场飞鸟监测、 无人机监测全天候远距离跟踪监控系统，能够为空管人员提供及时、准确、全面的机场管理信息 ，从而有效避免飞行安全事故发生",
    	"通过运控中心大屏幕可视化的方式，对煤矿的安全生产情况进行集中实时监控，包含集团煤矿整 体安全生产概况监控与单个煤矿的详细实时监测。在发生紧急事件时，进行远程应急指挥调度。 同时，利用汇总的安全生产大数据，进行挖掘分析，供领导层决策辅助。",
    	"配合“中国电动汽车充电基础设施促进联盟”，实现对全国充电设施建设规划分析、充电设施布 局分析、充电设施运营分析、节能减排分析、充电设施认证分析等。",
    	"对互联网金融大数据进行风控分析与可视化展示，包括全局分析、地域风控、用户画像、用户行为分析等。",
    	"对电商大数据进行可视化展示，包括活跃用户、实时交易、热门商品、用户行为分析、地域分布 等，并基于此系统，与电商数据产品捆绑为行业解决方案。"
    ]
];
var vLen = vList.length;
var curr = null;
var $video = null;
var currentHolder = null;
var timeout = null;
var daemonClient = null;
var animatePlayers = {};

$(document).ready(function () {

    $video = $("#videobg");

    daemonClient = new Zoolon.DaemonClient();

    daemonClient.connect({
        url: "ws://127.0.0.1:5678",
        name: "idleScreen",
        onMessage: onDaemonMessage
    });


    showVideo();

});


function onDaemonMessage(message) {
    console.log(message);
}

function showVideo() {


    playIndex(0,false,0);


    $video.on("ended", function () {

        if (currentHolder !== null) {
            playIndex(currentHolder,false,0);
        }
        else {
            playNext();
        }
    });

    $(".button").mousedown(function () {
        $(this).css("opacity", 0.4);
    });
    $(".button").mouseup(function () {
        $(this).css("opacity", 1);
    });

    $(".button").click(function () {

        var index = $(this).data("index");
        playIndex(index,false,0);
        if(index==0){
        	open(index)
        }
        
    });

    $(".button").mouseover(function () {
        var index = $(this).data("index");
        if (timeout === null) {
            timeout = setTimeout(function () {
            	currentHolder = index;
            	playIndex(currentHolder,false,0);	
                timeout = null;
            }, 1000);
        }
    });

    $(".button").mouseout(function () {
        currentHolder = null;
        if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
        }
    });
    
    $(".headList p").mousedown(function(){
    	$(this).css("opacity", 0.4);
    });
    $(".headList p").mouseup(function(){
    	$(this).css("opacity",1);
    });
    $(".headList p").click(function(){
    	var index = $(this).index();
    	playIndex(1,true,index);
   	    open(1,index)
    })
    $(".headList p").mouseover(function () {
        var index = $(this).index();
        
        if (timeout === null) {
            timeout = setTimeout(function () {
            	currentHolder = 1;
            	playIndex(currentHolder,true,index);	
                timeout = null;
            }, 1000);
        }
    });
    $(".headList p").mouseout(function () {
        currentHolder = null;
        if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
        }
    });
}

function open(index,selectIndex) {
	if(selectIndex||selectIndex==0){
		daemonClient.shiftView("Layout" + index + selectIndex)
	}else{
		daemonClient.shiftView("Layout" + index);
	}
    
}
function playIndex(index, force,selectIndex) {
    $video.prop("src", vList[index]);
    $video.trigger("play");
	
    for (var p in animatePlayers) {
        var animatePlayer = animatePlayers[p];

        animatePlayer.hide();
    }
    if (curr !== index || force) {
        curr = index;
        $(".header").removeClass("v0 v1");
        $(".header").addClass("v" + index);
        
        $(".header .desc").fadeOut(200, function () {
        	$(".button").removeClass("selected");
        	$(".headList p").removeClass("selected")
        	if(index==0){
        		$(".desc").css({"top":"182px","left":"3324px"})
        		$(".header .content").html(cList[index]);
        		$(".headList").hide()
        	}else{
        		if(selectIndex==0){
        			$(".desc").css({"top":"530px","left":"2410px"})
        		}else if(selectIndex==1){
        			$(".desc").css({"top":"530px","left":"2750px"})
        		}else if(selectIndex==2){
        			$(".desc").css({"top":"530px","left":"3100px"})
        		}else if(selectIndex==3){
        			$(".desc").css({"top":"530px","left":"3450px"})
        		}else if(selectIndex==4){
        			$(".desc").css({"top":"530px","left":"3800px"})
        		}else if(selectIndex==5){
        			$(".desc").css({"top":"530px","left":"4160px"})
        		}else if(selectIndex==6){
        			$(".desc").css({"top":"530px","left":"4500px"})
        		}else if(selectIndex==7){
        			$(".desc").css({"top":"530px","left":"4850px"})
        		}
        		$(".headList").show();
        		$(".header .content").html(cList[index][selectIndex]);
        		$(".headList p").eq(selectIndex).addClass("selected");
        	}
            $(".button.b" + index).addClass("selected");
			
            $(".header .desc").fadeIn(200);
        });
    }
}

function playNext() {

    curr++;

    if (curr >= vLen) {
        curr = 0;
    }

    playIndex(curr, true,0);
}