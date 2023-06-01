/**
 * Main file
 * Export thing all methods, functions, etc
 */

const startedAt = Date.now()

const Table = require('./main/table.js')
const read = require('./main/read.js')

module.exports = {
  options: (options) => (this.db = new Table('database', options)),
  startedAt,
  version: require('./package.json').version,
  Table,
  Read: read,
  set: (key, value) => this.db.set(key, value),
  get: (key) => this.db.get(key),
  fetch: (key) => this.db.fetch(key),
  all: () => this.db.all(),
  startsWith: (search) => this.db.startsWith(search),
  has: (key) => this.db.has(key),
  type: (key) => this.db.type(key),
  add: (key, amount) => this.db.add(key, amount),
  subtract: (key, amount) => this.db.subtract(key, amount),
  push: (key, value) => this.db.push(key, value),
  includes: (key, value) => this.db.includes(key, value),
  is: (key, value) => this.db.is(key, value),
  delete: (key) => this.db.delete(key),
  deleteAll: () => this.db.deleteTable(),
  import: (data) => this.db.import(data),
  importQuick: (data) => this.db.importQuick(data)
}
