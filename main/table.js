const base = require('./base.js')
const fs = require('fs')

class Table{
  constructor(tablename, options={}){
    if(!tablename) tablename = 'database'

    if(options.clearOnStart != true) options.clearOnStart = false

    if(options.clearOnStart) fs.writeFileSync('enchanced.sqlite', '')

    this.tablename = tablename
    this.createdAt = Date.now()
    this.options = options
  }

  set(key, value){
    if(!key || !value) throw new Error('You are either missing key or value to set!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    return base.set(key, value, this.tablename)
  }

  get(key){
    if(!key) throw new Error('You are either missing key to get!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    try { return JSON.parse(base.get(key, this.tablename)) }catch (e){ return base.get(key, this.tablename) }
  }

  delete(key){
    if(!key) throw new Error('You are either missing key to delete!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    return base.delete(key, this.tablename)
  }

  all(){
    return base.all(this.tablename)
  }

  startsWith(search){
    if(!search) throw new Error('You are missing search parameter!')
    if(typeof search != 'string') throw new Error('Typeof search parameter must be a string!')

    let all = base.all(this.tablename), result = []
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

    let oldValue = parseInt(base.get(key, this.tablename))
    if(typeof oldValue != 'number') throw new Error('Target is not a number!')

    return base.set(key, Math.floor(oldValue+amount), this.tablename)
  }

  subtract(key, amount){
    if(!key || !amount) throw new Error('You are either missing key or amount to subtract!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')
    amount = parseInt(amount)
    if(typeof amount != 'number') throw new Error('Typeof amount must be a number to subtract!')

    let oldValue = parseInt(base.get(key, this.tablename))
    if(typeof oldValue != 'number') throw new Error('Target is not a number!')

    return base.set(key, Math.floor(oldValue-amount), this.tablename)
  }

  push(key, value){
    if(!key || !value) throw new Error('You are either missing key or value to push!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')

    let oldValue = JSON.parse(base.get(key, this.tablename))

    if(!Array.isArray(oldValue)) oldValue = [oldValue]

    oldValue.push(value)
    oldValue = oldValue.filter(x => x !== null)

    return base.set(key, (oldValue), this.tablename)
  }

  deleteAll(){
    fs.writeFileSync('enchanced.sqlite', '')
    return
  }

  has(key){
    if(!key) throw new Error('You are either missing key to find!')
    if(key.includes(' ')) throw new Error('You should not use spaces in key!')
    if(typeof key != 'string') throw new Error('Typeof key must be a string!')

    let value = base.get(key, this.tablename)
    if(!value) return false
    else return true
  }

  importQuick(data){
    if(!data) throw new Error('Missing Data!')
    if(!Array.isArray(data)) throw new Error('Invalid Quick.DB Data!')

    data.forEach(d => {
      try{ base.set(d.ID, d.data, this.tablename) }catch(e) { console.log(`Failed to import: ${d}`) }
    })

    return console.log('Finished Importing!')
  }

  toJson(file){
    if(!file) throw new Error('Missing file to extract!')
    fs.writeFileSync(file, JSON.stringify(base.all(this.tablename)))
  }
}

module.exports = Table
