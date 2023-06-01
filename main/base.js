/**
 * Base file for all table.js and read.js
 * This file cannot be accessed because its directly linked to table.js
 */

class Base {
  /**
   * Will connect to sqlite file
   * @param {string} table
   * @param {string} filename
   */

  constructor (table, filename) {
    this.table = table
    this.filename = filename
    this.db = require('better-sqlite3')(this.filename)
  }

  /**
   * Sets value to the key...
   * @param {string} key ID
   * @param {any} value data
   */

  set (key, value) {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`
      )
      .run()

    let fetchedData = this.db
      .prepare(`SELECT * FROM ${this.table} WHERE key = (?)`)
      .get(key)

    if (!fetchedData) {
      this.db
        .prepare(`INSERT INTO ${this.table} (key, value) VALUES (?,?)`)
        .run(key, '{}')
      fetchedData = this.db
        .prepare(`SELECT * FROM ${this.table} WHERE key = (?)`)
        .get(key)
    }

    this.db
      .prepare(`UPDATE ${this.table} SET value = (?) WHERE key = (?)`)
      .run(JSON.stringify(value), key)
    return value
  }

  /**
   * Get value of a key
   * @param {string} key ID
   */

  get (key) {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`
      )
      .run()

    const value = this.db
      .prepare(`SELECT * FROM ${this.table} WHERE key = (?)`)
      .get(key)

    if (!value) return null
    try {
      return JSON.parse(value.value)
    } catch (e) {
      return value.value
    }
  }

  /**
   * Delete a key
   * @param {string} key ID
   */

  delete (key) {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`
      )
      .run()
    this.db.prepare(`DELETE FROM ${this.table} WHERE key = (?)`).run(key)
  }

  /**
   * Get all values of a key
   */

  all () {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.table} (key TEXT, value TEXT)`
      )
      .run()

    const statement = this.db.prepare(
      `SELECT * FROM ${this.table} WHERE key IS NOT NULL`
    )
    const data = statement.iterate()
    const result = []

    for (const set of data) {
      result.push({ key: set.key, value: JSON.parse(set.value) })
    }

    return result
  }
}

/**
 * Export the table
 */

module.exports = Base
