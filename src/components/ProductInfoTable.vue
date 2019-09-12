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
          <td>
            <!-- TODO images actions -->
          </td>
          <ProductTableCellEditable
            :item="item"
            update-prop="description"
            placeholder="Пустое поле"
            @update="udpateProductInfo"
          />
          <td>
            <slot name="action" :item="products[index]" />
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
import { updateProductInfo } from '@/graphql/mutations'
import { onUpdateProductInfo } from '@/graphql/subscriptions'

import ProductTableCellEditable from '@/components/ProductTableCellEditable.vue'

export default {
  name: 'ProductInfo',
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
      { text: 'Доп. фото', value: 'images', sortable: false, width: 140 },
      { text: 'Дополнительная информация', value: 'description', sortable: false },
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
    updateProductInfoSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProductInfo, {
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
    this.logger = new this.$Amplify.Logger('ProductInfo')
    this.updateSubscription = this.$Amplify.API.graphql(this.updateProductInfoSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateProductInfo(data)
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
      // TODO add to ProductInfo type productId to not map the param
      this.items = products.map(item => {
        return item.info
      })
    },
    onUpdateProductInfo (newData, onError = false) {
      const msg = onError
        ? 'Update product info from update error data...'
        : 'Update product info from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateProductInfo
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    async udpateProductInfo (input) {
      try {
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProductInfo, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          // exclude version check condition
          this.errors = response.errors.reduce((acc, curr) => {
            if (curr.errorType === 'DynamoDB:ConditionalCheckFailedException') {
              this.onUpdateProductInfo({ onUpdateProductInfo: curr.data }, true)
            } else {
              return [...acc, curr]
            }
          }, [])
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'UpdateProductInfoError',
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
