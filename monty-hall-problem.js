"use strict";

const DOOR_WIDTH = 120;
const DOOR_HEIGHT = 160;
const DOOR_COLOR = "green";
const DOOR_COUNT = 3;

var score = 0;
var round = 0;
const SAMPLES = 10000;

var gameBoard;
var scoreBoard;
var doors = Array(DOOR_COUNT);
var gameSamples = [];
var chosenFirstDoor = false;
var currentDoorChosen = 0;
var doorShown = 0;
var roundFinished = false;
var autoRun = false;

function startGame() {
  gameBoard = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = 640;
      this.canvas.height = 480;
      this.context = this.canvas.getContext("2d");
      var game = document.getElementById("game");
      game.insertBefore(this.canvas, game.childNodes[0]);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  };

  gameBoard.start();
  scoreBoard = new scoreBarComponent("black", 40, 40, 640, 80);

  for (let i = 0; i < DOOR_COUNT; i++) {
    doors[i] = new doorComponent(
      i,
      DOOR_WIDTH,
      DOOR_HEIGHT,
      DOOR_COLOR,
      70 + i * (70 + DOOR_WIDTH),
      100
    );
  }

  createNewGame(true);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function createNewGame(clearScore) {
  if (clearScore) {
    score = 0;
    round = 0;
    gameSamples = [];
    autoRun = false;

    // Generate game for user, so we know we aren't cheating
    for (let i = 0; i < SAMPLES; i++) {
      let carIndex = getRndInteger(0, 2);
      gameSamples[i] = carIndex;
    }
  }

  doorShown = 0;
  currentDoorChosen = 0;
  chosenFirstDoor = false;
  roundFinished = false;

  gameBoard.clear();
  scoreBoard.updateScore(score, round);

  for (let i = 0; i < DOOR_COUNT; i++) {
    doors[i].reset(i === gameSamples[round]);
  }
}

function chooseDoor(num) {
  if (round >= SAMPLES) {
    alert("You've reach the maximum number of games");
    return;
  }

  if (roundFinished) {
    alert(
      "You cannot select a new door once you've finished. Please select 'next round' or 'restart'"
    );
    return;
  }

  var firstChoose = false;
  if (chosenFirstDoor === false) {
    currentDoorChosen = num;
    chosenFirstDoor = true;
    firstChoose = true;
  } else {
    // Picking again

    if (num === doorShown) {
      return;
    }
    currentDoorChosen = num;
  }

  for (let i = 0; i < DOOR_COUNT; i++) {
    doors[i].select(num === i);
  }

  if (!autoRun) {
    // choose another doors at random that isn't success to open for user
    if (firstChoose) {
      let chooses = [];
      for (let i = 0; i < DOOR_COUNT; i++) {
        if (i === currentDoorChosen) continue;
        if (i === gameSamples[round]) continue;
        chooses.push(i);
      }

      let choiceIndex = getRndInteger(0, chooses.length - 1);
      doorShown = chooses[choiceIndex];

      setTimeout(function () {
        doors[doorShown].open(true);
      }, 500);
      //  doors[doorShown].open(true);
    }
  }
}

function restart() {
  var r = confirm("Do you want to restart a new game?");
  if (r !== true) return;

  createNewGame(true);
}

function door1() {
  chooseDoor(0);
}

function door2() {
  chooseDoor(1);
}

function door3() {
  chooseDoor(2);
}

function finish() {
  if (roundFinished) return;
  for (let i = 0; i < DOOR_COUNT; i++) {
    doors[i].open();
  }

  if (chosenFirstDoor && currentDoorChosen == gameSamples[round]) {
    score++;
  }
  round++;

  scoreBoard.updateScore(score, round);
  roundFinished = true;
}

function nextRound() {
  finish();
  createNewGame(false);
}

function runSimulation(runs) {
  if (chosenFirstDoor) {
    nextRound();
  }

  repeatXI(playGameAutomatically, 20 /* wait time */, runs);
}

function playGameAutomatically() {
  createNewGame(false);
  autoRun = true;
  var choice = getRndInteger(0, 2);
  chooseDoor(choice);
  finish();

  autoRun = false;
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
