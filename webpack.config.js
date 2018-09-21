const devConfig = require('./webpack/webpack.config.dev')
const prodConfig = require('./webpack/webpack.config.prod')

module.exports = process.env.NODE_ENV === 'dev' ? devConfig : prodConfig
