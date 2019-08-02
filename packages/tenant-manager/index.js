_ = require('lodash')
const uuid = require('uuid')
const domainTenant = require('./domain')

const isUnique = (tenant) => {
  return Promise.resolve(true)
}

const nextSteps = (config, tenant) => {
  return {'message': 'instructions go here'}
}

const fail = (message) => {
  return {
    'success': false,
    'message': message
  }
}

const preview = (config, tenant) => {
  _config = _.cloneDeep(config)
  _config.preview = true
  provision(_config, tenant)
}

const provision = (config, tenant) => {
  if(config.preview) {
    console.log('preview')
  } else {
    console.log('provision')
  }

  return new Promise( (resolve, reject) =>
  {
  isUnique(tenant)
    .then((unique) => {
      if (!unique) {
        return fail('already exists')
      } else {
        return {
          'success': true,
          'exists': false
        }
      }
    })
    .then( (progressiveResp) => {
      console.log('init domainTenant')
      domainTenant.init()
      console.log('start domainTenant')
      domainTenant.provision(config, tenant)
      resolve(progressiveResp)
    })
    .catch(reject)
    })
}

module.exports = { preview, provision }
