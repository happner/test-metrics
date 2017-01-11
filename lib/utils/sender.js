module.exports = Sender;

function Sender() {
  var StatsD = require('node-statsd');
  this.__client = new StatsD();
}

Sender.prototype.sendGauge = function (data, callback) {

  var self = this;

  try {
    data.forEach(function (pair) {
      self.__client.gauge(pair.name, pair.value);
    });

    callback();

  } catch (err) {
    return callback(err);
  }
};

Sender.prototype.sendIncrement = function (data, callback) {
  callback(new Error('Not implemented!'));
};
