const path = require('path')
const proxy = require('http-proxy-middleware')

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, './src/assets/css/global.less')]
    }
  },
  devServer: {
    proxy: {
      '/api':{ // 这个是你要替换的位置
        target: 'http://localhost:4000', //这个是被替换的目标地址
        secure:true, //接受对方是https的接口
        changeOrigin:true, // 是否需要跨域
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}