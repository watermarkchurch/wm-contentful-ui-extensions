// babel.config.js
module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment",
    }]
  ],
  presets: [
    [
      // https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
      '@babel/preset-env',
      {
        // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    '@babel/preset-typescript',
  ],
};
