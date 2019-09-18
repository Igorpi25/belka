import { Logger } from '@aws-amplify/core'
import { isString } from '@/utils/helpers'

const logger = new Logger('productStore')

const state = {
  spec: {},
}

const getters = {
  spec (state) {
    return state.spec || {}
  },
  waybills (state) {
    return (state.spec.waybills && state.spec.waybills.items) || []
  },
  waybill: (state, getters) => (id) => {
    return getters.waybills.find(el => el.id === id)
  },
  waybillProducts: (state, getters) => (waybillId) => {
    const waybill = getters.waybill(waybillId)
    return (waybill && waybill.products && waybill.products.items) || []
  },
  waybillProduct: (state, getters) => (waybillId, id) => {
    const products = getters.waybillProducts(waybillId)
    return products.find(el => el.id === id)
  }
}

const mutations = {
  setSpecItem (state, payload) {
    state.spec = payload
  },
  updateSpecItem (state, payload) {
    state.spec = Object.assign(state.spec, payload)
  },
  deleteSpecItem (state) {
    state.spec = {}
  },

  setWaybillItems (state, payload) {
    state.spec.waybills = { items: payload }
  },
  putWaybillItem (state, payload) {
    if (!isString(payload.id)) {
      logger.warn('Unable to put waybill item, item must have "id".')
      return
    }
    // check exist
    const index = state.spec.waybills.items.findIndex(el => el.id === payload.id)
    if (index === -1) {
      state.spec.waybills.items.push(payload)
    } else {
      const newItem = Object.assign({}, state.spec.waybills.items[index], payload)
      state.spec.waybills.items.splice(index, 1, newItem)
    }
  },
  updateWaybillItem (state, payload) {
    const index = state.spec.waybills.items.findIndex(el => el.id === payload.id)
    if (index === -1) {
      logger.warn('Unable to update waybill item, not found.')
    } else {
      const newItem = Object.assign({}, state.spec.waybills.items[index], payload)
      state.spec.waybills.items.splice(index, 1, newItem)
    }
  },
  deleteWaybillItem (state, payload) {
    const id = payload.id
    const index = state.spec.waybills.items.findIndex(el => el.id === id)
    if (index === -1) {
      logger.warn('Unable to delete waybill item, not found.')
    } else {
      state.spec.waybills.items.splice(index, 1)
    }
  },

  setWaybillProductItems (state, payload) {
    const waybillId = payload.waybillId
    const items = payload.items
    if (!isString(waybillId)) {
      logger.warn('Unable to set waybill products items, waybillId is not setted.')
      return
    }
    const waybillIndex = state.spec.waybills.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to set waybill products items, waybill not found.')
    } else {
      const newItem = Object.assign({}, state.spec.waybills.items[waybillIndex], {
        products: {
          items
        }
      })
      state.spec.waybills.items.splice(waybillIndex, 1, newItem)
    }
  },
  putWaybillProductItem (state, payload) {
    const waybillId = payload.productWaybillId
    if (!isString(waybillId)) {
      logger.warn('Unable to put waybill product item, waybillId is not setted.')
      return
    }
    const waybillIndex = state.spec.waybills.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to put waybill product item, waybill not found.')
    } else {
      const products = state.spec.waybills.items[waybillIndex].products
      let productsItems = products.items || []
      productsItems.push(payload)
      const newItems = Object.assign({}, state.spec.waybills.items[waybillIndex], {
        products: {
          items: productsItems
        }
      })
      state.spec.waybills.items.splice(waybillIndex, 1, newItems)
    }
  },
  updateWaybillProductItem (state, payload) {
    const waybillId = payload.productWaybillId
    if (!isString(waybillId)) {
      logger.warn('Unable to update waybill product item, waybillId is not setted.')
      return
    }
    const waybillIndex = state.spec.waybills.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to update waybill product item, waybill not found.')
    } else {
      const products = state.spec.waybills.items[waybillIndex].products
      let productsItems = products.items || []
      const productIndex = productsItems.findIndex(p => p.id === payload.id)
      if (productIndex === -1) {
        logger.warn('Unable to update waybill product item, product not found.')
      } else {
        productsItems.splice(productIndex, 1, Object.assign({}, productsItems[productIndex], payload))
        const newItems = Object.assign({}, state.spec.waybills.items[waybillIndex], {
          products: {
            items: productsItems
          }
        })
        state.spec.waybills.items.splice(waybillIndex, 1, newItems)
      }
    }
  },
  deleteWaybillProductItem (state, payload) {
    const waybillId = payload.productWaybillId
    if (!isString(waybillId)) {
      logger.warn('Unable to delete waybill product item, waybillId is not setted.')
      return
    }
    const waybillIndex = state.spec.waybills.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to delete waybill product item, waybill not found.')
    } else {
      const products = state.spec.waybills.items[waybillIndex].products
      let productsItems = products.items || []
      const productIndex = productsItems.findIndex(p => p.id === payload.id)
      if (productIndex === -1) {
        logger.warn('Unable to delete waybill product item, product not found.')
      } else {
        productsItems.splice(productIndex, 1)
        const newItems = Object.assign({}, state.spec.waybills.items[waybillIndex], {
          products: {
            items: productsItems
          }
        })
        state.spec.waybills.items.splice(waybillIndex, 1, newItems)
      }
    }
  },
}

const actions = {
  //
}

export default {
  state,
  getters,
  mutations,
  actions,
}
