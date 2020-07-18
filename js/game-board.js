"use strict";

const DOOR_WIDTH = 120; // in pixel
const DOOR_HEIGHT = 160; // in pixel
const DOOR_COLOR = "green"; // default color of door

function gameBoard(document, doorCount) {
  this.canvas = document.createElement("canvas");
  this.doorCount = doorCount;
  this.doors = Array(doorCount);
}

gameBoard.prototype.start = function () {
  this.canvas.width = 640;
  this.canvas.height = 360;
  this.context = this.canvas.getContext("2d");
  var game = document.querySelector("#game");
  game.insertBefore(this.canvas, game.childNodes[0]);

  for (let i = 0; i < this.doorCount; i++) {
    this.doors[i] = new doorComponent(
      i,
      DOOR_WIDTH,
      DOOR_HEIGHT,
      DOOR_COLOR,
      70 + i * (70 + DOOR_WIDTH),
      100
    );
  }
};

gameBoard.prototype.clear = function (doorWithCar) {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  for (let i = 0; i < this.doorCount; i++) {
    this.doors[i].reset(i === doorWithCar);
  }
};

gameBoard.prototype.selectDoor = function (doorIndex) {
  for (let i = 0; i < this.doorCount; i++) {
    this.doors[i].select(i === doorIndex);
  }
};

gameBoard.prototype.openDoors = function () {
  for (let i = 0; i < this.doorCount; i++) {
    this.doors[i].open();
  }
};
