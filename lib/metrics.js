module.exports = Metrics;
// var processor = require('./statsd');

function Metrics() {}

Metrics.prototype.update = function ($happn, data, callback) {

  $happn.log.info('updated');

  return callback();

  processor.parse(data).and().send(callback);

};
