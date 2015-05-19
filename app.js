var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var server         = require('http').Server(app);
var io             = require('socket.io')(server);

var sockets = require('./sockets');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.set('view engine', 'ejs');

server.listen(8050);
console.log('Welcome to a sample game on node.js');

app.route('/').get(function(req, res, next) {
	res.render(__dirname + '/public/views/home');
});
app.route('/first_game').post(function(req, res, next) {
	res.render(__dirname + '/public/views/first_game', req);
});
app.route('/second_game').post(function(req, res, next) {
	res.render(__dirname + '/public/views/second_game', req);
});

io.on('connection', function (socket) {
	sockets.init(io, socket);
});