'use strict';

var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color');

function Box(scene) {
  this.node = scene.addChild()
    .setOrigin(0.5, 0.5, 0.5)
    .setAlign(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setSizeMode(1, 1, 1)
    .setAbsoluteSize(50, 50, 50);

  this.mesh = new Mesh(this.node).setGeometry('Box');
  this.color = new Color('grey');
  this.mesh.setBaseColor(this.color);
  return this;
}

Box.prototype.setColor = function (rgb) {
  this.color.setRGB(rgb[0], rgb[1], rgb[2]);
  this.mesh.setBaseColor(this.color);
};

Box.prototype.setAlpha = function (alpha) {
  this.node.setOpacity(alpha);
};

Box.prototype.setPosition = function(x, y, z) {
  this.node.setPosition(x, y, z);
}

module.exports = Box;
