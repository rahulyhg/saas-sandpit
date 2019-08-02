AWS = require('aws-sdk')
// domain organised asset creation
// transform(defaultConfig, tenant)
S3 = null
const init = () => {
  awsConfig = require('../config/aws.json')
  AWS.config.update(awsConfig)
  S3 = new AWS.S3()
}
const provisionContentBucket = (config, tenant) => {
  params = {Bucket: config.tenant.content.s3[0]}
  console.log(S3)
  var op = S3.createBucket
  if (config.preview) {
    op = S3.headBucket
  }
  console.log('provisionContentBucket')
  new Promise((resolve, reject) => {
    op(params).promise()
      .then(resolve)
      .catch(reject)
  })  
}

const provisionBase = (config, tenant) => {
}

const provisionPool = (config, tenant) => {
  provisionContentBucket(config, tenant)
}

const provisionBridge = (config, tenant) => {}

const provisionSilo = (config, tenant) => {}

const preview = (config, tenant) => {
  provisionPool(config, tenant)
}

const provision = (config, tenant) => {
  return new Promise( (resolve, reject) => {
    provisionPool(config, tenant)
    .then(provisionBridge)
    .then(provisionSilo)
    .catch(reject)
    })
}

module.exports = { init, provision, provisionBase, provisionPool, provisionBridge, provisionSilo }
