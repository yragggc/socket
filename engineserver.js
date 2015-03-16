var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO

var server = http.createServer(function(request, response) {
  console.log('Connection');
  var path = url.parse(request.url).pathname;

  switch (path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/socket.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        response.end();
      });
    case '/engine.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        response.end();
      });
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});


server.listen(8080);
// // var engine = require('engine.io');
// // var engineserver = engine.listen(server);
// var eioServer = require('engine.io')(server);
// 
// eioServer.on('connection', function(socket){
   // socket.send('utf 8 string');
   // socket.send(new Buffer([0, 1, 2, 3, 4, 5])); // binary data
  // //socket.emit('message', {'message': 'hello world'});
  // //socket.send('hi');
// });

var engine = require('engine.io');
var engineserver = engine.attach(server);

console.log('pingTimeout = ' + engineserver.pingTimeout);
engineserver.on('connection', function (socket) {	
  socket.on('message', function(data){console.log(data);});

  console.log('pingTimeout = ' + engineserver.pingTimeout);
  console.log('perMessageDeflate = ' + engineserver.perMessageDeflate);
  console.log('ws.options.perMessageDeflate = ' + engineserver.ws.options.perMessageDeflate);
  console.log('ws.options.noServer = ' + engineserver.ws.options.noServer);
  console.log('ws.options.clientTracking = ' + engineserver.ws.options.clientTracking);
  console.log('ws.options.host = ' + engineserver.ws.options.host);

  socket.send('utf 8 string');
  socket.send('hello!');
  socket.on('close', function(){ });
});

