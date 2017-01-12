module.exports = Metrics;

var Processor = require('./processor');
var UtilProvider = require('./providers/util_provider');

function Metrics() {
}

Metrics.prototype.update = function ($happn, data, callback) {

  $happn.log.info('updated');

  var utilProvider = new UtilProvider();
  var processor = new Processor(utilProvider);

  processor.parse(data).and.send(callback);

};
