const base = require('./base.js')

class Read{
  constructor(filename, options={}){
    if(!filename) throw new Error('Missing filepath or filename!')
    if(!options.table) options.table = 'database'

    this.filename = filename
    this.options = options
    this.base = new base(this.options.table, this.filename)
  }

  get(){
    if(!this.options.returnAs){
      return this.base.all()
    }

    let result = []
    let returnAs = this.options.returnAs
    this.base.all().forEach(x => {
      result.push(JSON.parse(`{"${returnAs.key}": ${JSON.stringify(x.key)}, "${returnAs.value}": ${JSON.stringify(x.value)}}`))
    })
    return result
  }
}

module.exports = Read
