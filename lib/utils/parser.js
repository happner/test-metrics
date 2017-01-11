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
  var result = [];

  var recurseSuites = function (currentSuites, suiteChain) {

    currentSuites.forEach(function (currentSuite) {

      var currentChain = suiteChain != null ? suiteChain + '.' + currentSuite.suite : currentSuite.suite;

      currentSuite.tests.forEach(function (currentTest) {

        var currentMessage = self.__builder
          .withContextName('repo')
          .withRepoName(repoName)
          .withSuiteName(currentChain)
          .withTestName(currentTest.test.title)
          .build();

        result.push(currentMessage);

        self.__builder.reset();

      });

      if (currentSuite.suites.length > 0)
        recurseSuites(currentSuite.suites, currentChain);
    });
  };

  // iterate through the keys of the detail
  Object.keys(data.detail).forEach(function(key){
    recurseSuites(data.detail[key].results.suites, null);
  });

  return result;
};
