/**
 * 预加载数据
 */
(function(){
	App.Preload.ListDataTask = function(handler)
	{
		handler = function(onComplete)
		{
			App.parseData = new App.ParseData();
			App.parseData.loadAirport();
			App.parseData.loadWeather();
			App.parseData.loadFacility();
			App.parseData.loadOndutyPeople();
			App.parseData.loadAirportinfo();
			App.parseData.loadSectorArea();
  			App.parseData.loadDelaySectorArea();
			App.parseData.loadDelayRoutes();
			App.parseData.loadrouteinfo();
			App.parseData.loadRoutes();			

			onComplete();
		}

		App.Preload.Task.call(this,handler);
	}

	var task = new App.Preload.ListDataTask();
	App.Preload.appendTask(task);
})();

App.Director = function()
{
	var mapScene = new App.MapScene();

	App.AirportScene = new App.AirportOperSituAndMeteoInfoScene();
	App.AirrouteScene = new App.AirrouteOperSituScene();
	App.SwitchSceneController = new App.SwitchSceneController();
	App.ControlAreaScene = new App.AirportControlAreaScene();
	App.AirportRouteStatusScene = new App.AirportRouteStatusScene();

	
}
