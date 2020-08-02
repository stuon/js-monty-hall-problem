"use strict";

const gameState = (function () {
  let score = 0;
  let round = 0;
  let gameSamples = [];
  let chosenFirstDoor = false;
  let currentDoorChosen = 0;
  let doorShown = 0;
  let roundFinished = false;
  let autoRun = false;

  const getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  return {
    clear: function (resetAll = false) {
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
    },
    init: function () {
      this.clear(true);
    },
    finishRound: function () {
      if (
        this.chosenFirstDoor &&
        this.currentDoorChosen == this.gameSamples[this.round]
      ) {
        this.score++;
      }
      this.round++;
    },
  };
})();
