module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '54.247.57.9',
      username: 'ubuntu',
      pem: '/home/ubuntu/.ssh/TestServerKey.pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'arteesinglesignin',
    path: '/home/ubuntu/Artee/arteesinglesignin',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://helpdesk.sparnigeria.com',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      //image: 'abernix/meteord:node-17.4.0-base',
      //image: 'zodern/meteor:root',
      stopAppDuringPrepareBundle: true,
      image: 'abernix/meteord:base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    deployCheckWaitTime:600,
    enableUploadProgressBar: true,
    type:'meteor'
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
