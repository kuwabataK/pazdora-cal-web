/* eslint-disable @typescript-eslint/no-var-requires */
const WorkboxPlugin = require('workbox-webpack-plugin')
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const cacheId = 'pazdora-cal'

module.exports = {
  webpack(config) {
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        cacheId: cacheId,
        swDest: 'service-worker.js',
        globDirectory: "/",
        globPatterns: [],
        runtimeCaching: [
          {
            urlPattern: /.+(\/|.html)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: cacheId + '-html-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7
              }
            }
          },
          {
            urlPattern: /.+\.(js|css|woff)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: cacheId + '-dependent-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 90
              }
            }
          },
          {
            urlPattern: /\.(png|svg|ttf|eot)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
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
