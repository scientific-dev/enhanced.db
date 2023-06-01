const Base = require("./base.js");

/**
 * Better Sqlite 3 Wrapper with more enhanced features!
 */

class Table {
  /**
   * Creates a sqlite3 table
   * @param {string} tablename Name of the Sqlite3 table
   * @param {object} options Configured options for your Table!
   * @example const { Table } = require('enhanced.db')
   * const table = new Table('myTable', { clearOnStart: false, filename: 'foo.sqlite' })
   */

  constructor(tablename, options) {
    if (!tablename) {
      tablename = "database";
    }

    if (options.clearOnStart !== true) {
      options.clearOnStart = false;
    }
    if (options.filename === "") {
      options.filename = "enhanced.sqlite";
    }

    this.tablename = tablename;
    this.startedAt = Date.now();
    this.options = options;
    this.filename = options.filename;
    this.base = new Base(this.tablename, this.filename);

    if (options.clearOnStart) {
      this.base
        .all()
        .map((db) => db.key)
        .forEach((key) => this.base.delete(key));
    }
  }

  /**
   * Set value for the key
   * @param {string} key ID
   * @param {any} value data
   * @example table.set('foo', 'bar')
   */

  set(key, value) {
    if (!key || (!value && ![false, 0].includes(value))) {
      throw new Error("You are either missing key or value to set!");
    }
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");
    if (key.includes(".")) {
      const args = key.split(".").slice(1).join("");
      key = key.split(".")[0];
      const oldValue = this.base.get(key);
      if (typeof oldValue === "object") {
        console.log(oldValue);
        oldValue[args] = value;
        console.log(args + key);
        return this.base.set(key, oldValue);
      }
    }
    return this.base.set(key, value);
  }

  /**
   * Get Value of the key
   * @param {string} key ID
   * @example table.get('foo')
   */

  get(key) {
    if (!key) throw new Error("You are either missing key to get!");
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");
    return this.base.get(key);
  }

  /**
   * Fetch Value of the key
   * @param {string} key ID
   * @example table.fetch('foo')
   */

  fetch(key) {
    if (!key) throw new Error("You are either missing key to get!");
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");
    return this.base.get(key);
  }

  /**
   * Delete a key
   * @param {string} key ID
   * table.delete('foo')
   */

  delete(key) {
    if (!key) throw new Error("You are either missing key to delete!");
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");
    return this.base.delete(key);
  }

  /**
   * Will return all data of the table
   * @example table.all()
   */

  all() {
    return this.base.all();
  }

  /**
   * Get all data whose key startswith your search
   * @param {string} search Thing to get startswith!
   * @example table.startsWith('foo')
   */

  startsWith(search) {
    if (!search) throw new Error("You are missing search parameter!");
    if (typeof search !== "string") {
      throw new Error("Typeof search parameter must be a string!");
    }

    const all = this.base.all();
    const result = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].key.startsWith(search)) result.push(all[i]);
    }

    return result;
  }

  /**
   * Add value to the key only if the old value is a number or null!
   * @param {string} key ID
   * @param {number} amount Amount to add
   * @example table.add('foo', 1)
   */

  add(key, amount) {
    if (!key || !amount) {
      throw new Error("You are either missing key or amount to add!");
    }
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");
    amount = parseInt(amount);
    if (typeof amount !== "number") {
      throw new Error("Typeof amount must be a number to add!");
    }

    const oldValue = parseInt(this.base.get(key));
    if (typeof oldValue !== "number")
      throw new Error("Target is not a number!");

    return this.base.set(key, Math.floor(oldValue + amount));
  }

  /**
   * Subtract value from the key's old value only if the old value is a number or null!
   * @param {string} key ID
   * @param {number} amount Amount to subtract
   * @example table.subtract('foo', 1)
   */

  subtract(key, amount) {
    if (!key || !amount) {
      throw new Error("You are either missing key or amount to subtract!");
    }
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");
    amount = parseInt(amount);
    if (typeof amount !== "number") {
      throw new Error("Typeof amount must be a number to subtract!");
    }

    const oldValue = parseInt(this.base.get(key));
    if (typeof oldValue !== "number")
      throw new Error("Target is not a number!");

    return this.base.set(key, Math.floor(oldValue - amount));
  }

  /**
   * Push value to the key's old value only if the old value is an array!
   * @param {string} key ID
   * @param {any} value Value to push
   */

  push(key, value) {
    if (!key || !value) {
      throw new Error("You are either missing key or value to push!");
    }
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");

    let oldValue = this.base.get(key);

    if (!Array.isArray(oldValue)) oldValue = [oldValue];

    oldValue.push(value);
    oldValue = oldValue.filter((x) => x !== null);

    return this.base.set(key, oldValue);
  }

  /**
   * Delete the whole table data!
   * @example table.deleteTable()
   */

  deleteTable() {
    this.base
      .all()
      .map((db) => db.key)
      .forEach((key) => this.base.delete(key));
  }

  /**
   * Will return boolean on the existence of the key!
   * @param {string} key ID
   * @example table.has('foo')
   */

  has(key) {
    if (!key) throw new Error("You are either missing key to find!");
    if (key.includes(" ")) throw new Error("You should not use spaces in key!");
    if (typeof key !== "string")
      throw new Error("Typeof key must be a string!");

    const value = this.base.get(key);
    if (!value) return false;
    else return true;
  }

  /**
   * Import Quick.DB data
   * @param {array} data Quick.DB data
   * @example const quick = require('quick.db')
   * table.importQuick(quick.all())
   */

  importQuick(data) {
    if (!data) throw new Error("Missing Data!");
    if (!Array.isArray(data)) throw new Error("Invalid Quick.DB Data!");

    data.forEach((d) => {
      try {
        this.base.set(d.ID, d.data);
      } catch (e) {
        console.log(`Failed to import: ${d}`);
      }
    });

    return console.log("Finished Importing!");
  }

  /**
   * Import Enhanced.DB data of other file or table!
   * @param {array} data Other file or table data of Enhanced.DB
   */

  import(data) {
    if (!data) throw new Error("Missing Data!");
    if (!Array.isArray(data)) throw new Error("Invalid Enhanced.DB Data!");

    data.forEach((d) => {
      try {
        this.base.set(d.key, d.value);
      } catch (e) {
        console.log(`Failed to import: ${d}`);
      }
    });

    return console.log("Finished Importing!");
  }

  /**
   * Will return you the typeof value of the key
   * @param {string} key ID
   * @example table.type('foo')
   */

  type(key) {
    try {
      return typeof JSON.parse(this.base.get(key));
    } catch (e) {
      return typeof this.base.get(key);
    }
  }

  /**
   * Will check if the value includes in the string or array!
   * @param {string} key ID
   * @param {any} value data
   * @example table.includes('foo', 'o') // Will return true!
   */

  includes(key, value) {
    if (!key || !value) throw new Error("Missing key or value!");
    const result = this.base.get(key);
    if (!Array.isArray(result)) throw new Error("Target is not an Array!");
    return result.includes(key);
  }

  /**
   * To check that the oldvalue is same to the your enetered value! Returns boolean
   * @param {string} key ID
   * @param {any} value Value to check
   * @example table.set('foo', 'bar')
   * table.is('foo', 'bar') // Will return true
   */

  is(key, value) {
    if (!key || (!value && ![false, 0].includes(value))) {
      throw new Error("Missing Key or value!");
    }
    return this.base.get(key) === value;
  }
}

/**
 * Export the Table
 */

module.exports = Table;
