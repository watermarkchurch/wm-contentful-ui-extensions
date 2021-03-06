const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const glob = require("glob")
const path = require("path")
const fs = require('fs-extra')

const pkg = require('./package.json')
 
// Create an entry point for each 'index.*' file in src/, where there's also a 'extension.json'.
const entryPoints = glob.sync("src/*/index.{t,j}s*(x)")
const entry = entryPoints.reduce((hash, file) => {
  if (fs.existsSync(path.join(path.dirname(file), 'extension.json'))) {
    hash[path.basename(path.dirname(file))] = path.resolve(file)
  }
  return hash
}, {})

const htmlPlugins = Object.keys(entry).map(chunkName => 
  new HtmlWebpackPlugin({
    filename: `dist/${chunkName}.html`,
    chunks: [chunkName],
    template: 'index.template.html',
    templateParameters: {
      chunkName: chunkName,
      version: pkg.version,
      title: `${chunkName}@${pkg.version}`
    }
  })
)

module.exports = {
  entry: entry,
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          { loader: "css-loader" },
          { loader: "sass-loader"}
        ]
      }
    ]
  },

  resolve: {
    "alias": { 
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
     // Must be below test-utils
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss']
  },

  devtool: 'inline-source-map',

  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    // "jquery": "jQuery"
    'contentful-ui-extensions-sdk': 'window.contentfulExtension',
    'jquery': 'jQuery'
  },
  output: {
    path: __dirname,
    filename: 'dist/[name]/index-[chunkhash].js'
  },
  plugins: [
    ...htmlPlugins,
    new webpack.ProvidePlugin({
      h: ['preact', 'h'],
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "dist/[name]/style-[chunkhash].css",
      chunkFilename: "dist/[id]-[chunkhash].css"
    })
  ]
} 