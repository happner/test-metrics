module.exports = Parser;

function Parser() {
  var Builder = require('../builders/message_builder');
  this.__builder = new Builder();

  var Sender = require('../utils/sender');
  this.__sender = new Sender();
}

/***
 * @summary Parses a complete json file and returns an array of name:value pairs
 * @param data
 */
Parser.prototype.parse = function (data) {

  var self = this;
  var repoName = data.context.repo;
  var result = [];

  // iterate through the suites (currently only works for 1 level)
  data.details.results.suites.forEach(function (currentSuite) {

    currentSuite.tests.forEach(function (currentTest) {

      var currentMessage = self.__builder
        .withContextName('repo')
        .withRepoName(repoName)
        .withSuiteName(currentSuite.suite)
        .withTestName(currentTest.test.title)
        .build();

      result.push(currentMessage);
      currentMessage.reset();
    })
  });

  return result;
};
