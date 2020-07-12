const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
const sass = require('sass');
const fibers = require('fibers');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    publicPath: '/',
    stats: 'errors-only',
    port: 7777,
    hot: true,
    // host: '192.168.0.109',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
    },
    extensions: ['.vue', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ['vue-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assests/[name].[ext]',
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              import: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                fiber: fibers,
                indentedSyntax: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    // new CopyWebpackPlugin([{ from: 'src/public/', to: 'public/' }]),
  ],
};
