
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);


//routing
app.get('/',(req,res) => {
    console.log(`requested on ${req.path}`);
    res.sendFile(__dirname+'/public/index.html');
});

io.on('connect',function(socket){
        console.log("user connected...")
        socket.on('chat message',function(msg) {
            io.emit('chat message',msg);
            console.log('message :', msg);
    });
        socket.on('disconnect', function(){
            console.log('user disconnected');
          });
});

//listening to server
port =process.env.PORT || 8080
http.listen(port,() =>{
    console.log(`listening to port ${port}`);
});
