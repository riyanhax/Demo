var time_set_index = 2;
var isShowAll = '';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync') 
App.AirportOperSituAndMeteoInfoScene = function() {
  var _this = this;

  var isShowDefaiultAirport = true;

  var capitalsPos = [
    [114.696944444444, 38.2805555555556],
    [123.483333333333, 41.64],
    [125.686944444444, 43.9975],
    [126.25, 45.6233333333333],
    [118.861944444444, 31.7419444444444],
    [120.434166666667, 30.2294444444444],
    [116.976666666667, 31.9883333333333],
    [119.663333333333, 25.9347222222222],
    [115.901388888889, 28.8622222222222],
    [117.215833333333, 36.8572222222222],
    [113.841111111111, 34.5191666666667],
    [113.219722222222, 28.1888888888889],
    [114.208055555556, 30.7836111111111],
    [103.946944444444, 30.5783333333333],
    [106.801111111111, 26.5380555555556],
    [102.942777777778, 25.1036111111111],
    [108.751944444444, 34.4469444444444],
    [103.620833333333, 36.5133333333333],
    [121.216666666667, 25.0833333333333],
    [111.824444444444, 40.8494444444444],
    [108.172222222222, 22.6083333333333],
    [90.9122222222222, 29.2980555555556],
    [106.392222222222, 38.3211111111111],
    [87.4741666666667, 43.9072222222222],
    [106.641388888889, 29.7188888888889],
    [102.043055555556, 36.5275],
    [113.911666666667, 22.31],
    [113.591666666667, 22.15],
    [110.458888888889, 19.9347222222222],
    [119.663333333333, 25.9347222222222],
    [113.309722222222, 23.3922222222222],
    [116.597222222222, 40.0722222222222],
    [121.7925, 31.1441666666667]
  ];
  var intervalTime = 60000;
  var globalcoord = [103.4556700000, 35.8329260000, 6200000];
  var timeType = [
    '(30分钟以上)',
    '(1小时以上)',
    '(2小时以上)'
  ];
  var strType = [
    'cld30FlightsCount',
    'cld60FlightsCount',
    'cld120FlightsCount'
  ];
  var leftMenuItemsList = [];
  var leftMenuInfoList = [];
  var airportPositionInfo = {};
  var body = $("#uiContainer");
  var timer = null;
  var ondutyperson = App.Preload.assets.ondutypeople[0];
  var airportinfo = App.Preload.assets.airportinfo[0];
  var airport = App.Preload.assets.airport;
  var weatherlevelType = [1,1,1,1];

  initLeftMenuList(airportinfo)
  initDutyInfo(ondutyperson.onDutyPerson)

  /**
   * switch scene button
   */
  var scene = $('<div></div>');
  scene.addClass('airportSwitchScene');
  var osBt = $('<div></div>');
  osBt.addClass('operationSituation');
  var miBt = $('<div></div>');
  miBt.addClass('meteorologicalInfor');
  var infoLayer = $('.airport_info_layer');

  osBt.click(function() {
    hideMeteoInfoScene();
    showAirportOperScene();
  });

  miBt.click(function() {
    hideAirportOperScene();
    showMeteoInfoScene();
  });
  osBt.appendTo(scene);
  miBt.appendTo(scene);
  scene.appendTo(body);
  var mark = $('<span></span>');
  mark.addClass('airportmark');
  mark.appendTo($('.airport_info_layer'));


  //左侧信息显示栏
  var leftMenu = $('<div></div>');
  leftMenu.addClass('airportLeftMenu');
  leftMenu.appendTo(body);

  //右下角图例
  var rightlegend = $('<div></div>');
  rightlegend.addClass('airportRightLegend');
  for (var i = 0; i < 4; i++) {
    var checkbox0 = $("<div></div>");
    checkbox0.addClass('checkbox');
    checkbox0.data("show", true);
    checkbox0.data("level", (i + 1));

    var top = 20 - i + "px";
    if (i == 0) {
      checkbox0.css("margin-top", "130px");
    } else {
      checkbox0.css("margin-top", top);
    }
    checkbox0.appendTo(rightlegend);
  }
  rightlegend.appendTo(body);


  $(window).resize(function() {
    var ty = $(window).height() * 0.5 - 50;
    ty = ty < 100 ? 100 : ty;
    scene.css("top", ty);

    var tty = $(window).height() * 0.5 + 50;
    tty = tty < 230 ? 230 : tty;
    rightlegend.css("top", tty);
  });
  $(window).trigger("resize");

  this.flag = false;
  this.show = function() {
    if (!this.flag) {
      initAirportSceneIcon();
      showAirportOperScene();
      initRightLegend();
      if (isShowDefaiultAirport) {
        setDefaultAirportOperIcon();
      }
      initCapitals();
      // showAirportInfo('ZJYX');
      var mdrsLists = JSON.parse(ondutyperson.mdrsList);
      if (mdrsLists.length > 0) {

        var noticeInfo = '';
        for (var i = 0; i < mdrsLists.length; i++) {
          var mdrsList = mdrsLists[i];
          noticeInfo += '<p style="margin:0">大面积航班延误信息： ' + mdrsList.region + '因' + mdrsList.alarmreason + '于' + clacTime(mdrsList.validperiodbegin) + ' ~ ' + clacTime(mdrsList.validperiodend) + '启动' + transAlarmType(mdrsList.alarmLevel) + mdrsList.alarmtype + ', 通行能力' + mdrsList.trafficcapacity + '</p> ';
        }
        $('.notice .content').html(noticeInfo);
        showNotice();
      } else {
        $('.notice').hide();
      }
      this.flag = true;
    }
  }.bind(this);

  window.sectionAirportShowAll = function(type){
    isShowAll = type;
    if(type){
      window.sectionAndAirportShow(type,[]);
    }else{
      window.sectionHide();
    }
    
  }

  function clacTime(str) {
    var time = str.substr(-4);
    return time.substr(0, 2) + ':' + time.substr(-2);
  }

  function transAlarmType(str) {
    var type = '橙色';
    if (str == 'YELLOW') {
      type = '黄色';
    } else if (str == 'RED') {
      type = '红色';
    }
    return type;
  }

  this.hide = function() {
    this.flag = false;
    clearInterval(this.timeindex);
    hideAirportOperScene();
    hideAirportInfo();
    hideMeteoInfoScene();
    deleteAirportSceneIcon();
    for (var i = 0; i < 4; i++) {
      var checkbox0 = $(".checkbox").eq(i);
      checkbox0.css("background-image", "");
    }
  }.bind(this)

  this.update = function(list) {
    for (var i = 0; i < leftMenuItemsList.length; i++) {
      leftMenuItemsList[i].update(list[i]);
    }

  }

  //初始化城市
  function initCapitals() {
    for (var i = 0; i < capitalsPos.length; i++) {
      var pos = capitalsPos[i];
      App.viewer.entities.add({
        name: 'capitalsPos',
        position: new Cesium.Cartesian3.fromDegrees(pos[0], pos[1], 9000),
        point: {
          color: Cesium.Color.fromBytes(25, 145, 255, 255), //Cesium.Color.RED,
          pixelSize: 4,
          show: true
        }
      })
    }
  }

  //init airport and meteinfo icon on map
  function initAirportSceneIcon() {
    for (var i = 0; i < airport.length; i++) {
      var apName = airport[i].apName;
      var level = parseInt(airport[i].airportLevel);
      var size = [12, 20, 16, 14, 12];
      var path = getimgpath(apName);
      var names = ["airport0", "airport1", "airport2", "airport3", "airport4"];

      airportPositionInfo[apName] = {};
      airportPositionInfo[apName].position = [airport[i].lat, airport[i].lng];
      airportPositionInfo[apName].type = airport[i].airportType;
      var position = 10000;
      if (level == 1) {
        position = 50000
      } else if (level == 2) {
        position = 40000
      } else if (level == 3) {
        position = 20000
      } else if (level == 4) {
        position = 15000
      }
      var bFlag = false;
      if (level == 0) {
        bFlag = true;
      }
      App.viewer.entities.add({
        name: names[level],
        apname: apName,
        position: new Cesium.Cartesian3.fromDegrees(airport[i].lng, airport[i].lat, position),
        billboard: {
          image: path,
          show: bFlag,
          width: size[level],
          height: size[level]
        }
      });


      var weather = App.parseData.getWeather(apName);
      if (weather == null || weather == undefined || weather == '') {
        continue;
      }
      var weatherPath = "assets/img/weather/" + weather + ".png";
      App.viewer.entities.add({
        name: "airportWeather",
        level:'weatherLevel-'+level,
        position: Cesium.Cartesian3.fromDegrees(airport[i].lng, airport[i].lat,position),
        billboard: {
          image: weatherPath,
          show: false,
          width: 20,
          height: 20
        }
      });
    }

  }

  //show airport info
  function showAirportInfo(apName) {

    var airport = airportPositionInfo[apName];
    var position = CgsMap.lonLatToPixel(airport.position);
    var l = position[0] - 260;
    var t = position[1] - 130;
    if (position[1] + 215 > window.innerHeight) {
      position[1] = window.innerHeight - 250;
      var lonlat = CgsMap.pixelToLonLat(position);
      App.viewer.camera.flyTo({
        destination: new  Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1], globalcoord[2]),
        duration: 0.5,
        complete: function() {
          showAlert(apName);
          position[0] += 126;
          position[1] += 10;
          showinfo(apName, position[0], position[1]);
          infoLayer.fadeIn(500);
        }
      });
    } else if (t < 0) {
      position[1] = 150;
      var lonlat = CgsMap.pixelToLonLat(position);
      App.viewer.camera.flyTo({
        destination: new  Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1], globalcoord[2]),
        duration: 0.5,
        complete: function() {
          showAlert(apName);
          position[0] += 126;
          position[1] += 10;
          showinfo(apName, position[0], position[1]);
          infoLayer.fadeIn(500);
        }
      });
    } else {
      showAlert(apName);
      position[0] += 200;
      showinfo(apName, position[0], position[1]);
      infoLayer.fadeIn(500);
    }

    function showinfo(apName, x, y) {
      infoLayer.find('.airport').css({
        left: x - 260 + 'px',
        top: y - 130 + 'px'
      }).find('.desc:eq(0)').html('<strong>' + airport.type + '</strong>');

      infoLayer.find('.sorties').css({
        left: x + 15 + 'px',
        top: y - 130 + 'px'
      });

      infoLayer.find('.weather').css({
        left: x - 260 + 'px',
        top: y + 15 + 'px'
      });

      infoLayer.find('.working').css({
        left: x + 15 + 'px',
        top: y + 15 + 'px'
      });
      $('.airport_info_layer').find('.airportmark').show();
      var path = getimgpath(apName);
      $('.airport_info_layer').find('.airportmark').css({
        'background': 'url(' + path + ') center no-repeat',
        'background-size': 'cover',
        'position': 'absolute',
        'width': '40px',
        'height': '40px',
        'left': x - 20,
        'top': y - 20
      });
    }
  }

  function showAlert(apName) {
    var airport = new FileSync(__dirname+'/assets/database/airport.json')
    var airportdb = low(airport)
    var airportdata = airportdb.get('data').filter({apName: apName}).value();
    $('.airport .desc:eq(1) strong').text(airportdata.depCapacity);    

    var airportdynamic = new FileSync(__dirname+'/assets/database/airportdynamic.json')
    var airportdynamicdb = low(airportdynamic)
    var data = airportdynamicdb.get('data').filter({apName: apName}).value();
    var res = JSON.parse(data[0].currencyStasticsResult);
    var res2 = JSON.parse(data[0].countStasticsResult);
    var key = parseTime();
    var timeData = res2.executeDepFlihgtsCount;
    $('.airport_info_layer .sorties .desc:eq(0) strong').text(timeData);

    var timeData2 = res2.SDepFlihgtsCount;
    $('.airport_info_layer .sorties .desc:eq(1) strong').text(timeData2);

    var timeData3 = res.RDep15;
    $('.airport_info_layer .working .desc:eq(0) strong').text(timeData3);

    var timeData4 = res.depDelayAvgTime15;
    $('.airport_info_layer  .working .desc:eq(1) strong').text(timeData4);

    var timeData5 = res.depTaxiAvgTime15;
    $('.airport_info_layer  .working .desc:eq(2) strong').text(timeData5);

    var timeData6 = res.arrTaxiAvgTime15;
    $('.airport_info_layer  .working .desc:eq(3) strong').text(timeData6);

    var timeData7 = res.RArr15;
    $('.airport_info_layer  .working .desc2 strong').text(timeData7);

    var weather = new FileSync(__dirname+'/assets/database/airport.json')
    var weatherdb = low(airport)
    var weather = weatherdb.get('data').filter({apName: apName}).value();
    var status = {
          DZ: "毛毛雨",
          RA: "雨",
          SN: "雪",
          SG: "米雪",
          IC: "钻石尘",
          PE: "冰粒",
          GR: "冰雹",
          GS: "小冰雹或雪球",
          BR: "轻雾",
          FG: "雾",
          FU: "烟",
          VA: "火山灰",
          DU: "浮尘",
          SA: "沙",
          HZ: "霾",
          PO: "发展好的沙卷/尘卷",
          SQ: "飑",
          FC: "漏斗云，海陆龙卷",
          SS: "沙暴",
          DS: "尘暴"
      }
    $('.airport_info_layer .weather .desc:eq(0) strong').text(status[weather.weatherStatus])
    $('.airport_info_layer .weather .desc:eq(1) strong').text(weather.HVisibility)
    $('.airport_info_layer .weather .desc:eq(2) strong').text(weather.windSpeed)
  }

  function hideAirportInfo() {
    infoLayer.fadeOut(500);
    $('.airport_info_layer').find('.airportmark').hide();
    globalcoord = [103.4556700000, 35.8329260000, 6200000];
    App.viewer.camera.flyTo({
      destination: new  Cesium.Cartesian3.fromDegrees(103.4556700000, 35.8329260000, 6200000)
    });
  }
  window.showAirportInfo = showAirportInfo;
  window.hideAirportInfo = hideAirportInfo;

  // set visibile about airport
  function setVisibileAirportOperIcon(flag) {
    var entities = App.viewer.entities.values;
    var list = [];
    for (var i = 0; i < entities.length; i++) {
      var name = entities[i].name;
      var id = entities[i].id;
      if (name == "airport1" || name == "airport2" || name == "airport3" || name == "airport4" || name == "airport0") {
        list.push(id);
      }
      if (name == 'capitalsPos' && flag) {
        list.push(id);
      }
    }
    for (var i = 0; i < list.length; i++) {
      var entity = App.viewer.entities.getById(list[i]);
      (entity.billboard || entity.point)['show'] = flag;
    }
    list = [];
  }

  // set visibile airport by level
  function setVisibileAirportOperIconByLevel(level, flag) {
    var entities = App.viewer.entities.values;
    var apName = "airport" + level;
    var list = [];
    for (var i = 0; i < entities.length; i++) {
      var name = entities[i].name;

      if (name == apName || name == 'airport0') {
        var id = entities[i].id;
        list.push(id);
      }
      if (name == "capitalsPos" && flag) {
        list.push(id);
      }
    }
    for (var i = 0; i < list.length; i++) {
      var entity = App.viewer.entities.getById(list[i]);
      (entity.billboard || entity.point)['show'] = flag;
    }
    list = [];
  }

  // set visibile about airport weather
  function setVisibileAirportWeather(flag) {
    var entities = App.viewer.entities.values;
    var apName = "airportWeather";
    var list = [];
    for (var i = 0; i < entities.length; i++) {
      var name = entities[i].name;

      if (name == apName) {
        var id = entities[i].id;
        list.push(id);
      }
    }
    for (var i = 0; i < list.length; i++) {
      var entity = App.viewer.entities.getById(list[i]);
      entity.billboard.show = flag;
    }
    list = [];
  }
  
 // set visibile about airport weather
  function setVisibileAirportWeatherByLevel(level,flag) {
    console.log(level,weatherlevelType);
    weatherlevelType[level-1] = flag?1:0;
    var entities = App.viewer.entities.values;
    var apName = "weatherLevel-"+level;
    var list = [];
    for (var i = 0; i < entities.length; i++) {
      var name = entities[i].level;

      if (name == apName) {
        var id = entities[i].id;
        list.push(id);
      }
    }
    for (var i = 0; i < list.length; i++) {
      var entity = App.viewer.entities.getById(list[i]);
      entity.billboard.show = flag;
    }
    list = [];
  }  
  window.setWeatherLevel = setVisibileAirportWeatherByLevel;
  //delete airport and meteinfo icon on map
  function deleteAirportSceneIcon() {
    var entities = App.viewer.entities.values;
    var list = [];
    for (var i = 0; i < entities.length; i++) {
      var id = entities[i].id;
      list.push(id);
    }
    for (var i = 0; i < list.length; i++) {
      var entity = App.viewer.entities.getById(list[i]);
      App.viewer.entities.remove(entity);
    }
    list = [];
  }

  // show airport 0peration scene
  function showAirportOperScene() {
    var airportinfo = App.Preload.assets.airportinfo[0];
    var logo = $(".topLogo").eq(0);
    logo.css("background-image", "url(assets/img/airportLogo.png)");
    $('.title,.date,.airportLeftMenu').show();

    var leftMenu = $('.airportLeftMenu').eq(0);
    leftMenu.css("border-color", "#3d78b7");
    leftMenu.css("border-width", "1px");
    leftMenu.css("border-style", "solid");

    leftMenu.empty();

    var item = new AddFlyInfo(leftMenuInfoList[0]);
    var item0 = new AddInfo("专机计划班次", "", leftMenuInfoList[1]);
    var item1 = new AddInfo("要客计划班次", "", leftMenuInfoList[2]);
    var item2 = new AddInfo("离港计划已执行", "", leftMenuInfoList[3]);
    var item3 = new AddInfo("到港计划已执行", "", leftMenuInfoList[4]);
    var item4 = new AddInfo("起飞延误班次", "", leftMenuInfoList[5]);
    var type = strType[time_set_index];
    var item5 = new AddInfoTimeChange("关舱门后等待班次", timeType[time_set_index], airportinfo[type]);
    var item6 = new AddInfo("计划航班正常率", "", leftMenuInfoList[7]);
    var item7 = new AddInfo("平均延误时间(分钟)", "", leftMenuInfoList[8]);
    item5.update(airportinfo[strType[time_set_index]]);
    leftMenuItemsList = [];
    leftMenuItemsList.push(item);
    leftMenuItemsList.push(item0);
    leftMenuItemsList.push(item1);
    leftMenuItemsList.push(item2);
    leftMenuItemsList.push(item3);
    leftMenuItemsList.push(item4);
    leftMenuItemsList.push(item5);
    leftMenuItemsList.push(item6);
    leftMenuItemsList.push(item7);
    /**
     * AirportOper mainScene
     */
    setVisibileAirportOperIcon(true);

    var osBt = $(".operationSituation").eq(0);
    osBt.css("background-image", "url(assets/img/operationSituation_on.png)");
    var miBt = $(".meteorologicalInfor").eq(0);
    miBt.css("background-image", "url(assets/img/meteorologicalInfor_off.png)");
    var rightlegend = $(".airportRightLegend").eq(0);
    rightlegend.css("background-image", "url(assets/img/airportLegend_on.png)");
    for (var i = 0; i < 4; i++) {
      var checkbox0 = $(".airportRightLegend .checkbox").eq(i);

      var showFlag = checkbox0.data('show');
      var airportLevel = checkbox0.data('level');
      if (showFlag) {
        checkbox0.css("background-image", 'url(assets/img/oper_selected.png)');
      } else {
        checkbox0.css("background-image", 'url(assets/img/oper_unselected.png)');
        setVisibileAirportOperIconByLevel(airportLevel, false);
      }
    }

  }

  function setDefaultAirportOperIcon() {
    var osBt = $(".operationSituation").eq(0);
    osBt.css("background-image", "url(assets/img/operationSituation_on.png)");
    var miBt = $(".meteorologicalInfor").eq(0);
    miBt.css("background-image", "url(assets/img/meteorologicalInfor_off.png)");
    var rightlegend = $(".airportRightLegend").eq(0);
    rightlegend.css("background-image", "url(assets/img/airportLegend_on.png)");
    for (var i = 0; i < 4; i++) {
      var checkbox0 = $(".airportRightLegend .checkbox").eq(i);

      var airportLevel = checkbox0.data('level');
      if (i < 2) {
        checkbox0.css("background-image", 'url(assets/img/oper_selected.png)');
        setVisibileAirportOperIconByLevel(airportLevel, true);
        checkbox0.data('show', true)
      } else {
        checkbox0.css("background-image", 'url(assets/img/oper_unselected.png)');
        setVisibileAirportOperIconByLevel(airportLevel, false);
        checkbox0.data('show', false)
      }
    }

    var capitals = ['ZBSJ', 'ZULS', 'ZLXN', 'ZSOF', 'ZLIC'];
    var entities = App.viewer.entities.values;
    var list = [];
    for (var i = 0; i < entities.length; i++) {
      var name = entities[i].apname;

      if (capitals.indexOf(name) !== -1) {
        var id = entities[i].id;
        list.push(id);
      }
    }
    for (var i = 0; i < list.length; i++) {
      var entity = App.viewer.entities.getById(list[i]);
      entity.billboard.show = true;
    }
    list = [];
  }

  function initRightLegend() {

    for (var i = 0; i < 4; i++) {
      var checkbox0 = $(".airportRightLegend .checkbox").eq(i);

      var showFlag = checkbox0.data('show', true);
      var airportLevel = checkbox0.data('level');
      checkbox0.css("background-image", 'url(assets/img/oper_selected.png)');
      checkbox0.unbind("click");
      checkbox0.bind("click", function(e) {
        isShowDefaiultAirport = false;
        var showFlag = $(this).data('show');
        var airportLevel = $(this).data('level');
        if (showFlag) {
          $(this).css("background-image", 'url(assets/img/oper_unselected.png)');
          setVisibileAirportOperIconByLevel(airportLevel, false);
          $(this).data('show', false)
        } else {
          $(this).css("background-image", 'url(assets/img/oper_selected.png)');
          setVisibileAirportOperIconByLevel(airportLevel, true);
          $(this).data('show', true)
        }
      });
    }
  }

  // hide airport operation scene
  function hideAirportOperScene() {
    var leftMenu = $('.airportLeftMenu').eq(0);
    leftMenu.css("border-style", "none");
    leftMenu.css("background", "");
    leftMenu.empty();
    leftMenu.hide();
    $('.title').hide();

    setVisibileAirportOperIcon(false);


    var osBt = $(".operationSituation").eq(0);
    osBt.css("background-image", "");
    var miBt = $(".meteorologicalInfor").eq(0);
    miBt.css("background-image", "");

    var rightlegend = $(".airportRightLegend").eq(0);
    rightlegend.css("background-image", "");
    for (var i = 0; i < 4; i++) {
      var checkbox0 = $(".checkbox").eq(i);
      var index = parseInt();
      var showFlag = checkbox0.data("show");
      if (showFlag) {
        checkbox0.css("background-image", '');
      } else {
        checkbox0.css("background-image", '');
      }
    }
  }

  //show meteorological infomation scene
  function showMeteoInfoScene() {
    var logo = $(".topLogo").eq(0);
    logo.css("background-image", "url(assets/img/airportLogo.png)");

    var leftMenu = $('.airportLeftMenu').eq(0);
    leftMenu.css("background", "rgba(0,0,0,0) url(assets/img/meteorologicalInfor.png) center center no-repeat");
    leftMenu.show();

    //main scene
    setVisibileAirportWeather(true);

    var osBt = $(".operationSituation").eq(0);
    osBt.css("background-image", "url(assets/img/operationSituation_off.png)");
    var miBt = $(".meteorologicalInfor").eq(0);
    miBt.css("background-image", "url(assets/img/meteorologicalInfor_on.png)");

    var rightlegend = $(".airportRightLegend").eq(0);
    rightlegend.css("background-image", "");

    for(var i in weatherlevelType){
      var flag = !!weatherlevelType[i];
      setVisibileAirportWeatherByLevel(i*1+1,flag);
    }
  }

  //hide 	meteorological infomation scene
  function hideMeteoInfoScene() {
    var leftMenu = $('.airportLeftMenu').eq(0);
    leftMenu.css("background", "");

    //main scene
    setVisibileAirportWeather(false);

    var osBt = $(".operationSituation").eq(0);
    osBt.css("background-image", "");
    var miBt = $(".meteorologicalInfor").eq(0);
    miBt.css("background-image", "");

    var rightlegend = $(".airportRightLegend").eq(0);
    rightlegend.css("background-image", "");
  }



  function AddInfo(text, subtext, num) {
    var leftMenu = $('.airportLeftMenu').eq(0);

    var hline = $("<div class='hline'></div>");
    var leftItem = $("<div class='leftItem'></div>");
    var leftIcon = $("<div class='leftIcon'></div>");
    var middleText = $("<div class='middleText'></div>");
    middleText.text(text);
    var rightNum = $("<div class='rightNum'></div>");
    rightNum.text(num);

    if (subtext == "") {
      leftIcon.appendTo(leftItem);
      middleText.appendTo(leftItem);
      rightNum.appendTo(leftItem);
    } else {
      leftItem.css("height", "70px");
      var addText = $("<div class='middleText'></div>");
      addText.css("width", "220px");
      addText.css("font-size", "21px");
      addText.css("height", "20px");
      addText.css("padding-left", "60px");
      addText.text(subtext);

      leftIcon.appendTo(leftItem);
      middleText.appendTo(leftItem);
      addText.appendTo(leftItem);
      rightNum.appendTo(leftItem);

      this.addText = addText;
    }

    hline.appendTo(leftMenu);
    leftItem.appendTo(leftMenu);

    this.rightNum = rightNum;
    this.update = function(text) {
      this.rightNum.text(text);
    }
  }

  function AddInfoTimeChange(text, subtext, num) {
    var leftMenu = $('.airportLeftMenu').eq(0);

    var hline = $("<div class='hline'></div>");
    var leftItem = $("<div class='leftItem'></div>");
    var leftIcon = $("<div class='leftIcon'></div>");
    var middleText = $("<div class='middleText'></div>");
    middleText.text(text);
    var rightNum = $("<div class='rightNum'></div>");
    rightNum.text(num);


    leftItem.css("height", "70px");
    var addText = $("<div class='middleText'></div>");
    addText.css("width", "380px");
    addText.css("font-size", "21px");
    addText.css("margin-left", "0");
    addText.css("text-align", "center");
    addText.text(subtext);

    middleText.appendTo(leftItem);
    leftIcon.appendTo(leftItem);
    rightNum.appendTo(leftItem);
    addText.appendTo(leftItem);

    this.addText = addText;

    hline.appendTo(leftMenu);
    leftItem.appendTo(leftMenu);

    this.rightNum = rightNum;

    this.update = function(text, time) {
      this.rightNum.text(text);
    }
  }

  function AddFlyInfo(num) {
    var leftMenu = $('.airportLeftMenu').eq(0);

    var leftItem = $("<div class='leftItem'></div>");
    var leftIcon = $("<div class='leftIcon'></div>");
    var middleText = $("<div class='middleText'></div>");
    middleText.text("全国计划飞行班次");
    var rightNum = $("<div class='rightNum'></div>");
    rightNum.text(num[0]);

    leftIcon.appendTo(leftItem);
    middleText.appendTo(leftItem);
    rightNum.appendTo(leftItem);
    leftItem.appendTo(leftMenu);
    this.rightNum = rightNum;

    var leftItem1 = $("<div class='leftItem'></div>");
    var leftText1 = $("<div class='detailed_leftText'></div>");
    leftText1.text("国内航空公司");
    var upText1 = $("<div class='detailed_upText'></div>");
    upText1.css('margin-top', "-10px");
    upText1.text("（国内）");
    var upNum1 = $("<div class='detailed_upNum'></div>");
    upNum1.css('margin-top', "-10px");
    upNum1.text(num[1]);
    var downText1 = $("<div class='detailed_downText'></div>");
    downText1.css('margin-top', "-10px");
    downText1.text("（国际）");
    var downNum1 = $("<div class='detailed_downNum'></div>");
    downNum1.css('margin-top', "-10px");
    downNum1.text(num[2]);

    leftText1.appendTo(leftItem1);
    upText1.appendTo(leftItem1);
    upNum1.appendTo(leftItem1);
    downText1.appendTo(leftItem1);
    downNum1.appendTo(leftItem1);
    leftItem1.appendTo(leftMenu);
    this.upNum1 = upNum1;
    this.downNum1 = downNum1;

    var leftItem2 = $("<div class='leftItem'></div>");
    leftItem2.css("height", "70px");
    leftItem2.css("margin-top", "10px");
    var leftText2 = $("<div class='detailed_leftText'></div>");
    leftText2.text("国外及港澳台航空公司");
    var upText2 = $("<div class='detailed_upText'></div>");
    upText2.css('margin-top', "8px");
    upText2.text("（飞越）");
    var upNum2 = $("<div class='detailed_upNum'></div>");
    upNum2.css('margin-top', "8px");
    upNum2.text(num[3]);
    var downText2 = $("<div class='detailed_downText'></div>");
    downText2.text("（落地）");
    var downNum2 = $("<div class='detailed_downNum'></div>");
    downNum2.text(num[4]);

    leftText2.appendTo(leftItem2);
    upText2.appendTo(leftItem2);
    upNum2.appendTo(leftItem2);
    downText2.appendTo(leftItem2);
    downNum2.appendTo(leftItem2);
    leftItem2.appendTo(leftMenu);
    this.upNum2 = upNum2;
    this.downNum2 = downNum2;

    this.update = function(num1) {
      this.rightNum.text(num1[0]);
      this.upNum1.text(num1[1]);
      this.downNum1.text(num1[2]);
      this.upNum2.text(num1[3]);
      this.downNum2.text(num1[4]);
    }
  }


  window.setCloseTime = function(val) {
    var airportinfo = App.Preload.assets.airportinfo[0];
    $('.airportLeftMenu .leftItem:eq(8) .middleText:eq(1)').text(timeType[val]).parent().find('.rightNum').text(airportinfo[strType[val]]);
    time_set_index = val;
  }

  window.switchDefaultDisplay = function(arg) {
    isShowDefaiultAirport = arg == 'isShow' ? true : false;
    setDefaultAirportOperIcon();
    if (!isShowDefaiultAirport) {
      for (var i = 0; i < 4; i++) {
        var checkbox0 = $(".airportRightLegend .checkbox").eq(i);
        var airportLevel = checkbox0.data('level');
        checkbox0.css("background-image", 'url(assets/img/oper_selected.png)');
        checkbox0.data("show", true);
        setVisibileAirportOperIconByLevel(airportLevel, true);
      }
    }
  }

  //初始化左侧菜单列表
  function initLeftMenuList(airportinfo) {
    leftMenuInfoList = [];
    leftMenuInfoList[0] = [airportinfo.scheduleFlightsCount, airportinfo.nnsFlightsCount, airportinfo.nfsFlightsCount, airportinfo.fosFlightsCount, airportinfo.fasFlightsCount];
    leftMenuInfoList[1] = airportinfo.specialFlightsCount;
    leftMenuInfoList[2] = airportinfo.vipFlightsCount;
    leftMenuInfoList[3] = airportinfo.executeDepFlihgtsCount;
    leftMenuInfoList[4] = airportinfo.executeArrFlihgtsCount;
    leftMenuInfoList[5] = airportinfo.delayFlightsCount;
    leftMenuInfoList[6] = airportinfo.cld30FlightsCount;
    leftMenuInfoList[7] = airportinfo.scheduleOnTimeRate;
    leftMenuInfoList[8] = airportinfo.delayAvgTime;
  }

  //初始化值班人员信息
  function initDutyInfo(dutyperson) {
    var dutyInfo = JSON.parse(dutyperson);
    var str = dutyInfo.dateTime;
    body.find('.date').text(str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6));
    var leader = '';
    if (dutyInfo.atmbLeader) {
      try {
        var leaderArr = dutyInfo.atmbLeader.split(/[\s+|\,|、]/);
        if (leaderArr && leaderArr.length) {
          leader = '值班领导：民航局' + leaderArr[0] + ' 监控中心' + (leaderArr[1] || '')
        }
      } catch (e) {

      }
    }
    body.find('.title').css({
      'overflow': 'inherit',
      'white-space': 'nowrap'
    }).html('<div style="color:#ffd236;font-size:26px;">' + leader + ' 值班大厅' + dutyInfo.omcLeader + '</div>');
  }

  function getmenuinfo(obj) {
    var key = parseTime();
    var timeData = parseTimeData(obj);
    return timeData[key];
  }

  //获取图片路径
  function getimgpath(name) {
    var dynamicNormalRate = App.parseData.getStaMasterLevel(name);
    var path;
    for (var i = 0; i < airport.length; i++) {
      if (name == airport[i].apName) {
        var level = parseInt(airport[i].airportLevel);
        switch (level) {
          case 1:
            path = "assets/img/airport/airport_" + dynamicNormalRate + "_1.png";
            break;
          case 2:
            path = "assets/img/airport/airport_" + dynamicNormalRate + "_2.png";
            break;
          case 3:
            path = "assets/img/airport/airport_" + dynamicNormalRate + "_3.png";
            break;
          case 4:
            path = "assets/img/airport/airport_" + dynamicNormalRate + "_4.png";
            break;
          case 0:
            path = "assets/img/airport/airport_2_4.png";
            break;
        }
        break;
      }
    }
    return path;
  }

  // show notice
  function showNotice() {
    $('.notice').show();
    var num = Math.ceil($('.notice .content').height() / 70);
    var moveUpNum = 0;
    if (num == 1) {
      return;
    }
    clearInterval(timer);
    timer = setInterval(function() {
      moveUpNum++;
      $('.notice .content').animate({
        marginTop: -(moveUpNum % num * 70) + 'px'
      });
    }, 20000);
  }

  function parseTimeData(res) {

    var data = JSON.parse(res);
    var isFirst = true;
    var tmp = {};
    for (var key in data) {
      if (isFirst) {
        tmp['00'] = data[key];
        isFirst = false;
      } else {
        var str = key.substr(-4, 2);
        tmp[str] = data[key];
      }
    }
    return tmp;
  }

  function parseTime() {
    var date = new Date();
    var h = date.getHours();
    return h < 10 ? '0' + h : '' + h;
  }

  function updateOnDutyPeople() {
    var mdrsLists = JSON.parse(App.Preload.assets.ondutypeople[0].mdrsList);
    var airportinfo = App.Preload.assets.airportinfo[0];
    var ondutyperson = App.Preload.assets.ondutypeople[0].onDutyPerson;

    initLeftMenuList(airportinfo);
    initDutyInfo(ondutyperson);

    _this.update(leftMenuInfoList);
    if (mdrsLists.length > 0) {
      var noticeInfo = '';
      for (var i = 0; i < mdrsLists.length; i++) {
        var mdrsList = mdrsLists[i];
        noticeInfo += '<p style="margin:0">大面积航班延误信息： ' + mdrsList.region + '因' + mdrsList.alarmreason + '于' + clacTime(mdrsList.validperiodbegin) + ' ~ ' + clacTime(mdrsList.validperiodend) + '启动' + transAlarmType(mdrsList.alarmLevel) + mdrsList.alarmtype + ', 通行能力' + mdrsList.trafficcapacity + '</p>';
      }
      $('.notice .content').html(noticeInfo);
    } else {
      $('.notice').hide();
    }

  }

}
