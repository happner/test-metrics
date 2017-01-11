
var path = require('path'),
  assert = require('assert');

describe("builder-test", function () {

  before('it sets up the dependencies', function (callback) {

    var MessageBuilder = require('../lib/builders/message_builder');
    this.__builder = new MessageBuilder();

    this.__testMessage = {
      "context": {
        "node": "0.10",
        "owner": "happner",
        "repo": "happner-2",
        "branch": "master"
      },
      "aggregated": {
        "files": 62,
        "suites": 80,
        "failed": {
          "e3b-rest-component-secure": [
            {
              "title": "\"after all\" hook",
              "reason": "timeout of 30000ms exceeded. Ensure the done() callback is being called in this test."
            }
          ]
        },
        "tests": {
          "count": 291,
          "statuses": {
            "passed": 282,
            "skipped": 8,
            "failed": 1
          }
        },
        "prepared": true,
        "duration": 399662
      },
      "detail": {
        "/usr/src/app/test/0-endpoints-service.js": {
          "task": "/usr/src/app/test/0-endpoints-service.js",
          "success": true,
          "results": {
            "file": "/usr/src/app/test/0-endpoints-service.js",
            "suites": [
              {
                "suite": "0-endpoint-service",
                "suites": [],
                "tests": [
                  {
                    "test": {
                      "title": "requires and initializes the endpoint service, config with no endpoints",
                      "async": 1,
                      "sync": false,
                      "timedOut": false,
                      "pending": false,
                      "type": "test",
                      "file": "/usr/src/app/test/0-endpoints-service.js",
                      "duration": 18,
                      "status": "passed"
                    },
                    "error": null
                  }
                ]
              }
            ]
          }
        }
      }
    };

    callback();
  });

  this.timeout(30000);

  it('can successfully build a message', function (callback) {

    var self = this;

    var currentSuite = this.__testMessage.detail['/usr/src/app/test/0-endpoints-service.js'].results.suites[0];
    var currentTest = currentSuite.tests[0];

    var singleTestMessage = self.__builder
      .withContextName('repo')
      .withRepoName(self.__testMessage.context.repo)
      .withSuiteName(currentSuite.suite)
      .withTestName(currentTest.test.title)
      .build();

    assert.equal(singleTestMessage.name, 'repo.happner-2.0-endpoint-service.requires and initializes the endpoint service, config with no endpoints');

    callback();
  });

  /*
  TODO:
  1 - check for: periods, colons, pipes
  2 -
   */


});
