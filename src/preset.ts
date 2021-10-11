import type { PluginItem } from "@babel/core"; // eslint-disable-line import/no-extraneous-dependencies
import type { Configuration } from "webpack"; // eslint-disable-line import/no-extraneous-dependencies
import { logger } from "@storybook/node-logger";

interface BabelOptions {
  extends: string | null;
  presets: PluginItem[] | null;
}

interface PresetOptions {
  includeModules?: string[];
}

const ie11Preset = [
  "@babel/preset-env",
  {
    targets: {
      ie: "11",
    },
  },
  "storybook-addon-ie11",
];

export const babel = (config: BabelOptions): BabelOptions => {
  const { presets = [] } = config;
  return {
    ...config,
    presets: [...(presets || []), ie11Preset],
  };
};

export const managerBabel = (config: BabelOptions): BabelOptions => {
  const { presets = [] } = config;
  return {
    ...config,
    presets: [...(presets || []), ie11Preset],
  };
};

const nodeModulesThatNeedToBeParsedBecauseTheyExposeES6 = [
  "@storybook[\\\\/]node_logger",
  "@testing-library[\\\\/]dom",
  "@testing-library[\\\\/]user-event",
  "acorn-jsx",
  "ansi-align",
  "ansi-colors",
  "ansi-escapes",
  "ansi-regex",
  "ansi-styles",
  "better-opn",
  "boxen",
  "camelcase",
  "chalk",
  "color-convert",
  "commander",
  "find-cache-dir",
  "find-up",
  "fs-extra",
  "highlight.js",
  "json5",
  "node-fetch",
  "pkg-dir",
  "prettier",
  "pretty-format",
  "react-dev-utils",
  "resolve-from",
  "semver",
  "slash",
  "strip-ansi",
  "uuid",
];

const escapeDirectorySeparators = (module: string) => {
  return module.replace(/\//, "[\\\\/]");
};

const createEs6Loader = (options?: PresetOptions) => {
  const modules = [
    ...nodeModulesThatNeedToBeParsedBecauseTheyExposeES6,
    ...(options?.includeModules ?? []),
  ];

  const include = new RegExp(
    `[\\\\/]node_modules[\\\\/](${modules
      .map(escapeDirectorySeparators)
      .join("|")})`
  );

  const es6Loader = {
    test: /\.js$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          sourceType: "unambiguous",
          presets: [ie11Preset],
        },
      },
    ],
    include,
  };

  return es6Loader;
};

export const managerWebpack = (
  webpackConfig: Configuration = {},
  options?: PresetOptions
): Configuration => {
  const es6Loader = createEs6Loader(options);

  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...(webpackConfig.module?.rules ?? []), es6Loader],
    },
  };
};

export const webpack = (
  webpackConfig: Configuration = {},
  options: PresetOptions
): Configuration => {
  logger.info(`=> Using IE11 addon`);

  const es6Loader = createEs6Loader(options);

  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...(webpackConfig.module?.rules ?? []), es6Loader],
    },
  };
};
