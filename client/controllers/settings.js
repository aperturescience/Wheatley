'use strict';

var format    = require('wheatley-formatters');

exports.index = function (req, res) {
  res.render('settings/index');
};

/*
 * GET system information
 */

exports.system = function (req, res) {

  var sysinfo = require('../../core/utility/system');

  sysinfo.systemInfo(function renderPage(info) {

    info.totalmem = format.bytes(info.totalmem);
    info.clockSpeed = format.frequency(info.clockSpeed);

    res.render('settings/system', {
      sysinfo: info,
      software: info.software
    });

  });

};