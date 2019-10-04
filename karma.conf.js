const webpackConfig = require('./webpack.test.js')

var os = require('os')
const child_process = require("child_process")

const isTestFile = (l) => /\.spec\.ts(x)?/.test(l)
let files = process.argv.filter(isTestFile)
if (files.length == 0) {
  try {
    const result = child_process.execSync('git diff --name-only && git ls-files --others --exclude-standard').toString()
    files.push(...result.split(os.EOL)
      .filter(isTestFile))
  } catch(ex) {
    console.error(ex)
  }
}

if (files.length == 0) {
  files = [
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}
console.log('Karma run', files)

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
    files: [
      ...files,
    ],
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
