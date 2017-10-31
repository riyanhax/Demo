  var mapGeoJSON = Highcharts.maps['custom/world'];
  var chinaGeoJSON = Highcharts.maps['countries/cn/cn-all'];
  var myData = [];
  var myData2 = [];
  var country = ['韩国','新加坡','日本','美国','休斯顿','德国','印度','巴西','俄罗斯','迪拜'];
  var tooltips = {};
  var groupData = $.get('./aa.json').success(function(res){
    for(var i=0;i<res.length;i++){
      tooltips[res[i].groupName] = res[i].list;
      myData.push({
            name: '',
            lat: +res[i].lat,
            lon: +res[i].lng,
            marker:{
              width:36,
              height:30,
              symbol:'url(../css/cor.png)'
            },
            id:res[i].groupName

      });

      if(country.indexOf(res[i].groupName) == -1){
        myData2.push({
          name: '',
          lat: +res[i].lat,
          lon: +res[i].lng,
          marker:{
            width:36,
            height:30,
            symbol:'url(../css/cor.png)'
          },
          id:res[i].groupName
        });
      }
    }

    chart = $("#container").highcharts('Map', {
            title: {
                text: null
            },
            exporting:{
              enabled:false
            },
            mapNavigation: {
                enabled: true
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
            series: [
              {
                type: "map",
                borderWidth: 1,
                borderColor:'#70AAC1',
                mapData: mapGeoJSON,
                joinBy: ['hc-key', 'key'],
                name: 'Random data',
                nullColor:'#70AAC1',
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
                point: {
                    events: {
                        click: function (e) {

                            var pos = this;
                            tooltip(this)
                            pointStatus(this)
                            $('#tooltip').css({
                              'top':pos.plotY-15+'px',
                              'left':pos.plotX+46+'px'
                            }).show();
                        }
                    }
                }
            }
          ]
        });

  chart2 = $("#container2").highcharts('Map', {
              title: {
                  text: null
              },
              mapNavigation: {
                  enabled: true
              },
              exporting:{
                enabled:false
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
              series: [
                {
                  type: "map",
                  borderWidth: 1,
                  borderColor:'#fff',
                  mapData: chinaGeoJSON,
                  joinBy: ['hc-key', 'key'],
                  name: 'Random data',
                  nullColor:'#6CBCAD',
                  states: {
                      hover: {
                          enabled:false
                      }
                  }

              },
              {
                  type: 'mappoint',
                  name: 'point',
                  data: myData2,
                  states:{
                    hover:{
                      enabled: false
                    }
                  },
                  point: {
                      events: {
                          click: function () {
                              var pos = this;
                              tooltip(this)

                              pointStatus(this)
                              $('#tooltip').css({
                                'top':pos.plotY-15+'px',
                                'left':pos.plotX+56+'px'
                              }).show();
                          }
                      }
                  }
              }
            ]
          });
  });

function tooltip(obj){
  $('#tooltip ul').html('');
  var country = tooltips[obj.id];
  for(var i=0;i<country.length;i++){
    var oLi = $('<li></li>');
    oLi.html('<h2>'+country[i].name+'</h2><div class="content"><p><span>邮编：</span><span>'+country[i].postcode+'</span></p><p><span>电话：</span><sapn>'+country[i].tel+'</span></p><p><span>地址：</span><sapn>'+country[i].address+'</span></p></div>');
    oLi.appendTo($('#tooltip ul'));
    if(i==0){
      oLi.addClass('active')
    }
  }
  $('#tooltip ul li').on('click',function(){
    if(!$(this).hasClass('active')){
        $('#tooltip ul li').removeClass('active')
        $(this).addClass('active');
    }
  })

}

function pointStatus(obj){
  $('.highcharts-point').attr('href','../css/cor.png')
  $(obj.graphic.element).attr('href','../css/down.png')
  if($(obj).attr('isClick')){

    $(obj).attr('isClick',false)
  }else{
    $(obj).attr('isClick',true)
  }
}


$('#container').on('click','.highcharts-name-china',function(){
  var highcharts = chart.highcharts();
  $('#container').removeClass('zoomIn').addClass('animated zoomOut');
  $('#tooltip').hide();
  setTimeout(function(){
    $('#container').hide();
    $('#container2').removeClass('zoomOut').addClass('animated zoomIn').show();
    $('#backbtn').show();
  },500)
});

$('#backbtn').on('click',function(){
  $(this).hide();
  $('#container2').removeClass('zoomIn').addClass('animated zoomOut');
  $('#tooltip').hide();
  setTimeout(function(){
    $('#container2').hide();
    $('#container').removeClass('zoomOut').addClass('animated zoomIn').show();
  },500)
});

$(document).on('click',function(e){
  if(!$(e.target).hasClass('highcharts-point')){
    $('#tooltip').hide();
  }
});

$('#tooltip').on('click',function(e){
    $('#tooltip').show();
    e.preventDefault();
    e.stopPropagation();
})
