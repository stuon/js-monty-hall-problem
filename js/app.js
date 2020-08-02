"use strict";

const DOOR_COUNT = 3; // number of doors
const SAMPLES = 10000; // number of pre-calculated samples

const app = (function (gameBoard, gameState, scoreBarComponent) {
  const getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  function repeatXI(callback, interval, repeats, immediate) {
    var timer, trigger;
    trigger = function () {
      callback();
      --repeats || clearInterval(timer);
    };

    interval = interval <= 0 ? 1000 : interval; // default: 1000ms
    repeats = parseInt(repeats, 10) || 0; // default: repeat forever
    timer = setInterval(trigger, interval);

    if (!!immediate) {
      // Coerce boolean
      trigger();
    }
  }

  function nextRound() {
    if (!gameState.chosenFirstDoor && !gameState.roundFinished) {
      alert("Please choose a door first");
      return;
    }
    finish();
    createNewGame(false);
  }

  function runSimulation(runs, switchDoor) {
    if (gameState.chosenFirstDoor) {
      nextRound();
    }

    repeatXI(
      switchDoor ? playGameAutomaticallyWithSwitch : playGameAutomatically,
      20 /* wait time */,
      runs
    );
  }

  function playGameAutomaticallyWithSwitch() {
    createNewGame(false);
    gameState.autoRun = true;
    var choice = getRndInteger(0, 2);
    chooseDoor(choice, true);
    finish();

    gameState.autoRun = false;
  }

  function playGameAutomatically() {
    createNewGame(false);
    gameState.autoRun = true;
    var choice = getRndInteger(0, 2);
    chooseDoor(choice, false);
    finish();

    gameState.autoRun = false;
  }

  function chooseDoor(num, switchDoor) {
    if (gameState.round >= SAMPLES) {
      alert("You've reach the maximum number of games");
      return;
    }

    if (gameState.roundFinished) {
      alert(
        "You cannot select a new door once you've finished. Please select 'next round' or 'restart'"
      );
      return;
    }

    let firstChoose = false;
    if (gameState.chosenFirstDoor === false) {
      gameState.currentDoorChosen = num;
      gameState.chosenFirstDoor = true;
      firstChoose = true;
    } else {
      // Picking again

      if (num === gameState.doorShown) {
        alert("You cannot select the shown door. Please select another");
        return;
      }
      gameState.currentDoorChosen = num;
    }

    for (let i = 0; i < DOOR_COUNT; i++) {
      gameBoard.doors[i].select(num === i);
    }

    if (!gameState.autoRun || switchDoor) {
      // choose another doors at random that isn't success to open for user
      if (firstChoose) {
        let chooses = [];
        for (let i = 0; i < DOOR_COUNT; i++) {
          if (i === gameState.currentDoorChosen) continue;
          if (i === gameState.gameSamples[gameState.round]) continue;
          chooses.push(i);
        }

        const choiceIndex = getRndInteger(0, chooses.length - 1);
        gameState.doorShown = chooses[choiceIndex];

        if (gameState.autoRun) {
          gameBoard.doors[gameState.doorShown].open(true);
        } else {
          setTimeout(function () {
            gameBoard.doors[gameState.doorShown].open(true);
          }, 500); // show small delay to let user get feedback
        }

        if (switchDoor) {
          gameBoard.selectDoor(-1 /*deselect all doors*/);

          for (let i = 0; i < DOOR_COUNT; i++) {
            if (i === gameState.currentDoorChosen) continue;
            if (i === gameState.doorShown) continue;

            gameState.currentDoorChosen = i;
            gameBoard.doors[i].select(true);
            break;
          }
        }
      }
    }
  }

  function finish() {
    if (gameState.roundFinished) return;

    gameBoard.openDoors();
    gameState.finishRound();

    scoreBarComponent.updateScore(gameState.score, gameState.round);
    gameState.roundFinished = true;
  }

  function createNewGame(clearScore) {
    gameState.clear(clearScore);
    gameBoard.clear(gameState.gameSamples[gameState.round]);
    scoreBarComponent.updateScore(gameState.score, gameState.round);
  }

  function setupEventListeners() {
    document.getElementById("restart").onclick = function () {
      var r = confirm("Do you want to restart a new game?");
      if (r !== true) return;

      createNewGame(true);
    };

    document.getElementById("door-1").onclick = function () {
      chooseDoor(0, false);
    };

    document.getElementById("door-2").onclick = function () {
      chooseDoor(1, false);
    };

    document.getElementById("door-3").onclick = function () {
      chooseDoor(2, false);
    };

    document.getElementById("finish").onclick = function () {
      if (gameState.roundFinished) return;

      gameBoard.openDoors();
      gameState.finishRound();

      scoreBarComponent.updateScore(gameState.score, gameState.round);
      gameState.roundFinished = true;
    };

    document.getElementById("next-round").onclick = function () {
      nextRound();
    };

    document.getElementById("run-simulation").onclick = function () {
      let runCount = Number.parseInt(
        document.getElementById("simulation-runs").value
      );

      let useSwitchMethod = document.getElementById(
        "option-simulation-method-switch"
      ).checked;

      if (!Number.isInteger(runCount) || runCount < 10 || runCount > 10000) {
        alert("Please enter number between 10 and 10000 for simulation runs");
        return;
      }

      runSimulation(runCount, useSwitchMethod);
    };
  }

  return {
    newGame: function (clearScore) {
      createNewGame(clearScore);
    },
    init: function () {
      gameBoard.init(document, DOOR_COUNT);
      gameState.init();
      scoreBarComponent.init(gameBoard, "black", 40, 40, 480, 80);

      gameBoard.start();
      createNewGame(true);

      setupEventListeners();
    },
  };
})(gameBoard, gameState, scoreBarComponent);

app.init();
