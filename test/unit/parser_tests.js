var path = require('path'),
  assert = require('assert'),
  fs = require('fs');

describe("parser-test", function () {

  before('it sets up the dependencies', function (callback) {

    var self = this;

    var Parser = require('../../lib/utils/parser');
    this.__parser = new Parser();

    fs.readFile(path.join(__dirname, '..', path.sep, 'fixtures', path.sep, 'tracey-sample.json'), 'utf8', function (err, data) {

      if (err)
        return callback(err);

      self.__testData = JSON.parse(data);

      fs.readFile(path.join(__dirname, '..', path.sep, 'fixtures', path.sep, 'single-test.json'), 'utf8', function (err, data) {
        if (err)
          return callback(err);

        self.__singleTestData = JSON.parse(data);

        fs.readFile(path.join(__dirname, '..', path.sep, 'fixtures', path.sep, 'single-test-illegal-chars.json'), 'utf8', function (err, data) {
          if (err)
            return callback(err);

          self.__singleTestIllegalCharsData = JSON.parse(data);

          fs.readFile(path.join(__dirname, '..', path.sep, 'fixtures', path.sep, 'tracey-sample-with-host-os.json'), 'utf8', function (err, data) {
            if (err)
              return callback(err);

            self.__testData2 = JSON.parse(data);

            callback();

          });
        });
      });
    });
  });

  this.timeout(30000);

  it('can successfully parse a message with a single test', function (callback) {

    var parsedResult = this.__parser.parse(this.__singleTestData);

    console.log(JSON.stringify(parsedResult));

    assert.equal(parsedResult[1].name, 'repo.happner-2.unknown_host.results.node_version_0.0-endpoint-service.requires and initializes the endpoint service, config with no endpoints');
    assert.equal(parsedResult[1].value, 18);

    callback();
  });

  it('can successfully parse a message with a single test and replace illegal characters in name', function (callback) {

    // illegal characters are '.', ':' and '|'

    var parsedResult = this.__parser.parse(this.__singleTestIllegalCharsData);

    assert.equal(parsedResult[0].name, 'repo.happner-2.unknown_host.results.node_version_0.0-endpoint-service.requires and __ initializes the endpoint service __ config with no endpoints __');
    assert.equal(parsedResult[0].value, 18);

    console.log(JSON.stringify(parsedResult));

    callback();
  });

  it('can successfully parse a message with a large number of tests and extract the correct number of tests', function (callback) {

    var parsedResult = this.__parser.parse(this.__testData);

    assert.equal(parsedResult[0].value, this.__testData.aggregated.tests.statuses.failed);
    assert.equal(parsedResult.length, this.__testData.aggregated.tests.count + 1);

    callback();
  });

  it('can successfully parse a message', function (callback) {

    var parsedResult = this.__parser.parse(this.__testData2);

    assert.equal(parsedResult[1].name, 'repo.happn.MacBook-Air_darwin_x64.results.node_version_7.0_startup__js.default startup time');
    assert.equal(parsedResult[1].value, 54);
    assert.equal(parsedResult.length, this.__testData2.aggregated.tests.count);

    callback();
  });

  it('can successfully parse a message and extract node version into path', function (callback) {

    var parsedResult = this.__parser.parse(this.__testData2);

    assert.equal(parsedResult[1].name, 'repo.happn.MacBook-Air_darwin_x64.results.node_version_7.0_startup__js.default startup time');
    assert.equal(parsedResult.length, this.__testData2.aggregated.tests.count);

    callback();
  });

  it('can successfully parse a message and build path from nested suites', function (callback) {

    var parsedResult = this.__parser.parse(this.__testData);

    // see tracey-sample.json line 403 for test nested in a suite 2 layers deep
    var foundResult = parsedResult.filter(function (item) {
      return item.name == 'repo.happner-2.unknown_host.results.node_version_0.4 - Mesh to Mesh.on remote mesh.can call remote component function and subscribe to event'
    });

    assert.equal(foundResult.length, 1);

    callback();
  });

});
