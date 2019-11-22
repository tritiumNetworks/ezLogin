const { existsSync, readFile, writeFileSync } = require('fs')
const sha256 = require('js-sha256')
const saltGen = require('../function/saltGen')

class AccountBase {
  constructor (options) {
    if (!options || typeof options !== 'object') options = {}

    this.option = {
      save: !options.save || typeof options.save !== 'boolean' ? false : options.save,
      path: !options.path || typeof options.path !== 'string' ? null : options.path,

      salts: !options.salts || !Array.isArray(options.salts) ? saltGen.hard() : options.salts,
      genSalt: !options.genSalt || typeof options.genSalt !== 'number' ? 60000 : options.genSalt,
      newSalt: !options.newSalt || typeof options.newSalt !== 'boolean' ? true : options.newSalt
    }

    if (existsSync(this.option.path)) {
      this.accounts = require(this.option.path)
      readFile(this.option.path, (err1, data) => {
        if (err1) console.error(new Error(err1))
        try { this.accounts = Array.isArray(JSON.parse(data)) ? [] : JSON.parse(data) } catch (err2) { console.error(err2) }
      })
    } else {
      this.accounts = []
    }

    if (this.option.save) this.save = setInterval(() => { if (this.accounts) writeFileSync(this.option.path, JSON.stringify(this.accounts)) }, 500)
    if (this.option.newSalt) this.genSalt = setInterval(() => { if (this.accounts) this.option.salts = saltGen.hard() }, this.option.genSalt)
  }

  register (id, pw) {
    if (!id || !pw) return 1 // 'Please Enter your id & passwd'
    if (!this.accounts) return 2 // 'Account Base is not loading yet'

    if (this.accounts.filter((a) => a.id === id).length > 0) return 3 // 'this id has been taken'

    const salt = this.option.salts[Math.floor(Math.random() * this.option.salts.length)]
    this.accounts[this.accounts.length] = { id, pw: sha256(pw + salt), salt }

    return 0 // 'Sucessfully'
  }

  login (id, pw) {
    if (!id || !pw) return 1 // 'Please Enter your id & passwd'
    if (!this.accounts) return 2 // 'Account Base is not loading yet'

    const found = this.accounts.filter((a) => a.id === id)
    if (found.length < 1) return 3 // 'ID is not Correct'

    const salt = found[0].salt
    const fpw = found[0].pw

    if (sha256(pw + salt) !== fpw) return 4 // 'Passwd is not Correct'
    else return 0 // 'Correct!'
  }

  break () {
    if (this.accounts && this.option.save) writeFileSync(this.option.path, JSON.stringify(this.accounts))

    if (this.save) clearInterval(this.save)
    if (this.genSalt) clearInterval(this.genSalt)
  }
}

module.exports = AccountBase
