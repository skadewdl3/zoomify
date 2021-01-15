const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            sourceType: "unambiguous",
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: "react-hot-loader/webpack",
        include: /node_modules/,
      },
      {
        test: /\.(styl)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "stylus-loader" },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },

  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    port: 3000,
    inline: true,
    hot: true,
  },
};
