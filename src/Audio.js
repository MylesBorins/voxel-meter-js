'use strict';

function wireMic(audioContext, analyzer) {
  function gotStream(stream) {
    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect it to the destination to hear yourself (or any other node for processing!)
    mediaStreamSource.connect(analyzer);
  }

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  navigator.getUserMedia({audio: true}, gotStream, function (err) {
    console.log(err);
  });
}

function Audio() {
  this.context = new (window.AudioContext || window.webkitAudioContext)();
  this.analyzer = this.context.createAnalyser();
  this.frequencyData = new Uint8Array(256);

  wireMic(this.context, this.analyzer);

  return this;
}

Audio.prototype.getFFT = function () {
  this.analyzer.getByteFrequencyData(this.frequencyData);
  return this.frequencyData;
};

module.exports = Audio;
