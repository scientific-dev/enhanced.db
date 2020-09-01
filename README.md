# Enchanced.DB

An easy way to created better-sqlite3 database with some enchancements! This package is inspired from Quick.DB but as Quick.DB was missing some features so me (Science Spot AKA Scientific Guy) recreated it with less codes and easy enchancements! We didn't made this package to compete with Quick.Db. This was just to made fullfil needs!

You can help us by joining our [Discord Server](https://discord.gg/FrduEZd)

```js
const db = require('enchanced.db')

// Set Options
const options = {
    clearOnStart: false,
    filename: 'kek.sqlite'
}
// Setting clearOnStart true will clear the whole enchanced.sqlite. That would be false by default so if you dont need of that option no need of using options parameter!
// You can setup ur own custom file directory or location! But must be perfect for Sqlite Environment! It would be default to enchanced.sqlite!

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
```

## Import Quick.DB data!
For those who wants to use this package but your Quick.DB has some important data! This is for you:

```js
// Import quick.db
const quick = require('quick.db')

// Create db in enchanced.db
const db = require('enchanced.db')

db.importQuick(quick.all())

// Will console.log you *Finished Exporting*
```

## Creating Tables
Create a custom table name which will be apart from the default database table

```js
const db = require('enchanced.db')
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
```

## Some Utitly
```js
const db = require('enchanced.db')

db.version // Returns current version of the package
db.startedAt // Returns time in ms when the project started connecting with database
```

## From Science Spot AKA Scientific Guy
- [Support: Discord Server](https://discord.gg/FrduEZd)
- [Issues: Github Repo](https://github.com/Scientific-Guy/enchanced.db)
