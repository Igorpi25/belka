<template>
  <td class="pa-0">
    <div class="d-flex align-center h-full">
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <div
            :class="[
              'h-full',
              status === 'IN_PRODUCTION'
                ? 'orange' : status === 'IN_PROCESSING'
                  ? 'pink' : status === 'IN_STOCK'
                    ? 'green' : 'grey'
            ]"
            style="width: 4px;"
            v-on="on"
          />
        </template>
        <span>{{ status }}</span>
      </v-tooltip>
      <div class="d-flex align-center px-3">
        <span class="grey--text">
          {{ index + 1 }}
        </span>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'ProductCellIndex',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: Number
  },
  computed: {
    status () {
      return this.item.status
    }
  }
}
</script>
