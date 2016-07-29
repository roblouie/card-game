'use strict';

const express = require('express');
const app = express();
var http = require('http').Server(app);
const path = require('path');
var io = require('socket.io')(http);
const PlayerManager = require('./player-manager');
const Dealer = require('./dealer');

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

const playerManager = new PlayerManager();
const jobCardDealer = new Dealer(jobCards);
const qualificationCardDealer = new Dealer(qualificationCards);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/newgame', function(req, res) {
  io.emit('chat message', 'New game started.');
});

io.on('connection', function(socket){
  socket.on('disconnect', function () {
    if (playerManager.isJudgePlayer(socket)) {
      io.emit('chat message', playerManager.getPlayer(socket).username + " has left the game while judging, starting new round");
    }
    playerManager.removePlayer(socket);
  });

  socket.on('chat message', function(msg){
    playerManager.answeringPlayers.forEach(player => {
      player.socket.emit('chat message', player.username + ": " + qualificationCardDealer.dealCards(4).join(" "));
    })
  });

  socket.on('set username', function(username) {
    playerManager.addPlayer(socket, username);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

