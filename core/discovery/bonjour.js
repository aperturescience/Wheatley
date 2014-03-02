'use strict';

var mdns = require('mdns');

exports.discover = function () {

  /**
   * Create bonjour advertiser
   * @type {[type]}
   */
  var ad = mdns.createAdvertisement(mdns.tcp('http'), 4321);
  ad.start();

  var browser = mdns.createBrowser(mdns.tcp('http'));

  browser.on('serviceUp', function (service) {
    console.log('service up: ', service);
  });

  browser.on('serviceDown', function (service) {
    console.log('service down: ', service);
  });

  browser.start();

  // discover all available service types
  var all_the_types = mdns.browseThemAll();
  return all_the_types;
};