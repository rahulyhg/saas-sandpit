const inquirer = require('inquirer');
const tenantManager = require('../tenant-manager')
const questions = [
  {'type': 'string',
   'name': 'tenant.name',
   'message': 'short name',
  },
  {'type': 'confirm',
   'name': 'confirm',
   'message': 'Is this correct?'}
]
const areYouSure = [{'type': 'confirm', 'name':'commit','message': 'Are you sure?'}]

defaultConfig = require('./config/default')

answers = null
inquirer
  .prompt(questions)
  .then( (_answers) => {
    answers = _answers
    tenantManager.preview(defaultConfig, answers)
    return null
  })
  .then( () => {
    return inquirer.prompt(areYouSure)
  })
  .then( (readyTo) => {
    if (readyTo.commit) {
      return tenantManager.provision(defaultConfig, answers)
    } else {
      return ({"message": "stopped"})
    }
  })
  .then( (resp) => {
    console.log('done', resp)
  });