module.exports = Metrics;
var Processor = require('./processor');

function Metrics() {}

Metrics.prototype.update = function ($happn, data, callback) {

  $happn.log.info('updated');

  var processor = new Processor();
  processor.parse(data).and.send(callback);

};
