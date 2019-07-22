$(function () {
    //buttons
    var send_message = $('#send_message')
    var message = $('#message')
    var userName =$('#user_name')
    var userNameVal = $('#user_name_val')
    var socket = io()
    send_message.click(function(e){
      e.preventDefault(); 
        socket.emit('new_message',{message : message.val()});
        message.val();
    })
    userName.click(function() {
      console.log(userNameVal.val());
      socket.emit('change_username',{username : userNameVal.val()})
    })
    socket.on('new_message', function(data){
      console.log()
        $('#messages').append(('<li>') + data.username + (' : ')+ data.message);
      });
  });