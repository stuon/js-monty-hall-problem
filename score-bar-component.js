"use strict";

function scoreBarComponent(color, x, y, x2, y2) {
  this.x = x;
  this.y = y;
  this.x2 = x2;
  this.y2 = y2;
  this.color = color;
  this.updateScore = function (score, round) {
    const ctx = gameBoard.context;
    ctx.fillStyle = this.color;
    ctx.textAlign = "left";
    ctx.font = "16px Verdana";

    ctx.clearRect(0, 0, this.x + 400, this.y + 30); // buffers to cover text print

    const percent = round === 0 ? 0 : ((100 * score) / round).toFixed(2);
    const text = "Score: " + score + " / " + round + " ( " + percent + "%)";
    ctx.fillText(text, this.x, this.y);
  };
}
