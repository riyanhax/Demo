App.SwitchSceneController = function() {
    const { ipcRenderer } = require('electron')
    let screen_type = location.search.substr(1);
    var loopObj = null;
    location.hash = screen_type;
    setTimeout(() => {
        switch (screen_type) {
            case 'airport':
                App.AirportScene.show();
                break;
            case 'section':
                App.ControlAreaScene.show();
                break;
            case 'airroute':
                App.AirportRouteStatusScene.show()
                break;
        }

    }, 0);
    function hideLastScene(){
        if(screen_type == 'airport'){
            var lastScene = location.hash.substr(1);
            switch(lastScene){
                case 'airport':
                    App.AirportScene.hide();
                    break;
                case 'device':
                    App.AirrouteScene.hide();
                    break;
                case 'weather':
                    App.AirportScene.hide();
                    break;
                case 'section':
                    App.ControlAreaScene.hide();
                    break;
                case 'airroute':
                    App.AirportRouteStatusScene.hide();
                    break;
            }
        }
    }
    var socket = new WebSocket('ws://127.0.0.1:8888');
    socket.onopen = function() {
        socket.onmessage = function(msg) {

            var data = JSON.parse(msg.data);
            var key = data.main;

            switch (key) {

                // 切换机场
                case 'airport':
                    hideLastScene();
                    if(screen_type != 'airport') return
                    App.AirportScene.show();
                    $('.operationSituation').trigger('click');
                    location.hash = 'airport';
                    break;
                case 'weather_type':
                    var flag = !!(data.value*1)
                    window.setWeatherLevel(data.selected[0]*1,flag);
                    break;

                    // 机场类型切换
                case 'airport_type':
                    $('.airportRightLegend .checkbox').eq(data.selected[0]*1).trigger('click')
                    break;

                    // 设备设施切换
                case 'device':
                    hideLastScene();
                    if(screen_type != 'airport') return
                    App.AirrouteScene.show();
                    location.hash = 'device';
                    break;

                    // 扇区显示切换
                case 'controlarea':
                    if(screen_type != 'airport') return
                    if(data.value != 'middle') return
                    hideLastScene();
                    App.ControlAreaScene.show();
                    location.hash = 'section';
                    break;

                    // 扇区显示切换
                case 'controlarea_open':
                    window.ctrlareashow(data.value.type, data.selected);
                    break;

                    // 欢迎词开启
                case 'welcome_on':
                    ipcRenderer.send('operation', 'welcome_on')
                    break;

                    // 欢迎词关闭
                case 'welcome_off':
                    ipcRenderer.send('operation', 'welcome_off')
                    break;


                    // 宣传片开启
                case 'video_on':
                    ipcRenderer.send('operation', 'video_on')
                    break;

                    // 宣传片关闭
                case 'video_off':
                    ipcRenderer.send('operation', 'video_off')
                    break;

                    // 大屏幕开启
                case 'largeScreen_on':
                    ipcRenderer.send('operation', 'largeScreen_on')
                    break;

                    // 大屏缪关闭
                case 'largeScreen_off':
                    ipcRenderer.send('operation', 'largeScreen_off')
                    break;

                    //设备 打开
                case 'device_open':
                    window.showDeviceByControl(data.selected);
                    break;
                case 'airroute':
                      
                      if(data.selected[0] == 'ABGRLMNPWYV'){
                        $('.routecontrol span:eq(0)').trigger('click')
                      }
                      if(data.selected[0] == 'HZJX'){
                        $('.routecontrol span:eq(1)').trigger('click')
                      }
                      if(screen_type != 'airport') return
                      if(data.value != 'middle') return
                      hideLastScene();
                      App.AirportRouteStatusScene.show();
                      location.hash = 'airroute';
                      break;
                    //机场显示 打开
                case 'airport_open':
                    window.showAirportInfo(data.selected[0])
                    break;

                    //机场显示 关闭
                case 'airport_close':
                    window.hideAirportInfo();
                    break;

                    // 天气切换
                case 'weather':
                    hideLastScene();
                    if(screen_type != 'airport') return
                    App.AirportScene.show();
                    location.hash = 'weather';
                    $('.meteorologicalInfor').trigger('click');
                    break;

                    // 关舱门等待时间切换
                case 'time_set':
                    window.setCloseTime(data.value);
                    break;

                    // 机场默认显示切换
                case 'switch_default':
                    window.switchDefaultDisplay(data.value);
                    break;
                case 'loop_screen_begin':
                      if(screen_type != 'airport') return
                      var loopNum = 0;
                      var hashType = ['airport','section','airroute'];
                      var switchSceneType = ['AirportScene','ControlAreaScene','AirportRouteStatusScene'];
                      clearInterval(loopObj)
                      loopObj = setInterval(function(){
                        loopNum++;
                        if(loopNum == 3){
                          loopNum = 0;
                        }
                        var lastLoopNum = hashType.indexOf(location.hash.substr(1));

                        App[switchSceneType[lastLoopNum]].hide();
                        App[switchSceneType[loopNum]].show();
                        location.hash = hashType[loopNum];
                      },data.value*60000);
                    break;
                case 'loop_screen_end':
                      console.log('Loop end......')
                      clearInterval(loopObj)
                    break;
                case 'section_airport_show_all':
                    if(screen_type != 'airport') return
                    window.sectionAirportShowAll(data.value);
                    break;


            }
        }
    }
}
