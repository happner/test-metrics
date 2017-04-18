module.exports = Parser;

function Parser() {
  var Builder = require('../builders/message_builder');
  this.__builder = new Builder();
}

/***
 * @summary Parses a complete json file and returns an array of name:value pairs
 * @param data
 */
Parser.prototype.parse = function (data) {

  var self = this;
  var repoName = data.context.repo;
  var nodeVersion = data.context.node != null ? 'node_version_' + self.__majorNodeVersion(data.context.node) : 'unknown';
  var result = [];

  // first take care of failure count (will be the first item in the results array)
  if (data.aggregated.tests.statuses.failed > 0) {

    var failureMessage = self.__builder
      .withContextName('repo')
      .withRepoName(repoName)
      .withStatus('failed')
      .withFailureCount(data.aggregated.tests.statuses.failed)
      .build();

    var failed = {name: 'errors', value: failureMessage};

    result.push(failureMessage)
  }

  // recursive closure
  var recurseSuites = function (currentSuites, suiteChain) {

    currentSuites.forEach(function (currentSuite) {

      var currentSuiteName = self.__replaceChars(currentSuite.suite);
      var currentChain = suiteChain != null ? suiteChain + '.' + currentSuiteName : currentSuiteName;

      currentSuite.tests.forEach(function (currentTest) {

        var currentTestName = self.__replaceChars(currentTest.test.title);

        var currentMessage = self.__builder
          .withContextName('repo')
          .withRepoName(repoName)
          .withNodeVersion(nodeVersion)
          .withSuiteName(currentChain)
          .withTestName(currentTestName)
          .withStatus(currentTest.test.status)
          .withDuration(currentTest.test.duration)
          .build();

        result.push(currentMessage);

        self.__builder.reset();

      });

      if (currentSuite.suites.length > 0)
        recurseSuites(currentSuite.suites, currentChain);
    });
  };

  // iterate through the keys of the detail
  Object.keys(data.detail).forEach(function (key) {
    if (data.detail[key].results.suites != null)
      recurseSuites(data.detail[key].results.suites, null);
  });

  return result;
};

Parser.prototype.__replaceChars = function (str) {
  return (str.replace(':', '__')
    .replace('.', '__')
    .replace('|', '__'));
};

Parser.prototype.__majorNodeVersion = function (str) {
  return str.indexOf('.') > -1 ? str.substr(0, str.indexOf('.')) : str;
};
