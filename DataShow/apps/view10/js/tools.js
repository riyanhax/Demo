var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api7.json":config.IP+"/prv/orgUser/getRegion",
		api2:debug?"../../asserts/debug/data/api7-1.json":config.IP+"/prv/orgUser/getClassification",
		api3:debug?"../../asserts/debug/data/api7-2.json":config.IP+"/prv/orgUser/getDuration",
		api4:debug?"../../asserts/debug/data/api7-3.json":config.IP+"/prv/orgUser/getTime",
		api5:debug?"../../asserts/debug/data/api7-4.json":config.IP+"/prv/orgUser/getFrequency",
		api6:debug?"../../asserts/debug/data/api7-5.json":config.IP+"/prv/orgUser/getDownload"
	}
};
