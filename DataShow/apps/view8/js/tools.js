/*var debug = true;*/
var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api4.json":config.IP+"/prv/statistics/getStatistics",
		api2:debug?"../../asserts/debug/data/api4-1.json":config.IP+"/prv/statistics/getCount"
	}
};