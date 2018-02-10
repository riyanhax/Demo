fs                                            = require 'fs'
env                                           = process.env.NODE_ENV && process.env.NODE_ENV.trim()
url                                           = require 'url'
path                                          = require 'path'
httpServer                                    = require './server'
socketServer                                  = require './socket'
{ app, BrowserWindow, ipcMain, Menu, Tray }   = require 'electron'



# 创建http服务器
httpServer.start()

# 创建socket服务器
socketServer.start()



# 管制区页面
child_area_window      =  null
# 机场页面
child_airport_window   =  null
# 航路页面
child_route_window     =  null
# 欢迎词页面
child_welcome_window   =  null
# 启动页面
parent_start_window    =  null
# 正常率页面
child_rate_window      =  null
# 运行态势页面
child_status_window    =  null



tray   = null
loaded = 0



# 启动页面窗口配置
start_windows_options = 
    x      : 0
    y      : 0
    w      : 5760
    h      : 1080
    url    : 'start.html'
    full   : true
    show   : true

# 扇区窗口配置
area_windows_options = 
    y      : 0
    x      : if env and env is 'development' then 0 else 7680
    w      : 1920
    h      : 1080
    url    : 'index.html'
    search : 'section'
    parent : start_windows_options

# 全国机场窗口配置
airport_windows_options = 
    y      : 0
    x      : if env and env is 'development' then 0 else 1920
    w      : 1920
    h      : 1080
    url    : 'index.html'
    search : 'airport'
    parent : start_windows_options

# 航路窗口配置
route_windows_options = 
    y      : 0
    x      : if env and env is 'development' then 0 else 3840
    w      : 1920
    h      : 1080
    url    : 'index.html'
    search : 'airroute'
    parent : start_windows_options

# 欢迎词窗口配置
welcome_windows_options = 
    y      : 0
    x      : 0
    w      : if env and env is 'development' then 1920 else 5760
    h      : 1080
    url    : 'welcome.html'
    ontop  : true
    parent : start_windows_options

# 航班运行态势窗口配置
status_windows_options = 
    x      : 0
    y      : 0
    w      : 1920
    h      : 1080
    url    : './old_minhang_ui/1.html'
    parent : start_windows_options

# 正常率窗口配置
rate_windows_options = 
    w      : 1920
    h      : 1080
    x      : if env and env is 'development' then 0 else 5760
    y      : 0
    url    : './old_minhang_ui/6r.html'
    parent : start_windows_options



# 页面切换方法
ipcMain.on 'operation', (event, arg) =>

    switch arg

        # 开启欢迎词和宣传片
        when 'welcome_on' , 'video_on'
            child_welcome_window.show()
            return

        # 关闭欢迎词和宣传片
        when 'welcome_off' , 'video_off' 
            child_welcome_window.hide()
            return

        # 开始机场信息页面
        when 'largeScreen_on'
            child_welcome_window.hide()
            largetScreenShow()
            return

        # 关闭机场信息页面
        when 'largeScreen_off'
            largeScreenHide()
            return



# 判断页面加载状态
ipcMain.on 'loaded', (event, arg) =>

    loaded++
    if loaded is 2
        parent_start_window.hide()
        largetScreenShow()
        return



#  显示大屏幕
largetScreenShow = ->

    child_area_window.show()
    child_airport_window.show()
    child_route_window.show()
    child_status_window.show()
    child_rate_window.show()
    return

# 关闭大屏幕
largeScreenHide = ->

    child_area_window.hide()
    child_airport_window.hide()
    child_route_window.hide()
    child_rate_window.hide()
    child_status_window.hide()
    return


# 生成窗口方法
createWindow = ->

    # 正常率页面
    child_rate_window       =  createWin rate_windows_options

    # 扇区页面
    child_area_window       =  createWin area_windows_options

    # 航路页面
    child_route_window      =  createWin route_windows_options

    # 启动主页面
    parent_start_window     =  createWin start_windows_options

    # 航班运行态势页面
    child_status_window     =  createWin status_windows_options

    # 机场主页面
    child_airport_window    =  createWin airport_windows_options

    # 欢迎页面（包括宣传片和欢迎词）
    child_welcome_window    =  createWin welcome_windows_options

    # 右下角托盘菜单
    tray        = new Tray './apple-touch-icon-precomposed.png'

    contextMenu = Menu.buildFromTemplate([{
            label: '退出程序',
            click: -> 
                app.quit()
                return
        }
    ]);

    tray.setContextMenu(contextMenu)
    return



# 创建窗口
createWin = (data) ->

    # 初始化窗口对象
    options = 
        x           : +data.x
        y           : +data.y
        frame       : false
        width       : +data.w
        height      : +data.h
        show        : data.show or false
        resizable   : true
        fullscreen  : data.full or false
        transparent : true
        skipTaskbar : false
        alwaysOnTop : data.ontop or false

    obj = new BrowserWindow options

    # 加载窗口页面配置
    loadURLOptions = 
        hash     : data.hash or ''
        search   : data.search or ''
        slashes  : true
        protocol : 'file:'
        pathname : path.join(__dirname, data.url)

    # 加载窗口页面
    obj.loadURL(url.format(loadURLOptions))

    # 控制台设置
    obj.webContents.on "before-input-event" , (event, input) =>

        if input.type is "keyUp"

            # f12出控制台
            if input.key is "F12" 
                obj.webContents.toggleDevTools()

            # f5 刷新
            if input.key is "F5"
                obj.webContents.reload()
        return

    # 窗口关闭，程序退出
    obj.on 'closed', => 
        obj = null
        app.quit()
        process.exit(0)
        return

    # 页面加载完成，窗口显示
    obj.once 'did-finish-load', => 
        obj.show()
        return

    return obj;



# 创建一个主窗口
app.on 'ready', createWindow
