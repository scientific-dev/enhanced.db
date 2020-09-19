> This docs is no more maintained! New Docs: https://enhanceddb.science.repl.co/

# Enchanced.DB

So most of them knows what is **Enchanced.DB** a enchanced version of **Quick.DB** but this one is recreated without any source code. Then nothing to say! The Docs will say everything

# Index
- [Requirements](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#requirements)
- [Things to know](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#things-to-know)
- [Getting Started](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#getting-started)
  - [Set](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#set)
  - [Get](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#get)
  - [All](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#all)
  - [StartsWith](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#startswith)
  - [Has](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#has)
  - [Type](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#type)
  - [Add](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#add)
  - [Subtract](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#subtract)
  - [Options](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#options)
  - [Push](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#push)
  - [Includes](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#includes)
  - [Delete](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#delete)
  - [DeleteAll](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#deleteall)
  - [Import](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#import)
  - [ImportQuick](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#importquick)
- [Introduction To Tables](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#introduction-to-tables)
- [Some Links](https://github.com/Scientific-Guy/enchanced.db/blob/master/docs.md#some-links)

# Requirements
- v0.0.90 of **Enchanced.DB** or higher
- Basic knowledge with JS
- Better IDE

# Things to know
I was using Quick.DB for some works but i felt so much missing in **Quick.DB** so i decided to make **Enchanced.DB**! This package is not made to compete. This is just made to help others using Quick.DB with some more features! This works same as **Quick.DB** works with less codes using **better-sqlite3** and **fs**. There are no demerits with the package excpet that package stores data in key and value where as **Quick.DB** stores in **ID** and **data** which will make mess if you are using both side by side but if you know **Enchanced.DB** you can use **importQuick()** to import datas from **Quick.DB**!

# Docs

## Getting Started
Import Package
```js
const db = require('enchanced.db')
```

## Set
Set value to the key!

```js
db.set(key, value)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |
| value | string, object or array | Data of the ID |

## Get
Get value of the key!

```js
db.get(key)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |

## All
Get all the data in the database

```js
db.all()
```

> **NOTE:** Remember if you are doing db.all() this will return data but if you made tables. The data of those tables wont return to get those data you have to do ``table.all()`` method where ``table`` is the constructor. In future we will be solving this problem too!

## StartsWith
Will filter data with startsWith() function! This will also return the data startswith the search parameter excluding tables!

```js
db.startsWith(search)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| search | string | String to filter data with ``startsWith()`` |

## Has
Will return true or false if it has value or not for that key

```js
db.has(key)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |

## Type
Will return tyepof the key

```js
db.type(key)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |

## Add
Will add value to the existing value of the key only if its number

```js
db.add(key, amount)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |
| amount | number | Amount to add |

## Subtract
Will subtract value from the existing value of the key only if its number

```js
db.subtract(key, amount)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |
| amount | number | Amount to subtract |

## Options
There are some options which makes this database unique!

```js
db.options(options)
```

**Options:**
| Options Name  | Tyepof     | Description | Default |
| ----------------|------------|-------------|---------|
| clearOnStart | boolean | Will clear database on restart of program only if its set to `true` | false |
| filename | string | Name of the file where data will be stored! | 'enchanced.sqlite' |

> **NOTE:** Use `import()` if you are switching to a new file

## Push
Push data to the old value if its an Array

```js
db.push(key, value)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |
| value | any | Value to push |

## Includes
Will check oldData if it includes value in the OldValue Array

```js
db.includes(key, value)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |
| value | any | Value to check if its included! |


## Delete
Will delete value of the key

```js
db.delete(key)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| key | string | ID of the value |

## DeleteAll
Will delete all values of the keys. This will support only to the deafult database table not to the custom tables....

```js
db.deleteAll()
```

## Import
Import data from table to table or table to default table or vice versa but only for `{key: key, value: value}` type stored data!

```js
db.import(data)
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| data | object | all() **Only Enchanced.DB** data only! |

## ImportQuick
Import data from Quick.DB table data or default table data!

```js
const quick = require('quick.db')
const db = require('enchanced.db')

db.importQuick(quick.all())
```

**Parameters:**
| Parameter Name  | Tyepof     | Description |
| ----------------|------------|-------------|
| data | object | all() **Only Quick.DB** data only! |

## Introduction to Tables
So if you are Quick.DB user you know what is this. Till now you have use default database table named `database` but using the `Table` constructor you can make custom Sqlite Database Tables with custom names and options too

### Setting up Tables
```js
const { Table } = require('enchanced.db')
const table = new Table(tableName, options)
```

**Parameters:**
| Parameter Name | Tyepof | Description |
|----------------|--------|-------------|
| tableName | string | Your custom table name |
| options | object | Same as `options()` method in the default database table! **Options:** `clearOnStart` and `filename` |

### Methods and functions of the tables
If you have read the docs from first then you have learnt **Enchanced.DB** finally because `Table` constructor has same methods!

**Methods:** `set`, `get`, `all`, `startsWith`, `has`, `type`, `add`, `subtract`, `delete`, `deleteTable`, `import`, `importQuick`, `push`, `includes`

> **Note:** There is no use of `options()` function in `Table` constructor because you can set it in the constructor parameter Options itself. And you need to use `deleteTable()` function instead of `deleteAll()` for custom tables!

# Some Links
 - **Discord Server Link:** [https://discord.gg/FrduEZd](https://discord.gg/FrduEZd)
 - **GitHub Repo Link:** [https://github.com/Scientific-Guy/enchanced.db](https://github.com/Scientific-Guy/enchanced.db)
