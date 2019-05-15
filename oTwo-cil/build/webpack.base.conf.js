'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ["./src/app.js"]
  },

  // 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配
  // 前一个key是引用第三方的库名,后一个value是你在项目中起的别名
  externals:{
    // 'vue': 'Vue',
    // 'element-ui': 'ElementUI'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    'progress-bar',
    {
      name: 'duplicate-style',
      options: {
        cssProcessorOptions : {
          safe: true,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: [
              'iOS >= 7',
              'Android >= 4.1'
            ]
          }
        }
      }
    }
  ]
})
