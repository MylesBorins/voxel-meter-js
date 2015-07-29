'use strict';

// Famous dependencies
var FamousEngine = require('famous/core/FamousEngine');
var Camera = require('famous/components/Camera');

var VUSpec = require('./VUSpec');

// Boilerplate code to make your life easier
FamousEngine.init();

// setup famous
var scene = FamousEngine.createScene('body');
var camera = new Camera(scene).setDepth(1000);
var vu = new VUSpec(scene);
