import { Configuration } from "webpack";
import { IWebpackExtraConfig } from "./interface";
import { rideOfEmpty } from './utils'

export default (
  opt: IWebpackExtraConfig,
  config: Partial<Configuration> = {}
): Configuration => {
  const isProduction = opt.env === "production"; // 默认development
  const isNodeEnv = config.target === "node"; // 默认浏览器环境
  const useJSX = !!opt.tsx; // 默认false

  const tsRegx = /\.ts/i;
  const tsxRegx = /\.tsx?/i;

  const rules = [
    {
      test: useJSX ? tsxRegx : tsRegx,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: rideOfEmpty([
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  targets: isNodeEnv
                    ? { node: "current" }
                    : { chrome: "58", ie: "11" },
                  corejs: 3,
                },
              ],
              "@babel/preset-typescript", 
              useJSX ? "@babel/preset-react" : '',
            ]),
            plugins: ["@babel/plugin-transform-runtime"],
            cacheDirectory: true,
          },
        },
        'ts-loader'
      ],
    }
  ];

  return {
      mode: isProduction ? "production" : "development",
      module: {
        rules,
      },
      resolve: {
        extensions: rideOfEmpty([".ts", useJSX ? '.tsx' : '']),
      },
    }
};
