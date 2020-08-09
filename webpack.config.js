const path = require('path');

module.exports = {
  entry: './src/TTV-Vue-Plugin.js',
  output: {
    filename: 'TTV-Vue-Plugin.dist.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TTVVuePlugin',
    libraryTarget: 'window',
  },
};
