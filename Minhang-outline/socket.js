var  WebSocket = require('ws');
var net = require('net');
var request = require('request');
var SERVER = require('./ipconfig.json')

function server(){
  var wss = new WebSocket.Server({ port: 8888 });

  wss.on('connection', function connection(ws) {
    console.log('socket is ready!')
    ws.on('message', function incoming(message) {
      console.log(message);
      var data = JSON.parse(message);
      console.log(data)
      switch(data.main){
        case 'fullscreen_mode':
            send('192.168.50.70',30326,'+PixelNet LoadLayout "m3zz"\n')
            //switchMatrix('M3ZZ');
          break;
        case 'partscreen_mode':
            send('192.168.50.70',30326,'+PixelNet LoadLayout "m9zz"\n')
            //switchMatrix('M9ZZ');
          break;
        case 'seat_mode':
            send('192.168.50.80',23,data.value)
          break;
      }
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

  });
}

function switchMatrix(type){
  request('http://'+SERVER.ip+':'+SERVER.port+'/get-matrix',(err,res,body) => {
      var data = JSON.parse(body).data;
      var value = '';
      for(var i =0;i<data.length;i++){
        if(data[i].type == type){
          var matrix = data[i].matrix.toString().split('*')
          var output = data[i].output.toString().split('*')

          if(matrix.length == output.length && matrix.length && output.length){
            for(var j in matrix){
              value += output[j]+'*'+matrix[j]+'!'
            }
          }else{
            break;
          }
        }
      }
      if(value){
        console.log('value-----'+value)
        send('192.168.50.80',23,value)
      }else{
        console.log('value is empty!!')
      }
  })
}

function send(HOST, PORT, CMD) {
    var socket = new net.Socket();
    socket.setTimeout(3000);
    socket.on("timeout", function () {
      console.log('PixelNet timeout!!!')
    });
    socket.on("data", function () {
      console.log('socket is ok')
    });
    socket.on("error", function () {
      console.log('PixelNet error!!!')
    });

    socket.connect(PORT, HOST, function () {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        socket.write(CMD+'\n');
        socket.write(CMD+'\n');
        //socket.destroy();
    });
}
exports.start = server;
