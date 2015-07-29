'use strict';

var Grid = require('./Grid');
var Aud = require('./Audio');
var DOMElement = require('famous/dom-renderables/DOMElement');
var GestureHandler = require('famous/components/GestureHandler');
var Rotation = require('famous/components/Rotation');

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
  this.width = options.width || 32;
  this.height = options.height || 16;
  
  this.grid = new Grid(this.node, {
    height: this.height,
    width: this.width
  });

  this.grid.rotation = new Rotation(this.node)
  
  this.el = scene.addChild()
  new DOMElement(this.el)

  this.gestures = new GestureHandler(this.el).on('tap', function(e,v){
    this.grid.rotation.set(0,0,2*Math.PI,{duration:1000, curve:'easeOut'}, function(){
       this.grid.rotation.set(0,0,0)
    }.bind(this))
  }.bind(this)) 


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

VUSpec.prototype.setColumnAlpha = function (fftVal, ceil, bin, decay) {
  var segment = ceil / this.height;
  
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
    this.prevAlphas[bin][i] = this.alphas[bin][i] * decay;
  }
  this.alphas[bin].reverse();
};

VUSpec.prototype.onUpdate = function (time) {
  var i, j;
  var fft = this.audio.getFFT();
  var freqs = []
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
    this.setColumnAlpha(blocks[i], 0.55, i, 0.85);
    this.grid.setColumnAlpha(i, this.alphas[i]);
  }

  this.node.requestUpdateOnNextTick(this.id);
};

module.exports = VUSpec;
