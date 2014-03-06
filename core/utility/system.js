
'use strict';

var _         = require('lodash-node'),
    util      = require('util'),
    os        = require('os'),
    pjson     = require('../../package.json'),
    exec      = require('child_process').exec,
    async     = require('async');

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
  this.software   = exports.software();
  this.uuid       = process.env.WHEATLEY_SERIAL || '00-00-00-00-00';
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

exports.macAddress = function (uuid, callback) {

  exec('ifconfig ' + uuid + ' | awk \'/ether/ {print $2}\'',
  function (err, stdout, stderr) {
    if (stdout === null || stdout === '' || err) {
      callback(null); // silent fail
    } else {
      callback(stdout);
    }
  });
};

/**
 * Retreives all network interfaces on the host device, map to a usable array
 * @return [{[string]: [object]}] [an array of network interfaces]
 */
exports.networkInterfaces = function (callback) {

  var ifaces = [];

  _.forIn(os.networkInterfaces(), function (value, key) {
    ifaces.push({
      'uuid': key,
      'addresses': value
    });
  });


  async.each(ifaces, function (iface, callback) {

    exports.macAddress(iface.uuid, function (ether) {
      iface.ether = ether;
      callback();
    });

  }, function (err) {
    callback(ifaces);
  });

};


/**
 * Retrieves system information about the host device
 * @return {[type]} [description]
 * @todo  retrieve data to plot to a chart (freemem, loadavg, etc.)
 */
exports.systemInfo = function (callback) {

  var info = new sysinfo();

  exports.networkInterfaces(function (ifaces) {
    info.ifaces = ifaces;
    callback(info);
  });

};

exports.software = function () {
  return {
    name    : pjson.name,
    version : pjson.version,
    vendor  : {
      author: pjson.author
    }
  };
};