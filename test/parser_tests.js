var path = require('path'),
  assert = require('assert'),
  fs = require('fs');

describe("parser-test", function () {

  before('it sets up the dependencies', function (callback) {

    var self = this;

    var Parser = require('../lib/utils/parser');
    this.__parser = new Parser();

    fs.readFile(__dirname + path.sep + 'fixtures' + path.sep + 'tracey-sample.json', 'utf8', function (err, data) {
      if (err)
        return callback(err);

      self.__testData = JSON.parse(data);

      callback();
    });
  });

  this.timeout(30000);

  it('can successfully parse a message and extract the correct number of tests', function (callback) {

    var parsedResult = this.__parser.parse(this.__testData);

    assert(parsedResult.length == this.__testData.aggregated.tests.count);

    callback();
  });

  /*
   TODO:
   1 - check for: periods, colons, pipes
   2 -
   */

});
