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
          <slot name="product" :item="products[index]" :index="index" />
          <td>
            <Editable
              :item="item"
              update-prop="url"
              placeholder="Пустое поле"
              @update="udpateProductLink"
            />
          </td>
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
import Editable from '@/components/Editable.vue'

export default {
  name: 'ProductLinkTable',
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
  },
  data: () => ({
    updateLoading: null,
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
  },
  created () {
    this.logger = new this.$Amplify.Logger('ProductLink')
  },
}
</script>
