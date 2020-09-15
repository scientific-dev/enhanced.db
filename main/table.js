const base = require('./base.js');
const fs = require('fs');

class Table{
  constructor(tablename, options={}){
    if(!tablename) tablename = 'database'

    if(options.clearOnStart != true) options.clearOnStart = false
    if(!options.filename) options.filename = 'enchanced.sqlite'

    this.tablename = tablename
    this.startedAt = Date.now()
    this.uptime = Date.now()-this.startedAt
    this.options = options
    this.filename = options.filename
    this.base = new base(this.tablename, this.filename)

    if(options.clearOnStart){
      this.base.all().map(db => db.key).forEach(key => this.base.delete(key))
    }

    if(options.backup){
      fs.writeFileSync(options.backup, fs.readFileSync(options.filename))
    }
  }

  set(key, value){
    if(!key || (!value && ![false, 0].includes(value))) throw new Error('You are either missing key or value to set!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    if(key.includes('.')){
      let args = (key.split('.').slice(1)).join('')
      key = key.split('.')[0]
      let oldValue = this.base.get(key)
      if(typeof oldValue == 'object'){
        console.log(oldValue)
        oldValue[args] = value
        console.log(args + key)
        return this.base.set(key,  oldValue)
      }
    }
    return this.base.set(key, value)
  }

  get(key){
    if(!key) throw new Error('You are either missing key to get!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    return this.base.get(key)
  }

  fetch(key){
    if(!key) throw new Error('You are either missing key to get!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    try { return JSON.parse(this.base.get(key)) }catch (e){ return this.base.get(key) }
  }

  delete(key){
    if(!key) throw new Error('You are either missing key to delete!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    return this.base.delete(key)
  }

  all(){ return this.base.all() }

  startsWith(search){
    if(!search) throw new Error('You are missing search parameter!')
    if(typeof search != 'string') throw new Error('Typeof search parameter must be a string!')

    let all = this.base.all(), result = []
    for(let i=0; i < all.length; i++){
      if(all[i].key.startsWith(search)) result.push(all[i])
    }

    return result
  }

  add(key, amount){
    if(!key || !amount) throw new Error('You are either missing key or amount to add!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    amount = parseInt(amount)
    if(typeof amount != 'number') throw new Error('Typeof amount must be a number to add!')

    let oldValue = parseInt(this.base.get(key))
    if(typeof oldValue != 'number') throw new Error('Target is not a number!')

    return this.base.set(key, Math.floor(oldValue+amount))
  }

  subtract(key, amount){
    if(!key || !amount) throw new Error('You are either missing key or amount to subtract!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    amount = parseInt(amount)
    if(typeof amount != 'number') throw new Error('Typeof amount must be a number to subtract!')

    let oldValue = parseInt(this.base.get(key))
    if(typeof oldValue != 'number') throw new Error('Target is not a number!')

    return this.base.set(key, Math.floor(oldValue-amount))
  }

  push(key, value){
    if(!key || !value) throw new Error('You are either missing key or value to push!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')

    let oldValue = JSON.parse(this.base.get(key))

    if(!Array.isArray(oldValue)) oldValue = [oldValue]

    oldValue.push(value)
    oldValue = oldValue.filter(x => x !== null)

    return this.base.set(key, (oldValue))
  }

  deleteTable(){ this.base.all().map(db => db.key).forEach(key => this.base.delete(key)) }

  has(key){
    if(!key) throw new Error('You are either missing key to find!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')

    let value = this.base.get(key)
    if(!value) return false
    else return true
  }

  importQuick(data){
    if(!data) throw new Error('Missing Data!')
    if(!Array.isArray(data)) throw new Error('Invalid Quick.DB Data!')

    data.forEach(d => {
      try{ this.base.set(d.ID, d.data) }catch(e) { console.log(`Failed to import: ${d}`) }
    })

    return console.log('Finished Importing!')
  }

  import(data){
    if(!data) throw new Error('Missing Data!')
    if(!Array.isArray(data)) throw new Error('Invalid Enchanced.DB Data!')

    data.forEach(d => {
      try{ this.base.set(d.key, d.value) }catch(e) { console.log(`Failed to import: ${d}`) }
    })

    return console.log('Finished Importing!')
  }

  type(key){ try{ return typeof JSON.parse(this.base.get(key)) }catch(e){ return typeof this.base.get(key) } }

  includes(key, value){
    if(!key || !value) throw new Error('Missing key or value!')
    let result = this.base.get(key)
    try{ result = JSON.parse(result) }catch(e){ throw new Error('Target is not an Array!') }
    if(!Array.isArray(result)) throw new Error('Target is not an Array!')
    return result.includes(key)
  }
}

module.exports = Table
