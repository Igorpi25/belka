<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :mobile-breakpoint="0"
    :loading="loading"
    hide-default-footer
    class="v-data-table--overflow-hidden"
  >
    <template v-slot:body="{ items, headers }">
      <tbody>
        <tr v-for="(item, index) in items" :key="index">

          <slot name="product" :item="item" :index="index" />

          <!-- <ProductTableCellEditable
            v-if="isWaybillProfitTypeMargin"
            :item="item.cost"
            update-prop="price"
            type="number"
            @update="udpateProductCost($event, index)"
          /> -->
          <td v-if="isWaybillProfitTypeMargin">
            <Editable
              :value="item.cost && item.cost.price"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, cost: { price: $event }, expectedVersion: item.version })"
            />
          </td>
          <td v-else>
            {{ item.cost && item.cost.price }}
          </td>
          <td>
            {{ item.cost && item.cost.amount }}
          </td>
          <!-- <ProductTableCellEditable
            v-if="isWaybillProfitTypeCommission"
            :item="item"
            update-prop="clientPrice"
            type="number"
            @update="udpateProductCost($event, index)"
          /> -->
          <td v-if="isWaybillProfitTypeCommission">
            <Editable
              :value="item.cost && item.cost.clientPrice"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, cost: { clientPrice: $event }, expectedVersion: item.version })"
            />
          </td>
          <td v-else>
            {{ item.cost && item.cost.clientAmount }}
          </td>
          <td>
            {{ item.cost && item.cost.clientAmount }}
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
// import { updateProductCost } from '@/graphql/mutations'
// import { onUpdateProductCost } from '@/graphql/subscriptions'

import Editable from '@/components/Editable.vue'

export default {
  name: 'ProductCostTable',
  components: {
    Editable,
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
    waybillProfitType: {
      type: String,
      default: 'COMMISSION'
    }
  },
  data: () => ({
    updateLoading: null,
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
    isWaybillProfitTypeMargin () {
      return this.waybillProfitType === 'MARGIN'
    },
    isWaybillProfitTypeCommission () {
      return this.waybillProfitType === 'COMMISSION'
    },
    internalHeaders () {
      return [
        {
          text: this.isWaybillProfitTypeMargin
            ? 'Себестоимость' : 'Цена закупки',
          value: 'price',
          sortable: false,
          width: 120
        },
        { text: 'Стоимость', value: 'amount', sortable: false, width: 120 },
        { text: 'Для клиента', value: 'clientPrice', sortable: false, width: 120 },
        { text: 'Стоимость', value: 'clientAmount', sortable: false, width: 120 },
        { text: '', value: 'action', sortable: false, width: 48 }
      ]
    },
    headers () {
      return [...this.productHeaders, ...this.internalHeaders]
    }
  },
  created () {
    this.logger = new this.$Amplify.Logger('ProductCost')
  },
}
</script>
