// SOCKET EVENT HANDLERS

var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMessage', function(message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

});



socket.on('newLocationMessage', function(message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

});


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
