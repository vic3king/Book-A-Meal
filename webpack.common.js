const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: [
    './client/src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Book A Meal',
      template: 'client/src/index.html',
      filename: 'index.html'
    }),
    new DotEnv()
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'webpack-conditional-loader'
        ]
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /(\.scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: process.env.NODE_ENV === 'production'
                ? '[hash:base64]'
                : '[path][name]__[local]--[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader']
      }
    ]
  }
};
