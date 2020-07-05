module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-syntax-dynamic-import'],
  ],
};
