const startedAt = Date.now()

module.exports = {
  version: require('./package.json').version,
  startedAt: startedAt,
  Table: require('./main/table.js')
}