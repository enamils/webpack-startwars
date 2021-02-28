const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const smp = new SpeedMeasurePlugin();
const devMode = process.env.NODE_ENV !== 'production';

const allConfig = smp.wrap({
  devtool: devMode ? "eval-source-map" : false,
  entry: {
    app: "./src/assets/javascript/app.js",
    styles: "./src/assets/stylesheets/styles.scss",
    img: glob.sync("./src/assets/images/*"),
  },
  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.ejs$/,
      loader: 'ejs-loader',
      options: {
        esModule: false
      }
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
      // use: 'file-loader?name=[name].[ext]&outputPath=images/',
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            }
          }
        },
      ],
    },
  ]
  },
  plugins: [
    new WebpackBar({
      name: "Build All Files",
      color: "aqua"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public/dist"),
    watchContentBase: true,
    historyApiFallback: true,
    compress: true,
    disableHostCheck: true
  },
});

if(devMode) {
  allConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = allConfig;