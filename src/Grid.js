'use strict';

var Box = require('./Box');

function calcPos(dimension, count) {
  return dimension * 50 / 2 - 50 * count;
}

function Grid(scene, options) {
  if (!options) { options = {}; }

  this.width = options.width || 8;
  this.height = options.height || 8;

  this.node = scene.addChild()
    .setOrigin(0.5, 0.5, 0.5)
    .setAlign(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setSizeMode(1, 1, 1);

  this.children = [];
  
  var i, j, posX, posY;

  for (i = 0; i <= this.width; i++) {
    this.children.push([]);
    for (j = 0; j <= this.height; j++) {
      posX = calcPos(this.width, i);
      posY = calcPos(this.height, j);
      this.children[i].push(new Box(this.node));
      this.children[i][j].setPosition(posX, posY, 0);
    }
  }
  
  return this;
}

Grid.prototype.setBlockColor = function (x, y, color) {
  this.children[x][y].setColor(color);
};

Grid.prototype.setBlockAlpha = function (x, y, alpha) {
  this.children[x][y].setAlpha(alpha);
};

Grid.prototype.setColumnColor = function (column, colors) {
  for (var i = 0; i <= this.height; i++) {
    this.children[column][i].setColor(colors[i]);
  }
};

Grid.prototype.setColumnAlpha = function (column, alphas) {
  for (var i = 0; i <= this.height; i++) {
    this.children[column][i].setAlpha(alphas[i]);
  }
};

module.exports = Grid;
