const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();
const devMode = process.env.NODE_ENV !== 'production';

const allConfig = smp.wrap({
  devtool: "eval-source-map",
  entry: {
    app: "./src/assets/javascript/index.js",
    styles: "./src/assets/stylesheets/styles.scss",
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
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', 'postcss-loader', 'sass-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=images/',
    },
  ]
  },
  plugins: [
    new WebpackBar({
      name: "Build All Files",
      color: "pink"
    }),
    new MiniCssExtractPlugin({
      filename: './[name].css',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
});

module.exports = allConfig;