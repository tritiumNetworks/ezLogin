const { AccountBase, version } = require('../index')
const { resolve } = require('path')
const { unlinkSync } = require('fs')

console.log('quickLogin v' + version)

unlinkSync(resolve() + '/example/test.json')
const db = new AccountBase({ save: true, path: resolve() + '/example/test.json' })

switch (db.register('pmh_only', 'nitrogen123')) {
  case 0: console.log('Registered Sucessfully'); break
  case 1: console.log('Please Enter your id & passwd'); break
  case 2: console.log('Account Base is not loading yet'); break
  case 3: console.log('this id has been taken'); break
  default: console.log('There is an Error!'); break
}
console.log(JSON.stringify(db.accounts) + '\n')

switch (db.register('pmh_only', 'nitrogen123')) {
  case 0: console.log('Registered Sucessfully'); break
  case 1: console.log('Please Enter your id & passwd'); break
  case 2: console.log('Account Base is not loading yet'); break
  case 3: console.log('this id has been taken'); break
  default: console.log('There is an Error!'); break
}

switch (db.login('pmh_only', 'nitrogen123')) {
  case 0: console.log('Login Correct'); break
  case 1: console.log('Please Enter your id & passwd'); break
  case 2: console.log('Account Base is not loading yet'); break
  case 3: console.log('ID is not Correct'); break
  case 4: console.log('Passwd is not Correct'); break
  default: console.log('There is an Error!'); break
}

switch (db.login('pmhonly', 'nitrogen123')) {
  case 0: console.log('Login Correct'); break
  case 1: console.log('Please Enter your id & passwd'); break
  case 2: console.log('Account Base is not loading yet'); break
  case 3: console.log('ID is not Correct'); break
  case 4: console.log('Passwd is not Correct'); break
  default: console.log('There is an Error!'); break
}

switch (db.login('pmh_only', 'nitrogen1234')) {
  case 0: console.log('Login Correct'); break
  case 1: console.log('Please Enter your id & passwd'); break
  case 2: console.log('Account Base is not loading yet'); break
  case 3: console.log('ID is not Correct'); break
  case 4: console.log('Passwd is not Correct'); break
  default: console.log('There is an Error!'); break
}

db.break()
