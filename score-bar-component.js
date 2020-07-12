function scoreBarComponent(color, x, y) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.updateScore = function (score, round) {
    const ctx = gameBoard.context;
    ctx.fillStyle = this.color;
    ctx.textAlign = "left";
    ctx.font = "16px Verdana";
    text = "Score: " + score + " / " + round;
    ctx.fillText(text, this.x, this.y);
  };
}
