# Enhanced.DB

> **Note:** This package was first published as Enhanced.DB but later i found that there was a very big spelling mistake XD so we changed the name to Enhanced.DB so need not to worry as it is almost same to it!

You can help us by joining our [Discord Server](https://discord.gg/FrduEZd)

**Docs:** [https://enhanceddb.science.repl.co/](https://enhanceddb.science.repl.co/)

![Enhanced.DB](https://nodei.co/npm/enhanced.db.png)

```js
const db = require('enhanced.db')

// Set Options
const options = {
    clearOnStart: false,
    filename: 'kek.sqlite'
}
// Setting clearOnStart true will clear the whole enhanced.sqlite. That would be false by default so if you dont need of that option no need of using options parameter!
// You can setup ur own custom file directory or location! But must be perfect for Sqlite Environment! It would be default to enhanced.sqlite!

// Will apply options to the default database table
db.options(options)
```

## Now here comes some easy database methods!

```js
db.set('foo', 'bar') // Will set value
db.get('foo') // Will return bar
db.has('foo') // Will return true
db.type('foo') // Will return string

db.all() // Will return all data
db.startsWith('f') // Will send you the array of the data which key's starts with f

db.set('foo', 1)
db.add('foo', 2) // Value would be 3 
db.subtract('foo', 2) // Value would be 2

db.delete('f') // Will delete key 'f'
db.deleteAll() // Will clear whole database! This will work only for default database table! If you are using custom table make sure that you use db.deleteTable()

db.set('foo', ['foo'])
db.push('foo', 'bar') // Will push value to the array!
db.includes('foo', 'bar') // Will return true
```

## Import Quick.DB data!
For those who wants to use this package but your Quick.DB has some important data! This is for you:

```js
// Import quick.db
const quick = require('quick.db')

// Create db in enhanced.db
const db = require('enhanced.db')

db.importQuick(quick.all())

// Will console.log you *Finished Exporting*
```

## Creating Tables
Create a custom table name which will be apart from the default database table

```js
const db = require('enhanced.db')
const table = new db.Table('myTable', options)
// 'myTable' is your table name
// Options is same as you saw in the first 'clearOnStart' and 'filename'

table.set('foo', 'bar') // Will set value
table.get('foo') // Will return bar
table.has('foo') // Will return true
table.type('foo') // Will return string

table.all() // Will return all data
table.startsWith('f') // Will send you the array of the data which key's starts with f

table.set('foo', 1)
table.add('foo', 2) // Value would be 3
table.subtract('foo', 2) // Value would be 2

table.delete('f') // Will delete key 'f'
table.deleteTable() // Will clear whole database! This will work only for custom table!

table.set('foo', ['foo'])
table.push('foo', 'bar') // Will push value to the array!
table.includes('foo', 'bar') // Will return true
```

## Some Utility
```js
const db = require('enhanced.db')

db.version // Returns current version of the package
db.uptime // Uptime of the project with Enhanced.db
```

## From Science Spot AKA Scientific Guy
- [Support: Discord Server](https://discord.gg/FrduEZd)
- [Issues: Github Repo](https://github.com/Scientific-Guy/enhanced.db)
