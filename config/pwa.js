const { merge } = require('webpack-merge')
const paths = require('./paths.js')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const prod = require('./webpack.prod')

module.exports = merge(prod, {
  plugins: [
    new AddAssetHtmlPlugin({ filepath: `${paths.public}/sw-reg.js` }),
    new GenerateSW({
      importScripts: [`${paths.public}/fcm-sw.js`],
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/_redirects/]
    })
  ]
})