const PlayerManager = require('../player-manager');

exports['addPlayer method adds a new player to the master player list'] = function(test) {
  const playerManager = new PlayerManager();
  playerManager.addPlayer({id: 123});
  playerManager.addPlayer({id: 456});
  test.equal(playerManager.players.length, 2);
  test.done();
};

exports['removePlayer method removes a player from the master player list'] = function(test) {
  const playerManager = new PlayerManager();
  const socket1 = {id: 123};
  const socket2 = {id: 456};
  playerManager.addPlayer(socket1);
  playerManager.addPlayer(socket2);
  test.equal(playerManager.players.length, 2);

  playerManager.removePlayer(socket1);
  test.equal(playerManager.players.length, 1);
  playerManager.removePlayer(socket2);
  test.equal(playerManager.players.length, 0);
  test.done();
};

exports['getPlayer method retrieves the proper player'] = function(test) {
  const playerManager = new PlayerManager();
  const socket1 = {id: 123};
  const socket2 = {id: 456};
  playerManager.addPlayer(socket1);
  playerManager.addPlayer(socket2);
  test.equal(playerManager.getPlayer(socket1).socket.id, 123);
  test.equal(playerManager.getPlayer(socket2).socket.id, 456);
  test.done();
};

exports['players retrieved by getPlayer will be modified in the master player array'] = function(test) {
  const playerManager = new PlayerManager();
  const socket1 = {id: 123};
  const socket2 = {id: 456};
  playerManager.addPlayer(socket1);
  playerManager.addPlayer(socket2);
  test.equal(playerManager.getPlayer(socket1).socket.id, 123);
  test.equal(playerManager.getPlayer(socket2).socket.id, 456);

  const newSocket = {id: 789};
  playerManager.getPlayer(socket1).socket = newSocket;
  test.ok(playerManager.getPlayer(newSocket));
  test.equal(playerManager.getPlayer(newSocket).socket, newSocket);
  test.done();
};

exports['initializeJudePlayer sets the judge player to the first player'] = function(test) {
  const playerManager = new PlayerManager();
  const socket1 = {id: 123};
  const socket2 = {id: 456};
  playerManager.addPlayer(socket1);
  playerManager.addPlayer(socket2);
  playerManager.initializeJudgePlayer();

  test.ok(playerManager.judgePlayer);
  test.equal(playerManager.judgePlayer.socket.id, 123);
  test.equal(playerManager.answeringPlayers.length, 1);
  test.done();
};

exports["rotateToNextPlayer swaps out the next player to be the judge each time it's called"] = function(test) {
  const playerManager = new PlayerManager();
  const socket1 = {id: 123};
  const socket2 = {id: 456};
  const socket3 = {id: 789};
  playerManager.addPlayer(socket1);
  playerManager.addPlayer(socket2);
  playerManager.addPlayer(socket3);
  playerManager.initializeJudgePlayer();

  test.equal(playerManager.judgePlayer.socket.id, 123);
  test.equal(playerManager.answeringPlayers.length, 2);
  test.equal(playerManager.answeringPlayers[0].socket.id, 456);
  test.equal(playerManager.answeringPlayers[1].socket.id, 789);

  playerManager.rotateToNextJudgePlayer();

  test.equal(playerManager.judgePlayer.socket.id, 456);
  test.equal(playerManager.answeringPlayers.length, 2);
  test.equal(playerManager.answeringPlayers[0].socket.id, 123);
  test.equal(playerManager.answeringPlayers[1].socket.id, 789);

  playerManager.rotateToNextJudgePlayer();

  test.equal(playerManager.judgePlayer.socket.id, 789);
  test.equal(playerManager.answeringPlayers.length, 2);
  test.equal(playerManager.answeringPlayers[0].socket.id, 123);
  test.equal(playerManager.answeringPlayers[1].socket.id, 456);

  playerManager.rotateToNextJudgePlayer();

  test.equal(playerManager.judgePlayer.socket.id, 123);
  test.equal(playerManager.answeringPlayers.length, 2);
  test.equal(playerManager.answeringPlayers[0].socket.id, 456);
  test.equal(playerManager.answeringPlayers[1].socket.id, 789);

  test.done();
};