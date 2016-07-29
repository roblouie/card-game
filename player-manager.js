'use strict';

module.exports = class PlayerManager {
  constructor() {
    this.players = [];
  }

  addPlayer(socket, username) {
    this.players.push({socket: socket, username: username});
    console.log(this.players.length);
  }

  removePlayer(socket) {
    this.players = this.players.filter(player => player.socket.id !== socket.id);
    console.log(this.players.length);
  }

  getPlayer(socket) {
    return this.players.find(player => player.socket.id = socket.id);
  }

  initializeJudgePlayer() {
    this.judgePlayer = this.players[0];
  }

  get answeringPlayers() {
    if (!this.judgePlayer) this.initializeJudgePlayer();
    return this.players.filter(player => player.socket.id !== this.judgePlayer.socket.id);
  }

  isJudgePlayer(socket) {
    return this.judgePlayer !== undefined && this.judgePlayer.socket.id === this.getPlayer(socket).socket.id;
  }

  rotateToNextJudgePlayer() {
    if (!this.judgePlayer) {
      this.initializeJudgePlayer();
      return;
    }

    this.judgePlayer = this.rotateToNextPlayer()
  }

  rotateToNextPlayer() {
    const currentJudgeIndex = this.players.findIndex((player => player.socket.id === this.judgePlayer.socket.id));
    return currentJudgeIndex < this.players.length - 1 ? this.players[currentJudgeIndex + 1] : this.players[0];
  }
};
