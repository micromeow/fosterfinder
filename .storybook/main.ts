import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
const config: StorybookConfig = {
  stories: [
    '../stories/Introduction.mdx', // default storybook intro
    '../stories/**/*.@(js|jsx|ts|tsx|mdx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
    {
      name: '@storybook/addon-styling',
      options: {
        postcss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, '../components'),
      '@/lib': path.resolve(__dirname, '../lib'),
    };
    return config;
  },
};
export default config;
