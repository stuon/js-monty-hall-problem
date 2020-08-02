"use strict";

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
}

doorComponent.prototype.reset = function (hasCar) {
  this.hasCar = hasCar;
  this.opened = false;
  this.selected = false;
  this.update(true);
};

doorComponent.prototype.select = function (value) {
  this.selected = value;
  this.update(false);
};

doorComponent.prototype.open = function () {
  this.opened = true;
  this.update(false);
};

doorComponent.prototype.update = function (resetTitle) {
  const ctx = gameBoard.context;

  if (resetTitle) {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "16px Verdana";
    const doorTitle = `Door ${this.id + 1}`; // One offset for display
    ctx.fillText(doorTitle, this.x + this.width / 2, this.y);
  }
  if (this.opened) {
    if (this.hasCar) {
      ctx.fillStyle = "yellow"; // car
    } else {
      ctx.fillStyle = "orange"; // goat
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

  ctx.textAlign = "center";
  let doorContent = "";
  if (this.opened) {
    ctx.fillStyle = "black";
    ctx.font = "16px Verdana";
    doorContent = this.hasCar ? "Car" : "Goat";
  } else {
    ctx.fillStyle = "white";
    ctx.font = "16px Verdana";
    doorContent = "?";
  }

  ctx.fillText(doorContent, this.x + this.width / 2, this.y + this.height / 2);
};
