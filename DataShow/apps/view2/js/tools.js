/*var debug = true;*/
var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api2.json":config.IP+"/prv/monitor/getlist"
	}
};