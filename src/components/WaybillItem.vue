<template>
  <div>
    <div v-if="errors && errors.length > 0">
      <ErrorMessages :items.sync="errors" />
    </div>

    <div>
      <div>
        <div class="d-flex">
          <div :style="{ minWidth: productsTableWidth + 'px' }" />
          <v-tabs
            v-model="tab"
            :class="{ 'v-tabs--no-margin': !$vuetify.breakpoint.xs }"
            grow
          >
            <v-tab>Цены</v-tab>
            <v-tab>Склад</v-tab>
            <v-tab>Пояснения</v-tab>
            <v-tab>Ссылка</v-tab>
          </v-tabs>
        </div>
        <div>
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
                <ProductTableRow
                  v-for="(item, index) in items"
                  :key="index"
                  :item="item"
                  :index="index"
                  :waybill-id="waybillId"
                  :tab="tab"
                  :is-custom-profit="item.customProfit"
                  :is-profit-type-margin="isWaybillProfitTypeMargin"
                  :is-profit-type-commission="isWaybillProfitTypeCommission"
                  :errors.sync="errors"
                />
              </tbody>
            </template>
          </v-data-table>
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
import { mapMutations, mapGetters } from 'vuex'

import { getWaybill } from '@/graphql/queries'
import {
  createProduct,
} from '@/graphql/mutations'

import ErrorMessages from '@/components/ErrorMessages.vue'

import ProductTableRow from '@/components/ProductTableRow.vue'

const UPDATE_STATESES = {
  NONE: 'NONE', // call update method on this updateStatus
  WAITING: 'WAITING', // updateStatus after update method called
  WAITING_EDIT: 'WAITING_EDIT' // updateStatus after value update on WAITING updateStatus, to call update method on VERSION update
}

export default {
  name: 'WaybillItem',
  components: {
    ErrorMessages,
    ProductTableRow,
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
    updateStatus: UPDATE_STATESES.NONE,
    updatePromises: [],
    tab: 0,
    loading: false,
    createLoading: null,
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
    owner () {
      return this.$store.getters.username
    },
    getWaybillQuery () {
      return this.$Amplify.graphqlOperation(getWaybill, {
        id: this.waybillId
      })
    },
    headers () {
      switch (this.tab) {
        case 0: return [...this.productHeaders, ...this.costHeaders]
        case 1: return [...this.productHeaders, ...this.storeHeaders]
        case 2: return [...this.productHeaders, ...this.infoHeaders]
        case 3: return [...this.productHeaders, ...this.linkHeaders]
        default: return []
      }
    },
    productsTableWidth () {
      const w = this.productHeaders.reduce((acc, curr) => {
        return acc + (curr.width || 0)
      }, 0)
      return !this.$vuetify.breakpoint.xs ? w : 0
    },
    isWaybillProfitTypeMargin () {
      return this.waybillProfitType === 'MARGIN'
    },
    isWaybillProfitTypeCommission () {
      return this.waybillProfitType === 'COMMISSION'
    },
    costHeaders () {
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
    storeHeaders () {
      return [
        { text: 'Нетто, ед.', value: 'net', sortable: false, width: 120 },
        { text: 'Брутто, ед.', value: 'gross', sortable: false, width: 120 },
        { text: 'l, мм', value: 'length', sortable: false, width: 100 },
        { text: 'w, мм', value: 'width', sortable: false, width: 100 },
        { text: 'h, мм', value: 'height', sortable: false, width: 100 },
        { text: 'Кол гр.м', value: 'dimension', sortable: false, width: 120 },
        { text: '№ гр.м', value: 'cargoPlaceNumber', sortable: false, width: 100 },
        { text: 'На складе', value: 'inStock', sortable: false, width: 100 },
        { text: '', value: 'action', sortable: false, width: 48 }
      ]
    },
    infoHeaders () {
      return [
        { text: 'Доп. фото', value: 'images', sortable: false, width: 140 },
        { text: 'Дополнительная информация', value: 'description', sortable: false },
        { text: '', value: 'action', sortable: false, width: 48 }
      ]
    },
    linkHeaders () {
      return [
        { text: 'Поле для ссылки', value: 'url', sortable: false },
        { text: 'Откр.', value: 'openLink', sortable: false, width: 80 },
        { text: '', value: 'action', sortable: false, width: 48 }
      ]
    },
  },
  watch: {
    tab () {
      this.getWaybill()
    },
  },
  created () {
    this.logger = new this.$Amplify.Logger('WaybillItem')
    this.getWaybill()
  },
  methods: {
    ...mapMutations(['putWaybillItem']),
    async getWaybill () {
      try {
        this.loading = true
        const response = await this.$Amplify.API.graphql(this.getWaybillQuery)
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        this.putWaybillItem(response.data.getWaybill)
      } catch (error) {
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
  }
}
</script>

<style>
.v-tabs.v-tabs--no-margin .v-tabs-bar__content .v-tab {
  margin-left: 0!important;
}
</style>