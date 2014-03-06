'use strict';

var sysinfo   = require('../core/utility/system'),
    io        = require('socket.io-client'),
    socket;

exports.connect = function () {

  socket = io.connect('http://glados.michiel.io');

  sysinfo.systemInfo(function (info) {
    console.log('[connect]: uploading system information');
    socket.emit('wheatley.sysinfo', info);
  });

};