function doorComponent(id, width, height, color, x, y) {
  this.id = id;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.opened = false;
  this.selected = false;
  this.hasCar = false;
  this.color = color;

  this.reset = function (hasCar) {
    this.hasCar = hasCar;
    this.opened = false;
    this.selected = false;
    this.update();
  };

  this.select = function (value) {
    this.selected = value;
    this.update();
  };

  this.open = function () {
    this.opened = true;
    this.update();
  };

  this.update = function () {
    const ctx = gameBoard.context;

    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "16px Verdana";
    const doorTitle = "Door " + id;
    ctx.fillText(doorTitle, this.x + this.width / 2, this.y);

    if (this.opened) {
      if (this.hasCar) {
        ctx.fillStyle = "yellow"; // car
      } else {
        ctx.fillStyle = "red"; // goat
      }
    } else {
      ctx.fillStyle = this.color;
    }

    ctx.fillRect(this.x, this.y + 20, this.width, this.height);

    if (this.selected) {
      ctx.strokeStyle = "black";
    } else {
      ctx.strokeStyle = ctx.fillStyle;
    }

    ctx.lineWidth = 10;
    ctx.strokeRect(this.x, this.y + 20, this.width, this.height);
  };
}
