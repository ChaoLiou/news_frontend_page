const path = require("path");

module.exports = {
  entry: "./news_detail_page/index.js",
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  },
  output: {
    path: path.resolve("static"),
    filename: "news_detail_page.js"
  }
};
