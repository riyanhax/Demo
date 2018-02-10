var $ = jQuery;
$(document).ready(function() {
    var isReset = true;
    var saveSectionData = [];
    var sectionArr = [];

    var initScreenNum = {
        leftT: 18,
        leftT1: 39,
        leftB: 12,
        leftB1: 26,
        leftM: 40,
        rightT: 41,
        rightT1: 22,
        rightB: 17,
        rightB1: 29
    };

    var screenNumArr = ['leftT','leftB','leftT1','leftB1','leftM','rightT','rightB','rightT1','rightB1'];

    // 默认socket的IP地址和端口号
    var SOCKET_IP = '192.168.20.151';
    var SOCKET_PORT = '8888';
    // 初始化全局SCOKET对象和信息对象
    var SOCKET = null;
    var SOCKET_MSG = {
        main: ''
    }

    //数据服务器请求位置
    var DATA_SERVER_PATH = {
        "get_welcomewords": "/get_welcomewords", //获取欢迎词 get
        "save_welcomewords": "/save_welcomewords", //保存欢迎词 post
        "get_airport": "/get_airport", // 机场搜索
        "get_sectionsearch": "/get_sectionsearch", // 获取扇区数据
        "get-sectionsave": "/get-sectionsave", // 获取默认扇区
        "get-matrix":"/get-matrix"
    };

    // 复制出来一份席位对象用于操作
    var changeSeatNum = $.extend({}, initScreenNum);

    // 获取操作声音对象
    var audio = document.getElementById('audio');

    // 获取选项卡按钮对象
    var aMenu = $('.menu li'),
        oMiddleScreen = $('.middle-screen'),
        onceInitScreenBorder = true;

    // 初始化席位
    initScreenSeat();

    // 初始化席位方法
    function initScreenSeat() {
        var snData = initScreenNum;
        $('.left-screen li:eq(0)').data('num', snData.leftT).find('.corner').text(snData.leftT);
        $('.left-screen li:eq(1)').data('num', snData.leftT1).find('.corner').text(snData.leftT1);
        $('.left-screen li:eq(2)').data('num', snData.leftB).find('.corner').text(snData.leftB);
        $('.left-screen li:eq(3)').data('num', snData.leftB1).find('.corner').text(snData.leftB1);

        $('.middle-screen').data('num', snData.leftM).find('.corner').text(snData.leftM);

        $('.right-screen li:eq(0)').data('num', snData.rightT).find('.corner').text(snData.rightT);
        $('.right-screen li:eq(1)').data('num', snData.rightT1).find('.corner').text(snData.rightT1);
        $('.right-screen li:eq(2)').data('num', snData.rightB).find('.corner').text(snData.rightB);
        $('.right-screen li:eq(3)').data('num', snData.rightB1).find('.corner').text(snData.rightB1);
    }



    // 操作声音
    function soundBtn(e) {
        try {
            audio.currentTime = 0;
        } catch (e) {}

        audio.play();
    }

    // 同步请求方法
    $.ajaxSetup({
        async: false
    });

    // 获取全局配置服务器IP和端口号
    var DATA_SERVER_PORT, DATA_SERVER_IP;
    $.get('/ipconfig.json').done(function(res) {
        var ipconfig = JSON.parse(res);
        DATA_SERVER_IP = ipconfig.ip;
        DATA_SERVER_PORT = ipconfig.port;
    });

    $.get('http://'+DATA_SERVER_IP+':'+DATA_SERVER_PORT+'/get-matrix').done(function(res){
      var data = JSON.parse(res).data;
      for(var i in data){
        if(data[i].type == 'M9ZZ'){
          var seat_num = data[i].output.split('*');
          for(var j in seat_num){
            initScreenNum[screenNumArr[j]] = seat_num[j];
            initScreenSeat();
          }
        }
      }
    });


    // 永久保存设备登录的socket用户名密码
    if (localStorage.getItem('ip') && localStorage.getItem('port')) {
        $('#login_ip').val(localStorage.getItem('ip'));
        $('#login_port').val(localStorage.getItem('port'));
    }

    $('#matrix').on('click touchstart',function(e){
        soundBtn(e);
        $('.alert_layer').removeClass('hide')
    })

    get_data('get-matrix',{},function(res){
        for(var i in res){
            if(res[i].type == 'M9ZZ'){
                $('.dialog .partscreen_model_1').val(res[i].matrix)
                $('.dialog .partscreen_model_2').val(res[i].output)
            }else{
                $('.dialog .fullscreen_model_1').val(res[i].matrix)
                $('.dialog .fullscreen_model_2').val(res[i].output)
            }
        }
    })

    $('.close_box_btn').on('click touchstart',function(){
        $('.alert_layer').addClass('hide');
    })

    $('.confirm_box_btn').on('click touchstart',function(){
        $('.alert_layer').addClass('hide');
        var data = {
            m9zz:{
                matrix:$('.dialog .partscreen_model_1').val(),
                output:$('.dialog .partscreen_model_2').val()
            },
            m3zz:{
                matrix:$('.dialog .fullscreen_model_1').val(),
                output:$('.dialog .fullscreen_model_2').val()
            }
        };

        $.post('http://'+DATA_SERVER_IP+':'+DATA_SERVER_PORT+'/get-matrix',data).done(function(res){
            console.log(res)
        })

    })

    // 运行态势和正常率点击事件
    $('.situation-box button,.rate-box button').on('touchstart click', function(e) {
        soundBtn(e);


        var type = $(this).attr('name');
        var val = $(this).prev().val();
        if (val !== '') {
            getAirport({ search: val }, type);
        } else {
            getAirport({}, type);
        }
        e.preventDefault();
        e.stopPropagation();
    });

    // 运行态势和正常率左侧搜索框点击事件
    $('.situation-box .left-result,.rate-box .left-result').on('touchstart click', 'p', function(e) {
        soundBtn(e)
        $(this).appendTo($(this).parent().next());
        e.preventDefault();
        e.stopPropagation();
    })

    // 运行态势和正常率右侧侧搜索框点击事件
    $('.situation-box .right-result,.rate-box .right-result').on('touchstart click', 'p', function(e) {
        soundBtn(e)
        $(this).remove();
        e.preventDefault();
        e.stopPropagation();
    })

    //运行态势城市
    function getAirport(data, type) {
        get_data('get_airport', data, function(data) {
            $('.' + type + '-box .result .left-result').empty();
            for (var i = 0; i < data.length; i++) {
                $('<p></p>')
                .data({
                    title: data[i].airportName,
                    name: data[i].apName
                })
                .html(
                  '【' + data[i].apName + '】 ' + data[i].airportName
                )
                .appendTo($('.' + type + '-box .left-result'));
            }
        })
    }


    //选中的扇区id数组
    var selected_lowctrlarea_id = [];
    var selected_highctrlarea_id = [];

    var _sectionsearch = {}; //缓存扇区数据

    // 创建扇区城市分类
    get_data('get_sectionsearch', {}, function(data) {
        _sectionsearch = JSON.parse(JSON.stringify(data));

        create_cities('high', function(e) {
            greaCities(high_cities, $('.highctrlarea-list #highctrlarea-form ul'), 'high');
        });

        create_cities('low', function(e) {
            greaCities(low_cities, $('.lowctrlarea-list #lowctrlarea-form ul'), 'low');
        });

    });

    //刷入扇区城市数据
    function create_cities(type, callback) {
        if (type == 'high') {
            high_cities = get_nameArr_1(_sectionsearch['high'], callback);
        }

        if (type == 'low') {
            low_cities = get_nameArr_1(_sectionsearch['low'], callback);
        }
        callback && callback()
    }

    //cities 城市名称数组
    function get_nameArr_1(high_low_arr) {
        var _arr = [];
        var _high_low_arr = high_low_arr || [];
        for (var i in _high_low_arr) {
            _arr.push(_high_low_arr[i]['name']);
        }
        return _arr;
    }

    //获得某一城市下的扇区
    function get_nameArr_2(citiyName, high_low_arr) {
        //high_上海
        var _citiyName = ''; //城市名称
        var _arr = [];
        var _high_low_arr = high_low_arr || [];

        //获得城市名称
        _citiyName = citiyName.split('_')[1];

        for (var i in _high_low_arr) {
            if (_high_low_arr[i]['name'] == _citiyName) {
                _arr = high_low_arr[i]['value'];
                break;
            }
        }
        return _arr;
    }


    //登录页切换
    $('.login .btn button').on('touchstart click', function(e) {
        soundBtn(e);

        // 获取socket的IP地址和端口号
        SOCKET_IP = $('#login_ip').val() || SOCKET_IP;
        SOCKET_PORT = $('#login_port').val() || SOCKET_PORT;

        // 更新欢迎词
        refresh_welcomewords();

        // 初始化连接socket
        initSocket(SOCKET_IP, SOCKET_PORT, function(e) {
            $('.login').addClass('hide');
            $('.system').removeClass('hide');

            // 保存输入的socket的IP地址和端口号以便下次访问
            localStorage.setItem('ip', SOCKET_IP);
            localStorage.setItem('port', SOCKET_PORT);
        });

        e.preventDefault();
        e.stopPropagation();
    });

    function initSocket(IP, PORT, callback) {
        var socket = new WebSocket('ws://' + IP + ':' + PORT);
        socket.onopen = function(e) {
            SOCKET = socket;

            if (callback) {
                callback();
            }
        }

        socket.onmessage = function(msg) {
            console.log(msg.data)
        }
        socket.onclose = function(msg) {
            location.reload();
        }
    }

    //上方选项卡切换 无socket
    aMenu.each(function(i, obj) {
        $(obj).on('touchstart click', function(e) {
            soundBtn(e)
            aMenu.removeClass('active');
            $(this).addClass('active');
            $('.box').hide().eq(i).show();

            //初始化选中屏幕边框
            if (i == 2 && onceInitScreenBorder) {
                onceInitScreenBorder = false;
                $('.screen-border')
                    .css({
                        top: oMiddleScreen.get(0).offsetTop,
                        left: oMiddleScreen.offset().left
                    })
                    .width(oMiddleScreen.width() - 4)
                    .height(oMiddleScreen.height() - 4);
            }
            e.preventDefault();
            e.stopPropagation();
        })
    });

    // 选中大屏的边框移动
    $('.screen li,.screen .middle-screen').on('touchstart click', function(e) {
        soundBtn(e)

        var obj = $(this);
        $('.screen-border')
            .css({
                top: obj.get(0).offsetTop,
                left: obj.offset().left
            })
            .width(obj.width())
            .height(obj.height());

        e.preventDefault();
        e.stopPropagation();
    })


    $('.seat-box ul > li,.seat-box .line4 .wrap div').on('touchstart click', function(e) {
        soundBtn(e)
        $('.seat-box ul > li,.seat-box .line4 .wrap div').removeClass('active');
        $(this).addClass('active');
        $('#screen .selected').data('num', $(this).data('num')).find('span').text($(this).data('num'));
        changeSeatNum[$('#screen .selected').data('selected')] = $(this).data('num');
        e.preventDefault();
        e.stopPropagation();
    });

    //切换
    $('.operation-box div > div').on('touchstart click', function(e) {
        soundBtn(e)
        var key = $(this).find('input').prop('checked', true).val();
        $('.operation-active').removeClass('operation-active');
        $('.' + key + '-box').addClass('operation-active');
        if($(this).find('input').data('middle') == 'middle'){
            SOCKET_MSG.value = 'middle';
        }else{
            SOCKET_MSG.value = '';
        }
        if (SOCKET) {
            SOCKET_MSG.main = key;
            SOCKET_MSG.selected = [];
            SOCKET.send(JSON.stringify(SOCKET_MSG));
        }
        e.preventDefault();
        e.stopPropagation();

    })

    // 循环播放

    var loopNum = 0;
    var loopType = ['airport','ctrlarea','airroute'];
    $('.loop-screen-btn').on('touchstart click',function(e){
      soundBtn(e)
      $('.operation-active').removeClass('operation-active');
      $('.loop-box').addClass('operation-active');
      e.preventDefault();
      e.stopPropagation();
    })

    $('.loop-box input').on('input',function(e){
      soundBtn(e)
      var val = $(this).get(0).value;
      $('.loop-box span:eq(0)').text(val+'分钟');
      e.preventDefault();
      e.stopPropagation();
    })

    $('.loop-box .confirm').on('touchstart click',function(e){
      soundBtn(e);
      var time = $('.loop-box input').get(0).value;
      if(SOCKET){
        socket_send('loop_screen_begin',time,null)
      }
      e.preventDefault();
      e.stopPropagation();
    })

    $('.loop-box .cancel').on('touchstart click',function(e){
      soundBtn(e);
      if(SOCKET){
        socket_send('loop_screen_end',null,'')
      }
      e.preventDefault();
      e.stopPropagation();
    })


    var _high_area = [
        { areaId: true }
    ]
    get_data('get-sectionsave', {}, function(res) {

        saveSectionData = res;
        for (var i = 0; i < res.length; i++) {
            if (res[i]) {
                sectionArr.push(res[i].name)
            }
        }

    })

    //选项卡切换
    $('.controlarea-box .type li').each(function(index) {
        $(this).on('touchstart click', function(e) {
            soundBtn(e)
            $('.controlarea-box .type li').removeClass('active')
            $(this).addClass('active');
            $('.controlarea-box .ctrlarea-list').addClass('hide').eq(index).removeClass('hide');
            e.preventDefault();
            e.stopPropagation();

        })
    });

    //高空区域切换
    $('#highctrlarea-form').on('touchstart click', 'li input', function(e) {

        soundBtn(e)
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this);
        var _id = $this.attr('id');
        var $ul = $('#highctrlarea-shield-form ul');
        $this.parents('ul').find('li input').removeClass('active');
        $this.addClass('active');

        //输入对应数据到 highctrlarea-shield-form
        var _areaObj = get_nameArr_2(_id, _sectionsearch['high']);

        var _html = '';
        var _checked = '';

        // 重新排序扇区数据
        _areaObj.sort(function(obj, obj2) {
            var a = parseInt(obj.name.match(/\d+/)[0]);
            var b = parseInt(obj2.name.match(/\d+/)[0]);
            return a - b;
        })

        for (var i in _areaObj) {
            _checked = null;
            _html += '<li><input type="checkbox" ' + (_checked ? "checked=checked" : "") + ' id=' + _areaObj[i]['value'] + ' value=' + _areaObj[i]['value'] + ' name="controlAreaChecked"><label for=' + _areaObj[i]['value'] + '>' + _areaObj[i]['name'] + '</label></li>';
        }
        $ul.html(_html);

        // 是否重置
        if (isReset) {
            for (var i = 0; i < saveSectionData.length; i++) {
                $('#' + saveSectionData[i].name).attr('checked', true)
            }
        }

        


    });

    //高低空勾选切换
    $('#highctrlarea-shield-form,#lowctrlarea-shield-form').on('change', 'input', function(e) {

        soundBtn(e)
        e.preventDefault();
        e.stopPropagation();

    });

    //低空区域切换
    $('#lowctrlarea-form').on('touchstart click', 'li input', function(e) {

        soundBtn(e)
        var $this = $(this);
        var _id = $this.attr('id');
        var $ul = $('#lowctrlarea-shield-form ul');

        $this.parents('ul').find('li input').removeClass('active');
        $this.addClass('active');

        //输入对应数据到 highctrlarea-shield-form
        var _areaObj = get_nameArr_2(_id, _sectionsearch['low']);
        var _html = '';
        var _checked = '';

        // 重新排除扇区数据
        _areaObj.sort(function(obj, obj2) {
            var a = parseInt(obj.name.match(/\d+/)[0]);
            var b = parseInt(obj2.name.match(/\d+/)[0]);
            return a - b;
        })
        for (var i in _areaObj) {
            _checked = null;
            _html += '<li><input type="checkbox" ' + (_checked ? "checked=checked" : "") + ' id=' + _areaObj[i]['value'] + ' value=' + _areaObj[i]['value'] + ' name="controlAreaChecked_low"><label for=' + _areaObj[i]['value'] + '>' + _areaObj[i]['name'] + '</label></li>';
        }
        $ul.html(_html);
        if (isReset) {
            for (var i = 0; i < saveSectionData.length; i++) {
                $('#' + saveSectionData[i].name).attr('checked', true)
            }
        }
        e.preventDefault();
        e.stopPropagation();

    });

    // 创建扇区城市分类
    function greaCities(list, parent, str) {
        for (var i = 0; i < list.length; i++) {

            var tml = '<input class="button_style_1" type="button" name="beijing" id="' + str + '_' + list[i] + '" value="' + list[i] + '">';
            var oLi = $('<li id="' + str + '_' + list[i] + '"></li>');
            oLi.html(tml);
            oLi.appendTo(parent);
        }
    }

    //socket部分
    //全屏模式
    $('#fullscreen').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('fullscreen_mode');
        e.preventDefault();
        e.stopPropagation();
    });

    //分屏模式
    $('#partscreen').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('partscreen_mode');
        $('#bigScreen_cancel').trigger('click')
        e.preventDefault();
        e.stopPropagation();

    });

    //欢迎词 开启
    $('#welcome_on').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('fullscreen_mode')
        socket_send('welcome_on');
        e.preventDefault();
        e.stopPropagation();

    });

    //欢迎词 关闭
    $('#welcome_off').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('welcome_off');
        socket_send('partscreen_mode')
        e.preventDefault();
        e.stopPropagation();

    });

    //欢迎词 样式一
    $('#welcomeStyle_1').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('welcomeStyle_1');
        $('.welcome .style-box>div').removeClass('selected');
        $(this).addClass('selected');
        e.preventDefault();
        e.stopPropagation();

    });

    //欢迎词 样式二
    $('#welcomeStyle_2').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('welcomeStyle_2');
        $('.welcome .style-box>div').removeClass('selected');
        $(this).addClass('selected');
        e.preventDefault();
        e.stopPropagation();

    });

    //欢迎词确认
    $('#welcomeText_confirm').on('touchstart click', function(e) {
        soundBtn(e)
        var _text = $('#welcome_text').val();
        socket_send('welcomeText_confirm', _text);
        e.preventDefault();
        e.stopPropagation();

    });

    //欢迎词存储
    $('#welcomeText_save').on('touchstart click', function(e) {
        soundBtn(e)
        var _data = {};
        _data['style'] = $('.welcome .style-box>div').index($('.welcome .style-box .selected'));
        _data['content'] = $('#welcome_text').val();
        post_data('save_welcomewords', _data);
        e.preventDefault();
        e.stopPropagation();

    });


    //宣传片 开启
    $('#video_on').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('fullscreen_mode')
        socket_send('video_on');
        e.preventDefault();
        e.stopPropagation();

    });

    //宣传片 关闭
    $('#video_off').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('video_off');
        socket_send('partscreen_mode')
        e.preventDefault();
        e.stopPropagation();

    });

    //宣传片 播放
    $('#video_play').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('video_play');
        e.preventDefault();
        e.stopPropagation();

    });

    //宣传片 暂停
    $('#video_pause').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('video_pause');
        e.preventDefault();
        e.stopPropagation();

    });

    // 宣传片 音量
    $('#video_volume').on('input', function(e) {
        var _temp = $(this).val();
        socket_send('video_volume', _temp);

    });

    //大屏幕 开启
    $('#largeScreen_on').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('largeScreen_on');
        e.preventDefault();
        e.stopPropagation();

    });

    //大屏幕 关闭
    $('#largeScreen_off').on('touchstart click', function(e) {
        soundBtn(e)
        socket_send('largeScreen_off');
        e.preventDefault();
        e.stopPropagation();

    });

    //主屏切换控制 确认
    $('#bigScreen_confirm').on('touchstart click', function(e) {
        soundBtn(e);
        var _data = {};
        var _screen_select = $('.screen_select.selected').attr('data-num') || null;
        var _seat_select = $('.seat_select.selected').attr('data-num') || null;
        $('.section-screen-control').addClass('hide');
        $('.rate-screen-control').addClass('hide');

        if($('.seat-box .selected').length > 0){
            $('#screen .selected').data('num', $('.seat-box .selected').data('num')).find('span').text($('.seat-box .selected').data('num'));
        }
        
        if(_seat_select == 49){
            $('.screen_select.selected .operation-box .rate-screen-control').removeClass('hide');
        }

        if(_seat_select == 50){
            $('.screen_select.selected .operation-box  .section-screen-control').removeClass('hide');
        }

        if (_screen_select && _seat_select) {
            socket_send('seat_mode', _seat_select + '*' + _screen_select + '!');
        }

        e.preventDefault();
        e.stopPropagation();


    });

    // 屏幕选择
    $('.screen_select').on('touchstart click', function(e) {
        soundBtn(e)
        var $this = $(this);
        $('.screen_select').removeClass('selected');
        $this.addClass('selected');
        e.preventDefault();
        e.stopPropagation();

    });

    // 席位选择
    $('.seat_select').on('touchstart click', function(e) {
        soundBtn(e)
        var $this = $(this);
        $('.seat_select').removeClass('selected');
        $this.addClass('selected');
        e.preventDefault();
        e.stopPropagation();

    });

    // 主屏切换控制 取消
    $('#bigScreen_cancel').on('touchstart click', function(e) {
        soundBtn(e);
        $('.rate-screen-control').addClass('hide');
        $('.seat-box .active').removeClass('active');
        $('.seat-box .selected').removeClass('selected');
        initScreenSeat()
        e.preventDefault();
        e.stopPropagation();

    });

    //机场>机场分类显示
    $('.airport-box .type ul li').on('touchstart click', function(e) {
        soundBtn(e)
        var $this = $(this);
        var _selected = [];
        $this.toggleClass('active');

        _selected.push($this.attr('data-index'))

        $('#showDefault').removeClass('active')
        if (SOCKET) {
            socket_send('airport_type', null, _selected)
        }
        e.preventDefault();
        e.stopPropagation();

    })

    // 天气分类显示
    $('.weather-box .type ul li').on('touchstart click', function(e) {
        soundBtn(e)
        var $this = $(this);
        var _selected = [];
        $this.toggleClass('active');
        var val = $this.hasClass('active')?'1':'0';
        _selected.push($this.attr('data-index'))
        if (SOCKET) {
            socket_send('weather_type', val, _selected)
        }
        e.preventDefault();
        e.stopPropagation();

    })    


    //机场显示默认
    $('#showDefault').on('touchstart click', function(e) {
        soundBtn(e);
        $(this).toggleClass('active');
        var isShow = $(this).hasClass('active');
        $('.airport-box .type ul li').each(function(index) {
            $(this).addClass('active')
            if (index > 1 && isShow) {
                $(this).removeClass('active')
            }
        })
        if (SOCKET) {
            var value = isShow ? 'isShow' : 'isHide';
            socket_send('switch_default', value, [])
        }
        e.preventDefault();
        e.stopPropagation();
    })

    //显示和隐藏专机要客
    $('.hide_some_info').on('touchstart click',function(e){
        var checked = $(this).children().get(1).checked;
        $(this).children().get(1).checked = !checked;
        $(this).children().eq(0).text(checked?'隐藏专机要客':'显示专机要客')
        if (SOCKET) {
            var value = !checked ? 'isHide' : 'isShow';
            socket_send('switch_some_info', value, [])
        }
        e.stopPropagation();
        e.preventDefault();
    })

    // 显示机场和扇区
    var show_status = [{
        status:'打开高空扇区',
        value:'high'
    },{
        status:'打开低空扇区',
        value:'low'
    },{
        status:'关闭扇区',
        value:''
    }];
    var statusNum = 0;
    $('.show_all_btn').on('touchstart click',function(e){
        soundBtn(e);
        if (SOCKET) {
            socket_send('section_airport_show_all', show_status[statusNum].value, []);
            statusNum++;
            statusNum%=3;
            $(this).text(show_status[statusNum].status);
        }
        e.preventDefault();
        e.stopPropagation();
    })

    //关舱门等待时间：
    $("#time_set").on('change', function(e) {
        soundBtn(e)

        if (SOCKET) {
            socket_send('time_set', $(this).val());
        }
    })

    //机场搜索
    $('.airroute-box .type ul li').on('touchstart click', function(e) {
        soundBtn(e);
        var $this = $(this);
        var _selected = [];

        if ($this.hasClass('active')) {
            $this.removeClass('active');
        } else {
            $this.addClass('active');
        }
        _selected.push($this.attr('data-index'))
        if (SOCKET) {
            socket_send('airroute', null, _selected)
        }
        e.preventDefault();
        e.stopPropagation();

    })

    //设备交互
    $('.device-box .type ul li').on('touchstart click', function(e) {
        soundBtn(e)
        var $this = $(this);

        if ($this.hasClass('device_err')) {
            //故障设备
            if ($this.hasClass('active')) {
                $this.removeClass('active');
            } else {
                // $this.parents('ul').find('li').removeClass('active');
                $this.addClass('active');
                $this.siblings().removeClass('active');
            }
        } else {
            //显示设备
            if ($this.hasClass('active')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
        }
        e.preventDefault();
        e.stopPropagation();


    })

    //设备打开
    $('#device_open').on('touchstart click', function(e) {
        soundBtn(e)
        var _selected = [];
        $('.device-box ul .active').each(function(index, dom) {
            _selected.push($(dom).attr('data-index'))
        })
        if (SOCKET) {
            socket_send('device_open', null, _selected)
        }
    })

    //设备关闭
    $('#device_close').on('touchstart click', function(e) {
        soundBtn(e)
        if (SOCKET) {
            socket_send('device_close', null)
        }
        e.preventDefault();
        e.stopPropagation();

    })

    //管制区域 打开
    $('#controlarea_open').on('touchstart click', function(e) {
        soundBtn(e)
        var _selected = [];
        selected_highctrlarea_id = [];
        selected_lowctrlarea_id = []
        var _controlarea_type = null;
        var $active = $('.controlarea-box .type .active')
        var $highctrlarea_list = $active.parents('controlarea-box').find('.highctrlarea-list');
        //高空
        if ($active.hasClass('controlarea_height')) {
            _controlarea_type = "controlarea_height";

            var arr = $('#highctrlarea-shield-form').serializeArray();
            for (var i = 0; i < arr.length; i++) {
                selected_highctrlarea_id.push(arr[i].value)
            }
            _selected = selected_highctrlarea_id;
            //高空存储扇区选项
            var _isSave = $('#save_highctrlarea_list').prop('checked')
            if (_isSave) {
                localStorage.setItem('highctrlarea_list', JSON.stringify(_selected));
            }
        }

        //低空
        if ($active.hasClass('controlarea_low')) {
            _controlarea_type = "controlarea_low";
            var arr = $('#lowctrlarea-shield-form').serializeArray();
            for (var i = 0; i < arr.length; i++) {
                selected_lowctrlarea_id.push(arr[i].value)
            }
            _selected = selected_lowctrlarea_id;
            //低空存储扇区选项
            var _isSave = $('#save_lowctrlarea_list').prop('checked')
            if (_isSave) {
                localStorage.setItem('lowctrlarea_list', JSON.stringify(_selected));
            }
        }

        if (SOCKET) {
            socket_send('controlarea_open', { 'type': _controlarea_type }, _selected)
        }
        e.preventDefault();
        e.stopPropagation();

    });

    //管制区域 关闭
    $('#controlarea_close').on('touchstart click', function(e) {
        soundBtn(e)
        isReset = false;
        var _controlarea_type = null;
        var $active = $('.controlarea-box .type .active');
        selected_lowctrlarea_id = [];
        selected_highctrlarea_id = [];
        if ($active.hasClass('controlarea_height')) {
            _controlarea_type = "controlarea_height";
            $('#highctrlarea-shield-form').find('input[type="checkbox"]').each(function() {
                $(this)[0].checked = false;
            })
        }
        if ($active.hasClass('controlarea_low')) {
            _controlarea_type = "controlarea_low";
            $('#lowctrlarea-shield-form').find('input[type="checkbox"]').each(function() {
                $(this)[0].checked = false;
            })
        }
        if (SOCKET) {
            socket_send('controlarea_close', { 'type': _controlarea_type })
        }
        e.preventDefault();
        e.stopPropagation();

    });

    $('#controlarea_reset').on('touchstart click', function(e) {

        isReset = true;
        soundBtn(e);
        var $active = $('.controlarea-box .type .active')

        if ($active.hasClass('controlarea_height')) {
            $('#highctrlarea-shield-form input[type="checkbox"]').each(function() {
                var id = $(this).attr('id')
                if (sectionArr.indexOf(id) !== -1) {
                    $(this)[0].checked = true;
                } else {
                    $(this)[0].checked = false;
                }
            })
        }
        if ($active.hasClass('controlarea_low')) {
            $('#lowctrlarea-shield-form input[type="checkbox"]').each(function() {
                var id = $(this).attr('id');
                if (sectionArr.indexOf(id) !== -1) {
                    $(this)[0].checked = true;
                } else {
                    $(this)[0].checked = false;
                }
            })
        }
        e.preventDefault();
        e.stopPropagation();
    })

    //机场名称查询 apName=ZJSY
    $('#search_airport').on('touchstart click', function(e) {
        soundBtn(e)
        var _world = $('#search_world').val();
        if (_world !== '') {
            get_data('get_airport', { "search": _world }, function(res) {
                var _html = '';
                for (var i in res) {
                    _html += '<p data-id=' + res[i]['apName'] + '>' + "【" + res[i]['apName'] + "】" + res[i]['airportName'] + '</p>';
                }
                0
                $('#search_result_box').html('').html(_html).css('overflow', 'scroll');

            });
        } else {
            get_data('get_airport', {}, function(res) {
                var _html = '';
                for (var i in res) {
                    _html += '<p data-id=' + res[i]['apName'] + '>' + "【" + res[i]['apName'] + "】" + res[i]['airportName'] + '</p>';
                }
                0
                $('#search_result_box').html('').html(_html).css('overflow', 'scroll');

            });
        }

        e.preventDefault();
        e.stopPropagation();


    });

    //机场交互部分
    $('#search_result_box').on('touchstart click', 'p', function(e) {
        soundBtn(e);

        var $this = $(this);
        var _id = $this.attr('data-id');
        var canAppendTo = true;
        var $p = $('#search_result_selected_box p');
        $p.each(function(index, dom) {
            var __id = $(dom).attr('data-id');
            if (__id == _id) {
                canAppendTo = false;
            };
        });

        if (canAppendTo == false) return;
        $p.remove(); //只保留唯一选中
        $this.appendTo('#search_result_selected_box');
        e.preventDefault();
        e.stopPropagation();

    })

    //已选中部分
    $('#search_result_selected_box').on('touchstart click', 'p', function(e) {
        soundBtn(e)
        var $this = $(this);
        var _id = $this.attr('data-id');
        var canAppendTo = true;
        $('#search_result_box p').each(function(index, dom) {
            var __id = $(dom).attr('data-id');
            if (__id == _id) {
                canAppendTo = false;
            };
        });
        if (canAppendTo == false) {
            $this.remove();
        } else {
            $this.appendTo('#search_result_box');
        }
        e.preventDefault();
        e.stopPropagation();

    })

    $('#airport_open').on('touchstart click', function(e) {

        soundBtn(e)
        var _selected = [];
        $('#search_result_selected_box p').each(function(index, dom) {
            _selected.push($(dom).attr('data-id'));
        });



        if (SOCKET) {
            socket_send('airport_open', null, _selected)
        }
        e.preventDefault();
        e.stopPropagation();

    });

    $('#airport_close').on('touchstart click', function(e) {

        soundBtn(e)
        var _selected = [];
        if (SOCKET) {
            socket_send('airport_close', null, _selected)
        }
        e.preventDefault();
        e.stopPropagation();

    });

    $('#weather').on('touchstart click', function(e) {

        soundBtn(e)
        var _selected = [];
        if (SOCKET) {
            socket_send('weather', null, _selected);
        }
        e.preventDefault();
        e.stopPropagation();

    })

    var data_select_default = new Date().toLocaleDateString();
    $('#date_select').val(data_select_default);

    $('#loop_show').on('change', function(e) {
        soundBtn(e)
        if ($(this)[0].checked) {
            $('.situation-box .btn-box .range').css('top', '-100px');
            $('.situation-box .btn-box .range').height(100)
        }
        e.preventDefault();
        e.stopPropagation();

    })
    $('#fixed_show').on('change', function(e) {
        soundBtn(e)
        if ($(this)[0].checked) {
            $('.situation-box .btn-box .range').css('top', 0);
            $('.situation-box .btn-box .range').height(0)
        }
        e.preventDefault();
        e.stopPropagation();

    })
    $('#rate_loop_show').on('change', function(e) {
        soundBtn(e)
        if ($(this)[0].checked) {
            $('.rate-box .btn-box .range').css('top', '-100px');
            $('.rate-box .btn-box .range').height(100)
        }
        e.preventDefault();
        e.stopPropagation();

    })
    $('#rate_fixed_show').on('change', function(e) {
        soundBtn(e)
        if ($(this)[0].checked) {
            $('.rate-box .btn-box .range').css('top', 0);
            $('.rate-box .btn-box .range').height(0)
        }
        e.preventDefault();
        e.stopPropagation();

    })
    $('#all_airport,#rate_all_airport,#date_select').on('change', function(e) {
        soundBtn(e);
        e.preventDefault()
        e.stopPropagation();
    });

    $('.situation-box .btn-box .range input').on('change', function() {
        $('.situation-box .btn-box .range span').eq(0).text($(this).val() + '秒');
    })
    $('.rate-box .btn-box .range input').on('change', function() {
        $('.rate-box .btn-box .range span').eq(0).text($(this).val() + '秒');
    })

    $('.situation-box .close_btn').on('touchstart click', function(e) {

        soundBtn(e);
        $('.situation-box form').each(function() {
            $(this)[0].reset();
        })
        e.preventDefault();
        e.stopPropagation();

    });
    $('.rate-box .close_btn').on('touchstart click', function(e) {

        soundBtn(e);
        $('.rate-box form').each(function() {
            $(this)[0].reset();
        })
        //e.preventDefault();
        e.stopPropagation();

    });

    $('.situation-box .confirm_btn').on('touchstart click', function(e) {

        soundBtn(e);
        var json = {
            interval: 5000,
            date: $('#date_select').val().replace(/[\/|-]/g, '')
        };

        json.interval = $('.situation-box .btn-box .range input').val() * 1000;
        var loop_cities = [];
        if ($('#fixed_show')[0].checked) {
            json.life = 0;
        } else {
            json.life = 1;
        }
        if ($('#all_airport')[0].checked) {
            loop_cities.push({
                title: '全国',
                apName: 'all'
            })
        } else {
            $('.situation-box .right-result p').each(function() {
                loop_cities.push({
                    title: $(this).data('title'),
                    apName: $(this).data('name')
                })
            });

        }
        json.views = loop_cities;
        if (SOCKET) {
            socket_send('situation_open', null, json);
        }
        //e.preventDefault();
        e.stopPropagation();

    })
    $('.rate-box .confirm_btn').on('touchstart click', function(e) {

        soundBtn(e);
        var json = {
            timeType: 'year',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            interval: 5000
        };


        json.interval = $('.rate-box .btn-box .range input').val() * 1000;
        var loop_cities = [];
        if ($('#rate_fixed_show')[0].checked) {
            json.life = 0;
        } else {
            json.life = 1;
        }
        if ($('#rate_all_airport')[0].checked) {
            loop_cities.push({
                title: '全国',
                apName: 'all',
                airline: ''
            })
        } else {
            $('.rate-box .right-result p').each(function() {
                loop_cities.push({
                    title: $(this).data('title'),
                    apName: $(this).data('name'),
                    airline: ''
                })
            });

        }
        json.views = loop_cities;
        if (SOCKET) {
            socket_send('rate_open', null, json);
        }
        e.preventDefault();
        e.stopPropagation();

    })

    //socket 发送
    function socket_send(key, value, selected, callback) {

        SOCKET_MSG.main = key ? key : null;
        SOCKET_MSG.selected = selected ? JSON.parse(JSON.stringify(selected)) : [];
        SOCKET_MSG.value = value ? value : null;
        if (SOCKET == false) return false; //没有建立socket
        SOCKET.send(JSON.stringify(SOCKET_MSG));

        if (callback) {
            callback();
        }
    }

    function get_data(path, obj, callback) {
        var _url = 'http://' + DATA_SERVER_IP + ":" + DATA_SERVER_PORT + DATA_SERVER_PATH[path];
        var _obj = obj ? obj : {};
        $.get(_url, obj, function(result) {
            var _json = JSON.parse(result);
            //添加get代码
            if (_json['code'] == 200) {
                if (callback) { callback(_json['data']) }
            } else {
                console.log("get通信错误！")
            }

        });


    }

    function post_data(path, data, callback) {
        var _url = 'http://' + DATA_SERVER_IP + ":" + DATA_SERVER_PORT + DATA_SERVER_PATH[path];

        $.post(_url, data, function(result) {
            //添加post代码

            if (callback) {
                callback();
            }
        });
    }

    //刷新欢迎词
    function refresh_welcomewords() {
        get_data('get_welcomewords', {}, function(data) {
            $('#welcome_text').val(data[0]["content"]);
            var $style = $('.welcome .style-box>div');
            $style.removeClass('selected');
            $style.eq(parseInt(data[0]['style'])).addClass('selected');
        })
    }

})
