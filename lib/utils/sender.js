/**
 * Created by grant on 2017/01/11.
 */

module.exports = Sender;

function Sender() {
}

Sender.prototype.send = function (data, callback) {
  callback(new Error('Not implemented!'));
};
