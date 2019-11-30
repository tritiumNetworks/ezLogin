const { AccountBase, version } = require('../index')
const { resolve } = require('path')
const prompts = require('prompts')

console.log('quickLogin v' + version)

const db = new AccountBase({ save: true, path: resolve() + '/example/test.json' })

proc()

function join () {
  prompts([
    { type: 'text', name: 'id', message: 'Please enter your ID' },
    { type: 'password', name: 'pw', message: 'Please enter your PassWord' }
  ]).then((aws) => {
    switch (db.register(aws.id, aws.pw)) {
      case 0: console.log('Registered Sucessfully ' + JSON.stringify(db.accounts)); break
      case 1: console.log('Please Enter your id & passwd'); break
      case 2: console.log('Account Base is not loading yet'); break
      case 3: console.log('this id has been taken'); break
      default: console.log('There is an Error!'); break
    }
    proc()
  })
}

function login () {
  prompts([
    { type: 'text', name: 'id', message: 'Please enter your ID' },
    { type: 'password', name: 'pw', message: 'Please enter your PassWord' }
  ]).then((aws) => {
    switch (db.login(aws.id, aws.pw)) {
      case 0: console.log('Login Correct'); break
      case 1: console.log('Please Enter your id & passwd'); break
      case 2: console.log('Account Base is not loading yet'); break
      case 3: console.log('ID is not Correct'); break
      case 4: console.log('Passwd is not Correct'); break
      default: console.log('There is an Error!'); break
    }
    proc()
  })
}

function changePw () {
  prompts([
    { type: 'text', name: 'id', message: 'Please enter your ID' },
    { type: 'password', name: 'oldpw', message: 'Please enter your old PassWord' },
    { type: 'password', name: 'newpw', message: 'Please enter your new PassWord' }
  ]).then((aws) => {
    switch (db.changePW(aws.id, aws.oldpw, aws.newpw)) {
      case 0: console.log('Changed Passwd Succefully'); break
      case 1: console.log('Please Enter your id & passwd'); break
      case 2: console.log('Account Base is not loading yet'); break
      case 3: console.log('ID is not Correct'); break
      case 4: console.log('Passwd is not Correct'); break
      default: console.log('There is an Error!'); break
    }
    proc()
  })
}

function proc () {
  prompts({
    type: 'select',
    name: 'f',
    message: 'what\'s up?',
    choices: [
      { title: 'Join', value: join },
      { title: 'Log in', value: login },
      { title: 'Change PW', value: changePw },
      { title: 'exit', value: process.exit }
    ]
  }).then((aws) => {
    aws.f()
  })
}
