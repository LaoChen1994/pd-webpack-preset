const { default: getJsConfig } = require("../dist/index.js");
const { merge } = require("webpack-merge");
const path = require("path");

const rlt1 = (() => {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          ],
        },
      ],
    },
  };
})();

const rlt2 = getJsConfig({
  jsx: true,
  env: 'development'
})

console.log('rlt 1 ->', JSON.stringify(rlt1))
console.log('rlt 2 ->', JSON.stringify(rlt2))

module.exports = merge(
  {
    entry: path.resolve(__dirname, "./index.jsx"),
    output: {
      path: path.resolve(__dirname, "./dist/"),
    },
    mode: "development",
    target: "web",
    module: {
      rules: [],
    },
  },
  rlt2
);
