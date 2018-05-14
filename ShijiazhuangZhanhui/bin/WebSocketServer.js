var SocketIO = require('socket.io');
var net = require('net');
const electron = require('electron');
const app = electron.app;
var runPath = app.getAppPath();
const fs = require('fs');
var dataPath = runPath + "/../../../data";
const dgram = require('dgram');


exports.start = function (httpServer) {


    const io = new SocketIO(httpServer);

    io.on('connection', function (socket) {


        socket.on('request', function (data) {

            try {
                //   console.log(data)
             //   parseRequest(socket, data);
            }
            catch (e) {
                console.log(e)
                socket.emit("appError", e);
            }

        });
    });
};

