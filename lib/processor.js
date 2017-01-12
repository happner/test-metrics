/**
 * Created by grant on 2017/01/11.
 */

module.exports = Processor;

function Processor(utilProvider) {
  this.__processedData = null;

  this.__parser = utilProvider.getParser();
  this.__sender = utilProvider.getSender();
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

