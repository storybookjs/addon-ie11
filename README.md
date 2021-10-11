# Storybook Addon IE11

The IE11 addon configures Storybook's webpack to target legacy browsers.

## Installation

```sh
npm install @storybook/addon-ie11

yarn add @storybook/addon-ie11
```

Then update your `.storybook/main.js` config:

```js
module.exports = {
  addons: ["@storybook/addon-ie11"],
};
```

## Options

### `includeModules`

An array of npm module names to be transpiled by Babel (in addition to the default npm modules configured via `@storybook/addon-intl`).

```js
module.exports = {
  addons: [
    {
      name: "@storybook/addon-ie11",
      options: {
        includeModules: ["@react-theming/storybook-addon", "react-hook-form"],
      },
    },
  ],
};
```
