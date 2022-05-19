var path = require('path');

module.exports = env => {
  let indexFilename;
  switch (env.APP_TYPE) {
    case 'BUGS_HOOKS':
      indexFilename = 'index-bugs.js';
      break;
    default:
      indexFilename = 'index-nobugs.js';
  }

  return {
    entry: `./src/${indexFilename}`,
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
      libraryTarget: 'umd'
    },

    devServer: {
      contentBase: path.resolve(__dirname),
      compress: true,
      port: 8080,
      host: 'localhost',
      open: true,
      proxy: {
        '/rest': 'http://localhost:5059'
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      }
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components|build)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        }
      ]
    }
  };
};
