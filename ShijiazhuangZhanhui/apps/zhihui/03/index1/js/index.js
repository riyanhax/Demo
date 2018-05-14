$(function(){
	// var data = {
	// 	name:"各系统概要",
	// 	dataList:[
	// 		["system1.png","安全监测系统","55%","正常","green"],
	// 		["system2.png","瓦斯抽采系统","30%","正常","green"],
	// 		["peopleNum.png","人员定位系统","50%","正常","green"],
	// 		["system4.png","视频监控系统","40%","正常","green"],
	// 		["system5.png","通讯广播系统","60%","正常","green"],
	// 		["system6.png","皮带运输系统","80%","告警","#ffc801"],
	// 		["system7.png","通风系统","70%","告警","#ffc801"],
	// 		["system8.png","排水系统","90%","危险","#e12921"]
	// 	]
	// };
	var data = {
		name:"各系统概要",
		dataList:[
			["system1.png","安全监测系统","55%","正常","#ffc800"],
			["system2.png","瓦斯抽采系统","30%","正常","#ffc800"],
			["peopleNum.png","人员定位系统","50%","正常","#ffc800"],
			["system4.png","视频监控系统","40%","正常","#ffc800"],
			["system5.png","通讯广播系统","60%","正常","#ffc800"],
			["system6.png","皮带运输系统","80%","正常","#ffc800"],
			["system7.png","通风系统","70%","正常","#ffc800"],
			["system8.png","排水系统","90%","正常","#ffc800"]
		]
	};
	$(".contentBoxTittle .title").html(data.name);
	var dataList=data.dataList;
	for(var i=0;i<dataList.length;i++){
		$(".contentUlList").append(
			'<li>'+
				'<div class="contentLeft content">'+
					'<div><img src="img/'+dataList[i][0]+'" /></div>'+							
					'<span>'+dataList[i][1]+'</span>'+
				'</div>'+
				'<div class="contentCent content" style="border-color:'+dataList[i][4]+'">'+
					'<p style="width:'+dataList[i][2]+';background:'+dataList[i][4]+'"></p>'+
				'</div>'+
				'<div class="contentRight content">'+dataList[i][3]+'</div>'+
			'</li>'
		)
	}
	
	setInterval(function(){
		$(".contentUlList .contentCent:eq(4)").css({"borderColor":"green"}).addClass('green');
		$(".contentUlList .contentCent:eq(4) p").css({"background":"green"});
		$(".contentUlList .contentRight:eq(4)").css({"color":"green"});
		
		$(".contentUlList .contentCent p").css({"width":"0"});
		for(var i=0;i<dataList.length;i++){			
			$(".contentUlList li").eq(i).find(".contentCent p").animate({"width":dataList[i][2]},1000);
		}
	},3000)
})
