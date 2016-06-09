'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const jobCards = [
  "Model",
  "Pirate",
  "Motivational Speaker",
  "Personal Trainer",
  "News Anchor",
  "Venture Capitalist",
  "Mime",
  "Pimp",
  "World Record Holder",
  "Wet Nurse",
  "Nanny"
];

const qualificationCards = [
  "Obsesive Compulsive",
  "Nunchucks",
  "Utility Belt",
  "Unstable",
  "Yoga Pants",
  "Uncontrollable Libido",
  "Uncontrollable Gas",
  "Shame",
  "Online Degree",
  "Oedipus Complex",
  "Online Dating Profile"
];

let currentGameJobs = shuffle(jobCards);
let currentGameQualifications = shuffle(qualificationCards);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/newgame', function(req, res) {
  currentGameJobs = shuffle(jobCards);
  currentGameQualifications = shuffle(qualificationCards);
  io.emit('chat message', 'New game started.');
});

io.on('connection', function(socket){
  socket.join('some room');
  socket.on('chat message', function(msg){
    io.emit('chat message', socket.username + ": " + currentGameQualifications.splice(0,4).join(" "));
  });

  socket.on('user joined', function(username){
    socket.username = username;
    socket.broadcast.emit('chat message', 'user connected: ' + username);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

