"use strict";

const scoreBarComponent = (function () {
  let x = 0;
  let y = 0;
  let x2 = 0;
  let y2 = 0;
  let color = "";
  let gameBoard = null;

  return {
    init: function (gameBoard, color, x, y, x2, y2) {
      this.gameBoard = gameBoard;
      this.x = x;
      this.y = y;
      this.x2 = x2;
      this.y2 = y2;
      this.color = color;
    },
    updateScore: function (score, round) {
      const ctx = this.gameBoard.context;
      ctx.fillStyle = this.color;
      ctx.textAlign = "left";
      ctx.font = "16px Verdana";

      ctx.clearRect(0, 0, this.x + 400, this.y + 30); // buffers to cover text print

      const percent = round === 0 ? 0 : ((100 * score) / round).toFixed(2);
      const text = "Score: " + score + " / " + round + " ( " + percent + "%)";
      ctx.fillText(text, this.x, this.y);
    },
  };
})();
