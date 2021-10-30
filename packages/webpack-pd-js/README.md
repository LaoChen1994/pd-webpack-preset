# `@pd/webpack-js-config`

> 简单易用的webpack js preset

## 安装

```bash

npm install -D @pd/webpack-js-config

```

```javascript
// webpack.config.js
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
      entry: path.resolve(__dirname, './index.js'),
      output: {
        path: path.resolve(__dirname, './dist'),
      },
      mode: 'development',
      target: 'node'
    }
  )
);
```
