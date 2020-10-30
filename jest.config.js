module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js"
  },
  // moduleFileExtensions: ["js", "vue", "json"],
  moduleFileExtensions: ["js", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/pages/**/*.vue",
    "<rootDir>/news_detail_page/**/formatter.js"
  ]
};
