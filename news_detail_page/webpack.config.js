const path = require("path");
const webpack = require("webpack");

module.exports = env => ({
  entry: "./news_detail_page/index.js",
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  },
  output: {
    path: path.resolve("static"),
    filename: "news_detail_page.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: env ? JSON.stringify(env.development) : false
    })
  ]
});
