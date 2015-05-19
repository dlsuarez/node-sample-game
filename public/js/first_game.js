var user;

var socket = io.connect();

function setUser(socket_user) {
	user = socket_user;
	$('.name_user').text(user.nickname);
};

$(function() {});