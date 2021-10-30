"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_merge_1 = require("webpack-merge");
exports.default = (function (opt, config) {
    if (config === void 0) { config = {}; }
    var isProduction = opt.env === "production"; // 默认development
    var isNodeEnv = config.target === "node"; // 默认浏览器环境
    var useJSX = !!opt.jsx; // 默认false
    var jsRegx = /\.js/;
    var jsxRegx = /\.jsx/;
    return (0, webpack_merge_1.merge)({
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
    }, config);
});
