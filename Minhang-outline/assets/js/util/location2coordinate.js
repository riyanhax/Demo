function CgsMap(){

}

CgsMap.prototype.pixelToLonLat=function(pixel)
{
	pixel=new Cesium.Cartesian2(pixel[0],pixel[1]);
	var cartesian = App.viewer.camera.pickEllipsoid(pixel, App.viewer.scene.globe.ellipsoid);
	if (!cartesian) return;

	var lonlat = Cesium.Cartographic.fromCartesian(cartesian);
	var lon=Cesium.Math.toDegrees(lonlat.longitude);
	var lat=Cesium.Math.toDegrees(lonlat.latitude);
	return [lon,lat];
}

CgsMap.prototype.lonLatToPixel=function(lonLat)
{
	var cartographic = Cesium.Cartographic.fromDegrees(lonLat[1],lonLat[0]);
	var cartesian = App.viewer.scene.globe.ellipsoid.cartographicToCartesian(cartographic);
    var pos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(App.viewer.scene, cartesian);
    return [pos.x, pos.y];
}

window.CgsMap = new CgsMap();
