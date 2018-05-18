const webpackConfig = require('./webpack.test.js')

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "chai-jquery", "chai", "jquery-3.2.1"],
    plugins: [
      "karma-jquery",
      "karma-chai-jquery",
      "karma-chai",
      "karma-mocha",
      "karma-webpack",
      "karma-chrome-launcher",
      "karma-mocha-reporter",
      "karma-sourcemap-loader"
    ],
    files: [ "src/**/*.spec.ts", "src/**/*.spec.tsx" ],
    exclude: [],
    webpack: webpackConfig,
    preprocessors: {
      "**/*.ts" : ["webpack", "sourcemap"],
      "**/*.tsx" : ["webpack", "sourcemap"],
    },
    mime: { "text/x-typescript": ["ts", "tsx"] },
    reporters: ["mocha"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: true
  });
};
