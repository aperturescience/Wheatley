'use strict';

var sysinfo   = require('../core/utility/system'),
    io        = require('socket.io-client'),
    settings  = require('../config/settings.json'),
    socket;

exports.connect = function () {

  socket = io.connect(settings.remote.url + ':' + settings.remote.port || 80);

  sysinfo.systemInfo(function (info) {
    console.log('[connect]: uploading system information');
    socket.emit('wheatley.sysinfo', info);
  });

};