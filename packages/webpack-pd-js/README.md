# `pd-js-config`

> 简单易用的webpack js preset

## 安装

```bash

npm install -D pd-js-config

```

## 用法

```javascript
// webpack.config.js
const { default: getJsConfig } = require("pd-js-config");
const { merge } = require("webpack-merge");
const path = require('path')

module.exports = merge(
  getJsConfig(
    {
      env: "production",
      jsx: false,
      isNodeEnv: false
    }
  ),
  {
    entry: path.resolve(__dirname, './index.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
    },
    mode: 'development',
    target: 'node'
  }
);
```
