const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
      './src/app/Index.jsx',
      './src/app/style/style.less'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query: {
          presets:['react']
        }
      },
        {
            test: /.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }
    ],
  },
    plugins: [
        new ExtractTextPlugin("style.css"),
    ]
};
