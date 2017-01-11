module.exports = {

  name: 'test-metrics',

  happn: {
    secure: true,
    services: {
      transport:{
        config:{
          mode: 'https',
          certPath: __dirname + '/../server.cert',
          keyPath: __dirname + '/../server.key'
        }
      },
      security: {
        config: {
          adminUser: {
            username: '_ADMIN',
            password: process.env.ADMIN_PASSWORD || 'happn'
          }
        }
      },
      data: {
        path: 'happn-service-mongo-2',
        config: {
          collection: process.env.MONGO_COLLECTION || 'test-metrics',
          url: 'mongodb://127.0.0.1:27017/' + (process.env.MONGO_DATABASE || 'test-metrics')
        }
      }
    }
  },

  modules: {
    'metrics': {
      path: __dirname + '/../lib/metrics.js'
    }
  },

  components: {
    'metrics': {

    }
  }

};
