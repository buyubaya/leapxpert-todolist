const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js'
  },

  // RESOLVE
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  // MODULES
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: 'awesome-typescript-loader',
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },

  // PLUGINS
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}