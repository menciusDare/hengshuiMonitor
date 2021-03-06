'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')


module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        proxyTable: {
            "/api/regulatory/": {
                // target: "http://10.0.200.90:8098/", // test
                target: 'http://10.0.200.90:8016/',//hengshui test
                // target: 'http://10.0.205.232:6206/',
                // target: 'http://10.0.205.230:6206/',
                changeOrigin: true,
                pathRewrite: {
                    "^/api/regulatory/": "",
                },
            },
            "/api/permissions/": {
                // target: 'http://10.0.205.128:8003/',
                changeOrigin: true,
                pathRewrite: {
                    "^/api/permissions/": "",
                },
            },
            "/api/cronjob/": {
                target: 'http://10.0.205.111:8018/',
                changeOrigin: true,
                pathRewrite: {
                    "^/api/cronjob/": "",
                },
            },
            "/api/": {
                target: 'http://10.0.200.108:8098/',//hengshui test
            //    target: "http://10.0.200.90:8098/", // test
              
                //  target: 'http://10.0.200.61:6298/',// dev
                // target: 'http://10.0.200.108:8098/',
                changeOrigin: true,
                pathRewrite: {
                    "^/api/": "",
                },
            },
            "/beidou/": {
                // target: 'http://10.0.200.105:8098/',
                target: "http://10.0.200.134:8088/",
                //  target: 'http://59.110.152.155:8098/',
                changeOrigin: true,
                pathRewrite: {
                    "^/beidou/": "",
                },
            },
            "/beidouvideo/": {
            //    target: 'http://10.0.200.90:8098/',
                // target: 'http://10.0.200.134:6605/',
                //  target: 'http://59.110.152.155:8098/',
                changeOrigin: true,
                pathRewrite: {
                    "^/beidou/": "",
                },
            },
        },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
