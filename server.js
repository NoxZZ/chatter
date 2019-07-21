
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
users = {};
io.on('connect',function(socket){
            console.log("user connected...");
        
            //calling event 'change nickname' :
            socket.on('send_nickname', function(nickname) {
                socket.nickname = nickname;
                users.push(socket.nickname);
                console.log(users);
        });

            //calling event 'displaying message to connected users':
        socket.on('new_message',function(msg) {
            io.emit('new_message',msg);
            console.log('message :', msg);
    });
        //on user disconnecting :
        socket.on('disconnect', function(){
            console.log('user disconnected');
          });
});

//listening to server
port =process.env.PORT || 8080
http.listen(port,() =>{
    console.log(`listening to port ${port}`);
});
