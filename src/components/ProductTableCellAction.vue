<template>
  <v-scale-transition mode="out-in">
    <v-progress-circular
      v-if="loading === item.id"
      :width="2"
      :size="16"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-icon
      v-else
      small
        @click="$emit('delete', { id: item.id, expectedVersion: item.version })"
    >
      {{ icons.mdiDelete }}
    </v-icon>
  </v-scale-transition>
</template>

<script>
import { mdiDelete } from '@mdi/js'

export default {
  name: 'ProductCellAction',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    loading: Boolean
  },
  data: () => ({
    icons: {
      mdiDelete
    }
  })
}
</script>
