'use strict';

var _         = require('lodash-node'),
    format    = require('wheatley-formatters');

exports.index = function (req, res) {
  res.render('settings/index');
};

/*
 * GET system information
 */

exports.system = function (req, res) {

  var sysinfo = require('../../core/utility/system');

  sysinfo = _.clone(sysinfo.systemInfo());
  sysinfo.totalmem = format.bytes(sysinfo.totalmem);
  sysinfo.clockSpeed = format.frequency(sysinfo.clockSpeed);

  res.render('settings/system', {
    sysinfo: sysinfo,
    software: sysinfo.software
  });
};