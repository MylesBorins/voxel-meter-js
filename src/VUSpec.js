'use strict';

var Grid = require('./Grid');
var Aud = require('./Audio');

function VUSpec(scene, options) {
  if (!options) {
    options = {};
  }

  var i;
  var j;

  this.node = scene.addChild()
    .setOrigin(0.5, 0.5, 0.5)
    .setAlign(0.5, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setSizeMode(1, 1, 1);
    
  this.id = this.node.addComponent(this);
  this.width = options.width || 8;
  this.height = options.height || 8;
  this.boxSize = options.boxSize || 25;
  this.ceil = options.ceil || 0.6;
  this.decay = options.decay || 0.8;
  
  this.grid = new Grid(this.node, {
    height: this.height,
    width: this.width,
    boxSize: this.boxSize
  });

  this.audio = new Aud();

  this.alphas = [];
  this.prevAlphas = [];
 
  for (i = 0; i < this.width; i ++) {
    this.alphas.push([]);
    this.prevAlphas.push([]);
    for (j = 0; j < this.height; j++) {
      this.alphas[i].push(0);
      this.prevAlphas[i].push(0);
    }
  }

  var colors = [];

  for (i = 0; i < this.width; i ++) {
    colors.push([0, 0, 0]);
    colors[i][0] = (0 + (1 / this.height * i)) * 255;
    colors[i][1] = (1 - (1 / this.height * i)) * 255;
  }

  for (i = 0; i < this.width; i ++) {
    this.grid.setColumnColor(i, colors);
  }
  
  for (i = 0; i < this.width; i ++) {
    this.grid.setColumnAlpha(i, this.alphas[i]);
  }
  
  this.node.requestUpdate(this.id);

  return this;
}

VUSpec.prototype.setColumnAlpha = function (fftVal, bin) {
  var segment = this.ceil / this.height;
  
  for (var i = 0; i < this.height; i++) {
    fftVal -= segment;
    if (fftVal >= segment) {
      this.alphas[bin][i] = 1;
    }
    else if (fftVal >= 0) {
      this.alphas[bin][i] = fftVal / segment;
    }
    else {
      this.alphas[bin][i] = 0;
    }
    this.alphas[bin][i] = this.alphas[bin][i] + this.prevAlphas[bin][i];
    this.prevAlphas[bin][i] = this.alphas[bin][i] * this.decay;
  }
  this.alphas[bin].reverse();
};

VUSpec.prototype.onUpdate = function (time) {
  var i, j;
  var fft = this.audio.getFFT();
  var freqs = [];
  var value;
  for (i = 0; i < fft.length; i++) {
    value = fft[i];
    freqs.push(value / 256);
  }
  
  var blockSize = freqs.length / this.width;
  var blocks = [];
  
  for (i = 0; i < this.width; i++) {
    blocks.push([]);
    blocks[i] = 0;
    for (j = 0; j < blockSize; j++) {
      blocks[i] += freqs[j + i * blockSize];
    }
    blocks[i] /= blockSize;
  }

  blocks.reverse();

  for (i = 0; i < this.width; i++) {
    this.setColumnAlpha(blocks[i], i);
    this.grid.setColumnAlpha(i, this.alphas[i]);
  }

  this.node.setRotation(
    Math.sin(time / 1500) * 0.2,
    Math.sin(time / 750) * 0.2,
    Math.sin(time / 3000) * 0.2
  );

  this.node.requestUpdateOnNextTick(this.id);
};

module.exports = VUSpec;
