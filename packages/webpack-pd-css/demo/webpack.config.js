const { default: getCssConfig } = require("../dist/index.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(
  getCssConfig(
    {
      env: "production",
      useCssModule: true,
      preCompile: "scss",
      declaration: true,
      cssSplit: {
        enable: true,
      },
    },
    {
      entry: path.resolve(__dirname, "./index.js"),
      output: {
        path: path.resolve(__dirname, "./dist"),
      },
      mode: "development",
    }
  )
);
