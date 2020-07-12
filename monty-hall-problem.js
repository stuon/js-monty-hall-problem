const DOOR_WIDTH = 120;
const DOOR_HEIGHT = 160;
const DOOR_COLOR = "green";
const DOOR_COUNT = 3;

var score = 0;
var round = 0;

var gameBoard;
var scoreBoard;
var doors = Array(DOOR_COUNT);

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
  scoreBoard = new scoreBarComponent("black", 40, 40);

  for (i = 0; i < DOOR_COUNT; i++) {
    doors[i] = new doorComponent(
      i + 1,
      DOOR_WIDTH,
      DOOR_HEIGHT,
      DOOR_COLOR,
      70 + i * (70 + DOOR_WIDTH),
      100
    );
  }

  updateGameArea(true);
}

function doorComponent(id, width, height, color, x, y) {
  this.id = id;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color;
  this.choose = function () {
    ctx = gameBoard.context;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.strokeRect(this.x, this.y + 20, this.width, this.height);
  };
  this.unchoose = function () {
    ctx = gameBoard.context;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 10;
    ctx.strokeRect(this.x, this.y + 20, this.width, this.height);
  };
  this.update = function () {
    ctx = gameBoard.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y + 20, this.width, this.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "16px Verdana";
    text = "Door " + id;
    ctx.fillText(text, this.x + this.width / 2, this.y);

    this.unchoose();
  };
}

function scoreBarComponent(color, x, y) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.updateScore = function (score, round) {
    ctx = gameBoard.context;
    ctx.fillStyle = this.color;
    ctx.font = "16px Verdana";
    text = "Score: " + score + " / " + round;
    ctx.fillText(text, this.x, this.y);
  };
}

function updateGameArea(clearScore) {
  if (clearScore) {
    score = 0;
    round = 0;
  }
  gameBoard.clear();
  scoreBoard.updateScore(score, round);
  for (i = 0; i < DOOR_COUNT; i++) {
    doors[i].update();
  }
}

function chooseDoor(num) {
  for (i = 0; i < DOOR_COUNT; i++) {
    if (num == i) {
      doors[i].choose();
    } else {
      doors[i].unchoose();
    }
  }
}

function restart() {
  updateGameArea(true);
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

function nextRound() {
  round++;
  updateGameArea(false);
}
