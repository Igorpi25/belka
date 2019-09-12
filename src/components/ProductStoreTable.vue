<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :mobile-breakpoint="0"
    :loading="loading"
    hide-default-footer
    class="v-data-table--overflow-hidden"
  >
    <template v-slot:body="{ items, headers }">
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <slot name="product" :item="products[index]" :index="index" />
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="net"
            type="number"
            @update="udpateProductStore"
          />
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="gross"
            type="number"
            @update="udpateProductStore"
          />
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="width"
            type="number"
            @update="udpateProductStore"
          />
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="height"
            type="number"
            @update="udpateProductStore"
          />
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="length"
            type="number"
            @update="udpateProductStore"
          />
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="dimension"
            type="number"
            @update="udpateProductStore"
          />
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="cargoPlaceNumber"
            type="number"
            @update="udpateProductStore"
          />
          <td>
            <v-checkbox
              :input-value="item.inStock"
              :ripple="false"
              color="primary"
              class="mt-0"
              hide-details
              @change="udpateProductStore({
                id: item.id,
                inStock: $event,
                expectedVersion: item.version
              })"
            />
          </td>
          <td>
            <slot name="action" :item="products[index]" />
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import { updateProductStore } from '@/graphql/mutations'
import { onUpdateProductStore } from '@/graphql/subscriptions'

import ProductTableCellEditable from '@/components/ProductTableCellEditable.vue'

export default {
  name: 'ProductStore',
  components: {
    ProductTableCellEditable,
  },
  props: {
    waybillId: {
      type: String,
      required: true
    },
    productHeaders: {
      type: Array,
      default: () => ([])
    },
    products: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    updateLoading: null,
    items: [],
    internalHeaders: [
      { text: 'Нетто, ед.', value: 'net', sortable: false, width: 120 },
      { text: 'Брутто, ед.', value: 'gross', sortable: false, width: 120 },
      { text: 'l, мм', value: 'length', sortable: false, width: 100 },
      { text: 'w, мм', value: 'width', sortable: false, width: 100 },
      { text: 'h, мм', value: 'height', sortable: false, width: 100 },
      { text: 'Кол гр.м', value: 'dimension', sortable: false, width: 120 },
      { text: '№ гр.м', value: 'cargoPlaceNumber', sortable: false, width: 100 },
      { text: 'На складе', value: 'inStock', sortable: false, width: 100 },
      { text: '', value: 'action', sortable: false, width: 48 }
    ],
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
    headers () {
      return [...this.productHeaders, ...this.internalHeaders]
    },
    updateProductStoreSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProductStore, {
        owner: this.owner,
        waybillId: this.waybillId
      })
    },
  },
  watch: {
    products: {
      handler (val) {
        const products = val || []
        this.setItems(products)
      },
      immediate: true
    }
  },
  created () {
    this.logger = new this.$Amplify.Logger('ProductStore')
    this.updateSubscription = this.$Amplify.API.graphql(this.updateProductStoreSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateProductStore(data)
        }
      })
  },
  beforeDestroy () {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  },
  methods: {
    setItems (products) {
      // TODO add to ProductStore type productId to not map the param
      this.items = products.map(item => {
        return item.store
      })
    },
    onUpdateProductStore (newData, onError = false) {
      const msg = onError
        ? 'Update product store from update error data...'
        : 'Update product store from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateProductStore
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    async udpateProductStore (input) {
      try {
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProductStore, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          // exclude version check condition
          this.errors = response.errors.reduce((acc, curr) => {
            if (curr.errorType === 'DynamoDB:ConditionalCheckFailedException') {
              this.onUpdateProductStore({ onUpdateProductStore: curr.data }, true)
            } else {
              return [...acc, curr]
            }
          }, [])
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'UpdateProductStoreError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.updateLoading = null
      }
    },
  }
}
</script>
