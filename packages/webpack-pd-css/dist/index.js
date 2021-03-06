"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var utils_1 = require("./utils");
exports.default = (function (opt) {
    var _a = opt.env, env = _a === void 0 ? "development" : _a, _b = opt.preCompile, preCompile = _b === void 0 ? "none" : _b, _c = opt.useCssModule, useCssModule = _c === void 0 ? false : _c, _d = opt.cssSplit, cssSplit = _d === void 0 ? {} : _d;
    var isProduction = env === "production"; // 默认development
    var hasDeclaration = opt.declaration;
    var cssRegx = /\.css/i;
    var scssRegx = /\.s(a|c)ss/i;
    var enable = cssSplit.enable, _e = cssSplit.devCssSplitName, devCssSplitName = _e === void 0 ? "[name].css" : _e, _f = cssSplit.prodCssSplitName, prodCssSplitName = _f === void 0 ? "[name]_[hash].css" : _f;
    var cssModuleOpt = {
        modules: useCssModule
            ? {
                localIdentName: "[name]_[hash:base64:5]",
            }
            : false,
    };
    var rules = [
        {
            test: cssRegx,
            use: (0, utils_1.rideOfEmpty)([
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
    var extensions = [".css"];
    var plugins = [];
    if (preCompile === "scss") {
        rules.push({
            test: scssRegx,
            use: (0, utils_1.rideOfEmpty)([
                isProduction && enable ? mini_css_extract_plugin_1.default.loader : "style-loader",
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
        plugins.push(new mini_css_extract_plugin_1.default({
            filename: isProduction ? prodCssSplitName : devCssSplitName,
            linkType: "text/css",
        }));
    }
    return {
        mode: isProduction ? "production" : "development",
        module: {
            rules: rules,
        },
        resolve: {
            extensions: extensions,
        },
        plugins: plugins,
    };
});
