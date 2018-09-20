const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const projectPath = path.resolve(__dirname, '../')

module.exports = {
	mode: 'development',
	entry: path.resolve(projectPath, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(projectPath, 'src'),
        exclude: path.resolve(projectPath, "node_modules"),
     	},
      {
        test: /\.css$/,
        use: [
        	{ loader: "style-loader" },
          {
          	loader: "css-loader",
          	options: {
              modules: true,
          		camelCase: true,
          		localIdentName: '[name]__[local]--[hash:base64:5]'
          	}
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'DatePicker',
      filename: 'index.html',
      template: path.resolve(projectPath, 'index.html'),
      inject: false
    })
  ],
  devServer: {
    port: 8080,
    contentBase: path.resolve(projectPath, 'build'),
    hot: true
  },
}