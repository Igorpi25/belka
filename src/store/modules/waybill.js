import { Logger } from '@aws-amplify/core'
import { isString } from '@/utils/helpers'

const logger = new Logger('productStore')

const state = {
  items: [],
}

const getters = {
  waybills (state) {
    return state.items || []
  },
  waybill: (state, getters) => (id) => {
    return getters.waybills.find(el => el.id === id)
  },
  waybillProducts: (state, getters) => (waybillId) => {
    const waybill = getters.waybill(waybillId)
    return (waybill && waybill.products && waybill.products.items) || []
  },
  waybillProduct: (state, getters) => (waybillId, id) => {
    const products = getters.products(waybillId)
    return products.find(el => el.id === id)
  }
}

const mutations = {
  setWaybillItems (state, payload) {
    state.items = payload
  },
  putWaybillItem (state, payload) {
    if (!isString(payload.id)) {
      logger.warn('Unable to put waybill item, item must have "id".')
      return
    }
    state.items.push(payload)
  },
  updateWaybillItem (state, payload) {
    const index = state.items.findIndex(el => el.id === payload.id)
    if (index === -1) {
      logger.warn('Unable to update waybill item, not found.')
    } else {
      const newItem = Object.assign({}, state.items[index], payload)
      state.items.splice(index, 1, newItem)
    }
  },
  deleteWaybillItem (state, payload) {
    const id = payload.id
    const index = state.items.findIndex(el => el.id === id)
    if (index === -1) {
      logger.warn('Unable to delete waybill item, not found.')
    } else {
      state.items.splice(index, 1)
    }
  },

  setWaybillProductItems (state, payload) {
    const waybillId = payload.waybillId
    const items = payload.items
    if (!isString(waybillId)) {
      logger.warn('Unable to set waybill products items, waybillId is not setted.')
      return
    }
    const waybillIndex = state.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to set waybill products items, waybill not found.')
    } else {
      const newItem = Object.assign({}, state.items[waybillIndex], {
        products: {
          items
        }
      })
      state.items.splice(waybillIndex, 1, newItem)
    }
  },
  putWaybillProductItem (state, payload) {
    const waybillId = payload.productWaybillId
    if (!isString(waybillId)) {
      logger.warn('Unable to put waybill product item, waybillId is not setted.')
      return
    }
    const waybillIndex = state.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to put waybill product item, waybill not found.')
    } else {
      const products = state.items[waybillIndex].products
      let productsItems = products.items || []
      productsItems.push(payload)
      const newItems = Object.assign({}, state.items[waybillIndex], {
        products: {
          items: productsItems
        }
      })
      state.items.splice(waybillIndex, 1, newItems)
    }
  },
  updateWaybillProductItem (state, payload) {
    const waybillId = payload.productWaybillId
    if (!isString(waybillId)) {
      logger.warn('Unable to update waybill product item, waybillId is not setted.')
      return
    }
    const waybillIndex = state.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to update waybill product item, waybill not found.')
    } else {
      const products = state.items[waybillIndex].products
      let productsItems = products.items || []
      const productIndex = productsItems.findIndex(p => p.id === payload.id)
      if (productIndex === -1) {
        logger.warn('Unable to update waybill product item, product not found.')
      } else {
        productsItems.splice(productIndex, 1, Object.assign({}, productsItems[productIndex], payload))
        const newItems = Object.assign({}, state.items[waybillIndex], {
          products: {
            items: productsItems
          }
        })
        state.items.splice(waybillIndex, 1, newItems)
      }
    }
  },
  deleteWaybillProductItem (state, payload) {
    const waybillId = payload.productWaybillId
    if (!isString(waybillId)) {
      logger.warn('Unable to delete waybill product item, waybillId is not setted.')
      return
    }
    const waybillIndex = state.items.findIndex(w => w.id === waybillId)
    if (waybillIndex === -1) {
      logger.warn('Unable to delete waybill product item, waybill not found.')
    } else {
      const products = state.items[waybillIndex].products
      let productsItems = products.items || []
      const productIndex = productsItems.findIndex(p => p.id === payload.id)
      if (productIndex === -1) {
        logger.warn('Unable to delete waybill product item, product not found.')
      } else {
        productsItems.splice(productIndex, 1)
        const newItems = Object.assign({}, state.items[waybillIndex], {
          products: {
            items: productsItems
          }
        })
        state.items.splice(waybillIndex, 1, newItems)
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
