<template>
  <div>
    <div v-if="errors.length > 0">
      <ErrorMessages :items.sync="errors" />
    </div>

    <div v-else-if="items">
      <div>
        <div class="d-flex">
          <div :style="{ width: productsTableWidth + 'px' }" />
          <v-tabs
            v-model="tab"
            grow
          >
            <v-tab>Цены</v-tab>
            <v-tab>Склад</v-tab>
            <v-tab>Пояснения</v-tab>
            <v-tab>Ссылка</v-tab>
          </v-tabs>
        </div>
        <div>
          <ProductCostTable
            v-if="tab === 0"
            :productHeaders="headers"
            :products="items"
            :waybill-id="waybillId"
            :loading="loading"
            :waybill-profit-type="waybillProfitType"
          >
            <template v-slot:product="{ item, index }">
              <ProductTableCellIndex
                :item="item"
                :index="index"
              />
              <td></td>
              <ProductTableCellEditable
                :item="item"
                update-prop="name"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="article"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="quantity"
                type="number"
                @update="updateProduct"
              />
            </template>
            <template v-slot:action="{ item }">
              <ProductTableCellAction
                :item="item"
                :loading="deleteLoading"
                @delete="deleteProduct"
              />
            </template>
          </ProductCostTable>
          <ProductStoreTable
            v-else-if="tab === 1"
            :productHeaders="headers"
            :products="items"
            :waybill-id="waybillId"
            :loading="loading"
          >
            <template v-slot:product="{ item, index }">
              <ProductTableCellIndex
                :item="item"
                :index="index"
              />
              <td></td>
              <ProductTableCellEditable
                :item="item"
                update-prop="name"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="article"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="quantity"
                type="number"
                @update="updateProduct"
              />
            </template>
            <template v-slot:action="{ item }">
              <ProductTableCellAction
                :item="item"
                :loading="deleteLoading"
                @delete="deleteProduct"
              />
            </template>
          </ProductStoreTable>
          <ProductInfoTable
            v-else-if="tab === 2"
            :productHeaders="headers"
            :products="items"
            :waybill-id="waybillId"
            :loading="loading"
          >
            <template v-slot:product="{ item, index }">
              <ProductTableCellIndex
                :item="item"
                :index="index"
              />
              <td></td>
              <ProductTableCellEditable
                :item="item"
                update-prop="name"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="article"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="quantity"
                type="number"
                @update="updateProduct"
              />
            </template>
            <template v-slot:action="{ item }">
              <ProductTableCellAction
                :item="item"
                :loading="deleteLoading"
                @delete="deleteProduct"
              />
            </template>
          </ProductInfoTable>
          <ProductLinkTable
            v-else-if="tab === 3"
            :productHeaders="headers"
            :items="items"
            :products="items"
            :waybill-id="waybillId"
            :loading="loading"
          >
            <template v-slot:product="{ item, index }">
              <ProductTableCellIndex
                :item="item"
                :index="index"
              />
              <td></td>
              <ProductTableCellEditable
                :item="item"
                update-prop="name"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="article"
                @update="updateProduct"
              />
              <ProductTableCellEditable
                :item="item"
                update-prop="quantity"
                type="number"
                @update="updateProduct"
              />
            </template>
            <template v-slot:action="{ item }">
              <ProductTableCellAction
                :item="item"
                :loading="deleteLoading"
                @delete="deleteProduct"
              />
            </template>
          </ProductLinkTable>
        </div>
      </div>
      <v-btn
        :ripple="false"
        :loading="createLoading"
        outlined
        rounded
        color="primary"
        class="my-2"
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
import ProductCostTable from '@/components/ProductCostTable.vue'
import ProductStoreTable from '@/components/ProductStoreTable.vue'
import ProductInfoTable from '@/components/ProductInfoTable.vue'
import ProductLinkTable from '@/components/ProductLinkTable.vue'

import ProductTableCellIndex from '@/components/ProductTableCellIndex.vue'
import ProductTableCellEditable from '@/components/ProductTableCellEditable.vue'
import ProductTableCellAction from '@/components/ProductTableCellAction.vue'

import { confirmDialog } from '@/utils/helpers'

export default {
  name: 'WaybillItem',
  components: {
    ErrorMessages,
    ProductCostTable,
    ProductStoreTable,
    ProductInfoTable,
    ProductLinkTable,
    ProductTableCellIndex,
    ProductTableCellEditable,
    ProductTableCellAction,
  },
  props: {
    waybillId: {
      type: String,
      required: true
    },
    waybillProfitType: {
      type: String,
      default: 'COMMISSION'
    }
  },
  data: () => ({
    tab: 0,
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
    ],
    productsTableWidth: 520
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
    getWaybillQuery () {
      return this.$Amplify.graphqlOperation(getWaybill, {
        id: this.waybillId
      })
    },
    createProductSubscription () {
      return this.$Amplify.graphqlOperation(onCreateProduct, {
        owner: this.owner,
        productWaybillId: this.waybillId
      })
    },
    updateProductSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProduct, {
        owner: this.owner,
        productWaybillId: this.waybillId
      })
    },
    deleteProductSubscription () {
      return this.$Amplify.graphqlOperation(onDeleteProduct, {
        owner: this.owner,
        productWaybillId: this.waybillId
      })
    },
  },
  watch: {
    tab () {
      this.getWaybill()
    }
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
        // on update product, should't update `cost`, `store`, `info`, `link`
        // they uptated by own subs?
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
        if (error && error.errors && error.errors.length > 0) {
          this.errors = error.errors
        }
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
          productWaybillId: this.waybillId
        }
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(createProduct, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        if (error && error.errors && error.errors.length > 0) {
          this.errors = error.errors
        }
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
        if (error && error.errors && error.errors.length > 0) {
          this.errors = error.errors
        }
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
        if (error && error.errors && error.errors.length > 0) {
          this.errors = error.errors
        }
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
