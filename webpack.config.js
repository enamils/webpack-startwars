const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackBar = require('webpackbar');

let config = {
  devtool: "eval-source-map",
  entry: {
    app: "./src/assets/javascript/index.js",
    css: "./src/assets/stylesheets/styles.scss",
    img: glob.sync("./src/assets/images/*"),
  },
  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: "./[name].js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.scss$/,
      use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader', 'postcss-loader'],
      }))
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=images/',
    },
  ]
  },
  plugins: [
    new ExtractTextWebpackPlugin("styles.css"),
    new UglifyJsPlugin(),
    new WebpackBar()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets()
  );
}