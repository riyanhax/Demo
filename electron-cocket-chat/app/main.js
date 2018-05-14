 const {app,BrowserWindow} = require('electron');
 const path = require('path');
 const url = require('url');
 const spawn = require('child_process').spawn;
 let serverChild = null;
 let socketChild = null;

 let win;
 function createWindow(){
 	
 	setTimeout(function(){
 		serverChild = spawn('node',['server.js'])
 		socketChild = spawn('node',['socket.js'])
 	},100)

 	win = new BrowserWindow({width:800,height:600})

 	win.loadURL(url.format({
 		pathname:path.join(__dirname,'index.html'),
 		protocol:'file',
 		slashes:true
 	}));

	win.webContents.openDevTools();

	win.on('closed',()=>{
		win = null;
		process.kill(serverChild.pid)
		process.kill(socketChild.pid)
	})
 }

 app.on('ready',createWindow)

 app.on('window-all-closed',()=>{
 	if(process.platform !== 'darwin'){
 		app.quit()
 	}
 })

 app.on('activate',()=>{
 	if(win == null){
 		createWindow()
 	}
 })


