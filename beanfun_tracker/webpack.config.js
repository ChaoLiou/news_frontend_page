const path = require("path");
const webpack = require("webpack");
const ver = "0.01";

module.exports = env => ({
  entry: "./beanfun_tracker/index.js",
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  },
  output: {
    path: path.resolve("static", "beanfun_tracker", "sdk"),
    filename: "beanfun_tracker-" + ver + ".min.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: env ? JSON.stringify(env.development) : false
    })
  ]
});
