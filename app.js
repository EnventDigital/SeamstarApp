/*! MAIN - Seamstar */

var server = require('./service');
var http = require('http');
var messagebus = require('messagebus');
var httpServer = http.createServer(server);
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection',  function(socket){
    console.log('We have connected via web sockets!');
    socket.on("info", function(data){
       console.log("data recieved "+data);
	   //socket.emit('', {});
	   //scket.broadcast.emit('', {});
	});   
});

httpServer.listen(server.get('port'), server.listener); 
