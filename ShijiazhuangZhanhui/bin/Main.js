const HttpServer = require("./HttpServer");
const WebSocketServer = require("./WebSocketServer");
const fs = require('fs');
const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const Session = electron.session;
const ipcMain = electron.ipcMain;

var runPath = app.getAppPath();
var appPath = runPath + "/apps";
var dataPath = runPath + "/../../../data";
var port = 80;

var windows = {};


global.args = parseArgv();

if (global.args.dev === "1") {
    port = 2000;
}


var httpServer = HttpServer.start(port, runPath + "/apps");
WebSocketServer.start(httpServer);


var winOption = {
    frame: false,
    modal: true,
    skipTaskbar: false,
    fullscreen: false,
    alwaysOnTop: true,
    x: 0,
    y: 0,
    width: 7680,
    height: 2160,
    thickFrame: false,
    //title: 'VideoPlayer',
    autoHideMenuBar: false,
    enableLargerThanScreen: true,
    transparent: false,
    webPreferences: {
        allowRunningInsecureContent: true,
        plugins: true,
        //  zoomFactor: 0,
        // nodeIntegration: false,
        //  nodeIntegrationInWorker: false,
        webSecurity: false
    }
};

if (global.args.dev === "1") {
    winOption.width = 3840;
    winOption.height = 1080;
    winOption.x = 2400;
}


app.on('ready', function () {

    // showTray();
    windows.main = createWindow(winOption);

});
app.on("window-all-closed", function () {
    app.quit();
    process.exit(0);
});

function showTray() {
    var tray = new Tray(runPath + '/zoolon.ico')
    const contextMenu = Menu.buildFromTemplate([
        {

            label: 'Debug', type: 'normal', click: function () {
                createWindow(winOption);
            }
        }, {

            label: 'Quit', type: 'normal', click: function () {
                app.quit();
                process.exit(0);
            }
        }
    ])
    tray.setToolTip('Zoolon.com.cn')
    tray.setContextMenu(contextMenu)
}

function createWindow(option) {


    var win = new BrowserWindow(option);
    win.setSize(option.width, option.height, false);

    var contents = win.webContents;

    var url = runPath + "./apps/idle/index.html";
    win.loadURL(url + "?v=" + Math.random());

    contents.on("before-input-event", function (event, input) {
        if (input.type === "keyUp") {

            if (input.key === "F12") { //f12出控制台
                contents.toggleDevTools();
            }
            else if (input.key === "F5") {
                contents.reload(); //f5 刷新
            }
        }
    });

    return win;
}

function parseArgv() {

    var result = {};

    var argv = process.argv;

    // console.log(argv)


    for (var i = 0; i < argv.length; i++) {
        var arg = argv[i];
        if (arg.indexOf("-") === 0) {
            var name = arg.substr(1, arg.length);

            if (i + 1 < argv.length) {
                result[name] = argv[i + 1];
            }

        }
    }

    console.log(result)


    //  console.log(result)
    return result;
}

ipcMain.on('message', function (event, arg) {
    var message = arg.message;

});