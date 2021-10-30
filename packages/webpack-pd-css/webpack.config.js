const { default: getCssConfig } = require("./dist/index.js");
const { merge } = require("webpack-merge");
const path = require('path')

module.exports = merge(
  getCssConfig(
    {
      env: "development",
      useCssModule: true,
      preCompile: "scss"
    },
    {
      entry: path.resolve(__dirname, './demo/index.js'),
      output: {
        path: path.resolve(__dirname, './demo/dist'),
      },
      mode: 'development',
    }
  )
);
