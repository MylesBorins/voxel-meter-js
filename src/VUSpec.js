'use strict';

var Grid = require('./Grid');

function VUSpec(scene, options) {
  if (!options) { options = {}; }
  var i, j;

  this.width = options.width || 8;
  this.height = options.height || 8;
  
  this.alphas = [];
  this.prevAlphas = [];
  
  for (i = 0; i < this.width; i ++) {
    this.alphas.push([]);
    this.prevAlphas.push([]);
    for (j = 0; i < this.height; j++) {
      this.alphas[i].push(0);
      this.prevAlphas[i].push(0);
    }
  }
  
  this.node = scene.addChild()
    .setOrigin(0.5, 0.5, 0.5)
    .setAlign(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setSizeMode(1, 1, 1);
    
  this.grid = new Grid(this.node);
  
  var colors = [];

  for (i = 0; i < this.width; i ++) {
    colors.push([0, 0, 0]);
    colors[i][0] = (0 + (1 / this.height * i)) * 255;
    colors[i][1] = (1 - (1 / this.height * i)) * 255;
  }

  for (i = 0; i < this.width; i ++) {
    this.grid.setColumnColor(i, colors);
  }

  return this;
}

module.exports = VUSpec;
