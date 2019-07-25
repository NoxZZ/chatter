
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var path = require('path');

//setting template engine
app.set('view engine','ejs')

//middlewares
app.use(express.static('public'));
//routing
app.get('/',(req,res) => {
    console.log(`requested on ${req.path}`);
    res.render(path.join(__dirname,'/public/index'));
});
users = [];
io.on('connect',function(socket){
            console.log("user connected...");
        
            //calling event 'change username' :
            //default username:
            socket.username = "anonymous"
            socket.on('change_username', function(data) {
                console.log(data);
                socket.username = data.username;
                users.push(socket.username);
                console.log(users);
        });

            //calling event 'displaying message to connected users':
        socket.on('new_message',function(data) {
            io.emit('new_message',{message : data.message,username : socket.username});
            console.log('message :', data.message,socket.username);
    });
        //on user disconnecting :
        socket.on('disconnect', function(data){
            io.emit('disconnected_user',{username : socket.username})
            console.log(`user ${socket.username} disconnected`);
          });
});

//listening to server
port =process.env.PORT || 8080
http.listen(port,() =>{
    console.log(`listening to port ${port}`);
});
