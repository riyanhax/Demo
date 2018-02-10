var view = null;
var dataPolling = null;
var timeThread = null;
var currentWidth = null;
var currentHeight = null;
var viewData = null;
var time = 0;
var currentIndex = 0;
var currentLife = 0;
var date_view = '';
var ipconfig = require(__dirname+'/../ipconfig.json');

window.onload = function()
{
	view = new RViewUI();
	view.initialize();

	//startDataPolling("全国", "null",10000);

	currentWidth = window.innerWidth;
	currentHeight = window.innerHeight;

	var ws = new WebSocket('ws://127.0.0.1:8888');
	ws.onopen = function(){
		ws.onmessage = function(arg){
			var data = JSON.parse(arg.data);
			if(data.main == 'situation_open'){
				update(data.selected)
			}

			if(data.main == 'time_set'){
				window.waitIndex = data.value;
				if(viewData.life == 0){
					doRequest(viewData.views[0].title,viewData.views[0].apName);
				}
			}

			if(data.main == 'switch_some_info'){
				var tables = document.getElementById('infoPanel').children;
				if(data.value == 'isShow'){
					tables[1].style.display = 'block';
					tables[2].style.display = 'block';
				}

				if(data.value == 'isHide'){
					tables[1].style.display = 'none';
					tables[2].style.display = 'none';
				}
			}
		}
	}

	var first = {
		life:1,
		interval:10000,
		views:[
			{
				title:'北京/首都',
				apName:'ZBAA'
			},
			{
				title:'上海/浦东',
				apName:'ZSPD'
			},
			{
				title:'上海/虹桥',
				apName:'ZSSS'
			},
			{
				title:'广州/白云',
				apName:'ZGGG'
			},
			{
				title:'深圳/宝安',
				apName:'ZGSZ'
			},
			{
				title:'成都/双流',
				apName:'ZUUU'
			},
			{
				title:'昆明/长水',
				apName:'ZPPP'
			},
			{
				title:'西安/咸阳',
				apName:'ZLXY'
			}
		],
		date:new Date().Format('yyyyMMdd')

	};

	try
	{
		//var p = decodeURI((location + "")).split("?")[1].split("=")[1];

		update(first);
	}
	catch (ex)
	{
		//alert(ex.message);
	}

	try
	{
		// window.external.CALLCPP("{'msg': 'view1 success','type':
		// 'control'}");
	}
	catch (e)
	{
		// changeView("regularRateData", "year", "2013", "8", "null", "null");
		alert("检测容器失败:" + e.message + "\n" + "显示默认视图");
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

function update(jObj)
{
	try
	{

		//var jObj = Json.compileJson(json);
		date_view = jObj.date;
		if (date_view == null || date_view == undefined || date_view == "" || date_view == "0")
		{

			var d = new Date();
			date_view = d.Format("yyyyMMdd");
		}

		setData(jObj);

		return "success";

		// changeView(jObj.name, jObj.date, jObj.area);
	}
	catch (e)
	{
		alert("update fail:" + e.message);

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
	endDataPolling();

	time = 0;

	var data = viewData.views[currentIndex];
	var life = parseInt(viewData.life);
	var interval = viewData.interval;

	if (interval == null || interval == undefined || interval == "" || interval == "0")
	{
		interval = 40000;
	}

	// alert(date + "," + interval);

	if (life != 0)
	{
		currentLife = viewData.life;
		startTimeThread();
	}
	else
	{
		endTimeThread();
	}

	startDataPolling(data.title, data.apName, interval);

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

	}, viewData.interval);
}

function endTimeThread()
{
	window.clearInterval(timeThread);
	timeThread = null;
}

function startDataPolling(title, area, interval)
{
	doRequest(title, area);

	dataPolling = window.setInterval(function()
	{
		doRequest(title, area);

	}, interval);
}

function endDataPolling()
{
	window.clearInterval(dataPolling);
	dataPolling = null;
}

function doRequest(title, area)
{
	// alert(date)
	var date = date_view;
	var now = new Date();
	var now_date = now.Format("yyyyMMdd");

	if (now_date != date)
	{
		var hour = now.getHours();
		if (hour < 1)
		{
			date = now_date;
			date_view = now_date;
		}
	}

	var d = date.substring(0, 4) + "年" + date.substring(4, 6) + "月" + date.substring(6, 8) + "日";

		httpGet(area,function(jObj){
			view.setTitle(title, d, area);
			view.setDate(date);
			view.reset();
			view.setJsonData(jObj);
		});

	};

function httpGet(area,callback){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", 'http://'+ipconfig.ip+':'+ipconfig.port+'/get_airportdynamic_less?apName='+area, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4)
		{
			var res = xmlhttp.responseText;
			var json = JSON.parse(res);
			var data = json.data;
			var jObj = JSON.parse(data[0].countStasticsResult);
			jObj.sdepFlightsCounts = JSON.parse(data[0].SDepFlights);
			jObj.rdepFlightsCounts = JSON.parse(data[0].RDepFlights);
			jObj.sarrFlightsCounts = JSON.parse(data[0].SArrFlights);
			jObj.rarrFlightsCounts = JSON.parse(data[0].RArrFlights);
			var dep = 0;
			var depDelayFlightsObj = JSON.parse(data[0].depDelayFlights)

			for(var key in depDelayFlightsObj){
				if(key.length<10){
					dep = depDelayFlightsObj[key];
					break;
				}
			}
			jObj.depDelayFlights = dep;

			callback(jObj);

		}


	}

}
