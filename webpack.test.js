const merge = require('webpack-merge')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const common = require('./webpack.config.js');

module.exports = merge(common, {
  externals: {
    chai: 'window.chai'    
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: { 
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      // Must be below test-utils
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
