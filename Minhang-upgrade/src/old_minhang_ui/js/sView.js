var view = null;
var dataPolling = null;
var timeThread = null;
var currentWidth = null;
var currentHeight = null;
var viewData = null;
var time = 0;
var currentIndex = 0;
var currentLife = 0;
var dataType = "regularRateData";
var ipconfig = require(__dirname+'/../ipconfig.json');

window.onload = function()
{

	view = new SViewUI();
	view.initialize();

	currentWidth = window.innerWidth;
	currentHeight = window.innerHeight;

	var ws = new WebSocket('ws://127.0.0.1:8888');
	ws.onopen = function(){
		ws.onmessage = function(arg){
			var data = JSON.parse(arg.data);
			if(data.main == 'rate_open'){
				update(data.selected)
			}
		}
	}

	try
	{
		update({
			life:0,
			timeType:'year',
			year: new Date().getFullYear(),
			month:new Date().getMonth()+1,
			views:[
				{
					title:'',
					apName:'ALL',
					airline:''
				}
			]
		});
	}
	catch (ex)
	{
		// alert(ex.message);
	}


};

window.onresize = function()
{
	if (currentWidth != window.innerWidth)
	{
		currentWidth = window.innerWidth;
		currentHeight = window.innerHeight;

		view.onresize();
	}
};

function update(json)
{
	try
	{
		//var jObj = Json.compileJson(json);

		// changeView("regularRateData", jObj.timeType, jObj.year, jObj.month,
		// jObj.apName, jObj.airline, jObj.title);

		setData(json);

		return "success";
	}
	catch (e)
	{
		// alert("update fail:" + e.message);
		return "error";
	}
}

function setData(data)
{

	viewData = data;
	currentIndex = 0;
	currentLife = 0;

	changeView();

}

function changeView()
{

	endTimeThread();

	time = 0;

	var data = viewData.views[currentIndex];
	var life = parseInt(viewData.life);
	var timeType = viewData.timeType;
	var year = viewData.year;
	var month = viewData.month;
	var area = data.apName;
	var airport = data.airline
	var title = data.title;

	// if(area!=null)
	// {
	// 	airport=area;
	// 	area=null;
	// }

	if (life != 0)
	{
		currentLife = viewData.life;
		startTimeThread();
	}
	else
	{
		endTimeThread();
	}
	doRequest(dataType, timeType, year, month, area, airport, title);

}

function showNext()
{

	if (currentIndex == viewData.views.length - 1)
	{
		currentIndex = 0;
	}
	else
	{
		currentIndex++;
	}

	changeView();

}

function startTimeThread()
{
	endTimeThread();

	timeThread = window.setInterval(function()
	{

		// alert(time);
		if (currentLife == 0)
		{
			endTimeThread();
		}
		else
		{
			time += 1000;
		}
		// alert(time+" "+currentLife);
		if (time >= currentLife)
		{

			showNext();
		}

	}, 5000);
}

function endTimeThread()
{
	window.clearInterval(timeThread);
	timeThread = null;
}

function doRequest(dataType, timeType, year, month, area, airport, title)
{

	var now = new Date();
	year = now.Format("yyyy");

	var st = year + "0101";
	var ed = year + "1201";
	timeType = "year";

	var d = new Date();
	d.setMonth(d.getMonth() - 2);
	ed = d.Format("yyyyMMdd");

	d.setMonth(d.getMonth() - 12);

	st = d.Format("yyyyMMdd");

	// }

	// /console.log(st + "," + ed);

	httpGet(function(data){
		view.setView(dataType, timeType, year, month, area, airport, title,data);
		view.setJsonData(data);
	})
	function httpGet(callback){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", 'http://'+ipconfig.ip+':'+ipconfig.port+'/get_regularrate?apName='+area, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4)
			{
				var res = xmlhttp.responseText;
				var json = JSON.parse(res);
				var data = json.data;
				var jObj = {};
				jObj.rateList = {};
				for(var i=0;i<data.length;i++){
					jObj.rateList[data[i].month] = data[i].rate;
				}
				jObj.yoyList = jObj.rateList;
				jObj.lastList = jObj.rateList;
				console.log(data);
				callback(jObj);

			}


		}
	}

}
