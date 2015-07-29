'use strict';

var Grid = require('./Grid');

function VUSpec(scene, options) {
  if (!options) { options = {}; }

  this.width = options.width || 8;
  this.height = options.height || 8;

  this.node = scene.addChild()
    .setOrigin(0.5, 0.5, 0.5)
    .setAlign(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setSizeMode(1, 1, 1);
    
  this.grid = new Grid(this.node);
  
  var colors = [];
  for (var i = 0; i < this.width; i ++) {
    colors.push([0,0,0]);
    colors[i][0] = 0 + (1 / this.height * i);
    colors[i][1] = 1 - (1 / this.height * i);
  }
  for (var i = 0; i < this.width; i ++) {
    // this.grid.setColumnColor(i, colors);
  }
  
  return this;
}

module.exports = VUSpec;
