<template>
  <tr>
    <!-- START PRODUCT TABLE -->
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
    <!-- END PRODUCT TABLE -->

    <!-- START COST TABLE -->
    <template v-if="tab === 0">
      <ProductTableCellEditable
        v-if="isProfitTypeMargin"
        :item="item"
        object-prop="cost"
        update-prop="price"
        type="number"
        @update="updateProduct"
      />
      <td v-else>
        {{ item.cost && item.cost.price }}
      </td>
      <td>
        {{ item.cost && item.cost.amount }}
      </td>
      <ProductTableCellEditable
        v-if="isProfitTypeCommission"
        :item="item"
        object-prop="cost"
        update-prop="clientPrice"
        type="number"
        @update="updateProduct"
      />
      <td v-else>
        {{ item.cost && item.cost.clientAmount }}
      </td>
      <td>
        {{ item.cost && item.cost.clientAmount }}
      </td>
    </template>
    <!-- END COST TABLE -->

    <!-- START STORE TABLE -->
    <template v-if="tab === 1">
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="net"
        type="number"
        @update="updateProduct"
      />
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="gross"
        type="number"
        @update="updateProduct"
      />
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="width"
        type="number"
        @update="updateProduct"
      />
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="height"
        type="number"
        @update="updateProduct"
      />
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="length"
        type="number"
        @update="updateProduct"
      />
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="capacity"
        type="number"
        @update="updateProduct"
      />
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="cargoPlaceNumber"
        type="number"
        @update="updateProduct"
      />
      <ProductTableCellEditable
        :item="item"
        object-prop="store"
        update-prop="cargoPlaceNumber"
        type="number"
        @update="updateProduct"
      />
      <td>
        <v-checkbox
          :input-value="item.inStock"
          :ripple="false"
          color="primary"
          class="mt-0"
          hide-details
          @change="updateProduct({ id: item.id, inStock: $event, expectedVersion: item.version })"
        />
      </td>
    </template>
    <!-- END STORE TABLE -->

    <!-- START INFO TABLE -->
    <template v-if="tab === 2">
      <td>
        <!-- TODO images actions -->
      </td>
      <ProductTableCellEditable
        :item="item"
        object-prop="info"
        update-prop="description"
        placeholder="Пустое поле"
        @update="updateProduct"
      />
    </template>
    <!-- END INFO TABLE -->

    <!-- START LINK TABLE -->
    <template v-if="tab === 3">
      <ProductTableCellEditable
        :item="item"
        object-prop="link"
        update-prop="url"
        placeholder="Пустое поле"
        @update="updateProduct"
      />
      <td>
        <!-- TODO open link -->
      </td>
    </template>
    <!-- END LINK TABLE -->

    <ProductTableCellAction
      :item="item"
      :loading="deleteLoading"
      @delete="deleteProduct"
    />
  </tr>
</template>

<script>
import { mdiDelete } from '@mdi/js'

import { mapMutations, mapGetters } from 'vuex'

import {
  updateProduct,
  deleteProduct
} from '@/graphql/mutations'

import ProductTableCellIndex from '@/components/ProductTableCellIndex.vue'
import ProductTableCellEditable from '@/components/ProductTableCellEditable.vue'
import ProductTableCellAction from '@/components/ProductTableCellAction.vue'

import { confirmDialog } from '@/utils/helpers'

const UPDATE_STATESES = {
  NONE: 'NONE', // call update method on this status
  WAITING: 'WAITING', // status after update method called
  WAITING_EDIT: 'WAITING_EDIT' // status after value update on WAITING status, to call update method on VERSION update
}

export default {
  name: 'ProductTableRow',
  components: {
    ProductTableCellIndex,
    ProductTableCellEditable,
    ProductTableCellAction,
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    },
    waybillId: {
      type: String,
      required: true
    },
    tab: {
      type: Number,
      default: 0
    },
    isProfitTypeMargin: {
      type: Boolean,
      default: false
    },
    isProfitTypeCommission: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    updateStatus: UPDATE_STATESES.NONE,
    icons: {
      mdiDelete
    },
    updateLoading: null,
    deleteLoading: null,
    errors: [],
    productHeaders: [
      { text: '#', sortable: false, value: 'index', width: 48 },
      { text: 'Фото', sortable: false, value: 'photo', width: 100 },
      { text: 'Наименование', sortable: false, value: 'name', width: 160 },
      { text: 'Модель', value: 'article', sortable: false, width: 140 },
      { text: 'Кол-во', value: 'quantity', sortable: false, width: 120 },
    ],
  }),
  computed: {
    ...mapGetters(['waybillProducts']),
    items () {
      return this.waybillProducts(this.waybillId)
    },
  },
  watch: {
    item: {
      handler (val) {
        if (
          this.updateStatus === UPDATE_STATESES.WAITING &&
          this.updatePromises
        ) {
          const input = { ...this.updatePromises, expectedVersion: val.version }
          this.updatePromises = null
          this.updateStatus = UPDATE_STATESES.NONE
          this.logger.info('CALLED PROMISE', input)
          this.updateProduct(input)
        } else {
          this.updateStatus = UPDATE_STATESES.NONE
        }
      }
    }
  },
  created () {
    this.logger = new this.$Amplify.Logger('ProductTableRow')
  },
  methods: {
    ...mapMutations(['putWaybillItem', 'updateWaybillItem', 'updateWaybillProductItem']),
    async updateProduct (input) {
      try {
        if (this.updateStatus === UPDATE_STATESES.WAITING) {
          if (!this.updatePromises) {
            this.updatePromises = {}
          }
          this.updatePromises = { ...this.updatePromises, ...input }
          return
        }
        this.updateStatus = UPDATE_STATESES.WAITING
        this.logger.info('PRODUCT UPDATE CALLED', input)
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProduct, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.logger.warn('Error: ', response)
          // exclude version check condition
          this.errors = response.errors.reduce((acc, curr) => {
            if (
              (curr.errorType === 'DynamoDB:ConditionalCheckFailedException' ||
              curr.message === 'Error: ConditionalCheckFailedException: The conditional request failed') &&
              curr.data
            ) {
              if (!this.updatePromises) {
                this.updatePromises = {}
              }
              this.updatePromises = { ...this.updatePromises, ...input }
              this.updateStatus = UPDATE_STATESES.WAITING
              this.updateWaybillProductItem(curr.data)
              // TODO update waybill
            } else {
              return [...acc, curr]
            }
          }, [])
          throw new Error(response.errors.join('\n'))
        } else if (response && response.data) {
          this.updateWaybillProductItem(response.data.updateProduct)
        }
      } catch (error) {
        if (error && error.errors && error.errors.length > 0) {
          // exclude version check condition
          this.errors = error.errors.reduce((acc, curr) => {
            if (
              (curr.errorType === 'DynamoDB:ConditionalCheckFailedException' ||
              curr.message === 'Error: ConditionalCheckFailedException: The conditional request failed') &&
              curr.data
            ) {
              if (!this.updatePromises) {
                this.updatePromises = {}
              }
              this.updatePromises = { ...this.updatePromises, ...input }
              this.updateStatus = UPDATE_STATESES.WAITING
              this.updateWaybillProductItem(curr.data)
              // TODO update waybill
            } else {
              return [...acc, curr]
            }
          }, [])
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
