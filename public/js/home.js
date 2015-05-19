var socket = io.connect();
socket.on('connection message', function (data) {
	console.log(data.greeting);
	socket.emit('home loaded', { message: 'The home page is loaded' });
});

$(function() {
	$('input[name="bt_first_game"]').click(function() {
		$('#form_user').attr('action', '/first_game');
		$('#form_user').submit();
	});
	$('input[name="bt_second_game"]').click(function() {
		$('#form_user').attr('action', '/second_game');
		$('.button_games').css('display', 'none');
		$('.button_levels').css('display', 'block');
	});
	$('input[name="bt_second_easy"]').click(function() {
		$('input[name="level"]').val('easy');
		$('#form_user').submit();
	});
	$('input[name="bt_second_medium"]').click(function() {
		$('input[name="level"]').val('medium');
		$('#form_user').submit();
	});
	$('input[name="bt_second_hard"]').click(function() {
		$('input[name="level"]').val('hard');
		$('#form_user').submit();
	});
});