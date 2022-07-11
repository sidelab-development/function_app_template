const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const functions = require('./scripts/javascript/webpack-entries.js');

const basePackage = {
  name: 'datacoin_backend',
  version: '1.0.0',
  description: 'Sidelab - Datacoin V2',
};

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  context: __dirname, // to automatically find tsconfig.json
  mode: 'production',
  entry: functions.entries,
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack')
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      }
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new GeneratePackageJsonPlugin(basePackage)],
};
