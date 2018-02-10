http = require 'http'
url = require 'url'
path = require 'path'
fs = require 'fs'


config = 
  port:8089
  main:'control.html'
  webroot:__dirname


exts = [
          '.html',
          '.js',
          '.css',
          '.png',
          '.jpg',
          '.jpeg',
          '.ttf',
          '.json',
          '.woff',
          '.mp4',
          '.mp3'
        ];


# 启动服务器主函数
start = ->
  http.createServer(createServer).listen(config.port);
  console.log((new Date()).toLocaleString()+'\nServer is started!!!');
  return


# 创建服函数务器
createServer = (req,res) ->
  pathname = url.parse(req.url,true).pathname;

  if pathname is '' or pathname is '/'
    pathname = config.main or 'index.html';
  
  pathname = pathname.replace(/\.\//g,'').replace(/\..\//g,'');
  
  hasExtname = exts.indexOf(path.extname(pathname))

  if hasExtname >= 0
    pathname = config.webroot+'/' + pathname
    range = req.headers and req.headers['range']
    if range
      readRange(pathname,res,range)
    else
      if fs.existsSync(pathname) then readFile(req,res,pathname) else notFound(res);
  return
  

# 读取文件方法
readFile = (req,res,pathname) ->

  # 读取文件回调函数
  statCallback = (err,stat) ->
    lastModified = stat.mtime.toUTCString();
    if req['headers']['if-modified-since'] and req['headers']['if-modified-since'] is lastModified
      notModified(res)
    else
      res.writeHead(200,'OK',{
        'Last-Modified':lastModified
      })
      raw = fs.createReadStream(pathname)
      raw.pipe(res)
    return

  fs.stat(pathname, statCallback)
  return

# 没有修改过的方法
notModified = (res) ->
  res.writeHead(304,'Not Modified')
  res.end()
  return

# 定义没有找到的方法
 notFound = (res) ->
  res.writeHead(404,'Not Found')
  res.end()
  return

# 定义range方式
readRange = (pathname,res,range) ->
  if fs.existsSync(pathname)
      stat = fs.statSync(pathname)
      total = stat.size
      parts = range.replace(/bytes=/, "").split("-")
      partialstart = parts[0]
      partialend = parts[1]
      start = parseInt(partialstart, 10)
      end = Math.min(total-1, if partialend then parseInt(partialend, 10) else total-1)
      chunksize = (end-start)+1

      if start > end or isNaN(start) or isNaN(end)
        notFound(res)
        return

      raw = fs.createReadStream(pathname, {start: start, end: end});
      res.writeHead(206, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mp3'
      })
      raw.pipe(res)
    else
      notFound(res)
  return

exports.start = start