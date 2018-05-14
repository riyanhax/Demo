var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api6.json":config.IP+"/prv/getCategory",
		api2:debug?"../../asserts/debug/data/api6-1.json":config.IP+"/prv/getColumn",
		api3:debug?"../../asserts/debug/data/api6-2.json":config.IP+"/prv/getLine",
		api4:debug?"../../asserts/debug/data/api6-3.json":config.IP+"/prv/getMD",
		api5:debug?"../../asserts/debug/data/api6-4.json":config.IP+"/prv/getVisit",
		api6:debug?"../../asserts/debug/data/api6-5.json":config.IP+"/getDownload"
	}
};
