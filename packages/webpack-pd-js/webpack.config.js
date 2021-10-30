const { default: getJsConfig } = require("./dist/index.js");
const { merge } = require("webpack-merge");
const path = require('path')

module.exports = merge(
  getJsConfig(
    {
      env: "production",
      jsx: false
    },
    {
      entry: path.resolve(__dirname, './demo/index.js'),
      output: {
        path: path.resolve(__dirname, './demo/'),
      },
      mode: 'development',
      target: 'node'
    }
  )
);
