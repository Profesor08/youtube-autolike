const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    main: path.join(__dirname, "./src/main.tsx"),
    options: path.join(__dirname, "./src/options.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "./build/"),
    filename: "js/[name].js",
  },
  resolve: {
    extensions: ["*", ".js", ".ts", ".tsx"],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "boilerplate", // change this to your app title
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000",
      },
      manifest: "manifest.json",
      filename: "index.html",
      template: "./static/index.html",
      hash: true,
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      title: "boilerplate", // change this to your app title
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000",
      },
      manifest: "manifest.json",
      filename: "options.html",
      template: "./static/options.html",
      hash: true,
      chunks: ["options"],
    }),
    new CopyPlugin([
      {
        from: "assets",
        to: "assets",
      },
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
      stats: { children: false },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
};
module.exports = config;
