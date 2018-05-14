/*var debug = true;*/
var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api3.json":config.IP+"/prv/storage/getWeek",
		api2:debug?"../../asserts/debug/data/api3-1.json":config.IP+"/prv/storage/getToday",
		api3:debug?"../../asserts/debug/data/api3-2.json":config.IP+"/prv/storage/getPersent"
	}
};