class Base{
  constructor(table, filename){
    this.table = table
    this.filename = filename
    this.db = require('better-sqlite3')(this.filename)
  }

  set(key, value){
    this.db.prepare(`CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`).run()
    
    let fetchedData =  this.db.prepare(`SELECT * FROM ${this.table} WHERE key = (?)`).get(key)

    if(!fetchedData){
      this.db.prepare(`INSERT INTO ${this.table} (key, value) VALUES (?,?)`).run(key, '{}')
      fetchedData = this.db.prepare(`SELECT * FROM ${this.table} WHERE key = (?)`).get(key)
    }

    this.db.prepare(`UPDATE ${this.table} SET value = (?) WHERE key = (?)`).run(JSON.stringify(value), key)
    return value
  }

  get(key){
    this.db.prepare(`CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`).run()

    let value = this.db.prepare(`SELECT * FROM ${this.table} WHERE key = (?)`).get(key)

    if(!value) return null
    try { return JSON.parse(value.value) }catch (e){ return value.value }
  }

  delete(key){
    this.db.prepare(`CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`).run()
    this.db.prepare(`DELETE FROM ${this.table} WHERE key = (?)`).run(key);
    return
  }

  all(){
    this.db.prepare(`CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`).run()

    var statement = this.db.prepare(`SELECT * FROM ${this.table} WHERE key IS NOT NULL`), data = statement.iterate()
    let result = []

    for(var set of data){
      result.push({key: set.key, value: JSON.parse(set.value)})
    }

    return result
  }
}

module.exports = Base
