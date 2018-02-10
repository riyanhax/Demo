App.MyGeoJsonDataSource = function(name,url)
{
	this.geoJsonDataSource = new Cesium.GeoJsonDataSource(name);
	this.geoJsonDataSource.loadingEvent.addEventListener(function(){console.log("loadingEvent",name)});	
	this.geoJsonDataSource.errorEvent.addEventListener(function(){console.log("errorEvent",name)});	
	this.geoJsonDataSource.load(Cesium.buildModuleUrl(url),{
        stroke: Cesium.Color.fromBytes(58, 106, 153, 255).withAlpha(0.3),
        strokeWidth: 1
  	});
	App.viewer.dataSources.add(this.geoJsonDataSource);
}
