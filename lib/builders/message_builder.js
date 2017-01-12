/**
 * Created by grant on 2017/01/11.
 */

module.exports = MessageBuilder;

function MessageBuilder() {
  this.reset();
}

MessageBuilder.prototype.reset = function () {
  this.__contextName = null;
  this.__repoName = null;
  this.__taskName = null;
  this.__suiteName = null;
  this.__testName = null;
  this.__duration = null;
  this.__status = null;
  this.__failureCount = null;

  return this;
};

MessageBuilder.prototype.withContextName = function (contextName) {
  this.__contextName = contextName;
  return this;
};

MessageBuilder.prototype.withRepoName = function (repoName) {
  this.__repoName = repoName;
  return this;
};

MessageBuilder.prototype.withTaskName = function (testName) {
  this.__testName = testName;
  return this;
};

MessageBuilder.prototype.withSuiteName = function (suiteName) {
  this.__suiteName = suiteName;
  return this;
};

MessageBuilder.prototype.withTestName = function (testName) {
  this.__testName = testName;
  return this;
};

MessageBuilder.prototype.withFailureCount = function (count) {
  this.__failureCount = count;
  return this;
};

MessageBuilder.prototype.withDuration = function (duration) {
  this.__duration = duration;
  return this;
};

MessageBuilder.prototype.withStatus = function (status) {
  this.__status = status;
  return this;
};

MessageBuilder.prototype.build = function () {

  var name = null;
  var value = null;

  switch (this.__status) {
    case  'passed':
      name = this.__contextName + '.' + this.__repoName + '.results.' + this.__suiteName + '.' + this.__testName;
      value = this.__duration;
      break;
    default:
      name = this.__contextName + '.' + this.__repoName + '.errors';
      value = this.__failureCount;
      break;
  }

  return {name: name, value: value};

};
