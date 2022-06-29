const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        test: /.css?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.BannerPlugin({
      banner: `build time : ${new Date().toLocaleTimeString()}`,
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: "source-map",
  devServer: {
    // contentBase: path.resolve(__dirname, "public"),
    // publicPath: "/",
    // host: "localhost",
    // port: 8080,
    // // inline: true,
    // hot: true,
    // open: true,
    // overlay: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
