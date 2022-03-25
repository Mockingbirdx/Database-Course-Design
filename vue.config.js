const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

let proxyObj = {}

proxyObj['/'] = {
  ws: false,
  target: 'http://127.0.0.1:4523/mock/760320/',
  changeOrigin: true,
  pathReWrite: {
    '^/': '/'
  }
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}