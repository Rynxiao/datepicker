var devConfig = require('./webpack/webpack.config.dev')
var prodConfig = require('./webpack/webpack.config.prod')
module.exports = process.env.NODE_ENV === 'dev' ? devConfig : prodConfig