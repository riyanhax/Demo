/*var debug = true;*/
var config = window.parent.require(window.parent.configPath+'./config.json');
var debug = config.debug;
var Config = {
	api:{
		api1:debug?"../../asserts/debug/data/api1.json":config.IP+"/prv/screen/dataIn"
	}
};