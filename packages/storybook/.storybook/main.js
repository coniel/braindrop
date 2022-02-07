module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../../ui/**/*.stories.@(ts|tsx)',
    '../../app-ui/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
  ],
};
