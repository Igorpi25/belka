<template>
  <div>
    <div v-if="loading">Загрузка...</div>

    <div v-else-if="errors.length > 0">
      <ErrorMessages
        :items="errors"
        @close="i => errors.splice(i, 1)"
      />
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
              <td>{{ index + 1 }}</td>
              <td></td>
              <td>
                <Editable
                  :value="item.name"
                  :placeholder="headers[2].text"
                  @input="updateProduct({ id: item.id, name: $event })"
                />
              </td>
              <td>
                <Editable
                  :value="item.article"
                  :placeholder="headers[3].text"
                  @input="updateProduct({ id: item.id, article: $event })"
                />
              </td>
              <td>
                <Editable
                  :value="item.quantity"
                  :placeholder="headers[4].text"
                  @input="updateProduct({ id: item.id, quantity: $event })"
                />
              </td>
              <td>
                <!-- SET DEFAULT VALUE ON CREATE -->
                <!-- <Editable
                  :value="item.costs && item.costs.purchasePrice"
                  @input="updateProduct({ id: item.id, costs: { purchasePrice: $event } })"
                /> -->
              </td>
              <td>
                {{ item.costs && item.costs.amount }}
              </td>
              <td>
                 <!-- SET DEFAULT VALUE ON CREATE -->
                <!-- <Editable
                  :value="item.costs && item.costs.clientPrice"
                  @input="updateProduct({ id: item.id, costs: { clientPrice: $event } })"
                /> -->
              </td>
              <td>
                {{ item.costs && item.costs.amount }}
              </td>
              <td>{{ item.status }}</td>
              <td>
                <v-slide-x-reverse-transition
                    mode="out-in"
                  >
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
                      @click="deleteProduct(item.id)"
                    >
                      {{ icons.mdiDelete }}
                    </v-icon>
                  </v-slide-x-reverse-transition>
              </td>
            </tr>
          </tbody>
        </template>
        <!-- <template v-slot:item.name="{ item, header }">
          
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ item.createdAt | localDate }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{ item.updatedAt | localDate }}
        </template>
        <template v-slot:item.action="{ item }">
          
        </template> -->
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
import { createProduct, updateProduct, deleteProduct } from '@/graphql/mutations'
import { onCreateProduct, onUpdateProduct, onDeleteProduct } from '@/graphql/subscriptions'

import ErrorMessages from '@/components/ErrorMessages.vue'
import Editable from '@/components/Editable.vue'

export default {
  name: 'Waybill',
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
      // eslint-disable-next-line
      console.log('New product from subscription...', newData)
      const newItem = newData.onCreateProduct
      this.items.push(newItem)
    },
    onUpdateProduct (newData) {
      // eslint-disable-next-line
      console.log('Update product from subscription...', newData)
      const newItem = newData.onUpdateProduct
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    onDeleteProduct (newData) {
      // eslint-disable-next-line
      console.log('Delete product from subscription...', newData)
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
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'GetWaybillError',
        //   attributes: {
        //     error: e.message
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
          status: 'CREATED',
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
        // const newItem = response.data.createProduct
        // // TODO create subscrubtion on every waybill?
        // this.data.getWaybill.products.items.push(newItem)
        // return response.data.createProduct
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'CreateProductError',
        //   attributes: {
        //     error: e.message
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
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        // const updatedItem = response.data.updateProduct
        // const index = this.data.getWaybill.products.items
        //   .findIndex(el => el.id === updatedItem.id)
        // this.data.getWaybill.products.items.splice(index, 1, updatedItem)
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'UpdateProductError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      } finally {
        this.updateLoading = null
      }
    },
    async deleteProduct (id) {
      try {
        const msg = 'Вы действительно хотите удалить товар?'
        const confirm = await this.confirmDialog(msg)
        if (confirm === 'not_confirmed') {
          return
        }
        this.deleteLoading = id
        const input = { id }
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(deleteProduct, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        // const updatedItem = response.data.updateProduct
        // const index = this.data.getWaybill.products.items
        //   .findIndex(el => el.id === updatedItem.id)
        // this.data.getWaybill.products.items.splice(index, 1, updatedItem)
      } catch (error) {
        if (error === 'not_confirmed') return
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'DeleteProductError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      } finally {
        this.deleteLoading = null
      }
    },
    confirmDialog (msg) {
      return new Promise((resolve, reject) => {
        let confirmed = window.confirm(msg)

        return confirmed ? resolve('confirmed') : reject('not_confirmed')
      })
    },
  }
}
</script>
