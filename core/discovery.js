'use strict';

var bonjour         = require('./discovery/bonjour'),
    sysinfo         = require('./utility/system'),
    moment          = require('moment');

/**
 * Search the entire network on all available interfaces if we can find compatible devices
 * @return {[type]} [description]
 */
exports.start = function () {

  console.log('discovery started at', moment().format('X'));

  var ifaces = sysinfo.networkInterfaces(); // check for network interface first
  console.log('discovering network interfaces, found', ifaces.length);

  if (ifaces !== undefined || ifaces.length !== 0) return;

  var bonjourDevices = bonjour.discover();
  console.log(bonjourDevices);

};