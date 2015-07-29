'use strict';

// Famous dependencies
var FamousEngine = require('famous/core/FamousEngine');
var Camera = require('famous/components/Camera');
var Color = require('famous/utilities/Color');

// var Box = require('./Box');
// var Column = require('./Column');
// var Grid = require('./Grid');
var VUSpec = require('./VUSpec');

// Boilerplate code to make your life easier
FamousEngine.init();

var scene = FamousEngine.createScene();
var camera = new Camera(scene).setDepth(1000);
  
var vu = new VUSpec(scene);