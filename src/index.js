'use strict';

// Famous dependencies
var FamousEngine = require('famous/core/FamousEngine');
var Camera = require('famous/components/Camera');

var VUSpec = require('./VUSpec');

// Boilerplate code to make your life easier
FamousEngine.init();

// setup famous
var scene = FamousEngine.createScene('body');
window.camera = new Camera(scene).setDepth(1000);
window.vu = new VUSpec(scene, {
  width: 32,
  height: 16,
  boxSize: 30,
  ceil: 0.7,
  decay: 0
});
