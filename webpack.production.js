const merge = require('webpack-merge');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')
const webpack = require('webpack')
const fs = require('fs-extra')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const pkg = require('./package.json')
// create version specifiers ['0', '0.1', '0.1.1']
const versions = pkg.version.split('.').map((_, i, a) => a.slice(0, i + 1).join('.'))

const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    // https://github.com/webpack/webpack/issues/6389#issuecomment-466712313
    minimizer: [new TerserPlugin()]
  },
  output: {
    path: __dirname,
    publicPath: '../',
    filename: 'dist/[name]/index-[chunkhash].js'
  },
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
          const chunkFiles = compilation.chunks.reduce((arr, c) => { arr.push(...c.files); return arr; }, [])
          const tasks = [
            ...chunkFiles.map(async (file) => fs.copy(file, path.join('docs', file)))
          ]

          tasks.push(...Object.keys(common.entry).map(async (chunkName) => {
            await Promise.all(versions.map(v => 
              fs.copy(`dist/${chunkName}.html`, `docs/${v}/${chunkName}.html`, {overwrite: true})
            ))
            await fs.copy(`dist/${chunkName}.html`, `docs/latest/${chunkName}.html`, {overwrite: true})
            await fs.copy(`dist/${chunkName}.html`, `docs/${chunkName}.html`, {overwrite: true})
          }))

          return Promise.all(tasks)
        })
      }
    }
  ]
});
