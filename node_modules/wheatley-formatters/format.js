'use strict';

var util = require('util');

/**
 * This function will convert any given number of bytes into a human readable string
 * @param  {[int]} bytes  Any number of bytes
 * @param   {bool} abbr   True if you want to use abbreviations (default) false for full name
 * @return {[string]}     A human readable string of byte size
 */
exports.bytes = function (bytes, abbr) {

  abbr = typeof abbr === 'undefined' ? true : false;
  var sizes = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (!abbr) sizes = [
      'bytes', 'kilobytes', 'megabytes', 'gigabytes',
      'terabytes', 'petabytes', 'exabytes', 'zettabytes', 'yottabytes'
    ];

  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return util.format('%s %s', (bytes / Math.pow(1024, i)).toFixed(2), sizes[i]);
};

/**
 * This function will convert any given frequenty (in megahertz) to a human readable format
 * @return {[megahertz]} Any frequency in megahertz
 */
exports.frequency = function (megahertz, abbr) {

  abbr = typeof abbr === 'undefined' ? true : false;
  var frequencies = ['MHz', 'GHz', 'THz', 'PHz'];

  if (!abbr) frequencies = [
      'megahertz', 'gigahertz', 'terahertz', 'petahertz',
    ];

  var i = parseInt(Math.floor(Math.log(megahertz) / Math.log(1000)));
  return util.format('%s %s', (megahertz / Math.pow(1000, i)).toFixed(2), frequencies[i]);
};