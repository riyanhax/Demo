var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api8.json":config.IP+"/prv/getOrgCategory",
		api2:debug?"../../asserts/debug/data/api8-1.json":config.IP+"/prv/getOrgColumn",
		api3:debug?"../../asserts/debug/data/api8-2.json":config.IP+"/prv/getOrgLine",
		api4:debug?"../../asserts/debug/data/api8-3.json":config.IP+"/prv/getOrgMD",
		api5:debug?"../../asserts/debug/data/api8-4.json":config.IP+"/prv/getOrgVisit",
		api6:debug?"../../asserts/debug/data/api8-5.json":config.IP+"/prv/getOrgDownload"
	}
};
