const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

function getClientEnvironment() {
  // Grab NX_* or APP_* environment variables and prepare them to be injected
  // into the application via DefinePlugin in webpack configuration.
  const ENV_PREFIX = /^(NX_|APP_)/i;

  const raw = Object.keys(process.env)
    .filter((key) => ENV_PREFIX.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = (config, options, context) => {
  // Overwrite the mode set by Angular if the NODE_ENV is set
  config.mode = process.env.NODE_ENV || config.mode;
  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment()));
  config.plugins.push(new NodePolyfillPlugin());
  return config;
};
