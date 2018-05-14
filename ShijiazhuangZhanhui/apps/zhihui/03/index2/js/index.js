$(function(){
	var data = {
		name:"采掘工作面信息",
		dataList:[
			["初始","煤巷掘进","11206运输巷","正常掘进","20%"],
			["初始","煤巷掘进","11206回风巷","正常掘进","30%"],
			["初始","半岩半煤掘进","11107回风巷","正常掘进","40%"],
			["初始","采面","11203综采工作面","正常回采","45%"],
			["初始","采面","10507采煤工作面","正常回采","50%"],
			["初始","煤巷掘进","11206运输巷","正常掘进","60%"],
			["初始","煤巷掘进","11206回风巷","正常掘进","70%"],
			["初始","半岩半煤掘进","11107回风巷","正常掘进","80%"],
			["初始","采面","11203综采工作面","正常回采","90%"]
		]
	};
	$(".contentBoxTittle .title").html(data.name);
	var dataList=data.dataList;
	for(var i=0;i<dataList.length;i++){
		$(".contentUlList").append(	
			'<li>'+
				'<div>'+dataList[i][0]+'</div>'+
				'<div>'+dataList[i][1]+'</div>'+
				'<div>'+dataList[i][2]+'</div>'+
				'<div>'+dataList[i][3]+'</div>'+
				'<div class="contentCent">'+
					'<p><i style="width:'+dataList[i][4]+'"></i></p>'+
					'<span>'+dataList[i][4]+'</span>'+
				'</div>'+					
			'</li>'
		)
	}	
	$(".contentUlList li").eq(3).addClass('green')
	setInterval(function(){		
		var dataList=data.dataList;
		$(".contentUlList li").html("");
		var i=0;
		setInterval(function(){			
			if(i>=dataList.length){return}
			$(".contentUlList li").eq(i).append(					
				'<div>'+dataList[i][0]+'</div>'+
				'<div>'+dataList[i][1]+'</div>'+
				'<div>'+dataList[i][2]+'</div>'+
				'<div>'+dataList[i][3]+'</div>'+
				'<div class="contentCent">'+
					'<p><i style="width:'+dataList[i][4]+'"></i></p>'+
					'<span>'+dataList[i][4]+'</span>'+
				'</div>'				
			)
			i++;
		},150)
		$(".contentUlList li").eq(3).addClass('green')
	},3000)
})