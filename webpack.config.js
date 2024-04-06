const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const fglob = require("fast-glob");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
//const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

//const smp = new SpeedMeasurePlugin();
const devMode = process.env.NODE_ENV !== 'production';

const allConfig = {
  devtool: devMode ? "eval-source-map" : false,
  entry: {
    library: "./src/assets/javascript/app.js",
    styles: "./src/assets/stylesheets/styles.scss",
    img: fglob.sync("./src/assets/images/*"),
  },
  output: {
    path: path.resolve(__dirname, "./public/"),
    filename: "js/[name].js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./public/"),
      staticOptions: {},
      serveIndex: true,
      watch: true,
    },
    client: {
      logging: 'info',
      overlay: true,
    },
    allowedHosts: "all"
  },
  plugins: [
    new WebpackBar({
      name: "Build All Files",
      color: "blue"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs'
    }),
  ],
  module: {
    rules: [
    {
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
      type: "asset/resource",
      generator: {
        filename: 'images/[name][ext]'
      }
    },
  ]
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
            },
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
                          },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  }
};

module.exports = allConfig;