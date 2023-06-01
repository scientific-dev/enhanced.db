const Base = require("./base.js");

/**
 * Read EDB Sqlite files and will return data!
 */

class Read {
  /**
   * Read Class to read edb sqlite files
   * @param {string} filename
   * @param {object} options
   * @example const { Read } = require('enhanced.db')
   * const data = new Read('myOldFile.sqlite', { table: 'myCustomTable' })
   */

  constructor(filename, options = {}) {
    if (!filename) throw new Error("Missing filepath or filename!");
    if (!options.table) options.table = "database";

    this.filename = filename;
    this.options = options;
    this.base = new Base(this.options.table, this.filename);
  }

  /**
   * Render the data by the given options from the constructor
   * @example const renderedData = data.get() // Now you have got all the data in object[] form
   */

  get() {
    return this.base.all();
  }
}

/**
 * Export the table
 */

module.exports = Read;
