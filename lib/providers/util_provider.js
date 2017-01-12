
module.exports = UtilProvider;

function UtilProvider() {
}

UtilProvider.prototype.getParser = function () {
  var Parser = require('../utils/parser');
  return new Parser();
};

UtilProvider.prototype.getSender = function () {
  var Sender = require('../utils/sender');
  return new Sender();
};
