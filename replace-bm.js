// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const filePath = 'out/build-manifest.json'

fs.readFile(filePath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err)
  }
  const result = data.replace(/static/g, '_next/static')

  fs.writeFile(filePath, result, 'utf8', function(err) {
    if (err) return console.log(err)
  })
})
