
'use strict';

var _         = require('lodash-node'),
    util      = require('util'),
    os        = require('os'),
    pjson     = require('../../package.json');

/**
 * System Information Object
 * @return {[sysinfo]} [system information object]
 */
var sysinfo = function () {
  this.arch       = os.arch();
  this.clockSpeed = this.clockSpeed();
  this.cpu        = this.cpu();
  this.freemem    = os.freemem();
  this.hostname   = os.hostname();
  this.numCpus    = this.numCpus();
  this.platform   = os.platform();
  this.release    = os.release();
  this.totalmem   = os.totalmem();
  this.type       = os.type();
  this.ifaces     = exports.networkInterfaces();
  this.software   = exports.software();
};

sysinfo.prototype.toString = function () {
  return util.format('%s (%s) %s', this.type, this.arch, this.release);
};

sysinfo.prototype.clockSpeed = function () {
  return os.cpus()[0].speed;
};

sysinfo.prototype.cpu = function () {
  return os.cpus()[0].model;
};

sysinfo.prototype.numCpus = function () {
  return os.cpus().length;
};

/**
 * Retreives all network interfaces on the host device, map to a usable array
 * @return [{[string]: [object]}] [an array of network interfaces]
 */
exports.networkInterfaces = function () {

  var ifaces = [];

  _.forIn(os.networkInterfaces(), function (value, key) {
    ifaces.push({
      'uuid': key,
      'addresses': value
    });
  });

  return ifaces;
};


/**
 * Retrieves system information about the host device
 * @return {[type]} [description]
 * @todo  retrieve data to plot to a chart (freemem, loadavg, etc.)
 */
exports.systemInfo = function () {
  return new sysinfo();
};

exports.software = function () {
  return {
    name    : pjson.name,
    version : pjson.version
  };
};