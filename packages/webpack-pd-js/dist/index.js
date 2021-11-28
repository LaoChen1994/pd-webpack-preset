"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opt) {
    var isProduction = opt.env === "production"; // 默认development
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
                                    "@babel/preset-env",
                                    useJSX ? "@babel/preset-react" : "",
                                ].filter(function (item) { return item; }),
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
});
