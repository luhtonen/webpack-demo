/**
 * Created by luhtonen on 11/05/16.
 */

'use strict';

const webpack = require('webpack');

exports.devServer = function (options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based routing works.
      // This is good default that will come handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customisation.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || 0.0.0.0;
      //
      // 0.0.0.0 is available to all network devices unlike default `localhost`.
      host: options.host, // Defaults to 'localhost'
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
};

exports.setupCSS = function (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  };
};

exports.minify = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
          // following drops logging
          //drop_console: true
        }
        /*
         // mangling reduces size of variable names to a minimum
        mangle: {
          // Mangle matching properties
          props: /matching_props/,
          // Don't mangle these
          except: [
            'Array', 'BigInteger', 'Boolean', 'Buffer'
          ]
        }
        */
      })
    ]
  };
};

exports.setFreeVariable = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};