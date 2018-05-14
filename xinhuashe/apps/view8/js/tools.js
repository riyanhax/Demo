var debug = true;
var Config = {
	api:{
		api1:debug?"/asserts/debug/data/api4.json":"http://192.168.2.100:19091/prv/statistics/getStatistics",
		api2:debug?"/asserts/debug/data/api4-1.json":"http://192.168.2.100:19091/prv/statistics/getCount"
	}
};