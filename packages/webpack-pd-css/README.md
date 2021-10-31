# `pd-css-config`

> 通用的css预设配置

## 安装

```bash

npm install -D pd-css-config

```

## 用法

```
const { default: getCssConfig } = require("pd-css-config");
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

```
