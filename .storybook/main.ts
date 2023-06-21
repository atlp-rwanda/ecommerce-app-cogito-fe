import type { StorybookConfig } from '@storybook/react-vite';
// const config: StorybookConfig = {
//   stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
//   addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
//   webpackFinal: async (config: any) => {
//     config.module.rules.push({
//       test: /\.css$/,
//       use: ['style-loader', 'css-loader', 'postcss-loader'],
//     }),
//   framework: {
//     name: '@storybook/react-vite',
//     options: {},
//   },
//   docs: {
//     autodocs: 'tag',
//   },
// };
// export default config;

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });

    return config;
  },
};
