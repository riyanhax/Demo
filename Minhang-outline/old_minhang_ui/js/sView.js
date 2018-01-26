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
			year: 2018,
			month:01,
			views:[
				{
					title:'',
					apName:'all',
					airline:''
				}
			]
		});
	}
	catch (ex)
	{
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
		

		setData(json);

		return "success";
	}
	catch (e)
	{
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

		if (currentLife == 0)
		{
			endTimeThread();
		}
		else
		{
			time += 1000;
		}
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

	

	httpGet(function(data){
		view.setView(dataType, timeType, year, month, area, airport, title,data);
		view.setJsonData(data);
	})
	function httpGet(callback){
		const low = require('lowdb');
		const FileSync = require('lowdb/adapters/FileSync')
		var adapter = new FileSync(__dirname+'/../assets/database/regularrate.json')
		var db = low(adapter)
		var data = db.get('data')
		  .filter({apName:area})
		  .value();
		var jObj = {};
		jObj.rateList = {};
		for(var i=0;i<data.length;i++){
			jObj.rateList[data[i].month] = data[i].rate;
		}
		jObj.yoyList = jObj.rateList;
		jObj.lastList = jObj.rateList;;
		callback(jObj);

	}

}
