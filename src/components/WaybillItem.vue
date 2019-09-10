<template>
  <div>
    <div v-if="loading">Загрузка...</div>

    <div v-else-if="errors.length > 0">
      <ErrorMessages :items.sync="errors" />
    </div>

    <div v-else-if="items">
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
      >
        <template v-slot:body="{ items, headers }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="grey--text">{{ index + 1 }}</td>
              <td></td>
              <td>
                <Editable
                  :value="item.name"
                  :version="item.version"
                  :placeholder="headers[2].text"
                  arrow-move
                  @input="updateProduct({ id: item.id, name: $event, expectedVersion: item.version })"
                />
              </td>
              <td>
                <Editable
                  :value="item.article"
                  :version="item.version"
                  :placeholder="headers[3].text"
                  arrow-move
                  @input="updateProduct({ id: item.id, article: $event, expectedVersion: item.version })"
                />
              </td>
              <td>
                <Editable
                  :value="item.quantity"
                  :version="item.version"
                  :placeholder="headers[4].text"
                  type="number"
                  arrow-move
                  @input="updateProduct({ id: item.id, quantity: $event, expectedVersion: item.version })"
                />
              </td>
              <td>
                <!-- SET DEFAULT VALUE ON CREATE -->
                <Editable
                  :value="item.costs && item.costs.purchasePrice"
                  :version="item.version"
                  type="number"
                  arrow-move
                  @input="updateProduct({ id: item.id, costs: { purchasePrice: $event }, expectedVersion: item.version })"
                />
              </td>
              <td>
                {{ item.costs && item.costs.amount }}
              </td>
              <td>
                 <!-- SET DEFAULT VALUE ON CREATE -->
                <Editable
                  :value="item.costs && item.costs.clientPrice"
                  :version="item.version"
                  type="number"
                  arrow-move
                  @input="updateProduct({ id: item.id, costs: { clientPrice: $event }, expectedVersion: item.version })"
                />
              </td>
              <td>
                {{ item.costs && item.costs.total }}
              </td>
              <td>{{ item.status }}</td>
              <td>
                <v-scale-transition mode="out-in">
                  <v-progress-circular
                    v-if="deleteLoading === item.id"
                    :width="2"
                    :size="16"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  <v-icon
                    v-else
                    small
                    @click="deleteProduct({ id: item.id, expectedVersion: item.version })"
                  >
                    {{ icons.mdiDelete }}
                  </v-icon>
                </v-scale-transition>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-btn
        :ripple="false"
        :loading="createLoading"
        outlined
        rounded
        color="primary"
        class="mt-2"
        small
        @click="createProduct"
      >
        <v-icon left>mdi-plus</v-icon>
        Добавить продукт
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiDelete } from '@mdi/js'

import { getWaybill } from '@/graphql/queries'
import {
  createProduct,
  updateProduct,
  deleteProduct
} from '@/graphql/mutations'
import { onCreateProduct, onUpdateProduct, onDeleteProduct } from '@/graphql/subscriptions'

import ErrorMessages from '@/components/ErrorMessages.vue'
import Editable from '@/components/Editable.vue'

import { confirmDialog } from '@/utils/helpers'

export default {
  name: 'WaybillItem',
  components: {
    ErrorMessages,
    Editable,
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    icons: {
      mdiDelete
    },
    loading: false,
    createLoading: null,
    updateLoading: null,
    deleteLoading: null,
    items: [],
    errors: [],
    headers: [
      { text: '#', sortable: false, value: 'index', width: 48 },
      { text: 'Фото', sortable: false, value: 'photo', width: 100 },
      { text: 'Наименование', sortable: false, value: 'name' },
      { text: 'Модель', value: 'article', sortable: false, width: 140 },
      { text: 'Кол-во', value: 'quantity', sortable: false, width: 120 },
      { text: 'Цена закупки', value: 'purchasePrice', sortable: false, width: 120 },
      { text: 'Стоимость', value: 'amount', sortable: false, width: 120 },
      { text: 'Для клиента', value: 'clientPrice', sortable: false, width: 120 },
      { text: 'Стоимость', value: 'clientAmount', sortable: false, width: 120 },
      { text: 'Статус', value: 'status', sortable: false, width: 100 },
      { text: '', value: 'action', sortable: false, width: 48 },
    ],
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
    getWaybillQuery () {
      return this.$Amplify.graphqlOperation(getWaybill, {
        id: this.id
      })
    },
    createProductSubscription () {
      return this.$Amplify.graphqlOperation(onCreateProduct, {
        owner: this.owner,
        productWaybillId: this.id
      })
    },
    updateProductSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProduct, {
        owner: this.owner,
        productWaybillId: this.id
      })
    },
    deleteProductSubscription () {
      return this.$Amplify.graphqlOperation(onDeleteProduct, {
        owner: this.owner,
        productWaybillId: this.id
      })
    },
  },
  created () {
    this.logger = new this.$Amplify.Logger('WaybillItem')
    this.getWaybill()
    this.createSubscription = this.$Amplify.API.graphql(this.createProductSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onCreateProduct(data)
        }
      })
    this.updateSubscription = this.$Amplify.API.graphql(this.updateProductSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateProduct(data)
        }
      })
    this.deleteSubscription = this.$Amplify.API.graphql(this.deleteProductSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onDeleteProduct(data)
        }
      })
  },
  beforeDestroy () {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe()
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe()
    }
  },
  methods: {
    onCreateProduct (newData) {
      this.logger.info('New product from subscription...', newData)
      const newItem = newData.onCreateProduct
      this.items.push(newItem)
    },
    onUpdateProduct (newData, onError = false) {
      const msg = onError
        ? 'Update product from update error data...'
        : 'Update product from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateProduct
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    onDeleteProduct (newData) {
      this.logger.info('Delete product from subscription...', newData)
      const newItem = newData.onDeleteProduct
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    async getWaybill () {
      try {
        this.loading = true
        const response = await this.$Amplify.API.graphql(this.getWaybillQuery)
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        this.items = response.data.getWaybill.products.items || []
      } catch (error) {
        this.items = null
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'GetWaybillError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.loading = false
      }
    },
    async createProduct () {
      try {
        this.createLoading = true
        const input = {
          owner: this.owner,
          productWaybillId: this.id
        }
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(createProduct, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'CreateProductError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.createLoading = null
      }
    },
    async updateProduct (input) {
      try {
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProduct, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          // exclude version check condition
          this.errors = response.errors.reduce((acc, curr) => {
            if (curr.errorType === 'DynamoDB:ConditionalCheckFailedException') {
              this.onUpdateProduct({ onUpdateProduct: curr.data }, true)
            } else {
              return [...acc, curr]
            }
          }, [])
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'UpdateProductError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.updateLoading = null
      }
    },
    async deleteProduct (input) {
      try {
        const msg = 'Вы действительно хотите удалить товар?'
        const confirm = await confirmDialog(msg)
        if (confirm === 'not_confirmed') {
          return
        }
        this.deleteLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(deleteProduct, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        if (error === 'not_confirmed') return
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'DeleteProductError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.deleteLoading = null
      }
    },
  }
}
</script>
