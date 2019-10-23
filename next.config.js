/* eslint-disable @typescript-eslint/no-var-requires */
const WorkboxPlugin = require('workbox-webpack-plugin')
/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
  webpack(config) {
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        cacheId: 'workbox',
        swDest: 'service-worker.js',
        skipWaiting: true,
        clientsClaim: false,
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'CacheFirst',
            options: {
              cacheName: 'page',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          },
          {
            urlPattern: /\.(png|svg|woff|ttf|eot)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 14
              }
            }
          }
        ]
      })
    )
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: 'worker-loader',
      options: {
        // inline: true,
        name: 'static/[hash].worker.js',
        publicPath: '/_next/'
      }
    })
    // Overcome webpack referencing `window` in chunks
    config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`
    return config
  }
}
