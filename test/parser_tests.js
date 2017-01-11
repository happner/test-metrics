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

      fs.readFile(__dirname + path.sep + 'fixtures' + path.sep + 'single-test.json', 'utf8', function (err, data) {
        if (err)
          return callback(err);

        self.__singleTestData = JSON.parse(data);

        fs.readFile(__dirname + path.sep + 'fixtures' + path.sep + 'single-test-illegal-chars.json', 'utf8', function (err, data) {
          if (err)
            return callback(err);

          self.__singleTestIllegalCharsData = JSON.parse(data);

          callback();
        });
      });
    });
  });

  this.timeout(30000);

  it('can successfully parse a message with a single test', function (callback) {

    var parsedResult = this.__parser.parse(this.__singleTestData);

    assert.equal(parsedResult[0].name, 'repo.happner-2.0-endpoint-service.requires and initializes the endpoint service, config with no endpoints');
    assert.equal(parsedResult[0].value, 18);

    console.log(JSON.stringify(parsedResult));

    callback();
  });

  it('can successfully parse a message with a single test and replace illegal characters in name', function (callback) {

    // illegal characters are '.', ':' and '|'

    var parsedResult = this.__parser.parse(this.__singleTestIllegalCharsData);

    assert.equal(parsedResult[0].name, 'repo.happner-2.0-endpoint-service.requires and __ initializes the endpoint service __ config with no endpoints __');
    assert.equal(parsedResult[0].value, 18);

    console.log(JSON.stringify(parsedResult));

    callback();
  });

  it('can successfully parse a message with a large number of tests and extract the correct number of tests', function (callback) {

    var parsedResult = this.__parser.parse(this.__testData);

    assert.equal(parsedResult.length, this.__testData.aggregated.tests.count);

    callback();
  });

});
