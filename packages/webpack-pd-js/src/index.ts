import { Configuration } from "webpack";
import { IWebpackExtraConfig } from "./interface";

export default (opt: IWebpackExtraConfig): Configuration => {
  const isProduction = opt.env === "production"; // 默认development
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
                  "@babel/preset-env",
                  useJSX ? "@babel/preset-react" : "",
                ].filter((item) => item),
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
