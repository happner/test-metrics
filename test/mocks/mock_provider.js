module.exports = MockProvider;

function MockProvider() {
}

MockProvider.prototype.getParser = function () {
  return {
    parse: function (data) {
      return {name: 'test1', value: 'repo.suite.test.blah'}
    }
  }
};

MockProvider.prototype.getSender = function () {
  return {
    sendGauge: function (data, callback) {
      callback();
    }
  }
};
