/**
 * Main file
 * Export thing all methods, functions, etc
 */

const fs = require('fs')
const startedAt = Date.now()

let db = (ops) => new (require('./main/table.js'))('database', ops)

module.exports = {
  options: (options) => this.options = options,
  version: require('./package.json').version,
  startedAt: startedAt,
  Table: require('./main/table.js'),
  Read: require('./main/read.js'),
  set: (key, value) => db(this.options).set(key, value),
  get: (key) => db(this.options).get(key),
  fetch: (key) => db(this.options).fetch(key),
  all: () => db(this.options).all(),
  startsWith: (search) => db(this.options).startsWith(search),
  has: (key) => db(this.options).has(key),
  type: (key) => db(this.options).type(key),
  add: (key, amount) => db(this.options).add(key, amount),
  subtract: (key, amount) => db(this.options).subtract(key, amount),
  push: (key, value) => db(this.options).push(key, value),
  includes: (key, value) => db(this.options).includes(key, value),
  is: (key, value) => db(this.options).is(key, value),
  delete: (key) => db(this.options).delete(key),
  deleteAll: () => db(this.options).deleteTable(),
  import: (data) => db(this.options).import(data),
  importQuick: (data) => db(this.options).importQuick(data)
}
