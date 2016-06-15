'use strict';

module.exports = class PlayerManager {
  constructor() {
    this.players = [];
  }

  addPlayer(socket) {
    this.players.push({socket: socket});
  }

  removePlayer(socket) {
    this.players = this.players.filter(player => player.socket.id !== socket.id);
  }

  getPlayer(socket) {
    return this.players.find(player => player.socket.id = socket.id);
  }

  initializeJudgePlayer() {
    this.judgePlayer = this.players[0];
  }

  get answeringPlayers() {
    return this.players.filter(player => player.socket.id !== this.judgePlayer.socket.id);
  }

  rotateToNextJudgePlayer() {
    if (!this.judgePlayer) {
      this.initializeJudgePlayer();
      return;
    }

    let index = this.players.findIndex((player => player.socket.id === this.judgePlayer.socket.id));
    this.judgePlayer = index < this.players.length - 1 ? this.players[++index] : this.players[0];
  }
};
