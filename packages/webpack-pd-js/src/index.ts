import { Configuration } from "webpack";
import { IWebpackExtraConfig } from "./interface";

export default (
  opt: IWebpackExtraConfig,
): Configuration => {
  const isProduction = opt.env === "production"; // 默认development
  const isNodeEnv = opt.isNodeEnv; // 默认浏览器环境
  const useJSX = !!opt.jsx; // 默认false

  const jsRegx = /\.js/i;
  const jsxRegx = /\.jsx?/i;

  return {
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
                    useJSX ? "@babel/preset-react" : '',
                    {
                      useBuiltIns: "usage",
                      targets: isNodeEnv
                        ? { node: "current" }
                        : { chrome: "58", ie: "11" },
                      corejs: 3,
                    },
                  ],
                ].filter(item => item),
                plugins: ["@babel/plugin-transform-runtime"],
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js"],
    },
  };
};
