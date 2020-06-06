
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./node-build-tools.cjs.production.min.js')
} else {
  module.exports = require('./node-build-tools.cjs.development.js')
}
