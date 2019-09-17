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
              :value="item.store && item.store.net"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, store: { net: $event }, expectedVersion: item.version })"
            />
          </td>
          <td>
            <Editable
              :value="item.store && item.store.gross"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, store: { gross: $event }, expectedVersion: item.version })"
            />
          </td>
          <td>
            <Editable
              :value="item.store && item.store.width"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, store: { width: $event }, expectedVersion: item.version })"
            />
          </td>
          <td>
            <Editable
              :value="item.store && item.store.height"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, store: { height: $event }, expectedVersion: item.version })"
            />
          </td>
          <td>
            <Editable
              :value="item.store && item.store.length"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, store: { length: $event }, expectedVersion: item.version })"
            />
          </td>
          <td>
            <Editable
              :value="item.store && item.store.capacity"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, store: { capacity: $event }, expectedVersion: item.version })"
            />
          </td>
          <td>
            <Editable
              :value="item.store && item.store.cargoPlaceNumber"
              :version="item.version"
              type="number"
              min="0"
              placeholder="-"
              arrow-move
              @input="$emit('update', { id: item.id, store: { cargoPlaceNumber: $event }, expectedVersion: item.version })"
            />
          </td>
          <!-- <ProductTableCellEditable
            :item="item"
            update-prop="net"
            type="number"
            @update="udpateProductStore"
          />
          <ProductTableCellEditable
            :item="item"
            update-prop="gross"
            type="number"
            @update="udpateProductStore"
          />
          <ProductTableCellEditable
            :item="item"
            update-prop="width"
            type="number"
            @update="udpateProductStore"
          />
          <ProductTableCellEditable
            :item="item"
            update-prop="height"
            type="number"
            @update="udpateProductStore"
          />
          <ProductTableCellEditable
            :item="item"
            update-prop="length"
            type="number"
            @update="udpateProductStore"
          />
          <ProductTableCellEditable
            :item="item"
            update-prop="capacity"
            type="number"
            @update="udpateProductStore"
          />
          <ProductTableCellEditable
            :item="item"
            update-prop="cargoPlaceNumber"
            type="number"
            @update="udpateProductStore"
          /> -->
          <td>
            <v-checkbox
              :input-value="item.inStock"
              :ripple="false"
              color="primary"
              class="mt-0"
              hide-details
              @change="udpateProductStore({
                id: item.id,
                inStock: $event,
                expectedVersion: item.version
              })"
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
  name: 'ProductStore',
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
      { text: 'Нетто, ед.', value: 'net', sortable: false, width: 120 },
      { text: 'Брутто, ед.', value: 'gross', sortable: false, width: 120 },
      { text: 'l, мм', value: 'length', sortable: false, width: 100 },
      { text: 'w, мм', value: 'width', sortable: false, width: 100 },
      { text: 'h, мм', value: 'height', sortable: false, width: 100 },
      { text: 'Кол гр.м', value: 'dimension', sortable: false, width: 120 },
      { text: '№ гр.м', value: 'cargoPlaceNumber', sortable: false, width: 100 },
      { text: 'На складе', value: 'inStock', sortable: false, width: 100 },
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
    this.logger = new this.$Amplify.Logger('ProductStore')
  },
}
</script>
