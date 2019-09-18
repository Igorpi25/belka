const AWS = require('aws-sdk')

const region = process.env.REGION

const docClient = new AWS.DynamoDB.DocumentClient({ region })

const reqOwnerAuthorizationCheck = (input, identity, groups = []) => {
  // [Start] Owner Authorization Checks **
  let isOwnerAuthorized = false
  let fields = {}
  const identityValue = identity.claims.username || (identity.claims[COGNITO_USERNAME_CLAIM_KEY] || '___xamznone____')
  // Authorization rule: { allow: owner, ownerField: "owner", identityClaim: "cognito:username" } **
  const allowedOwner = input.owner || null
  if (allowedOwner === identityValue) {
    isOwnerAuthorized = true
  }
  if (!allowedOwner && !input.hasOwnProperty('owner')) {
    fields.owner = identityValue
  }
  // Authorization rule: { allow: owner, ownerField: "team", identityClaim: "cognito:username" } **
  for (let group of groups) {
    const allowedOwnerGroup = input[group] || null
    if (allowedOwnerGroup && allowedOwnerGroup.length > 0) {
      for (let owner of allowedOwnerGroup) {
        if (owner === identityValue) {
          isOwnerAuthorized = true
        }
      }
    }
    if (!allowedOwnerGroup && !input.hasOwnProperty(group)) {
      fields[group] = [identityValue]
    }
  }
  // [End] Owner Authorization Checks **
  if (!isOwnerAuthorized) {
    return false
  } else {
    return fields
  }
}

const resOwnerAuthorizationCheck = (result, identity, groups = []) => {
  // [Start] Owner Authorization Checks **
  let isOwnerAuthorized = false
  const identityValue = identity.claims.username || (identity.claims[COGNITO_USERNAME_CLAIM_KEY] || '___xamznone____')
  // Authorization rule: { allow: owner, ownerField: "owner", identityClaim: "cognito:username" } **
  const allowedOwner = result.owner || null
  if (allowedOwner === identityValue) {
    isOwnerAuthorized = true
  }
  // Authorization rule: { allow: owner, ownerField: "team", identityClaim: "cognito:username" } **
  for (let group of groups) {
    const allowedOwnerGroup = result[group] || null
    if (allowedOwnerGroup && allowedOwnerGroup.length > 0) {
      for (let owner of allowedOwnerGroup) {
        if (owner === identityValue) {
          isOwnerAuthorized = true
        }
      }
    }
  }
  // [End] Owner Authorization Checks **
  return isOwnerAuthorized
}

const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object
}

module.exports = class DB {
  put (input, identity, tableName) {
    return new Promise((resolve, reject) => {
      // owner auth
      const groupsFields = ['team']
      const ownerAuthFields = reqOwnerAuthorizationCheck(input, identity, groupsFields)
      if (!ownerAuthFields) {
        return reject('Unauthorized.')
      } else {
        Object.assign(input, ownerAuthFields)
      }

      const params = {
        TableName: tableName,
        Item: input
      }
      docClient.put(params, (err) => {
        if (err) {
          console.log(`Unable to update item on table ${tableName}. Error: `, err)
          return reject(err)
        }
        console.log('Item create succeeded: ', input)
        return resolve(input)
      })
    })
  }

  update (input, identity, tableName) {
    return new Promise((resolve, reject) => {
      const id = input.id
      delete input.id
      const expectedVersion = input.expectedVersion
      delete input.expectedVersion
      const newVersion = expectedVersion + 1
      const identityValue = identity.claims.username || (identity.claims[COGNITO_USERNAME_CLAIM_KEY] || '___xamznone____')
      const now = new Date()
      const updatedAt = now.toISOString()
      let updateExpression = 'set #version = :newVersion, #updatedAt = :updatedAt'
      let expressionAttributeNames = {
        '#owner0': 'owner',
        // '#owner1': 'team',
        '#id': 'id',
        '#version': 'version',
        '#updatedAt': 'updatedAt'
      }
      let expressionAttributeValues = {
        ':identity0': identityValue,
        // ':identity1': [identityValue],
        ':expectedVersion': expectedVersion,
        ':newVersion': newVersion,
        ':updatedAt': updatedAt
      }
      for (let [key, val] of Object.entries(input)) {
        if (isObject(val)) {
          for (let [k, v] of Object.entries(val)) {
            const nameKey = `#p${key}`
            const attrNameKey = `#p${k}`
            const valueKey = `:${key}${k}`
            updateExpression += `, ${nameKey}.${attrNameKey} = ${valueKey}`
            expressionAttributeNames[nameKey] = key
            expressionAttributeNames[attrNameKey] = k
            expressionAttributeValues[valueKey] = v
          }
        } else {
          const nameKey = `#${key}`
          const valueKey = `:${key}`
          updateExpression += `, ${nameKey} = ${valueKey}`
          expressionAttributeNames[nameKey] = key
          expressionAttributeValues[valueKey] = val
        }
      }
      const params = {
        TableName: tableName,
        Key: {
          id
        },
        UpdateExpression: updateExpression, // OR contains(#owner1, :identity1)
        ConditionExpression: '((#owner0 = :identity0) AND attribute_exists(#id)) AND #version = :expectedVersion',
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      }

      docClient.update(params, (err, data) => {
        if (err) {
          console.log(`Unable to update item on table ${tableName}. Error: `, err)
          return reject(err)
        }
        console.log('Item update succeeded: ', data)
        return resolve(data.Attributes)
      })
    })
  }

  delete (input, identity, tableName) {
    return new Promise((resolve, reject) => {
      const id = input.id
      delete input.id
      const expectedVersion = input.expectedVersion
      delete input.expectedVersion
      const identityValue = identity.claims.username || (identity.claims[COGNITO_USERNAME_CLAIM_KEY] || '___xamznone____')
      const params = {
        TableName: tableName,
        Key: {
          id
        },
        // OR contains(#owner1, :identity1)
        ConditionExpression: '((#owner0 = :identity0) AND attribute_exists(#id)) AND #version = :expectedVersion',
        ExpressionAttributeNames: {
          '#owner0': 'owner',
          // '#owner1': 'team',
          '#id': 'id',
          '#version': 'version'
        },
        ExpressionAttributeValues: {
          ':identity0': identityValue,
          // ':identity1': [identityValue],
          ':expectedVersion': expectedVersion
        }
      }
      docClient.delete(params, (err, data) => {
        if (err) {
          console.log(`Unable to delete item on table ${tableName}. Error: `, err)
          return reject(err)
        }
        console.log('Item delete succeeded: ', data)
        return resolve(data.Attributes)
      })
    })
  }

  get (id, identity, tableName) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: tableName,
        Key: {
          id
        }
      }
      docClient.get(params, (err, data) => {
        if (err) {
          console.log(`Unable to get item on table ${tableName}. Error: `, err)
          return reject(err)
        }
        // owner auth
        const groupsFields = ['team']
        const ownerAuthFields = resOwnerAuthorizationCheck(data.Item, identity, groupsFields)
        if (!ownerAuthFields) {
          return reject('Unauthorized.')
        }
        console.log('Get item succeeded: ', data)
        return resolve(data.Item)
      })
    })
  }

  query (params, identity, tableName) {
    return new Promise((resolve, reject) => {
      docClient.query(params, (err, data) => {
        if (err) {
          console.log(`Unable to query item on table ${tableName}. Error: `, err)
          return reject(err)
        }
        // owner auth
        const groupsFields = ['team']
        data.Items.forEach(item => {
          const ownerAuthFields = resOwnerAuthorizationCheck(item, identity, groupsFields)
          if (!ownerAuthFields) {
            return reject('Unauthorized.')
          }
        })
        console.log('Query item succeeded: ', data)
        return resolve(data.Items)
      })
    })
  }
}
