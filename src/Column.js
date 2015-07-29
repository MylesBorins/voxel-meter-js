'use strict';

var Box = require('./Box');

function Column(scene, height) {
  this.node = scene.addChild()
    .setOrigin(0.5, 0.5, 0.5)
    .setAlign(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setheightMode(1, 1, 1);

  this.children = [];
  
  var i;
  
  if (!height) {
    height = 8;
  }
  
  for (i = 0; i <= height; i++) {
    this.children.push(new Box(this.node));
    this.children[i].setPosition(0, height * 50 / 2 - 50 * i, 0);
  }
  
  return this;
}

Column.prototype.setColors = function (colors) {
  if (colors.length !== this.children.length) { return; }
  for (var i = 0; i <= colors.length; i++) {
    this.children[i].setColor(colors[i]);
  }
};

Column.prototype.setAlphas = function (alphas) {
  if (alphas.length !== this.children.length) { return; }
  for (var i = 0; i <= alphas.length; i++) {
    this.children[i].setAlpha(alphas[i]);
  }
};

module.exports = Column;