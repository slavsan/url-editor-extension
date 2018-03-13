const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'build')
const APP_DIR = path.resolve(__dirname, 'src')

const config = {
  devServer: {
    port: 8090,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  entry: {
    'app.js': path.join(APP_DIR, '/popup/main.jsx'),
    'background.js': path.join(APP_DIR, '/background/main.js')
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}

module.exports = config
