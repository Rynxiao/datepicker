const devConfig = require('./webpack/webpack.config.dev')
const prodConfig = require('./webpack/webpack.config.prod')
const npmConfig = require('./webpack/webpack.config.npm')

const env = process.env.NODE_ENV
let config = devConfig

if (env === 'dev') {
  config = prodConfig
}

if (env === 'npm') {
  config = npmConfig
}

module.exports = config
