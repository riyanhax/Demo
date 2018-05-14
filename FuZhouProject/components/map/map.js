var map = null;
$.get('../../assets/data/green.glsl',function(glsl){
    map = new maptalks.Map('map', {
        center: [119.45558,32.78112],
        zoom: 9.8,
        baseLayer: new maptalks.TileLayer('base', {
            urlTemplate: 'http://192.168.0.235:8080/png?z={z}&x={x}&y={y}',
            fragmentShader:glsl
        }),
        attribution:false
    });
})

 
$.get('../../assets/data/扬州.geojson',function(data){
    var features = data.features;
    var ps = []
    var hightLightPolygon = null;
    var symbol = {
        lineWidth:60,
        lineOpacity:0.6,
        lineColor:'rgb(9,24,28)',
        polygonOpacity:0,
        lineJoin:'round',
        lineCap:'round',
        polygonFill:{
            'type' : 'radial',
            'colorStops' : [
                [0.00, 'rgba(9,58,66,1)'],
                [1.00, 'rgba(14,41,46,1)']
            ]
        }
    }
    for(var i=0;i<features.length;i++){
        var feature = features[i];
        var isGaoYou = feature.properties.name === '高邮市';

        if(feature.properties.level === 'district' && !isGaoYou){
            symbol.lineWidth = 1;
            symbol.lineColor = 'rgb(47,159,188)';
            symbol.polygonOpacity = 0.6;
            symbol.polygonFill = {
                'type' : 'radial',
                'colorStops' : [
                    [0.00, 'rgba(9,58,66,1)'],
                    [1.00, 'rgba(14,41,46,1)']
                ]
            };
            
        }

        var polygon =  new maptalks.Polygon(feature.geometry.coordinates,{
            cursor:'pointer',
            symbol:symbol
        })
        ps.push(polygon)

        if(isGaoYou){
            var shadows = []
            symbol.lineWidth = 2;
            symbol.lineColor = '#eeb033';
            symbol.polygonFill = {
                'type' : 'radial',
                'colorStops' : [
                    [0.00, 'rgba(65,158,185,1)'],
                    [0.50, 'rgba(23,92,107,1)'],
                    [1.00, 'rgba(9,70,81,1)']
                ]
            };
            shadows.push(symbol)
            var symbol2 = $.extend({},symbol)
            symbol2.lineWidth = 20;
            symbol2.lineColor = 'rgba(0,0,0,0.3)';
            shadows.push(symbol2)
            hightLightPolygon = new maptalks.Polygon(feature.geometry.coordinates,{
                cursor:'pointer',
                symbol:shadows.reverse()
            })
        }
        
    }
    new maptalks.VectorLayer('vector',ps).addTo(map)
    var layer = new maptalks.VectorLayer('vector1',hightLightPolygon).addTo(map)

    createBigMarker({x:119.45558,y:32.78112},layer,'#eeb033')
    createBigMarker({x:119.3499755859,y:33.2272006440},layer,'#22928b')

})

function createBigMarker(lonlat,layer,color){
    var marker = new maptalks.Marker(
        lonlat,    
        {
          'symbol' : [
            {
              'markerType' : 'ellipse',
              'markerFill' : color,
              'markerFillOpacity' : 1,
              'markerWidth' : 20,
              'markerHeight' : 20,
              'markerLineWidth' : 0
            },
            {
              'markerType' : 'ellipse',
              'markerFill' : color,
              'markerFillOpacity' : 0.3,
              'markerWidth' : 0,
              'markerHeight' : 0,
              'markerLineWidth' : 1,
              'markerLineColor': color
            }
          ]
        }
      ).addTo(layer);

      animateMarker(marker,500)
}

function animateMarker(marker,time){
    marker.animate({
        'symbol': [{},{
          'markerWidth': 55,
          'markerHeight': 55
        }]
    }, {
        'duration': time,
        'easing':'inAndOut'
    });

    setTimeout(function(){
        marker.animate({
            'symbol': [{},{
              'markerWidth': 20,
              'markerHeight': 20
            }]
        }, {
            'duration': time,
            'easing':'inAndOut'
        });
        setTimeout(function(){
            animateMarker(marker,time)
        },time)
    },time)
}