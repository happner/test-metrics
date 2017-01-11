var MeshClient = require('happner-2').MeshClient;

module.exports = function send(login, data, callback) {

  var username = login.username;
  var password = login.password;
  var url = login.url;

  var client = new MeshClient({
    username: username,
    password: password,
    url: url,
    protocol: 'https',
    allowSelfSignedCerts: true
  });

  client.login()

    .then(function () {
      return client.exchange.metrics.update(data);
    })

    .then(function () {
      return client.disconnect();
    })

    .then(function () {
      callback();
    })

    .catch(callback);

};
