## 本项目使用的前端技术为:
- gulp (前端打包工具)
- coffeescript (js的语法糖)
- sass (css的拓展语言)
- electron (electron 桌面应用)
- electron-packager (electron 打包程序模块)
- ws (websocket通信模块)   

建议把electron和electron-packager安装到全局，可以把build的项目单独拿出来运行

## 启动项目

### 开发环境

**开发环境启动项目在当前项目目录中运行命令**    
```npm run dev```   
**接着**   
```cd build```   
**运行命令**   
```npm install```   
**然后**   
```cd ..```   
**运行命令**   
```npm start-dev```   

### 生产环境

**生产环境启动项目在当前项目目录中运行命令**    
```npm run build```    
**接着**   
```cd build```   
**运行命令**   
```npm install```   
**然后**   
```cd ..```   
**运行命令**    
```npm start-build```

## 开发环境实时监控编译
``` gulp watch ```   
这个命令可以在开发过程当中自动监控文件的改变并执行编译任务到build文件夹中

## 打包程序
```npm run packager```   
打包的环境为当前运行项目的环境，如：当前环境为开发环境，打包后即为开发环境的应用包，若想切换环境，运行命令：   
``` npm run dev``` (开发环境)   
或者   
``` npm run build``` (生产环境)    
之后再运行打包命令

目前还没有真正改版完毕