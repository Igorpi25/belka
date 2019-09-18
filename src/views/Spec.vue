<template>
  <v-container>
    <v-toolbar flat color="transparent">
      <h1>Накладные</h1>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-layout wrap>
      <v-flex xs12>
        <div v-if="loading">Загрузка...</div>

        <div v-else-if="errors.length > 0">
          <ErrorMessages :items.sync="errors" />
        </div>

        <div>
          <v-data-table
            :headers="headers"
            :items="items"
            :single-expand="false"
            :expanded.sync="expanded"
            :mobile-breakpoint="0"
            hide-default-header
            hide-default-footer
            item-key="id"
            show-expand
            class="elevation-1 v-data-table--custom-expand"
          >
            <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
              <div class="d-flex align-center h-full">
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <div
                      :class="[
                        'h-full',
                        item.status === 'IN_PRODUCTION'
                          ? 'orange' : item.status === 'IN_PROCESSING'
                            ? 'pink' : item.status === 'IN_STOCK'
                              ? 'green' : 'grey'
                      ]"
                      style="width: 4px;"
                      v-on="on"
                    />
                  </template>
                  <span>{{ item.status }}</span>
                </v-tooltip>
                <div class="d-flex align-center px-2">
                  <v-icon
                    :class="[
                      { 'v-data-table__expand-icon--active': isExpanded },
                      'v-data-table__expand-icon v-icon--link'
                    ]"
                    @click="expand(!isExpanded)"
                  >
                    {{ icons.mdiChevronDown }}
                  </v-icon>
                </div>
              </div>
            </template>
            <template v-slot:expanded-item="{ item, headers }">
              <td :colspan="headers.length">
                <WaybillItem
                  :waybill-id="item.id"
                  :waybill-profit-type="item.profitType"
                />
                <v-row class="grey lighten-4">
                  <v-col>
                    <v-row no-gutters>
                      <v-col>
                        <v-radio-group
                          :value="item.profitType"
                          hide-details
                          class="mt-0"
                          @change="updateWaybill({
                            id: item.id, profitType: $event, expectedVersion: item.version
                          })"
                        >
                          <v-radio
                            label="Маржа"
                            value="MARGIN"
                            color="primary"
                          ></v-radio>
                          <v-radio
                            label="Комиссия"
                            value="COMMISSION"
                            color="primary"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col align-self="center">
                        <Editable
                          :value="item.profitPercent"
                          :version="item.version"
                          placeholder="-"
                          outlined
                          @input="updateWaybill({
                            id: item.id, profitPercent: $event, expectedVersion: item.version
                          })"
                        />
                      </v-col>
                      <v-col align-self="center">
                        <v-checkbox
                          :input-value="item.profitForAll"
                          :ripple="false"
                          label="Для всех"
                          color="primary"
                          class="mt-0 ml-1"
                          hide-details
                          @change="updateWaybill({
                            id: item.id,
                            profitForAll: $event,
                            expectedVersion: item.version
                          })"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row no-gutters>
                      <v-col class="pr-1">
                        <label class="grey--text darken-3">
                          Скидка
                        </label>
                        <Editable
                          :value="item.discount"
                          :version="item.version"
                          placeholder="-"
                          outlined
                          @input="updateWaybill({
                            id: item.id, discount: $event, expectedVersion: item.version
                          })"
                        />
                      </v-col>
                      <v-col class="pl-1">
                        <label class="grey--text darken-3">
                          Предоплата
                        </label>
                        <Editable
                          :value="item.prepayment"
                          :version="item.version"
                          placeholder="-"
                          outlined
                          @input="updateWaybill({
                            id: item.id, prepayment: $event, expectedVersion: item.version
                          })"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row no-gutters>
                      <v-col class="pr-1">
                        <label class="grey--text darken-3">
                          Остаток для закупа
                        </label>
                        <div>
                          {{ item.residue }}
                        </div>
                      </v-col>
                      <v-col class="pl-1">
                        <label class="grey--text darken-3">
                          Долг клиента
                        </label>
                        <div>
                          {{ item.customerDebt }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </td>
            </template>
            <template v-slot:item.number="{ item }">
              <Editable
                :value="item.number"
                :version="item.version"
                placeholder="Номер"
                outlined
                arrow-move
                arrow-move-mode="row"
                sibling-item-selector="td"
                @input="updateWaybill({ id: item.id, number: $event, expectedVersion: item.version })"
              />
            </template>
            <template v-slot:item.purchaseDate="{ item }">
              <Editable
                :value="item.purchaseDate"
                :version="item.version"
                placeholder="Дата закупки"
                outlined
                arrow-move
                arrow-move-mode="row"
                sibling-item-selector="td"
                @input="updateWaybill({ id: item.id, purchaseDate: $event, expectedVersion: item.version })"
              />
            </template>
            <template v-slot:item.contractor="{ item }">
              <Editable
                :value="item.contractor"
                :version="item.version"
                placeholder="Поставщик"
                outlined
                arrow-move
                arrow-move-mode="row"
                sibling-item-selector="td"
                @input="updateWaybill({ id: item.id, contractor: $event, expectedVersion: item.version })"
              />
            </template>
            <template v-slot:item.deliveryDate="{ item }">
              <Editable
                :value="item.deliveryDate"
                :version="item.version"
                placeholder="Дата отправки"
                outlined
                arrow-move
                arrow-move-mode="row"
                sibling-item-selector="td"
                @input="updateWaybill({ id: item.id, deliveryDate: $event, expectedVersion: item.version })"
              />
            </template>
            <template v-slot:item.action="{ item }">
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
                  @click="deleteWaybill({ id: item.id, expectedVersion: item.version })"
                >
                  {{ icons.mdiDelete }}
                </v-icon>
              </v-scale-transition>
            </template>
          </v-data-table>
          <v-btn
            :ripple="false"
            :loading="createLoading"
            outlined
            rounded
            color="primary"
            class="mt-3"
            @click="createWaybill"
          >
            <v-icon left>mdi-plus</v-icon>
            Создать накладную
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mdiDelete, mdiChevronDown } from '@mdi/js'

import { mapMutations, mapGetters } from 'vuex'

import { getSpec } from '@/graphql/queries'
import { createWaybill, updateWaybill, deleteWaybill } from '@/graphql/mutations'
import {
  onCreateWaybill,
  onUpdateWaybill,
  onDeleteWaybill,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct
} from '@/graphql/subscriptions'

import ErrorMessages from '@/components/ErrorMessages.vue'
import WaybillItem from '@/components/WaybillItem.vue'
import Editable from '@/components/Editable.vue'

import { confirmDialog } from '@/utils/helpers'

const UPDATE_STATESES = {
  NONE: 'NONE', // call update method on this status
  WAITING: 'WAITING', // status after update method called
  WAITING_EDIT: 'WAITING_EDIT' // status after value update on WAITING status, to call update method on VERSION update
}

export default {
  name: 'Spec',
  components: {
    ErrorMessages,
    WaybillItem,
    Editable,
  },
  data: () => ({
    updateStatus: UPDATE_STATESES.NONE,
    icons: {
      mdiDelete,
      mdiChevronDown
    },
    loading: false,
    createLoading: null,
    updateLoading: null,
    deleteLoading: null,
    expanded: [],
    errors: [],
    headers: [
      { text: 'Number', value: 'number', width: 140 },
      { text: 'Purchase Date', value: 'purchaseDate', width: 160, class: 'date-cell' },
      { text: 'Contractor', value: 'contractor' },
      { text: 'Delivery Date', value: 'deliveryDate', width: 160 },
      { text: '', value: 'action', sortable: false, width: 48 },
    ],
  }),
  computed: {
    ...mapGetters(['waybills']),
    items () {
      return this.waybills
    },
    owner () {
      return this.$store.getters.username
    },
    specId () {
      return this.$route.params.specId
    },
    getSpecQuery () {
      return this.$Amplify.graphqlOperation(getSpec, {
        id: this.specId
      })
    },
    createWaybillSubscription () {
      return this.$Amplify.graphqlOperation(onCreateWaybill, {
        owner: this.owner
      })
    },
    updateWaybillSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateWaybill, {
        owner: this.owner
      })
    },
    deleteWaybillSubscription () {
      return this.$Amplify.graphqlOperation(onDeleteWaybill, {
        owner: this.owner
      })
    },
    createProductSubscription () {
      return this.$Amplify.graphqlOperation(onCreateProduct, {
        owner: this.owner
      })
    },
    updateProductSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProduct, {
        owner: this.owner
      })
    },
    deleteProductSubscription () {
      return this.$Amplify.graphqlOperation(onDeleteProduct, {
        owner: this.owner
      })
    },
  },
  created () {
    this.logger = new this.$Amplify.Logger('Spec')
    this.getSpec()
    this.createWaybillSubscriptionInstance = this.$Amplify.API.graphql(this.createWaybillSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onCreateWaybill(data)
        }
      })
    this.updateWaybillSubscriptionInstance = this.$Amplify.API.graphql(this.updateWaybillSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateWaybill(data)
        }
      })
    this.deleteWaybillSubscriptionInstance = this.$Amplify.API.graphql(this.deleteWaybillSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onDeleteWaybill(data)
        }
      })
    this.createProductSubscriptionInstance = this.$Amplify.API.graphql(this.createProductSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onCreateProduct(data)
        }
      })
    this.updateProductSubscriptionInstance = this.$Amplify.API.graphql(this.updateProductSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateProduct(data)
        }
      })
    this.deleteProductSubscriptionInstance = this.$Amplify.API.graphql(this.deleteProductSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onDeleteProduct(data)
        }
      })
  },
  beforeDestroy () {
    if (this.createWaybillSubscriptionInstance) {
      this.createWaybillSubscriptionInstance.unsubscribe()
    }
    if (this.updateWaybillSubscriptionInstance) {
      this.updateWaybillSubscriptionInstance.unsubscribe()
    }
    if (this.deleteWaybillSubscriptionInstance) {
      this.deleteWaybillSubscriptionInstance.unsubscribe()
    }
    if (this.createProductSubscriptionInstance) {
      this.createProductSubscriptionInstance.unsubscribe()
    }
    if (this.updateProductSubscriptionInstance) {
      this.updateProductSubscriptionInstance.unsubscribe()
    }
    if (this.deleteProductSubscriptionInstance) {
      this.deleteProductSubscriptionInstance.unsubscribe()
    }
  },
  methods: {
    ...mapMutations([
      'setSpecItem',
      'putWaybillItem',
      'updateWaybillItem',
      'deleteWaybillItem',
      'putWaybillProductItem',
      'updateWaybillProductItem',
      'deleteWaybillProductItem'
    ]),
    onCreateWaybill (newData) {
      this.logger.info('New waybill from subscription...', newData)
      const newItem = newData.onCreateWaybill
      this.putWaybillItem(newItem)
    },
    onUpdateWaybill (newData, onError = false) {
      const msg = onError
        ? 'Update waybill from update error data...'
        : 'Update waybill from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateWaybill
      this.updateWaybillItem(newItem)
      if (
        this.updateStatus === UPDATE_STATESES.WAITING &&
        this.updatePromises && this.updatePromises.length > 0
      ) {
        const shifted = this.updatePromises.shift()
        const input = { ...shifted, expectedVersion: newItem.version }
        this.updateStatus = UPDATE_STATESES.NONE
        this.logger.info('CALLED PROMISE', input)
        this.updateWaybill(input)
      } else {
        this.updateStatus = UPDATE_STATESES.NONE
      }
    },
    onDeleteWaybill (newData) {
      this.logger.info('Delete waybill from subscription...', newData)
      const newItem = newData.onDeleteWaybill
      this.deleteWaybillItem(newItem)
    },
    onCreateProduct (newData) {
      this.logger.info('New product from subscription...', newData)
      const newItem = newData.onCreateProduct
      this.putWaybillProductItem(newItem)
      // UPDATE WAYBILL
      const udpatedWaybill = newItem.waybill
      delete udpatedWaybill.products
      this.updateWaybillItem(udpatedWaybill)
    },
    onUpdateProduct (newData, onError = false) {
      const msg = onError
        ? 'Update product from update error data...'
        : 'Update product from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateProduct
      this.updateWaybillProductItem(newItem)
      // UPDATE WAYBILL
      const udpatedWaybill = newItem.waybill
      delete udpatedWaybill.products
      this.updateWaybillItem(udpatedWaybill)
    },
    onDeleteProduct (newData) {
      this.logger.info('Delete product from subscription...', newData)
      const newItem = newData.onDeleteProduct
      this.deleteWaybillProductItem(newItem)
      // UPDATE WAYBILL
      const udpatedWaybill = newItem.waybill
      delete udpatedWaybill.products
      this.updateWaybillItem(udpatedWaybill)
    },
    async getSpec () {
      try {
        this.loading = true
        const response = await this.$Amplify.API.graphql(this.getSpecQuery)
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        this.setSpecItem(response.data.getSpec)
      } catch (error) {
        if (error && error.errors && error.errors.length > 0) {
          this.errors = error.errors
        }
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'GetSpecError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.loading = false
      }
    },
    async createWaybill () {
      try {
        this.createLoading = true
        const waybillSpecId = this.specId
        const input = {
          owner: this.owner,
          waybillSpecId
        }
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(createWaybill, { input })
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
        //   name: 'CreateWaybillError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.createLoading = false
      }
    },
    async updateWaybill (input) {
      try {
        if (this.updateStatus === UPDATE_STATESES.WAITING) {
          if (!this.updatePromises) {
            this.updatePromises = []
          }
          const wIndex = this.updatePromises.findIndex(w => w.id === input.id)
          if (wIndex) {
            const w = { ...this.updatePromises[wIndex], ...input }
            this.updatePromises.splice(wIndex, 1, w)
          } else {
            this.updatePromises.push(input)
          }
          return
        }
        this.updateStatus = UPDATE_STATESES.WAITING
        this.logger.info('WAYBILL UPDATE CALLED', input)
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateWaybill, { input })
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
                this.updatePromises = []
              }
              const wIndex = this.updatePromises.findIndex(w => w.id === input.id)
              if (wIndex) {
                const w = { ...this.updatePromises[wIndex], ...input }
                this.updatePromises.splice(wIndex, 1, w)
              } else {
                this.updatePromises.push(input)
              }
              this.updateStatus = UPDATE_STATESES.WAITING
              this.updateWaybillItem(curr.data)
            } else {
              return [...acc, curr]
            }
          }, [])
          throw new Error(response.errors.join('\n'))
        } else if (response && response.data) {
          this.updateWaybillItem(response.data.updateWaybill)
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
                this.updatePromises = []
              }
              const wIndex = this.updatePromises.findIndex(w => w.id === input.id)
              if (wIndex) {
                const w = { ...this.updatePromises[wIndex], ...input }
                this.updatePromises.splice(wIndex, 1, w)
              } else {
                this.updatePromises.push(input)
              }
              this.updateStatus = UPDATE_STATESES.WAITING
              this.updateWaybillItem(curr.data)
            } else {
              return [...acc, curr]
            }
          }, [])
        }
        this.logger.warn('Error: ', error)
        // this.$Amplify.Analytics.record({
        //   name: 'UpdateWaybillError',
        //   attributes: {
        //     error: error.message
        //   }
        // })
      } finally {
        this.updateLoading = null
      }
    },
    async deleteWaybill (input) {
      try {
        const msg = 'Вы действительно хотите удалить накладную?'
        const confirm = await confirmDialog(msg)
        if (confirm === 'not_confirmed') {
          return
        }
        this.deleteLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(deleteWaybill, { input })
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
        //   name: 'DeleteWaybillError',
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

<style>
.v-data-table.v-data-table--custom-expand .expanded.expanded__content {
  box-shadow: none;
}
.v-data-table.v-data-table--custom-expand .expanded.expanded__content:hover {
  background: transparent;
}
.v-data-table--custom-expand > .v-data-table__wrapper > table > tbody > tr:not(.expanded__content) > td:first-child {
  padding: 0;
}
.v-data-table--custom-expand > .v-data-table__wrapper > table > tbody > tr:not(.expanded__content) > td:first-child:not(.v-data-table__mobile-row) {
  width: 48px;
}
</style>
