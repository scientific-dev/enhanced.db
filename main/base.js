// Import Packages first
const db = require('better-sqlite3')('enchanced.sqlite')

// Export data
module.exports = {
  set: function set(key, value, table){
    if(!table) table = 'database'
    db.prepare(`CREATE TABLE IF NOT EXISTS ${table} (key TEXT, value TEXT)`).run()
    
    let fetchedData =  db.prepare(`SELECT * FROM ${table} WHERE key = (?)`).get(key)

    if(!fetchedData){
      db.prepare(`INSERT INTO ${table} (key, value) VALUES (?,?)`).run(key, '{}');
      fetchedData = db.prepare(`SELECT * FROM ${table} WHERE key = (?)`).get(key);
    }

    db.prepare(`UPDATE ${table} SET value = (?) WHERE key = (?)`).run(value, key)
    return value
  },

  get: function get(key, table){
    if(!table) table = 'database'

    db.prepare(`CREATE TABLE IF NOT EXISTS ${table} (key TEXT, value TEXT)`).run()

    let value = db.prepare(`SELECT * FROM ${table} WHERE key = (?)`).get(key)

    if(!value) return null
    return value.value
  },

  delete: function del(key, table){
    if(!table) table = 'database'

    db.prepare(`CREATE TABLE IF NOT EXISTS ${table} (key TEXT, value TEXT)`).run()
    db.prepare(`DELETE FROM ${table} WHERE key = (?)`).run(key);

    return
  },

  all: function all(table){
    if(!table) table = 'database'

    db.prepare(`CREATE TABLE IF NOT EXISTS ${table} (key TEXT, value TEXT)`).run()

    var statement = db.prepare(`SELECT * FROM ${table} WHERE key IS NOT NULL`), data = statement.iterate()
    let result = []

    for(var set of data){
      result.push({key: set.key, value: set.value})
    }

    return result
  }
}