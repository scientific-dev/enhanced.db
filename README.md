# Enhanced.DB

You can help us by joining our [Discord Server](https://discord.gg/FrduEZd)! 
This package workd good with Typescript too...

**Docs:** https://enhanceddb.science.repl.co/

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
db.is('foo', 'bar') // Will return true

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
table.is('foo', 'bar') // Will return true

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
```

## Read EDB Sqlite files

Using this class you can read edb sqlite files and use import to import data!

```js
// Import Read Constructor
const { Read } = require("enhanced.db")

// Set options if needed
const options = {
    table: 'myCustomTable'
}
// Setting table will read that table of that file else it will read the default database one!

const data = new Read(filename, options)
// FIlename would be the name of the file to read

console.log(data.get())
// Will you return the the data selected as your options selected!

```

## From Science Spot AKA Scientific Guy
- [Support: Discord Server](https://discord.gg/FrduEZd)
- [Issues: Github Repo](https://github.com/Scientific-Guy/enhanced.db)
