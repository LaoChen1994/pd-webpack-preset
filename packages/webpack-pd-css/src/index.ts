import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import { IWebpackExtraConfig } from "./interface";
import MiniCssExtract from "mini-css-extract-plugin";

export default (
  opt: IWebpackExtraConfig,
  config: Partial<Configuration> = {}
): Configuration => {
  const {
    env = "development",
    preCompile = "none",
    useCssModule = false,
    cssSplit = {},
  } = opt;
  const isProduction = env === "production"; // 默认development

  const cssRegx = /\.css/i;
  const scssRegx = /\.s(a|c)ss/i;

  const { enable, devCssSplitName = '[name].css', prodCssSplitName = '[name]_[hash].css' } = cssSplit;

  const rules = [
    {
      test: cssRegx,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: useCssModule
              ? {
                  localIdentName: "[name]_[hash:base64:5]",
                }
              : false,
          },
        },
      ],
    },
  ];
  const extensions = [".css"];
  const plugins = [];

  if (preCompile === "scss") {
    rules.push({
      test: scssRegx,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },
        {
          loader: "sass-loader",
        },
      ],
    });

    extensions.push(".scss");
  }

  if (enable) {
    plugins.push(new MiniCssExtract({
        filename: isProduction ? prodCssSplitName : devCssSplitName,
        linkType: 'text/css'
      }))
  }

  return merge(
    {
      mode: isProduction ? "production" : "development",
      module: {
        rules,
      },
      resolve: {
        extensions,
      },
      plugins
    },
    config
  );
};
