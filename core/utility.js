'use strict';

var sysinfo   = require('./utility/sysinfo');

/**
 * Kicks off the core utility bootstrapping
 * @return {[type]} [description]
 */
exports.start = function () {
  console.log('[Utility - start]: starting utility');
  console.log('[Utility - start]: system info', sysinfo.systemInfo());
};