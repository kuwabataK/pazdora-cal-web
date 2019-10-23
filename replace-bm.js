// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

function replaceStatic(filePath) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(/static/g, '_next/static')

    fs.writeFile(filePath, result, 'utf8', function(err) {
      if (err) return console.log(err)
    })
  })
}

fs.readdir('./out', function(err, files) {
  const fileList = files.filter(function(file) {
    return fs.statSync('out/' + file).isFile() && /precache*/.test(file) //絞り込み
  })
  fileList.forEach(fileName => {
    replaceStatic('out/' + fileName)
  })
})

const buildBMPath = 'out/build-manifest.json'
replaceStatic(buildBMPath)
