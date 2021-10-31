const { default: getTsConfig } = require("../dist/index.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(
  getTsConfig(
    {
      env: "production",
      tsx: true,
    },
    {
      entry: path.resolve(__dirname, "./index.tsx"),
      output: {
        path: path.resolve(__dirname, "./dist/"),
      },
      mode: "development",
      target: "node",
    }
  )
);
