var room;
var socket = io.connect();

socket.on('get data user', function() {
	var user = getUser();
	var level = getLevel();
	socket.emit('join room', {
		user: {
			nickname: user
		},
		game: 'second game',
		date: new Date(),
		level: level
	});
});
socket.on('new room created', function(data) {
	room = data.room;
});
socket.on('player joined room', function(data) {
	room = data.room;
	$('.room').text(data.user.nickname + ' ha entrado en la room ' + data.room.id);
});
socket.on('show on console', function(message) {
	console.log(message);
});
socket.on('change color broad', function(color) {
	$('#color').css('background-color', color);
});

function getUser() {
	return $('.name_user').text();
};
function getLevel() {
	return $('#level').text();
};

$(function() {
	$('#select_color').change(function() {
		var color = $(this).val();
		$('#color').css('background-color', color);
		socket.emit('change color', room, color);
	});
});