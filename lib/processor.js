/**
 * Created by grant on 2017/01/11.
 */

module.exports = Processor;

function Processor() {
  this.__processedData = null;

  var Parser = require('./utils/parser');
  this.__parser = new Parser();

  var Sender = require('./utils/sender');
  this.__sender = new Sender();
}

Processor.prototype.parse = function (data) {
  this.__processedData = this.__parser.parse(data);
  return this;
};

Object.defineProperty(Processor.prototype, 'and', {
  get: function () {
    return this;
  }
});

Processor.prototype.send = function (callback) {
  var self = this;

  this.__sender.sendGauge(self.__processedData, function (err, result) {
    if (err)
      return callback(err);

    callback(null, result);
  });
};

