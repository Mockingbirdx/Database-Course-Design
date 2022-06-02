const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

let proxyObj = {}
let proxyObj_mock = {}

proxyObj['/'] = {
  ws: false,
  target: 'http://127.0.0.1:8080/',
  changeOrigin: true,
  pathReWrite: {
    '^/': '/'
  }
}

proxyObj_mock['/'] = {
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
    port: 8088,
    proxy: proxyObj_mock
  }
}