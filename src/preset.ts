import type { PluginItem } from "@babel/core"; // eslint-disable-line import/no-extraneous-dependencies
import type { Configuration } from "webpack"; // eslint-disable-line import/no-extraneous-dependencies
import { logger } from "@storybook/node-logger";

interface BabelOptions {
  extends: string | null;
  presets: PluginItem[] | null;
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

const include = new RegExp(
  `[\\\\/]node_modules[\\\\/](${nodeModulesThatNeedToBeParsedBecauseTheyExposeES6.join(
    "|"
  )})`
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

export const managerWebpack = (
  webpackConfig: Configuration = {}
): Configuration => ({
  ...webpackConfig,
  module: {
    ...webpackConfig.module,
    rules: [...(webpackConfig.module?.rules ?? []), es6Loader],
  },
});

export const webpack = (webpackConfig: Configuration = {}): Configuration => {
  logger.info(`=> Using IE11 addon`);
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [...(webpackConfig.module?.rules ?? []), es6Loader],
    },
  };
};

export const entries = ["event-source-polyfill/src/eventsource"];
export const managerEntries = (existingManagerEntries: string[]) => [
  "event-source-polyfill/src/eventsource",
  ...existingManagerEntries,
];
