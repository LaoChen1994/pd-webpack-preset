export interface IWebpackExtraConfig {
    env: "production" | "development";
    preCompile?: "scss" | "none";
    useCssModule?: boolean;
    declaration?: boolean;
    cssSplit?: {
        enable?: boolean;
        prodCssSplitName?: string;
        devCssSplitName?: string;
    };
}
