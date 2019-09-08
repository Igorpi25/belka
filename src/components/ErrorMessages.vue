<template>
  <div>
    <v-alert
      v-for="(error, index) in items"
      :key="index"
      :value="true"
      border="left"
      type="error"
      class="mb-4"
    >
      <v-row align="center">
        <v-col class="grow py-0">
          <h4 v-if="error.errorType">{{ error.errorType }}</h4>
          <div style="word-break: break-word">
            {{ error.message || error }}
          </div>
          <v-divider
            class="my-2 red"
            style="opacity: 0.22"
          ></v-divider>
          <div class="caption">
            <div v-if="error.locations">
              <span>Locations: </span>
              <span
                v-for="(location, locationIndex) in error.locations"
                :key="locationIndex"
                class="mr-2"
              >{{ location }}</span>
            </div>
            <div v-if="error.path">
              <span>Path: {{ error.path }}</span>
            </div>
          </div>
        </v-col>
        <v-col class="shrink">
          <v-btn
            :ripple="false"
            icon
            small
            dark
            @click="close(index)"
          >
            <v-icon>{{ icons.mdiCloseCircle }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import { mdiCloseCircle } from '@mdi/js'

export default {
  name: 'ErrorMessages',
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    icons: {
      mdiCloseCircle
    }
  }),
  methods: {
    close (index) {
      const updated = this.items.filter((el, i) => i !== index)
      this.$emit('update:items', updated)
    }
  }
}
</script>
