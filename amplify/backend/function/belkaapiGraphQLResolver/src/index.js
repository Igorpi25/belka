/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiBelkaapiGraphQLAPIIdOutput = process.env.API_BELKAAPI_GRAPHQLAPIIDOUTPUT
var apiBelkaapiGraphQLAPIEndpointOutput = process.env.API_BELKAAPI_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const uuid = require('uuid/v4')
const dbClass = require('./db')

const env = process.env.ENV
const gqlApiId = process.env.API_BELKAAPI_GRAPHQLAPIIDOUTPUT

const db = new dbClass()

const PROJECT_TABLE_NAME = `Project-${gqlApiId}-${env}`
const SPEC_TABLE_NAME = `Spec-${gqlApiId}-${env}`
const WAYBILL_TABLE_NAME = `Waybill-${gqlApiId}-${env}`
const PRODUCT_TABLE_NAME = `Product-${gqlApiId}-${env}`

const SYSTEM_STATUSES = {
  CREATED: 'CREATED',
  DELETED: 'DELETED'
}
const PROJECT_STATUSES = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
}
const WAYBILL_STATUSES = {
  IN_PROCESSING: 'IN_PROCESSING',
  IN_PRODUCTION: 'IN_PRODUCTION',
  IN_STOCK: 'IN_STOCK'
}
const WAYBILL_PROFIT_TYPES = {
  MARGIN: 'MARGIN',
  COMMISSION: 'COMMISSION'
}
const PRODUCT_STATUSES = {
  IN_PROCESSING: 'IN_PROCESSING',
  IN_PRODUCTION: 'IN_PRODUCTION',
  IN_STOCK: 'IN_STOCK'
}

const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value)
}

/**
 * Корректировка округления десятичных дробей.
 *
 * @param {String}  type  Тип корректировки.
 * @param {Number}  value Число.
 * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
 * @returns {Number} Скорректированное значение.
 */
function decimalAdjust (type, value, exp) {
  // Если степень не определена, либо равна нулю...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value)
  }
  value = +value
  exp = +exp
  // Если значение не является числом, либо степень не является целым числом...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN
  }
  // Сдвиг разрядов
  value = value.toString().split('e')
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
  // Обратный сдвиг
  value = value.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
}

// Десятичное округление к ближайшему
const round10 = (value, exp) => {
  return decimalAdjust('round', value, exp)
}
// Десятичное округление вниз
const floor10 = (value, exp) => {
  return decimalAdjust('floor', value, exp)
}
// Десятичное округление вверх
const ceil10 = (value, exp) => {
  return decimalAdjust('ceil', value, exp)
}

const methods = {
  putProject: async (input, identity) => {
    const now = new Date()
    input.version = 1
    input.__typename = 'Project'
    input.systemState = SYSTEM_STATUSES.CREATED
    input.status = input.status || PROJECT_STATUSES.IN_PROGRESS
    input.createdAt = now.toISOString()
    input.updatedAt = now.toISOString()
    input.id = uuid()
    try {
      return await db.put(input, identity, PROJECT_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  putSpec: async (input, identity) => {
    const now = new Date()
    input.__typename = 'Spec'
    input.systemState = SYSTEM_STATUSES.CREATED
    input.createdAt = now.toISOString()
    input.updatedAt = now.toISOString()
    input.id = uuid()
    try {
      return await db.put(input, identity, SPEC_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  putWaybill: async (input, identity) => {
    const now = new Date()
    input.profitType = WAYBILL_PROFIT_TYPES.COMMISSION
    input.profitPercent = 0
    input.profitForAll = true
    input.discount = 0
    input.prepayment = 0
    input.residue = 0
    input.customerDebt = 0
    input.totalAmount = 0
    input.totalClientAmount = 0
    input.totalNet = 0
    input.totalGross = 0
    input.totalCapacity = 0
    input.totalCargoPlaceCount = 0
    input.version = 1
    input.__typename = 'Waybill'
    input.systemState = SYSTEM_STATUSES.CREATED
    input.status = input.status || WAYBILL_STATUSES.IN_PROCESSING
    input.createdAt = now.toISOString()
    input.updatedAt = now.toISOString()
    input.id = uuid()
    try {
      return await db.put(input, identity, WAYBILL_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  putProduct: async (input, identity) => {
    const now = new Date()
    input.quantity = 0
    input.version = 1
    input.cost = {
      price: 0,
      amount: 0,
      clientPrice: 0,
      clientAmount: 0
    }
    input.store = {
      net: 0,
      gross: 0,
      width: 0,
      height: 0,
      length: 0,
      inStock: false,
      cargoPlaceCount: 0
    }
    input.info = {
      images: []
    }
    // TODO PUT logic on db.update
    input.link = {
      url: null
    }
    input.__typename = 'Product'
    input.systemState = SYSTEM_STATUSES.CREATED
    input.status = input.status || PRODUCT_STATUSES.IN_PROCESSING
    input.createdAt = now.toISOString()
    input.updatedAt = now.toISOString()
    input.id = uuid()
    try {
      return await db.put(input, identity, PRODUCT_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  updateProduct: async (input, identity) => {
    try {
      return await db.update(input, identity, PRODUCT_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  updateWaybill: async (input, identity) => {
    try {
      return await db.update(input, identity, WAYBILL_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteProduct: async (input, identity) => {
    try {
      return await db.delete(input, identity, PRODUCT_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteWaybill: async (input, identity) => {
    try {
      return await db.delete(input, identity, WAYBILL_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  getProduct: async (id, identity) => {
    try {
      return await db.get(id, identity, PRODUCT_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  getWaybill: async (id, identity) => {
    try {
      return await db.get(id, identity, WAYBILL_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  getWaybillProducts: async (id, identity) => {
    const params = {
      TableName: PRODUCT_TABLE_NAME,
      IndexName: 'gsi-WaybillProducts',
      KeyConditionExpression: "#connectionAttribute = :connectionAttribute",
      ExpressionAttributeNames: {
          "#connectionAttribute": "productWaybillId"
      },
      ExpressionAttributeValues: {
        ":connectionAttribute": id
      }
    }
    try {
      return await db.query(params, identity, PRODUCT_TABLE_NAME)
    } catch (error) {
      throw new Error(error)
    }
  },
  calcProductCost: (input, productCost, quantity, profitType, profitPercent, customProfit) => {
    const _input = input || {}
    let cost = productCost || {}
    cost.clientPrice = (_input.cost && _input.cost.clientPrice) || (cost.clientPrice || 0)
    cost.price = (_input.cost && _input.cost.price) || (cost.price || 0)
    if (profitType === WAYBILL_PROFIT_TYPES.COMMISSION && !customProfit) {
      let profit = (cost.clientPrice * profitPercent) / 100
      const newPrice = cost.clientPrice - profit
      cost.price = ceil10(newPrice, -2)
    } else if (profitType === WAYBILL_PROFIT_TYPES.MARGIN && !customProfit) {
      let profit = (cost.price * profitPercent) / 100
      const newPrice = cost.price + profit
      cost.clientPrice = ceil10(newPrice, -2)
    }
    cost.amount = ceil10(quantity * cost.price, -2)
    cost.clientAmount = ceil10(quantity * cost.clientPrice, -2)
    return cost
  },
  calcWaybillStatus: (products) => {
    if (products.length > 0 && products.every(el => el.status === WAYBILL_STATUSES.IN_STOCK)) {
      return WAYBILL_STATUSES.IN_STOCK
    } else if (products.some(el => el.status === WAYBILL_STATUSES.IN_PROCESSING)) {
      return WAYBILL_STATUSES.IN_PROCESSING
    } else {
      return WAYBILL_STATUSES.IN_PRODUCTION
    }
  }
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Mutation: {
    createProject: async ctx => {
      try {
        // TODO batchWriteItem
        const owner = ctx.arguments.input.owner
        const specInput = { owner }
        const spec = await methods.putSpec(specInput, ctx.identity)
        const waybillInput = { owner, waybillSpecId: spec.id }
        const waybill = await methods.putWaybill(waybillInput, ctx.identity)
        const productInput = { owner, productWaybillId: waybill.id }
        await methods.putProduct(productInput, ctx.identity)
        const projectInput = { owner, projectSpecId: spec.id }
        return await methods.putProject(projectInput, ctx.identity)
      } catch (error) {
        throw new Error(error)
      }
    },
    createWaybill: async ctx => {
      try {
        // TODO batchWriteItem
        const owner = ctx.arguments.input.owner
        const waybillSpecId = ctx.arguments.input.waybillSpecId
        const waybillInput = { owner, waybillSpecId }
        const waybill = await methods.putWaybill(waybillInput, ctx.identity)
        const productInput = { owner, productWaybillId: waybill.id }
        await methods.putProduct(productInput, ctx.identity)
        return waybill
      } catch (error) {
        throw new Error(error)
      }
    },
    updateWaybill: async ctx => {
      let waybill = {}
      try {
        let input = ctx.arguments.input || {}
        const hasProductsCostChange = input.hasOwnProperty('profitType') || input.hasOwnProperty('profitPercent')
        const hasProfitForAllChange = input.hasOwnProperty('profitForAll')
        const hasSummChange = input.hasOwnProperty('discount') || input.hasOwnProperty('prepayment')
        if (hasProductsCostChange || hasProfitForAllChange || hasSummChange) {
          waybill = await methods.getWaybill(input.id, ctx.identity)
          let products = await methods.getWaybillProducts(input.id, ctx.identity)
          let totalAmount = 0
          let totalClientAmount = 0
          const discount = input.discount || (waybill.discount || 0)
          const prepayment = input.prepayment || (waybill.prepayment || 0)
          for (const product of products) {
            let productInput = { id: product.id, expectedVersion: product.version }
            let productCustomProfit = product.customProfit
            if (hasProfitForAllChange) {
              productInput.customProfit = !input.profitForAll
              productCustomProfit = productInput.customProfit
            }
            const profitType =  input.profitType || waybill.profitType
            const profitPercent = input.profitPercent || (waybill.profitPercent || 0)
            const quantity = product.quantity || 0
            productInput.cost = methods.calcProductCost(
              input,
              product.cost,
              quantity,
              profitType,
              profitPercent,
              productCustomProfit
            )

            await methods.updateProduct(productInput, ctx.identity)

            totalAmount += productInput.cost.amount || 0
            totalClientAmount += productInput.cost.clientAmount || 0
          }
          input.totalAmount = ceil10(totalAmount, -2)
          input.totalClientAmount = ceil10(totalClientAmount, -2)
          input.residue = ceil10(totalAmount - prepayment - discount, -2)
          input.customerDebt = ceil10(totalClientAmount - prepayment- discount, -2)
        }

        const result = await methods.updateWaybill(input, ctx.identity)
        return result
      } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
          error.name = 'DynamoDB:ConditionalCheckFailedException'
          error.data = waybill
        }
        throw error
      }
    },
    deleteWaybill: async ctx => {
      try {
        const input = ctx.arguments.input
        let waybill = await methods.getWaybill(input.id, ctx.identity)
        await methods.deleteWaybill(input, ctx.identity)
        // dynamodb delete not return item, on subsription response resolver need result
        return waybill
      } catch (error) {
        throw new Error(error)
      }
    },
    createProduct: async ctx => {
      try {
        // const owner = ctx.arguments.input.owner
        const product = await methods.putProduct(ctx.arguments.input, ctx.identity)
        const waybillId = ctx.arguments.input.productWaybillId
        // update waybill status
        const waybill = await methods.getWaybill(waybillId, ctx.identity)
        const waybillInput = {
          id: waybillId,
          status: WAYBILL_STATUSES.IN_PROCESSING,
          expectedVersion: waybill.version
        }
        await methods.updateWaybill(waybillInput, ctx.identity)
        return product
      } catch (error) {
        throw new Error(error)
      }
    },
    updateProduct: async ctx => {
      let input = ctx.arguments.input || {}
      let product = await methods.getProduct(input.id, ctx.identity)
      try {
        let waybill = await methods.getWaybill(product.productWaybillId, ctx.identity)
        let waybillProducts = await methods.getWaybillProducts(product.productWaybillId, ctx.identity)
        let udpateWaybillInput = {}
        if (input.hasOwnProperty('quantity') || input.hasOwnProperty('cost')) {
          input.customProfit = !waybill.profitForAll
          const profitType =  waybill.profitType
          const profitPercent = waybill.profitPercent || 0
          const quantity = (input.quantity || product.quantity) || 0
          input.cost = methods.calcProductCost(
            input,
            product.cost,
            quantity,
            profitType,
            profitPercent,
            input.customProfit
          )

          const productIndex = waybillProducts.findIndex(el => el.id === product.id)
          waybillProducts.splice(productIndex, 1, Object.assign({}, product, { cost: input.cost }))
          let totalAmount = 0
          let totalClientAmount = 0
          waybillProducts.forEach(el => {
            totalAmount += (el.cost && el.cost.amount) || 0
            totalClientAmount += (el.cost && el.cost.clientAmount) || 0
          })
          const prepayment = waybill.prepayment || 0
          const discount = waybill.discount || 0
          waybill.totalAmount = ceil10(totalAmount, -2)
          waybill.totalClientAmount = ceil10(totalClientAmount, -2)
          waybill.residue = ceil10(totalAmount - prepayment - discount, -2)
          waybill.customerDebt = ceil10(totalClientAmount - prepayment - discount, -2)
          Object.assign(udpateWaybillInput, {
            id: waybill.id,
            expectedVersion: waybill.version,
            totalAmount,
            totalClientAmount,
            residue: waybill.residue,
            customerDebt: waybill.customerDebt
          })
        }

        if (input.hasOwnProperty('store')) {
          const store = product.store || {}
          if (!input.store.hasOwnProperty('capacity') || !isNumber(input.store.capacity)) {
            const width = input.store.width || store.width || 0
            const height = input.store.height || store.height || 0
            const length = input.store.length || store.length || 0
            const capacity = (width * height * length) / (1000000000)
            input.store.capacity = ceil10(capacity, -2)
          }
          let totalNet = 0
          let totalGross = 0
          let totalCapacity = 0
          let totalCargoPlaceCount = 0
          const productIndex = waybillProducts.findIndex(el => el.id === product.id)
          waybillProducts.splice(productIndex, 1, Object.assign({}, product, { store: Object.assign({}, store, input.store) }))
          waybillProducts.forEach(el => {
            totalNet += (el.store && el.store.net) || 0
            totalGross += (el.store && el.store.gross) || 0
            totalCapacity += (el.store && el.store.capacity) || 0
            totalCargoPlaceCount += (el.store && el.store.cargoPlaceCount) || 0
          })
          Object.assign(udpateWaybillInput, {
            id: waybill.id,
            expectedVersion: waybill.version,
            totalNet: ceil10(totalNet, -2),
            totalGross: ceil10(totalGross, -2),
            totalCapacity: ceil10(totalCapacity, -2),
            totalCargoPlaceCount: ceil10(totalCargoPlaceCount, -2)
          })
        }

        // check product status
        let statusBeforeCheck = product.status
        if (!input.status) {
          const value = Object.assign({}, product, input)
          const cost = value.cost
          const store = value.store
          const isBaseFilled = value.name && value.article && value.quantity
          const isCostFilled = cost && cost.price && cost.clientPrice
          const isStoreFilled = store && store.net && store.gross &&
            store.capacity && store.cargoPlaceCount
          if (isBaseFilled && isCostFilled && isStoreFilled) {
            input.status = PRODUCT_STATUSES.IN_STOCK
          } else if (isBaseFilled && isCostFilled) {
            input.status = PRODUCT_STATUSES.IN_PRODUCTION
          } else {
            input.status = PRODUCT_STATUSES.IN_PROCESSING
          }
        }

        // check waybill status
        if (statusBeforeCheck !== input.status) {
          const productIndex = waybillProducts.findIndex(el => el.id === product.id)
          waybillProducts.splice(productIndex, 1, Object.assign({}, product, { status: input.status }))
          waybill.status = methods.calcWaybillStatus(waybillProducts)
        }

        const result = await db.update(input, ctx.identity, PRODUCT_TABLE_NAME)

        if (udpateWaybillInput.id && udpateWaybillInput.expectedVersion) {
          await methods.updateWaybill(udpateWaybillInput, ctx.identity)
        }
        return result
      } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
          error.name = 'DynamoDB:ConditionalCheckFailedException'
          error.data = product
        }
        throw error
      }
    },
    deleteProduct: async ctx => {
      try {
        let input = ctx.arguments.input || {}
        let product = await methods.getProduct(input.id, ctx.identity)
        let waybill = await methods.getWaybill(product.productWaybillId, ctx.identity)
        let waybillProducts = await methods.getWaybillProducts(product.productWaybillId, ctx.identity)
        const productIndex = waybillProducts.findIndex(el => el.id === product.id)
        waybillProducts.splice(productIndex, 1)
        let totalAmount = 0
        let totalClientAmount = 0
        waybillProducts.forEach(el => {
          totalAmount += (el.cost && el.cost.amount) || 0
          totalClientAmount += (el.cost && el.cost.clientAmount) || 0
        })
        const prepayment = waybill.prepayment || 0
        const discount = waybill.discount || 0
        totalAmount = ceil10(totalAmount, -2)
        totalClientAmount = ceil10(totalClientAmount, -2)
        const residue = ceil10(totalAmount - prepayment - discount, -2)
        const customerDebt = ceil10(totalClientAmount - prepayment - discount, -2)
        
        let udpateWaybillInput = {
          id: waybill.id,
          expectedVersion: waybill.version,
          totalAmount,
          totalClientAmount,
          residue,
          customerDebt
        }
        // check waybill status
        udpateWaybillInput.status = methods.calcWaybillStatus(waybillProducts)
        await methods.updateWaybill(udpateWaybillInput, ctx.identity)
        await methods.deleteProduct(input, ctx.identity)
        // dynamodb delete not return item, on subsription response resolver need result
        return product
      } catch (error) {
        throw new Error(error)
      }
    },
  }
}

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName]
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      try {
        return await resolver(event)
      } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
          return { data: error.data, errorMessage: error.message, errorType: `DynamoDB:${error.code}` }
        }
        throw error
      }
    }
  }
  throw new Error('Resolver not found.')
}
