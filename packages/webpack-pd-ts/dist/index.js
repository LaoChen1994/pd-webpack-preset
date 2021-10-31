"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_merge_1 = require("webpack-merge");
var utils_1 = require("./utils");
exports.default = (function (opt, config) {
    if (config === void 0) { config = {}; }
    var isProduction = opt.env === "production"; // 默认development
    var isNodeEnv = config.target === "node"; // 默认浏览器环境
    var useJSX = !!opt.tsx; // 默认false
    var tsRegx = /\.ts/i;
    var tsxRegx = /\.tsx?/i;
    var rules = [
        {
            test: useJSX ? tsxRegx : tsRegx,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: (0, utils_1.rideOfEmpty)([
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
    return (0, webpack_merge_1.merge)({
        mode: isProduction ? "production" : "development",
        module: {
            rules: rules,
        },
        resolve: {
            extensions: (0, utils_1.rideOfEmpty)([".ts", useJSX ? '.tsx' : '']),
        },
    }, config);
});
