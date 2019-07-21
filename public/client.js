$(function () {
    //buttons
    var send_message = $('#send_message')
    var message = $('#message')
    var userName =$('#user_name')
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('send-nickname', $('#nickName').val());
     /* socket.emit('message', $('#send_message').val());
      $('#send_message').val('');*/
      return false;
    });
    send_message.click(function(){
        socket.emit('new_message',message.val());
        message.val();
    })
    socket.on('new_message', function(msg){
        $('#messages').append($('<li>').text(msg));
      });
  });