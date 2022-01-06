module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    {
      name: "../preset.js",
      options: {
        extra: "hello",
      },
    },
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
};
