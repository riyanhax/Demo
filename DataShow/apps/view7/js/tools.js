/*var debug = true;*/
var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api5.json":config.IP+"/prv/userGroups/getUserMsg",
		api2:debug?"../../asserts/debug/data/api5-1.json":config.IP+"/prv/userGroups/getAccessFrequency",
		api3:debug?"../../asserts/debug/data/api5-2.json":config.IP+"/prv/userGroups/getAccessTime",
		api4:debug?"../../asserts/debug/data/api5-3.json":config.IP+"/prv/userGroups/getAverageStayLength",
		api5:debug?"../../asserts/debug/data/api5-4.json":config.IP+"/prv/userGroups/getArea"
	}
};
