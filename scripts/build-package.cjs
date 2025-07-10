const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

const distPkg = {
  name: pkg.name,
  version: pkg.version,
  main: 'index.cjs',
  module: 'index.js',
  types: 'index.d.ts',
  peerDependencies: pkg.peerDependencies,
  license: pkg.license,
  author: pkg.author,
  description: pkg.description,
  keywords: pkg.keywords
}

fs.writeFileSync(
  path.join(__dirname, '../dist/package.json'),
  JSON.stringify(distPkg, null, 2)
)
