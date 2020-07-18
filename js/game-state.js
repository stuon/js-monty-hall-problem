"use strict";

function gameState() {
  this.score = 0;
  this.round = 0;
  this.gameSamples = [];
  this.chosenFirstDoor = false;
  this.currentDoorChosen = 0;
  this.doorShown = 0;
  this.roundFinished = false;
  this.autoRun = false;
}

gameState.prototype.init = function () {
  this.clear(true);
};

gameState.prototype.clear = function (resetAll = false) {
  if (resetAll) {
    this.score = 0;
    this.round = 0;
    this.autoRun = false;

    // Generate game for user, so we know we aren't cheating
    this.gameSamples = [];
    for (let i = 0; i < SAMPLES; i++) {
      let carIndex = getRndInteger(0, 2);
      this.gameSamples[i] = carIndex;
    }
  }

  this.gameBoard = 0;
  this.scoreBoard = 0;
  this.chosenFirstDoor = false;
  this.currentDoorChosen = 0;
  this.doorShown = 0;
  this.roundFinished = false;
  this.autoRun = false;
};

gameState.prototype.FinishRound = function () {
  if (
    this.chosenFirstDoor &&
    this.currentDoorChosen == this.gameSamples[this.round]
  ) {
    this.score++;
  }
  this.round++;
};
