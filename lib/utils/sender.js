/**
 * Created by grant on 2017/01/11.
 */

module.exports = Sender;

function Sender() {
  var StatsD = require('node-statsd');
  this.__client = new StatsD();
}

Sender.prototype.sendIncrement = function (data, callback) {
  callback(new Error('Not implemented!'));
};

Sender.prototype.sendGauge = function (data, callback) {
  callback(new Error('Not implemented!'));
};
