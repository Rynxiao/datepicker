module.exports = ({ file }) => ({
  parser: file.extname === '.pug' ? 'sugarss' : false,
  plugins: {
    'postcss-preset-env': {},
    'autoprefixer': {},
    'cssnano': {},
  },
})
