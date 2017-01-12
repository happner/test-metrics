module.exports = Metrics;

var Processor = require('./processor');
var UtilProvider = require('./providers/util_provider');

function Metrics() {
}

Metrics.prototype.update = function ($happn, data, callback) {

  $happn.log.info('updating');

  var path = '/' +
    'raw/' +
    data.context.owner + '/' +
    data.context.repo + '/' +
    data.context.version + '/' +
    data.context.branch + '/' +
    data.context.node + '/' +
    Date.now();

  var raw = {
    processed: false,
    data: JSON.stringify(data)
  };

  $happn.data.set(path, raw, function (e) {

    if (e) {
      $happn.log.error('error storing', e);
      return callback(e);
    }

    var utilProvider = new UtilProvider();
    var processor = new Processor(utilProvider);
    processor.parse(data).and.send(function (e) {

      if (e) {
        $happn.log.error('error sending to statsd', e);
        return callback();
      }

      $happn.data.set(path, {processed: true}, {merge: true}, function (e) {

        if (e) $happn.log.error('error storing', e);
        callback();

      });

    });

  });

};
