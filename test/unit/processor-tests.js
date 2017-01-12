var path = require('path'),
  assert = require('assert');

describe("processor-test", function () {

  before('it sets up the dependencies', function (callback) {

    var MockUtilProvider = require('./../mocks/mock_provider');
    var mockProvider = new MockUtilProvider();

    var Processor = require('../../lib/processor');
    this.__processor = new Processor(mockProvider);

    callback();
  });

  this.timeout(30000);

  it('can successfully parse a message', function (callback) {

    // mockData can be null as the test doesn't require it
    var mockData = null;

    try {
      this.__processor.parse(mockData);
      callback();
    } catch (err) {
      callback(err);
    }
  });

  it('can successfully parse and send a message', function (callback) {

    // mockData can be null as the test doesn't require it
    var mockData = null;

    try {
      this.__processor.parse(mockData).and.send(function (err) {
        callback(err);
      });

    } catch (err) {
      callback(err);
    }
  });
});
