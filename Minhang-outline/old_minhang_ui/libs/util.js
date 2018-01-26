﻿var server = "http://192.168.1.230:8099";
// server = "http://112.124.7.37:8099";
// server = "http://127.0.0.1:8099";
server = "";
var proxy = "http://localhost:8080/mh/postData.jsp";
 proxy = null;
var demo = false;

document.oncontextmenu = new Function("event.returnValue=false;");
document.onselectstart = new Function("event.returnValue=false;");
window.onerror=function(){};


// alert(navigator.appVersion);

Date.prototype.Format = function(fmt)
{
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

function httpPost(url, data, callback)
{

	try
	{
		var contentType="application/x-www-form-urlencoded; charset=UTF-8";

		if (url == null)
		{
			url = data.substring(4, data.length);
			data = "";
			contentType="application/json";
			// alert(data);
		}

		var xmlhttp;
		var method = "POST";
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open(method, url, true);
		xmlhttp.setRequestHeader("Content-Type", contentType);
		xmlhttp.setRequestHeader("Content-Length", data.length);
		xmlhttp.send(data);
		// if (xmlhttp.Status = 200)
		// {
		// callback(xmlhttp.responseText);
		// }

		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4)
			{
				callback(xmlhttp.responseText);
			}
			else
			{
				//alert(xmlhttp.readyState);
			}
		};

	}
	catch (e)
	{
		//var date=new Date();
		//var dt=date.Format("yyyy-MM-dd hh:mm:ss");
		//alert(e.message+"\n"+url+"\n"+dt);
	}


}

function Json()
{

}

Json.compileJson = function(_json)
{

	var obj = null;

	if (_json != null || _json != "")
	{
		try
		{
			obj = eval("(" + _json + ")");
		}
		catch (e)
		{
			//alert("Json.js-compileJson:" + e.message);
		}
	}
	else
	{
		//alert("Json.js-compileJson:Json编译失败!");

	}

	return obj;
};

function getAxisData(min, max, tickCount, tickUnit)
{

	var d = Math.ceil((max - min) / tickCount);
	var len = (d + "").length;

	if (len > 1)
	{
		len = len - 1;
	}

	var da = pow(tickUnit, len);

	var int = Math.ceil(d / da) * da;
	min = Math.floor(min / da) * da;
	max = Math.ceil(max / da) * da;

	return {
		'max' : max,
		'min' : min,
		'int' : int
	};

}

function pow(a, n)
{
	var ret = 1;
	var i;
	for (i = 0; i < n; i++)
	{
		ret = ret * a;
	}
	return ret;
}
