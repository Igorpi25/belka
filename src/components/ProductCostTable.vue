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
            update-prop="price"
            type="number"
            @update="udpateProductCost"
          />
          <td>
            {{ item.amount }}
          </td>
          <!-- SET DEFAULT VALUE ON CREATE -->
          <ProductTableCellEditable
            :item="item"
            update-prop="clientPrice"
            type="number"
            @update="udpateProductCost"
          />
          <td>
            {{ item.total }}
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
import { updateProductCost } from '@/graphql/mutations'
import { onUpdateProductCost } from '@/graphql/subscriptions'

import ProductTableCellEditable from '@/components/ProductTableCellEditable.vue'

export default {
  name: 'ProductCostTable',
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
      { text: 'Цена закупки', value: 'purchasePrice', sortable: false, width: 120 },
      { text: 'Стоимость', value: 'amount', sortable: false, width: 120 },
      { text: 'Для клиента', value: 'clientPrice', sortable: false, width: 120 },
      { text: 'Стоимость', value: 'clientAmount', sortable: false, width: 120 },
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
    updateProductCostSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProductCost, {
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
    this.logger = new this.$Amplify.Logger('ProductCost')
    this.updateSubscription = this.$Amplify.API.graphql(this.updateProductCostSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateProductCost(data)
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
      // TODO add to ProductCost type productId to not map the param
      this.items = products.map(item => {
        return item.cost
      })
    },
    onUpdateProductCost (newData, onError = false) {
      const msg = onError
        ? 'Update product cost from update error data...'
        : 'Update product cost from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateProductCost
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    async udpateProductCost (input) {
      try {
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProductCost, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          // exclude version check condition
          this.errors = response.errors.reduce((acc, curr) => {
            if (curr.errorType === 'DynamoDB:ConditionalCheckFailedException') {
              this.onUpdateProductCost({ onUpdateProductCost: curr.data }, true)
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
        //   name: 'UpdateProductCostError',
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
