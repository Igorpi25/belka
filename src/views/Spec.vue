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

        <div v-else-if="items">
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
                <WaybillItem :waybill-id="item.id" />
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

import { getSpec } from '@/graphql/queries'
import { createWaybill, updateWaybill, deleteWaybill } from '@/graphql/mutations'
import { onCreateWaybill, onUpdateWaybill, onDeleteWaybill } from '@/graphql/subscriptions'

import WaybillItem from '@/components/WaybillItem.vue'
import Editable from '@/components/Editable.vue'

import { confirmDialog } from '@/utils/helpers'

export default {
  name: 'Spec',
  components: {
    WaybillItem,
    Editable,
  },
  data: () => ({
    icons: {
      mdiDelete,
      mdiChevronDown
    },
    loading: false,
    createLoading: null,
    updateLoading: null,
    deleteLoading: null,
    expanded: [],
    items: [],
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
        owner: this.owner,
        waybillSpecId: this.specId
      })
    },
    updateWaybillSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateWaybill, {
        owner: this.owner,
        waybillSpecId: this.specId
      })
    },
    deleteWaybillSubscription () {
      return this.$Amplify.graphqlOperation(onDeleteWaybill, {
        owner: this.owner,
        waybillSpecId: this.specId
      })
    },
  },
  created () {
    this.logger = new this.$Amplify.Logger('Spec')
    this.getSpec()
    this.createSubscription = this.$Amplify.API.graphql(this.createWaybillSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onCreateWaybill(data)
        }
      })
    this.updateSubscription = this.$Amplify.API.graphql(this.updateWaybillSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateWaybill(data)
        }
      })
    this.deleteSubscription = this.$Amplify.API.graphql(this.deleteWaybillSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onDeleteWaybill(data)
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
    onCreateWaybill (newData) {
      this.logger.info('New waybill from subscription...', newData)
      const newItem = newData.onCreateWaybill
      this.items.push(newItem)
    },
    onUpdateWaybill (newData, onError = false) {
      const msg = onError
        ? 'Update waybill from update error data...'
        : 'Update waybill from subscription...'
      this.logger.info(msg, newData)
      const newItem = newData.onUpdateWaybill
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    onDeleteWaybill (newData) {
      this.logger.info('Delete waybill from subscription...', newData)
      const newItem = newData.onDeleteWaybill
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    async getSpec () {
      try {
        this.loading = true
        const response = await this.$Amplify.API.graphql(this.getSpecQuery)
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        this.items = response.data.getSpec.waybills.items || []
      } catch (error) {
        this.items = null
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
        this.updateLoading = input.id
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateWaybill, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          // exclude version check condition
          this.errors = response.errors.reduce((acc, curr) => {
            if (curr.errorType === 'DynamoDB:ConditionalCheckFailedException') {
              this.onUpdateWaybill({ onUpdateWaybill: curr.data }, true)
            } else {
              return [...acc, curr]
            }
          }, [])
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
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
