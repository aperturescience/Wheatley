'use strict';

var sysinfo   = require('../../core/utility/sysinfo'),
    _         = require('lodash-node'),
    format   = require('wheatley-formatters');

/*
 * GET system information
 */

var sysinfo = _.clone(sysinfo.systemInfo());
sysinfo.totalmem = format.bytes(sysinfo.totalmem);
sysinfo.clockSpeed = format.frequency(sysinfo.clockSpeed);

exports.system = function (req, res) {
  res.render('settings/system', {
    sysinfo: sysinfo,
    software: sysinfo.software
  });
};