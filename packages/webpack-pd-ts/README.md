# `pd-ts-config`

> 简单易用的webpack ts preset

## 安装

```bash

npm install -D pd-ts-config

```

## 用法

```javascript
const { default: getTsConfig } = require("pd-ts-config");
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

```
