var MeshClient = require('happner-2').MeshClient;

module.exports = function send(login, data, callback) {

  var username = login.username;
  var password = login.password;
  var hostname = login.hostname;

  var client = new MeshClient({
    username: username,
    password: password,
    hostname: hostname,
    protocol: 'https',
    allowSelfSignedCerts: true
  });

  client.login()

    .then(function () {
      return client.exchange.metrics.update(data);
    })

    .then(function () {
      callback();
    })

    .catch(callback)

    .then(function () {
      return client.disconnect();
    })

    .catch(function (error) {
      console.error('error disconnecting', error);
      client = undefined;
    })
};
