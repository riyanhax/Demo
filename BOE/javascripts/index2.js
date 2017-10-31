  var chinaGeoJSON = Highcharts.geojson(Highcharts.maps['countries/cn/cn-all']);
  var data = Highcharts.geojson(Highcharts.maps['custom/world']);
  var transform = Highcharts.maps['countries/cn/cn-all']['hc-transform']['default'].crs;

  $.each(data, function (i) {
    if(this.properties['country-abbrev'] == 'China'){
      this.drilldown = this.properties['country-abbrev'];
    }
  });
var position = proj4(transform,[116.4009203787,39.9032724643]);
// /console.log(position)
  var myData = [{
        // lon: 39.9032724643,   // 经纬度查询请到 http://www.gpsspg.com/maps.htm
        // lat: 116.4009203787,
        marker:{
          width:36,
          height:30,
          symbol:'url(../css/cor.png)'
        },
        x:0,
        y:0
      }

  ];

  var test = $('#container').highcharts('Map', {
      title: {
        text: null
      },
      legend:{
        enabled:false
      },
      credits: {
          enabled: false
      },
      colorAxis: {
          enabled:false
      },
      tooltip:{
          enabled:false
      },
      chart : {
          events: {
              drilldown: function (e) {
                console.log(e.point)
                this.addSeriesAsDrilldown(e.point, {
                    name: e.point.name,
                    data: chinaGeoJSON,
                    borderWidth: 1,
                    borderColor:'#fff'
                });
              },
              drillup: function () {

              }
          }
      },
      mapNavigation: {
          enabled: true
      },

      series : [{
          type:'map',
          data : data,
          borderWidth: 1,
          borderColor:'#70AAC1',
          states: {
              hover: {
                  enabled:false
              }
          }
      },
      {
          type: 'mappoint',
          name: 'point',
          data: myData,
          states:{
            hover:{
              enabled: false
            }
          },
          events:{
            show:function(){
              console.log(this)
            }
          },
          point: {
              events: {
                  click: function () {
                      var pos = this;
                      $('#tooltip').css({
                        'top':pos.plotY+36+'px',
                        'left':pos.plotX+20+'px'
                      }).show();
                  }
              }
          }
        }
      ],
      drilldown: {
          drillUpButton: {
              relativeTo: 'spacingBox',
              position: {
                  x: 0,
                  y: 60
              }
          }
      }
  });
