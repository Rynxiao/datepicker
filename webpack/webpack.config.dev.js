const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const projectPath = path.resolve(__dirname, '../')

module.exports = {
  mode: 'development',
  entry: path.resolve(projectPath, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: { fix: true },
        }],
        include: path.resolve(projectPath, './src/**/*.js'),
        exclude: [
          path.resolve(projectPath, 'node_modules'),
          path.resolve(projectPath, './webpack/**/*.js'),
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(projectPath, './src/**/*.js'),
        exclude: path.resolve(projectPath, 'node_modules'),
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'DatePicker',
      filename: 'index.html',
      template: path.resolve(projectPath, 'index.html'),
      inject: false,
    }),
  ],
  devServer: {
    port: 8080,
    contentBase: path.resolve(projectPath, 'dist'),
    hot: true,
  },
}
