
module.exports = Parser;

function Parser() {
  var Builder = require('../builders/message_builder');
  this.__builder = new Builder();
}

Parser.prototype.parse = function (data) {

};
