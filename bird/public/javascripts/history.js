var menuIndex = 0;
$(function () {

    $('select').select2({
        tags: "false",
        allowClear: false
    });


    var option3 = null;
    var option5 = null;
    $('#uls li').each(function (index, obj) {
        $(this).on('click', function () {
            $('#start,#end').val('');
            $('#uls li').removeClass('active');
            $(this).addClass('active');
            menuIndex = index;
            startTime = '';
            endTime = '';
            if(index == 0){
              option.series[0].data = gasData;
              oChart.setOption(option);
              $('.tb').eq(1).addClass('hide')
              $('.tb').eq(0).removeClass('hide');
              $('.put3,.put4,.put6,.remove-btn').hide();
              $('.put2').eq(0).hide();
              $('.put5').show();

            }
            if(index == 1){
              option.series[0].data = batteryData;
              oChart.setOption(option);
              $('.tb').eq(1).addClass('hide')
              $('.tb').eq(0).removeClass('hide');
              $('.put2,.put6').show();
              $('.put3,.put4,.put5,.remove-btn').hide();
              option3 = $('.put2 select').children('option').eq(3).remove();
              option5 = $('.put2 select').children('option').eq(4).remove();

            }
            if(index == 2){
              $('.tb').eq(0).addClass('hide')
              $('.tb').eq(1).removeClass('hide');
              createHistory(historyList);
              $('.put2,.put3,.remove-btn').show();
              $('.put4,.put5,.put6').hide();
              $('.put2 select').children('option').eq(3).show();
              $('.tb').eq(1).find('thead th').eq(3).find('span').text('操作员');
              if(option3){
                $('.put2 select').children('option').eq(3).before(option3).after(option5);
                option3 = null;
                option5 = null;
              }
            }

            if(index == 3){
              $('.tb').eq(0).addClass('hide')
              $('.tb').eq(1).removeClass('hide');
              createHistory(alarmData);
              $('.put3,.put5,.put6').hide();
              $('.put2,.remove-btn').show();
              //$('.put4').show();
              $('.put2 select').children('option').eq(3).show();
              $('.tb').eq(1).find('thead th').eq(3).find('span').text('报警原因');
              if(option3){
                $('.put2 select').children('option').eq(3).before(option3).after(option5);
                option3 = null;
                option5 = null;
              }
            }

          })
        });

        $('#close').click(function(){
            $('.wrap').addClass('scale-out');
        })
    });
  var removeItemArr = [];
  var removeItems = [];
  var allCheck = $('.tb .history_title input');
  allCheck.on('click',function(){
    removeItemArr = [];
    removeItems = [];
    if($(this).prop('checked')){
      $('.tb .tbody_box .tbody input').each(function(){
        var id = $(this).val();
        var deviceid = $(this).attr('deviceid');
        var name = $(this).parent().text();
        removeItemArr.push({name:name,id:id,deviceid:deviceid});
        removeItems.push($(this))
      });
      $('.tb .tbody_box .tbody input').attr('checked',true);
    }else{
      $('.tb .tbody_box .tbody input').attr('checked',false);
    }
  });
  var  option = {
      title : {
          text: '',
          textStyle:{
            color:'#00ADFE',
            fontSize:'14px'
          },
          top:160,
          left:40
      },
      grid:{
        borderColor: '#ccc',
        bottom:40,
        left:68,
        top:228,
        right:40
      },
      tooltip : {
          trigger: 'axis',
          formatter: '{c}',
          backgroundColor: 'transparent',
          textStyle:{
            color:'#00adfe'
          }
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['1','2','3','4','5','6','7','8','9'],
              splitLine: {
                show:true,
                lineStyle: {
                  color:'#21294C'
                }
              }

          }
      ],
      yAxis : [
          {
              type : 'value',
              splitNumber: 9,
              splitLine: {
                lineStyle: {
                  color:'#21294C'
                }
              }
          }
      ],
      axisLabel: {
        textStyle: {
          color:'#00ADFE'
        }
      },
      series : [
          {
              name:'成交',
              type:'line',
              smooth:true,
              itemStyle: {
                normal: {
                  color:'rgba(230,30,121,0.5)',
                  borderWidth: 10,
                  lineStyle:{
                      color:'#4AD2EE',
                      shadowColor:'#59C2DB',
                      shadowBlur:10
                  },
                  areaStyle: {
                    type: 'default',
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(96,191,223,.3)'
                    }, {
                        offset: 1,
                        color: 'rgba(9,18,56,.3)'
                    }])
                  }
                }
              },
              data:[10, 12, 21, 54, 260, 830, 710,260,54]
          }
      ]
  };

  var oChart = echarts.init($('#chart')[0]);
  var gasData = [];
  var batteryData = [];
  var alarmData = [];
  var warnType = {
    '1':'气压',
    '2':'无线通信板',
    '3':'电压',
    '4':'设备异常'
  };

  var deviceType = {
    '05':'煤气炮',
    '10':'移动式太阳能声波驱鸟器',
    '09':'坐席',
    '08':'全向声波驱鸟器',
    '07':'定向声波驱鸟器',
    '06':'塔式声波驱鸟器'
  };
  var historyList = null;
  var device_type_query = [];
  var device_time_query = [];
  var device_user_query = [];


    $.ajax({
    url:'/history/init',
    method:'post',
    success:function(res){
      var users = JSON.parse(res).data;

      for(var i=0;i<users.length;i++){
        var option = new Option(users[i].username,users[i].username);
        $('#operate_user').get(0).add(option);
      }

    }
  });

    $.ajax({
      url:'/history/query',
      method:'post',
      success:function(res){
          var res = JSON.parse(res);
          var data = res.data;
          historyList = data;
          createHistory(historyList)
      }

    });

    $.ajax({
      url:'/history/getDeviceByType',
      data:{
        type:'05'
      },
      method:'post',
      success:function(res){
          var res = JSON.parse(res);
          var data = res.data;
          for(var i=0;i<data.length;i++){
            var option = $('<option></option>');
            option.val(data[i].deviceId);
            option.text(data[i].devicename);
            option.appendTo($('#device_query'));
          }
          for(var i=0;i<data.length;i++){
            var option = $('<option></option>');
            option.val(data[i].deviceId);
            option.text(data[i].devicename);
            option.appendTo($('#device_list_query'));
          }
      }

    });

    $('#device_type_query').on('change',function(){
      if(menuIndex == 1){

        $.ajax({
          url:'/history/getDeviceByType',
          data:{
            type:$(this).val()
          },
          method:'post',
          success:function(res){
              var res = JSON.parse(res);
              var data = res.data;
              $('#device_list_query').html('');
              for(var i=0;i<data.length;i++){
                var option = $('<option></option>');
                option.val(data[i].deviceId);
                option.text(data[i].devicename);
                option.appendTo($('#device_list_query'));
              }
          }

        });
      }
    });

    getChart(new Date().getTime(),new Date().getTime(),'05');

    function getChart(start,end,type,id){
      oChart.showLoading();
      $.ajax({
        url:'/history/queryGas',
        data:{
          deviceType: type,
          deviceId: id || '',
          startTime: start,
          endTime: end
        },
        method:'post',
        success:function(res){
          var res = JSON.parse(res);
          var data = res.data;

          var xText = [];
          gasData = [];
          batteryData = [];
          for(var i=0;i<data.length;i++){
              gasData.push(data[i].pressurestate || 0);
              batteryData.push(data[i].Batterystate || 0);
              xText.push(data[i].write_dt);
          }
          if(menuIndex == 0){
            option.series[0].data = gasData;
          }

          if(menuIndex == 1){
              option.series[0].data = batteryData;
          }

          option.xAxis[0].data = xText;
          oChart.hideLoading();
          oChart.setOption(option);
        }
      });
    }

    $.ajax({
      url:'/history/queryAlarm',
      method:'post',
      success:function(res){
        var data = JSON.parse(res).data;
        alarmData = data;
      }
    });


    function createHistory(data){
      $('.tb table tbody tr').remove();
      data = sort(data);
      for(var i=0;i<data.length;i++){
        var tr = document.createElement('tr');
        var tml = `<td><input type="checkbox" deviceid="${data[i].deviceId}" value="${data[i].operate_dt || data[i].write_dt}"/>${data[i].devicename}</td>
                   <td>${data[i].deviceId}</td>
                   <td>${deviceType[data[i].deviceType]}</td>
                   <td>${menuIndex==2?data[i].userid:warnType[data[i].alert_reasons] || '设备异常'}</td>
                   <td>${data[i].operate_dt || data[i].write_dt}</td>`;
        tr.innerHTML = tml;
        $(tr).appendTo($('.tb table.tbody tbody'));
      }
      var max =  $('.tb table.tbody input').length;
      $('.tb table.tbody input').on('click',function(){
        var checkedLength = 0;
        removeItemArr = [];
        removeItems = [];
        $('.tb table.tbody input').each(function(){
          if($(this).prop('checked')){
            checkedLength+=1;
            var id = $(this).val();
            var deviceid = $(this).attr('deviceid');
            var name = $(this).parent().text();
            removeItemArr.push({name:name,id:id,deviceid:deviceid});
            removeItems.push($(this));
          }
        });

        if(checkedLength == max){
          allCheck.prop('checked',true)
        }else{
          allCheck.prop('checked',false)
        }
      });

    }

    function sort(data){
      var result = data.sort(function(a,b){
        var time1 = new Date(a.operate_dt || a.write_dt).getTime();
        var time2 = new Date(b.operate_dt || b.write_dt).getTime();
        return time2 - time1;
      });
      return result;
    }

    function queryData(data,query){
      var timeQuery = [];
      var typeQuery = [];
      var userQuery = [];
      var alarmQuery = [];
      if(query.time){

        for(var i=0;i<data.length;i++){
          var querytime = data[i].write_dt || data[i].operate_dt;
          var time = new Date(querytime).getTime();
          if(time >= query.time.start && time <= query.time.end){
              timeQuery.push(data[i]);
          }
        }

        for(var i=0;i<timeQuery.length;i++){

          if(timeQuery[i].deviceType == query.type){
            typeQuery.push(timeQuery[i])
          }
        }


      }else{

        for(var i=0;i<data.length;i++){
          if(data[i].deviceType == query.type){
            typeQuery.push(data[i])
          }
        }

      }

      for(var i=0;i<typeQuery.length;i++){
        if(typeQuery[i].userid == query.user && typeQuery[i].userid){
          userQuery.push(typeQuery[i])
        }
      }


      if(query.user){
          createHistory(userQuery);
      }else{

          createHistory(typeQuery);

      }


    }

    !function(){
        laydate.skin('molv');
    }();

    var startTime = '',
        endTime = '';

    var start = {
        elem: '#start',
        format: 'YYYY-MM-DD hh:mm:ss',
        max: '2099-06-16',
        istime: true,
        istoday: true,
        choose: function(datas){
            if(datas = 'today'){
              datas = document.getElementById('start').value;;
            }
            end.min = datas;
            end.start = datas;
            startTime = datas;
        },
        clear:function(){
          startTime = '';
          endTime = '';
        }
    };
    var end = {
        elem: '#end',
        format: 'YYYY-MM-DD hh:mm:ss',
        max: '2099-06-16',
        istime: true,
        istoday: true,
        choose: function(datas){
            if(datas = 'today'){
              endTime = document.getElementById('end').value;
            }else{
              endTime = datas;
            }

        },
        clear:function(){
          startTime = '';
          endTime = '';
        }
    };
    laydate(start);
    laydate(end);

    $('.remove-btn').on('click',function(){
      var data = {data:JSON.stringify(removeItemArr)};
      if(menuIndex == 2){
        $.ajax({
          url:'/history/delete',
          method:'post',
          data:data,
          success:function(res){
            $(removeItemArr).each(function(i){
              removeItems[i].parent().parent().remove();
            });
            var res = JSON.parse(res);
            var data = res.data;
            historyList = data;
          }
        });
      }else{
        $.ajax({
          url:'/history/deleteAlarm',
          method:'post',
          data:data,
          success:function(res){
            $(removeItemArr).each(function(i){
              removeItems[i].parent().parent().remove();
            });
            var res = JSON.parse(res);
            var data = res.data;
            alarmData = data;
          }
        });
      }


    });

    $('.search-btn').on('click',function(){

      switch(menuIndex){
          case 0:

            var id = $('#device_query').val();
            getChart(startTime,endTime,'05',id)
            break;
          case 1:
            var type = $('#device_type_query').val();
            var id = $('#device_list_query').val();
            getChart(startTime,endTime,type,id)
            break;
          case 2:

            var deviceType = $('#device_type_query').val();
            var userType = $('#operate_user').val();

            if(startTime !== '' && endTime !== ''){

              var start = new Date(startTime).getTime();
              var end = new Date(endTime).getTime();

              queryData(historyList,{
                  time:{
                    start:start,
                    end:end
                  },
                  type:deviceType,
                  user:userType
              });

            }else{
              queryData(historyList,{
                  type:deviceType,
                  user:userType
              });
            }

            break;
          case 3:
            var deviceType = $('#device_type_query').val();
            //var alarmType = $('#device_alarm_type_query').val();

            if(startTime !== '' && endTime !== ''){

              var start = new Date(startTime).getTime();
              var end = new Date(endTime).getTime();

              queryData(alarmData,{
                  time:{
                    start:start,
                    end:end
                  },
                  type:deviceType
              });

            }else{
              queryData(alarmData,{
                  type:deviceType,
              });
            }
            break;
      }
    });

    $('.close').on('click',function(){
      location.hash = JSON.stringify({closeWindow:true});
    });

    var isPrint = true;
    $('#print').on('click',function(){
      if(isPrint){
        isPrint = false;
        var oIframe = $('#iframe');
        var tml = '';
        if(menuIndex == 0 || menuIndex == 1){
           var oldCanvas = oIframe[0].contentWindow.document.body.getElementsByTagName('canvas')[0];

           if(oldCanvas){
             oIframe[0].contentWindow.document.body.removeChild(oldCanvas);
           }

           var canvas = $('.tb canvas');
           var image = new Image();
  	       image.src = canvas[0].toDataURL("image/png");
           var newCanvas = $('<canvas></canvas>');
           newCanvas.attr({
             height:canvas.attr('height'),
             width:canvas.attr('width')
           });
           oIframe[0].contentWindow.document.body.appendChild(newCanvas[0]);
           var printChart = echarts.init(newCanvas[0]);
           printChart.setOption(option);
        }else{
          tml = $('.tb').eq(1).html();
          oIframe[0].contentWindow.document.body.innerHTML =  tml;
        }

        setTimeout(function(){
          oIframe[0].contentWindow.print();
          isPrint = true;
        },1200);
      }
    });
