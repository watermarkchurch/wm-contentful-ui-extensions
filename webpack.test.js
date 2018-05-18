const merge = require('webpack-merge')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const common = require('./webpack.config.js');

module.exports = merge(common, {
  externals: {
    chai: 'window.chai'    
  },
  resolve: {
    alias: {
      "react-dom/server": "preact-render-to-string",
      "react-dom/test-utils": "preact-test-utils",
      "react-dom": "preact-compat-enzyme",
      "react-test-renderer/shallow": "preact-test-utils",
      "react-test-renderer": "preact-test-utils",
      "react-addons-test-utils": "preact-test-utils",
      "react-addons-transition-group": "preact-transition-group",
      "react": "preact-compat-enzyme"
    }
  },
  plugins: [
    // existing plugins go here
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)x?($|\?)/i // process .js and .ts files only
    })
  ]
})
