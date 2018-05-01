const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')
const webpack = require('webpack')
const fs = require('fs-extra')

const pkg = require('./package.json')
// create version specifiers ['0', '0.1', '0.1.1']
const versions = pkg.version.split('.').map((_, i, a) => a.slice(0, i + 1).join('.'))

const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackInlineSVGPlugin(),
    {
      apply: (compiler) => {
        // after emit, copy the injected HTML to the proper place in the docs folder
        // for github pages
        compiler.hooks.afterEmit.tapPromise('AfterEmitPlugin', (compilation) => {
          return Promise.all(Object.keys(common.entry).map(async (chunkName) => {
            await Promise.all(versions.map(v => 
              fs.copy(`${chunkName}.html`, `docs/${v}/${chunkName}.html`, {overwrite: true})
            ))
            await fs.copy(`${chunkName}.html`, `docs/latest/${chunkName}.html`, {overwrite: true})
            await fs.move(`${chunkName}.html`, `docs/${chunkName}.html`, {overwrite: true})
          }))
        })
      }
    }
  ]
});
