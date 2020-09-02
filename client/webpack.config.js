const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'index.tsx'), 
    path.resolve(__dirname, "index.scss")
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        loader: ['babel-loader', "ts-loader"],
        include: __dirname
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    }
    ]
  },
  plugins: [],
  plugins: [new MiniCssExtractPlugin(), 
	new HtmlWebpackPlugin({ 
    template: path.resolve(__dirname, 'src', 'index.html'),
    favicon: "./src/favicon.png" }
  )],
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
};

