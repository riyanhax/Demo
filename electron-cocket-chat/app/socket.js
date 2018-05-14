let io = require('Socket.IO').listen(8888)

io.sockets.on('connection', (socket)=>{
	console.log('Socket is ready!!')
	socket.broadcast.json.send({ msg: 'message' });
  	socket.broadcast.on('listen',(data)=>{
  		socket.broadcast.emit('say',data)
    	console.log(data)
  	})
})

