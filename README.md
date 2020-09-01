# Enchanced.DB

An easy way to created better-sqlite3 database with some enchancements! This package is inspired from Quick.DB but as Quick.DB was missing some features so me (Science Spot AKA Scientific Guy) recreated it with less codes and easy enchancements! We didn't made this package to compete with Quick.Db. This was just to made fullfil needs!

Currently the most of the features here is useless. We will be making this more enchanced. If you want to help us join our Discord Server! Its at the very bottom of the page :)

> **Note:** The only demerit with the package is that you need to create Table whatever you use as example given below! Secondly as Quick.DB stores data in json.sqlite whereas Enchanced.DB stores in enchanced.sqlite to prevent confuse with 2 different packages!

```js
// Import Table Constructor first
const { Table } = require('enchanced.db')

// Set Options
const options = {
    clearOnStart: false
}
// Setting clearOnStart true will clear the whole enchanced.sqlite. That would be false by default so if you dont need of that option no need of using options parameter!

const name = 'myTable'
// Name parameter will be the name of the tabel!

const db = new Table(name, options)
```

## Now comes here some easy database methods!

```js
db.set('foo', 'bar') // Will set value
db.get('foo') // Will return bar
db.has('foo') // Will return true

db.all() // Will return all data
db.toJson('kek') // Will extract all data to a file 'kek.json'
db.startsWith('f') // Will send you the array of the data which key's starts with f

db.set('foo', 1)
db.add('foo', 2) // Value would be 3
db.subtract('foo', 2) // Value would be 2

db.delete('f') // Will delete key 'f'
db.deleteAll() // Will clear whole database!

db.set('foo', ['foo'])
db.push('foo', 'bar') // Will push value to the array!
```

## Import Quick.DB data!
For those who wants to use this package but your Quick.DB has some important data! This is for you:

```js
// Import quick.db
const quick = require('quick.db')

// Create table in enchanced.db
const { Table } = require('enchanced.db')
const db = new Table('kek')

db.importQuick(db.all())

// Will console.log you *Finished Exporting*
```

## From Science Spot AKA Scientific Guy
[Discord Server](https://discord.gg/FrduEZd)