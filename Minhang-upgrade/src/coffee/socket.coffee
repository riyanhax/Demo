net        =  require 'net'
env        =  process.env.NODE_ENV
request    =  require 'request'
WebSocket  =  require 'ws'

SERVER     =  ip:'172.30.8.80',port:3000

# 生产环境
if env and env is 'development'
  SERVER.ip = '127.0.0.1'

server= ->

  wss = new WebSocket.Server { port: 8888 }

  wss.on 'connection', ( ws ) =>

    console.log 'socket is ready!'

    ws.on 'message', ( message ) =>
    
      console.log message

      data = JSON.parse message

      console.log data

      switch data.main
        when 'fullscreen_mode'
            send '192.168.50.70',30326,'+PixelNet LoadLayout "m3zz"\n'
            switchMatrix 'M3ZZ'

        when 'partscreen_mode'
            send '192.168.50.70',30326,'+PixelNet LoadLayout "m9zz"\n'
            switchMatrix 'M9ZZ'

        when 'seat_mode'
            send '192.168.50.80',23,data.value


      wss.clients.forEach (client) =>
        if client isnt ws and client.readyState is WebSocket.OPEN
          client.send message
          return  
      return
    return

  wss.on 'error', () ->
    return

  return

  


switchMatrix = ( type ) ->
  request "http://#{SERVER.ip}:#{SERVER.port}/get-matrix" , ( err, res, body ) =>
      data = JSON.parse(body).data
      value = ''

      for obj in data
        if obj.type is type

           matrix = obj.matrix.toString().split('*')
           output = obj.output.toString().split('*')

          if matrix and output and matrix.length and output.length and matrix.length is output.length
            for j,str of matrix
              value += "#{output[j]}*#{str}!"
          else
            break

      if value

        send '192.168.50.80',23,value
        return

      else
        console.log('value is empty!!')
        return
  return



send = (HOST, PORT, CMD) ->

    socket = new net.Socket()
    socket.setTimeout 3000

    socket.on "timeout" , =>
      console.log('PixelNet timeout!!!')
      return

    socket.on "data" , =>
      console.log('socket is ok')
      return

    socket.on "error" , =>
      console.log('PixelNet error!!!')
      return

    socket.connect PORT, HOST, =>
        console.log('CONNECTED TO: #{HOST}: #{PORT}');
        socket.write(CMD+'\n');
        socket.write(CMD+'\n');
        # socket.destroy();
        return
    return

exports.start = server
