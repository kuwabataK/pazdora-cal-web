/* eslint-disable @typescript-eslint/no-var-requires */
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
  webpack(config) {
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

module.exports = withCSS(
  withSass({
    cssLoaderOptions: {
      url: false
    }
  })
)
