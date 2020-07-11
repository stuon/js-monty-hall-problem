const DOOR_WIDTH = 150;
const DOOR_HEIGHT = 240;
const DOOR_SPACE = 80;
const COLOR_LIGHT_BLUE = "#cce6ff";

var canvas = document.getElementById("canvas");

function drawGame() {
  var ctx = canvas.getContext("2d");
  nextGame(ctx);
}

function drawDoor(ctx, x, y) {
  ctx.beginPath();
  ctx.rect(x, y, DOOR_WIDTH, DOOR_HEIGHT);
  ctx.fillStyle = COLOR_LIGHT_BLUE;
  ctx.fill();
}

function nextGame(ctx) {
  for (i = 0; i < 3; i++) {
    drawDoor(ctx, i * (DOOR_WIDTH + DOOR_SPACE) + DOOR_SPACE, 50);
  }
}

function reset() {
  alert("reset");
}

function openDoor1() {
  alert("door 1");
}

function openDoor2() {
  alert("door 2");
}

function openDoor3() {
  alert("door 3");
}
