const koa         = require('koa')
const app         = new koa()
const router      = require('koa-router')
const views       = require('koa-views')
const serve       = require('koa-static')
const path        = require('path')
const fs          = require('fs')
const querystring = require('querystring')
const config      = {}

let configPath = __dirname
while(!fs.existsSync(configPath+'/config.ini')){
	let last = configPath.lastIndexOf('\\')
	if(last){
		configPath = configPath.substring(0,last)
	}else{
		break;
	}
}

//读取配置文件
let ini = fs.readFileSync(configPath+'/config.ini','utf-8')
let server = querystring.parse(querystring.parse(ini, '[', ']').server,'\r\n','=')
for(let i in server){
	if(i!=='' && server[i]!==''){
		let key = i.replace(/\s+/g,'')
		config[key] = server[i].replace(/\s+/g,'')
	}
}

app.use(function*(next){
	yield next;
})

//模板配置
app.use(views(config.document))

//静态资源
app.use(serve(path.join(config.document,'./', 'public')))

//使用路由
app.use(router(app))

app.get('/',function*(){
	yield this.render(config.entry);
})

app.listen(3000)
console.log('Srever is running at 127.0.0.1 on port 3000')