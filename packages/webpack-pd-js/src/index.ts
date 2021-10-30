import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import { IWebpackExtraConfig } from "./interface";

export default (
  opt: IWebpackExtraConfig,
  config: Partial<Configuration> = {}
): Configuration => {
  const isProduction = opt.env === "production"; // 默认development
  const isNodeEnv = config.target === "node"; // 默认浏览器环境
  const useJSX = !!opt.jsx; // 默认false

  const jsRegx = /\.js/;
  const jsxRegx = /\.jsx/;

  return merge(
    {
      mode: isProduction ? "production" : "development",
      module: {
        rules: [
          {
            test: useJSX ? jsxRegx : jsRegx,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        useBuiltIns: "usage",
                        targets: isNodeEnv
                          ? { node: "current" }
                          : { chrome: "58", ie: "11" },
                        corejs: 3
                      },
                    ],
                  ],
                  plugins: ["@babel/plugin-transform-runtime"],
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.js']
      }
    },
    config
  );
};
