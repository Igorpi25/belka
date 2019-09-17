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
            <!-- TODO images actions -->
          </td>
          <!-- <ProductTableCellEditable
            :item="item"
            update-prop="description"
            placeholder="Пустое поле"
            @update="udpateProductInfo"
          /> -->
          <td>
            <Editable
              :value="item.info && item.info.description"
              :version="item.version"
              placeholder="----"
              arrow-move
              @input="$emit('update', { id: item.id, info: { description: $event }, expectedVersion: item.version })"
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
import Editable from '@/components/Editable.vue'

export default {
  name: 'ProductInfo',
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
  },
  created () {
    this.logger = new this.$Amplify.Logger('ProductInfo')
  },
}
</script>
