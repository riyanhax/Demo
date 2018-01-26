var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var querystring = require('querystring')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

var config = {
  port:8089,
  main:'control.html',
  webroot:__dirname
};

var exts = ['.html','.js','.css','.png','.jpg','.jpeg','.ttf','.json','.woff','.mp4','.mp3'];

function start(){
  http.createServer(function(req,res){
    var pathname = url.parse(req.url,true).pathname;
    
    if(req.method.toLowerCase() === 'post'){

      var body = '';
      req.on('data', function(chunk){
          body += chunk;
      });

      req.on('end', function(){    
          body = querystring.parse(body);
          if(pathname == '/save_welcomewords'){
            var adapter = new FileSync(__dirname+'/assets/database/words.json');
            var db = low(adapter)
            db.get('data').remove().write();
            db.get('data').push(body).write();
            console.log(body);
            res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
            res.write(JSON.stringify({code:200,data:''}));
            res.end();
          }
      });

      return;
    }
    

    if(pathname == '' || pathname == '/'){
      pathname = config.main || 'index.html';
    }
    pathname = pathname.replace(/\.\//g,'').replace(/\..\//g,'');

    if(pathname == '/get_welcomewords'){
      var response = {
        code:200,
        data:''
      };
      var adapter = new FileSync(__dirname+'/assets/database/words.json');
      var db = low(adapter)
      var data = db.get('data').value();
      response.data = data;
      res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
      res.write(JSON.stringify(response));
      res.end();
      return;
    }

    if(pathname == '/get_sectionsearch'){
      var json = {
        high:{},
        low:{}
      };
      var response = {
        code:200,
        data:''
      };
      var adapter = new FileSync(__dirname+'/assets/database/section.json');
      var db = low(adapter)
      var data = db.get('data').value();
      for(var i=0;i<data.length;i++){
        var key = data[i].cnName.split(/\d+/)[0];
        //var cnKey = data[i].cnName.match(/\d+/)[0];
        var city = {};
        city[data[i].cnName] = data[i].enName;
        if(data[i].heightLevel == 'high'){
          if(json.high[key]){
            json.high[key].push(city);
          }else{
            json.high[key] = [];
            json.high[key].push(city);
          }
        }else{
          if(json.low[key]){
            json.low[key].push(city);
          }else{
            json.low[key] = [];
            json.low[key].push(city);
          }
        }
      }
      json.high = json2arr(json.high);
      json.low = json2arr(json.low)
      response.data = json;

      res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
      res.write(JSON.stringify(response));
      res.end();
    }

    if(pathname == '/get-sectionsave'){
      var response = {
        code:200,
        data:''
      };

      var adapter = new FileSync(__dirname+'/assets/database/sectionsave.json');
      var db = low(adapter)
      var data = db.value();

      response.data = data;

      res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
      res.write(JSON.stringify(response));
      res.end();
    }

    if(pathname == '/get_airport'){
      var response = {
        code:200,
        data:''
      };
      var adapter = new FileSync(__dirname+'/assets/database/airport.json');
      var db = low(adapter);
      
      db._.mixin({
        blur: function(array,type) {
          var key = Object.keys(type)[0];
          var search = type[key];
          var arr = [];
          var re = new RegExp(search,"gm");
          array.forEach(function(obj){
            var test = re.test(obj[key]);
            if(test){
              arr.push(obj)
            }
          })
          return arr
        }
      })


      var params = url.parse(req.url, true).query;
      if(params.search){
        var query = params.search.split(/\s+/);
        var len = query.length;
        var tmp = [];
        while(len){
          var arr;
          if(/[\u4e00-\u9fa5]/.test(query[len-1])){
            arr = db.get('data').blur({airportName:query[len-1]}).value();
          }else{
            var str = query[len-1].toUpperCase();
            arr = db.get('data').blur({apName:str}).value();
          }

          tmp = tmp.concat(arr);
          
          len--;
        }

        response.data = tmp;
      }else{
        response.data = db.get('data').value();
      }

      res.writeHead(200,{'Content-Type':'application/json;charset=UTF-8'});
      res.write(JSON.stringify(response));
      res.end();
    }
    

    if(exts.indexOf(path.extname(pathname))>=0){
      pathname = config.webroot+'/' + pathname;
      var range = (req.headers && req.headers['range']);
      if(range){
        if(fs.existsSync(pathname)){
          var stat = fs.statSync(pathname)
          var total = stat.size;
          var parts = range.replace(/bytes=/, "").split("-");
          var partialstart = parts[0];
          var partialend = parts[1];
          var start = parseInt(partialstart, 10);
          var end = Math.min(total-1, partialend ? parseInt(partialend, 10) : total-1);
          var chunksize = (end-start)+1;
          if (start > end || isNaN(start) || isNaN(end)) {
            notFound(res);
            return;
          }
          var raw = fs.createReadStream(pathname, {start: start, end: end});
          res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/mp3'
          });
          raw.pipe(res);
        }else{
            notFound(res);
        }

      }else{
        if(fs.existsSync(pathname)){
          readFile(req,res,pathname)
        }else{
          notFound(res);
        }
      }

    }else{
      notFound(res);
    }

  }).listen(config.port);
  console.log((new Date()).toLocaleString()+'\nServer is started!!!');
}

function readFile(req,res,pathname){
  fs.stat(pathname,function(err,stat){
    var lastModified = stat.mtime.toUTCString();
    if(req['headers']['if-modified-since'] && req['headers']['if-modified-since'] == lastModified){
      notModified(res);
    }else{
      res.writeHead(200,'OK',{
        'Last-Modified':lastModified
      });
      var raw = fs.createReadStream(pathname);
      raw.pipe(res);
    }
  });
}

function notModified(res){
  res.writeHead(304,'Not Modified');
  res.end();
}

function notFound(res){
  res.writeHead(404,'Not Found');
  res.end();
}

function json2arr(json){
  var arr = [];
  for(var key in json){
    var sections = json[key];
    for(var i=0;i<sections.length;i++){
      for(var section in sections[i]){
        sections[i].name = section;
        sections[i].value = sections[i][section];
        delete sections[i][section];
      }
    }
    arr.push({
      name:key,
      value:json[key]
    })
  }

  return arr;
}

Array.prototype.unique = function(){
 var res = [];
 var json = {};
 for(var i = 0; i < this.length; i++){
  if(json[this[i].apName] !== 1){
   res.push(this[i]);
   json[this[i].apName] = 1;
  }
 }
 return res;
}
exports.start = start;
