
// /**
//  * Module dependencies.
//  */

// var express = require('express')
//   , routes = require('./routes')
//   , user = require('./routes/user')
//   , http = require('http')
//   , path = require('path');

// var app = express();

// app.configure(function(){
//   app.set('port', process.env.PORT || 3000);
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'jade');
//   app.use(express.favicon());
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(path.join(__dirname, 'public')));
// });

// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

// app.get('/', routes.index);
// app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });


var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require('path');


io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

app.configure(function(){
  //use this to load external lib for the client-side
  app.use(express.static(__dirname + '/public'));
});

var port = process.env.PORT || 3000;

server.listen(port);



app.get('/',function(req,res){
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
  socket.on('message',function(message){
      console.log('Recieved message from client!');
      socket.broadcast.send(message); 
  });
});
