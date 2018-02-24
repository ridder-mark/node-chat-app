// SOCKET EVENT HANDLERS

var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMessage', function(message) {
  console.log('newMesssage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})


// SEND MESSAGE BUTTON EVENT HANDLER


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()

  }, function() {
    messageTextbox.val('')
  });

});


// LOCATION BUTTON EVENT HANDLER

var locationButton = jQuery('#send-location');


locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(function(position) {
  locationButton.removeAttr('disabled');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(e) {
    locationButton.removeAttr('disabled');
    console.log(e);;
  });;
})
