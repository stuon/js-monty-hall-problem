"use strict";

function gameBoard(document) {
  this.canvas = document.createElement("canvas");

  this.start = function () {
    this.canvas.width = 640;
    this.canvas.height = 360;
    this.context = this.canvas.getContext("2d");
    var game = document.getElementById("game");
    game.insertBefore(this.canvas, game.childNodes[0]);
  };

  this.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}
