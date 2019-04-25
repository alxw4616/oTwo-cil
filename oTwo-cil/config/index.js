'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    // 本地调试时 网站的根目录
    // 默认值 require('path').resolve(__dirname,'../src/test/')
    // 增加该参数后 可以访问 src/test/ 下的文件
    // 如 http://localhost:8080/api/t.json => src/test/api/t.json
    // 但注意 proxyTable ,proxyTable的优先级更高
    contentBase:require('path').resolve(__dirname,'../src/test/'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: true,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true,
    // dev 端口转发
    proxyTable: {
        // '/api': {
        //     target: 'shengyibao/trunk/dist/api/',
        //     changeOrigin: true,
        //     pathRewrite: {
        //     },

        // },

        // 源:http://192.168.1.25:8092/api/t.php
        // 实际访问 http://192.168.1.25/shengyibao/trunk/dist/api/t.php
        // '/api': {
        //     target: 'http://127.0.0.1/',
        //     changeOrigin: true,

        //     // 将路径中的值替换为
        //     pathRewrite: {
        //         // '^/api': function (a,b,c) {
        //         //     // 通过函数 自动映射 用以减少 写test/api 的复杂度
        //         //     console.log(a,b,c); // /api 0 /api/t.php
        //         //     return 't.php';
        //         // }
        //     },

        // }
    }
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}