import { Configuration, RuleSetRule } from "webpack";
import { IWebpackExtraConfig } from "./interface";
import MiniCssExtract from "mini-css-extract-plugin";

import { rideOfEmpty } from "./utils";

export default (opt: IWebpackExtraConfig): Configuration => {
  const {
    env = "development",
    preCompile = "none",
    useCssModule = false,
    cssSplit = {},
  } = opt;
  const isProduction = env === "production"; // 默认development
  const hasDeclaration = opt.declaration;

  const cssRegx = /\.css/i;
  const scssRegx = /\.s(a|c)ss/i;

  const {
    enable,
    devCssSplitName = "[name].css",
    prodCssSplitName = "[name]_[hash].css",
  } = cssSplit;

  const cssModuleOpt = {
    modules: useCssModule
      ? {
          localIdentName: "[name]_[hash:base64:5]",
        }
      : false,
  };

  const rules: any[] = [
    {
      test: cssRegx,
      use: rideOfEmpty([
        "style-loader",
        hasDeclaration ? "css-modules-typescript-loader" : "",
        {
          loader: "css-loader",
          options: cssModuleOpt,
        },
        "postcss-loader"
      ]),
    },
  ];
  const extensions = [".css"];
  const plugins = [];

  if (preCompile === "scss") {
    rules.push({
      test: scssRegx,
      use: rideOfEmpty([
        isProduction && enable ? MiniCssExtract.loader : "style-loader",
        hasDeclaration ? "css-modules-typescript-loader" : "",
        {
          loader: "css-loader",
          options: cssModuleOpt,
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                ],
              ],
            },
          },
        },
        "sass-loader",
      ]),
    });

    extensions.push(".scss");
  }

  if (enable) {
    plugins.push(
      new MiniCssExtract({
        filename: isProduction ? prodCssSplitName : devCssSplitName,
        linkType: "text/css",
      })
    );
  }

  return {
    mode: isProduction ? "production" : "development",
    module: {
      rules,
    },
    resolve: {
      extensions,
    },
    plugins,
  };
};
