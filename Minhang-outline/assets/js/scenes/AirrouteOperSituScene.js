App.AirrouteOperSituScene = function()
{
	this.flag = false;
	this.timeindex;

	//右下角图例
	var body = $("#uiContainer");
	var rightlegend = $('<div></div>');
	rightlegend.css('top','690px');
	rightlegend.addClass('airrouteRightLegend');
	var levels = ['RADAR','VOR','NDB'];
	for(var i = 0;i < 3;i++)
	{
		var checkbox0 = $("<div></div>");
		checkbox0.addClass('checkbox');
		checkbox0.attr("data-other",levels[i]);
		checkbox0.attr("show-flag",true);

		var top = 16 - i +"px";
		if(i == 0)
		{
			checkbox0.css("margin-top","76px");
		}else{
			checkbox0.css("margin-top",top);
		}
		checkbox0.appendTo(rightlegend);
	}
	rightlegend.appendTo(body);
	//右下角缩略图
	var thumb = $('<img />');
	thumb.css({
		position:'absolute',
		bottom:'20px',
		right:'130px',
		width:'100px',
		border:'1px solid #0c131d',
		borderRadius:'100%'
	});
	thumb.attr('src','assets/img/thumb.png')
	thumb.appendTo(body)

	this.show = function()
	{
		if(!this.flag)
		{
			initAirrouteSceneIcon();
			showAirrouteScene();
			this.flag = true;
		}
	}.bind(this)
	this.hide = function()
	{
		this.flag = false;
		clearInterval(this.timeindex);
		setVisibileAirrouteIcon(false);
		deleteAirrouteSceneIcon();
		hideAirrouteOperScene();
		deleteAirrouteSceneIcon();
	}.bind(this)
}

// init AirrouteSceneIcon
function initAirrouteSceneIcon(){

	var data = App.Preload.assets.facility;
	var name = 'airroute';
	var size = 20;
	for(var i=0;i<data.length;i++){
		var path = data[i].state!=''?'assets/img/'+data[i].type+data[i].state+'.png':'assets/img/'+data[i].type+'.png';

		App.viewer.entities.add({
				name:name+data[i].type+","+data[i].type+","+data[i].state,
				position:Cesium.Cartesian3.fromDegrees(data[i].lon,data[i].lat),
				billboard:
				{
					image:path,
					show:true,
					width:size,
					height:size
				}
		});
	}
}

// show AirrouteScene
function showAirrouteScene() {
	var logo = $(".topLogo").eq(0);
	logo.css("background-image","url(assets/img/ATCLogo.png)");
	//show AirrouteIcon
	setVisibileAirrouteIcon(true);

	var rightlegend = $(".airrouteRightLegend").eq(0);
	rightlegend.show();
	rightlegend.css("background-image","url(assets/img/ATCdeviceStatus.png)");

	for(var i=0;i < 3;i++)
	{
			var checkbox0 = $(".airrouteRightLegend .checkbox").eq(i);
			var airrouteLevel = checkbox0.attr("data-other");
			var showFlag = checkbox0.attr("show-flag");
			if(showFlag == 'true')
			{
				checkbox0.css("background-image",'url(assets/img/oper_selected.png)');
			}else{
				checkbox0.css("background-image",'url(assets/img/oper_unselected.png)');
				setVisibileAirrouteIconByLevel(airrouteLevel,false);
			}


			checkbox0.bind("click",function(e){
				var airrouteLevel = $(this).attr("data-other");
				var showFlag = $(this).attr("show-flag");
				if(showFlag == 'true')
				{
					$(this).css("background-image",'url(assets/img/oper_unselected.png)');
					setVisibileAirrouteIconByLevel(airrouteLevel,false);
					$(this).attr("show-flag",false);
				}else{
					$(this).css("background-image",'url(assets/img/oper_selected.png)');
					setVisibileAirrouteIconByLevel(airrouteLevel,true);
					$(this).attr("show-flag",true);
				}
			});
		}
}

// set visibile about airroute
function setVisibileAirrouteIcon(flag)
{
	var entities = App.viewer.entities.values;
	var list = [];
	for(var i = 0; i < entities.length; i++)
	{
		if(!entities[i].name){
			continue;
		}
		var name = entities[i].name.split(',')[0];

		if(name == 'airrouteNDB' || name == 'airrouteRADAR' || name == 'airrouteVOR' || name == 'airrouteVOR1' || name == 'airrouteNDB1' || name == 'airrouteRADAR1')
		{
			var id = entities[i].id;
			list.push(id);
		}
	}
	for(var i = 0; i < list.length; i++)
	{
		var entity = App.viewer.entities.getById(list[i]);
		entity.billboard.show = flag;
	}
	list = [];
}

//set visibile about airroute by level
function setVisibileAirrouteIconByLevel(level,flag){
	var entities = App.viewer.entities.values;
	var apName = "airroute" + level;
	var list = [];
	for(var i = 0; i < entities.length; i++)
	{
		var name = entities[i].name.split(',')[0];

		if(name == apName)
		{
			var id = entities[i].id;
			list.push(id);
		}
	}
	for(var i = 0; i < list.length; i++)
	{
		var entity = App.viewer.entities.getById(list[i]);
		entity.billboard.show = flag;
	}
	list = [];
}

//delete airroute and meteinfo icon on map
function deleteAirrouteSceneIcon()
{
	var entities = App.viewer.entities.values;
	var list = [];
	for(var i = 0; i < entities.length; i++)
	{
		if(!entities[i].name){
			continue;
		}
		var name = entities[i].name.split(',')[0];//name+","+data[i].type+","+data[i].state,

		if(name == 'airrouteNDB' || name == 'airrouteRADAR' || name == 'airrouteVOR' || name == 'airrouteVOR1' || name == 'airrouteNDB1' || name == 'airrouteRADAR1')
		{
			var id = entities[i].id;
			list.push(id);
		}
	}
	for(var i = 0; i < list.length; i++)
	{
		var entity = App.viewer.entities.getById(list[i]);
		App.viewer.entities.remove(entity);
	}
	list = [];
}

// hide airroute operation scene
function hideAirrouteOperScene()
{

	setVisibileAirrouteIcon(false);

	var rightlegend = $(".airrouteRightLegend").eq(0);
	rightlegend.css("background-image","");
	for(var i = 0;i < 3;i++)
	{
		var checkbox0 = $(".airrouteRightLegend .checkbox").eq(i);
		var showFlag = checkbox0.attr("show-flag");
		var airportLevel = checkbox0.attr("data-other");
		if(showFlag == 'true')
		{
			checkbox0.css("background-image",'');
		}else{
			checkbox0.css("background-image",'');
			checkbox0.attr("show-flag",true)
		}
		checkbox0.unbind("click");
	}
}
//显示异常设备
function showerroper(name){//err_ALL	err_NDB	err_VOR	err_radar  name+","+data[i].type+","+data[i].state,
	var entities = App.viewer.entities.values;
	for(var i=0;i<entities.length;i++){
		var name1 = entities[i].name;
		var str = name1.split(',');
		App.viewer.entities.getById(entities[i].id).billboard.show=false;
		if(name=='err_ALL'&&str[2]=='1'){
			App.viewer.entities.getById(entities[i].id).billboard.show=true;
		}else if(name=='err_NDB'&&str[2]=='1'&&str[1]=='NDB'){
			App.viewer.entities.getById(entities[i].id).billboard.show=true;
		}else if(name=='err_VOR'&&str[2]=='1'&&str[1]=='VOR'){
			App.viewer.entities.getById(entities[i].id).billboard.show=true;
		}else if(name=='err_radar'&&str[2]=='1'&&str[1]=='RADAR'){
			App.viewer.entities.getById(entities[i].id).billboard.show=true;
		}
	}
}

window.showDeviceByControl = function(arr){
	if(arr.indexOf('radar') == -1){
		var obj = $('.airrouteRightLegend .checkbox:eq(0)');
		if(obj.attr('show-flag') !== 'false'){
			obj.trigger('click')
		}
	}else{
		var obj = $('.airrouteRightLegend .checkbox:eq(0)');
		if(obj.attr('show-flag') !== 'true'){
			obj.trigger('click')
		}
	}
	if(arr.indexOf('VOR') == -1){
		var obj = $('.airrouteRightLegend .checkbox:eq(1)');
		if(obj.attr('show-flag') !== 'false'){
			obj.trigger('click')
		}
	}else{
		var obj = $('.airrouteRightLegend .checkbox:eq(1)');
		if(obj.attr('show-flag') !== 'true'){
			obj.trigger('click')
		}
	}
	if(arr.indexOf('NDB') == -1){
		var obj = $('.airrouteRightLegend .checkbox:eq(2)');
		if(obj.attr('show-flag') !== 'false'){
			obj.trigger('click')
		}
	}else{
		var obj = $('.airrouteRightLegend .checkbox:eq(2)');
		if(obj.attr('show-flag') !== 'true'){
			obj.trigger('click')
		}
	}

	if(arr.indexOf('err_radar')!==-1){
		showerroper('err_radar')
	}
	if(arr.indexOf('err_ALL')!==-1){
		showerroper('err_ALL')
	}
	if(arr.indexOf('err_NDB')!==-1){
		showerroper('err_NDB')
	}
	if(arr.indexOf('err_VOR')!==-1){
		showerroper('err_VOR')
	}
	if(arr.indexOf('err_radar') == -1 && arr.indexOf('err_ALL') == -1 && arr.indexOf('err_NDB') == -1 && arr.indexOf('err_VOR') == -1){
		setVisibileAirrouteIcon(false);
		for(var i=0;i<arr.length;i++){
			setVisibileAirrouteIconByLevel(arr[i].toUpperCase(),true);
		}
	}

}
