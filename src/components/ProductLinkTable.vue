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
          <ProductTableCellEditable
            :item="item"
            update-prop="url"
            placeholder="Пустое поле"
            @update="udpateProductLink"
          />
          <td>
            <!-- TODO open link -->
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
import { updateProductLink } from '@/graphql/mutations'
import { onUpdateProductLink } from '@/graphql/subscriptions'

import ProductTableCellEditable from '@/components/ProductTableCellEditable.vue'

export default {
  name: 'ProductLinkTable',
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
      { text: 'Поле для ссылки', value: 'url', sortable: false },
      { text: 'Откр.', value: 'openLink', sortable: false, width: 80 },
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
    updateProductLinkSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProductLink, {
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
    this.logger = new this.$Amplify.Logger('ProductLink')
    this.updateSubscription = this.$Amplify.API.graphql(this.updateProductLinkSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateProductLink(data)
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
      // TODO add to ProductLink type productId to not map the param
      this.items = products.map(item => {
        return item.link
      })
    },
    onUpdateProductLink (newData, onError = false) {
      const msg = onError
        ? 'Update product link from update error data...'
        : 'Update product link from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateProductLink
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    async udpateProductLink (input) {
      try {
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProductLink, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          // exclude version check condition
          this.errors = response.errors.reduce((acc, curr) => {
            if (curr.errorType === 'DynamoDB:ConditionalCheckFailedException') {
              this.onUpdateProductLink({ onUpdateProductLink: curr.data }, true)
            } else {
              return [...acc, curr]
            }
          }, [])
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'UpdateProductLinkError',
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
