const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: './src/index',
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          { loader: "css-loader" },
          { loader: "sass-loader"}
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss']
  },

  devtool: 'inline-source-map',

  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    // "jquery": "jQuery"
    'contentful-ui-extensions-sdk': 'window.contentfulExtension'
  },

  output: {
    path: __dirname,
    filename: 'dist/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
      inlineSource: '.(js|css)$' // embed all javascript and css inline
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "dist/[name].css",
      chunkFilename: "dist/[id].css"
    })
  ]
}