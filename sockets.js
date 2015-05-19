var MAX_PLAYERS = 5;

var io;
var socket;
var user = {};
var users = {};
var available_rooms = [];
var rooms = [];

var randomString = require('./src/components/randomString');
var random_string = new RandomString();

exports.init = function(io_app, socket_app){
    io = io_app;
    socket = socket_app;

    socket.emit('connection message', { greeting: 'Hello gamer!' });
    socket.emit('get data user');

    socket.on('home loaded', homeLoaded);
    socket.on('join room', joinRoom);

    socket.on('change color', changeColor);
};

function homeLoaded(data) {
    console.log(data.message);
};

function createNewRoom(room, user) {
    rooms.push(room);
    socket.join(room.id);
    socket.emit('show on console', 'you have connected to room ' + room.id);
    socket.emit('new room created', { room: room, user: user });
};

function joinExistingRoom(room, user) {
    room.players.push(user);
    socket.join(room.id);
    io.sockets.in(room.id).emit('show on console', user.nickname + ' has connected to room ' + room.id);
    io.sockets.in(room.id).emit('player joined room', { room: room, user: user });
};

function joinRoom(data) {
    socket.user = data.user;
    socket.room = {};
    users[user.nickname] = user.nickname;
    var room_id = random_string.rand(12);
    var new_room = {
        id: room_id,
        owner: data.user.nickname,
        level: data.level,
        date: data.date,
        players: [
            data.user
        ]
    };
    var available_room;
    var room = false;
    var first_room = false;
    if (rooms.length > 0) {
        for (i in rooms) {
            if (rooms[i].level == data.level && rooms[i].players.length < MAX_PLAYERS) {
                available_room = rooms[i];
                room = true;
            }
        }
    } else {
        createNewRoom(new_room, data.user);
        first_room = true;
    }
    if (room) {
        joinExistingRoom(available_room, data.user);
    } else if (!first_room) {
        createNewRoom(new_room, data.user);
    }
};

function changeColor(room, color) {
    io.sockets.in(room.id).emit('change color broad', color);
};