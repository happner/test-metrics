var Processor = require('./processor');

function Metrics() {}

Metrics.prototype.update = function (data, callback) {

  var processor = new Processor();
  processor.parse(data).and.send(callback);

};
