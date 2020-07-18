"use strict";

const DOOR_COUNT = 3; // number of doors
const SAMPLES = 10000; // number of pre-calculated samples

var gameBoard;
var scoreBoard;
var gameState;

function startGame() {
  gameBoard = new gameBoard(document, DOOR_COUNT);
  gameState = new gameState();
  scoreBoard = new scoreBarComponent("black", 40, 40, 480, 80);

  gameState.init();
  gameBoard.start();

  createNewGame(true);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function createNewGame(clearScore) {
  gameState.clear(clearScore);
  gameBoard.clear(gameState.gameSamples[gameState.round]);
  scoreBoard.updateScore(gameState.score, gameState.round);
}

function chooseDoor(num, switchdoor) {
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

  if (!gameState.autoRun || switchdoor) {
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

      if (switchdoor) {
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

function restart() {
  var r = confirm("Do you want to restart a new game?");
  if (r !== true) return;

  createNewGame(true);
}

function door1() {
  chooseDoor(0, false);
}

function door2() {
  chooseDoor(1, false);
}

function door3() {
  chooseDoor(2, false);
}

function finish() {
  if (gameState.roundFinished) return;

  gameBoard.openDoors();
  gameState.FinishRound();

  scoreBoard.updateScore(gameState.score, gameState.round);
  gameState.roundFinished = true;
}

function nextRound() {
  if (!gameState.chosenFirstDoor && !gameState.roundFinished) {
    alert("Please choose a door first");
    return;
  }
  finish();
  createNewGame(false);
}

function runSimulation(runs, switchdoor) {
  if (gameState.chosenFirstDoor) {
    nextRound();
  }

  repeatXI(
    switchdoor ? playGameAutomaticallyWithSwitch : playGameAutomatically,
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
