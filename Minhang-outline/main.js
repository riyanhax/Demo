const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron')
const path                                        = require('path')
const url                                         = require('url')

var httpServer                                    = require('./server');
var socketServer                                  = require('./socket');
var fs                                            = require('fs');
var SCREEN_CONFIG                                 = require('./screen_config.json');

httpServer.start(); // 创建http服务器
socketServer.start(); // 创建socket服务器

let child_area_window, //管制区页面
    child_airport_window, //机场页面
    child_route_window, //航路页面
    child_welcome_window, //欢迎词页面
    parent_start_window, //启动页面
    child_rate_window, //正常率页面
    child_status_window; //运行态势页面

let tray = null;
let loaded = 0;

// 启动页面窗口配置
var start_windows_options = {
    w: SCREEN_CONFIG.startwin.width,
    h: SCREEN_CONFIG.startwin.height,
    x: SCREEN_CONFIG.startwin.x,
    y: SCREEN_CONFIG.startwin.y,
    full: true,
    show: true,
    url: 'start.html'
}

// 扇区窗口配置
var area_windows_options = {
    w: SCREEN_CONFIG.areawin.width,
    h: SCREEN_CONFIG.areawin.height,
    x: SCREEN_CONFIG.areawin.x,
    y: SCREEN_CONFIG.areawin.y,
    parent:start_windows_options,
    url: 'index.html',
    search:'section'
}


// 全国机场窗口配置
var airport_windows_options = {
    w: SCREEN_CONFIG.airportwin.width,
    h: SCREEN_CONFIG.airportwin.height,
    x: SCREEN_CONFIG.airportwin.x,
    y: SCREEN_CONFIG.airportwin.y,
    parent:start_windows_options,
    url: 'index.html',
    search:'airport'
}

// 航路窗口配置
var route_windows_options = {
    w: SCREEN_CONFIG.routewin.width,
    h: SCREEN_CONFIG.routewin.height,
    x: SCREEN_CONFIG.routewin.x,
    y: SCREEN_CONFIG.routewin.y,
    parent:start_windows_options,
    url: 'index.html',
    search:'airroute'
}

// 欢迎词窗口配置
var welcome_windows_options = {
    w: SCREEN_CONFIG.welcomewin.width,
    h: SCREEN_CONFIG.welcomewin.height,
    x: SCREEN_CONFIG.welcomewin.x,
    y: SCREEN_CONFIG.welcomewin.y,
    parent:start_windows_options,
    full: false,
    ontop:true,
    url: 'welcome.html'
}

// 航班运行态势窗口配置
var status_windows_options = {
    w: SCREEN_CONFIG.statuswin.width,
    h: SCREEN_CONFIG.statuswin.height,
    x: SCREEN_CONFIG.statuswin.x,
    y: SCREEN_CONFIG.statuswin.y,
    parent:start_windows_options,
    url: './old_minhang_ui/1.html'
}

// 正常率窗口配置
var rate_windows_options = {
    w: SCREEN_CONFIG.ratewin.width,
    h: SCREEN_CONFIG.ratewin.height,
    x: SCREEN_CONFIG.ratewin.x,
    y: SCREEN_CONFIG.ratewin.y,
    parent:start_windows_options,
    url: './old_minhang_ui/6r.html'
}

//页面切换方法
ipcMain.on('operation', (event, arg) => {
    switch (arg) {

        //开启欢迎词和宣传片
        case 'welcome_on':
        case 'video_on':
            child_welcome_window.show();
            break;

        // 关闭欢迎词和宣传片
        case 'welcome_off':
        case 'video_off':
            child_welcome_window.hide();
            break;


        // 开始机场信息页面
        case 'largeScreen_on':
            child_welcome_window.hide();
            largetScreenShow()
            break;

        // 关闭机场信息页面
        case 'largeScreen_off':
            largeScreenHide()
            break;
    }
})


//判断页面加载状态
ipcMain.on('loaded', (event, arg) => {
    loaded++;
    if (loaded == 2) {
        parent_start_window.hide();
        largetScreenShow()
    }
})


// 显示大屏幕
function largetScreenShow(){
    child_area_window.show();
    child_airport_window.show();
    child_route_window.show();
    child_status_window.show();
    child_rate_window.show();
}

// 关闭大屏幕
function largeScreenHide(){
    child_area_window.hide();
    child_airport_window.hide();
    child_route_window.hide();
    child_rate_window.hide();
    child_status_window.hide();
}

// 生成窗口方法
function createWindow() {

    // 扇区页面
    child_area_window = createWin(area_windows_options);

    // 机场主页面
    child_airport_window = createWin(airport_windows_options);

    // 航路页面
    child_route_window = createWin(route_windows_options);

    // 欢迎页面（包括宣传片和欢迎词）
    child_welcome_window = createWin(welcome_windows_options);

    // 启动主页面
    parent_start_window = createWin(start_windows_options);

    // 航班运行态势页面
    child_status_window = createWin(status_windows_options);

    // 正常率页面
    child_rate_window = createWin(rate_windows_options);



    // 右下角托盘菜单
    tray = new Tray(__dirname+'/apple-touch-icon-precomposed.png')
    const contextMenu = Menu.buildFromTemplate([{
            label: '退出程序',
            click: function() {
                app.quit();
            }
        }

    ]);
    tray.setContextMenu(contextMenu)
}

function createWin(data) {
    // 初始化窗口对象
    var obj = new BrowserWindow({
        width: +data.w,
        height: +data.h,
        fullscreen: data.full || false,
        resizable: true,
        transparent: true,
        frame: false,
        x: +data.x,
        y: +data.y,
        show: data.show || false,
        alwaysOnTop: data.ontop || false,
        skipTaskbar:false
    });

    // 加载窗口页面
    obj.loadURL(url.format({
        pathname: path.join(__dirname, data.url),
        protocol: 'file:',
        slashes: true,
        hash: (data.hash || ''),
        search: (data.search || '')
    }));

    // 控制台设置
    obj.webContents.on("before-input-event", function(event, input) {
        if (input.type === "keyUp") {

            if (input.key === "F12") { //f12出控制台
                obj.webContents.toggleDevTools();
            } else if (input.key === "F5") {
                obj.webContents.reload(); //f5 刷新
            }
        }
    });

    // 窗口关闭，程序退出
    obj.on('closed', () => {
        obj = null;
        app.quit();
        process.exit(0);
    });

    // 页面加载完成，窗口显示
    obj.once('did-finish-load', () => {
        obj.show()
    })

    return obj;
}

//创建一个主窗口
app.on('ready', createWindow)
