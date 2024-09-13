/* eslint-enable no-unused-vars */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development", // or 'production'
  entry: "./index.js", // your entry point
  target: "node", // set the target to node
  output: {
    path: path.resolve(__dirname, "dist"), // output directory
    filename: "bundle.js", // output file
  },
  devtool: "source-map",
  externals: [nodeExternals()], // ignore node modules
  module: {
    rules: [
      {
        test: /\.js$/, // transpile JS files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "locale", to: "locale" }],
    }),
  ],
};
