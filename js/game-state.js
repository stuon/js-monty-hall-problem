"use strict";

function gameState() {
  this.score = 0;
  this.round = 0;
  this.doors = Array(DOOR_COUNT);
  this.gameSamples = [];
  this.chosenFirstDoor = false;
  this.currentDoorChosen = 0;
  this.doorShown = 0;
  this.roundFinished = false;
  this.autoRun = false;

  this.init = function () {
    for (let i = 0; i < DOOR_COUNT; i++) {
      this.doors[i] = new doorComponent(
        i,
        DOOR_WIDTH,
        DOOR_HEIGHT,
        DOOR_COLOR,
        70 + i * (70 + DOOR_WIDTH),
        100
      );
    }
    this.clear(true);
  };

  this.clear = function (clearScore = false) {
    if (clearScore) {
      this.score = 0;
      this.round = 0;
      this.gameSamples = [];
      this.autoRun = false;

      // Generate game for user, so we know we aren't cheating
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

    for (let i = 0; i < DOOR_COUNT; i++) {
      this.doors[i].reset(i === this.gameSamples[this.round]);
    }
  };
}
