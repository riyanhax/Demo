App.viewer;
App.MapScene = function()
{
	var container = document.getElementById("container");
	var skyAtmosphere = new Cesium.SkyAtmosphere();
	skyAtmosphere.brightnessShift = -0.62;
	skyAtmosphere.saturationShift = 0.5;
	skyAtmosphere.hueShift=0.05;
    var options = {
            animation: false,
            baseLayerPicker: false,
            creditContainer: document.createElement("div"),
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: true,
            sceneModePicker: false,
           	skyBox: new Cesium.SkyBox({
						  sources : {
						    positiveX : './assets/img/skybox.png',
						    negativeX : './assets/img/skybox.png',
						    positiveY : './assets/img/skybox.png',
						    negativeY : './assets/img/skybox.png',
						    positiveZ : './assets/img/skybox.png',
						    negativeZ : './assets/img/skybox.png'
						  }
						}),
						skyAtmosphere : skyAtmosphere,
	        sceneMode: Cesium.SceneMode.SCENE3D,
	        selectionIndicator: false,
	        scene3DOnly: true,
            timeline: false,
            navigationHelpButton: false,
            navigationInstructionsInitiallyVisible: false,

    		mapProjection: new Cesium.WebMercatorProjection(Cesium.Ellipsoid.WGS84),

	        imageryProvider: new Cesium.SingleTileImageryProvider({url: Cesium.buildModuleUrl('../../../assets/img/land_mask_LH_all2.png')}),

	        contextOptions: {
	            webgl: {
	                alpha: false,
	                depth: false,
	                stencil: true,
	                antialias: true,
	                premultipliedAlpha: false,
	                preserveDrawingBuffer: true,
	                failIfMajorPerformanceCaveat: true
	            }, allowTextureFilterAnisotropic: true
	        }
    };

  App.viewer = new Cesium.Viewer(container, options);
	const {ipcRenderer} = require('electron')
  setTimeout(function(){
			App.viewer.camera.flyTo({
				destination : new Cesium.Cartesian3.fromDegrees( 103.4556700000,35.8329260000, 6200000 )
			});
			ipcRenderer.send('loaded','yes');
	},4000)

	// App.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(Cesium.buildModuleUrl('../../../assets/data/coastline-fixed.json'), {
  //     	stroke: Cesium.Color.fromBytes(67, 134, 255, 255),
  //    		strokeWidth: 0
  // 	}));

	App.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(Cesium.buildModuleUrl('../../../assets/data/china2.json'), {
      	stroke: Cesium.Color.fromBytes(45, 110, 208, 255),
    		strokeWidth: 6
  	}));

 	App.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(Cesium.buildModuleUrl('../../../assets/data/province.json'), {
      	stroke: Cesium.Color.fromBytes(45, 110, 208, 100),
      	strokeWidth: 1,
				fill:Cesium.Color.WHITE.withAlpha(0.0)
 	}));

	App.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(Cesium.buildModuleUrl('../../../assets/data/graticules_10.json'), {
      	stroke: Cesium.Color.fromBytes(255, 255, 255, 10),
      	strokeWidth: 1,
				fill:Cesium.Color.WHITE.withAlpha(0)
 	}));


}
