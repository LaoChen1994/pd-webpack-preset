"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opt) {
    var isProduction = opt.env === "production"; // 默认development
    var isNodeEnv = opt.isNodeEnv; // 默认浏览器环境
    var useJSX = !!opt.jsx; // 默认false
    var jsRegx = /\.js/i;
    var jsxRegx = /\.jsx?/i;
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
                                        {
                                            useBuiltIns: "usage",
                                            targets: isNodeEnv
                                                ? { node: "current" }
                                                : { chrome: "58", ie: "11" },
                                            corejs: 3,
                                        },
                                    ],
                                    useJSX ? "@babel/preset-react" : '',
                                ].filter(function (item) { return item; }),
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
});
