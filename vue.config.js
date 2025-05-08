const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    allowedHosts: [
        'localhost:8081',
      'api.1024777.xyz',
      '.1024777.xyz'
    ],
  },

})
