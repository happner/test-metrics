var processor = require('./statsd');

function Metrics() {}

Metrics.prototype.update = function (data, callback) {

  processor.parse(data).and().send(callback);

};
