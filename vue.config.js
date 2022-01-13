const path = require('path')
const proxy = require('http-proxy-middleware')
// const FileManagerPlugin = require('filemanager-webpack-plugin')

// const prd_plugins = [
//   new FileManagerPlugin({
//     onEnd: {
//       archive: [{
//         source: './dist',
//         destination: `./dist/app-chat-${process.VUE_CLI_SERVICE.mode}.tar.gz`,
//         format: 'tar',
//         options: {
//           gzip: true,
//           gzipOptions: {
//             level: 1
//           },
//           globOptions: {
//             nomount: true
//           }
//         }
//       }]
//     }
//   })
// ]

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, './src/assets/css/global.less')]
    }
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV == 'production') {
  //     config.plugins = [...config.plugins]
  //   }
  // },
  devServer: {
    host: "0.0.0.0",
    proxy: {
      '/api':{ // 这个是你要替换的位置
        target: process.env.VUE_APP_TARGET, //这个是被替换的目标地址
        secure: true, //接受对方是https的接口
        changeOrigin: true, // 是否需要跨域
        pathRewrite: {'^/api' : ''}
      },
      '/socket.io':{ // 这个是你要替换的位置
        target: process.env.VUE_APP_TARGET, //这个是被替换的目标地址
        secure: true, //接受对方是https的接口
        changeOrigin: true // 是否需要跨域
      }
    }
  }
}